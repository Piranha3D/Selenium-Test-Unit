const { Builder, By, Key, until, Browser } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const firefox = require("selenium-webdriver/firefox");
const edge = require("selenium-webdriver/edge");
const assert = require("assert");

async function saucedemoCrossBrowser() {
    const browsers = [
        {
            name: "chrome",
            options: new chrome.Options().addArguments("--headless"),
        },
        {
            name: "firefox",
            options: new firefox.Options().addArguments("--headless"),
        },
        {
            name: "MicrosoftEdge",
            options: new edge.Options().addArguments("--headless"),
        }
    ];
    

    for (let browser of browsers) {

        // Membuat koneksi dengan webdriver
        let driver = await new Builder()
        .forBrowser(browser.name)
        .setChromeOptions(browser.name === "chrome" ? browser.options : undefined)
        .setFirefoxOptions(
            browser.name === "firefox" ? browser.options : undefined
        )
        .setEdgeOptions(
            browser.name === "MicrosoftEdge" ? browser.options : undefined
        )
        .build();
    

    // Exception Handling & Conclusion
    try {
        // Buka URL di browser

        await driver.get("https://saucedemo.com");

        await driver.findElement(By.id("user-name")).sendKeys("standard_user");
        await driver.findElement(By.xpath("//input[@id='password']")).sendKeys("secret_sauce");
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
        console.log("testing success with browser " + Browser.name);

    } finally {
        await driver.quit();
        
    }

    }

}
saucedemoCrossBrowser();
