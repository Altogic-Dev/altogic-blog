import Link from 'next/link';

export default function PublicationHomeListImageCard({
  coverImage,
  storyTitle,
  storyContent,
  link,
}) {
  return (
    <Link href={link}>
      <div className="flex cursor-pointer items-center justify-between gap-12 space-y-4 mb-20">
        <div>
          <h2 className="text-slate-500 text-2xl font-semibold tracking-md">
            {storyTitle}
          </h2>
          <div className="mt-4 space-y-1">
            <span className="flex break-words overflow-hidden">{storyContent}</span>
          </div>
        </div>
        <img
          className="w-[300px] mb-4 rounded-lg object-cover"
          src={coverImage}
          alt=""
        />
      </div>
    </Link>
  );
}
