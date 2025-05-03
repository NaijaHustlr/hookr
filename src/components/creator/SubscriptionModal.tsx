
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface SubscriptionTier {
  id: string;
  name: string;
  price: number;
  description: string;
  benefits: string[];
}

interface SubscriptionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedTier: string;
  setSelectedTier: (tier: string) => void;
  subscriptionTiers: SubscriptionTier[];
  creatorName: string;
  isProcessingPayment: boolean;
  handleSubscribe: () => void;
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  open,
  onOpenChange,
  selectedTier,
  setSelectedTier,
  subscriptionTiers,
  creatorName,
  isProcessingPayment,
  handleSubscribe,
}) => {
  const selectedSubscriptionTier = subscriptionTiers.find(tier => tier.id === selectedTier);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-hookr-dark border-hookr-muted text-hookr-light">
        <DialogHeader>
          <DialogTitle className="text-hookr-light text-xl">Subscribe to {creatorName}</DialogTitle>
          <DialogDescription className="text-hookr-light text-opacity-70">
            Choose your subscription plan to unlock all content.
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4 space-y-4">
          {subscriptionTiers.map((tier) => (
            <div 
              key={tier.id}
              className={`p-4 rounded-lg cursor-pointer transition-all ${selectedTier === tier.id 
                ? 'bg-hookr-accent bg-opacity-20 border-2 border-hookr-accent' 
                : 'bg-hookr-muted border-2 border-transparent'}`}
              onClick={() => setSelectedTier(tier.id)}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-hookr-light">{tier.name}</h3>
                <p className="font-bold text-hookr-accent">${tier.price}</p>
              </div>
              <p className="text-sm text-hookr-light text-opacity-70 mt-1">{tier.description}</p>
              <ul className="mt-3 space-y-2">
                {tier.benefits.map((benefit, index) => (
                  <li key={index} className="text-sm flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-hookr-accent mr-2"></div>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          <div className="bg-hookr-muted p-4 rounded-lg mt-6">
            <h3 className="font-medium mb-2 text-hookr-light">Payment Details</h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-hookr-light">Card Number</label>
                <input 
                  type="text" 
                  placeholder="**** **** **** ****" 
                  className="w-full p-2 bg-hookr-dark rounded-md text-hookr-light focus:outline-none focus:ring-1 focus:ring-hookr-accent"
                  readOnly
                  value="4242 4242 4242 4242"
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="text-sm text-hookr-light">Expiry</label>
                  <input 
                    type="text" 
                    placeholder="MM/YY" 
                    className="w-full p-2 bg-hookr-dark rounded-md text-hookr-light focus:outline-none focus:ring-1 focus:ring-hookr-accent"
                    readOnly
                    value="12/25"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-sm text-hookr-light">CVC</label>
                  <input 
                    type="text" 
                    placeholder="***" 
                    className="w-full p-2 bg-hookr-dark rounded-md text-hookr-light focus:outline-none focus:ring-1 focus:ring-hookr-accent"
                    readOnly
                    value="123"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter className="mt-6">
          <Button 
            variant="outline" 
            className="border-hookr-light text-hookr-light" 
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button 
            className="bg-hookr-accent text-hookr-light"
            onClick={handleSubscribe}
            disabled={isProcessingPayment}
          >
            {isProcessingPayment ? 'Processing...' : `Subscribe for $${selectedSubscriptionTier?.price}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionModal;
