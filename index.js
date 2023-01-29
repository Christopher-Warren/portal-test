import express from "express";
import { executablePath } from "puppeteer";
import puppeteer from "puppeteer-extra";
import PortalPlugin from "puppeteer-extra-plugin-portal";
import os from "os";
import { request } from "http";

const app = express();

app.listen(3001, () => {
  console.log("listening!");
});

puppeteer.use(
  PortalPlugin({
    // This is a typical configuration when hosting behind a secured reverse proxy
    webPortalConfig: {
      listenOpts: {
        port: process.env.PORT || 3000,
      },
      baseUrl: process.env.PORT
        ? "https://portal-test-12.onrender.com"
        : "http://localhost:3000",
    },
  })
);

const browser = await puppeteer.launch({
  executablePath: executablePath(),
  args: ["--no-sandbox"],
});
const page = await browser.newPage();

await page.goto("https://www.google.com");

const portalUrl = await page.openPortal();

console.log(portalUrl);
