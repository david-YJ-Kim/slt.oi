import { useNavigate } from "react-router-dom";
import { SaveButton } from "../../components/button-components";
import { Wrapper } from "../../components/layout-styled";
import { auth, db } from "../../firebase";
import oiConstant from "../../oi-constant";
import { addDoc, collection } from "firebase/firestore";

export default function PurchaseTicket() {
  const user = auth.currentUser;
  const navigate = useNavigate();
  const onPurchase = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!user) {
      alert("Please log in first.");
      navigate(
        `${oiConstant.url.brochure.base}${oiConstant.url.brochure.login}`
      );
      return;
    }

    confirm("Are you sure to purchase ticket?");
    try {
      await addDoc(collection(db, "tickets"), {
        userId: user.uid,
        username: user.displayName,
        createdAt: Date.now(),
        expiredAt: Date.now() + 100,
        grade: "A",
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Wrapper>
      <SaveButton onClick={onPurchase}>Purchase Ticket</SaveButton>
    </Wrapper>
  );
}
