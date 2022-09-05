export default function Avatar({ src, className, alt = '' }) {
  return <img className={`rounded-full object-cover ${className}`} src={src} alt={alt} />;
}
