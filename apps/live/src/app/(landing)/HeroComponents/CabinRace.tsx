"use client";

import React from "react";
import Button from "@repo/ui/Button";
import useDevice from "@util/hooks/useDevice";

interface CabinRaceProps {
  text: string;
}

const ArrowIcon = () => (
  <svg
    width="9"
    height="9"
    viewBox="0 0 9 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.621338 4.29766L4.45298 8.1293L8.28463 4.29766"
      stroke="white"
      strokeWidth="1.2427"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="0.621348"
      y1="-0.621348"
      x2="7.24906"
      y2="-0.621348"
      transform="matrix(-4.37115e-08 -1 -1 4.37115e-08 3.85242 7.87042)"
      stroke="white"
      strokeWidth="1.2427"
      strokeLinecap="round"
    />
  </svg>
);

const CabinRace: React.FC<CabinRaceProps> = ({ text }) => {
  const { isMobile} = useDevice();

  const containerClassName = `relative w-[238px] h-[108px] ${isMobile ? "scale-75" : "scale-100"}`;

  return (
    <div className={containerClassName}>
      <svg
        width="238"
        height="108"
        viewBox="0 0 238 108"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0"
      >
        <g filter="url(#filter0_d_1_567)">
          <g clipPath="url(#clip0_1_567)">
            <rect
              x="13.253"
              y="13.253"
              width="211"
              height="81"
              rx="6.62651"
              fill="white"
              fillOpacity="0.42"
              shapeRendering="crispEdges"
            />
            <path
              d="M80.233 30.1478V24.2438C79.813 24.5798 79.237 24.7838 78.649 24.7838V23.0318C79.489 23.0318 80.281 22.5998 80.773 21.8678H82.093V30.1478H80.233ZM86.4685 30.2918C84.6565 30.2918 83.3125 29.1398 83.3125 27.6638H85.2205C85.2205 28.2038 85.7845 28.6358 86.4925 28.6358C87.1285 28.6358 87.6565 28.2998 87.6565 27.8318C87.6565 26.5358 83.4445 27.0998 83.4445 24.2918C83.4445 22.7318 84.7525 21.7238 86.4205 21.7238C88.1365 21.7238 89.4445 22.8038 89.4445 24.2438H87.5365C87.5365 23.7518 87.0445 23.3798 86.4085 23.3798C85.8325 23.3798 85.3525 23.6678 85.3525 24.1358C85.3525 25.4438 89.5645 24.7358 89.5645 27.6158C89.5645 29.2358 88.2085 30.2918 86.4685 30.2918ZM92.2328 30.1478V23.6198H90.0608V21.8678H96.2648V23.6198H94.0928V30.1478H92.2328ZM99.9981 30.1478V21.8678H101.858V30.1478H99.9981ZM103.443 30.1478V21.8678H105.315L108.759 26.9318V21.8678H110.619V30.1478H108.735L105.303 25.0838V30.1478H103.443ZM118.794 30.2918C116.298 30.2918 114.414 28.4438 114.414 26.0078C114.414 23.5718 116.298 21.7238 118.794 21.7238C120.93 21.7238 122.634 23.0918 123.006 25.0238H121.026C120.714 24.1238 119.85 23.5118 118.794 23.5118C117.39 23.5118 116.322 24.5798 116.322 26.0078C116.322 27.4358 117.39 28.5038 118.794 28.5038C119.85 28.5038 120.714 27.8918 121.026 26.9918H123.006C122.634 28.9238 120.93 30.2918 118.794 30.2918ZM122.889 30.1478L125.997 21.8678H128.193L131.313 30.1478H129.273L128.769 28.6958H125.397L124.881 30.1478H122.889ZM125.997 26.9798H128.157L127.077 23.9198L125.997 26.9798ZM132.084 30.1478V21.8678H136.188C137.436 21.8678 138.396 22.7558 138.396 23.9918C138.396 24.7478 138.024 25.4198 137.496 25.7438C138.276 26.0438 138.816 26.9198 138.816 27.9038C138.816 29.2118 137.82 30.1478 136.476 30.1478H132.084ZM135.72 23.5478H133.884V25.1078H135.72C136.152 25.1078 136.488 24.7718 136.488 24.3278C136.488 23.8718 136.164 23.5478 135.72 23.5478ZM136.02 26.6798H133.884V28.4678H136.02C136.524 28.4678 136.908 28.0838 136.908 27.5798C136.908 27.0758 136.524 26.6798 136.02 26.6798ZM139.842 30.1478V21.8678H141.702V30.1478H139.842ZM143.287 30.1478V21.8678H145.159L148.603 26.9318V21.8678H150.463V30.1478H148.579L145.147 25.0838V30.1478H143.287ZM154.666 30.1478V21.8678H158.398C160.042 21.8678 161.278 23.0558 161.278 24.6398C161.278 25.8638 160.522 26.8238 159.394 27.1718L159.79 27.7478C160.102 28.1918 160.522 28.3958 161.062 28.3958H161.422V30.1478H160.858C159.538 30.1478 158.602 29.6438 158.038 28.6118L157.27 27.3158H156.526V30.1478H154.666ZM158.362 23.6198H156.526V25.6958H158.362C158.938 25.6958 159.37 25.2518 159.37 24.6638C159.37 24.0638 158.938 23.6198 158.362 23.6198ZM161.772 30.1478L164.88 21.8678H167.076L170.196 30.1478H168.156L167.652 28.6958H164.28L163.764 30.1478H161.772ZM164.88 26.9798H167.04L165.96 23.9198L164.88 26.9798ZM174.517 30.2918C172.021 30.2918 170.137 28.4438 170.137 26.0078C170.137 23.5718 172.021 21.7238 174.517 21.7238C176.653 21.7238 178.357 23.0918 178.729 25.0238H176.749C176.437 24.1238 175.573 23.5118 174.517 23.5118C173.113 23.5118 172.045 24.5798 172.045 26.0078C172.045 27.4358 173.113 28.5038 174.517 28.5038C175.573 28.5038 176.437 27.8918 176.749 26.9918H178.729C178.357 28.9238 176.653 30.2918 174.517 30.2918ZM179.85 30.1478V21.8678H185.346V23.6198H181.71V25.1078H184.95V26.8598H181.71V28.3958H185.406V30.1478H179.85Z"
              fill="white"
            />
            <text
              x="80"
              y="52"
              fill="white"
              fontSize="16"
              fontFamily="NeulisNeue-Bold, sans-serif"
              fontWeight="800"
              style={{ textTransform: "uppercase", fontWeight: "800" }}
            >
              {text}
            </text>
            <circle
              cx="26.753"
              cy="53.753"
              r="38.2001"
              fill="#F2E06F"
              stroke="#FDA829"
              strokeWidth="8.59984"
            />
            <mask
              id="mask0_1_567"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="-16"
              y="11"
              width="86"
              height="86"
            >
              <circle
                cx="26.753"
                cy="53.753"
                r="37.5858"
                fill="#F2E06F"
                stroke="#FDA829"
                strokeWidth="9.82839"
              />
            </mask>
            <g mask="url(#mask0_1_567)">
              <path
                d="M25.328 72.253V45.193C23.403 46.733 20.763 47.668 18.068 47.668V39.638C21.918 39.638 25.548 37.658 27.803 34.303H33.853V72.253H25.328Z"
                fill="#C2811E"
              />
              <g style={{ mixBlendMode: "overlay" }}>
                <path
                  d="M-40.7244 12.4617C-37.9199 -8.42787 -24.8528 23.9387 22.8513 51.4807C67.5196 77.27 90.5671 63.7186 87.7626 84.6081C84.9581 105.498 51.3176 118.221 12.6244 113.026C-26.0688 107.832 -43.5289 33.3513 -40.7244 12.4617Z"
                  fill="#676767"
                />
              </g>
            </g>
          </g>
          <rect
            x="13.753"
            y="13.753"
            width="210"
            height="80"
            rx="6.12651"
            stroke="#989898"
            shapeRendering="crispEdges"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_1_567"
            x="1.90735e-06"
            y="9.53674e-06"
            width="237.506"
            height="107.506"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="6.62651" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_1_567"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_1_567"
              result="shape"
            />
          </filter>
          <clipPath id="clip0_1_567">
            <rect
              x="13.253"
              y="13.253"
              width="211"
              height="81"
              rx="6.62651"
              fill="white"
            />
          </clipPath>
        </defs>
      </svg>
      <div
        className="absolute flex items-center justify-center"
        style={{
          left: "78.253px",
          top: "62.1478px",
          width: "139.29px",
          height: "26px",
        }}
      >
        <Button
          text="Jump to the Race"
          textColor="white"
          icon={<ArrowIcon />}
          className="!bg-[#173C62] hover:!bg-[#173C62] !rounded-[6.62651px] !px-2 !py-0 !h-full !w-full !text-[12px] !font-NeulisNeue-Regular !font-normal !shadow-none !gap-1 !flex-row-reverse"
          size="small"
          removePadding={true}
        />
      </div>
    </div>
  );
};
export default CabinRace;
