import { test, expect } from "@playwright/test";

test.describe("Bauska Frontend Test", () => {

    test.beforeEach(async ({ page }) => {
        test.setTimeout(10000)
       let cookies =  browserContext.cookies("https//bauska.sk");
        page.goto("https://bauska.sk/")
        await browserContext.addCookies(cookies);
        
    })

    //Treba vyrišiť problém s tým, že funguje len v headec móde.
    test.skip("Správny title tag", async ({ page }) => {
        page.waitForLoadState("domcontentloaded")
        await expect(page).toHaveTitle("Bauska. | Stavebná spoločnosť")
    })

    test.skip("Zobrazuje sa stránka?", async ({ page }) => {
        let fullPage = page.locator("//html/body")

        await expect(fullPage).toBeVisible()
    })

    test.skip("Zobrazuje sa cookies lišta pri návšteve stránky prvý krát?", async ({ page }) => {
        let cookiesDiv = page.locator("//div[@id='CybotCookiebotDialog']")
        await expect(cookiesDiv).toBeVisible()
    })

    test.skip("Má cookies lišta potrebný obsah?", async ({ page }) => {
        let logo = page.locator("//img[@id='CybotCookiebotDialogPoweredbyImage']")
        let title = page.locator("//h2[@id='CybotCookiebotDialogBodyContentTitle']")
        let text = page.locator("//div[@id='CybotCookiebotDialogBodyContentText']")

        await expect(logo).toBeVisible()
        await expect(title).toBeVisible()
        await expect(text).toBeVisible()

        await expect(logo).toHaveAttribute("src", "https://bauska.sk/assets/img/logo.svg")
        await expect(title).toHaveText("Potvrdenie používania Cookies")
        await expect(text).toHaveText("Cookies sú malé bloky informácií, ktoré sú uložené vo vašom zariadení. Vytvára ich webový server počas vášho prezerania stránky a tieto cookies načítavame spätne. Niektoré slúžia na to, aby naše stránky fungovali správne, iné používame na analytické účely. Personalizačné cookies nám dovoľujú prispôsobovať stránku pre vás. Marketingové cookies umožňujú zobrazenie relevantnej reklamy a obsahu. Niektoré údaje zdieľame aj s tretími stranami - napríklad s Google. Veľmi by nám pomohlo, keby sme mohli používať všetky tieto cookies a následne vám prinášať lepší zážitok z používania. Preto vás žiadame o súhlas s ich používaním.")

        let cookiesBottomWrapper = page.locator("//div[@class='CybotCookiebotDialogBodyBottomWrapper']")
        await expect(cookiesBottomWrapper).toBeVisible()

        let potrebne = page.locator("//*[@id='CybotCookiebotDialogBodyLevelButtonsSelectPane']/fieldset/div[1]/label/span")
        let analyticke = page.locator('//*[@id="CybotCookiebotDialogBodyLevelButtonsSelectPane"]/fieldset/div[2]/label/span')
        let marketingove = page.locator('//*[@id="CybotCookiebotDialogBodyLevelButtonsSelectPane"]/fieldset/div[3]/label/span')

        await expect(potrebne).toBeVisible()
        await expect(analyticke).toBeVisible()
        await expect(marketingove).toBeVisible()

        await expect(potrebne).toHaveText('Potrebné')
        await expect(analyticke).toHaveText('Analytické')
        await expect(marketingove).toHaveText('Marketingové')


        let showDetails = page.locator("//a[@id='CybotCookiebotDialogBodyEdgeMoreDetailsLink']")
        await expect(showDetails).toBeVisible()
        await expect(showDetails).toHaveText("Zobraziť detaily")
        await expect(showDetails).toHaveAttribute("href", "#")

        let allow = page.locator("//button[@id='CookieGuardAllowAll']")
        let allowSelected = page.locator("//button[@id='CookieGuardAllowSelection']")

        await expect(allow).toBeVisible()
        await expect(allowSelected).toBeVisible()

        await expect(allow).toHaveText("Povoliť všetko")
        await expect(allowSelected).toHaveText("Povoliť výber")
    })

    test("Funguje všetko na cookies lište?", async ({ page }) => {
        await page.getByLabel('Analytické').check();
        await page.getByLabel('Analytické').uncheck();
        await page.getByLabel('Marketingové').check();
        await page.getByLabel('Marketingové').uncheck();

        await page.getByRole('link', { name: 'Zobraziť detaily' }).click();
        await page.locator('#CybotCookiebotDialogDetailBodyContentCookieContainerTypes').click();
        await page.getByRole('button', { name: 'Potrebné (7)' }).click();
        await page.getByRole('button', { name: 'Potrebné (7)' }).click();
        await page.getByRole('button', { name: 'Analytické (15)' }).click();
        await page.getByRole('button', { name: 'Analytické (15)' }).click();
        await page.getByRole('button', { name: 'Marketingové (17)' }).click();
        await page.getByRole('button', { name: 'Marketingové (17)' }).click();

        await page.getByText('Prehlásenie o cookies naposledy aktualizované dňa 25.2.2022').click();
        await page.locator('#CybotCookiebotDialogBodyLevelButtonMarketingInline').check();
        await page.locator('#CybotCookiebotDialogBodyLevelButtonMarketingInline').uncheck();
        await page.locator('#CybotCookiebotDialogBodyLevelButtonStatisticsInline').check();
        await page.locator('#CybotCookiebotDialogBodyLevelButtonStatisticsInline').uncheck();

        await page.getByRole('tab', { name: 'O cookies' }).click();
        await page.getByText('Cookies sú malé textové súbory, ktoré môžu používať webové stránky, aby zefektív').click();
        await page.getByText('Kedykoľvek môžete zmeniť alebo zrušiť svoj súhlas prostredníctvom Vyhlásenia o s').click();
        await page.getByRole('tab', { name: 'Súhlas' }).click();
        await page.getByRole('button', { name: 'Povoliť všetko' }).click();
    })

    test("Funguje odmietnutie/zmenenie cookies?", async ({ page }) => {
        await page.getByRole('button', { name: 'Povoliť všetko' }).click();
        await page.getByRole('link', { name: 'Nastaviť cookies' }).click();
        await page.getByRole('button', { name: 'Povoliť výber' }).click();
        await page.getByRole('link', { name: 'Nastaviť cookies' }).click();
        await page.getByLabel('Analytické').uncheck();
        await page.getByLabel('Marketingové').uncheck();
        await page.getByRole('button', { name: 'Odmietnuť' }).click();
    });

    test("Zobrazuje sa navigácia?", async ({ page }) => {
        let nav = page.locator("//div[@class='row bg-white pt-5 pb-5 w-100 position-fixed menu-hore ml-0']")
        await expect(nav).toBeVisible()
    })

    test("Zobrazuje sa logo v navigácií?", async({page})=> {
        let navLogo = page.locator("//img[@class='mainlogo']")
        await expect(navLogo).toBeVisible()
        await expect(navLogo).toHaveAttribute("src","https://bauska.sk/assets/img/logo.svg")
    })

    test("Funguje kliknutie na logo?", async({page})=>{
        let logoAnchor = page.locator("//a[@class='navbar-brand text-black bold-roboto']")
        await expect(logoAnchor).toBeVisible()
        await expect(logoAnchor).toHaveAttribute("href", "https://bauska.sk/index.php")

        await logoAnchor.click(console.log("clicknuté"))
    })
})

