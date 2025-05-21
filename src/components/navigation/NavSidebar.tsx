
import { useLocation, NavLink } from "react-router-dom";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarTrigger, 
  SidebarGroup, 
  SidebarGroupLabel, 
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar
} from "@/components/ui/sidebar";
import { FileText, ChartBar, Calculator, MessageSquare, User, ExternalLink } from "lucide-react";

const NavSidebar = () => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;
  
  const isActive = (path: string) => currentPath.startsWith(path);
  const getNavClass = ({ isActive }: { isActive: boolean }) => {
    return `flex items-center p-2 rounded-md transition-all ${
      isActive 
        ? "bg-trade-purple/20 text-trade-purple-dark font-medium" 
        : "hover:bg-white/40 hover:scale-105 transition-all duration-300 text-foreground"
    }`;
  };
  
  return (
    <Sidebar className={`${collapsed ? "w-16" : "w-64"} glassmorphism`} collapsible="icon">
      <SidebarTrigger className="hidden" />
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase text-muted-foreground px-4 py-2">
            {!collapsed && "Main Navigation"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/dashboard" className={getNavClass}>
                    <ChartBar className="h-5 w-5 mr-3" />
                    {!collapsed && "Dashboard"}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/letter-of-credit" className={getNavClass}>
                    <FileText className="h-5 w-5 mr-3" />
                    {!collapsed && "Letter of Credit"}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/bank-guarantee" className={getNavClass}>
                    <FileText className="h-5 w-5 mr-3" />
                    {!collapsed && "Bank Guarantee"}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/remittance" className={getNavClass}>
                    <Calculator className="h-5 w-5 mr-3" />
                    {!collapsed && "Remittance"}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/exports" className={getNavClass}>
                    <ExternalLink className="h-5 w-5 mr-3 rotate-45" />
                    {!collapsed && "Exports"}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/imports" className={getNavClass}>
                    <ExternalLink className="h-5 w-5 mr-3 rotate-[225deg]" />
                    {!collapsed && "Imports"}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/documents" className={getNavClass}>
                    <FileText className="h-5 w-5 mr-3" />
                    {!collapsed && "Documents"}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/finance" className={getNavClass}>
                    <ChartBar className="h-5 w-5 mr-3" />
                    {!collapsed && "Finance"}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase text-muted-foreground px-4 py-2">
            {!collapsed && "Support"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/support" className={getNavClass}>
                    <MessageSquare className="h-5 w-5 mr-3" />
                    {!collapsed && "Get Help"}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/profile" className={getNavClass}>
                    <User className="h-5 w-5 mr-3" />
                    {!collapsed && "My Profile"}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default NavSidebar;
