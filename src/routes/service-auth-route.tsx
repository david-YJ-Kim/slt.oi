import { Navigate } from "react-router-dom";
import { auth } from "../firebase";
import oiConstant from "../oi-constant";

export default function ServiceAuthRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = auth.currentUser;
  if (user === null) {
    return (
      <Navigate
        to={`${oiConstant.url.brochure.base}${oiConstant.url.brochure.login}`}
      />
    );
  }

  // user ticket activation 확인
  return children;
}
