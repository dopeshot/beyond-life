import { LastWillProfile } from '../../app/(dynamic)/(pages)/profile/last-will/page'
import { LastWillProfileResponse } from '../api/lastwill/getLastWills'
import { prepareLastWills } from './prepareLastWills'

describe('prepareLastWills function', () => {
	it('should correctly convert LastWillProfileResponse to LastWillProfile', () => {
		const mockLastWillProfileResponses: LastWillProfileResponse[] = [
			{
				_id: '1',
				progressKeys: ['testator', 'heirs'],
				testator: 'test1',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				_id: '2',
				progressKeys: [],
				testator: '',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]

		const result: LastWillProfile[] = prepareLastWills(mockLastWillProfileResponses)

		expect(result[0]).to.deep.include({
			id: '1',
			title: 'test1',
			steps: [
				{ label: 'Erblasser', icon: 'check_circle' },
				{ label: 'Familienstand', icon: 'cancel' },
				{ label: 'Erben', icon: 'check_circle' },
				{ label: 'Erbschaft', icon: 'cancel' },
				{ label: 'Erbfolge', icon: 'cancel' },
				{ label: 'Abschreiben', icon: 'cancel' },
			],
		})

		expect(result[1]).to.deep.include({
			id: '2',
			title: 'Testament',
			steps: [
				{ label: 'Erblasser', icon: 'cancel' },
				{ label: 'Familienstand', icon: 'cancel' },
				{ label: 'Erben', icon: 'cancel' },
				{ label: 'Erbschaft', icon: 'cancel' },
				{ label: 'Erbfolge', icon: 'cancel' },
				{ label: 'Abschreiben', icon: 'cancel' },
			],
		})
	})
})
