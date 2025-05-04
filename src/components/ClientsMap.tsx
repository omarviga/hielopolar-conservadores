import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useClients } from '@/hooks/useClients';
import { toast } from '@/hooks/use-toast';

interface ClientsMapProps {
  mapboxToken: string;
}

// Componente para el mapa de clientes
const ClientsMap: React.FC<ClientsMapProps> = ({ mapboxToken }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const { clients } = useClients();
  const [mapInitialized, setMapInitialized] = useState(false);

  // Función para inicializar el mapa con el token de Mapbox
  useEffect(() => {
    if (!mapContainer.current || mapInitialized || !mapboxToken) return;

    try {
      mapboxgl.accessToken = mapboxToken;
      
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
      
    } catch (error) {
      console.error('Error al inicializar el mapa:', error);
      toast({
        title: 'Error al inicializar el mapa',
        description: 'Revisa que el token de Mapbox sea válido e inténtalo de nuevo.',
        variant: 'destructive',
      });
    }
  }, [clients, mapboxToken, mapInitialized]);

  // Limpiar al desmontar
  useEffect(() => {
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[calc(100vh-140px)]">
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
