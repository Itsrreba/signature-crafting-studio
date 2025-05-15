
import { toast as sonnerToast } from "sonner";
import * as React from "react";

type ToastProps = {
  title?: string;
  description?: string;
  action?: React.ReactNode;
};

const toast = (props: ToastProps) => {
  sonnerToast(props.title, {
    description: props.description,
    action: props.action,
  });
};

export { toast };

// For shadcn/ui toast component compatibility
export const useToast = () => {
  const [toasts, setToasts] = React.useState<any[]>([]);

  return {
    toast: (props: any) => {
      setToasts((toasts) => [...toasts, props]);
    },
    toasts,
    dismiss: () => {},
  };
};
