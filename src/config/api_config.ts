export const config = {
    api_base_url: import.meta.env.VITE_API_BASE_URL as string || 'http://localhost:3000',
    auth_route: "/auth",
    user_route: "/user",
    users_route: "/users",
    social_route: "/social",
    file_route: "/file",
    messagerie_route: "/messagerie",
};
