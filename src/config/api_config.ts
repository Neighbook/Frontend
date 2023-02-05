export const config = {
    api_base_url: import.meta.env.VITE_API_BASE_URL as string || 'http://localhost:3000',
    auth_route: "/auth",
    user_route: "/user",
    social_route: "/social"
};
