#! /usr/bin/env node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import chalk from "chalk";
import figlet from "figlet";

import { get2fa } from "./utils/2fa.js";

console.log(
  chalk.yellow(figlet.textSync("2FA Token", { horizontalLayout: "full" }))
);

yargs(hideBin(process.argv))
  .command(
    "$0",
    "get 2FA token",
    {
      secret: {
        alias: "s",
        description: "2FA token secret",
        type: "string",
        required: true,
      },
    },
    async (args) => {
      const secret = args.s || args.secret;

      const pattern = /^[A-Z0-9]{16}$/;
      const match = secret.match(pattern);

      if (!match) {
        console.log(`Informed secret is not valid: ${chalk.red(secret)}`);
        console.log(
          `Secret does not match required pattern: ${chalk.blue(pattern)}`
        );
        return;
      }

      console.log(
        `Generating 2FA token with secret: ${chalk.green(secret)} \n`
      );

      const token = await get2fa(secret);

      console.log(`Token: ${chalk.green(token)}`);
    }
  )
  .alias("version", "v")
  .alias("help", "h")
  .example(chalk.green("2fatoken -s <secret>"))
  .strict().argv;
