import { classNames } from '@/utils/utils';
import _ from 'lodash';

export default function AligmentPublicationLayout({
  layout,
  bgColor,
  color,
  logo,
  isCentered,
  title,
  content,
  bgImage,
}) {
  return (
    <div
      style={
        _.isNil(bgImage)
          ? {
              backgroundColor: bgColor,
            }
          : {
              backgroundImage: `url(${bgImage})`,
              backgroundColor: '#cccccc',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              position: 'relative',
            }
      }
      className={classNames(isCentered ? 'grid justify-items-center' : null)}
    >
      {['title', 'both'].includes(layout) ? (
        <>
          {layout === 'both' && (
            <img className="mb-[60px] w-[300px] " src={logo} alt="" />
          )}
          <h1
            className="text-slate-600 max-w-4xl text-5xl tracking-md mt-[60px] mb-2"
            style={{ color }}
          >
            {title}
          </h1>
          <h2
            className="text-slate-600 max-w-4xl text-2xl tracking-md"
            style={{ color }}
          >
            {content}
          </h2>
        </>
      ) : (
        <img className="mb-[60px] w-[300px] " src={logo} alt="" />
      )}
    </div>
  );
}
