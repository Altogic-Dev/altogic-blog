import { toMonthName } from '@/utils/utils';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
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

export default function ReadingBarChart({ rawData, type }) {
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
      tempStack.push({
        name: obj.name,
        memberReadTimes: obj.memberReadTimes ?? 0,
      });
    });
    setData(tempStack);
  }, [rawData]);

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
