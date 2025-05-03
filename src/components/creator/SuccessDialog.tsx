
import React from "react";
import { Shield } from "lucide-react";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from "@/components/ui/alert-dialog";

interface SuccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  creatorName: string;
}

const SuccessDialog: React.FC<SuccessDialogProps> = ({
  open,
  onOpenChange,
  creatorName
}) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-hookr-dark border-hookr-muted text-hookr-light">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-hookr-light">Subscription Active!</AlertDialogTitle>
          <AlertDialogDescription className="text-hookr-light text-opacity-70">
            Thank you for subscribing to {creatorName}'s premium content. You now have access to all exclusive content.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="my-4 p-4 bg-green-500 bg-opacity-20 rounded-lg border border-green-500">
          <h4 className="font-medium text-green-400 flex items-center">
            <Shield className="h-4 w-4 mr-2" />
            Subscription Confirmed
          </h4>
          <p className="text-sm text-hookr-light mt-1">
            Your subscription is now active. Enjoy unlimited access to premium content.
          </p>
        </div>
        <AlertDialogFooter>
          <AlertDialogAction className="bg-hookr-accent text-white" onClick={() => onOpenChange(false)}>
            Start Exploring
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SuccessDialog;
