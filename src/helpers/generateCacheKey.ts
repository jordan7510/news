export function generateCacheKey(url: string) {
    const { pathname, search } = new URL(url);
    const normalized = `${pathname}${search}`.replace(/\/+$/, "").toLowerCase();
    const safeKey = normalized.replace(/[^a-z0-9:?&=/_-]/gi, "_");
    return `cache:api:${safeKey}`;
}
