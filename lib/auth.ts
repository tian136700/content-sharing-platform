/**
 * Validate admin API key from Authorization header.
 * Expected format: `Authorization: Bearer <API_KEY>`
 */
export function validateApiKey(request: Request): boolean {
  const expectedKey = process.env.ADMIN_API_KEY;
  if (!expectedKey) {
    console.error("[auth] ADMIN_API_KEY is not configured");
    return false;
  }

  const authHeader = request.headers.get("authorization");
  if (!authHeader) return false;

  const [scheme, token] = authHeader.split(" ");
  if (scheme?.toLowerCase() !== "bearer" || !token) return false;

  return token === expectedKey;
}
