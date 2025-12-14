// icons.tsx
import React from "react";
import {
  InfoCardCottonCandy,
  InfoCardHotDogBag,
  InfoCardIceCream,
  InfoCardPopcorn
} from "../../lib/Assets/SVG";

export enum ItemName {
  CottonCandy = "cottoncandy",
  IceCream = "icecream",
  HotDog = "hotdog",
  Popcorn = "popcorn",
}

export const itemIconMap: Record<ItemName, React.ReactNode> = {
  [ItemName.CottonCandy]: <InfoCardCottonCandy />,
  [ItemName.IceCream]: <InfoCardIceCream />,
  [ItemName.HotDog]: <InfoCardHotDogBag />,
  [ItemName.Popcorn]: <InfoCardPopcorn />,
};
