const baseUrl = "soi/v1";
const brochure = "brochure";
const service = "service";

const url = {
  brochure: {
    base: `/${baseUrl}/${brochure}/`,
    profile: "profile",
    login: "login",
    abutUs: "about-us",
    createAccount: "create-account",
    donwloadProduct: "product-install",
    purchaseTicket: "purchase-ticket",
  },
  service: {
    base: `/${baseUrl}/${service}/`,
    dashboard: "dashboard",
    account: "account",
    keywordCollect: "keyword-collect",
    keywordManage: "keyword-manage",
    shopDataManage: "shopData-manage",
    shopDataUpload: "shopData-upload",
    productManage: "product-manage",
    salesManage: "sales-manage",
    salesAnalyse: "sales-analyse",
  },
};

const table = {
  tickets: {
    name: "tickets",
    pk: "userId",
  },
};

export default { url, table };
