import { mount } from "cypress/react"
import { Form, Formik } from "formik"
import { Checkbox } from "./Checkbox"

const initialValues = {
	category: "",
}

const submitForm = (values: typeof initialValues) => {
	console.log(values)
}

const Wrapper: React.FC = ({ children }) => {
	return (
		<Formik initialValues={initialValues} onSubmit={submitForm}>
			{() => <Form>{children}</Form>}
		</Formik>
	)
}

describe("Checkbox", () => {
	const data = {
		name: "label",
		labelText: "Labels",
		helperText: "Die Labels können Gerichten hinzugefügt werden.",
		options: [
			{
				id: 1,
				label: "vegan",
			},
			{
				id: 2,
				label: "vegetarisch",
				icon: "iconExample",
			},
			{
				id: 3,
				label: "ohne Schweinefleisch",
				icon: "iconExample",
			},
		],
	}

	beforeEach(() => {
		mount(
			<Wrapper>
				<Checkbox
					name={data.name}
					options={data.options}
					labelText={data.labelText}
					helperText={data.helperText}
				/>
				<button type="submit">Submit</button>
			</Wrapper>
		)
	})

	it("should set labeltext", () => {
		cy.get("h5 ").should("contain", data.labelText)
	})

	it("should set helper text", () => {
		cy.get(`[data-cy="${data.name}-helpertext"]`).should(
			"contain",
			data.helperText
		)
	})

	it("should display all options", () => {
		data.options.forEach((option) => {
			cy.get(`[data-cy="${data.name}-option-${option.id}"]`).should(
				"contain",
				option.label
			)
		})
	})

	it("should check box when click on it", () => {
		cy.get(`[data-cy="${data.name}-option-${data.options[0].id}"] input`)
			.check()
			.should("be.checked")
		cy.get(
			`[data-cy="${data.name}-option-${data.options[1].id}"] input`
		).should("not.be.checked")
	})

	it("should uncheck box when click on it after it is checked", () => {
		cy.get(`[data-cy="${data.name}-option-${data.options[0].id}"] input`)
			.check()
			.should("be.checked")
		cy.get(`[data-cy="${data.name}-option-${data.options[0].id}"] input`)
			.click()
			.should("not.be.checked")
	})

	it("should display icon before label when defined", () => {
		// TODO: Wenn wir ne Icon Lösung haben
	})

	it("should not display icon before label when not defined", () => {
		cy.get(
			`[data-cy="${data.name}-option-${data.options[0].id}"] svg`
		).should("not.exist")
	})
})
