import { useQueries } from '@tanstack/react-query'
import apiClient from '../apiClient.js'
import { Product } from '../types/Product.js'

export const useGetProductQueries = () =>
  useQueries({
    queries: [
      {
        queryKey: ['products'],
        queryFn: async () =>
          (await apiClient.get<Product[]>(`api/products`)).data,
      },
      {
        queryKey: ['productsell'],
        queryFn: async () =>
          (await apiClient.get<Product[]>(`api/productsell`)).data,
      },
    ],
  })
