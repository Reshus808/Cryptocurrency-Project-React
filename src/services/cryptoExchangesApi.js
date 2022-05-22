import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const cryptoExchangesHeaders = {
    'X-RapidAPI-Host': 'coingecko.p.rapidapi.com',
    'X-RapidAPI-Key': '77c4f420f9msh98064096455f859p1ef749jsn26c4339ec4a5'
}
const baseUrl = 'https://coingecko.p.rapidapi.com'

const createRequest = (url) => ({ url, headers: cryptoExchangesHeaders})

export const cryptoExchangesApi = createApi({
    reducerPath: 'cryptoExchangeApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints:(builder) => ({
        getCryptoExchanges: builder.query({
            query: () => createRequest(`/exchanges`),
        }),
    }),
});

export const { useGetCryptoExchangesQuery } = cryptoExchangesApi;


// url: 'https://coingecko.p.rapidapi.com/exchanges',
//     headers: {
//     'X-RapidAPI-Host': 'coingecko.p.rapidapi.com',
//         'X-RapidAPI-Key': '77c4f420f9msh98064096455f859p1ef749jsn26c4339ec4a5'
// }
// };