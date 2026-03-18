import path from "node:path";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: path.join("prisma", "schema.prisma"),
  datasource: {
    url: "postgresql://postgres.hifiiubdnufvuiubhbop:ss3KUUFcRTsPXX5C@aws-1-eu-central-1.pooler.supabase.com:5432/postgres",
  },
});