export const MessageList = {
  // Health Check
  AP_HEALTH_TEST: "AP_HEALTH_TEST",

  // Test Messages
  AP_SYS_TEST: "AP_SYS_TEST",
  AP_FIS_TEST: "AP_FIS_TEST",
  AP_HTTP_TEST: "AP_HTTP_TEST",

  // SRV Messages
  SRV_MSG_COM_SLC_SEND: "SRV_MSG_COM_SLC_SEND",
  SRV_MSG_COM_HTTP_SEND: "SRV_MSG_COM_HTTP_SEND",

  // USGM Service
  SRV_USGM_NEW_RECORD: "SRV_USGM_NEW_RECORD",
  SRV_USGM_FETCH_REQ: "SRV_USGM_FETCH_REQ",
  SRV_USGM_EDIT_RECORD: "SRV_USGM_EDIT_RECORD",
  SRV_USGM_DELETE_RECORD: "SRV_USGM_DELETE_RECORD",
  SRV_USGM_GIT_PULL: "SRV_USGM_GIT_PULL",
  SRV_USGM_GIT_PUSH: "SRV_USGM_GIT_PUSH",
} as const;

// 타입 추출
export type MessageType = (typeof MessageList)[keyof typeof MessageList];