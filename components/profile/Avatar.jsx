import Image from 'next/image';

export default function Avatar({
  src,
  className,
  alt = '',
  fontClassName,
  placeholderName,
  id,
  width,
  height,
  layout,
  objectFit,
}) {
  if (src)
    return (
      <Image
        {...(layout && { layout })}
        {...(height && { height })}
        {...(width && { width })}
        {...(objectFit && { objectFit })}
        className={`max-w-none rounded-full object-cover ${className}`}
        src={src}
        {...(src && { alt })}
        id={id}
      />
    );
  return (
    <div
      id={id}
      className={`rounded-full bg-gray-400 flex items-center justify-center ${className}`}
    >
      <span id={id} className={`text-white  ${fontClassName}`}>
        {placeholderName?.charAt(0).toUpperCase()}
      </span>
    </div>
  );
}
