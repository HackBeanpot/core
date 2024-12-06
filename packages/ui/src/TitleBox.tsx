// Imports
import React from "react";

type TitleBoxProps = {
  hasLine?: boolean;
  lineColor?: string;
  topColor?: string;
  bottomColor: string;
  topComponent: React.ReactNode;
  bottomComponent: React.ReactNode;
  width?: string;
  height?: string;
};

const TitleBox = ({
  hasLine = false,
  lineColor = "black",
  topColor = "[#EFAB57]",
  bottomColor = "white",
  topComponent,
  bottomComponent,
  width = "w-[15rem]",
  height = "h-[15rem]",
}: TitleBoxProps): React.ReactElement => {
  return (
    <div className={`rounded-lg ${width} ${height} flex flex-col`}>
      <div className={`rounded-t-lg px-2 bg-${topColor}`}>{topComponent}</div>
      {hasLine ? <hr className={`border-none h-0.5 bg-${lineColor}`} /> : null}
      <div className={`rounded-b-lg px-2 bg-${bottomColor} flex-grow`}>
        {bottomComponent}
      </div>
    </div>
  );
};

export default TitleBox;
