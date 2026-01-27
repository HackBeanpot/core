"use client";

import React, { useEffect, useState } from "react";

// Feb 13, 2026 8:00 PM EST — Opening ceremony (countdown begins)
const COUNTDOWN_START = new Date("2026-02-13T20:00:00-05:00");
// Feb 15, 2026 9:00 AM EST — Countdown ends
const COUNTDOWN_END = new Date("2026-02-15T09:00:00-05:00");

const CountdownTimer = () => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    const update = () => {
      const now = new Date();

      if (now < COUNTDOWN_START) {
        setDays(0);
        setHours(0);
        setMinutes(0);
        return;
      }

      if (now >= COUNTDOWN_END) {
        setDays(0);
        setHours(0);
        setMinutes(0);
        return;
      }

      const difference = COUNTDOWN_END.getTime() - now.getTime();
      setDays(Math.floor(difference / (1000 * 60 * 60 * 24)));
      setHours(
        Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      );
      setMinutes(Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)));
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

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
