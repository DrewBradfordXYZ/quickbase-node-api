export function storeTokenInSession(dbid: string, token: string) {
  const expirationTime = Date.now() + 5 * 60 * 1000; // 5 minutes from now
  const tokenData = { token, expirationTime };
  sessionStorage.setItem(`tempToken_${dbid}`, JSON.stringify(tokenData));
}
