export type CommonState = {
	id: string
	isLoading: boolean
	progressKeys: string[]
}

export const initialCommonState: CommonState = {
	id: '',
	isLoading: false,
	progressKeys: [],
}
