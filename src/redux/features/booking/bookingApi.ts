import { baseApi } from "../../api/baseApi";

// Injecting booking related endpoints into the base API
const bookingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllBookings: builder.query({
            query: () => ({
                url: "/bookings",
                method: "GET",
            }),
            providesTags: ["bookings"],
        }),

        getSingleBooking: builder.query({
            query: (id: string) => ({
                url: `/bookings/${id}`,
                method: "GET",
            }),
            providesTags: ["bookings"],
        }),

        getMyBookings: builder.query({
            query: () => ({
                url: "/bookings/user/my-bookings",
                method: "GET",
            }),
            providesTags: ["bookings"],
        }),

        createBooking: builder.mutation({
            query: (newBooking) => ({
                url: "/bookings",
                method: "POST",
                body: newBooking,
            }),
            invalidatesTags: ["bookings"],
        }),

        updateBooking: builder.mutation({
            query: ({ id, updatedBooking }) => ({
                url: `/bookings/${id}`,
                method: "PATCH",
                body: updatedBooking,
            }),
            invalidatesTags: ["bookings"],
        }),
        
        deleteBooking: builder.mutation({
            query: (id) => ({
                url: `/bookings/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["bookings"],
        }),
    }),
});

export const {
    useGetAllBookingsQuery,
    useGetSingleBookingQuery,
    useGetMyBookingsQuery,
    useCreateBookingMutation,
    useDeleteBookingMutation,
    useUpdateBookingMutation,
} = bookingApi;
