import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Package, Users, Calendar, Settings, BarChart, Wrench, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
interface SidebarProps {
  open: boolean;
}
const menuItems = [{
  title: 'Dashboard',
  icon: <LayoutDashboard className="h-5 w-5" />,
  path: '/'
}, {
  title: 'Conservadores',
  icon: <Package className="h-5 w-5" />,
  path: '/assets'
}, {
  title: 'Clientes',
  icon: <Users className="h-5 w-5" />,
  path: '/clients'
}, {
  title: 'Mantenimiento',
  icon: <Wrench className="h-5 w-5" />,
  path: '/maintenance'
}, {
  title: 'Calendario',
  icon: <Calendar className="h-5 w-5" />,
  path: '/calendar'
}, {
  title: 'Reportes',
  icon: <BarChart className="h-5 w-5" />,
  path: '/reports'
}, {
  title: 'Configuración',
  icon: <Settings className="h-5 w-5" />,
  path: '/settings'
}];
const Sidebar: React.FC<SidebarProps> = ({
  open
}) => {
  return <aside className={cn("bg-sidebar h-screen transition-all duration-300 flex flex-col", open ? "w-64" : "w-0 md:w-16 overflow-hidden")}>
      <div className="p-4 flex items-center justify-center h-16 border-b border-sidebar-border">
        {open ? <h1 className="text-lg font-bold text-sidebar-foreground">Conservadores Hielo Polar</h1> : <Package className="h-6 w-6 text-sidebar-foreground" />}
      </div>
      
      <div className="flex-1 py-4 overflow-y-auto">
        <nav className="px-2 space-y-1">
          {menuItems.map(item => <NavLink key={item.title} to={item.path} className={({
          isActive
        }) => cn("sidebar-item", isActive && "sidebar-item-active")}>
              {item.icon}
              {open && <span>{item.title}</span>}
            </NavLink>)}
        </nav>
      </div>
      
      <div className="p-4 border-t border-sidebar-border">
        <button className="sidebar-item w-full justify-center md:justify-start">
          <LogOut className="h-5 w-5" />
          {open && <span>Cerrar Sesión</span>}
        </button>
      </div>
    </aside>;
};
export default Sidebar;