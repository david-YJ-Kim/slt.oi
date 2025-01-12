// services/UsgmService.ts

import axios from "axios";
import { MessageList } from "../message-list";
import { generateCommonHeader } from "../../utils/common-util";
import SrvUsgmNewRecordIvo from "./ivo/srv-usgm-new-record-ivo";
import SrvUsgmEditRecordIvo from "./ivo/srv-usgm-edit-record-ivo";
import SrvUsgmDeleteRecordIvo from "./ivo/srv-usgm-delete-record-ivo";
import SrvUsgmGitPullIvo from "./ivo/srv-usgm-git-pull-ivo";
import SrvUsgmGitPushIvo from "./ivo/srv-usgm-git-push-ivo";
import SrvUsgmFetchReqIvo from "./ivo/srv-usgm-fetch-all-ivo";

export class UsgmApiService {
  private baseUrl: string;
  private oiName: string;

  constructor() {
    this.baseUrl = `http://${import.meta.env.VITE_AGENT_URL}:${
      import.meta.env.VITE_AGENT_PORT
    }/srv/usgm/`;

    this.oiName = import.meta.env.VITE_OI_NAME;
  }

  /**
   * API 요청 메소드
   * // TODO Util로 이전 필요
   * @param endpoint
   * @param payload
   * @returns
   */
  private async sendRequest<T>(endpoint: string, payload: any): Promise<T> {
    try {
      const response = await axios.post(`${this.baseUrl}${endpoint}`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(`USGM API Error: ${error}`);
    }
  }

  // 신규 레코드 등록
  async registerNewRecord(formData: OiUsgmFetchRep): Promise<any> {
    const payload: SrvUsgmNewRecordIvo = {
      head: generateCommonHeader(MessageList.SRV_USGM_NEW_RECORD, this.oiName),
      body: {
        repoFileName: formData.fileName,
        repoFilePath: formData.localPath,
        gitRepoUrl: formData.upstreamUrl,
        gitRepoBranchName: formData.branch,
        gitEmail: "sampleEmail",
        gitToken: "sampleToken",
        siteId: "SVM",
        userId: "davidKim",
      },
    };

    return this.sendRequest(MessageList.SRV_USGM_NEW_RECORD, payload);
  }

  // SRV_USGM_FETCH_REQ
  async fetchAllRecords(): Promise<any> {
    const payload: SrvUsgmFetchReqIvo = {
      head: generateCommonHeader(MessageList.SRV_USGM_FETCH_REQ, this.oiName),
      body: {
        siteId: "SVM",
        userId: "davidKim",
      },
    };

    return this.sendRequest(MessageList.SRV_USGM_FETCH_REQ, payload);
  }

  // SRV_USGM_EDIT_RECORD
  async editRecord(formData: OiUsgmFetchRep): Promise<any> {
    const payload: SrvUsgmEditRecordIvo = {
      head: generateCommonHeader(MessageList.SRV_USGM_EDIT_RECORD, this.oiName),
      body: {
        objId: formData.objId,
        repoFileName: formData.fileName,
        repoFilePath: formData.localPath,
        gitRepoUrl: formData.upstreamUrl,
        gitRepoBranchName: formData.branch,
        gitToken: formData.gitToken,
        siteId: "SVM",
        userId: "davidKim",
      },
    };

    return this.sendRequest(MessageList.SRV_USGM_EDIT_RECORD, payload);
  }

  // 레코드 삭제
  async deleteRecord(formData: OiUsgmFetchRep): Promise<any> {
    const payload: SrvUsgmDeleteRecordIvo = {
      head: generateCommonHeader(
        MessageList.SRV_USGM_DELETE_RECORD,
        this.oiName
      ),
      body: {
        objId: formData.objId,
        repoFileName: formData.fileName,
        repoFilePath: formData.localPath,
        gitRepoUrl: formData.upstreamUrl,
        gitRepoBranchName: formData.branch,
        siteId: "SVM",
        userId: "davidKim",
      },
    };

    return this.sendRequest(MessageList.SRV_USGM_DELETE_RECORD, payload);
  }

  // MessageList.SRV_USGM_GIT_PULL,
  async gitPull(formData: OiUsgmFetchRep): Promise<any> {
    const payload: SrvUsgmGitPullIvo = {
      head: generateCommonHeader(MessageList.SRV_USGM_GIT_PULL, this.oiName),
      body: {
        repoFileName: formData.fileName,
        repoFilePath: formData.localPath,
        gitRepoUrl: formData.upstreamUrl,
        gitRepoBranchName: formData.branch,
        siteId: "SVM",
        userId: "davidKim",
      },
    };

    return this.sendRequest(MessageList.SRV_USGM_GIT_PULL, payload);
  }

  // MessageList.SRV_USGM_GIT_PUSH
  async gitPush(formData: OiUsgmFetchRep): Promise<any> {
    const payload: SrvUsgmGitPushIvo = {
      head: generateCommonHeader(MessageList.SRV_USGM_GIT_PUSH, this.oiName),
      body: {
        repoFileName: formData.fileName,
        repoFilePath: formData.localPath,
        gitRepoUrl: formData.upstreamUrl,
        gitRepoBranchName: formData.branch,
        siteId: "SVM",
        userId: "davidKim",
      },
    };

    return this.sendRequest(MessageList.SRV_USGM_GIT_PUSH, payload);
  }
}

// 싱글톤 인스턴스 생성 및 export
export const usgmApiService = new UsgmApiService();
