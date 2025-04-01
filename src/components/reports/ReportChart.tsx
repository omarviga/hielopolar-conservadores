
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface ReportChartProps {
  quarterly?: boolean;
  annual?: boolean;
}

export const ReportChart: React.FC<ReportChartProps> = ({ quarterly = false, annual = false }) => {
  // Datos de ejemplo para el gráfico
  const monthlyData = [
    { name: 'Ene', conservadores: 220, mantenimientos: 65 },
    { name: 'Feb', conservadores: 225, mantenimientos: 68 },
    { name: 'Mar', conservadores: 230, mantenimientos: 70 },
    { name: 'Abr', conservadores: 232, mantenimientos: 71 },
    { name: 'May', conservadores: 235, mantenimientos: 72 },
    { name: 'Jun', conservadores: 238, mantenimientos: 74 },
    { name: 'Jul', conservadores: 240, mantenimientos: 75 },
    { name: 'Ago', conservadores: 242, mantenimientos: 75 },
    { name: 'Sep', conservadores: 243, mantenimientos: 76 },
    { name: 'Oct', conservadores: 244, mantenimientos: 76 },
    { name: 'Nov', conservadores: 245, mantenimientos: 76 },
    { name: 'Dic', conservadores: 245, mantenimientos: 76 },
  ];

  const quarterlyData = [
    { name: 'Q1', conservadores: 230, mantenimientos: 70, clientes: 115 },
    { name: 'Q2', conservadores: 238, mantenimientos: 74, clientes: 120 },
    { name: 'Q3', conservadores: 243, mantenimientos: 75, clientes: 125 },
    { name: 'Q4', conservadores: 245, mantenimientos: 76, clientes: 128 },
  ];

  const annualData = [
    { name: '2019', conservadores: 150, mantenimientos: 180, clientes: 85 },
    { name: '2020', conservadores: 175, mantenimientos: 195, clientes: 90 },
    { name: '2021', conservadores: 200, mantenimientos: 210, clientes: 105 },
    { name: '2022', conservadores: 225, mantenimientos: 245, clientes: 115 },
    { name: '2023', conservadores: 245, mantenimientos: 280, clientes: 128 },
  ];

  // Seleccionar el conjunto de datos según las props
  const data = annual ? annualData : (quarterly ? quarterlyData : monthlyData);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip 
          formatter={(value, name) => {
            return [value, name === 'conservadores' ? 'Conservadores' : 
                        name === 'mantenimientos' ? 'Mantenimientos' : 'Clientes'];
          }}
        />
        <Legend 
          formatter={(value) => {
            return value === 'conservadores' ? 'Conservadores' : 
                  value === 'mantenimientos' ? 'Mantenimientos' : 'Clientes';
          }}
        />
        <Bar dataKey="conservadores" fill="#36A2EB" />
        <Bar dataKey="mantenimientos" fill="#FF6384" />
        {(quarterly || annual) && <Bar dataKey="clientes" fill="#4BC0C0" />}
      </BarChart>
    </ResponsiveContainer>
  );
};
