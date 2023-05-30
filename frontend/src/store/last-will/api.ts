import { TesatatorFormPayload, TestatorResponse } from './testator/payload'

export const saveTestator = async (payload: TesatatorFormPayload) => {
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
