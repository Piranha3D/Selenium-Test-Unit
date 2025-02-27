const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");

  describe("Saucedemo Login Test", function () {
    let driver;
    let browserName = "chrome";

    beforeEach(async function () {
      // Menambahkan timeout
      this.timeout(30000); // 10.000 ms = 10 detik

      // Membuat koneksi dengan webdriver
      driver = await new Builder().forBrowser(browserName).build();
      await driver.get("https://saucedemo.com");
      //simpan cookie
      cookies = await driver.manage().getCookies();
    });

    it("Test 1-Login Success", async function () {
      //panggil cookie

      await driver.findElement(By.id("user-name")).sendKeys("standard_user");
      await driver.findElement(By.xpath("//input[@id='password']")).sendKeys("secret_sauce");
      await driver.findElement(By.name("login-button")).click();

      //assertion
      let titleText = await driver.findElement(By.css(".app_logo")).getText();
      assert.strictEqual(
        titleText.includes("Swag Lab"),
        true,
        'Title does not include "Swag Labs"'
      );
      console.log("Testing Login Success!");
    }),
      it("Test 2-Login Failed", async function () {
        await driver.findElement(By.id("user-name")).sendKeys("standard_user");
        await driver.findElement(By.xpath("//input[@id='password']")).sendKeys("passwordsalah");
        await driver.findElement(By.name("login-button")).click();

        //assertion
        let errorMessage = await driver
          .findElement(By.css(".error-message-container"))
          .getText();
        assert.strictEqual(
          errorMessage.includes("Username and password do not match"),
          true,
          "Error Message do not match"
        );
        console.log("Testing Login Failed = Success!");
      });
    afterEach(async function () {
      await driver.quit();
    });
  });

