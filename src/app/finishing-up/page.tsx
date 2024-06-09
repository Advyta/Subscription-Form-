'use client'
import React from 'react'
import PageHeadings from '../components/page-headings'
import { useBilling } from '../components/BillingContext'
import Link from 'next/link';
import { addOns, plans } from '../ui/billingdata';
import Actions from '../components/actions';
import { useRouter } from 'next/navigation';

export default function FinishingUp() {
  const route = useRouter()
  const { billingType, selectedAddOns, selectedPlan, personalInfoFilled } = useBilling();
  const planCost = billingType === 'Monthly' ? plans[selectedPlan].monthlyCost : plans[selectedPlan].yearlyCost;
  const selectedAddOnsDetails = Object.values(addOns).filter(addOn => selectedAddOns[addOn.id]);
  const addOnsCost = selectedAddOnsDetails.reduce((total, addOn) => total + (billingType === 'Monthly' ? addOn.monthlyCost : addOn.yearlyCost), 0)
  const totalCost = planCost + addOnsCost;

  const nextPage = () => {
    personalInfoFilled === true 
    ? route.push('/thankyou')
    : route.push('/personal-info');
  }

  return (
    <section>
      <PageHeadings heading={'Finishing up'} discription={'Double-check everything looks OK before confirming.'} />

      <div className="flex flex-col lg:mt-16 mt-10 w-full bg-alabaster rounded-lg px-4 lg:px-6">
        <div className="flex justify-between pt-4 pb-3 lg:pb-5 items-center">
          <div className="flex flex-col ">
            <p className='capitalize text-marine-blue font-bold text-sm lg:text-base'>
              {selectedPlan} ({billingType})
            </p>
            <Link href='/plans' className='text-cool-gray hover:text-purplish-blue transition duration-300 underline text-sm font-medium decoration-2'>Change</Link>
          </div>
          <span className="text-marine-blue font-bold text-sm lg:text-[16px]">
            ${planCost}/{billingType === 'Monthly' ? 'mo' : 'yr'}
          </span>
        </div>

        <hr className='lg:my-5 mt-3 mb-5' />

        <div>
          {selectedAddOnsDetails.map(addOn => (
            <div key={addOn.id} className="flex justify-between">
              <p className='text-cool-gray text-sm'>{addOn.name}</p>
              <p className="text-marine-blue font-medium text-sm">
                +${billingType === 'Monthly' ? addOn.monthlyCost : addOn.yearlyCost}/{billingType === 'Monthly' ? 'mo' : 'yr'}
              </p>
            </div>
          ))}

          <div className="flex justify-between items-center mt-6">
            <p className="text-cool-gray text-sm">
              Total (per {billingType === 'Monthly' ? 'month' : 'year'})
            </p>
            <p className="text-purplish-blue text-lg lg:text-xl font-bold">
              $ {totalCost}/{billingType === 'Monthly' ? 'mo' : 'yr'}
            </p>
          </div>
        </div>

      </div>
      <Actions>
        <Link href='/add-ons' className="text-cool-gray transition duration-300 hover:text-marine-blue font-medium lg:font-bold text-sm lg:text-base">
          Go Back
        </Link>
        <button
          className="bg-marine-blue hover:opacity-80 transition duration-300 text-magnolia ml-auto px-[17px] lg:px-8 py-[10px] lg:py-3 text-sm lg:text-base rounded-[4px] lg:rounded-lg"
          onClick={nextPage}>
          Confirm
        </button>
      </Actions>
    </section>
  )
}
