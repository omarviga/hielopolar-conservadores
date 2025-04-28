
import { z } from 'zod';  

export interface ClientFormValues {
  name?: string;
  contactPerson?: string;
  phone?: string;
  email?: string;
  address?: string;
  channelType?: 'tradicional' | 'moderno' | 'industrial';
  status?: 'active' | 'inactive';
  conserverProductivity?: number;
  conserver?: string; // Added the missing property
}


// Removed duplicate interface declaration to avoid identifier conflict.