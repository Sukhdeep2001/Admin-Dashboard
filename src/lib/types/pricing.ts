export interface PricingFeature {
    icon: string;
    text: string;
  }
  
  export interface PricingPlan {
    id: string;
    title: string;
    monthlyPrice?: string;
    yearlyPrice?: string;
    pricePeriod?: string;
    description: string;
    buttonText: string;
    isPopular?: boolean;
    subscriberCount?: string | number; // ✅ FIX ADDED HERE
    features: PricingFeature[];
  }
  