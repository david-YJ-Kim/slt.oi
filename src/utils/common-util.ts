import { CommonHeader } from "./spec/common-header";

// common-util.ts
const src: string = import.meta.env.VITE_OI_NAME || "";

export const generateTid = () => {
  return `TR_${new Date().getTime()}_${Math.random()
    .toString(36)
    .substr(2, 9)}`;
};

export const generateCommonHeader = (
  cid: string,
  tgt: string
): CommonHeader => {
  return {
    cid: cid,
    tid: generateTid(),
    src: src,
    tgt: tgt,
  };
};

export default { generateTid, generateCommonHeader };
