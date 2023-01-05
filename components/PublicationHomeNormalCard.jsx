import { classNames, parseTextWithLastDot } from '@/utils/utils';
import Link from 'next/link';

export default function PublicationHomeNormalCard({
  smallSize,
  mediumSize,
  largeSize,
  singleBigCard,
  coverImage,
  storyTitle,
  storyContent,
  link,
}) {
  return (
    <Link href={link}>
      <a
        rel="noreferrer"
        href={link}
        className="group inline-flex flex-col mb-4 md:mb-11 space-y-2"
      >
        <div
          className={classNames(
            singleBigCard ? 'flex flex-col lg:flex-row lg:gap-8' : null
          )}
        >
          <img
            src={coverImage}
            alt=""
            className={classNames(
              'flex w-full bg-black/20 mb-4 rounded-lg',
              smallSize ? 'h-[217px]' : null,
              mediumSize ? 'h-[250px]' : null,
              largeSize ? 'h-[350px]' : null
            )}
          />
          <div className={classNames(singleBigCard ? 'lg:mt-14' : null)}>
            <div>
              <h2 className="text-slate-500 mb-4 text-2xl font-semibold">
                {storyTitle.substring(0, 50)}
              </h2>
            </div>
            <div className="mt-4 space-y-1">
              <span className="h-[400px] overflow-hidden break-words">
                {parseTextWithLastDot(storyContent)}
              </span>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}
