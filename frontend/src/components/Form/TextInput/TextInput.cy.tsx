import { Form, Formik } from "formik"
import React from "react"
import { TextInput } from "./TextInput"

const data = {
  name: "test",
  label: "Test",
  placeholder: "Placeholder",
  description: "Description",
  errorMessage: "Error Message",
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
          <TextInput name={data.name} label={data.label} description={data.description} errorMessage={data.errorMessage} />
        </Wrapper>
      )
    })

    it("should display label", () => {
      cy.contains("Test").should("be.visible")
    })

    it("should display input", () => {
      cy.get("input").should("be.visible")
    })

    it("should display input with correct placeholder", () => {
      cy.get("input").should("have.attr", "placeholder", "Placeholder")
    })
  })
})
