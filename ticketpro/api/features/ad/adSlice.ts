import { apiSlice } from "@/api/apiSlice";

export const adSlice = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
        getAdSpacedByLocationId: builder.query({
            query:(locationId) => `/ad/location/${locationId}`
        }),
        getBookedAds: builder.query({
            query:(userId) => `/ad/adsBooked/${userId}`
        }),
        bookAd: builder.mutation({
            query: ({
                 quantity, startDate, endDate, businessName, adPurpose, adSpaceId, userId
            }) => {
                return {
                    url: `/ad/${adSpaceId}/book/${userId}`,
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
      useBookAdMutation,
      useGetBookedAdsQuery
} = adSlice;