import * as React from "react";

/** Decorative truck icon for "شحن موثوق / Reliable Shipping" badge */
export function ShippingIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      role="presentation"
      {...props}
    >
      <path
        d="M2.667 8h17.333v13.333H2.667V8ZM20 12h5.333L28 16v5.333h-8V12Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="22.667" r="2" stroke="currentColor" strokeWidth="2" />
      <circle cx="22.667" cy="22.667" r="2" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

/** Decorative person + shield icon for "حماية المشتري / Buyer Protection" badge */
export function BuyerProtectionIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M21.3307 14.6667L23.9974 17.3333L29.3307 12M21.3307 28V25.3333C21.3307 22.3898 18.9409 20 15.9974 20H7.9974C5.05385 20 2.66406 22.3898 2.66406 25.3333V28"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.66406 9.33333C6.66406 12.2769 9.05385 14.6667 11.9974 14.6667C14.9409 14.6667 17.3307 12.2769 17.3307 9.33333C17.3307 6.38979 14.9409 4 11.9974 4C9.05385 4 6.66406 6.38979 6.66406 9.33333H6.66406"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Decorative shield + lock icon for "دفع آمن / Secure Payment" badge */
export function SecurePaymentIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      role="presentation"
      {...props}
    >
      <rect
        x="5.333"
        y="13.333"
        width="21.333"
        height="14.667"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M10.667 13.333V9.333a5.333 5.333 0 0 1 10.666 0v4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="16" cy="20" r="2" fill="currentColor" />
    </svg>
  );
}

/** Decorative trend-up arrow icon for trending search tags */
export function TrendingUpIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      role="presentation"
      {...props}
    >
      <path
        d="M4.667 18.667L10.5 12.833l4.667 4.667 8.166-10.167"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.5 7.333H23.333V13.167"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
