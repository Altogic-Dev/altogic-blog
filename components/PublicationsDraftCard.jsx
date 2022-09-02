export default function PublicationsPostCard({
  authorUrl,
  authorName,
  authorImage,
  title,
  timeAgo,
  draftUrl,
  infoText,
}) {
  return (
    <div className="flex flex-col-reverse sm:flex-row items-center gap-4 md:gap-6 py-8 md:py-10">
      <div>
        <a href={authorUrl} className="flex items-center gap-3 mb-4 md:mb-8">
          <div className="flex-shrink-0">
            <span className="sr-only">{authorName}</span>
            <img
              className="h-6 w-6 rounded-full"
              src={authorImage}
              alt={authorName}
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-700 text-base font-medium tracking-sm">
              {authorName}
            </span>
            <span
              className="text-slate-500 text-xl tracking-sm"
              aria-hidden="true"
            >
              &middot;
            </span>
            <span className="text-slate-500 text-sm tracking-sm">
              {timeAgo} ago
            </span>
          </div>
        </a>
        <div>
          <a
            href={draftUrl}
            className="group inline-flex flex-col mb-4 md:mb-11 space-y-2"
          >
            <div className="flex items-center gap-2">
              <h2 className="text-slate-900 text-3xl font-semibold leading-9 tracking-md transition ease-in-out duration-150 group-hover:text-purple-700">
                {title}
              </h2>
            </div>
            <p className="text-slate-500 text-sm tracking-sm">{infoText}</p>
          </a>
        </div>
      </div>
    </div>
  );
}
