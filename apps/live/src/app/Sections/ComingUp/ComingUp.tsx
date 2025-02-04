import React from "react";
import ComingUpEvent from "./ComingUpEvent";
import { Section } from "@repo/ui";

const eventData = [
  {
    title: "NOW",
    subtitle: "Register your team",
    deadline: "Complete by 12:00AM EST",
    description:
      "Lorem ipsum some random text here just add a description! More text more text yay.",
  },
  {
    title: "NOW",
    subtitle: "Register your team",
    deadline: "Complete by 12:00AM EST",
    description:
      "Lorem ipsum some random text here just add a description! More text more text yay.",
  },
  {
    title: "NOW",
    subtitle: "Register your team",
    deadline: "Complete by 12:00AM EST",
    description:
      "Lorem ipsum some random text here just add a description! More text more text yay.",
  },
];
const background = <div className="w-full h-full bg-[#BEACD0]" />;

const ComingUpContent = () => {
  return (
    <div className="flex items-center justify-between w-full h-full content-center p-[10rem]">
      {eventData.map((event, idx) => (
        <ComingUpEvent
          title={event.title}
          subtitle={event.subtitle}
          deadline={event.deadline}
          description={event.description}
        />
      ))}
    </div>
  );
};

const ComingUp = () => {
  // API call to fetch data

  // Filter 3 most recent events

  // Decide if event is happening now
  // return (
  //     <ComingUpEvent />
  // )

  return (
    <Section
      name={"calendar"}
      //   foreground={foreground}
      background={background}
      content={<ComingUpContent />}
      height={80}
    />
  );
};

export default ComingUp;
