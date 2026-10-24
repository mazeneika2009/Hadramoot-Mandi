import type { SVGProps } from 'react';

type BrandMarkVariant = 'primary' | 'outline';

interface BrandMarkProps extends SVGProps<SVGSVGElement> {
  variant?: BrandMarkVariant;
}

const monogram =
  'M270-59L270-59Q176-3 140 72L140 72Q103 149 115 216L115 216Q141 365 317 399L317 399Q467 429 714 398L714 398Q754 393 754 412L754 412Q754 426 712 440L712 440Q672 453 632 482L632 482Q592 511 583 515L583 515Q573 519 562 521L562 521Q263 557 146 463L146 463Q52 388 64 224L64 224Q83-32 271-151L271-151Q179-165 122-136L122-136Q111-131 105-134L105-134Q97-139 98-157L98-157Q101-272 228-275L228-275Q239-275 264.5-272Q290-269 330-262L330-262Q395-251 461-250.5Q527-250 594-261L594-261Q647-270 633-238L633-238L604-169Q596-149 582-148L582-148Q392-132 270-59Z';

export const BrandMark = ({
  variant = 'primary',
  className,
  ...props
}: BrandMarkProps) => {
  const isOutline = variant === 'outline';

  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <rect
        width="64"
        height="64"
        rx="16"
        fill={isOutline ? 'rgba(255, 255, 255, 0.04)' : '#0f3d2e'}
        stroke={isOutline ? 'rgba(201, 162, 39, 0.45)' : 'none'}
        strokeWidth={isOutline ? 1 : 0}
      />
      {isOutline ? null : (
        <rect
          x="4.5"
          y="4.5"
          width="55"
          height="55"
          rx="13"
          fill="none"
          stroke="#c9a227"
          strokeOpacity="0.35"
          strokeWidth="0.9"
        />
      )}
      <path
        fill="#c9a227"
        transform="translate(17.3 36.6) scale(0.036 -0.036)"
        d={monogram}
      />
    </svg>
  );
};
