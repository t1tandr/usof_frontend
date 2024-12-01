import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import Posts from "./pages/Posts";
import Post from "./pages/Post";
import User from "./pages/User";
import { ADMIN_ROUTE, FORGOT_PASSWORD_ROUTE, LOGIN_ROUTE, POST_ROUTE, POSTS_ROUTE, REGISTRATION_ROUTE, RESET_PASSWORD_ROUTE, USER_ROUTE } from "./utils/constants";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: USER_ROUTE,
        Component: User
    },
];

export const publicRoutes = [
	{
		path: LOGIN_ROUTE,
		Component: Auth,
	},
	{
		path: REGISTRATION_ROUTE,
		Component: Auth,
	},
	{
		path: FORGOT_PASSWORD_ROUTE,
		Component: ForgotPassword
	},
	{
		path: RESET_PASSWORD_ROUTE,
		Component: ResetPassword
	},
	{
		path: POSTS_ROUTE,
		Component: Posts,
	},
	{
		path: POST_ROUTE + '/:id',
		Component: Post,
	},

]
