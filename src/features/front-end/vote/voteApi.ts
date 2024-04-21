import { apiSlice } from '@/features/api/apiSlice';

export const voteApi = apiSlice.injectEndpoints({
	// @ts-ignore
	overrideExisting: module.hot?.status() === "apply",
	endpoints: (builder) => ({
		getVotes: builder.query({
			query: (id) =>
				`/api/vote/${id}`,
		}),
		giveVote: builder.mutation({
			query: ({ id, vote }) => `/api/vote/${id}/${vote}`
		}),
	}),
});

export const { useGetVotesQuery, useGiveVoteMutation } = voteApi;
