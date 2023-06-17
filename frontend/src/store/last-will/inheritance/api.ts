export type InheritanceResponse = {
	financialAssets: {
		where?: string
		amount?: number | string
		currency?: string
	}[]
	items: {
		name?: string
		description?: string
	}[]
}

// export const saveInheritance = async (payload: InheritanceFormPayload) => {
// 	// simulate async request
// 	const data = await new Promise<InheritanceResponse>((resolve) => {
// 		setTimeout(() => {
// 			resolve({
// 				name: payload.name,
// 			})
// 		}, 1000)
// 	})
// 	return data
// }
