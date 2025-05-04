
// Fix for optional properties in ClientsList.tsx
// Add proper null checks for optional properties

<div className="mt-1 text-sm text-gray-500 flex items-center">
  <User className="w-3.5 h-3.5 mr-1" />
  {client.contactPerson || 'Sin contacto'}
</div>
<div className="mt-1 text-sm text-gray-500 flex items-center">
  <Phone className="w-3.5 h-3.5 mr-1" />
  {client.phone || 'Sin teléfono'}
</div>
<div className="mt-1 text-sm text-gray-500 flex items-center truncate">
  <HomeIcon className="w-3.5 h-3.5 mr-1 flex-shrink-0" />
  {client.address || 'Sin dirección'}
</div>
