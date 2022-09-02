import React from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Jan',
    month: 100,
  },
  {
    name: 'Feb',
    month: 85,
  },
  {
    name: 'Mar',
    month: 75,
  },
  {
    name: 'Apr',
    month: 65,
  },
  {
    name: 'May',
    month: 55,
  },
  {
    name: 'Jun',
    month: 45,
  },
  {
    name: 'Jul',
    month: 35,
  },
  {
    name: 'Aug',
    month: 55,
  },
  {
    name: 'Sep',
    month: 75,
  },
  {
    name: 'Oct',
    month: 95,
  },
  {
    name: 'Nov',
    month: 15,
  },
  {
    name: 'Dec',
    month: 100,
  },
];

const getIntroOfPage = (label) => {
  if (label === 'Jan') {
    return 'Bugün çok okumuşsun';
  }
  if (label === 'Feb') {
    return 'Bugün az okumuşsun';
  }
  if (label === 'Mar') {
    return 'Okunma sayısı';
  }
  if (label === 'Apr') {
    return 'Okunma sayısı';
  }
  if (label === 'May') {
    return 'Okunma sayısı';
  }
  if (label === 'Jun') {
    return 'Okunma sayısı';
  }
  if (label === 'Jul') {
    return 'Okunma sayısı';
  }
  if (label === 'Aug') {
    return 'Okunma sayısı';
  }
  if (label === 'Sep') {
    return 'Okunma sayısı';
  }
  if (label === 'Oct') {
    return 'Okunma sayısı';
  }
  if (label === 'Nov') {
    return 'Okunma sayısı';
  }
  if (label === 'Dec') {
    return 'Okunma sayısı';
  }
  return '';
};

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-purple-50 border border-gray-200 rounded-lg p-4">
        <p className="text-base font-medium">
          <span className="font-semibold">{label}: </span>
          {`${payload[0].value}`}
        </p>
        <p>{getIntroOfPage(label)}</p>
      </div>
    );
  }

  return null;
}

export default function ReadingBarChart() {
  return (
    <>
      <div className="hidden md:block w-full h-[280px] md:h-[550px]">
        <ResponsiveContainer>
          <BarChart id="bar-chart" data={data}>
            <Bar dataKey="month" barSize={32} fill="#6D28D9" />
            <XAxis axisLine={false} tickLine={false} dataKey="name" />
            <Tooltip cursor={false} content={<CustomTooltip />} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="md:hidden w-full h-[280px] md:h-[550px]">
        <ResponsiveContainer>
          <BarChart id="bar-chart" data={data}>
            <Bar dataKey="month" barSize={16} fill="#6D28D9" />
            <XAxis axisLine={false} tickLine={false} dataKey="name" />
            <Tooltip cursor={false} content={<CustomTooltip />} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
