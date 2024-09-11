/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    BaseQueryApi,
    BaseQueryFn,
    DefinitionType,
    FetchArgs,
    createApi,
    fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logout, setUser } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token;

        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }

        return headers;
    },
});

const extractErrorMessage = (errorData: unknown): string => {
    if (typeof errorData === "object" && errorData !== null && 'message' in errorData) {
        return (errorData as { message: string }).message;
    }
    return "An unknown error occurred";
};

const baseQueryWithRefreshToken: BaseQueryFn<
    FetchArgs,
    BaseQueryApi,
    DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
    let result = await baseQuery(args, api, extraOptions);

    // Ensure result.error exists before accessing its properties
    if (result.error) {
        const status = result.error.status;

        // Handle different status codes
        if (status === 404 || status === 403 || status === 401) {
            const errorMessage = extractErrorMessage(result.error.data);
            // toast.error(errorMessage);
            console.log({errorMessage});
        }

        // Handle token refresh logic if status is 401 (Unauthorized)
        if (status === 401) {
            console.log("Sending refresh token");

            const res = await fetch(
                "http://localhost:5000/api/auth/refresh-token",
                {
                    method: "POST",
                    credentials: "include",
                },
            );

            const data = await res.json();

            if (data?.data?.accessToken) {
                const user = (api.getState() as RootState).auth.user;

                api.dispatch(
                    setUser({
                        user,
                        token: data.data.accessToken,
                    }),
                );

                result = await baseQuery(args, api, extraOptions);
            } else {
                api.dispatch(logout());
            }
        }
    }

    return result;
};

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: baseQueryWithRefreshToken,
    tagTypes: ["rooms", "slots", "bookings"],
    endpoints: () => ({}),
});

// const baseQueryWithRefreshToken: BaseQueryFn<
//     FetchArgs,
//     BaseQueryApi,
//     DefinitionType
// > = async (args, api, extraOptions): Promise<any> => {
//     let result = await baseQuery(args, api, extraOptions);
//     // console.log({result});

//     if (result?.error?.status === 404) {
//         toast.error(result.error.data.message);
//     }
//     if (result?.error?.status === 403) {
//         toast.error(result.error.data?.message);
//     }
//     if (result?.error?.status === 401) {
//         //* Send Refresh token
//         console.log("Sending refresh token");

//         const res = await fetch(
//             "http://localhost:5000/api/auth/refresh-token",
//             {
//                 method: "POST",
//                 credentials: "include",
//             },
//         );

//         const data = await res.json();

//         if (data?.data?.accessToken) {
//             const user = (api.getState() as RootState).auth.user;

//             api.dispatch(
//                 setUser({
//                     user,
//                     token: data.data.accessToken,
//                 }),
//             );

//             result = await baseQuery(args, api, extraOptions);
//         } else {
//             api.dispatch(logout());
//         }
//     }

//     return result;
// };
