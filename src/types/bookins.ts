import { TUser } from "@/redux/features/auth/authSlice";
import { TRoom } from "./room";
import { TSlot } from "./slot";

export interface TBookings {
    _id?: string;
    date: string;
    slots: TSlot[];
    room: TRoom;
    user: TUser;
    isConfirmed: "confirmed" | "unconfirmed" | "canceled";
    status?: "approved" | "rejected";
    totalAmount?: number;
    isDeleted?: boolean;
    paymentStatus?: 'Pending' | 'Paid' | 'Failed'
    transactionID?: string;
}
