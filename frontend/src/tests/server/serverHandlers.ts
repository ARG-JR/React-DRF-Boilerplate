import { rest } from "msw";
import { testUser } from "../test-utils";

const handlers = [
  rest.post(
    `${process.env.REACT_APP_API_URL}/auth/refresh/`,
    (req, res, ctx) => {
      const mockApiResponse = {
        accessToken: "testAccessToken",
        user: testUser,
      };
      return res(ctx.json(mockApiResponse));
    }
  ),
  rest.post(
    `${process.env.REACT_APP_API_URL}/auth/register/`,
    (req, res, ctx) => {
      const mockApiResponse = testUser;
      return res(ctx.json(mockApiResponse));
    }
  ),
  rest.post(`${process.env.REACT_APP_API_URL}/auth/token/`, (req, res, ctx) => {
    const mockApiResponse = {
      refreshToken: "refreshToken",
      accessToken: "accessToken",
      user: testUser,
    };
    return res(ctx.json(mockApiResponse));
  }),
  rest.get(`${process.env.REACT_APP_API_URL}/users/`, (req, res, ctx) => {
    const mockApiResponse = [testUser];
    return res(ctx.json(mockApiResponse));
  }),
];

export { handlers };
