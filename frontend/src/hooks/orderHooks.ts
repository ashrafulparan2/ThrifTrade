import { useMutation } from '@tanstack/react-query'
import apiClient from '../apiClient.js'
import { CartItem, ShippingAddress } from '../types/Cart.js'
import { Order } from '../types/Order.js'

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