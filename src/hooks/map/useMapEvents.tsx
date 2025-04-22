
import mapboxgl from 'mapbox-gl';
import { createRoot } from 'react-dom/client';
import { AssetPopupContent } from '@/components/map/AssetPopupContent';
import { LocationPopupContent } from '@/components/map/LocationPopupContent';

export const useMapEvents = () => {
  // Cambiamos los tipos a MapLayerMouseEvent de mapbox-gl
  const handleClusterClick = (e: mapboxgl.MapLayerMouseEvent) => {
    if (!e.features || !e.features[0] || !e.features[0].properties) return;

    const map = e.target as mapboxgl.Map;
    const clusterId = e.features[0].properties.cluster_id;
    const source = map.getSource('assets');

    if (clusterId && source && 'getClusterExpansionZoom' in source) {
      (source as any).getClusterExpansionZoom(clusterId, (err: any, zoom: number) => {
        if (err || !map) return;

        map.easeTo({
          center: (e.features?.[0].geometry as GeoJSON.Point).coordinates as [number, number],
          zoom: zoom || map.getZoom() + 2
        });
      });
    }
  };

  const handleUnclusteredPointClick = (e: mapboxgl.MapLayerMouseEvent) => {
    if (!e.features || !e.features[0] || !e.features[0].properties) return;

    const coordinates = (e.features[0].geometry as GeoJSON.Point).coordinates.slice() as [number, number];
    const props = e.features[0].properties;

    const popupNode = document.createElement('div');
    const root = createRoot(popupNode);
    root.render(
      <AssetPopupContent
        model={props.model}
        location={props.location}
        capacity={props.capacity}
        assignedTo={props.assignedTo}
      />
    );

    new mapboxgl.Popup({ offset: 25 })
      .setLngLat(coordinates)
      .setDOMContent(popupNode)
      .addTo(e.target as mapboxgl.Map);
  };

  const handleLocationPointClick = (e: mapboxgl.MapLayerMouseEvent) => {
    if (!e.features || !e.features[0] || !e.features[0].properties) return;

    const coordinates = (e.features[0].geometry as GeoJSON.Point).coordinates.slice() as [number, number];
    const props = e.features[0].properties;

    const popupNode = document.createElement('div');
    const root = createRoot(popupNode);
    root.render(
      <LocationPopupContent address={props.address} />
    );

    new mapboxgl.Popup({ offset: 25 })
      .setLngLat(coordinates)
      .setDOMContent(popupNode)
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
