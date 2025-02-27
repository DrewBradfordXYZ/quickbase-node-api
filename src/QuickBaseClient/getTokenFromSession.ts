export function getTokenFromSession(dbid: string): string | null {
  const tokenData = sessionStorage.getItem(`tempToken_${dbid}`);
  if (tokenData) {
    const { token, expirationTime } = JSON.parse(tokenData);
    if (Date.now() < expirationTime) {
      return token;
    } else {
      sessionStorage.removeItem(`tempToken_${dbid}`);
    }
  }
  return null;
}
