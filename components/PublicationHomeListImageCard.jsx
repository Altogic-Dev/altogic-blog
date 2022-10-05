export default function PublicationHomeListImageCard({
  coverImage,
  storyTitle,
  storyContent,
  link,
}) {
  return (
    <a
      rel="noreferrer"
      href={link}
      className="flex items-center justify-between gap-12 space-y-4"
    >
      <div>
        <h2 className="text-slate-500 text-2xl font-semibold tracking-md">
          {storyTitle}
        </h2>
        <div className="mt-4 space-y-1">
          <span className="flex w-[384px] h-6">{storyContent}</span>
        </div>
      </div>
      <img
        className="flex w-[210px] h-[150px] mb-4 rounded-lg"
        src={coverImage}
        alt=""
      />
    </a>
  );
}
