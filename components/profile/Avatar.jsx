export default function Avatar({ src, className, alt = '' }) {
  return <img className={`rounded-full ${className}`} src={src} alt={alt} />;
}
