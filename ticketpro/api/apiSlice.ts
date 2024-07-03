import {
    BaseQueryApi,
    FetchArgs,
    createApi,
    fetchBaseQuery,
  } from "@reduxjs/toolkit/query/react";
  import config from "./config";
  

  const baseQuery = fetchBaseQuery({
    baseUrl: config.baseURL,
    credentials:"include",
    prepareHeaders: (headers) => {
        return headers;
    },
  });

  const baseQueryWithReauth = async (
    args: string | FetchArgs,
    api: BaseQueryApi,
    extraOptions: {}
  ) => {
    let result = await baseQuery(args, api, extraOptions);

    if(result?.error?.status === 401){
        await logout();
    }
    return result
  }

  export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({}),
  });