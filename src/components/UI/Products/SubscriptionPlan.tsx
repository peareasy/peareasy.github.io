import React from 'react';
import * as api from '../../../api/privateApi';
import { PrimaryButton } from '../Button';
import {copied} from "../icons";

type PlanProps = {
    name: string;
    priceId: string;
    features: Array<string>;
    userId: string;
};
  

const SubscriptionPlan = ({ name, priceId, features, userId }: PlanProps) => {
  
    return (
      <div className="bg-gray-900 flex flex-col p-4 ">
        <p className='m-auto text-3xl pb-2'>{name}</p>
        
        {features.map((feature, idx) => <div key={idx} className='m-auto text-l pb-2 flex flex-row'><span>{copied}</span><p>{feature}</p></div>)}
        <PrimaryButton title={"Subscribe"} onClick={() => api.createCheckoutSession( priceId, userId)} />
      </div>
    );
};

export { SubscriptionPlan }