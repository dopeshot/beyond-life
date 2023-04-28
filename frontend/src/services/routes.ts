export const routes = {
    index: "/",
    account: {
        register: "/account/register",
        login: "/account/login",
        profile: "/account/profile",
    },
    lastWill: {
        index: "/last-will",
        start: "/last-will/start",
        auth: (options?: { id: string }) => !options ? "/last-will/auth" : `/last-will/auth?id=${options.id}`,
        testator: (id: string) => `/last-will/${id}/testator`,
        marriageStatus: (id: string) => `/last-will/${id}/marriage-status`,
        heirs: (id: string) => `/last-will/${id}/heirs`,
        inheritance: (id: string) => `/last-will/${id}/inheritance`,
        succession: (id: string) => `/last-will/${id}/succession`,
        buy: (options?: { id: string }) => !options ? "/last-will/buy" : `/last-will/buy?id=${options.id}`,
        final: (id: string) => `/last-will/${id}/final`
    },
    misc: {
        privacy: "/misc/privacy-policy",
        terms: "/misc/terms-of-service"
    }
}