import { apiSlice } from "@/api/apiSlice";

export const eventsSlice = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
        getEvents: builder.query({
            query:() => "/vendor/events/getEvents"
        }),
        getEventById: builder.query({
            query: (id) => `/vendor/events/${id}`,
          }),
    }),
    overrideExisting: true,
})


export const {
    useGetEventsQuery,
    useGetEventByIdQuery
} = eventsSlice;