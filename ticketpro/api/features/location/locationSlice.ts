import { apiSlice } from "@/api/apiSlice";

export const locationSlice = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
        getAllLocations: builder.query({
            query:() => "/location/getAllLocations"
        }),
        

    }),
    overrideExisting: true,
})


export const {
      useGetAllLocationsQuery
} = locationSlice;