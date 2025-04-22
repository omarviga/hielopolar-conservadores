
import React from 'react';

interface LocationPopupProps {
  address: string;
}

export const LocationPopupContent: React.FC<LocationPopupProps> = ({ address }) => {
  return (
    <div className="p-2">
      <p className="text-sm">{address}</p>
    </div>
  );
};
