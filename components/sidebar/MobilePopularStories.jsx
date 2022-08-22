import Link from 'next/link';


export default function MobilePopularStories() {
  return (
    <div className="flex items-center justify-between bg-purple-50 p-4 rounded-lg">
      <span className="text-slate-700 text-sm font-semibold tracking-sm">
        Popular Stories
      </span>
      <Link href="#">
        <p className="inline-flex items-center gap-2 text-xs tracking-sm text-purple-700">
          See all popular stories
          <svg
            className="w-5 h-5 text-purple-700"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.16663 10.0001H15.8333M15.8333 10.0001L9.99996 4.16676M15.8333 10.0001L9.99996 15.8334"
              stroke="currentColor"
              strokeWidth="1.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </p>
      </Link>
    </div>
  );
}
