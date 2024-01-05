// import { createSlice } from "@reduxjs/toolkit";

// // project imports
// import { dispatch } from "../index";
// import { queryUserTicketInfo } from "../../utils/ui-query-util";

// // ------------------------------

// const initialState = {
//   error: null,
//   userTicketInfo: null,
// };

// const slice = createSlice({
//   name: "userTicketInfo",
//   initialState,
//   reducers: {
//     // HAS ERROR
//     hasError(state, action) {
//       state.error = action.payload;
//     },

//     // GET Sales Card Data
//     getUserTicketInfo(state, action) {
//       console.log(action);
//       state.userTicketInfo = action.payload;
//       console.log(state.userTicketInfo);
//     },
//   },
// });

// // Reducer
// export default slice.reducer;

// export function getUserTicketInfo(uid: string) {
//   return async () => {
//     try {
//       const ticketInfo = await queryUserTicketInfo(uid);
//       dispatch(slice.actions.getUserTicketInfo(ticketInfo));
//     } catch (error) {
//       console.log(error);
//       dispatch(slice.actions.hasError(error));
//     }
//   };
// }
