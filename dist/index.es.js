var m = Object.defineProperty;
var p = (n, e, t) => e in n ? m(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var a = (n, e, t) => p(n, typeof e != "symbol" ? e + "" : e, t);
import { QuickBase as c } from "quickbase";
function T(n, e) {
  const t = Date.now() + 3e5, o = { token: e, expirationTime: t };
  sessionStorage.setItem(`tempToken_${n}`, JSON.stringify(o));
}
async function g(n, e) {
  try {
    const o = (await n.getTempTokenDBID({ dbid: e })).temporaryAuthorization;
    return T(e, o), o;
  } catch (t) {
    throw console.error("Failed to generate temp token:", t), new Error(
      "Failed to generate temp token. Please check your environment variables and QuickBase configuration."
    );
  }
}
function y(n) {
  const e = sessionStorage.getItem(`tempToken_${n}`);
  if (e) {
    const { token: t, expirationTime: o } = JSON.parse(e);
    if (Date.now() < o)
      return t;
    sessionStorage.removeItem(`tempToken_${n}`);
  }
  return null;
}
class k {
  constructor(e, t, o) {
    a(this, "quickbase");
    a(this, "tokenKey");
    this.options = e;
    const { realm: s } = e;
    this.tokenKey = o, this.quickbase = new c({
      realm: s,
      [this.tokenKey]: t
    });
  }
  static async initialize(e) {
    const { realm: t, dbid: o, userToken: s, mode: u = "development" } = e;
    let r = null, i;
    if (u === "production") {
      if (r = y(o), !r) {
        const l = new c({ realm: t });
        r = await g(l, o);
      }
      i = "tempToken";
    } else
      r = s || null, i = "userToken";
    if (!r)
      throw new Error(
        "Token is not available. Please check your environment variables."
      );
    return new k(e, r, i);
  }
  async getApp(e) {
    return this.quickbase.getApp({ appId: e });
  }
  // Add other API methods as needed
}
export {
  k as QuickBaseClient
};
