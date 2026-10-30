const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  console.log("Launching browser...");
  const browser = await puppeteer.launch({ headless: "new", args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  console.log("Navigating to http://localhost:5173/transformation...");
  await page.goto('http://localhost:5173/transformation', { waitUntil: 'networkidle0' });
  
  // Wait a moment for any final render frame
  await new Promise(r => setTimeout(r, 1000));
  
  // Remove scripts, Vite injections, React hydration stuff
  await page.evaluate(() => {
    document.querySelectorAll('script').forEach(e => e.remove());
    document.querySelectorAll('link[rel="modulepreload"]').forEach(e => e.remove());
    document.querySelectorAll('noscript').forEach(e => e.remove());
  });

  const html = await page.content();
  console.log("Writing to dummy/index.html...");
  fs.writeFileSync('/home/sachin-rawat/studiofitindia/dummy/index.html', html);
  
  await browser.close();
  console.log('Saved to dummy/index.html successfully.');
})();
