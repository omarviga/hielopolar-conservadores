
import React from 'react';

interface AlertMessageProps {
  type: 'error' | 'success';
  message: string;
}

const AlertMessage: React.FC<AlertMessageProps> = ({ type, message }) => {
  if (!message) return null;
  
  const bgColor = type === 'error' ? 'bg-red-100' : 'bg-green-100';
  const textColor = type === 'error' ? 'text-red-700' : 'text-green-700';
  
  return (
    <div className={`mb-4 rounded-md ${bgColor} p-3 ${textColor}`}>
      {message}
    </div>
  );
};

export default AlertMessage;
