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

export function AppStoreIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      width="20"
      height="24"
      viewBox="0 0 20 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.7045 12.763C16.7166 11.8431 16.9669 10.9411 17.4321 10.141C17.8972 9.34093 18.5621 8.66869 19.3648 8.18687C18.8548 7.47582 18.1821 6.89066 17.4 6.47785C16.6178 6.06505 15.7479 5.83597 14.8592 5.80883C12.9635 5.61456 11.1258 6.91628 10.1598 6.91628C9.17506 6.91628 7.68776 5.82812 6.08616 5.86028C5.05021 5.89296 4.04059 6.18707 3.15568 6.71395C2.27077 7.24083 1.54075 7.98252 1.03674 8.86675C-1.14648 12.5571 0.482005 17.9808 2.57338 20.9639C3.61975 22.4246 4.84264 24.0562 6.44279 23.9984C8.00863 23.9349 8.59344 23.0235 10.4835 23.0235C12.3561 23.0235 12.9048 23.9984 14.5374 23.9616C16.2176 23.9349 17.2762 22.4944 18.2859 21.0198C19.0377 19.979 19.6162 18.8287 20 17.6115C19.0238 17.2084 18.1908 16.5337 17.6048 15.6715C17.0187 14.8093 16.7056 13.7977 16.7045 12.763Z"
        fill="currentColor"
      />
      <path
        d="M13.622 3.84713C14.5381 2.77343 14.9895 1.39335 14.8802 0C13.4806 0.143519 12.1877 0.796596 11.2592 1.82911C10.8052 2.33351 10.4575 2.92033 10.236 3.55601C10.0145 4.19168 9.92342 4.86375 9.96808 5.5338C10.6681 5.54084 11.3607 5.3927 11.9936 5.10054C12.6266 4.80838 13.1833 4.37982 13.622 3.84713Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function PlayStoreIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      width="21"
      height="24"
      viewBox="0 0 21 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.80506 11.4617L0.0898438 22.0059C0.0907562 22.0078 0.0907561 22.0106 0.0916686 22.0125C0.390051 23.1574 1.41203 24 2.62564 24C3.11108 24 3.56641 23.8656 3.95695 23.6305L3.98798 23.6118L14.9232 17.1593L9.80506 11.4617Z"
        fill="#EA4335"
      />
      <path
        d="M19.6312 9.66619L19.6221 9.65966L14.9009 6.86123L9.58203 11.7013L14.9201 17.1582L19.6157 14.3878C20.4388 13.9324 20.9981 13.045 20.9981 12.0223C20.9981 11.0052 20.447 10.1225 19.6312 9.66619Z"
        fill="#FBBC04"
      />
      <path
        d="M0.0894234 1.99325C0.0310244 2.21346 0 2.44488 0 2.68376V21.3163C0 21.5552 0.0310245 21.7866 0.0903359 22.0059L10.1386 11.7313L0.0894234 1.99325Z"
        fill="#4285F4"
      />
      <path
        d="M9.87715 12L14.9049 6.85945L3.9825 0.383598C3.58557 0.140054 3.12203 8.67844e-05 2.62655 8.67844e-05C1.41295 8.67844e-05 0.389138 0.84456 0.0907557 1.99043C0.0907557 1.99136 0.0898438 1.9923 0.0898438 1.99323L9.87715 12Z"
        fill="#34A853"
      />
    </svg>
  );
}
