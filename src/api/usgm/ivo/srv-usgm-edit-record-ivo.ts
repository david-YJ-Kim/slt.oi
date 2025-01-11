import { CommonBody } from "../../../utils/spec/common-body";
import { CommonHeader } from "../../../utils/spec/common-header";

export default interface SrvUsgmEditRecordIvo {
  head: CommonHeader;
  body: Body;
}

interface Body extends CommonBody {
  objId: string;
  repoFileName: string;
  repoFilePath: string;
  gitRepoUrl: string;
  gitRepoBranchName: string;
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
    "cid": "SRV_USGM_EDIT_RECORD"
  },
  "body": {
    "siteId": "SVM",
    "userId": "DavidKim",
    "repoFileName": "slt",
    "repoFilePath": "C:/localPath",
    "gitRepoUrl": "http://github.com",
    "gitRepoBranchName": "main",
    "gitToken": "abstsqwe",
  }
}
 */
