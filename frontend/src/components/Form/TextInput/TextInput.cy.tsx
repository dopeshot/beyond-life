import { Form, Formik } from "formik"
import React from "react"
import { TextInput } from "./TextInput"

const data = {
  name: "test",
  labelText: "Test",
  placeholder: "Placeholder",
  helperText: "Error Message",
}

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Formik initialValues={{}} onSubmit={() => console.log("Submit")}>
      <Form>
        {children}
      </Form>
    </Formik>
  )
}

describe("TextInput", () => {
  describe("Basic Props", () => {
    beforeEach(() => {
      cy.mount(
        <Wrapper>
          <TextInput name={data.name} labelText={data.labelText} inputRequired placeholder={data.placeholder} helperText={data.helperText} />
        </Wrapper>
      )
    })

    it("should display input", () => {
      cy.get("input").should("be.visible")
    })

    it("should display label", () => {
      cy.contains("Test").should("be.visible")
    })

    it("should display input with correct placeholder", () => {
      cy.get("input").should("have.attr", "placeholder", "Placeholder")
    })

    it("should display helper text", () => {
      cy.contains("Error Message").should("be.visible")
    })

    it("should display required icon", () => {
      cy.get("label").contains("*").should("be.visible")
    })
  })
})
