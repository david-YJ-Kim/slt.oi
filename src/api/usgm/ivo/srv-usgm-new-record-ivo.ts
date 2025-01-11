import { CommonBody } from "../../../utils/spec/common-body";
import { CommonHeader } from "../../../utils/spec/common-header";

export default interface SrvUsgmNewRecordIvo {
  head: CommonHeader;
  body: Body;
}

interface Body extends CommonBody {
  repoFileName: string;
  repoFilePath: string;
  gitRepoUrl: string;
  gitRepoBranchName: string;
  gitEmail: string;
  gitToken: string;
}

/**
 {
  "head": {
    "tgt": "SLT",
    "tgtEqp": [],
    "osrc": "",
    "srcEqp": "",
    "src": "OI",
    "tid": "tid",
    "cid": "SRV_USGM_NEW_RECORD"
  },
  "body": {
    "siteId": "SVM",
    "userId": "DavidKim",
    "repoFileName": "slt",
    "repoFilePath": "C:/localPath",
    "gitRepoUrl": "http://github.com",
    "gitRepoBranchName": "main",
    "gitEmail": "david.kim@tsh.com",
    "gitToken": "sample-token"
  }
}
 */
