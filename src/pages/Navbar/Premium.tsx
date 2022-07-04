import { useCookies } from "react-cookie"
import { SubscriptionPlan } from "../../components/UI/Products/SubscriptionPlan"
const Premium = () => {
  const [{userId}] = useCookies(["userId"]);
    return (
        <main className={'text-secondary text-center m-auto relative z-10'}>
            <div className='flex flex-row'>
                <SubscriptionPlan 
                  name={'Premium'}
                  priceId={process.env.REACT_APP_STRIPE_PRICE_ID_PREMIUM}
                  features={['All SBCs', 'Standard Solver']}
                  userId={userId}
                />
            </div>
        </main>
    );
}

export default Premium