import * as React from "react";
import { SVGProps, useId } from "react";

interface KeynoteSpeakerPhotoProps extends SVGProps<SVGSVGElement> {
  imageURL: string;
}

const KeynoteSpeakerPhoto: React.FC<KeynoteSpeakerPhotoProps> = ({
  imageURL,
  ...props
}) => {
  const id = useId();

  return (
    <svg
      width={445}
      height={527}
      viewBox="0 0 445 527"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M22.3681 526.031L0 0H444.538V526.031H22.3681Z" fill="white" />

      <mask
        id={`mask-${id}`}
        maskUnits="userSpaceOnUse"
        x={14}
        y={16}
        width={416}
        height={498}
      >
        <path
          d="M37.2307 513.032L14.2307 16.0316H429.731V513.032H37.2307Z"
          fill="#B8C952"
        />
      </mask>

      <g mask={`url(#mask-${id})`}>
        <rect
          x={-0.269287}
          y={-6.99988}
          width={435.639}
          height={627}
          fill={`url(#pattern-${id})`}
        />
      </g>

      <defs>
        <pattern
          id={`pattern-${id}`}
          patternContentUnits="objectBoundingBox"
          width={1}
          height={1}
        >
          <use
            href={`#image-${id}`}
            transform="matrix(0.000712251 0 0 0.000494871 0 -0.0210996)"
          />
        </pattern>

        <image
          id={`image-${id}`}
          width={1404}
          height={2106}
          href={imageURL}
          preserveAspectRatio="xMidYMid slice"
        />
      </defs>
    </svg>
  );
};

export default KeynoteSpeakerPhoto;
