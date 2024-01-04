import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

export default function BrochureRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = auth.currentUser;
  // 개발을 위해 잠시... 주석
  // if (user) {
  //   return <Navigate to="/service" />;
  // }
  return children;
}
