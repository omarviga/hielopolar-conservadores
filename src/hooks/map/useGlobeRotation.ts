import { useEffect, useRef } from 'react';

export const useGlobeRotation = (map: any) => {
  // We're keeping the rotation ref but will actually use it in the effect
  const animation = useRef<number | null>(null);

  useEffect(() => {
    if (!map) return;

    const spinGlobe = () => {
      const now = Date.now();
      const diff = now - (Number(animation.current) || now);
      animation.current = now;

      // Limiting the delta to 100ms translates to limiting the speed of the globe
      if (diff > 100) return;

      const newRotation = map.getBearing() + diff / 50;

      // Ensure the rotation is within -180 to 180 degrees
      const normalizedRotation = ((newRotation + 180) % 360) - 180;

      map.setBearing(normalizedRotation);
    };

    map.on('render', () => {
      if (map.loaded()) {
        spinGlobe();
      }
    });

    return () => {
      map.off('render', spinGlobe);
      animation.current = null;
    };
  }, [map]);
};
