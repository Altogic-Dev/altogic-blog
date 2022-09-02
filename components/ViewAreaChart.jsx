import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  {
    name: 'Jan',
    internalViews: 4000,
    externalViews: 2400,
    memberReadTimes: 2400,
  },
  {
    name: 'Feb',
    internalViews: 3000,
    externalViews: 1398,
    memberReadTimes: 2210,
  },
  {
    name: 'Mar',
    internalViews: 2000,
    externalViews: 9800,
    memberReadTimes: 2290,
  },
  {
    name: 'Apr',
    internalViews: 2780,
    externalViews: 3908,
    memberReadTimes: 2000,
  },
  {
    name: 'May',
    internalViews: 1890,
    externalViews: 4800,
    memberReadTimes: 2181,
  },
  {
    name: 'Jun',
    internalViews: 2390,
    externalViews: 3800,
    memberReadTimes: 2500,
  },
  {
    name: 'Jul',
    internalViews: 3490,
    externalViews: 4300,
    memberReadTimes: 2100,
  },
  {
    name: 'Aug',
    internalViews: 3490,
    externalViews: 4300,
    memberReadTimes: 2100,
  },
  {
    name: 'Sep',
    internalViews: 3490,
    externalViews: 4300,
    memberReadTimes: 2100,
  },
  {
    name: 'Oct',
    internalViews: 3490,
    externalViews: 4300,
    memberReadTimes: 2100,
  },
  {
    name: 'Nov',
    internalViews: 3490,
    externalViews: 4300,
    memberReadTimes: 2100,
  },
  {
    name: 'Dec',
    internalViews: 3490,
    externalViews: 4300,
    memberReadTimes: 2100,
  },
];

export default function ViewAreaChart() {
  return (
    <div className="w-full h-[280px] md:h-[550px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart width={500} height={400} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis axisLine={false} tickLine={false} dataKey="name" />
          <YAxis axisLine={false} tickLine={false} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="internalViews"
            stackId="1"
            strokeWidth={2}
            stroke="#53389E"
            fill="#faf5ff"
          />
          <Area
            type="monotone"
            dataKey="externalViews"
            stackId="1"
            strokeWidth={2}
            stroke="#B692F6"
            fill="#f3e8ff"
          />
          <Area
            type="monotone"
            dataKey="memberReadTimes"
            stackId="1"
            strokeWidth={2}
            stroke="#7F56D9"
            fill="#e9d5ff"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
