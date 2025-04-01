
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useClients } from '@/hooks/useClients';
import { Client } from '@/components/client/ClientInterface';
import { toast } from '@/hooks/use-toast';

// Componente para el mapa de clientes
const ClientsMap: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [showTokenInput, setShowTokenInput] = useState(true);
  const { clients } = useClients();
  const [mapInitialized, setMapInitialized] = useState(false);

  // Función para inicializar el mapa con el token de Mapbox
  const initializeMap = (token: string) => {
    if (!mapContainer.current || mapInitialized) return;

    try {
      mapboxgl.accessToken = token;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [-70.6506, -33.4372], // Centrado en Santiago, Chile
        zoom: 5,
      });

      // Añadir controles de navegación
      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
        }),
        'top-right'
      );

      // Añadir marcadores para cada cliente
      map.current.on('load', () => {
        clients.forEach((client) => {
          if (!client.coordinates || !map.current) return;
          
          // Crear elemento HTML para el marcador
          const el = document.createElement('div');
          el.className = 'marker';
          el.style.backgroundImage = `url(${client.imageSrc})`;
          el.style.width = '35px';
          el.style.height = '35px';
          el.style.backgroundSize = 'cover';
          el.style.borderRadius = '50%';
          el.style.border = '3px solid #0284c7'; // Polar-600
          el.style.cursor = 'pointer';
          
          // Crear popup con información del cliente
          const popup = new mapboxgl.Popup({ offset: 25 })
            .setHTML(`
              <div style="padding: 10px;">
                <h3 style="margin: 0; font-weight: bold;">${client.name}</h3>
                <p style="margin: 5px 0 0;">Contacto: ${client.contactPerson}</p>
                <p style="margin: 5px 0 0;">${client.phone}</p>
                <p style="margin: 5px 0 0;">${client.address}</p>
                <p style="margin: 5px 0 0;">Conservadores asignados: ${client.assetsAssigned}</p>
              </div>
            `);
          
          // Añadir marcador al mapa
          new mapboxgl.Marker(el)
            .setLngLat(client.coordinates)
            .setPopup(popup)
            .addTo(map.current);
        });
      });

      setMapInitialized(true);
      localStorage.setItem('mapbox_token', token);
      setShowTokenInput(false);
      
    } catch (error) {
      console.error('Error al inicializar el mapa:', error);
      toast({
        title: 'Error al inicializar el mapa',
        description: 'Revisa que el token de Mapbox sea válido e inténtalo de nuevo.',
        variant: 'destructive',
      });
    }
  };

  // Intentar cargar el token desde localStorage al inicio
  useEffect(() => {
    const savedToken = localStorage.getItem('mapbox_token');
    if (savedToken) {
      setMapboxToken(savedToken);
      initializeMap(savedToken);
    }
  }, []);

  // Limpiar al desmontar
  useEffect(() => {
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  // Manejar envío del formulario del token
  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mapboxToken) {
      initializeMap(mapboxToken);
    }
  };

  return (
    <div className="relative w-full h-[calc(100vh-140px)]">
      {showTokenInput && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-white bg-opacity-90">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Configuración de Mapbox</h2>
            <p className="text-gray-600 mb-4">
              Para visualizar el mapa de clientes, necesitas proporcionar un token público de Mapbox.
              Puedes obtenerlo registrándote en <a href="https://www.mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-polar-600 hover:underline">mapbox.com</a>
            </p>
            <form onSubmit={handleTokenSubmit}>
              <input
                type="text"
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
                placeholder="Ingresa tu token público de Mapbox"
                className="w-full p-2 border rounded mb-4"
                required
              />
              <button
                type="submit"
                className="w-full bg-polar-600 text-white py-2 rounded hover:bg-polar-700"
              >
                Guardar y Mostrar Mapa
              </button>
            </form>
          </div>
        </div>
      )}
      <div ref={mapContainer} className="w-full h-full rounded-lg shadow-md" />
      <style>
        {`
        .mapboxgl-popup-content {
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        `}
      </style>
    </div>
  );
};

export default ClientsMap;
