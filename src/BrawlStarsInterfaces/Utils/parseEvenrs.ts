import parseBrawlStarsDate from "./parseBrawlStarsDate";
import { Rotation } from "../../interfaces/brawlStarsInterfaces/tempEvent";
import { TempEventString } from "../../interfaces/brawlStarsInterfaces/tempEvent";

export default function parseEvents(rotationString: TempEventString[]): Rotation {
  const rotation = rotationString.map(item => ({
    startTime: parseBrawlStarsDate(item.startTime),
    endTime: parseBrawlStarsDate(item.endTime),
    slotId: item.slotId,
    event: item.event
  }));
  return rotation;
}