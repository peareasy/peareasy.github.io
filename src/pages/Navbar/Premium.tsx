import { useState } from "react"
import StripeContainer from "../../components/Payments/StripeContainer"
import { PrimaryButton } from "../../components/UI/Button"

const Premium = () => {
    const [showItem, setShowItem] = useState(false)
    return (
        <main className={'container mx-auto w-1/2 space-y-5 pb-10 pt-10 p-20 overflow-visible'}>
            <h1 className="text-secondary text-2xl text-left">Pick your plan</h1>
            {
                showItem ? <StripeContainer/>
                : 
                <>
                    <h3 className="text-secondary text-2xl text-left">$10.00</h3> 
                    <PrimaryButton onClick={() => setShowItem(true)} title={"Subscribe"}/>
                </>
            }
        </main>
    )
}

export default Premium