import { parseHtml } from '@/utils/utils';
import Link from 'next/link';

export default function MonthlyStatsCard({ name, statistics }) {
  console.log(statistics)
  return (
    <>
      <div className="hidden lg:block mt-12 mb-14 border border-gray-200 rounded-lg overflow-hidden">
        <div>
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden ring-1 ring-black ring-opacity-5">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-xs font-medium text-slate-500 sm:pl-6 uppercase"
                      >
                        {name}
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-center text-xs font-medium text-slate-600"
                      >
                        View
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-center text-xs font-medium text-slate-600"
                      >
                        Reads
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-center text-xs font-medium text-slate-600"
                      >
                        Read Ratio
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-center text-xs font-medium text-slate-600"
                      >
                        Fans
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-6 text-center text-xs font-medium text-slate-600"
                      >
                        See Details
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {statistics.map((statistic) => (
                      <tr key={statistic._id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 sm:pl-6">
                          <p className="text-slate-800 text-base font-medium tracking-sm">
                            {statistic.title ?? 'Untitled'}
                          </p>
                          <p className="text-slate-500 text-sm tracking-sm text-ellipsis w-96 overflow-hidden">
                            {parseHtml(statistic.content) ?? ''}
                          </p>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-center font-semibold text-slate-600 tracking-sm">
                          {statistic.viewCount ?? 0}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-center font-semibold text-slate-600 tracking-sm">
                          {statistic.readCount ?? 0}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-center font-semibold text-slate-600 tracking-sm">
                          %
                          {statistic.readingCount > 0
                            ? statistic.viewCount / statistic.readingCount
                            : 0}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-center font-semibold text-slate-600 tracking-sm">
                          {statistic.fanCount ?? 0}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-center text-sm font-medium tracking-sm sm:pr-6">
                          <Link href={`/story/${statistic.storySlug}/stats`}>
                            <a className="text-purple-600 hover:text-purple-900">
                              Detail
                            </a>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:hidden">
        <span className="inline-block text-slate-700 mb-4 text-lg font-medium tracking-sm uppercase">
          June 2022
        </span>
        <ul className="divide-y divide-gray-200">
          {statistics.map((statistic) => (
            <li key={statistic.title} className="py-4">
              <div className="p-4">
                <p className="text-slate-800 text-base font-medium tracking-sm">
                  {statistic.title}
                </p>
                <p className="text-slate-500 text-sm tracking-sm">
                  {statistic.description}
                </p>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="inline-flex flex-col items-center text-slate-800 p-2 text-xs font-medium tracking-sm border border-gray-200 rounded-lg">
                  View
                  <span className="text-purple-700 text-lg font-semibold">
                    {statistic.views}
                  </span>
                </span>
                <span className="inline-flex flex-col items-center text-slate-800 p-2 text-xs font-medium tracking-sm border border-gray-200 rounded-lg">
                  Reads
                  <span className="text-purple-700 text-lg font-semibold">
                    {statistic.reads}
                  </span>
                </span>
                <span className="inline-flex flex-col items-center text-slate-800 p-2 text-xs font-medium tracking-sm border border-gray-200 rounded-lg">
                  Read Ratio
                  <span className="text-purple-700 text-lg font-semibold">
                    {statistic.readRatio}
                  </span>
                </span>
                <span className="inline-flex flex-col items-center text-slate-800 p-2 text-xs font-medium tracking-sm border border-gray-200 rounded-lg">
                  Fans
                  <span className="text-purple-700 text-lg font-semibold">
                    {statistic.fans}
                  </span>
                </span>
                <a
                  href={statistic.href}
                  className="inline-flex flex-col items-center text-slate-800 p-2 text-xs font-medium tracking-sm border border-gray-200 rounded-lg"
                >
                  Detail
                  <svg
                    className="w-6 h-6 text-purple-700"
                    viewBox="0 0 25 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.89941 12H20.8994M20.8994 12L14.8994 6M20.8994 12L14.8994 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <hr className="my-10" />
    </>
  );
}
