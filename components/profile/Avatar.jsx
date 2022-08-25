

export default function Avatar({src,className,alt=""}) {
  return (
    <img
      className={className}
      src={src}
      alt={alt}
    />
  );
}
