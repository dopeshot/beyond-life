import { routes } from "./routes"

describe("Routers", () => {
    it("should add id", () => {
        const ID = "michael"
        expect(routes.lastWill.succession(ID)).to.equal(`/last-will/${ID}/succession`)
    })
})