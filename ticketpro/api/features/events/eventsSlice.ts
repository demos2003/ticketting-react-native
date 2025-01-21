import { apiSlice } from "@/api/apiSlice";

export const eventsSlice = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
        getEvents: builder.query({
            query:() => "/vendor/events/getEvents"
        }),
        getEventById: builder.query({
            query: (id) => `/vendor/events/${id}`,
          }),
        getEventsByVendorId: builder.query({
            query:(vendorId) => `/vendor/events/getEvents/${vendorId}`
        }),
    }),
    overrideExisting: true,
})


export const {
    useGetEventsQuery,
    useGetEventByIdQuery,
    useGetEventsByVendorIdQuery
} = eventsSlice;