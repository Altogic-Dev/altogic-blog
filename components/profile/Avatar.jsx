export default function Avatar({
  src,
  className,
  alt = '',
  fontClassName,
  placeholderName,
  id,
}) {
  return (
    <div id={id}>
      {src ? (
        <img
          className={`max-w-none rounded-full object-cover ${className}`}
          src={src}
          alt={alt}
          id={id}
        />
      ) : (
        <div
          id={id}
          className={`rounded-full bg-gray-400 flex items-center justify-center ${className}`}
        >
          <span id={id} className={`text-white ${fontClassName}`}>
            {placeholderName?.charAt(0).toUpperCase()}
          </span>
        </div>
      )}
    </div>
  );
}
