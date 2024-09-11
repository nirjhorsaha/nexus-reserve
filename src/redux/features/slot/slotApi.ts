/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

const slotApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllSlots: builder.query({
            query: () => ({
                url: "/slots",
                method: "GET",
            }),
            providesTags: ["slots"],
        }),
        getSingleSlot: builder.query({
            query: (id: string) => ({
                url: `/slots/${id}`,
                method: "GET",
            }),
            providesTags: ["slots"],
        }),
        createSlot: builder.mutation({
            query: (slot) => ({
                url: `/slots`,
                method: "POST",
                body: slot,
            }),
            invalidatesTags: ["slots"],
        }),
        updateSlots: builder.mutation({
            query: ({ id, slot }) => ({
                url: `slots/${id}`,
                method: "PATCH",
                body: slot,
            }),
            invalidatesTags: ["slots"],
        }),
        deleteSlot: builder.mutation({
            query: (id) => ({
                url: `slots/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["slots"],
        }),
    }),
});

export const {
    useGetAllSlotsQuery,
    useGetSingleSlotQuery,
    useCreateSlotMutation,
    useUpdateSlotsMutation,
    useDeleteSlotMutation,
} = slotApi;
