import { createBrowserRouter } from "react-router";
import NotFound from "./screens/NotFound";
import PaymentCallback from "./screens/PaymentCallback";
import VerifyOtp from "./screens/VerifyOtp";
import ForgotPassword from "./screens/ForgotPassword";
import ResetPassword from "./screens/ResetPassword";
import Splash from "./screens/Splash";
import SignUp from "./screens/SignUp";
import Login from "./screens/Login";
import Home from "./screens/Home";
import Restaurant from "./screens/Restaurant";
import Cart from "./screens/Cart";
import Payment from "./screens/Payment";
import OrderTracking from "./screens/OrderTracking";
import OrderSuccess from "./screens/OrderSuccess";
import OrderHistory from "./screens/OrderHistory";
import Profile from "./screens/Profile";
import SavedAddresses from "./screens/SavedAddresses";
import Notifications from "./screens/Notifications";
import Help from "./screens/Help";
import ScreenGallery from "./screens/ScreenGallery";
import VendorLogin from "./screens/vendor/VendorLogin";
import VendorDashboard from "./screens/vendor/VendorDashboard";
import VendorOrders from "./screens/vendor/VendorOrders";
import VendorOrderDetail from "./screens/vendor/VendorOrderDetail";
import VendorMenu from "./screens/vendor/VendorMenu";
import VendorMenuEdit from "./screens/vendor/VendorMenuEdit";
import VendorAnalytics from "./screens/vendor/VendorAnalytics";
import VendorEarnings from "./screens/vendor/VendorEarnings";
import VendorProfile from "./screens/vendor/VendorProfile";
import RiderLogin from "./screens/rider/RiderLogin";
import RiderSignup from "./screens/rider/RiderSignup";
import RiderHome from "./screens/rider/RiderHome";
import RiderOrderAlert from "./screens/rider/RiderOrderAlert";
import RiderActiveDelivery from "./screens/rider/RiderActiveDelivery";
import RiderEarnings from "./screens/rider/RiderEarnings";
import RiderProfile from "./screens/rider/RiderProfile";
import AdminLogin from "./screens/admin/AdminLogin";
import AdminDashboard from "./screens/admin/AdminDashboard";
import AdminOrders from "./screens/admin/AdminOrders";
import AdminPeople from "./screens/admin/AdminPeople";
import AdminAnalytics from "./screens/admin/AdminAnalytics";
import AdminFinance from "./screens/admin/AdminFinance";
import AdminPromotions from "./screens/admin/AdminPromotions";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Splash,
  },
  {
    path: "/gallery",
    Component: ScreenGallery,
  },
  {
    path: "/signup",
    Component: SignUp,
  },
  {
    path: "/verify-otp",
    Component: VerifyOtp,
  },
  {
    path: "/forgot-password",
    Component: ForgotPassword,
  },
  {
    path: "/reset-password",
    Component: ResetPassword,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/home",
    Component: Home,
  },
  {
    path: "/restaurant/:id",
    Component: Restaurant,
  },
  {
    path: "/cart",
    Component: Cart,
  },
  {
    path: "/order/confirm",
    Component: PaymentCallback,
  },
  {
    path: "/payment/callback",
    Component: PaymentCallback,
  },
  {
    path: "/payment",
    Component: Payment,
  },
  {
    path: "/tracking/:orderId",
    Component: OrderTracking,
  },
  {
    path: "/success/:orderId",
    Component: OrderSuccess,
  },
  {
    path: "/profile",
    Component: Profile,
  },
  {
    path: "/orders",
    Component: OrderHistory,
  },
  {
    path: "/addresses",
    Component: SavedAddresses,
  },
  {
    path: "/notifications",
    Component: Notifications,
  },
  {
    path: "/help",
    Component: Help,
  },
  // Vendor Portal Routes
  {
    path: "/vendor/login",
    Component: VendorLogin,
  },
  {
    path: "/vendor/dashboard",
    Component: VendorDashboard,
  },
  {
    path: "/vendor/orders",
    Component: VendorOrders,
  },
  {
    path: "/vendor/orders/:id",
    Component: VendorOrderDetail,
  },
  {
    path: "/vendor/menu",
    Component: VendorMenu,
  },
  {
    path: "/vendor/menu/:id",
    Component: VendorMenuEdit,
  },
  {
    path: "/vendor/analytics",
    Component: VendorAnalytics,
  },
  {
    path: "/vendor/earnings",
    Component: VendorEarnings,
  },
  {
    path: "/vendor/profile",
    Component: VendorProfile,
  },
  // Rider Portal Routes
  {
    path: "/rider/login",
    Component: RiderLogin,
  },
  {
    path: "/rider/signup",
    Component: RiderSignup,
  },
  {
    path: "/rider/home",
    Component: RiderHome,
  },
  {
    path: "/rider/order-alert",
    Component: RiderOrderAlert,
  },
  {
    path: "/rider/delivery",
    Component: RiderActiveDelivery,
  },
  {
    path: "/rider/earnings",
    Component: RiderEarnings,
  },
  {
    path: "/rider/profile",
    Component: RiderProfile,
  },
  // Admin Portal Routes
  {
    path: "/admin/login",
    Component: AdminLogin,
  },
  {
    path: "/admin/dashboard",
    Component: AdminDashboard,
  },
  {
    path: "/admin/orders",
    Component: AdminOrders,
  },
  {
    path: "/admin/people",
    Component: AdminPeople,
  },
  {
    path: "/admin/analytics",
    Component: AdminAnalytics,
  },
  {
    path: "/admin/finance",
    Component: AdminFinance,
  },
  {
    path: "/admin/promotions",
    Component: AdminPromotions,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);
