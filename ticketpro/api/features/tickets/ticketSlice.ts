import { apiSlice } from "@/api/apiSlice";

export const ticketSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTicketsByUserId: builder.query({
      query: (id) => `/vendor/tickets/${id}`,
      providesTags: (result, error, id) => [{ type: 'Tickets', id }]
    }),
    purchaseTicket: builder.mutation({
      query: ({
        eventId, userId, ticketType, quantity
      }) => ({
        url: "vendor/tickets/purchase",
        method: "POST",
        body: {
          eventId,
          userId,
          ticketType,
          quantity
        }
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Tickets', id: arg.userId }]
    })
  }),
  overrideExisting: true
});

export const {
  useGetTicketsByUserIdQuery,
  usePurchaseTicketMutation
} = ticketSlice;