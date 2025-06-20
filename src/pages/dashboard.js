import { useState,useEffect } from "react";
import MainView from '@/components/dashboard-comps/main-view';

import {
  Menu,
  QrCode,
  BarChart2,
  Settings,
  Plus,
  Home,
} from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import QRCodesSection from "@/components/dashboard-comps/qrs-view";
import AnalyticsSection from "@/components/dashboard-comps/analytics-view";
import SettingsSection from "@/components/dashboard-comps/settings-view";
import SidebarContent from "@/components/dashboard-comps/sidebar-content";
import CreateQRCodeSection from "@/components/dashboard-comps/create-qr";
import { useAppContext } from "@/context/app-context";
import MirageLoader from "@/components/misc-comps/mirage-loader";
import QRCodeDetailsPanel from "@/components/dashboard-comps/qr-code/qr-code-view";


const navItems = [
  { name: "Overview", icon: Home,tag:'overview' },
  { name: "QR Codes", icon: QrCode, tag:'qr-codes' },
  { name: "Analytics", icon: BarChart2,tag:'analytics' },
  { name: "Settings", icon: Settings, tag:'settings' },
];

const TagifyDashboard = () => {
  
  const {currentPanel,addUser} = useAppContext()

  const [sidebarOpen, setSidebarOpen] = useState(false);

  

  return (
    <div className="h-[94vh] bg-background text-foreground flex">
      {/* Mobile sidebar – Sheet */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetTrigger asChild>
          <Button
            size="icon"
            className="absolute top-4 left-4 z-20 md:hidden bg-primary hover:bg-primary/90
            
            "
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0 bg-background text-foreground">
          <SidebarContent navItems={navItems} />
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:flex-col w-[14vw] bg-background shadow-lg">
        <SidebarContent navItems={navItems} />
      </aside>

      {/* Dashboard content section */}
      <main className="flex-1 overflow-y-auto
      flex flex-col

      sm:px-0
      md:px-0
      lg:px-0
      xl:px-[6vw]
      2xl:px-[10vw]
      
      ">

        {
          currentPanel=='overview'?
          <MainView />:
          currentPanel=='qr-codes'?
          <QRCodesSection />:
          currentPanel=='qr-code-details'?
          <QRCodeDetailsPanel />:
          currentPanel=='analytics'?
          <AnalyticsSection  />:
          currentPanel=='creating'?
          <CreateQRCodeSection />:
          currentPanel=='settings'?
          <SettingsSection />:
          currentPanel=='loading'?
          <MirageLoader />
          :''

        }
      </main>
    </div>
  );
};

export default TagifyDashboard;
