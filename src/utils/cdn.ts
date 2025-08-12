// utils/cdn.ts
export function toCdnUrl(input?: string): string | undefined {
  if (!input) return input;
  const host = process.env.NEXT_PUBLIC_CDN_HOST;
  if (!host) return input;

  try {
    const u = new URL(input);
    // if it’s already pointing at CloudFront, leave it
    if (u.hostname === host) return input;
    // only rewrite S3 URLs
    if (!u.hostname.endsWith('.amazonaws.com')) return input;

    const key = u.pathname.replace(/^\/+/, '');
    return `https://${host}/${key}${u.search}`;
  } catch {
    // if it's a relative path or malformed, just return as-is
    return input;
  }
}
