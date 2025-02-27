const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");
const LoginPage = require("../Pages/Loginpage");
const InventoryPage = require("../Pages/InventoryPage");
const profileData = require("../Fixtures/profiledata.json");
const fs = require("fs");
const path = require("path");

// folder Screenshot
const screenshotDir = path.join(__dirname, '../screenshot');
if (!fs.existsSync(screenshotDir)) {
  fs.mkdirSync(screenshotDir);
}

async function InventoryTest() {
  describe("Saucedemo Login Test", function () {
    let driver;
    let loginPage;
    let inventoryPage;
    let browserName = "chrome";

    beforeEach(async function () {
      this.timeout(30000); // Timeout 30 detik

      driver = await new Builder().forBrowser(browserName).build();
      loginPage = new LoginPage(driver);
      inventoryPage = new InventoryPage(driver);

      // Buka halaman login
      await driver.get(profileData.baseUrl);
    });

    it("Test 1 - Login Success", async function () {
      await loginPage.login(
        profileData.validUser.username, 
        profileData.validUser.password
      );

      await driver.wait(until.elementLocated(By.css(".app_logo")), 5000);

      let titleText = await inventoryPage.getTitleText();
      assert.strictEqual(titleText.trim(), "Swag Labs", "Login gagal!");

      console.log("Testing Login Success!");
    });

    it("Test 2 - Login Failed", async function () {
      await loginPage.login(
        profileData.invalidUser.username, 
        profileData.invalidUser.password
      );

      let errorElement = await driver.wait(
        until.elementLocated(By.css(".error-message-container")),5000
      );

      
      let errorMessage = await errorElement.getText();
      assert.strictEqual(
        errorMessage.includes("Epic sadface: Username and password do not match"),
        true,
        "Pesan error tidak sesuai!"
      );


      console.log("Testing Login Failed = Success!");
    });

    afterEach(async function () {
      const screenshotDir = path.join(__dirname, "../screenshots");
      if (!fs.existsSync(screenshotDir)) {
        fs.mkdirSync(screenshotDir);
      }

      // Gunakan nama test case untuk screenshot
      const testCaseName = this.currentTest.title.replace(/\s+/g, "_"); // Ganti spasi dengan underscore

      // Simpan screenshot baru dengan nama test case
      const image = await driver.takeScreenshot();
      fs.writeFileSync(
        path.join(screenshotDir, `${testCaseName}_new.png`),
        image,
        "base64"
      );
      await driver.quit();
    });
  });
}
InventoryTest();
