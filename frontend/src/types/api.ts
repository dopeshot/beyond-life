export type ApiErrorResponse = {
	error: string
	message: string
	statusCode: number
}

export type ApiCreateResponse = {
	createdAt: string
	updatedAt: string
	_id: string
	accountId: string
	testator: {
		name: string
	}
	heirs: []
	items: []
	financialAssets: []
	progressKeys: []
}
