export default function Avatar({
  src,
  className,
  alt = '',
  fontClassName,
  placeholderName,
}) {
  return (
    <div>
      {src ? (
        <img
          className={` max-w-none rounded-full object-cover ${className}`}
          src={src}
          alt={alt}
        />
      ) : (
        <div
          className={`rounded-full bg-gray-400 flex items-center justify-center ${className}`}
        >
          <span className={`text-white ${fontClassName}`}>
            {placeholderName?.charAt(0).toUpperCase()}
          </span>
        </div>
      )}
    </div>
  );
}
