import React from "react"
import BreadcrumbNav from "./breadcrumb-nav";
import ThemeToggle from "./theme-toggle";

type NavbarProps = {
    SidebarTrigger: React.FC;
}

const Navbar = ({SidebarTrigger}: NavbarProps) => {
  return (
    <nav className="flex items-center p-2.5 gap-4 bg-sidebar">
        <SidebarTrigger />
        <div className="flex-1"><BreadcrumbNav /></div>
        <ThemeToggle />
    </nav>
  )
}

export default Navbar