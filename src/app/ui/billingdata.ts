// Defining types
type PlanKey = 'arcade' | 'advanced' | 'pro';
type Plan = {
  monthlyCost: number;
  yearlyCost: number;
}
// Defining Plans data object
export const plans: Record<PlanKey, Plan>  = {
  arcade: { monthlyCost: 9, yearlyCost: 90 },
  advanced: { monthlyCost: 12, yearlyCost: 120 },
  pro: { monthlyCost: 15, yearlyCost: 150 }
};

export const addOns: {
  [key: string]: {
    id: number;
    name: string;
    description: string;
    monthlyCost: number;
    yearlyCost: number;
  }
} = {
  online: { id: 1, name: 'Online service', description: 'Access to multiplayer games', monthlyCost: 1, yearlyCost: 10 },
  storage: { id: 2, name: 'Larger storage', description: 'Extra 1TB of cloud save', monthlyCost: 2, yearlyCost: 20 },
  profile: { id: 3, name: 'Customizable profile', description: 'Custom theme on your profile', monthlyCost: 2, yearlyCost: 20 }
};