import { MaterialSymbol } from 'material-symbols'
import { sidebarElements } from '../../../content/sidebar'
import { LastWillProfile } from '../../app/(dynamic)/(pages)/profile/last-will/page'
import { LastWillProfileResponse } from '../api/profile/lastWill'

/**
 * Prepare last wills for profile page.
 * @param lastWills to prepare
 * @returns prepared last wills
 */
export const prepareLastWills = (lastWills: LastWillProfileResponse[]): LastWillProfile[] => {
	return lastWills.map((lastWill) => {
		const steps = sidebarElements.map((element) => {
			const isProgressKeyPresent = lastWill.progressKeys.includes(element.page)
			return {
				label: element.title,
				icon: (isProgressKeyPresent ? 'check_circle' : 'cancel') as MaterialSymbol,
			}
		})
		return {
			id: lastWill._id,
			title: lastWill.testator !== '' ? lastWill.testator : 'Testament',
			createdAt: new Date(lastWill.createdAt),
			updatedAt: new Date(lastWill.updatedAt),
			steps: steps,
		}
	})
}
