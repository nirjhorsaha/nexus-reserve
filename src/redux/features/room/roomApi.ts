/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";
import { TResponseRedux, TRoom } from "@/types";

const roomApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllRooms: builder.query({
            query: (params) => {
                const queryString = params
                    ? new URLSearchParams(params).toString()
                    : "";

                const url = queryString ? `/rooms?${queryString}` : "/rooms";
                console.log("Fetching URL:", url); // For debugging

                return {
                    url: `/rooms?${queryString}`,
                    method: "GET",
                };
            },
            transformResponse: (response: TResponseRedux<any>) => {
                return {
                    data: response.data,
                    meta: response.meta,
                };
            },
            providesTags: ["rooms"],
        }),
        getSingleRoom: builder.query({
            query: (id: string) => ({
                url: `/rooms/${id}`,
                method: "GET",
            }),
            providesTags: ["rooms"],
        }),
        createRoom: builder.mutation<TRoom, TRoom>({
            query: (room) => ({
                url: `/rooms`,
                method: "POST",
                body: room,
            }),
            invalidatesTags: ["rooms"],
        }),
        updateRoom: builder.mutation({
            query: ({ id, room }) => ({
                url: `rooms/${id}`,
                method: "PATCH",
                body: room,
            }),
            invalidatesTags: ["rooms"],
        }),
        deleteRoom: builder.mutation({
            query: (id) => ({
                url: `rooms/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["rooms"],
        }),
    }),
});

export const {
    useGetAllRoomsQuery,
    useGetSingleRoomQuery,
    useUpdateRoomMutation,
    useDeleteRoomMutation,
    useCreateRoomMutation,
} = roomApi;
