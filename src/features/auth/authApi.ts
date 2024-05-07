import { apiSlice } from "@/features/api/apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (data) => {
        return {
          url: `/api/admin/login`,
          method: "POST",
          body: data
        };
      }
    }),
    userRegister: builder.mutation({
      query: (data) => {
        return {
          url: `/api/auth/signup`,
          method: "POST",
          body: data
        };
      }
    }),
    loginWithPhone: builder.mutation({
      query: (data) => {
        return {
          url: `/api/auth/signin`,
          method: "POST",
          body: data
        };
      }
    }),
    verifyPhone: builder.mutation({
      query: (data) => {
        return {
          url: `/api/auth/verify-otp`,
          method: "POST",
          body: data
        };
      }
    }),
    forgetPassword: builder.mutation({
      query: (data) => {
        return {
          url: `/api/user/forget-password`,
          method: "POST",
          body: data
        };
      }
    }),
    verifyForgetPasswordOtp: builder.mutation({
      query: (data) => {
        return {
          url: `/api/user/verify-forget-password-otp`,
          method: "POST",
          body: data
        };
      }
    }),
    changeForgetPassword: builder.mutation({
      query: (data) => {
        return {
          url: `/api/user/change-forget-password`,
          method: "PUT",
          body: data
        };
      }
    }),
    resendOtp: builder.mutation({
      query: (data) => {
        return {
          url: `/api/auth/resend-otp`,
          method: "POST",
          body: data
        };
      }
    }),
    getProfile: builder.query({
      query: () => `/api/user/profile`,
      providesTags: ["userProfile"]
    }),
    addToUserFavorites: builder.mutation({
      query: (data) => {
        return {
          url: `/api/user/favorites`,
          method: "PUT",
          body: data
        };
      },
      invalidatesTags: ["userProfile"]
    }),
    updateUserFavorites: builder.mutation({
      query: (data) => {
        return {
          url: `/api/user/favorites/update`,
          method: "PUT",
          body: data
        };
      },
      invalidatesTags: ["userProfile"]
    })
  })
});

export const {
  useGetProfileQuery,
  useResendOtpMutation,
  useAdminLoginMutation,
  useVerifyPhoneMutation,
  useUserRegisterMutation,
  useLoginWithPhoneMutation,
  useForgetPasswordMutation,
  useAddToUserFavoritesMutation,
  useUpdateUserFavoritesMutation,
  useChangeForgetPasswordMutation,
  useVerifyForgetPasswordOtpMutation
} = authApi;
