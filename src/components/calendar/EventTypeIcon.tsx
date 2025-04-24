
import React from 'react';
import { Wrench, Box, AlertTriangle, Clock } from 'lucide-react';
import { EventType } from '@/types/calendar';

interface EventTypeIconProps {
  type: EventType;
  className?: string;
}

export const EventTypeIcon: React.FC<EventTypeIconProps> = ({ type, className = "h-4 w-4" }) => {
  switch (type) {
    case 'maintenance':
      return <Wrench className={`${className} text-blue-500`} />;
    case 'rental':
      return <Box className={`${className} text-green-500`} />;
    case 'emergency':
      return <AlertTriangle className={`${className} text-red-500`} />;
    default:
      return <Clock className={`${className} text-amber-500`} />;
  }
};
