import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { Asset } from '@/components/AssetCard';
import { Location } from '@/types/map';

interface UseMapInitializationProps {
  mapboxToken: string;
  assets: Asset[];
  locations: Location[];
}

export const useMapInitialization = ({ mapboxToken, assets, locations }: UseMapInitializationProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      projection: 'globe',
      zoom: 1.5,
      center: [30, 15],
      pitch: 45,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Disable scroll zoom for smoother experience
    map.current.scrollZoom.disable();

    map.current.on('style.load', () => {
      if (!map.current) return;
      
      addMapLayers(map.current, assets, locations);
      setupEventHandlers(map.current);
      initializeGlobeRotation(map.current);
    });

    return () => {
      map.current?.remove();
    };
  }, [assets, locations, mapboxToken]);

  return { mapContainer, map };
};

// Helper function to add map layers
const addMapLayers = (map: mapboxgl.Map, assets: Asset[], locations: Location[]) => {
  // Add assets source
  map.addSource('assets', {
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

  // Add locations source
  map.addSource('locations', {
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

  // Add layers
  addMapboxLayers(map);
};

// Helper function to add layers
const addMapboxLayers = (map: mapboxgl.Map) => {
  // Clusters layer
  map.addLayer({
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
  map.addLayer({
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
  map.addLayer({
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

  // Add a layer for the locations
  map.addLayer({
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
};

// Helper function to setup event handlers
const setupEventHandlers = (map: mapboxgl.Map) => {
  map.on('click', 'clusters', handleClusterClick);
  map.on('click', 'unclustered-point', handleUnclusteredPointClick);
  map.on('click', 'location-points', handleLocationPointClick);
  
  // Mouse events
  map.on('mouseenter', 'clusters', () => {
    if (map) map.getCanvas().style.cursor = 'pointer';
  });
  
  map.on('mouseleave', 'clusters', () => {
    if (map) map.getCanvas().style.cursor = '';
  });
};

// Helper functions for click handlers
const handleClusterClick = (e: mapboxgl.MapMouseEvent & { features?: mapboxgl.MapboxGeoJSONFeature[] }) => {
  if (!e.features || !e.features[0] || !e.features[0].properties) return;
  
  const map = (e.target as mapboxgl.Map);
  const clusterId = e.features[0].properties.cluster_id;
  const source = map.getSource('assets');
  
  if (clusterId && source && 'getClusterExpansionZoom' in source) {
    source.getClusterExpansionZoom(clusterId, (err, zoom) => {
      if (err || !map) return;
      
      map.easeTo({
        center: (e.features?.[0].geometry as GeoJSON.Point).coordinates as [number, number],
        zoom: zoom || map.getZoom() + 2
      });
    });
  }
};

const handleUnclusteredPointClick = (e: mapboxgl.MapMouseEvent & { features?: mapboxgl.MapboxGeoJSONFeature[] }) => {
  if (!e.features || !e.features[0] || !e.features[0].properties) return;
  
  const coordinates = (e.features[0].geometry as GeoJSON.Point).coordinates.slice() as [number, number];
  const props = e.features[0].properties;
  
  new mapboxgl.Popup({ offset: 25 })
    .setLngLat(coordinates)
    .setHTML(`
      <div class="p-2">
        <h3 class="font-bold">${props.model}</h3>
        <p class="text-sm">${props.location}</p>
        <p class="text-sm">Capacidad: ${props.capacity}</p>
        ${props.assignedTo ? `<p class="text-sm">Cliente: ${props.assignedTo}</p>` : ''}
      </div>
    `)
    .addTo(e.target as mapboxgl.Map);
};

const handleLocationPointClick = (e: mapboxgl.MapMouseEvent & { features?: mapboxgl.MapboxGeoJSONFeature[] }) => {
  if (!e.features || !e.features[0] || !e.features[0].properties) return;
  
  const coordinates = (e.features[0].geometry as GeoJSON.Point).coordinates.slice() as [number, number];
  const props = e.features[0].properties;
  
  new mapboxgl.Popup({ offset: 25 })
    .setLngLat(coordinates)
    .setHTML(`
      <div class="p-2">
        <p class="text-sm">${props.address}</p>
      </div>
    `)
    .addTo(e.target as mapboxgl.Map);
};

// Helper function to initialize globe rotation
const initializeGlobeRotation = (map: mapboxgl.Map) => {
  const secondsPerRevolution = 240;
  const maxSpinZoom = 5;
  const slowSpinZoom = 3;
  let userInteracting = false;
  let spinEnabled = true;

  function spinGlobe() {
    if (!map) return;
    
    const zoom = map.getZoom();
    if (spinEnabled && !userInteracting && zoom < maxSpinZoom) {
      let distancePerSecond = 360 / secondsPerRevolution;
      if (zoom > slowSpinZoom) {
        const zoomDif = (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
        distancePerSecond *= zoomDif;
      }
      const center = map.getCenter();
      center.lng -= distancePerSecond;
      map.easeTo({ center, duration: 1000, easing: (n) => n });
    }
  }

  // Event listeners for interaction
  map.on('mousedown', () => { userInteracting = true; });
  map.on('dragstart', () => { userInteracting = true; });
  map.on('mouseup', () => {
    userInteracting = false;
    spinGlobe();
  });
  map.on('touchend', () => {
    userInteracting = false;
    spinGlobe();
  });
  map.on('moveend', spinGlobe);

  // Start the globe spinning
  spinGlobe();
};
