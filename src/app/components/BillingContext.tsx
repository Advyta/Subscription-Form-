'use client'
import React, { createContext, ReactNode, useContext, useState } from 'react'

type BillingType = 'Monthly' | 'Yearly'
type PlanKey = 'arcade' | 'advanced' | 'pro'
export type inputs = {
  name: string,
  email: string,
  phoneNo: number | null,
}
interface BillingContextProps {
  personalInfoFilled: boolean;
  setPersonalInfoFilled: (filled: boolean) => void;
  personalInfo: inputs;
  setPersonalInfo: (info: inputs) => void;
  billingType: BillingType;
  setBillingType: (type: BillingType) => void;
  selectedAddOns: { [key: number]: boolean };
  toggleAddOn: (id: number) => void;
  selectedPlan: PlanKey;
  setSelectedPlan: (plan: PlanKey) => void;
}

const BillingContext = createContext<BillingContextProps | undefined>(undefined)

export const BillingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const [personalInfoFilled, setPersonalInfoFilled] = useState<boolean>(false)
  const [personalInfo, setPersonalInfo] = useState<inputs>({name:'', email: '', phoneNo: null})
  const [billingType, setBillingType] = useState<BillingType>('Monthly')
  const [selectedAddOns, setSelectedAddOns] = useState<{ [key: number]: boolean }>({1: true});
  const [selectedPlan, setSelectedPlan] = useState<PlanKey>('arcade')

  const toggleAddOn = (id: number) => {
    setSelectedAddOns(prevState => ({ ...prevState, [id]: !prevState[id] }));
  };

  return (
    <BillingContext.Provider value={{ personalInfoFilled, setPersonalInfoFilled, personalInfo, setPersonalInfo, billingType, setBillingType, selectedAddOns, toggleAddOn, selectedPlan, setSelectedPlan }}>
      {children}
    </BillingContext.Provider>
  )
}


export const useBilling = () => {
  const context = useContext(BillingContext);
  if (!context) {
    console.log("there is an error");
    throw new Error('useBilling must be used within a BillingProvider');
  }
  return context;
}

