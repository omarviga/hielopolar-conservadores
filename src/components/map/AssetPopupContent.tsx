
import React from 'react';

interface AssetPopupProps {
  model: string;
  location: string;
  capacity: string;
  assignedTo?: string;
}

export const AssetPopupContent: React.FC<AssetPopupProps> = ({
  model,
  location,
  capacity,
  assignedTo
}) => {
  return (
    <div className="p-2">
      <h3 className="font-bold">{model}</h3>
      <p className="text-sm">{location}</p>
      <p className="text-sm">Capacidad: {capacity}</p>
      {assignedTo && <p className="text-sm">Cliente: {assignedTo}</p>}
    </div>
  );
};
