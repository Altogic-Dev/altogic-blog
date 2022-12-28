import {
  convertTimeAccordingToType,
  sortDate,
  toMonthName,
} from '@/utils/utils';
import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function MemberAreaChart({ rawData, type, timeUnit, isHour }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    let tempData = {};
    const tempStack = [];

    if (type === '12 Months') {
      rawData?.forEach((obj) => {
        const monthName = toMonthName(obj.groupby.group.split('.')[1]);
        tempData = {
          [monthName]: {
            ..._.get(tempData, monthName),
            memberReadTimes:
              (_.get(tempData, monthName)?.memberReadTimes ?? 0) + obj.sum,
            name: monthName,
          },
        };
      });
    } else {
      rawData?.forEach((obj) => {
        tempData = {
          ...tempData,
          [obj.groupby.group]: {
            ..._.get(tempData, obj.groupby.group),
            memberReadTimes:
              (_.get(tempData, obj.groupby.group)?.memberReadTimes ?? 0) +
              obj.sum,
            name: obj.groupby.group,
          },
        };
      });
    }
    _.forEach(tempData, (obj) => {
      const tempObj = { ...obj };
      if (timeUnit) {
        tempObj.memberReadTimes = (
          tempObj.memberReadTimes /
          convertTimeAccordingToType(timeUnit.toLowerCase())
        ).toFixed(1);
      }
      tempStack.push(tempObj);
    });
    setData(sortDate(tempStack, 'name', isHour));
  }, [rawData, timeUnit]);

  return (
    <div className="w-full h-[280px] md:h-[550px]">
      {data?.length > 0 ? (
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
      ) : (
        <div className="flex items-center justify-center h-96">
          No data available
        </div>
      )}
    </div>
  );
}
