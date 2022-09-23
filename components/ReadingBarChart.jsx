import React from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

const getIntroOfPage = (count) => {
  if (count > 10) {
    return 'Bu tarihte çok okumuşsun';
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
        <p>{getIntroOfPage(payload[0].value)}</p>
      </div>
    );
  }

  return null;
}

export default function ReadingBarChart({ data }) {
  return (
    <>
      <div className="hidden md:block w-full h-[280px] md:h-[550px]">
        <ResponsiveContainer>
          <BarChart id="bar-chart" data={data}>
            <Bar dataKey="count" barSize={32} fill="#6D28D9" />
            <XAxis axisLine={false} tickLine={false} dataKey="name" />
            <Tooltip cursor={false} content={<CustomTooltip />} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="md:hidden w-full h-[280px] md:h-[550px]">
        <ResponsiveContainer>
          <BarChart id="bar-chart" data={data}>
            <Bar dataKey="count" barSize={16} fill="#6D28D9" />
            <XAxis axisLine={false} tickLine={false} dataKey="name" />
            <Tooltip cursor={false} content={<CustomTooltip />} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
