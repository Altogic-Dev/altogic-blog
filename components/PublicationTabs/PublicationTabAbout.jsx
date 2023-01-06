import _ from 'lodash';
import { DateTime } from 'luxon';

function PublicationTabAbout({ publication }) {
  return (
    <div className="md:w-[100vw] px-8 max-w-screen-xl w-full mx-auto ">
      <div className="prose text-lg font-normal tracking-sm text-slate-500 max-w-full ">
        {_.get(publication, 'description')}
      </div>
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 text-slate-500 text-base tracking-sm py-10 mt-10 border-t border-b border-slate-200">
        <div className="flex items-center gap-2 md:gap-4">
          <span>
            Member since{' '}
            {DateTime.fromISO(_.get(publication, 'createdAt')).toLocaleString({
              year: 'numeric',
              month: 'long',
            })}
          </span>
          <svg
            className="h-1 w-1 text-slate-500"
            fill="currentColor"
            viewBox="0 0 8 8"
          >
            <circle cx={4} cy={4} r={3} />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default PublicationTabAbout;
