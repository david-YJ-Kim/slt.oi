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
import USGMPage from "./view/pages/service/usgm/usgm-service";

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
        path: `${oiConstant.url.service.base}${oiConstant.url.service.usgmService}`,
        element: <USGMPage />,
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
    background-color: white;
    color:black;
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
