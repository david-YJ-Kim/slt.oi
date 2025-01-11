import { CommonBody } from "../../../utils/spec/common-body";
import { CommonHeader } from "../../../utils/spec/common-header";

export default interface SrvUsgmGitPushIvo {
  head: CommonHeader;
  body: Body;
}

interface Body extends CommonBody {
  repoFileName: string;
  repoFilePath: string;
  gitRepoUrl: string;
  gitRepoBranchName: string;
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
    "cid": "SRV_USGM_GIT_PUSH"
  },
  "body": {
    "siteId": "SVM",
    "userId": "DavidKim",
    "repoFileName": "slt",
    "repoFilePath": "C:/localPath",
    "gitRepoUrl": "http://github.com",
    "gitRepoBranchName": "main",
  }
}
 */
