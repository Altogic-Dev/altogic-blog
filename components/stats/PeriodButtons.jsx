import { DateTime } from 'luxon';
import StatisticsButton from './StatisticsButton';

export default function PeriodButtons({ onClick, dataType, selected }) {
  return (
    <div className="relative z-0 inline-flex shadow-sm rounded-md">
      <StatisticsButton
        first
        selected={selected === '24 Hours'}
        onClick={() =>
          onClick(
            DateTime.local().plus({ day: -1 }).toISODate(),
            '24 Hours',
            dataType
          )
        }
        text="24 Hours"
      />

      <StatisticsButton
        selected={selected === '7 Days'}
        onClick={() =>
          onClick(
            DateTime.local().plus({ week: -1 }).toISODate(),
            '7 Days',
            dataType
          )
        }
        text="7 Days"
      />

      <StatisticsButton
        selected={selected === '30 Days'}
        onClick={() =>
          onClick(
            DateTime.local().plus({ month: -1 }).toISODate(),
            '30 Days',
            dataType
          )
        }
        text="30 Days"
      />

      <StatisticsButton
        last
        selected={selected === '12 Months'}
        onClick={() =>
          onClick(
            DateTime.local().plus({ year: -1 }).toISODate(),
            '12 Months',
            dataType
          )
        }
        text="12 Months"
      />
    </div>
  );
}
