
import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Package, Users, Calendar, Settings, BarChart3, Wrench, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator,
} from '@/components/ui/context-menu';
import { toast } from '@/hooks/use-toast';

interface SidebarProps {
  open: boolean;
}

const menuItems = [
  {
    title: 'Dashboard',
    icon: <LayoutDashboard className="h-5 w-5" />,
    path: '/'
  }, 
  {
    title: 'Conservadores',
    icon: <Package className="h-5 w-5" />,
    path: '/assets',
    subItems: [
      { title: 'Lista de Conservadores', path: '/assets' },
      { title: 'Mapa de Conservadores', path: '/map' }
    ]
  }, 
  {
    title: 'Clientes',
    icon: <Users className="h-5 w-5" />,
    path: '/clients',
    subItems: [
      { title: 'Lista de Clientes', path: '/clients' },
      { title: 'Mapa de Clientes', path: '/clients/map' }
    ]
  }, 
  {
    title: 'Mantenimiento',
    icon: <Wrench className="h-5 w-5" />,
    path: '/maintenance'
  }, 
  {
    title: 'Calendario',
    icon: <Calendar className="h-5 w-5" />,
    path: '/calendar'
  }, 
  {
    title: 'Reportes',
    icon: <BarChart3 className="h-5 w-5" />,
    path: '/reports'
  },
  {
    title: 'Configuración',
    icon: <Settings className="h-5 w-5" />,
    path: '/settings'
  }
];

const Sidebar: React.FC<SidebarProps> = ({ open }) => {
  const handleLogout = () => {
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión correctamente"
    });
  };

  return (
    <aside className={cn(
      "bg-sidebar h-screen transition-all duration-300 flex flex-col", 
      open ? "w-64" : "w-0 md:w-16 overflow-hidden"
    )}>
      <div className="p-4 flex items-center justify-center h-16 border-b border-sidebar-border">
        {open ? (
          <h1 className="text-lg font-bold text-white">Conservadores Hielo Polar</h1>
        ) : (
          <Package className="h-6 w-6 text-white" />
        )}
      </div>
      
      <div className="flex-1 py-4 overflow-y-auto">
        <nav className="px-2 space-y-1">
          {menuItems.map(item => (
            item.subItems ? (
              <ContextMenu key={item.title}>
                <ContextMenuTrigger>
                  <NavLink 
                    to={item.path} 
                    className={({ isActive }) => cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md text-white hover:bg-sidebar-accent transition-colors", 
                      isActive && "bg-sidebar-accent"
                    )}
                  >
                    {item.icon}
                    {open && <span>{item.title}</span>}
                  </NavLink>
                </ContextMenuTrigger>
                <ContextMenuContent className="w-48">
                  {item.subItems.map(subItem => (
                    <ContextMenuItem key={subItem.path} asChild>
                      <NavLink 
                        to={subItem.path}
                        className="w-full flex items-center"
                      >
                        {subItem.title === 'Mapa de Clientes' ? <Users className="h-4 w-4 mr-2" /> : <Package className="h-4 w-4 mr-2" />}
                        {subItem.title}
                      </NavLink>
                    </ContextMenuItem>
                  ))}
                </ContextMenuContent>
              </ContextMenu>
            ) : (
              <NavLink 
                key={item.title} 
                to={item.path} 
                className={({ isActive }) => cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-white hover:bg-sidebar-accent transition-colors", 
                  isActive && "bg-sidebar-accent"
                )}
              >
                {item.icon}
                {open && <span>{item.title}</span>}
              </NavLink>
            )
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t border-sidebar-border">
        <button 
          className="flex items-center gap-3 px-3 py-2 rounded-md text-white hover:bg-sidebar-accent transition-colors w-full justify-center md:justify-start"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          {open && <span>Cerrar Sesión</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
