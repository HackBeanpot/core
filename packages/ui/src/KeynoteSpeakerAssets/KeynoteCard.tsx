import * as React from "react";
import { SVGProps } from "react";
import TimeIcon from "../TimeIcon";
import LocationIcon from "../LocationIcon";

interface KeynoteCardProps extends SVGProps<SVGSVGElement> {
  header: string;
  text: string;
  bio: string;
  isLive: boolean;
  location: string;
  time: string;
}

const KeynoteCard: React.FC<KeynoteCardProps> = ({
  header,
  text,
  bio,
  isLive,
  location,
  time,
  ...props
}) => (
  <div>
    <div className="relative flex flex-col h-auto w-full">
      <div className="absolute pl-10 pr-16 py-12">
        <h1 className="font-NeulisNeue-Bold text-3xl text-charcoalFogDark">
          {header}
        </h1>
        <h3 className="font-NeulisNeue-Bold text-xl text-firecrackerRed">
          {bio}
        </h3>
        {isLive && (
          <div className="flex items-center gap-4 text-charcoalFogDark">
            <div className="flex items-center gap-1">
              <LocationIcon />
              <span>{location}</span>
            </div>

            <div className="flex items-center gap-1">
              <TimeIcon />
              <span>{time}</span>
            </div>
          </div>
        )}

        <p className="text-charcoalFogDark mobile:text-s font-DMSans-Regular ">
          {text}
        </p>
      </div>

      <svg
        width={405}
        height={387}
        viewBox="0 0 405 387"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M398.193 380.193V22.7441L6.80664 7.08594V380.193H398.193Z"
          fill="#F7DFBC"
          stroke="white"
          strokeWidth={13.6134}
        />
      </svg>
    </div>
  </div>
);
export default KeynoteCard;
