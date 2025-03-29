
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-6xl font-bold text-polar-600 mb-4">404</h1>
        <p className="text-xl text-gray-700 mb-6">Página no encontrada</p>
        <p className="text-gray-500 mb-8">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>
        <Button className="bg-polar-600 hover:bg-polar-700">
          <Home className="mr-2 h-4 w-4" />
          Volver al inicio
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
