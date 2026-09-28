import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const line: IconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export function InstagramIcon(props: IconProps) {
  return (
    <svg {...line} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="0.7" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TikTokIcon(props: IconProps) {
  return (
    <svg {...line} {...props}>
      <path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5" />
      <path d="M14 3c.4 2.6 2.2 4.4 5 4.6" />
    </svg>
  );
}

export function ShopeeIcon(props: IconProps) {
  return (
    <svg {...line} {...props}>
      <path d="M4.5 8h15l-1.1 11.1a1.5 1.5 0 0 1-1.5 1.4H7.1a1.5 1.5 0 0 1-1.5-1.4L4.5 8z" />
      <path d="M8.5 8V7a3.5 3.5 0 0 1 7 0v1" />
      <path d="M14 12.6c-.4-.7-1.2-1-2-1-1 0-1.8.5-1.8 1.3 0 1.9 4 1 4 3.1 0 .9-.9 1.4-2.1 1.4-.9 0-1.7-.4-2.1-1.1" />
    </svg>
  );
}

/** Logo pin Google Maps versi sederhana (berwarna). Bisa diganti dengan file SVG resmi jika mau. */
export function GoogleMapsIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <defs>
        <clipPath id="alvi-gmaps-pin">
          <path d="M12 1.5a7.5 7.5 0 0 0-7.5 7.5c0 5.6 7.5 13.5 7.5 13.5S19.5 14.6 19.5 9A7.5 7.5 0 0 0 12 1.5z" />
        </clipPath>
      </defs>
      <g clipPath="url(#alvi-gmaps-pin)">
        <rect x="0" y="0" width="12" height="13" fill="#4285F4" />
        <rect x="12" y="0" width="12" height="9" fill="#EA4335" />
        <rect x="12" y="9" width="12" height="15" fill="#FBBC04" />
        <rect x="0" y="13" width="12" height="11" fill="#34A853" />
      </g>
      <circle cx="12" cy="9" r="3" fill="#fff" />
    </svg>
  );
}
