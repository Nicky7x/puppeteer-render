const puppeteer = require("puppeteer");
require("dotenv").config();

const scrapeLogic = async (res) => {
  const browser = await puppeteer.launch({
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
    ],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
  });
  try {
    const page = await browser.newPage();

    await page.goto("https://niichat.onrender.com/");

    // Set screen size
    await page.setViewport({ width: 1080, height: 1024 });
   
    page.on('dialog', async (dialog) => {
    console.log(dialog.message());
    await dialog.accept('Bot198');
 });
    
    // Type into search box
    await page.type("textarea", "Nãosei");
    await page.waitForSelector("#spanButtonEnviar");
    await page.click("#spanButtonEnviar");

    const logStatement = 'Mensagem Enviada';
    console.log(logStatement);
    res.send(logStatement);
  } catch (e) {
    console.error(e);
    res.send(`Something went wrong while running Puppeteer: ${e}`);
  } finally {
    await browser.close();
  }
};

module.exports = { scrapeLogic };
