import "material-symbols"
import "../../app/globals.css"
import { Button } from "./Button"

const primaryButtonClass = "bg-yellow"
const secondaryButtonClass = "bg-dark"
const tertiaryButtonClass = "text-gray-600"

describe("Button", () => {
    describe("Primary Button", () => {
        it("should display primary button", () => {
            cy.mount(
                <Button dataCy="button" kind="primary" onClick={() => ""}>
                    Test
                </Button>
            )
            cy.dataCy("button").should("have.class", primaryButtonClass)
        })

        describe("Icon", () => {
            it("should display icon start", () => {
                cy.mount(
                    <Button kind="primary" icon="face" onClick={() => ""}>
                        Test
                    </Button>
                )
                cy.dataCy("icon-start").should("be.visible")
            })

            it("should display icon end", () => {
                cy.mount(
                    <Button kind="primary" icon="face" iconSlot="end" onClick={() => ""}>
                        Test
                    </Button>
                )
                cy.dataCy("icon-end").should("be.visible")
            })
        })

        describe("Loading", () => {
            beforeEach(() => {
                cy.mount(
                    <Button dataCy="button" kind="primary" loading icon="face" onClick={() => ""}>
                        Test
                    </Button>
                )
            })

            it("should disable button when loading", () => {
                cy.dataCy("button").should("have.class", "text-opacity-75")
                cy.dataCy("button").should("have.class", "opacity-80")
                cy.dataCy("button").should("be.disabled")
                cy.dataCy("button").should("have.attr", "disabled")
            })

            it("should show loading icon when loading", () => {
                cy.dataCy("icon-start-loading").should("contain", "sync")
            })
        })

        describe("Disabled", () => {
            beforeEach(() => {
                cy.mount(
                    <Button dataCy="button" kind="primary" disabled icon="face" onClick={() => ""}>
                        Test
                    </Button>
                )
            })

            it("should have disabled attribute", () => {
                cy.dataCy("button").should("have.attr", "disabled")
            })

            it("should have disabled classes", () => {
                cy.dataCy("button").should("have.class", "text-opacity-75")
                cy.dataCy("button").should("have.class", "opacity-80")
            })
        })
    })

    describe("Primary Link", () => {
        it("should display primary link", () => {
            cy.mount(
                <Button dataCy="link" kind="primary" to="/">
                    Test
                </Button>
            )
            cy.dataCy("link").should("have.class", primaryButtonClass)
        })

        describe("Icon", () => {
            it("should display icon", () => {
                cy.mount(
                    <Button kind="primary" icon="face" to="/">
                        Test
                    </Button>
                )
                cy.dataCy("icon-start").should("be.visible")
            })
        })

        describe("Loading", () => {
            beforeEach(() => {
                cy.mount(
                    <Button dataCy="link" kind="primary" to="/" loading icon="face">
                        Test
                    </Button>
                )
            })

            it("should disable link when loading", () => {
                cy.dataCy("link").should("have.class", "text-opacity-75")
                cy.dataCy("link").should("have.class", "opacity-80")
                cy.dataCy("link").invoke("attr", "href").should("eq", "")
            })

            it("should show loading icon when loading", () => {
                cy.dataCy("icon-start-loading").should("contain", "sync")
            })
        })

        describe("Disabled", () => {
            beforeEach(() => {
                cy.mount(
                    <Button dataCy="link" kind="primary" to="/" disabled icon="face">
                        Test
                    </Button>
                )
            })

            it("should have empty href", () => {
                cy.dataCy("link").invoke("attr", "href").should("eq", "")
            })

            it("should have disabled classes", () => {
                cy.dataCy("link").should("have.class", "text-opacity-75")
                cy.dataCy("link").should("have.class", "opacity-80")
            })
        })
    })

    describe("Secondary button", () => {
        it("should display secondary button", () => {
            cy.mount(
                <Button dataCy="button" kind="secondary" onClick={() => ""}>
                    Test
                </Button>
            )
            cy.dataCy("button").should("have.class", secondaryButtonClass)
        })

        describe("Icon", () => {
            it("should display icon", () => {
                cy.mount(
                    <Button kind="secondary" icon="face" onClick={() => ""}>
                        Test
                    </Button>
                )
                cy.dataCy("icon-start").should("be.visible")
            })
        })

        describe("Loading", () => {
            beforeEach(() => {
                cy.mount(
                    <Button dataCy="button" kind="secondary" loading icon="face" onClick={() => ""}>
                        Test
                    </Button>
                )
            })

            it("should disable button when loading", () => {
                cy.dataCy("button").should("have.class", "text-opacity-75")
                cy.dataCy("button").should("have.class", "opacity-80")
                cy.dataCy("button").should("be.disabled")
                cy.dataCy("button").should("have.attr", "disabled")
            })

            it("should show loading icon when loading", () => {
                cy.dataCy("icon-start-loading").should("contain", "sync")
            })
        })

        describe("Disabled", () => {
            beforeEach(() => {
                cy.mount(
                    <Button dataCy="button" kind="secondary" disabled icon="face" onClick={() => ""}>
                        Test
                    </Button>
                )
            })

            it("should have disabled attribute", () => {
                cy.dataCy("button").should("have.attr", "disabled")
            })

            it("should have disabled classes", () => {
                cy.dataCy("button").should("have.class", "text-opacity-75")
                cy.dataCy("button").should("have.class", "opacity-80")
            })
        })
    })

    describe("Secondary link", () => {
        it("should display secondary link", () => {
            cy.mount(
                <Button dataCy="link" kind="secondary" to="/">
                    Test
                </Button>
            )
            cy.dataCy("link").should("have.class", secondaryButtonClass)
        })

        describe("Icon", () => {
            it("should display icon", () => {
                cy.mount(
                    <Button kind="secondary" icon="face" to="/">
                        Test
                    </Button>
                )
                cy.dataCy("icon-start").should("be.visible")
            })
        })

        describe("Loading", () => {
            beforeEach(() => {
                cy.mount(
                    <Button dataCy="link" kind="secondary" to="/" loading icon="face">
                        Test
                    </Button>
                )
            })

            it("should disable link when loading", () => {
                cy.dataCy("link").should("have.class", "text-opacity-75")
                cy.dataCy("link").should("have.class", "opacity-80")
                cy.dataCy("link").invoke("attr", "href").should("eq", "")
            })

            it("should show loading icon when loading", () => {
                cy.dataCy("icon-start-loading").should("contain", "sync")
            })
        })

        describe("Disabled", () => {
            beforeEach(() => {
                cy.mount(
                    <Button dataCy="link" kind="secondary" to="/" disabled icon="face">
                        Test
                    </Button>
                )
            })

            it("should have empty href", () => {
                cy.dataCy("link").invoke("attr", "href").should("eq", "")
            })

            it("should have disabled classes", () => {
                cy.dataCy("link").should("have.class", "text-opacity-75")
                cy.dataCy("link").should("have.class", "opacity-80")
            })
        })
    })

    describe("Tertiary button", () => {
        it("should display tertiary button", () => {
            cy.mount(
                <Button dataCy="button" kind="tertiary" onClick={() => ""}>
                    Test
                </Button>
            )
            cy.dataCy("button").should("have.class", tertiaryButtonClass)
        })

        describe("Icon", () => {
            it("should display icon", () => {
                cy.mount(
                    <Button kind="tertiary" icon="face" onClick={() => ""}>
                        Test
                    </Button>
                )
                cy.dataCy("icon-start").should("be.visible")
            })
        })

        describe("Loading", () => {
            beforeEach(() => {
                cy.mount(
                    <Button dataCy="button" kind="tertiary" loading icon="face" onClick={() => ""}>
                        Test
                    </Button>
                )
            })

            it("should disable button when loading", () => {
                cy.dataCy("button").should("have.class", "text-opacity-75")
                cy.dataCy("button").should("have.class", "opacity-80")
                cy.dataCy("button").should("be.disabled")
                cy.dataCy("button").should("have.attr", "disabled")
            })

            it("should show loading icon when loading", () => {
                cy.dataCy("icon-start-loading").should("contain", "sync")
            })
        })

        describe("Disabled", () => {
            beforeEach(() => {
                cy.mount(
                    <Button dataCy="button" kind="tertiary" disabled icon="face" onClick={() => ""}>
                        Test
                    </Button>
                )
            })

            it("should have disabled attribute", () => {
                cy.dataCy("button").should("have.attr", "disabled")
            })

            it("should have disabled classes", () => {
                cy.dataCy("button").should("have.class", "text-opacity-75")
                cy.dataCy("button").should("have.class", "opacity-80")
            })
        })
    })

    describe("Tertiary link", () => {
        it("should display tertiary link", () => {
            cy.mount(
                <Button dataCy="link" kind="tertiary" to="/">
                    Test
                </Button>
            )
            cy.dataCy("link").should("have.class", tertiaryButtonClass)
        })

        describe("Icon", () => {
            it("should display icon", () => {
                cy.mount(
                    <Button kind="tertiary" icon="face" to="/">
                        Test
                    </Button>
                )
                cy.dataCy("icon-start").should("be.visible")
            })
        })

        describe("Loading", () => {
            beforeEach(() => {
                cy.mount(
                    <Button dataCy="link" kind="tertiary" to="/" loading icon="face">
                        Test
                    </Button>
                )
            })

            it("should disable link when loading", () => {
                cy.dataCy("link").should("have.class", "text-opacity-75")
                cy.dataCy("link").should("have.class", "opacity-80")
                cy.dataCy("link").invoke("attr", "href").should("eq", "")
            })

            it("should show loading icon when loading", () => {
                cy.dataCy("icon-start-loading").should("contain", "sync")
            })
        })

        describe("Disabled", () => {
            beforeEach(() => {
                cy.mount(
                    <Button dataCy="link" kind="tertiary" to="/" disabled icon="face">
                        Test
                    </Button>
                )
            })

            it("should have empty href", () => {
                cy.dataCy("link").invoke("attr", "href").should("eq", "")
            })

            it("should have disabled classes", () => {
                cy.dataCy("link").should("have.class", "text-opacity-75")
                cy.dataCy("link").should("have.class", "opacity-80")
            })
        })
    })
})

export { }

