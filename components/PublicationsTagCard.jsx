function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const stories = [
  {
    id: 1,
    name: "Euismod scelerisque scelerisque quam feugiatar...",
    info: "Olivia Rhye on Jully 28",
  },
  {
    id: 2,
    name: "Rhoncus nisl mattis at orci eros morbi ut pretium.",
    info: "Olivia Rhye on Jully 28",
  },
  {
    id: 3,
    name: "Nascetur pulvinar ut vel risus, faucibus.",
    info: "Olivia Rhye on Jully 28",
  },
];

export default function PublicationsTagCard({
  smallSize,
  mediumSize,
  largeSize,
  singleBigCard,
}) {
  return (
    <div
      className={classNames(
        singleBigCard ? "flex flex-col lg:flex-row lg:gap-8" : null
      )}
    >
      <div
        className={classNames(
          "flex w-full bg-black/20 mb-4 rounded-lg",
          smallSize ? "h-[217px]" : null,
          mediumSize ? "h-[250px]" : null,
          largeSize ? "h-[350px]" : null
        )}
      ></div>
      <div className={classNames(singleBigCard ? "lg:mt-14" : null)}>
        <div>
          <h2 className="text-slate-500 mb-4 text-2xl font-semibold">
            Next featured story
          </h2>
        </div>
        <div className="mt-4 space-y-1">
          <span className="flex w-[267px] h-6 bg-slate-200"></span>
          <span className="flex w-[145px] h-6 bg-slate-200"></span>
        </div>
      </div>
    </div>
  );
}
