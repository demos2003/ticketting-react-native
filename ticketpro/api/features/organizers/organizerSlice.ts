import { apiSlice } from "@/api/apiSlice";

export const organizerSlice = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
        getOrganizers: builder.query({
            query:() => "/auth/get-state-organizers"
        }),
        getOrganizersById: builder.query({
            query:(id) => `/auth/get-state-organizer/${id}`
        }),
    }),
    overrideExisting: true,
})


export const {
    useGetOrganizersQuery,
    useGetOrganizersByIdQuery
} = organizerSlice;