
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { Asset } from '@/components/AssetCard';
import { Button } from '@/components/ui/button';
import MapLegend from './MapLegend';
import 'mapbox-gl/dist/mapbox-gl.css';

interface Location {
  address: string;
  coordinates?: [number, number];
}

interface MapContainerProps {
  mapboxToken: string;
  assets: Asset[];
  locations: Location[];
  onChangeToken: () => void;
}

const MapContainer: React.FC<MapContainerProps> = ({ mapboxToken, assets, locations, onChangeToken }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-100.6172, 19.9404],
      zoom: 5,
    });

    map.current.addControl(
      new mapboxgl.NavigationControl(),
      'top-right'
    );

    map.current.on('load', () => {
      if (!map.current) return;

      // Add a source for asset points with clustering enabled
      map.current.addSource('assets', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: assets.filter(asset => asset.coordinates).map(asset => ({
            type: 'Feature',
            properties: {
              id: asset.id,
              model: asset.model,
              location: asset.location,
              capacity: asset.capacity,
              assignedTo: asset.assignedTo || '',
              status: asset.status
            },
            geometry: {
              type: 'Point',
              coordinates: asset.coordinates
            }
          }))
        },
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 50
      });

      // Add a layer for the clusters
      map.current.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'assets',
        filter: ['has', 'point_count'],
        paint: {
          'circle-color': '#3B82F6',
          'circle-radius': [
            'step',
            ['get', 'point_count'],
            20,
            10,
            30,
            20,
            40
          ],
          'circle-stroke-width': 2,
          'circle-stroke-color': '#fff'
        }
      });

      // Add a layer for the cluster counts
      map.current.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'assets',
        filter: ['has', 'point_count'],
        layout: {
          'text-field': '{point_count_abbreviated}',
          'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
          'text-size': 12
        },
        paint: {
          'text-color': '#ffffff'
        }
      });

      // Add a layer for the individual assets (non-clustered points)
      map.current.addLayer({
        id: 'unclustered-point',
        type: 'circle',
        source: 'assets',
        filter: ['!', ['has', 'point_count']],
        paint: {
          'circle-color': [
            'match',
            ['get', 'status'],
            'available', '#3B82F6',
            'in-use', '#10B981',
            'maintenance', '#EF4444',
            '#3B82F6'  // default color
          ],
          'circle-radius': 10,
          'circle-stroke-width': 2,
          'circle-stroke-color': '#fff'
        }
      });

      // Add locations data as a separate source
      map.current.addSource('locations', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: locations.filter(loc => loc.coordinates).map(loc => ({
            type: 'Feature',
            properties: {
              address: loc.address
            },
            geometry: {
              type: 'Point',
              coordinates: loc.coordinates
            }
          }))
        }
      });

      // Add a layer for the locations
      map.current.addLayer({
        id: 'location-points',
        type: 'circle',
        source: 'locations',
        paint: {
          'circle-color': '#6B7280',
          'circle-radius': 10,
          'circle-stroke-width': 2,
          'circle-stroke-color': '#fff'
        }
      });

      // When a cluster is clicked, zoom in
      map.current.on('click', 'clusters', (e) => {
        const features = map.current?.queryRenderedFeatures(e.point, { layers: ['clusters'] });
        if (!features || features.length === 0 || !map.current) return;
        
        const clusterId = features[0].properties?.cluster_id;
        const source = map.current.getSource('assets');
        
        if (clusterId && source && 'getClusterExpansionZoom' in source) {
          source.getClusterExpansionZoom(clusterId, (err, zoom) => {
            if (err || !map.current) return;
            
            map.current.easeTo({
              center: (features[0].geometry as GeoJSON.Point).coordinates as [number, number],
              zoom: zoom || map.current.getZoom() + 2
            });
          });
        }
      });

      // Change cursor on hover
      map.current.on('mouseenter', 'clusters', () => {
        if (map.current) map.current.getCanvas().style.cursor = 'pointer';
      });
      map.current.on('mouseleave', 'clusters', () => {
        if (map.current) map.current.getCanvas().style.cursor = '';
      });
      
      // Handle clicks on individual points
      map.current.on('click', 'unclustered-point', (e) => {
        if (!e.features || e.features.length === 0 || !map.current) return;
        
        const feature = e.features[0];
        const coordinates = (feature.geometry as GeoJSON.Point).coordinates.slice() as [number, number];
        const props = feature.properties;
        
        if (!props) return;
        
        const popupContent = `
          <div class="p-2">
            <h3 class="font-bold">${props.model}</h3>
            <p class="text-sm">${props.location}</p>
            <p class="text-sm">Capacidad: ${props.capacity}</p>
            ${props.assignedTo ? `<p class="text-sm">Cliente: ${props.assignedTo}</p>` : ''}
          </div>
        `;
        
        new mapboxgl.Popup({ offset: 25 })
          .setLngLat(coordinates)
          .setHTML(popupContent)
          .addTo(map.current);
      });
      
      // Handle clicks on location points
      map.current.on('click', 'location-points', (e) => {
        if (!e.features || e.features.length === 0 || !map.current) return;
        
        const feature = e.features[0];
        const coordinates = (feature.geometry as GeoJSON.Point).coordinates.slice() as [number, number];
        const props = feature.properties;
        
        if (!props) return;
        
        const popupContent = `
          <div class="p-2">
            <p class="text-sm">${props.address}</p>
          </div>
        `;
        
        new mapboxgl.Popup({ offset: 25 })
          .setLngLat(coordinates)
          .setHTML(popupContent)
          .addTo(map.current);
      });
    });

    return () => {
      map.current?.remove();
    };
  }, [assets, locations, mapboxToken]);

  return (
    <div className="relative w-full h-[600px] rounded-lg overflow-hidden shadow-lg">
      <div ref={mapContainer} className="absolute inset-0" />
      <MapLegend />
      <div className="absolute top-4 right-4 bg-white p-2 rounded-lg shadow z-10">
        <Button 
          onClick={onChangeToken}
          variant="outline"
          size="sm"
        >
          Cambiar Token
        </Button>
      </div>
    </div>
  );
};

export default MapContainer;
