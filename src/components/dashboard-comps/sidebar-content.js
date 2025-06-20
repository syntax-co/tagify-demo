import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { useAppContext } from "@/context/app-context";
import { Card } from "../ui/card";

const SidebarContent = ({ navItems }) => {
  
  
  const {activatePanel} = useAppContext()


  const handleClick = (name) => {
    activatePanel(name)
  }
  

  
  
  return (
    <div className="flex flex-col h-full">
      <Card className='h-full w-full rounded-l-none
      flex flex-col' 
      >
        <div className="p-6 text-2xl font-extrabold tracking-tight text-foreground"></div>

        <nav className="mt-4 flex-1 flex flex-col gap-1">
          {navItems.map(({ name, icon: Icon, tag}) => (
            <div
              key={name}
              variant="ghost"
              className="flex items-center gap-3 px-6 text-foreground hover:bg-muted rounded-none
              text-2xl py-2 cursor-pointer
              
              sm:text-base
              md:text-base
              lg:text-lg
              xl:text-lg
              
              "
              onClick={() => {handleClick(tag)}}
            >
              <Icon className="h-5 w-5" /> {name}
            </div>
          ))}
        </nav>

        <div className="p-6">
          <div 
          className="w-full py-2 gap-2 bg-primary hover:bg-accent shadow-lg
          rounded-md flex items-center justify-center
          text-foreground cursor-pointer
          
          sm:text-xs
          md:text-base
          lg:text-lg
          xl:text-lg
          "
          onClick={() => {activatePanel("creating")}}
          >
            <Plus className="h-4 w-4" /> New QR
          </div>
        </div>
      </Card>

    </div>
  )
};

export default SidebarContent;
