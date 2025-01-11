import { CommonBody } from "../../../utils/spec/common-body";
import { CommonHeader } from "../../../utils/spec/common-header";

export default interface SrvUsgmFetchReqIvo {
  head: CommonHeader;
  body: Body;
}

interface Body extends CommonBody {}

/**
 {
  "head": {
    "tgt": "SLT",
    "tgtEqp": [],
    "osrc": "",
    "srcEqp": "",
    "src": "OI",
    "tid": "tid",
    "cid": "SRV_USGM_FETCH_ALL"
  },
  "body": {
    "siteId": "SVM",
    "userId": "DavidKim",
  }
}
 */
