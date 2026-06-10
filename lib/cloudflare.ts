type CfEnv = { DB?: D1Database };

export async function getDB(): Promise<D1Database | null> {
  try {
    const context = (
      globalThis as unknown as Record<symbol, { env: CfEnv } | undefined>
    )[Symbol.for("__cloudflare-request-context__")];
    return context?.env.DB ?? null;
  } catch {
    return null;
  }
}
