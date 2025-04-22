
import mapboxgl from 'mapbox-gl';

export const useMapEvents = () => {
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

  const setupEventHandlers = (map: mapboxgl.Map) => {
    map.on('click', 'clusters', handleClusterClick);
    map.on('click', 'unclustered-point', handleUnclusteredPointClick);
    map.on('click', 'location-points', handleLocationPointClick);
    
    // Mouse events for cursor style
    map.on('mouseenter', 'clusters', () => {
      if (map) map.getCanvas().style.cursor = 'pointer';
    });
    
    map.on('mouseleave', 'clusters', () => {
      if (map) map.getCanvas().style.cursor = '';
    });
  };

  return { setupEventHandlers };
};
