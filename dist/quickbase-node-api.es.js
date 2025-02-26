import { QuickBase as r } from "quickbase";
import s from "dotenv";
s.config();
process.env.NODE_ENV === "development" ? s.config({ path: ".env.development" }) : process.env.NODE_ENV === "production" && s.config({ path: ".env.production" });
const a = (n, e) => {
  const o = Date.now() + 3e5, t = { token: e, expirationTime: o };
  sessionStorage.setItem(`tempToken_${n}`, JSON.stringify(t));
}, i = (n) => {
  const e = sessionStorage.getItem(`tempToken_${n}`);
  if (e) {
    const { token: o, expirationTime: t } = JSON.parse(e);
    if (Date.now() < t)
      return o;
    sessionStorage.removeItem(`tempToken_${n}`);
  }
  return null;
}, c = async (n) => {
  const e = new r({
    realm: process.env.VITE_QUICKBASE_REALM
  });
  try {
    const t = (await e.getTempTokenDBID({
      dbid: n
    })).temporaryAuthorization;
    return a(n, t), t;
  } catch (o) {
    throw console.error("Failed to generate temp token:", o), new Error(
      "Failed to generate temp token. Please check your environment variables and QuickBase configuration."
    );
  }
}, l = async (n) => {
  let e = null, o;
  if (process.env.NODE_ENV === "production" ? (e = i(n), e || (e = await c(n)), o = "tempToken") : (e = process.env.VITE_QUICKBASE_USER_TOKEN || null, o = "userToken"), !e)
    throw new Error(
      "Token is not available. Please check your environment variables."
    );
  return new r({
    realm: process.env.VITE_QUICKBASE_REALM,
    [o]: e
  });
}, p = async (n, e) => {
  const o = await l(n);
  try {
    return await e(o);
  } catch (t) {
    throw console.error("API request failed:", t), t;
  }
};
async function E(n) {
  const { tableId: e, includeFieldPerms: o } = n;
  return p(e, async (t) => await t.getFields({
    tableId: e,
    includeFieldPerms: o
  }));
}
export {
  p as apiRequest,
  E as getFields,
  l as quickbaseClient
};
