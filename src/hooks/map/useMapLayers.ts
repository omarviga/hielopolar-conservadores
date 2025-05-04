
import { Asset } from '@/components/AssetCard';
import { Location } from '@/types/map';

export const useMapLayers = () => {
  const addMapLayers = (map: any, assets: Asset[], locations: Location[]) => {
    // Add assets source
    map.addSource('assets', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: assets
          .filter(asset => asset.coordinates)
          .map(asset => ({
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
              coordinates: asset.coordinates || [0, 0] // Provide default to avoid undefined
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
        features: locations
          .filter(loc => loc.coordinates)
          .map(loc => ({
            type: 'Feature',
            properties: {
              address: loc.address
            },
            geometry: {
              type: 'Point',
              coordinates: loc.coordinates || [0, 0] // Provide default to avoid undefined
            }
          }))
      }
    });

    // Add visualization layers
    addVisualizationLayers(map);
  };

  const addVisualizationLayers = (map: mapboxgl.Map) => {
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

    // Cluster count layer
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

    // Individual assets layer
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

    // Locations layer
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

  return { addMapLayers };
};
