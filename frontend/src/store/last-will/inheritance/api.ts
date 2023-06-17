import { FinancialAsset } from './state'

export type InheritanceResponse = {
	financialAssets: FinancialAsset[]
	items: FinancialAsset[]
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
