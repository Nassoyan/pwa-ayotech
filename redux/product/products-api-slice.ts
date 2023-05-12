// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import { Product } from '@/redux/slices/addProductSlice';

// const API_BASE_URL = 'https://arformeback.ayotech.am/api'


// // Define a service using a base URL and expected endpoints
// export const productApi = createApi({
//   reducerPath: 'productsApi',
//   baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
//   endpoints: (builder) => ({
//     addProduct: builder.query<Product, string>({
//       query: (name) => `/${name}`,
//     }),
//   }),
// })

// // Export hooks for usage in functional components, which are
// // auto-generated based on the defined endpoints
// export const { useGetPokemonByNameQuery } = productApi