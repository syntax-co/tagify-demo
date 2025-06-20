
import mongoose from "mongoose";
import connectDB from "./functions/connect-db";

import User from '@/pages/api/schemas/user'
import QrCode from '@/pages/api/schemas/qrcodes'
import parseUserAgent from "./functions/parse-user-agents";


export function buildDailyRates(start, end, initial = 0) {
  const s = new Date(start);
  const e = new Date(end);

  if (isNaN(s) || isNaN(e)) throw new Error('Invalid date(s)');
  if (s > e)          throw new Error('start must be ≤ end');

  // normalise both to 00:00 UTC so a new day === +1 UTC date
  const toUTCmidnight = d =>
    new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));

  let cursor = toUTCmidnight(s);
  const last   = toUTCmidnight(e);
  const out    = [];

  while (cursor <= last) {
    out.push({ date: cursor, count: initial });

    // advance one calendar day
    cursor = new Date(Date.UTC(
      cursor.getUTCFullYear(),
      cursor.getUTCMonth(),
      cursor.getUTCDate() + 1
    ));
  }

  return out;
}




export default async function handler(req, res) {

    if (req.method === 'GET') {
        await connectDB()
        // get device info
        const userAgent = req.headers['user-agent']
        const deviceInfo = parseUserAgent(userAgent)

        const {username,slug} = req.query;
        
        const user = await User.findOne({username})
        
        if (user) {
            const authId = user.authId

            const qr = await QrCode.findOne({
                ownerId:authId,
                slug:slug
            })
            
            

            // if there is a match
            if (qr) {
                const amount = 1
                const redirectUrl = qr.target
                
                qr.stats.totalScans = (qr.stats.totalScans || 0) + amount;
                qr.stats.lastScanAt = new Date();

                const today = new Date().toISOString().split('T')[0]
                const lastDay = qr.scanRates[qr.scanRates.length - 1].date.toISOString().split('T')[0]
                

                // adding recent activity to user meta
                const activity = [...user.meta.recentScans]
                activity.push(qr.slug)
                
                if (activity.length>5) {
                    user.meta.recentScans = activity.splice(activity.length-5,activity.length)
                } else {
                    user.meta.recentScans = activity
                }

                user.markModified('meta.recentScans')
                user.save()

                // ####### device data tracking
                const devices = Object.fromEntries(qr.stats.devices)
                const deviceKeys = Object.keys(devices)

                if (deviceKeys.includes(deviceInfo.os)) {
                    devices[deviceInfo.os] = devices[deviceInfo.os]+1
                } else {
                    devices[deviceInfo.os] = 1
                }

                qr.stats.devices = devices
                

                // if the last day does not match
                // the current day
                if (today!=lastDay) {

                    // find the date difference
                    const _day = new Date(today)
                    const target = new Date(lastDay)
                    const msPerDay = 1000 * 60 * 60 * 24;
                    var days = Math.abs(Math.floor((target - _day) / msPerDay));

                    if (days>30) {
                        days=30
                    }

                    var dateArray = buildDailyRates(target, _day)
                    dateArray = dateArray.slice(1)
                    dateArray[days-1].count++

                    var _rates = [ ...qr.scanRates.slice(0,30-(days-2)) , ...dateArray]
                    _rates = _rates.slice(_rates.length-30,_rates.length)
                    
                    qr.scanRates = _rates

                    qr.markModified("scanRates");
                    qr.markModified("stats.devices");
                    await qr.save()

                } 
                // if its the same day
                else {

                    qr.scanRates[qr.scanRates.length - 1].count += amount;
                    qr.markModified("scanRates");
                    qr.markModified("stats.devices");
                    await qr.save()
                }
                
                
                res.redirect(302,redirectUrl)  // success; nothing else to do
                
            } else {
                res.status(404).json({ message: 'QR code not found' })
            }
            

            

        } else {
            res.status(404).json({ message: 'User not found' })
        }
        


    } else {
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }



}