import { useState,useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { useAppContext } from "@/context/app-context";






const MainView = () => {

  const {user,activatePanel,qrCodes,recentCodes} = useAppContext()
  const [stats,setStats]  = useState([
    { label: "Total QR Codes", value:0 },
    { label: "Scans (30 days)", value: "0" }
  ])

  const updateStats = () => {
    var total = 0
    const _stats = [...stats]
    _stats[0].value = qrCodes.length
    
    qrCodes.forEach((code,dex) => {
      total = total+code.stats.totalScans
    });
      
    _stats[1].value = total


    setStats(_stats)
  }
  

 

  useEffect(() => {
    if (user&&qrCodes) {
      updateStats()
    }
  }, [user,qrCodes]);


  return (
    <main className="flex-1 px-6 py-10 overflow-x-hidden
    scrollbar-none
    ">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Dashboard</h1>
        <div 
        className="px-2 py-2 gap-2 bg-primary hover:bg-accent shadow-lg
        rounded-md flex items-center justify-center
        text-foreground cursor-pointer
        
        "
        onClick={() => {activatePanel("creating")}}
        >
          <Plus className="h-4 w-4" /> New QR
        </div>
      </div>

      {/* Stats */}
      <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4 mb-12">
        {stats.map(({ label, value }) => (
          <Card key={label} className="bg-card text-foreground hover:shadow-xl transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground font-medium">
                {label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{value}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Recent QR Codes */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">Recent QR Codes</h2>
        <Card className="bg-card text-foreground">
          <CardContent className="p-0">
            <ScrollArea className="h-60">
              {
                recentCodes.length>0?
                recentCodes.map((code,index) => {
                  return(
                    <div key={'recent-'+index} className="px-6 py-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                        <div>
                          <p className="font-medium text-foreground">/{code.slug}</p>
                          <p className="text-xs text-muted-foreground truncate max-w-xs">{code.target}</p>
                        </div>
                        <span className="text-sm text-muted-foreground">{code.stats.totalScans} scans</span>
                      </div>
                      {index < recentCodes.length - 1 && (
                        <Separator className="my-4 bg-border" />
                      )}
                    </div>
                  )
              }):
              <div className='my-24  flex items-center justify-center'
              >
                <div className='text-2xl'
                >
                  No Activity yet
                </div>
              </div>
              }
            </ScrollArea>
          </CardContent>
        </Card>
      </section>

      

      {/* Footer */}
      <footer className="text-center text-xs text-muted-foreground py-4">
        &copy; {new Date().getFullYear()} Tagify. All rights reserved.
      </footer>
    </main>
  );
};

export default MainView;
