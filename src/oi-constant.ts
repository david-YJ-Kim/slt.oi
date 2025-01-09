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
    usgmService: "usgm-service",
  },
};

const table = {
  tickets: {
    name: "tickets",
    pk: "userId",
  },
};

export default { url, table };
