'use client'
import { Headline } from "../../../components/Headline/Headline"
import { useTestamentContext } from "../../../context/testament/TestamentContext"

// export const metadata = {
//     title: 'Start | Beyond Life',
//     description: 'Handle your death.',
// }

/**
 * Testament Start Page for Legal Stuff.
 */
const TestamentStart = () => {
    const { testament, onReloadNeeded } = useTestamentContext()

    return <div className="container">
        <Headline>Testament Start/Legal</Headline>
        {/* TODO: Ref this to own component that we can use metadata */}
        <p>Testator: {testament.testator.name} {testament.testator.surname}</p>
        <button onClick={() => onReloadNeeded()}>Reload</button>
    </div>
}

export default TestamentStart
