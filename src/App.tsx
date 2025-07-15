import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import DocsPage from "@/pages/docs";
import PricingPage from "@/pages/pricing";
// import BlogPage from "@/pages/blog";
// import AboutPage from "@/pages/about";
import TableWithFilters from "./pages/table-with-filters";
import SettingLayout from "./pages/setting-layout";
import TwoColumnsCheckout from "./pages/two-columns-checkout";
import CenteredSignUpWithTwoSteps from "./pages/centered-sign-up-with-two-steps";
import DefaultLayout from "./layouts/default";

function App() {
  return (
    <DefaultLayout>
      <Routes>
        <Route element={<IndexPage />} path="/" />
        <Route element={<DocsPage />} path="/docs" />
        <Route element={<PricingPage />} path="/pricing" />
        {/* <Route element={<BlogPage />} path="/blog" />
        <Route element={<AboutPage />} path="/about" /> */}
        <Route element={<TableWithFilters />} path="/table-with-filters" />
        <Route element={<SettingLayout />} path="/setting-layout" />
        <Route element={<TwoColumnsCheckout />} path="/two-columns-checkout" />
        {/* centered-sign-up-with-two-steps */}
        <Route element={<CenteredSignUpWithTwoSteps />} path="/centered-sign-up-with-two-steps" />
      </Routes>
    </DefaultLayout>
  );
}

export default App;
