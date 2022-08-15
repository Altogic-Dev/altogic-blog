import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Jan",
    memberReadTimes: 4000,
  },
  {
    name: "Feb",
    memberReadTimes: 3000,
  },
  {
    name: "Mar",
    memberReadTimes: 2000,
  },
  {
    name: "Apr",
    memberReadTimes: 2780,
  },
  {
    name: "May",
    memberReadTimes: 1890,
  },
  {
    name: "Jun",
    memberReadTimes: 2390,
  },
  {
    name: "Jul",
    memberReadTimes: 3490,
  },
  {
    name: "Aug",
    memberReadTimes: 3490,
  },
  {
    name: "Sep",
    memberReadTimes: 3490,
  },
  {
    name: "Oct",
    memberReadTimes: 3490,
  },
  {
    name: "Nov",
    memberReadTimes: 3490,
  },
  {
    name: "Dec",
    memberReadTimes: 3490,
  },
];

export default function MemberAreaChart() {
  return (
    <>
      <div className="w-full h-[280px] md:h-[550px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart width={500} height={400} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis axisLine={false} tickLine={false} dataKey="name" />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="memberReadTimes"
              stackId="1"
              strokeWidth={2}
              stroke="#7F56D9"
              fill="#faf5ff"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
