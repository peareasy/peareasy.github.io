import { useState } from "react"
import StripeContainer from "../../components/Payments/StripeContainer"
import { PrimaryButton } from "../../components/UI/Button"
import { SubscriptionPlan } from "../../components/UI/Products/SubscriptionPlan"
const Premium = () => {
    return (
        <main className={'text-secondary text-center m-auto relative z-10'}>
            <div className='flex flex-row'>
                <SubscriptionPlan 
                  name={'Premium'}
                  priceId={'price_1KxW36ATqmUvIGSp9HaaKJ1W'}
                  features={['All SBCs', 'Standard Solver']}
                />
                <SubscriptionPlan 
                  name={'Elite'}
                  priceId={'price_1KxW3JATqmUvIGSpUNtkROG6'}
                  features={['All SBCs', 'Improved Solver', 'Toggle Untradeables']}
                />
            </div>
        </main>
    );
}

export default Premium