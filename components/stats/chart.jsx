import { statsActions } from '@/redux/stats/statsSlice';
import _ from 'lodash';
import { DateTime } from 'luxon';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StatisticsButton from '@/components/stats/StatisticsButton';
import PeriodButtons from './PeriodButtons';

const ReadingBarChart = dynamic(import('@/components/ReadingBarChart'), {
  ssr: false,
});

const chartOptions = [
  {
    title: 'Views',
  },
  {
    title: 'Likes',
  },
  {
    title: 'Reads',
  },
];

export default function Chart() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [data, setData] = useState();
  const [selectedChart, setSelectedChart] = useState('Views');

  const totalViewsLastXDays = useSelector(
    (state) => state.stats.totalViewsLastXDays
  );

  const totalReadsLastXDays = useSelector(
    (state) => state.stats.totalReadsLastXDays
  );
  const totalLikesLastXDays = useSelector(
    (state) => state.stats.totalLikesLastXDays
  );
  const getTotalReadsLastXDays = (date, dateType) => {
    dispatch(
      statsActions.getTotalReadsLastXDaysRequest({
        userId: user._id,
        date,
        dateType,
      })
    );
  };

  const getTotalViewsLastXDays = (date, dateType) => {
    dispatch(
      statsActions.getTotalViewsLastXDaysRequest({
        userId: user._id,
        date,
        dateType,
      })
    );
  };

  const getTotalLikesLastXDays = (date, dateType) => {
    dispatch(
      statsActions.getTotalLikesLastXDaysRequest({
        userId: user._id,
        date,
        dateType,
      })
    );
  };
  const getDataByTime = (time, dateType) => {
    if (selectedChart === 'Reads') {
      getTotalReadsLastXDays(time, dateType);
    } else if (selectedChart === 'Views') {
      getTotalViewsLastXDays(time, dateType);
    } else if (selectedChart === 'Likes') {
      getTotalLikesLastXDays(time, dateType);
    }
  };
  useEffect(() => {
    if (selectedChart === 'Reads') {
      setData(totalReadsLastXDays);
    } else if (selectedChart === 'Views') {
      setData(totalViewsLastXDays);
    } else if (selectedChart === 'Likes') {
      setData(totalLikesLastXDays);
    }
  }, [totalReadsLastXDays, totalViewsLastXDays, totalLikesLastXDays]);


  useEffect(() => {
    getDataByTime(DateTime.local().plus({ year: -1 }).toISODate(), '12 Months');
  }, [selectedChart]);

  return (
    <div className="mt-12 md:mt-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-7">
        <div className="flex">
          {chartOptions.map((chartOption, index) => (
            <StatisticsButton
              first={index === 0}
              last={index === chartOptions.length - 1}
              key={chartOption.title}
              onClick={() => setSelectedChart(chartOption.title)}
              text={chartOption.title}
            />
          ))}
        </div>

        <PeriodButtons onClick={getDataByTime} />
      </div>
      <h2 className="text-slate-700 text-2xl sm:text-3xl tracking-md">
        Total {`${selectedChart} `}
        <span className="font-medium">{_.first(data)?.text}</span>
      </h2>
      <ReadingBarChart type={data?.dateType} data={data} />
    </div>
  );
}
