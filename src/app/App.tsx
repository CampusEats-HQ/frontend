import { RouterProvider } from 'react-router';
import { router } from './routes';
import { CartProvider } from './context/CartContext';
import { VendorProvider } from './context/VendorContext';
import { RiderProvider } from './context/RiderContext';
import { Toaster } from 'sonner';

export default function App() {
  return (
    <CartProvider>
      <VendorProvider>
        <RiderProvider>
          <RouterProvider router={router} />
          <Toaster position="top-center" richColors />
        </RiderProvider>
      </VendorProvider>
    </CartProvider>
  );
}