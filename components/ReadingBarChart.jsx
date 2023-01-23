/* eslint-disable prefer-destructuring */
import {
  convertTimeAccordingToType,
  sortDate,
  toMonthName,
} from '@/utils/utils';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';

import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

// const getIntroOfPage = (count) => {
//   if (count > 10) {
//     return 'Bu tarihte çok okumuşsun';
//   }

//   return '';
// };

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-purple-50 border border-gray-200 rounded-lg p-4">
        <p className="text-base font-medium">
          <span className="font-semibold">{label}: </span>
          {`${payload[0].value}`}
        </p>
        {/* <p>{getIntroOfPage(payload[0].value)}</p> */}
      </div>
    );
  }

  return null;
}

export default function ReadingBarChart({ type, data, timeUnit, isHour }) {
  const [dataManipulated, setDataManipulated] = useState();
  const isLoading = useSelector((state) => state.stats.isLoading);

  useEffect(() => {
    let tempData;
    const tempDataManipulated = [];
    if (type === '24 Hours') {
      data?.forEach((obj) => {
        const hour = obj.groupby.group.split(':')[0];
        const minute = obj.groupby.group.split(':')[1];
        if (_.get(tempData, `${hour}:${minute}`)) {
          tempData[`${hour}:${minute}`].count += obj.count;
        } else {
          tempData = {
            ...tempData,
            [`${hour}:${minute}`]: {
              name: `${hour}:${minute}`,
              count: obj.count,
            },
          };
        }
      });
    } else if (type === '12 Months') {
      data?.forEach((obj) => {
        const month = obj.groupby.group.split('-')[1];
        const monthText = toMonthName(month);
        if (_.get(tempData, monthText)) {
          tempData[monthText].count += obj.count;
        } else {
          tempData = {
            ...tempData,
            [monthText]: {
              name: monthText,
              count: obj.count,
            },
          };
        }
      });
    } else {
      data?.forEach((obj) => {
        const day = obj.groupby.group.split('-')[0];
        const monthText = toMonthName(obj.groupby.group.split('-')[1]);

        if (_.get(tempData, `${day} ${monthText}`)) {
          tempData[`${day} ${monthText}`].count += obj.count;
        } else {
          tempData = {
            ...tempData,
            [`${day} ${monthText}`]: {
              name: `${day} ${monthText}`,
              count: obj.count,
            },
          };
        }
      });
    }
    _.forEach(tempData, (obj) => {
      const tempObj = { ...obj };
      if (timeUnit) {
        tempObj.count = (
          tempObj.count / convertTimeAccordingToType(timeUnit.toLowerCase())
        ).toFixed(2);
      }

      tempDataManipulated.push(tempObj);
    });
    setDataManipulated(sortDate(tempDataManipulated, 'name', isHour));
  }, [data, timeUnit]);

  if (data?.length > 0) {
    return (
      <>
        <div className="hidden md:block w-full h-[280px] md:h-[550px]">
          <ResponsiveContainer>
            <BarChart id="bar-chart" data={dataManipulated}>
              <Bar dataKey="count" barSize={32} fill="#6D28D9" />
              <XAxis axisLine={false} tickLine={false} dataKey="name" />
              <Tooltip cursor={false} content={<CustomTooltip />} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="md:hidden w-full h-[280px] md:h-[550px]">
          <ResponsiveContainer>
            <BarChart id="bar-chart" data={dataManipulated}>
              <Bar dataKey="count" barSize={16} fill="#6D28D9" />
              <XAxis axisLine={false} tickLine={false} dataKey="name" />
              <Tooltip cursor={false} content={<CustomTooltip />} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </>
    );
  }
  if (isLoading) {
    return (
        <div className="h-96 flex justify-center items-center">
          <ClipLoader />
        </div>
    );
  }
  return (
    <div className="flex items-center justify-center h-96">
      No data available
    </div>
  );
}
