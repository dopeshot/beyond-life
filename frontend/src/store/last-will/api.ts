export const saveTestator = async (payload: { name: string }) => {
	// simulate async request
	const data = await new Promise<{ name: string }>((resolve) => {
		setTimeout(() => {
			resolve({
				name: payload.name,
			})
		}, 1000)
	})
	return data
}
