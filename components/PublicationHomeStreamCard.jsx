export default function PublicationHomeStreamCard({
  storyTitle,
  storyContent,
  link,
}) {
  return (
    <div className="space-y-4 mb-6">
      <a
        rel="noreferrer"
        href={link}
        className="group inline-flex flex-col mb-4 md:mb-11 space-y-2"
      >
        <h2 className="text-slate-500 text-2xl font-semibold tracking-md">
          {storyTitle}
        </h2>

        <div className="mt-4 space-y-1">
          <span className="flex w-[384px] h-6">{storyContent}</span>
        </div>
      </a>
    </div>
  );
}
