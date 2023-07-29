import "material-symbols"
import { Tooltip } from "./Tooltip"

describe("Tooltip", () => {
	describe("Base", () => {
		beforeEach(() => {
			cy.mount(
				<Tooltip content="test tooltip">
					<p>Test</p>
				</Tooltip>
			)
		})

		it("should hide tooltip on default", () => {
			cy.datacy("tooltip").should("not.exist")
		})

		it("should show correct tooltip content", () => {
			cy.get("p").trigger("mouseover")

			cy.datacy("tooltip").should("contain", "test tooltip")
		})

		it("should show tooltip when hover over element", () => {
			cy.get("p").trigger("mouseover")
			cy.datacy("tooltip").should("be.visible")
		})
	})
})
