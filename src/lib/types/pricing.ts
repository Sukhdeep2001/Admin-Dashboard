// app/lib/types/pricing.ts
export interface PricingFeature {
    icon: string;
    text: string;
}
  
export interface PricingPlan {
    id: string;
    title: string;
    monthlyPrice?: string;
    yearlyPrice?: string;
    description: string;
    buttonText: string;
    isPopular?: boolean;
    features: PricingFeature[];
}