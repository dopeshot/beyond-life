import { MaterialSymbol } from "material-symbols"
import { Headline } from "../../Headline/Headline"
import { Icon } from "../../Icon/Icon"

export type CardWithIconProps = {
    /** Icon to display. */
    icon: MaterialSymbol
    /** Title of card. */
    title?: string
    /** Content of card. */
    children: React.ReactNode
}

/**
 * Card with an Icon.
 */
export const CardWithIcon: React.FC<CardWithIconProps> = ({ icon, title, children }) => {
    return <div className="flex border border-gray-200 rounded-xl p-4 md:p-6">
        <div className="flex items-center justify-center bg-yellow rounded-xl h-12 min-w-[48px] w-12 mr-4">
            <Icon icon={icon} />
        </div>
        <div>
            {title && <Headline level={5}>{title}</Headline>}
            {children}
        </div>
    </div>
}
