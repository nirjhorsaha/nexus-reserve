import { TRoom, TSlot, TUser } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BookingState {
    date: string | null;
    slot: TSlot[];
    room: TRoom | null;
    user: TUser | null;
    totalAmount: number;
    selectedTimes: string[];
}

const initialState: BookingState = {
    date: null,
    selectedTimes: [],
    user: null,
    room: null,
    slot: [],
    totalAmount: 0,
};

const bookingSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {
        saveBookingDetails: (state, action: PayloadAction<BookingState>) => {
            const { date, selectedTimes, user, room,slot } =
                action.payload;
            state.date = date;
            state.selectedTimes = selectedTimes;
            state.user = user;
            state.room = room;
            state.slot = slot;

            if (room) {
                state.totalAmount =
                    room.pricePerSlot * selectedTimes.length;
            } else {
                state.totalAmount = 0;
            }
        },
        clearBookingDetails: (state) => {
            state.date = null;
            state.selectedTimes = [];
            state.user = null;
            state.room = null;
            state.totalAmount = 0;
            state.slot= [];
        },
    },
});

export const { saveBookingDetails, clearBookingDetails } = bookingSlice.actions;
export default bookingSlice.reducer;
