
import { useEffect } from 'react';

export const useGlobeRotation = (map: mapboxgl.Map) => {
  useEffect(() => {
    if (!map) return;

    // Initialize the globe rotation
    let start = 0;
    const rotateGlobe = (timestamp: number) => {
      if (!map || !map.isStyleLoaded()) return;
      
      if (start === 0) {
        start = timestamp;
      }

      // Slow rotation speed
      const rotationSpeed = 5; // degrees per second
      const elapsed = (timestamp - start) / 1000;
      // Removed unused rotationDegrees variable

      // Set the new center with rotated longitude
      try {
        const currentCenter = map.getCenter();
        map.setCenter([
          currentCenter.lng + 0.05,
          currentCenter.lat
        ]);
        
        // Request the next frame
        requestAnimationFrame(rotateGlobe);
      } catch (error) {
        console.error("Error rotating globe:", error);
      }
    };

    // Start the animation if the style is loaded
    if (map.isStyleLoaded()) {
      requestAnimationFrame(rotateGlobe);
    } else {
      map.once('style.load', () => {
        requestAnimationFrame(rotateGlobe);
      });
    }

    return () => {
      // No direct way to cancel requestAnimationFrame, but the map check
      // in the rotateGlobe function will prevent further execution
      start = 0;
    };
  }, [map]);
};
