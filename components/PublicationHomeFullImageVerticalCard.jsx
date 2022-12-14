import { classNames } from '@/utils/utils';

export default function PublicationHomeFullImageVerticalCard({
  smallSize,
  largeSize,
  singleBigCard,
  coverImage,
  storyTitle,
  storyContent,
  link,
}) {
  return (
    <a
      rel="noreferrer"
      href={link}
      className="group inline-flex flex-col mb-4 md:mb-11 space-y-2"
    >
      <div
        style={{
          backgroundImage: `url(${coverImage})`,
          backgroundColor: '#cccccc',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          position: 'relative',
        }}
        className={classNames(
          'relative flex w-full bg-black bg-opacity-20 rounded-lg ',
          smallSize ? 'h-[350px]' : null,
          largeSize ? 'h-[399px]' : null,
          singleBigCard
            ? 'items-end sm:items-start justify-center sm:justify-end'
            : 'items-end'
        )}
      >
        <div
          className={classNames(
            'w-full z-20 bg-purple-700 bg-opacity-90 p-6 rounded-xl' ,
            singleBigCard ? 'sm:w-[294px] mt-14 ' : null
          )}
        >
          <div>
            <h2 className="text-slate-100 mb-4 text-2xl font-semibold">
              {storyTitle}
            </h2>
          </div>
          <div className="mt-4 space-y-1">
            <span className="h-[400px] w-[267px]   text-slate-100">
              {storyContent.split(' ').slice(0, 10).join(' ')}
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}
