export type TestatorFormPayload = {
	name: string
}
export type TestatorResponse = {
	name: string
}

export const saveTestator = async (payload: TestatorFormPayload) => {
	// simulate async request
	const data = await new Promise<TestatorResponse>((resolve) => {
		setTimeout(() => {
			resolve({
				name: payload.name,
			})
		}, 1000)
	})
	return data
}
