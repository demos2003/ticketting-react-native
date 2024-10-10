import { apiSlice } from "@/api/apiSlice";

export const organizerSlice = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
        getOrganizers: builder.query({
            query:() => "/auth/get-state-organizers"
        })
    })
})


export const {
    useGetOrganizersQuery
} = organizerSlice;