import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export const TrafficFlowChart = ({ data }) => (
  <div className="h-[300px] w-full">
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorFlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.1} />
        <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
        <YAxis hide />
        <Tooltip 
          contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
          itemStyle={{ color: '#3b82f6' }}
        />
        <Area type="monotone" dataKey="vehicles" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorFlow)" />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

export const IncidentPieChart = ({ incidents = [] }) => {
  {/*Updated Live data processing*/}
  const processedData = [
    { 
      name: 'Congestion', 
      value: incidents.filter(i => i.type?.toLowerCase() === 'congestion').length, 
      color: '#f59e0b'
    },
    { 
      name: 'Accidents', 
      value: incidents.filter(i => i.type?.toLowerCase() === 'accident').length, 
      color: '#ef4444'
    },
    { 
      name: 'Roadworks', 
      value: incidents.filter(i => i.type?.toLowerCase() === 'roadwork' || i.type?.toLowerCase() === 'roadworks').length, 
      color: '#a855f7' 
    },
  ];

  return (
    <div className="h-[250px] w-full flex flex-col items-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={processedData}
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {processedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex flex-wrap justify-center gap-4 mt-2">
        {processedData.map((item) => (
          <div key={item.name} className="flex items-center gap-1.5 text-xs font-medium dark:text-gray-300">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
            {item.name}: <span className="font-bold">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};