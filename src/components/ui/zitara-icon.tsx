export default function ZitaraIcon({
  className = "",
  color = "currentColor",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 82 58"
      xmlns="http://www.w3.org/2000/svg"
      fill={color}
      className={className}
      aria-hidden="true"
    >
      <path d="M0 22 L20 16 L20 44 C20 54 0 54 0 44Z" />
      <path d="M26 14 L46 8 L46 36 C46 46 26 46 26 36Z" />
      <path d="M52 6 L72 0 L72 28 C72 38 52 38 52 28Z" />
      <circle cx="76" cy="50" r="4.5" />
    </svg>
  );
}
