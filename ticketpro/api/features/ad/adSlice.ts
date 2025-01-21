import { apiSlice } from "@/api/apiSlice";

export const adSlice = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
        getAdSpacedByLocationId: builder.query({
            query:(locationId) => `/ad/location/${locationId}`
        }),
        bookAd: builder.mutation({
            query: ({
                 quantity, startDate, endDate, businessName, adPurpose, adSpaceId, userId
            }) => {
                return {
                    url: `/ad/${userId}/book/${adSpaceId}`,
                    method:"POST",
                    body:{
                        quantity,
                        startDate,
                        endDate,
                        businessName,
                        adPurpose
                    }
                }
            }
        })
    
    }),
    overrideExisting: true,
})


export const {
      useGetAdSpacedByLocationIdQuery,
      useBookAdMutation
} = adSlice;