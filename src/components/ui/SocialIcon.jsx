const icons = {
  facebook: {
    fill: true,
    d: "M13.5 21v-8h2.71l.4-3.1H13.5V7.9c0-.9.25-1.5 1.55-1.5H16.7V3.6c-.3-.04-1.3-.13-2.47-.13-2.44 0-4.11 1.49-4.11 4.23v2.2H7.4V13h2.72v8h3.38z",
  },
  twitter: {
    fill: true,
    d: "M17.53 3h3.03l-6.62 7.57L21.75 21h-6.1l-4.78-6.25L5.4 21H2.36l7.08-8.1L2.25 3h6.26l4.32 5.71L17.53 3zm-1.06 16.17h1.68L7.6 4.73H5.8l10.67 14.44z",
  },
  youtube: {
    fill: true,
    d: "M21.58 7.19a2.76 2.76 0 0 0-1.94-1.96C17.92 4.75 12 4.75 12 4.75s-5.92 0-7.64.48A2.76 2.76 0 0 0 2.42 7.2 28.8 28.8 0 0 0 1.94 12c0 1.62.16 3.23.48 4.81a2.76 2.76 0 0 0 1.94 1.95c1.72.48 7.64.48 7.64.48s5.92 0 7.64-.48a2.76 2.76 0 0 0 1.94-1.95A28.8 28.8 0 0 0 22.06 12c0-1.62-.16-3.23-.48-4.81zM9.96 15.02V8.98L15.2 12l-5.24 3.02z",
  },
  linkedin: {
    fill: true,
    d: "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3V9zm7 0h3.83v1.64h.05c.53-.95 1.83-1.96 3.77-1.96 4.03 0 4.78 2.5 4.78 5.76V21h-4v-5.6c0-1.34-.03-3.07-1.9-3.07-1.9 0-2.19 1.46-2.19 2.97V21h-4V9z",
  },
  globe: {
    fill: false,
    d: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3.6 9h16.8M3.6 15h16.8M12 3c2.4 2.4 3.6 5.4 3.6 9s-1.2 6.6-3.6 9c-2.4-2.4-3.6-5.4-3.6-9S9.6 5.4 12 3z",
  },
};

export default function SocialIcon({ name, size = 18, className }) {
  const icon = icons[name] || icons.globe;

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill={icon.fill ? "currentColor" : "none"}
      stroke={icon.fill ? "none" : "currentColor"}
      strokeWidth={icon.fill ? 0 : 1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={icon.d} />
    </svg>
  );
}
