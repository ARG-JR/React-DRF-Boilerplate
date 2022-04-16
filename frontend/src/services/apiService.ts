import { baseQueryWithReauth } from "./baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

const APIService = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User"],
  endpoints: () => ({}),
});

export default APIService