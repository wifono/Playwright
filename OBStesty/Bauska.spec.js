import { test, expect } from "@playwright/test";

test.describe("Cookies lišta", () => {

    test.beforeEach(async ({ page }) => {
        test.setTimeout(60000)
        page.goto("https://bauska.sk/")
        page.waitForLoadState("domcontentloaded")
    })

    test("Zobrazuje sa cookies lišta pri návšteve stránky prvý krát?", async ({ page }) => {
        let cookiesDiv = page.locator("//div[@id='CybotCookiebotDialog']")
        await expect(cookiesDiv).toBeVisible()
    })

    test("Má cookies lišta potrebný obsah?", async ({ page }) => {
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
        let odmietnut = page.locator("//*[@id='CookieGuardAllowNone']")
        await expect(allow).toBeVisible()
        await expect(odmietnut).toBeVisible()

        await expect(allow).toHaveText("Povoliť všetko")
        await expect(odmietnut).toHaveText("Odmietnuť")
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
})

//-----------ZOBRAZOVANIE-------------------------
test.describe("Zobrazujú sa veci správne?", () => {
    test.use({
        storageState: "auth.json"
    })

    test.beforeEach(async ({ page }) => {
        page.goto("https://bauska.sk/")

    })

    test("Správny title tag", async ({ page }) => {
        test.slow()
        page.waitForTimeout(55555)
        await expect(page).toHaveTitle("Bauska. | Stavebná spoločnosť")
    })

    test("Zobrazuje sa stránka?", async ({ page }) => {
        test.slow()
        let fullPage = page.locator("//html/body")
        await expect(fullPage).toBeVisible()
    })

    test("Zobrazuje sa navigácia?", async ({ page }) => {
        test.slow()
        let nav = page.locator("//html/body/div[3]/div[1]/div[2]/div")
        await expect(nav).toBeVisible()
    })

    test("Zobrazuje sa logo v navigácií?", async ({ page }) => {
        test.slow()
        let navLogo = page.locator("//img[@class='mainlogo']")
        await expect(navLogo).toBeVisible()
        await expect(navLogo).toHaveAttribute("src", "https://bauska.sk/assets/img/logo.svg")
    })

    test("Sú linky v navigácií?", async ({ page }) => {
        page.pause()
        let nav = page.locator("//ul[@id='main-navbar']")
        await expect(nav).toBeVisible()

        let aktuality = page.locator('#main-navbar').getByRole('link', { name: 'aktuality.' });
        let onas = page.locator('#main-navbar').getByRole('link', { name: 'o nás.' });
        let certifikaty = page.locator('#main-navbar').getByRole('link', { name: 'certifikáty.' });
        let referencie = page.locator('#main-navbar').getByRole('link', { name: 'referencie.' });
        let vozovyPark = page.locator('#main-navbar').getByRole('link', { name: 'náš vozový park.' });
        let kariera = page.locator('#main-navbar').getByRole('link', { name: 'kariéra s bauskou.' });
        let partneri = page.locator('#main-navbar').getByRole('link', { name: 'hlavní partneri.' });
        let kontakty = page.locator('#main-navbar').getByRole('link', { name: 'kontakty.' });
        let domov = page.locator('#main-navbar').getByRole('link', { name: 'domov.' });

        await expect(aktuality).toBeVisible()
        await expect(onas).toBeVisible()
        await expect(certifikaty).toBeVisible()
        await expect(referencie).toBeVisible()
        await expect(vozovyPark).toBeVisible()
        await expect(kariera).toBeVisible()
        await expect(partneri).toBeVisible()
        await expect(kontakty).toBeVisible()
        await expect(domov).toBeVisible()

        await expect(aktuality).toHaveText("aktuality.")
        await expect(onas).toHaveText("o nás.")
        await expect(certifikaty).toHaveText("certifikáty.")
        await expect(referencie).toHaveText("referencie.")
        await expect(vozovyPark).toHaveText("náš vozový park.")
        await expect(kariera).toHaveText("kariéra s bauskou.")
        await expect(partneri).toHaveText("hlavní partneri.")
        await expect(kontakty).toHaveText("kontakty.")
        await expect(domov).toHaveText("domov.")
    })

    test("Zobrazuje sa carousell s fotkami a s logom bauska?", async ({ page }) => {
        page.pause()
        test.slow()
        let carousell = page.locator("//*[@id='domov']/div[4]/div/div[3]")
        await expect(carousell).toBeVisible()

        let logoBox = page.locator("//*[@id='domov']/div[4]/div/div[1]/div/div[1]/div")
        await expect(logoBox).toBeVisible()

        let logo = page.locator('//*[@id="domov"]/div[4]/div/div[1]/div/div[1]/div/div/div[2]/h1/span')
        let podnadpis = page.locator('//*[@id="domov"]/div[4]/div/div[1]/div/div[1]/div/div/div[2]/h1/a')
        let prezentacia = page.locator('//*[@id="domov"]/div[4]/div/div[1]/div/div[1]/div/div/div[8]/a')
        let viac = page.locator('//*[@id="domov"]/div[4]/div/div[1]/div/div[1]/div/div/div[9]/a')

        await expect(logo).toBeVisible()
        await expect(podnadpis).toBeVisible()
        await expect(prezentacia).toBeVisible()
        await expect(viac).toBeVisible()

        await expect(logo).toHaveText("bauska.")
        await expect(podnadpis).toHaveText("stavebná spoločnosť.")
        await expect(prezentacia).toHaveText("FIREMNÁ PREZENTÁCIA")
        await expect(viac).toHaveText("ZISTIŤ VIAC")

        await expect(prezentacia).toHaveAttribute("href", "https://bauska.sk/bauska-letak-online.pdf")
        await expect(viac).toHaveAttribute("href", "#o-nas")
    })

    test("Zobrazujú sa aktuality a všetko v nich? - sú cez cyklus, testuje sa len jedna", async({page}) => {
        let aktuality = page.locator('//html/body/div[3]/div[2]/div[2]/div[1]/div/div[2]/span')
        await expect(aktuality).toBeVisible()
        await expect(aktuality).toHaveText("aktuality.")

        let karticka = page.locator('//*[@id="list-container"]/div/div[1]')
        await expect(karticka).toBeVisible()

        let img = page.locator('//*[@id="list-container"]/div/div[1]/div/a/div/img')
        let anchor = page.locator('//*[@id="list-container"]/div/div[1]/div/a')

        let title = page.locator('//*[@id="list-container"]/div/div[1]/div/div/div[1]')

        let novo = page.locator('//*[@id="list-container"]/div/div[1]/div/div/div[2]/div/div[1]/a')

        let datum = page.locator('//*[@id="list-container"]/div/div[1]/div/div/div[2]/div/div[2]')

        let popis = page.locator('//*[@id="list-container"]/div/div[1]/div/div/a/div/span')

        let popisAnchor = page.locator('//*[@id="list-container"]/div/div[1]/div/div/a')

        await expect(img).toBeVisible()
        await expect(anchor).toBeVisible()
        await expect(title).toBeVisible()
        await expect(novo).toBeVisible()
        await expect(datum).toBeVisible()
        await expect(popis).toBeVisible()
        await expect(popisAnchor).toBeVisible()

        await expect(img).toHaveAttribute("src", "https://bauska.sk/admin/upload/blog_img/opti/11115615svet_podlah_09032021_resized.jpg")
        await expect(anchor).toHaveAttribute("href", "https://bauska.sk/blog/priebeh-vystavby-svet-podlah-presov")
        await expect(popisAnchor).toHaveAttribute("href", "https://bauska.sk/blog/priebeh-vystavby-svet-podlah-presov")

        await expect(title).toHaveText("Priebeh výstavby - Svet podláh, Prešov")
        await expect(novo).toHaveText("Novostavby")
        await expect(datum).toHaveText( "11.03. 2021")
        await expect(popis).toHaveText("Prinášame Vám aktuálny stav z výstavby novej predajne Svet podláh v Prešove. Za krátky čas bude výstavba predajne ukončená a odovzdaná investorovi....")
    })

    test("Zobrazuje sa sekcia O nás?", async({page})=> {
        let heading = page.locator("//html/body/div[3]/div[3]/div[2]/div/div[1]/div[2]/span")
        let span1 = page.locator("//html/body/div[3]/div[3]/div[2]/div/div[2]/div[2]/div/div/span[1]")
        let span2 = page.locator("//html/body/div[3]/div[3]/div[2]/div/div[2]/div[2]/div/div/span[2]")
        let span3 = page.locator("//html/body/div[3]/div[3]/div[2]/div/div[2]/div[2]/div/div/span[3]")
        let firemnaPrezentacia = page.locator("//html/body/div[3]/div[3]/div[2]/div/div[2]/div[2]/div/div/div/a/u")
        let zobrazPrez = page.locator("//html/body/div[3]/div[3]/div[2]/div/div[2]/div[2]/div/div/div/a")

        await expect(heading).toBeVisible()
        await expect(span1).toBeVisible()
        await expect(span2).toBeVisible()
        await expect(span3).toBeVisible()
        await expect(firemnaPrezentacia).toBeVisible()
        await expect(zobrazPrez).toBeVisible()

        await expect(heading).toHaveText("spoločnosť bauska.")
        await expect(span1).toHaveText("Myšlienka vlastného podnikania sa začala v útlom veku. Ako malé deti sme väčšinu svojho času niečo tvorili, plánovali a organizovali. Čerpali sme z rád a životných skúseností, riešenia krízových situácii a úspechov našich rodičov. Učili a viedli nás k vytrvalosti, slušnosti, čestnosti, empatii, úcte, vďačnosti a v neposlednom rade k pokore a triezvemu zmýšľaniu.")
        await expect(span2).toHaveText("Vďaka cenným radám sa nám z myšlienky podarilo založiť vlastnú stavebnú firmu. Podstatnú časť stavebných prác realizujeme vo vlastnej réžii. S úmyslom skvalitnenia, napredovania a efektivity práce využívame moderné technické prvky na stavbách po celom území Slovenskej republiky.")
        await expect(span3).toHaveText("Náš tím tvorí skúsený kolektív dynamických a flexibilných ľudí s prioritou odvádzať poctivú prácu s proaktívnym prístupom k zákazníkom. Čerpáme z praktických a teoretických skúseností našich pracovníkov počnúc malými stavbami až po novostavby obchodných reťazcov. Za každú novú zákazku sme vďační, je pre nás výzvou a príležitosťou pre zlepšenie.")
        await expect(firemnaPrezentacia).toHaveText("Zobraziť firemnú prezentáciu")
        await expect(zobrazPrez).toHaveAttribute("href", "https://bauska.sk/bauska-letak-online.pdf")
    })

    test("Zobrazujú sa obrázky v sekcii O nás?", async({page}) => {
        let img1 = page.locator("//html/body/div[3]/div[3]/div[2]/div/div[2]/div[3]/div/div[1]/img")
        let img2 = page.locator("//html/body/div[3]/div[3]/div[2]/div/div[2]/div[3]/div/div[2]/img")
        let img3 = page.locator("//html/body/div[3]/div[3]/div[2]/div/div[2]/div[3]/div/div[3]/img")

        await expect(img1).toBeVisible()
        await expect(img2).toBeVisible()
        await expect(img3).toBeVisible()

        await expect(img1).toHaveAttribute("src", "https://bauska.sk/assets/img/Onas1.jpg")
        await expect(img2).toHaveAttribute("src", "https://bauska.sk/assets/img/Onas2.jpg")
        await expect(img3).toHaveAttribute("src", "https://bauska.sk/assets/img/Onas3.jpg")
    })
    
    test("Zobrazuje sa sekcia certifikáty a všetko v nej správne?", async({page}) => {
        let h = page.locator("//html/body/div[3]/div[4]/div[2]/div/div/div[2]/span")
        let miniC = page.locator("//html/body/div[3]/div[4]/div[2]/div/div/div[7]/img")
        let c1 = page.locator("//html/body/div[3]/div[4]/div[2]/div/div/div[9]/a/img")
        let c2 = page.locator("//html/body/div[3]/div[4]/div[2]/div/div/div[10]/a/img")

        await expect(h).toBeVisible()
        await expect(h).toHaveText("certifikáty.")

        await expect(miniC).toBeVisible()
        await expect(miniC).toHaveAttribute("src", "https://bauska.sk/assets/img/certi.png")

        await expect(c1).toBeVisible()
        await expect(c1).toHaveAttribute("src", "https://bauska.sk/admin/upload/certifikaty_img/cert1.jpg")

        await expect(c2).toHaveAttribute("src", "https://bauska.sk/admin/upload/certifikaty_img/STNISO45001_2019_860x1320_.jpg")
    })

})

//-------------FUNKČNOSŤ--------------------------
test.describe("Fungujú veci správne?", () => {
    test.beforeEach(async({page}) => {
        page.goto("https://bauska.sk/")
        await page.waitForSelector("body")
    })
    test.use({
        storageState: "auth.json"
    })

    test("Funguje kliknutie na logo?", async({page})=>{
        let logoAnchor = page.locator("//a[@class='navbar-brand text-black bold-roboto']")
        await expect(logoAnchor).toBeVisible()
        await expect(logoAnchor).toHaveAttribute("href", "https://bauska.sk/index.php")

        await logoAnchor.click()
    })

    test("Funguje odkaz na prezentáciu?", async({page}) => {
        let prezentacia = page.locator('//*[@id="domov"]/div[4]/div/div[1]/div/div[1]/div/div/div[8]/a')
        await prezentacia.click()
    })

    test("Funguje zistiť viac?", async({page})=>{
        let viac = page.locator('//*[@id="domov"]/div[4]/div/div[1]/div/div[1]/div/div/div[9]/a')
        await viac.click()
    })

    test("Funguje horný carousell?", async ({ page }) => {
         test.slow()
         let next = page.locator('//*[@id="arrowR-home"]')
         let prev = page.locator('//*[@id="arrowL-home"]')
 
         await expect(next).toBeVisible()
         await expect(prev).toBeVisible()
         
         let img1 = page.locator('//*[@id="box1"]')
         let img2 = page.locator('//*[@id="box2"]')
         let img3 = page.locator('//*[@id="box3"]')
 
         await expect(img1).toHaveCSS("background-image", "url(\"https://bauska.sk/admin/upload/domov_img/opti/1803520814064448040346261707525731031233120931471_Accordeon_SLSP.jpg\")")
         await expect(img2).toHaveCSS("background-image", "url(\"https://bauska.sk/admin/upload/domov_img/opti/18035231140645190403481503104813hagard_po_opening_1920.jpg\")")
         await expect(img3).toHaveCSS("background-image", "url(\"https://bauska.sk/admin/upload/domov_img/opti/160657483.jpg\")")
     })

     test("Funguje kliknutie na obrázok v aktualitách s presmerovaním na článok?", async({page}) =>{
        test.slow()
        let anchor = page.locator('//*[@id="list-container"]/div/div[1]/div/a')
        await anchor.click()
     })

     test("Funguje kliknutie na popis a presmerovanie na konkrétny článok?", async({page}) => {
        test.slow()
        let popisAnchor = page.locator('//*[@id="list-container"]/div/div[1]/div/div/a')
        await popisAnchor.click()
     })

     test("Funguje kliknutie na zobrazenie firemnej prezentácie v sekcií O nás?", async({page}) => {
        let zobrazPrez = page.locator("//html/body/div[3]/div[3]/div[2]/div/div[2]/div[2]/div/div/div/a")
        await zobrazPrez.click()
     })

     test("Funguje preklikávanie certifikátov?", async({page}) => {
        page.pause()
        let p = page.locator("//html/body/div[3]/div[4]/div[2]/div/div/div[10]/div[1]/div/div[2]/img[1]")
        await p.click()

        let l = page.locator("//html/body/div[3]/div[4]/div[2]/div/div/div[10]/div[1]/div/div[1]/img[1]")
        await l.click()
     })
})

