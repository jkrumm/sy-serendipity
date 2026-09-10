// Worker secrets are not part of `wrangler types` output unless a local .dev.vars exists,
// so declare them here. Set in production with `bunx wrangler secret put BEA_SECRET_KEY`.
declare namespace Cloudflare {
  interface Env {
    BEA_SECRET_KEY: string;
  }
}
