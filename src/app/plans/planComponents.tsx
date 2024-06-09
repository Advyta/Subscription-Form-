import React from 'react'
import clsx from 'clsx';
import Image from 'next/image';
// importing icons
import arcade from '../../../public/images/icon-arcade.svg';
import advanced from '../../../public/images/icon-advanced.svg';
import pro from '../../../public/images/icon-pro.svg';

// defining types
type PlanKey = 'arcade' | 'advanced' | 'pro';
type PlanComponentsProps = {
  billingType: string;
  selectedPlan: PlanKey;
  setSelectedPlan: (plan: PlanKey) => void;
  setCost: React.Dispatch<React.SetStateAction<number>>;
  plans: { [key in PlanKey]: {
    monthlyCost: number;
    yearlyCost: number;
  } }
};

const PlanComponents: React.FC<PlanComponentsProps> = ({ billingType, selectedPlan, setSelectedPlan, setCost, plans }) => {
  // Icons object 
  const planIcons: Record<PlanKey, any> = { arcade, advanced, pro }

  // selecting a plan and updating the cost
  const selectPlan = (plan: PlanKey) => {
    setSelectedPlan(plan);
    const planCost = billingType === 'Monthly' ? plans[plan].monthlyCost : plans[plan].yearlyCost;
    setCost(planCost);
  }

  return (
    <>
      {Object.entries(plans).map(([key, plan]) => {
        const planKey = key as PlanKey;
        return (
          <div key={key}
            className={clsx(
              'flex flex-row gap-x-4 lg:flex-col items-start cursor-pointer px-4 py-4 lg:pt-5 border w-full rounded-md transition-colors duration-300',
              selectedPlan === planKey
                ? 'border-purplish-blue bg-alabaster'
                : 'border-light-gray bg-transparent hover:border-purplish-blue'
            )}
            onClick={() => selectPlan(planKey)}>
            <Image src={planIcons[planKey]} alt={planKey} />
            <div className="flex flex-col lg:mt-10">
              <span className="capitalize font-bold text-marine-blue">
                {key}
              </span>
              <span className="lg:font-medium text-sm text-cool-gray">
                {billingType === 'Monthly'
                  ? `$${plan.monthlyCost}/mo`
                  : `$${plan.yearlyCost}/yr`}
              </span>
              {billingType === 'Yearly' && (
                <span className="text-marine-blue mt-1 text-xs font-medium lg:font-bold">
                  2 months free
                </span>
              )}
            </div>
          </div>
        )
      })}
    </>
  )
}

export default PlanComponents;
