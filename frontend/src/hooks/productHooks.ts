import { useQueries,useQuery } from '@tanstack/react-query'
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
  export const useGetProductDetailsBySlugQuery = (slug: string) =>
  useQuery({
    queryKey: ['products', slug],
    queryFn: async () =>
      (await apiClient.get<Product>(`api/products/slug/${slug}`)).data,
  })
