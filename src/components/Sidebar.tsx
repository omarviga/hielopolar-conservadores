
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Settings, Home, Package, Users, Calendar as CalendarIcon, BarChart3, Map, Wrench, BoxesIcon, ShoppingCart, Truck, QrCode, ListOrdered } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside data-sidebar="sidebar" className="fixed inset-y-0 left-0 z-40 w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
      <div className="p-6">
        <h2 className="text-2xl font-bold">Hielo App</h2>
      </div>

      <nav className="px-3 py-2 space-y-1">
        <NavLink
          to="/"
          className={({ isActive }) => 
            isActive ? 'sidebar-item-active sidebar-item' : 'sidebar-item'
          }
          end
        >
          <Home size={20} />
          <span>Inicio</span>
        </NavLink>

        <NavLink
          to="/assets"
          className={({ isActive }) => 
            isActive ? 'sidebar-item-active sidebar-item' : 'sidebar-item'
          }
        >
          <Package size={20} />
          <span>Activos</span>
        </NavLink>

        <NavLink
          to="/clients"
          className={({ isActive }) => 
            isActive ? 'sidebar-item-active sidebar-item' : 'sidebar-item'
          }
        >
          <Users size={20} />
          <span>Clientes</span>
        </NavLink>

        <NavLink
          to="/maintenance"
          className={({ isActive }) => 
            isActive ? 'sidebar-item-active sidebar-item' : 'sidebar-item'
          }
        >
          <Wrench size={20} />
          <span>Mantenimiento</span>
        </NavLink>
        
        <NavLink
          to="/service-orders"
          className={({ isActive }) => 
            isActive ? 'sidebar-item-active sidebar-item' : 'sidebar-item'
          }
        >
          <ListOrdered size={20} />
          <span>Órdenes de Servicio</span>
        </NavLink>

        <NavLink
          to="/calendar"
          className={({ isActive }) => 
            isActive ? 'sidebar-item-active sidebar-item' : 'sidebar-item'
          }
        >
          <CalendarIcon size={20} />
          <span>Calendario</span>
        </NavLink>

        <NavLink
          to="/reports"
          className={({ isActive }) => 
            isActive ? 'sidebar-item-active sidebar-item' : 'sidebar-item'
          }
        >
          <BarChart3 size={20} />
          <span>Reportes</span>
        </NavLink>

        <NavLink
          to="/map"
          className={({ isActive }) => 
            isActive ? 'sidebar-item-active sidebar-item' : 'sidebar-item'
          }
        >
          <Map size={20} />
          <span>Mapa</span>
        </NavLink>

        <NavLink
          to="/repairs"
          className={({ isActive }) => 
            isActive ? 'sidebar-item-active sidebar-item' : 'sidebar-item'
          }
        >
          <Wrench size={20} />
          <span>Reparaciones</span>
        </NavLink>

        <NavLink
          to="/inventory"
          className={({ isActive }) => 
            isActive ? 'sidebar-item-active sidebar-item' : 'sidebar-item'
          }
        >
          <BoxesIcon size={20} />
          <span>Inventario</span>
        </NavLink>

        <NavLink
          to="/orders"
          className={({ isActive }) => 
            isActive ? 'sidebar-item-active sidebar-item' : 'sidebar-item'
          }
        >
          <ShoppingCart size={20} />
          <span>Pedidos</span>
        </NavLink>

        <NavLink
          to="/suppliers"
          className={({ isActive }) => 
            isActive ? 'sidebar-item-active sidebar-item' : 'sidebar-item'
          }
        >
          <Truck size={20} />
          <span>Proveedores</span>
        </NavLink>
        
        <NavLink
          to="/qr-generator"
          className={({ isActive }) => 
            isActive ? 'sidebar-item-active sidebar-item' : 'sidebar-item'
          }
        >
          <QrCode size={20} />
          <span>Generador QR</span>
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) => 
            isActive ? 'sidebar-item-active sidebar-item' : 'sidebar-item'
          }
        >
          <Settings size={20} />
          <span>Configuración</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
