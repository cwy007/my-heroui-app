import PricingPage from "@/pages/pricing";
import TableWithFilters from "@/pages/table-with-filters";
import SettingLayout from "@/pages/setting-layout";
import TwoColumnsCheckout from "@/pages/two-columns-checkout";
import CenteredSignUpWithTwoSteps from "@/pages/centered-sign-up-with-two-steps";

export const routes = [
  {
    label: "/pricing",
    href: "/pricing",
    component: PricingPage,
  },
  {
    label: "/table-with-filters",
    href: "/table-with-filters",
    component: TableWithFilters,
  },
  {
    label: "/two-columns-checkout",
    href: "/two-columns-checkout",
    component: TwoColumnsCheckout,
  },
  {
    label: "/setting-layout",
    href: "/setting-layout",
    component: SettingLayout,
  },
  {
    label: "/centered-sign-up-with-two-steps",
    href: "/centered-sign-up-with-two-steps",
    component: CenteredSignUpWithTwoSteps,
  },
]