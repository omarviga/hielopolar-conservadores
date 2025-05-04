import React from 'react';
import { Bell, Menu, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  return (
    <nav className="flex items-center justify-between px-4 py-2 bg-white border-b h-16">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/c1da25b1-89e2-4efd-b463-7c1df36a52bd.png" 
            alt="Hielo Polar del Centro" 
            className="h-12 w-auto" 
          />
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Buscar..." 
            className="pl-9 pr-4 py-2 text-sm rounded-md border focus:outline-none focus:ring-1 focus:ring-polar-500 w-48 md:w-64"
          />
        </div>
        
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
        </Button>
        
        <div className="h-8 w-8 rounded-full bg-polar-600 text-white flex items-center justify-center">
          <span className="text-sm font-medium">AP</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
