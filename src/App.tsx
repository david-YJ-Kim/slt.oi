import { RouterProvider, createBrowserRouter } from "react-router-dom";
import oiConstant from "./oi-constant";
import { createGlobalStyle, styled } from "styled-components";
import reset from "styled-reset";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import LoadingScreen from "./view/common/LoadingScreen";
import AuthRoute from "./routes/AuthRoute";
import AuthLayout from "./view/layout/AuthLayout";

const router = createBrowserRouter([
  {
    path: "/service",
    element: (
      <AuthRoute>
        <AuthLayout />
      </AuthRoute>
    ),
    children: [],
  },
  {
    path: "/",
    element: <></>,
    children: [
      {
        // log-in
        path: `/${oiConstant.routeConstant.base.uri}/${oiConstant.routeConstant.path.login}`,
        element: <></>,
      },
      {
        // create-account
        path: `/${oiConstant.routeConstant.base.uri}/${oiConstant.routeConstant.path.createAccount}`,
        element: <></>,
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
