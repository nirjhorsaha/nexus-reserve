import { BaseQueryApi } from "@reduxjs/toolkit/query";

export type ErrorSource = {
    message: string;  // Description of the error
    code?: string;    // Optional error code
    details?: string; // Optional additional details
};

// Defines the structure for error responses including multiple error sources
export type TError = {
    data?: {
        errorSources?: ErrorSource[];  // Array of error sources
        success?: boolean;  // Optional success flag
    };
    status: number;  // HTTP status code
};

export type TMeta = {
    limit: number;
    page: number;
    total: number;
    totalPage: number;
};

export type TResponse<T> = {
    data?: T;
    error?: TError;
    meta?: TMeta;
    success: boolean;
    message: string;
};

export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;

export type TQueryParam = {
    name: string;
    value: boolean | React.Key;
};
