import { createContext, useContext, useState, ReactNode } from 'react';

interface RiderContextType {
  isOnline: boolean;
  toggleOnline: () => void;
  hasIncomingOrder: boolean;
  setHasIncomingOrder: (value: boolean) => void;
  activeDelivery: any | null;
  setActiveDelivery: (delivery: any | null) => void;
}

const RiderContext = createContext<RiderContextType | undefined>(undefined);

export function RiderProvider({ children }: { children: ReactNode }) {
  const [isOnline, setIsOnline] = useState(false);
  const [hasIncomingOrder, setHasIncomingOrder] = useState(false);
  const [activeDelivery, setActiveDelivery] = useState<any | null>(null);

  const toggleOnline = () => {
    setIsOnline((prev) => !prev);
  };

  return (
    <RiderContext.Provider
      value={{
        isOnline,
        toggleOnline,
        hasIncomingOrder,
        setHasIncomingOrder,
        activeDelivery,
        setActiveDelivery,
      }}
    >
      {children}
    </RiderContext.Provider>
  );
}

export function useRider() {
  const context = useContext(RiderContext);
  if (!context) {
    throw new Error('useRider must be used within RiderProvider');
  }
  return context;
}
