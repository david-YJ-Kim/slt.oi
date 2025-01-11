// USGM 서비스 중, 로컬 깃 레포지토리에 대한 기준정보 데이터 객체

interface OiUsgmFetchRep {
  objId: string;
  fileName: string;
  localPath: string;
  upstreamUrl: string;
  branch: string;
  gitEmail: string;
  gitToken: string;
}
