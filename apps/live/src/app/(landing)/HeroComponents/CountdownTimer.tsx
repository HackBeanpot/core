import React from "react";

interface CountdownTimerProps {
  days?: number;
  hours?: number;
  minutes?: number;
}

const CountdownTimer = ({
  days = 1,
  hours = 5,
  minutes = 56,
}: CountdownTimerProps) => {
  // Format numbers to always show 2 digits
  const formatNumber = (num: number) => String(num).padStart(2, "0");

  return (
    <svg
      viewBox="0 0 1400 400"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto"
    >
      <defs>
        <style>
          {`
            @font-face {
              font-family: 'NeulisNeue-Bold';
              src: url('https://fonts.cdnfonts.com/s/93229/NeulisNeue-Bold.woff') format('woff');
              font-weight: bold;
              font-style: normal;
            }
            .countdown-number {
              font-family: 'NeulisNeue-Bold', 'Arial Black', sans-serif;
              font-size: 200px;
              font-weight: bold;
              fill: #F5F1E8;
            }
            .countdown-label {
              font-family: 'NeulisNeue-Bold', 'Arial Black', sans-serif;
              font-size: 60px;
              font-weight: bold;
              fill: #F5F1E8;
            }
            .countdown-colon {
              font-family: 'NeulisNeue-Bold', 'Arial Black', sans-serif;
              font-size: 200px;
              font-weight: bold;
              fill: #F5F1E8;
            }
          `}
        </style>
      </defs>

      {/* Days */}
      <text x="180" y="200" textAnchor="middle" className="countdown-number">
        {formatNumber(days)}
      </text>
      <text x="180" y="320" textAnchor="middle" className="countdown-label">
        Days
      </text>

      {/* First Colon */}
      <text x="380" y="200" textAnchor="middle" className="countdown-colon">
        :
      </text>

      {/* Hours */}
      <text x="640" y="200" textAnchor="middle" className="countdown-number">
        {formatNumber(hours)}
      </text>
      <text x="640" y="320" textAnchor="middle" className="countdown-label">
        Hours
      </text>

      {/* Second Colon */}
      <text x="840" y="200" textAnchor="middle" className="countdown-colon">
        :
      </text>

      {/* Minutes */}
      <text x="1100" y="200" textAnchor="middle" className="countdown-number">
        {formatNumber(minutes)}
      </text>
      <text x="1100" y="320" textAnchor="middle" className="countdown-label">
        Minutes
      </text>
    </svg>
  );
};

export default CountdownTimer;
