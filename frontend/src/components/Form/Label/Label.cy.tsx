import { Label } from './Label'

describe('Label', () => {
  describe("Basic Props", () => {
    beforeEach(() => {
      cy.mount(
        <Label name="test" labelText="Test" inputRequired />
      )
    })

    it("should display label text", () => {
      cy.contains("Test").should("be.visible")
    })

    it("should display required char", () => {
      cy.contains("*").should("be.visible")
    })

    it("should have correct name", () => {
      cy.get("label").should("have.attr", "for", "test")
    })
  })
})