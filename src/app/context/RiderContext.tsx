import { createContext, useContext, useState, ReactNode } from 'react';

export interface Rider {
  id: string;
  name: string;
  email: string;
  phone: string;
  rating: number;
  totalDeliveries: number;
  bankName: string;
  accountNumber: string;
}

interface RiderContextType {
  rider: Rider | null;
  login: (rider: Rider) => void;
  logout: () => void;
  isOnline: boolean;
  toggleOnline: () => void;
  hasIncomingOrder: boolean;
  setHasIncomingOrder: (value: boolean) => void;
  activeDelivery: any | null;
  setActiveDelivery: (delivery: any | null) => void;
}

const RiderContext = createContext<RiderContextType | undefined>(undefined);

export function RiderProvider({ children }: { children: ReactNode }) {
  const [rider, setRider] = useState<Rider | null>(null);
  const [isOnline, setIsOnline] = useState(false);
  const [hasIncomingOrder, setHasIncomingOrder] = useState(false);
  const [activeDelivery, setActiveDelivery] = useState<any | null>(null);

  const login = (riderData: Rider) => setRider(riderData);

  const logout = () => {
    setRider(null);
    setIsOnline(false);
    setActiveDelivery(null);
    setHasIncomingOrder(false);
  };

  const toggleOnline = () => {
    setIsOnline((prev) => !prev);
  };

  return (
    <RiderContext.Provider
      value={{
        rider,
        login,
        logout,
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
