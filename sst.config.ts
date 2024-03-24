import { SSTConfig } from "sst";
import { NextjsSite } from "sst/constructs";

export default {
  config(_input) {
    return {
      name: "t3-app",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const site = new NextjsSite(stack, "site", {
        environment: {
          NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET!,
          DATABASE_URL: process.env.DATABASE_URL!,
          DIRECT_URL: process.env.DIRECT_URL!,
          NEXTAUTH_URL: process.env.NEXTAUTH_URL!,
          DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID!,
          DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET!,
        }
      });

      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;
