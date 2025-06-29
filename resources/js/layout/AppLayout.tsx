import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import AppHeader from "./AppHeader";
import Backdrop from "./Backdrop";
import AppSidebar from "./AppSidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const LayoutContent: React.FC<LayoutProps> = ({children}: LayoutProps) => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  return (
    <div className="min-h-screen xl:flex dark:bg-gray-900">
      <div>
        <AppSidebar />
        <Backdrop />
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out dark:bg-gray-900 ${
          isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
        } ${isMobileOpen ? "ml-0" : ""}`}
      >
        <AppHeader />
        <div className="flex p-4 mx-auto max-w-(--breakpoint-2xl) h-max md:p-6 dark:bg-gray-900">
          {children}
        </div>
      </div>
    </div>
  );
};

const AppLayout: React.FC<LayoutProps> = ({children}: LayoutProps) => {
  return (
    <SidebarProvider>
      <LayoutContent>
        {children}
      </LayoutContent>
    </SidebarProvider>
  );
};

export default AppLayout;
