import { Event } from "./tempEvent/event";

export type Rotation = TempEvent[];

export interface TempEventString {
  startTime: string;
  endTime: string;
  slotId: number;
  event: Event;
}

export interface TempEvent {
  startTime: Date;
  endTime: Date;
  slotId: number;
  event: Event;
}