type IconProps = {
    /** The icon to show. */
    children: React.ReactNode
    /** Fill icons. */
    isFilled?: boolean
    /** Custom classes. */
    className?: string
    /** Use this to select element for testing. */
    dataCy?: string
}

/**
 * The `Icon` component is used to display a material icon.
 * @example <Icon>add</Icon>
 */
export const Icon: React.FC<IconProps> = ({ children, isFilled = false, dataCy, className }) => (
    <i dataCy={dataCy} style={isFilled ? { fontVariationSettings: "'FILL' 1" } : {}} className={`material-symbols-rounded ${className}`}>
        {children}
    </i>
)