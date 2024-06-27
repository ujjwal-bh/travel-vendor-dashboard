import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { serverUrl } from "../utils";

export const loginApi = createApi({
  reducerPath: "loginApi",
  baseQuery: fetchBaseQuery({
    baseUrl: serverUrl + "/vendor",
    prepareHeaders: (headers) => {
      headers.set(
        "authorization",
        `Bearer ${localStorage.getItem("token") || ""}`
      );
      headers.set('Access-Control-Allow-Origin', '*');
      headers.set('Content-Type', 'application/json')
    },
  }),
  tagTypes: ["Login"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
    refreshToken: builder.mutation({
      query: (data) => ({
        url: "/auth/refresh",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const vendorDetailApi = createApi({
  reducerPath: "vendorDetailApi",
  baseQuery: fetchBaseQuery({
    baseUrl: serverUrl + "/vendor/me",
    prepareHeaders: (headers) => {
      headers.set(
        "authorization",
        `Bearer ${localStorage.getItem("token") || ""}`
      );
      headers.set('Access-Control-Allow-Origin', '*');
      headers.set('Content-Type', 'application/json')
    },

  }),
  tagTypes: ["Vendor"],
  endpoints: (builder) => ({
    getCurrentVendor: builder.query({
      query: () => "/",
      providesTags: ["Vendor"]
    }),
    updateCurrentVendor: builder.mutation({
      query: (data)=> ({
        url: `/`,
        method: "PATCH",
        body: data
      }),
      invalidatesTags: (result, error, arg) => {
        if(!error){
          return ["Vendor"]
        }
      }
    })
  }),
});

export const operatingCityApi = createApi({
  reducerPath: "cityApi",
  baseQuery: fetchBaseQuery({
    baseUrl: serverUrl + "/cities",
    prepareHeaders: (headers) => {
      headers.set("authorization", `Bearer ${localStorage.getItem("token")}`);
    },
  }),
  tagTypes: ["Cities", "StateCity", "CityLocation", "SingleLocation"],
  endpoints: (builder) => ({
    getStateCity: builder.query({
      query: () => "/all",
      providesTags: ["StateCity"],
    }),
    getAllCities: builder.query({
      query: () => "/",
      providesTags: ["Cities"],
    }),
    createCity: builder.mutation({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Cities"],
    }),
    getSingleCity: builder.query({
      query: (_id) => `/${_id}`,
    }),
    deleteSingleCity: builder.mutation({
      query: (_id) => ({
        url: `/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cities"],
    }),
    getAllLocations: builder.query({
      query: (_id) => `/${_id}/locations`,
      providesTags: (result, error, arg) => {
        return result
          ? [
              ...result?.locations?.map(({ city }) => ({
                type: "CityLocation",
                id: city,
              })),
              "CityLocation",
            ]
          : ["CityLocation"];
      },
    }),
    getSingleLocation: builder.query({
      query: ({ cityId, locationId }) => `/${cityId}/locations/${locationId}`,
      providesTags: (result, error, arg) => {
        return result
          ? [
              {
                type: "CityLocation",
                id: result?.location?.id,
              },
            ]
          : ["SingleLocation"];
      },
    }),
    addCityLocation: builder.mutation({
      query: ({ _id, ...rest }) => ({
        url: `/${_id}/locations`,
        method: "POST",
        body: rest,
      }),
      invalidatesTags: ["CityLocation"],
    }),
    updateCityLocation: builder.mutation({
      query: ({ cityId, locationId, ...rest }) => ({
        url: `/${cityId}/locations/${locationId}`,
        method: "PATCH",
        body: rest,
      }),
      invalidatesTags: ["CityLocation", "SingleLocation"],
    }),
    deleteCityLocation: builder.mutation({
      query: ({ cityId, locationId }) => ({
        url: `/${cityId}/locations/${locationId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CityLocation", "SingleLocation"],
    }),
  }),
});

export const busTypesApi = createApi({
  reducerPath: "busTypeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: serverUrl + "/bustypes",
    prepareHeaders: (headers) => {
      headers.set(
        "authorization",
        `Bearer ${localStorage.getItem("token") || ""}`
      );
    },
  }),
  tagTypes: ["BusTypes", "BusType"],
  endpoints: (builder) => ({
    getAllBusTypes: builder.query({
      query: () => "/",
      providesTags: ["BusTypes"],
    }),
    createBusType: builder.mutation({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["BusTypes"],
    }),
    getSingleBusType: builder.query({
      query: (busTypeId) => `/${busTypeId}`,
      providesTags: (result, error, arg) => {
        return result
          ? [
              {
                type: "BusType",
                id: result?.busType?.id,
              },
            ]
          : ["BusType"];
      },
    }),
    updateSingleBusType: builder.mutation({
      query: ({ singleBusTypeId, ...rest }) => ({
        url: `/${singleBusTypeId}`,
        method: "PATCH",
        body: rest,
      }),
      invalidatesTags: ["BusType", "BusTypes"],
    }),
    deleteSingleBusType: builder.mutation({
      query: ({ singleBusTypeId }) => ({
        url: `/${singleBusTypeId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["BusType", "BusTypes"],
    }),
  }),
});

export const busApi = createApi({
  reducerPath: "busApi",
  baseQuery: fetchBaseQuery({
    baseUrl: serverUrl + "/buses",
    prepareHeaders: (headers) => {
      headers.set(
        "authorization",
        `Bearer ${localStorage.getItem("token" || "")}`
      );
    },
  }),
  tagTypes: ["Buses", "Bus"],
  endpoints: (builder) => ({
    getAllBuses: builder.query({
      query: () => "/",
      providesTags: ["Buses"],
    }),
    createBuses: builder.mutation({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Buses"],
    }),
    getSingleBus: builder.query({
      query: (singleBusId) => `/${singleBusId}`,
      providesTags: ["Bus"],
    }),
    updateSingleBus: builder.mutation({
      query: ({ singleBusId, ...rest }) => ({
        url: `/${singleBusId}`,
        method: "PATCH",
        body: rest,
      }),
      invalidatesTags: ["Bus", "Buses"],
    }),
    deleteSingleBus: builder.mutation({
      query: ({ singleBusId }) => ({
        url: `/${singleBusId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Bus", "Buses"],
    }),
  }),
});
export const tripApi = createApi({
  reducerPath: "tripApi",
  baseQuery: fetchBaseQuery({
    baseUrl: serverUrl + "/trips",
    prepareHeaders: (headers) => {
      headers.set(
        "authorization",
        `Bearer ${localStorage.getItem("token" || "")}`
      );
    },
  }),
  tagTypes: ["Trips", "Trip"],
  endpoints: (builder) => ({
    getAllTrips: builder.query({
      query: () => "/",
      providesTags: ["Trips"],
    }),
    createTrip: builder.mutation({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Trips"],
    }),
    getSingleTrip: builder.query({
      query: (singleTripId) => `/${singleTripId}`,
      providesTags: ["Trip"],
    }),
    updateSingleTrip: builder.mutation({
      query: ({ singleTripId, ...rest }) => ({
        url: `/${singleTripId}`,
        method: "PATCH",
        body: rest,
      }),
      invalidatesTags: ["Trip"],
    }),
    deleteSingleTrip: builder.mutation({
      query: ({ singleTripId }) => ({
        url: `/${singleTripId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Trip"],
    }),
  }),
});

export const uploadApi = createApi({
  reducerPath: "uploadApi",
  baseQuery: fetchBaseQuery({
    baseUrl: serverUrl + "/upload",
    prepareHeaders: (headers) => {
      headers.set(
        "authorization",
        `Bearer ${localStorage.getItem("token" || "")}`
      );
    },
  }),
  endpoints: (builder) => ({
    uploadImage: builder.mutation({
      query: (img) => ({
        headers: {
          // "content-type": "multipart/form-data; boundary=MyBoundry",
        },
        url: "/",
        method: "POST",
        body: img,
      }),
    }),
  }),
});
export const { useLoginMutation, useRefreshTokenMutation } = loginApi;
export const { useGetCurrentVendorQuery, useUpdateCurrentVendorMutation } = vendorDetailApi;
export const {
  useGetStateCityQuery,
  useGetAllCitiesQuery,
  useCreateCityMutation,
  useDeleteSingleCityMutation,
  useAddCityLocationMutation,
  useDeleteCityLocationMutation,
  useGetAllLocationsQuery,
  useGetSingleLocationQuery,
  useGetSingleCityQuery,
  useUpdateCityLocationMutation,
} = operatingCityApi;

export const {
  useCreateBusTypeMutation,
  useGetAllBusTypesQuery,
  useGetSingleBusTypeQuery,
  useUpdateSingleBusTypeMutation,
  useDeleteSingleBusTypeMutation,
} = busTypesApi;

export const {
  useCreateBusesMutation,
  useGetAllBusesQuery,
  useGetSingleBusQuery,
  useUpdateSingleBusMutation,
  useDeleteSingleBusMutation,
} = busApi;

export const {
  useCreateTripMutation,
  useGetAllTripsQuery,
  useGetSingleTripQuery,
  useUpdateSingleTripMutation,
  useDeleteSingleTripMutation,
} = tripApi;

export const {useUploadImageMutation} = uploadApi;