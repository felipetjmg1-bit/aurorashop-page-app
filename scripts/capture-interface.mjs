import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const base = "http://127.0.0.1:8080";
await mkdir("artifacts/interface", { recursive: true });
const browser = await chromium.launch({ headless: true });

try {
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 1100 } });
  const response = await desktop.goto(base, { waitUntil: "networkidle" });
  if (!response || response.status() !== 200) throw new Error("Storefront did not return HTTP 200.");
  await desktop.getByRole("heading", { name: "Aurora Shop - Sua Loja Online Premium" }).waitFor();
  if (await desktop.locator(".product-card").count() !== 6) throw new Error("Expected six demo product cards.");
  if (await desktop.getByRole("button", { name: "Adicionar ao Carrinho" }).count() !== 6) throw new Error("Expected six demo cart buttons.");
  desktop.once("dialog", async dialog => {
    if (!dialog.message().includes("Produto adicionado ao carrinho")) throw new Error("Unexpected cart feedback.");
    await dialog.accept();
  });
  await desktop.getByRole("button", { name: "Adicionar ao Carrinho" }).first().click();
  await desktop.screenshot({ path: "artifacts/interface/aurorashop-desktop.png", fullPage: true });

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, deviceScaleFactor: 1 });
  await mobile.goto(base, { waitUntil: "networkidle" });
  await mobile.getByRole("heading", { name: "Produtos em Destaque" }).waitFor();
  await mobile.screenshot({ path: "artifacts/interface/aurorashop-mobile.png", fullPage: true });

  console.log("PASS: static storefront rendered; six sample products and alert-only cart feedback verified; desktop/mobile screenshots saved.");
} finally {
  await browser.close();
}
