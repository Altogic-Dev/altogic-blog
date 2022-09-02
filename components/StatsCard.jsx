function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function StatsCard({
  title,
  number,
  upDown,
  percentNumber,
  lastTime,
}) {
  return (
    <div className="group flex flex-col p-4 md:p-3 xl:p-6 border border-gray-200/50 rounded-lg shadow-sm hover:border-gray-200">
      <div className="flex items-center justify-between">
        <span className="inline-flex text-slate-800/50 mb-6 text-base font-medium tracking-sm transition ease-in-out duration-150 group-hover:text-slate-800">
          {title}
        </span>
        <span className="inline-flex md:hidden text-purple-700/50 mb-4 text-3xl font-semibold tracking-md transition ease-in-out duration-150 group-hover:text-purple-700">
          {number}
        </span>
      </div>
      <span className="hidden md:inline-flex text-purple-700/50 mb-4 text-3xl font-semibold tracking-md transition ease-in-out duration-150 group-hover:text-purple-700">
        {number}
      </span>
      <div className="flex items-center gap-1">
        {upDown === 1 ? (
          <span className="inline-flex">
            <svg
              className="w-5 h-5 text-green-500"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.0003 15.8333V4.16666M10.0003 4.16666L4.16699 9.99999M10.0003 4.16666L15.8337 9.99999"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        ) : (
          <span className="inline-flex">
            <svg
              className="w-5 h-5 text-red-500"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8001 4.16666V15.8333M10.8001 15.8333L16.6335 9.99999M10.8001 15.8333L4.9668 9.99999"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        )}
        <span
          className={classNames(
            'text-sm font-medium tracking-sm',
            upDown === 1 ? 'text-green-700' : 'text-red-700'
          )}
        >
          {percentNumber}%
        </span>
        <span className="text-slate-500/50 text-sm font-medium tracking-sm transition ease-in-out duration-150 group-hover:text-slate-500">
          {lastTime}
        </span>
      </div>
    </div>
  );
}
