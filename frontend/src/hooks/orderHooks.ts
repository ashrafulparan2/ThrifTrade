
import apiClient from '../apiClient.js'
import { CartItem, ShippingAddress } from '../types/Cart.js'
import { Order } from '../types/Order.js'
import { useMutation, useQuery } from '@tanstack/react-query'




export const useGetOrderDetailsQuery = (id: string) =>
  useQuery({
    queryKey: ['orders', id],
    queryFn: async () => (await apiClient.get<Order>(`api/orders/${id}`)).data,
  })



export const useCreateOrderMutation = () =>
  useMutation({
    mutationFn: async (order: {
      orderItems: CartItem[]
      shippingAddress: ShippingAddress
      paymentMethod: string
      itemsPrice: number
      shippingPrice: number
      taxPrice: number
      totalPrice: number
    }) =>
      (
        await apiClient.post<{ message: string; order: Order }>(
          `api/orders`,
          order
        )
      ).data,
  })