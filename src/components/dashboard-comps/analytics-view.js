import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useAppContext } from "@/context/app-context";
import NoQrCode from "./qr-code/no-qrcode-notice";



// Color palette mapped from ShadCN CSS vars

const AnalyticsSection = () => {

  const {qrCodes,selectedCode,setSelectedCode} = useAppContext()
  const [data,setData] = useState([])

  const COLORS = [
    "var(--chart-1)",
    "var(--chart-2)",
    "var(--chart-3)",
    "var(--chart-4)",
    "var(--chart-5)",
  ];
  

  const getData = () => {
    const pack = {
      trend:[],
      devices:[]
    }

    // reformat the scanrates for better readability
    selectedCode.scanRates.forEach((item,dex) => {
      const pre = item.date.split('T')[0]
      const _date = (pre.split('-').slice(1)).join('-')
      pack.trend.push({date:_date,scans:item.count})
    });


    // check devices
    const holder = selectedCode.stats.devices

    Object.keys(holder).map((key,dex) => {
      pack.devices.push({
        name:key,
        value:holder[key]
      })
    })

    if (pack.devices.length==0) {
      pack.devices.push({name:'None',value:1})
    }

    setData(pack)
  }

  
  useEffect(() => {
    if (selectedCode) {
      getData()
    } else {
      if (qrCodes.length>0) {

      }
      setSelectedCode(qrCodes[0])
    }
  }, [selectedCode]);

  
  return (
    qrCodes.length>0 ?
    <div className="flex-1 px-6 py-10 overflow-x-hidden">
      <h2 className="text-2xl font-semibold mb-6 text-foreground">Analytics</h2>

      {/* QR code cards */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 mb-8">
        {qrCodes.map((code) => {
          const scans = code.stats.totalScans

          return (
            <Card
              key={code.slug}
              onClick={() => setSelectedCode(code)}
              className={`cursor-pointer transition-transform hover:-translate-y-1 ${
                selectedCode&&
                selectedCode.slug === code.slug?
                "border-2 border-primary bg-card":
                "bg-card/60"
              }`}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-foreground">/{code.slug}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-bold text-foreground">{scans} scans</p>
              </CardContent>
            </Card>
          );
        })}
        
      </div>

      {/* Timeframe selector */}
      <div className="mb-6 flex justify-end">
        
      </div>

      {/* Charts */}
      <Tabs defaultValue="trend" className="mb-8">
        <TabsList className="bg-muted text-muted-foreground">
          <TabsTrigger value="trend">Scan Trend</TabsTrigger>
          <TabsTrigger value="devices">Devices</TabsTrigger>
        </TabsList>

        {/* Trend Line Chart */}
        <TabsContent value="trend">
          <Card>
            <CardHeader>
              <CardTitle>
                Scans Over Time – /{selectedCode&&selectedCode.slug}
              </CardTitle>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.trend} margin={{ left: -20, right: 10 }}>
                  <XAxis
                    dataKey="date"
                    tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                  />
                  <YAxis
                    tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{ background: "var(--background)", border: "none" }}
                    labelStyle={{ color: "var(--primary)" }}
                  />
                  <Line
                  type="monotone"
                  dataKey="scans"
                  stroke="var(--chart-1)"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Devices Pie Chart */}
        <TabsContent value="devices">
          <Card>
            <CardHeader>
              <CardTitle>Device Breakdown – /{selectedCode&&selectedCode.slug}</CardTitle>
            </CardHeader>
            <CardContent className="h-72 flex items-center justify-center ">
              <ResponsiveContainer width="60%" height="100%">
                <PieChart>
                  <Pie
                    data={data.devices}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={4}
                    label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                  >
                    {
                      data.length>0&&
                      data.devices.map((_, index) => (
                        <Cell key={index} fill={`var(--chart-${(index % COLORS.length) + 1})`} />
                      ))
                    }
                  </Pie>
                  <Tooltip
                    itemStyle={{
                      color:'white'
                    }}
                    contentStyle={{ 
                      background: "var(--background)", 
                      border: "1px solid var(--primary)",
                      borderRadius: 5,
                      color: "#ffffff" 
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>:
    <NoQrCode />
  );
};

export default AnalyticsSection;
