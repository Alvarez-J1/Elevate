import { API_BASE_URL } from "@/lib/api";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const BACKEND_HEALTH_TIMEOUT_MS = 8_000;
const NO_STORE_HEADERS = {
  "Cache-Control": "no-store, max-age=0",
};

export async function GET() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), BACKEND_HEALTH_TIMEOUT_MS);

  try {
    const response = await fetch(`${API_BASE_URL}/api/health`, {
      method: "GET",
      cache: "no-store",
      signal: controller.signal,
    });

    if (response.ok) {
      return new Response(null, {
        status: 200,
        headers: NO_STORE_HEADERS,
      });
    }

    return new Response(null, {
      status: 503,
      headers: {
        ...NO_STORE_HEADERS,
        "Retry-After": "4",
      },
    });
  } catch {
    return new Response(null, {
      status: 503,
      headers: {
        ...NO_STORE_HEADERS,
        "Retry-After": "4",
      },
    });
  } finally {
    clearTimeout(timeout);
  }
}
