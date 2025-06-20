import mongoose, { set } from 'mongoose';
import User from '@/pages/api/schemas/user';
import QrCode from '../schemas/qrcodes';
import connectDB from './connect-db';



function initializeScanRates(days = 30) {
    const today = new Date();
    const result = [];

    for (let i = 0; i < days; i++) {
        const utcDate = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() - i));
        result.push({
            date: utcDate,
            count: 0
        });
    }

    return result.reverse(); // optional: oldest date first
}



//  ██╗ ██╗  ██╗ ██╗  ██╗ ██╗  ██╗ ██╗  ██╗ ██╗ 
// ████████╗████████╗████████╗████████╗████████╗
// ╚██╔═██╔╝╚██╔═██╔╝╚██╔═██╔╝╚██╔═██╔╝╚██╔═██╔╝
// ████████╗████████╗████████╗████████╗████████╗
// ╚██╔═██╔╝╚██╔═██╔╝╚██╔═██╔╝╚██╔═██╔╝╚██╔═██╔╝
//  ╚═╝ ╚═╝  ╚═╝ ╚═╝  ╚═╝ ╚═╝  ╚═╝ ╚═╝  ╚═╝ ╚═╝ 
                                             
const createQrCode = async(data) => {
    

    try {
        const {qrData} = data;
        await connectDB();
        qrData['scanRates'] = initializeScanRates()
        
        const _qrCode = await new QrCode(qrData);
        await _qrCode.save();
        return {success:true}
    } catch(err) {
        return(err)
    }

}

const updateQrCode = async(data) => {

    const {username,slug,updatedQr} = data;


    try {

        await connectDB();
        const user = await User.findOne({username:username});
        
        if (user) {

            const {
            _id,
            __v,
            createdAt,
            updatedAt,
            ...clean    // ← safe-to-update data lives here
            } = updatedQr;

        
            
            const qr = await QrCode.findOneAndUpdate(
                {ownerId:user.authId,slug:slug},
                {$set: clean}
            )

            return({success:true})
            
        } 
        else {
            return({success:false,error:'User not found'});
        }
        


    } catch(err) {
        return(err)
    }

}



const deleteQrCode = async(data) => {

    const {username,slug} = data;


    try {
        await connectDB();
        const user = await User.findOne({username:username});
        
        if (user) {
            
            const delresponse = await QrCode.deleteOne({ownerId:user.authId,slug:slug});
            
            if (delresponse.deletedCount == 0)  {
                return {success:false, message:'QR Code not found'}
            } else {
                return {success:true}
            }
            
            

        } else {
            return {success:false, message:'User not found'}
        }



    } catch(err) {
        return(err)
    }


}

//  ██╗ ██╗  ██╗ ██╗  ██╗ ██╗  ██╗ ██╗  ██╗ ██╗ 
// ████████╗████████╗████████╗████████╗████████╗
// ╚██╔═██╔╝╚██╔═██╔╝╚██╔═██╔╝╚██╔═██╔╝╚██╔═██╔╝
// ████████╗████████╗████████╗████████╗████████╗
// ╚██╔═██╔╝╚██╔═██╔╝╚██╔═██╔╝╚██╔═██╔╝╚██╔═██╔╝
//  ╚═╝ ╚═╝  ╚═╝ ╚═╝  ╚═╝ ╚═╝  ╚═╝ ╚═╝  ╚═╝ ╚═╝ 


const slugExists = async(data) => {
    const {slug,ownerId} = data
    
    
    try {

        await connectDB();
        const _slug = await QrCode.findOne({
            slug,
            ownerId
        })
        
        if(_slug) {
            return {success:true,slugExists:true}
        } else {
            return {success:true,slugExists:false}
        }

    } catch(err) {
        return(err)
    }


}



const getUserQrCodes = async(data) => {
    const {ownerId} = data;
    try {
        await connectDB();
        const _qrCodes = await QrCode.find({
            ownerId
        })
        return {success:true,qrCodes:_qrCodes}
    } catch(err) {
        return(err)
    }
}





//  ██╗ ██╗  ██╗ ██╗  ██╗ ██╗  ██╗ ██╗  ██╗ ██╗ 
// ████████╗████████╗████████╗████████╗████████╗
// ╚██╔═██╔╝╚██╔═██╔╝╚██╔═██╔╝╚██╔═██╔╝╚██╔═██╔╝
// ████████╗████████╗████████╗████████╗████████╗
// ╚██╔═██╔╝╚██╔═██╔╝╚██╔═██╔╝╚██╔═██╔╝╚██╔═██╔╝
//  ╚═╝ ╚═╝  ╚═╝ ╚═╝  ╚═╝ ╚═╝  ╚═╝ ╚═╝  ╚═╝ ╚═╝ 




module.exports = {
    slugExists,
    createQrCode,
    updateQrCode,
    deleteQrCode,
    getUserQrCodes
}