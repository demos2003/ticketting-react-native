import { apiSlice } from "@/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                 url: "/auth/authenticate",
                 method: "POST",
                 body: {...credentials}
            })
        }),
        signUp: builder.mutation({
            query:(userData) => {
                return {
                    url: "/auth/register",
                    method: "POST",
                    body:userData
                };
            },
        }),
    }),
    overrideExisting:true
})

export const { useLoginMutation, useSignUpMutation } = authApiSlice;