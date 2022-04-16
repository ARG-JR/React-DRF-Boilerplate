import { User } from "../models/User";
import APIService from "./apiService";

const UserService = APIService.injectEndpoints({
  endpoints: (builder) => ({
    fetchAllUsers: builder.query<User[], void>({
      query: () => ({
        url: "users/",
        method: "get",
      }),
      providesTags: ["User"],
    }),
    fetchUser: builder.query<User, number>({
      query: (id) => ({
        url: `users/${id}/`,
        method: "get",
      }),
      providesTags: ["User"],
    }),
    createUser: builder.mutation<User, void>({
      query: (initialPost) => ({
        url: "users/",
        method: "post",
        body: initialPost,
      }),
      invalidatesTags: ["User"]
    }),
    updateUser: builder.mutation<User, Partial<User> & Pick<User, "id">>({
      query: (id, ...patch) => ({
        url: `users/${id}/`,
        method: "patch",
        body: patch,
      }),
    }),
    deleteUser: builder.mutation<User, number>({
      query: (id) => ({
        url: `users/${id}/`,
        method: "post",
      }),
    }),
  }),
});

export const {
  useFetchAllUsersQuery,
  useFetchUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = UserService;
