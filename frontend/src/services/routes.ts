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
        testator: "/last-will/testator",
        marriageStatus: "/last-will/marriage-status",
        heirs: "/last-will/heirs",
        inheritance: "/last-will/inheritance",
        succession: (id: string) => `/last-will/${id}/succession`,
        final: "/last-will/final"
    },
    misc: {
        privacy: "/misc/privacy-policy",
        terms: "/misc/terms-of-service"
    }
}