import { TRoom } from "./room";

export interface TSlot {
    _id?: string;
    room: TRoom
    date: string;
    startTime: string;
    endTime: string;
    isBooked?: boolean;
    isDeleted?: boolean;
  }