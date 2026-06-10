import type { GeoInfo } from "@/types";

/**
 * Extract client IP and geo info from Cloudflare / proxy request headers.
 * Works in Cloudflare Workers/Pages and standard reverse-proxy setups.
 */
export function extractGeoFromHeaders(headers: Headers): GeoInfo {
  const ip =
    headers.get("cf-connecting-ip") ??
    headers.get("x-real-ip") ??
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";

  const country = headers.get("cf-ipcountry") ?? "unknown";
  const region =
    headers.get("cf-region") ??
    headers.get("cf-region-code") ??
    "unknown";
  const cityHeader = headers.get("cf-ipcity");
  const city = cityHeader ? decodeURIComponent(cityHeader) : "unknown";

  return { ip, country, region, city };
}
