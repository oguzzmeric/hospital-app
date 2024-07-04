import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const reportsApi = createApi({
    reducerPath : 'reportsApi',
    baseQuery : fetchBaseQuery({baseUrl :'http://localhost:5000/api/'}),
    endpoints : (builder) =>({
        getAllReports : builder.query({
            query : () => 'all/reports',
        }),
        getReportById : builder.query({
            query : (id) => `reports/${id}`,
        }),
        addReport : builder.mutation({
            query : (newReport) => ({
                url : 'reports',
                method : 'POST',
                body : newReport
            }),
        }),
        updateReport : builder.mutation({
           query : ({id , ...updateData}) => ({
            url : `reports/${id}`,
            method : 'PUT',
            body : updateData
           }), 
        }),
        deleteReport : builder.mutation({
            query : (id) => ({
                url : `reports/${id}`,
                method : 'DELETE'
            }),
        }),
    }),
});

export const {
    useGetAllReportsQuery,
    useGetReportByIdQuery,
    useAddReportMutation,
    useUpdateReportMutation,
    useDeleteReportMutation,
  } = reportsApi;