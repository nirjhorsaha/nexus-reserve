/* eslint-disable @typescript-eslint/no-explicit-any */
// import { TRoom } from "@/types/room";
import { baseApi } from "../../api/baseApi";
import { TResponseRedux } from "@/types";

const roomApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllRooms: builder.query({
            query: (args) => {
                // console.log(args);
                // const params = new URLSearchParams();

                const queryString = args
                    ? new URLSearchParams(args).toString()
                    : "";

                const url = queryString
                    ? `/rooms?${queryString}`
                    : "/rooms";
                console.log("Fetching URL:", url); // For debugging
                return {
                    url: `/rooms/${queryString}`,
                    method: "GET",
                };
            },
            providesTags: ["rooms"],
            transformResponse: (response: TResponseRedux<any>) => {
                return {
                    data: response.data,
                    meta: response.meta,
                };
            },
        }),
        getSingleRoom: builder.query({
            query: (id: string) => ({
                url: `/rooms/${id}`,
                method: "GET",
            }),
            providesTags: ["rooms"],
            // transformResponse: (response: TResponseRedux<TRoom>) => {
            //     return response.data;
            // },
        }),
    }),
});

export const { useGetAllRoomsQuery, useGetSingleRoomQuery } = roomApi;
