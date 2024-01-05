import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebase";
import oiConstant from "../oi-constant";
import { useNavigate } from "react-router-dom";

export const getUserGrade = async (
  uid: string,
  gradSetter: (grade: string) => void
) => {
  const ticketQuery = query(
    collection(db, oiConstant.table.tickets.name),
    where(oiConstant.table.tickets.pk, "==", uid),
    orderBy("createdAt", "desc")
  );
  const snapShot = await getDocs(ticketQuery);

  if (snapShot.empty) {
    console.log("No such document.");
  } else if (snapShot.size == 1) {
    const { userId, username, grade, createdAt, expiredAt } =
      snapShot.docs[0].data();
    gradSetter(grade);
  } else {
    console.log("Expired Tickets");
  }
};

export const queryUserTicketInfo = async (uid: string) => {
  const ticketQuery = query(
    collection(db, oiConstant.table.tickets.name),
    where(oiConstant.table.tickets.pk, "==", uid),
    orderBy("createdAt", "desc")
  );
  const snapShot = await getDocs(ticketQuery);

  if (snapShot.empty) {
    console.log("No such document.");
  } else if (snapShot.size == 1) {
    // const { userId, username, grade, createdAt, expiredAt } =
    //   snapShot.docs[0].data();
    return snapShot.docs[0].data();
  } else {
    console.log("Expired Tickets");
  }
};
