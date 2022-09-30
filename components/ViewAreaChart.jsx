import { toMonthName } from '@/utils/utils';
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

export default function ViewAreaChart({ firstData, secondData, type }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    let tempData = {};
    const tempStack = [];
    if (type === '12 Months') {
      firstData?.forEach((obj) => {
        const monthName = toMonthName(obj.groupby.group.split('.')[1]);
        tempData = {
          [monthName]: {
            ..._.get(tempData, monthName),
            internalViews: (_.get(tempData,monthName)?.internalViews ?? 0) +  obj.count,
            name: monthName,
          },
        };
      });

      secondData?.forEach((obj) => {
        const monthName = toMonthName(obj.groupby.group.split('.')[1]);
        tempData = {
          [toMonthName(monthName)]: {
            ..._.get(tempData, monthName),
            externalViews: (_.get(tempData,monthName)?.externalViews ?? 0) +  obj.count,
            name: monthName,
          },
        };
      });
    } else {
      firstData?.forEach((obj) => {
        tempData = {
          ...tempData,
          [obj.groupby.group]: {
            ..._.get(tempData, obj.groupby.group),
            internalViews: (_.get(tempData, obj.groupby.group)?.internalViews ?? 0) +  obj.count,
            name: obj.groupby.group,
          },
        };
      });
      secondData?.forEach((obj) => {
        tempData = {
          ...tempData,
          [obj.groupby.group]: {
            ..._.get(tempData, obj.groupby.group),
            externalViews: (_.get(tempData, obj.groupby.group)?.externalViews ?? 0) + obj.count,
            name: obj.groupby.group,
          },
        };
      });
    }
    _.forEach(tempData, (obj) => {
      tempStack.push({
        name: obj.name,
        externalViews: obj.externalViews ?? 0,
        internalViews: obj.internalViews ?? 0,
      });
    });
    setData(tempStack);
  }, [firstData, secondData]);

  return (
    <div className="w-full h-[280px] md:h-[550px]">
      {!(firstData?.length === 0 && secondData?.length ===0) ? (
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
