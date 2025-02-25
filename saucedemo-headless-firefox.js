const { Builder, By, Key, until } = require("selenium-webdriver");
const firefox = require("selenium-webdriver/firefox");
const assert = require("assert");

async function saucedemoLoginTestHeadless() {
    // menambahkan chrome option
    let options = new firefox.Options();
    options.addArguments("--headless");

    // Membuat koneksi dengan webdriver
    let driver = await new Builder()
    .forBrowser("firefox")
    .setFirefoxOptions(options)
    .build();

    // Exception Handling & Conclusion
    try {
        // Buka URL di browser

        await driver.get("https://saucedemo.com");

        await driver.findElement(By.id("user-name")).sendKeys("standard_user");
        await driver
            .findElement(By.xpath("//input[@id='password']"))
            .sendKeys("secret_sauce");

        await driver.findElement(By.name("login-button")).click();

        // Add to cart
        await driver.findElement(By.name("add-to-cart-sauce-labs-backpack")).click();

        // Add to cart 2
        await driver.findElement(By.name("add-to-cart-sauce-labs-bike-light")).click();
      

        // Assertion
        let titleText = await driver.findElement(By.css(".app_logo")).getText();
        assert.strictEqual(
            titleText.includes("Swag Lab"),
            true,
            "Judul halaman tidak sesuai"
        );
        console.log("Testing has been success!");

    } finally {
        
    }
}

saucedemoLoginTestHeadless();
