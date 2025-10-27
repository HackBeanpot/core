import * as React from "react";
import { SVGProps } from "react";
const Balloon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={33}
    height={78}
    viewBox="0 0 33 78"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M15.8743 31.6543C15.8743 31.6543 11.0309 36.9056 15.197 45.2944C19.3631 53.6833 12.092 57.1067 9.55302 63.029C7.01402 68.9513 7.38765 76.2186 7.38765 76.2186"
      stroke="#7A7979"
      strokeWidth={0.222365}
    />
    <ellipse
      cx={16.0558}
      cy={16.8762}
      rx={12.9713}
      ry={14.0275}
      transform="rotate(2.84259 16.0558 16.8762)"
      fill="#D9E87F"
    />
    <g filter="url(#filter0_i_946_12182)">
      <path
        d="M14.8696 28.4208C15.1849 28.0045 15.8203 28.0361 16.0928 28.4816L17.89 31.4197C18.2465 32.0025 17.6917 32.7163 17.0389 32.5147L16.9858 32.4982C16.8213 32.4474 16.6442 32.4555 16.485 32.5209L16.0609 32.6954C15.8723 32.773 15.66 32.7694 15.4741 32.6855L14.4681 32.2315C14.3208 32.165 14.1558 32.1485 13.9982 32.1845L13.5908 32.2775C12.9162 32.4316 12.4171 31.6591 12.8349 31.1074L14.8696 28.4208Z"
        fill="#869F4C"
      />
    </g>
    <mask
      id="mask0_946_12182"
      style={{
        maskType: "alpha",
      }}
      maskUnits="userSpaceOnUse"
      x={3}
      y={2}
      width={27}
      height={29}
    >
      <path
        d="M29.0111 17.5214C28.6269 25.2591 22.5152 31.2437 15.3602 30.8884C8.20513 30.5331 2.71629 23.9725 3.10049 16.2349C3.48469 8.49721 9.59644 2.51261 16.7515 2.86788C23.9065 3.22315 29.3953 9.78376 29.0111 17.5214Z"
        fill="#D9E87F"
      />
    </mask>
    <g mask="url(#mask0_946_12182)">
      <path
        d="M22.9661 -4.84766L44.1749 8.69321L21.7366 43.8379L0.527763 30.2971C23.985 28.8197 30.9499 22.5644 22.9661 -4.84766Z"
        fill="#B8C952"
      />
      <path
        d="M26.8373 25.2015C24.7686 29.392 16.355 32.2073 13.003 30.6235C24.2953 30.315 31.2522 18.6462 27.3009 9.62835C29.9446 14.3044 29.4869 21.624 26.8373 25.2015Z"
        fill="#869F4C"
      />
      <g
        style={{
          mixBlendMode: "screen",
        }}
      >
        <path
          d="M7.21148 12.1246C8.46253 9.2065 10.1217 7.3811 12.5741 6.12606C12.8458 5.987 13.0734 6.32505 12.8615 6.54477C9.59873 9.92771 7.71161 13.322 6.92476 18.5115C6.87748 18.8234 6.44134 18.8414 6.3973 18.5291C6.07619 16.2517 6.39034 14.705 7.21148 12.1246Z"
          fill="#FFF5E5"
          fillOpacity={0.79}
        />
      </g>
    </g>
    <path
      d="M13.8186 30.4043C15.4826 30.9782 17.1946 31.2364 18.8567 30.9888L18.1887 31.1558C16.5281 31.4072 15.7217 31.2285 14.097 30.5713L13.8186 30.4043Z"
      fill="#657739"
    />
    <defs>
      <filter
        id="filter0_i_946_12182"
        x={12.6819}
        y={28.127}
        width={5.31979}
        height={4.625}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx={-0.27835} dy={-0.27835} />
        <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="shape"
          result="effect1_innerShadow_946_12182"
        />
      </filter>
    </defs>
  </svg>
);
export default Balloon;
