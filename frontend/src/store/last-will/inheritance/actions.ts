import { Dispatch } from 'react'
import { FinancialAssetForm, ItemForm } from './state'

export type InheritanceActions =
	| {
			type: 'EFFECT_SET_INHERITANCE'
			payload: InheritanceFormPayload
	  }
	| {
			type: 'PRE_SET_INHERITANCE'
	  }

export type InheritanceFormPayload = {
	financialAssets: FinancialAssetForm[]
	items: ItemForm[]
}

export const submitInheritanceAction = async (
	dispatch: Dispatch<InheritanceActions>,
	payload: InheritanceFormPayload
) => {
	// Prepare
	dispatch({ type: 'PRE_SET_INHERITANCE' })
	// Fetch
	await new Promise<void>((resolve) => {
		setTimeout(() => {
			resolve()
		}, 500)
	})
	dispatch({
		type: 'EFFECT_SET_INHERITANCE',
		payload,
	})
}
