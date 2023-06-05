import { MaterialSymbol } from "material-symbols"
import { Color } from "../../../types/color"
import { Icon } from "../../Icon/Icon"

type CustomSelectionButtonProps = {
    /** If the button is active or not. */
    active: boolean
    /** The color of the border and icon when active */
    activeColor?: Color
    /** The icon when active. */
    activeIcon?: MaterialSymbol
    /** The function that is called when the button is clicked. */
    onClick: () => void
    /** The headline in the button. */
    headline: string
    /** The description in the button. */
    description: string
    /** For testing. */
    datacy?: string
}

/**
 * A custom selection button that can be used in a form for a selection between states.
 */
export const CustomSelectionButton: React.FC<CustomSelectionButtonProps> = ({ active, activeColor = "yellow", activeIcon = "check_circle", onClick, headline, datacy, description }) => {
    return (
        <button
            datacy={datacy}
            type="button"
            onClick={onClick}
            disabled={active}
            className={`flex items-center flex-col border-2 transition duration-200 ease-in-out ${active ? `border-${activeColor}-500` : "border-gray-100"
                } rounded-lg pt-1 pb-3 px-4`}
        >
            {active ? <Icon icon={activeIcon} className={`text-${activeColor}-500 h-4 ml-auto`} /> : <Icon icon="circle" className="text-gray-200 h-4 ml-auto" />}
            <h6 className="mt-1 md:mt-0 font-medium">{headline}</h6>
            <p className="text-gray-600">{description}</p>
        </button>
    )
}