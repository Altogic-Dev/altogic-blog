import Link from 'next/link';

export default function PublicationHomeStreamCard({
  storyTitle,
  storyContent,
  link,
}) {
  return (
    <Link href={link}>
      <a href={link}>
        <div className="flex cursor-pointer items-center justify-between gap-12 space-y-4 mb-20 ">
          <div>
            <h2 className="text-slate-500 text-2xl font-semibold tracking-md">
              {storyTitle}
            </h2>
            <div className="mt-4 space-y-1">
              <span className="flex w-[384px] h-36 overflow-hidden break-words">
                {storyContent}
              </span>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}
