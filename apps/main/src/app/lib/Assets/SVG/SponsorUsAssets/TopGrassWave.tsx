import * as React from "react"
import type { SVGProps } from "react";

const TopGrassWave = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={2219}
    height={198}
    fill="none"
    {...props}
  >
    <path
      fill="#F2E06F"
      d="M291.445 87C184.113 90.2 48.909 61.333 0 46.5v139h2219v-79C2204.6 74.167 2122.92 0 1929.57 0c-241.7 0-343.21 106.5-653.24 106.5-150.75 0-308.03-97-520.081-97C566.227 9.5 425.61 83 291.445 87Z"
    />
    <path
      fill="#B8C952"
      d="M292.5 128.5C157.7 138.1 41.334 100.167 0 80v117.5h2219v-69c-38.33-27.167-152.9-81.5-304.5-81.5-189.5 0-338.27 72.186-497.5 81.5-359 21-461.5-81.5-672.5-81.5-163.11 0-283.5 69.5-452 81.5Z"
    />
  </svg>
)
export default TopGrassWave