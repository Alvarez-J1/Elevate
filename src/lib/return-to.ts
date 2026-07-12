const DEFAULT_RETURN_TO = "/";

/**
 * Validates a `returnTo` destination before it's used to redirect the
 * visitor after authentication. Only same-origin, path-relative
 * destinations are allowed — this prevents an open redirect via a crafted
 * `?returnTo=` value such as "//evil.com", "https://evil.com", or
 * "javascript:...". Anything that doesn't look like a plain internal path
 * falls back to `fallback` ("/" by default).
 */
export function sanitizeReturnTo(
  value: string | null | undefined,
  fallback: string = DEFAULT_RETURN_TO
): string {
  if (!value) {
    return fallback;
  }

  const isSameOriginPath =
    value.startsWith("/") &&
    !value.startsWith("//") &&
    !value.startsWith("/\\") &&
    !value.includes("://") &&
    !/^\s*javascript:/i.test(value);

  return isSameOriginPath ? value : fallback;
}

/**
 * Builds a link to `path` that carries the current `returnTo` forward, so
 * hopping between /login and /register (or any other internal redirect)
 * never loses track of where the visitor should end up afterward.
 */
export function withReturnTo(path: string, returnTo?: string | null): string {
  const safe = sanitizeReturnTo(returnTo);
  if (safe === DEFAULT_RETURN_TO) {
    return path;
  }
  return `${path}?returnTo=${encodeURIComponent(safe)}`;
}
