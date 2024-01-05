import { RouterProvider, createBrowserRouter } from "react-router-dom";
import oiConstant from "./oi-constant";
import { createGlobalStyle, styled } from "styled-components";
import reset from "styled-reset";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import LoadingScreen from "./view/common/loading-screen";
import BrochureRoute from "./routes/brochure-route";
import BrochureLayout from "./view/layout/brochure-layout";
import ServiceAuthRoute from "./routes/service-auth-route";
import ServiceAuthLayout from "./view/layout/service-auth-layout";
import Login from "./view/pages/login";
import CreateAccount from "./view/pages/create-account";
import BrochureHome from "./view/pages/brochure-home";
import PurchaseTicket from "./view/pages/purchase-ticket";
import DownloadProduct from "./view/pages/download-product";
import ServiceDashboard from "./view/pages/service/service-dashboard";
import ServiceAccount from "./view/pages/service/service-account";
import SalesAnalyse from "./view/pages/service/sales-analyse";
import SalesManage from "./view/pages/service/sales-manage";
import ProductManage from "./view/pages/service/product-manage";
import ShopDataUpload from "./view/pages/service/shopdata-upload";
import ShopDataManage from "./view/pages/service/shopdata-manage";
import KeywordManage from "./view/pages/service/keyword-manage";
import KeywordCollect from "./view/pages/service/keyword-collect";

const router = createBrowserRouter([
  {
    path: `${oiConstant.url.service.base}`,
    element: (
      <ServiceAuthRoute>
        <ServiceAuthLayout />
      </ServiceAuthRoute>
    ),
    children: [
      {
        path: "",
        element: <ServiceDashboard />,
      },
      {
        path: `${oiConstant.url.service.base}${oiConstant.url.service.dashboard}`,
        element: <ServiceDashboard />,
      },
      {
        path: `${oiConstant.url.service.base}${oiConstant.url.service.account}`,
        element: <ServiceAccount />,
      },
      {
        path: `${oiConstant.url.service.base}${oiConstant.url.service.keywordCollect}`,
        element: <KeywordCollect />,
      },
      {
        path: `${oiConstant.url.service.base}${oiConstant.url.service.keywordManage}`,
        element: <KeywordManage />,
      },
      {
        path: `${oiConstant.url.service.base}${oiConstant.url.service.shopDataManage}`,
        element: <ShopDataManage />,
      },
      {
        path: `${oiConstant.url.service.base}${oiConstant.url.service.shopDataUpload}`,
        element: <ShopDataUpload />,
      },
      {
        path: `${oiConstant.url.service.base}${oiConstant.url.service.productManage}`,
        element: <ProductManage />,
      },
      {
        path: `${oiConstant.url.service.base}${oiConstant.url.service.salesManage}`,
        element: <SalesManage />,
      },
      {
        path: `${oiConstant.url.service.base}${oiConstant.url.service.salesAnalyse}`,
        element: <SalesAnalyse />,
      },
    ],
  },
  {
    path: "/",
    element: (
      <BrochureRoute>
        <BrochureLayout />
      </BrochureRoute>
    ),
    children: [
      {
        // Brochure Home
        path: "",
        element: <BrochureHome />,
      },
      {
        // log-in
        path: `${oiConstant.url.brochure.base}${oiConstant.url.brochure.login}`,
        // path: "/soi/v1/brochure/login",
        element: <Login />,
      },
      {
        // create-account
        path: `${oiConstant.url.brochure.base}${oiConstant.url.brochure.createAccount}`,
        element: <CreateAccount />,
      },
      {
        // product-install
        path: `${oiConstant.url.brochure.base}${oiConstant.url.brochure.donwloadProduct}`,
        element: <DownloadProduct />,
      },
      {
        // purchase-ticket
        path: `${oiConstant.url.brochure.base}${oiConstant.url.brochure.purchaseTicket}`,
        element: <PurchaseTicket />,
      },
    ],
  },
]);

const GlobalStyles = createGlobalStyle`
  ${reset};
  * {
    box-sizing: border-box;
  }
  body {
    background-color: black;
    color:white;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const init = async () => {
    await auth.authStateReady();
    setIsLoading(false);
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <Wrapper>
      <GlobalStyles />
      {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
    </Wrapper>
  );
}
export default App;
