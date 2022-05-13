import React from 'react';
import { PrimaryButton } from '../Button';
import { createCheckoutSession } from "../../../api/api"

type PlanProps = {
    name: string;
    priceId: string;
    features: Array<string>;
};
  

const SubscriptionPlan = ({ name, priceId, features }: PlanProps) => {
    return (
      <div className="bg-gray-900 flex flex-col">
        <p className='m-auto text-3xl pb-2'>{name}</p>
        <ul>
            {features.map((feature, idx) => <li key={idx} className='m-auto text-xl pb-2'>{feature}</li>)}
        </ul>
        <PrimaryButton title={"Subscribe"} onClick={() => createCheckoutSession({priceId: priceId})} />
      </div>
    );
};

export { SubscriptionPlan }