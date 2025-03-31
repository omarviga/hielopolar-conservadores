
import React from 'react';
import { Button } from '@/components/ui/button';

interface StatusToggleProps {
  value: 'active' | 'inactive';
  onChange: (value: 'active' | 'inactive') => void;
}

const StatusToggle: React.FC<StatusToggleProps> = ({ value, onChange }) => {
  return (
    <div className="flex gap-4">
      <Button
        type="button"
        variant={value === 'active' ? 'default' : 'outline'}
        className={value === 'active' ? 'bg-polar-600' : ''}
        onClick={() => onChange('active')}
      >
        Activo
      </Button>
      <Button
        type="button"
        variant={value === 'inactive' ? 'default' : 'outline'}
        className={value === 'inactive' ? 'bg-red-600' : ''}
        onClick={() => onChange('inactive')}
      >
        Inactivo
      </Button>
    </div>
  );
};

export default StatusToggle;
