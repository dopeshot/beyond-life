'use client'
import { Headline } from "../../../../components/Headline/Headline"
import { useTestamentContext } from "../../../../context/testament/TestamentContext"

/**
 * Testament Start Page for Legal Stuff.
 */
const TestamentStart = () => {
    const { testament, reloadData } = useTestamentContext()

    return <div className="container">
        <Headline>Testament Start/Legal</Headline>
        {/* TODO: Ref this to own component that we can use metadata */}
        <p>Testator: {testament.testator.name} {testament.testator.surname}</p>
        <button onClick={() => reloadData()}>Reload</button>
    </div>
}

export default TestamentStart
