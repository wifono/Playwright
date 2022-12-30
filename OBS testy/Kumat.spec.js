import { test, expect, request } from "@playwright/test";

test.describe("Kumat Test", () => {

  test.beforeEach(async ({ page }) => {
    test.setTimeout(10000)
    await page.goto("https://kumat.sk");
  })


  test("Správny title tag", async ({ page }) => {
    await expect(page).toHaveTitle("Kumat | Montáž a starostlivosť o technické zariadenia")
  })

  test("Máme Logo?", async ({ page }) => {
    const logo = page.locator("xpath=/html/body/header/nav[1]/a/img")
    await expect(logo).toBeVisible();
    await expect(logo).toHaveAttribute("src", "https://kumat.sk/assets/img/kumatlogo.png")
  })

  test("Máme horný navbar a odkazy v ňom??", async ({ page }) => {
    const navbar = page.locator('xpath=/html/body/header/nav[1]');
    await expect(navbar).toBeVisible();

    const list = page.locator('xpath=/html/body/header/nav[1]/div[1]/ul');
    let ul = page.locator('//html/body/header/nav[1]/div[1]/ul')
    await expect(list).toBeVisible();
    await expect(ul).toBeVisible();
  })

  test("Funguje horný navbar?", async ({ page }) => {

    const oFirme = page.locator('xpath=/html/body/header/nav[1]/div[1]/ul/li[2]/a')
    await expect(oFirme).toHaveAttribute("href", "#o-firme")
    await oFirme.click()

    const domov = page.locator('xpath=/html/body/header/nav[1]/div[1]/ul/li[1]/a')
    await expect(domov).toHaveAttribute("href", "#domov")
    await domov.click()

    const sluzby = page.locator('xpath=/html/body/header/nav[1]/div[1]/ul/li[3]/a')
    await expect(sluzby).toHaveAttribute("href", "#sluzby")
    await sluzby.click()

    const dodavka = page.locator('xpath=/html/body/header/nav[1]/div[1]/ul/li[4]/a')
    await expect(dodavka).toHaveAttribute("href", "#komplexne-sluzby")
    await dodavka.click()

    const realizacie = page.locator('xpath=/html/body/header/nav[1]/div[1]/ul/li[5]/a')
    await expect(realizacie).toHaveAttribute("href", "#realizacie")
    await realizacie.click()

    const referencie = page.locator('xpath=/html/body/header/nav[1]/div[1]/ul/li[6]/a')
    await expect(referencie).toHaveAttribute("href", "#referencie")
    await referencie.click()

    await page.pause()

    const kariera = page.locator('//a[@href="https://kumat.sk/kariera" and @class="nav-link navlik-static registerHover "]')
    await expect(kariera).toHaveAttribute("href", "https://kumat.sk/kariera")
    await kariera.click()

    const kontakt = page.locator("//a[@class='nav-link navlik-static registerHover scrolltokontakt' and @href='#kontakt']")
    await expect(kontakt).toHaveAttribute("href", "#kontakt")
    await kontakt.click()

    const en = page.locator('xpath=/html/body/header/nav[1]/div[1]/ul/li[11]/a')
    await expect(en).toHaveAttribute("href", "https://kumat.sk/en")
    await en.click()

    const sk = page.locator('xpath=/html/body/header/nav[1]/div[1]/ul/li[8]/a')
    await expect(sk).toHaveAttribute("href", "https://kumat.sk/")
    await sk.click()
  })

  test("Zobraziť projekty", async ({ page }) => {
    const button = page.locator("xpath=/html/body/div[2]/div[3]/section/div/div[2]/div/button");
    await button.highlight()
    await button.click()
  })

  test("Zistite viac", async ({ page }) => {
    const zistiteViac = page.locator("xpath=/html/body/div[2]/div[3]/section/div/div[4]/div")
    await zistiteViac.highlight()
    await zistiteViac.click()
  })

  test("Top Carousel", async ({ page }) => {
    test.slow()
    const left = page.locator("//img[@data-slide='prev']")
    const right = page.locator("//img[@data-slide='next']")

    await left.click({ clickCount: 8, delay: 550 })
    await right.click({ clickCount: 8, delay: 550 })
  })

  test("O firme", async ({ page }) => {
    let oFirme = page.locator("//*[@id='scroll-after-close']/div/div[1]/h2")

    await expect(oFirme).toBeVisible()
    await expect(oFirme).toHaveText("O FIRME")

    let bezpecnost = page.locator("//*[@id='scroll-after-close']/div/div[1]/p")

    await expect(bezpecnost).toBeVisible()
    await expect(bezpecnost).toHaveText("Bezpečnosť, kvalita a spokojnosť zákazníka")

    let text = page.locator("//*[@id='scroll-after-close']/div/div[2]/p")

    await expect(text).toBeVisible()
    await expect(text).toHaveText("Spoločnosť KUMAT je na trhu už od roku 1993 a v súčasnosti patrí medzi významných slovenských dodávateľov zabezpečovacej, telekomunikačnej a oznamovacej techniky v oblasti železničnej infraštruktúry.")

    let certificate1 = page.locator("//*[@id='o_firme_viac']/div[1]/div/div[1]/img")
    let certificate2 = page.locator("//*[@id='o_firme_viac']/div[1]/div/div[2]/img")
    let certificate3 = page.locator("//*[@id='o_firme_viac']/div[1]/div/div[3]/img")
    let certificate4 = page.locator("//*[@id='o_firme_viac']/div[1]/div/div[4]/img")

    await expect(certificate1).toBeVisible()
    await expect(certificate1).toHaveAttribute("src", "https://kumat.sk/assets/img/iso01.png?v=1.1")
    await expect(certificate2).toBeVisible()
    await expect(certificate2).toHaveAttribute("src", "https://kumat.sk/assets/img/iso02.png?v=1.1")
    await expect(certificate3).toBeVisible()
    await expect(certificate3).toHaveAttribute("src", "https://kumat.sk/assets/img/iso03.png?v=1.1")
    await expect(certificate4).toBeVisible()
    await expect(certificate4).toHaveAttribute("src", "https://kumat.sk/assets/img/iso04.png?v=1.1")

    let lastText = page.locator("//*[@id='o_firme_viac']/div[1]/p")
    await expect(lastText).toBeVisible()
    await expect(lastText).toHaveText("Spolupráca s poprednými európskymi výrobcami technológií a zariadení dáva garanciu vysokého štandardu poskytovaných služieb.")

    let leftBottomText = page.locator("//*[@id='o_firme_viac']/div[2]")
    await expect(leftBottomText).toBeVisible()
    let p = page.locator("//*[@id='o_firme_viac']/div[2]/p[1]")
    await expect(p).toHaveText("Spoločnosť komplexne zabezpečuje nasledovné služby:")

    let ul = page.locator("//*[@id='o_firme_viac']/div[2]/ul")
    await expect(ul).toBeVisible()

  })

  test("Naše služby", async ({ page }) => {
    test.slow()

    let projekciaImg = page.locator("//*[@id='sluzby']/div/div[2]/div[1]/div[1]/div[1]/img[1]")
    let montazImg = page.locator('//*[@id="sluzby"]/div/div[2]/div[2]/div[1]/div[1]/img[1]')
    let udrzbaImg = page.locator('//*[@id="sluzby"]/div/div[2]/div[1]/div[2]/div[1]/img[1]')
    let prehliadkyImg = page.locator('//*[@id="sluzby"]/div/div[2]/div[2]/div[2]/div[1]/img[1]')
    let vleckyImg = page.locator('//*[@id="sluzby"]/div/div[2]/div[1]/div[3]/div[1]/img[1]')

    await expect(projekciaImg).toBeVisible()
    await expect(projekciaImg).toHaveAttribute("src", "https://kumat.sk/assets/img/Artboard1.svg")

    await expect(montazImg).toBeVisible()
    await expect(montazImg).toHaveAttribute("src", "https://kumat.sk/assets/img/Artboard2.svg")

    await expect(udrzbaImg).toBeVisible()
    await expect(udrzbaImg).toHaveAttribute("src", "https://kumat.sk/assets/img/Artboard3.svg")

    await expect(prehliadkyImg).toBeVisible()
    await expect(prehliadkyImg).toHaveAttribute("src", "https://kumat.sk/assets/img/Artboard4.svg")

    await expect(vleckyImg).toBeVisible()
    await expect(vleckyImg).toHaveAttribute("src", "https://kumat.sk/assets/img/Artboard5.svg")

    //PROJEKCIA OZNAMOVACEJ A ZABEZPEČOVACEJ TECHNIKY
    let projekciaNadpis = page.locator('//*[@id="sluzby"]/div/div[2]/div[1]/div[1]/div[2]/p[1]')
    let projekciaPodpis = page.locator('//*[@id="sluzby"]/div/div[2]/div[1]/div[1]/div[2]/p[2]')
    await expect(projekciaNadpis).toBeVisible()
    await expect(projekciaNadpis).toHaveText("Projekcia oznamovacej a zabezpečovacej techniky")
    await expect(projekciaPodpis).toBeVisible()
    await expect(projekciaPodpis).toHaveText("Ponúkame projekčné služby, inžiniering a dozor projektu až do úspešnej realizácie stavby a odovzdania užívateľovi.")

    let projekciaOpen = page.locator("xpath=/html/body/div[2]/div[5]/div/div[2]/div[1]/div[1]/div[2]/button[1]")
    await projekciaOpen.click()

    let projekciaText = page.locator('//html/body/div[2]/div[5]/div/div[2]/div[1]/div[1]/div[2]/div/div')
    let projekciaDescImg = page.locator('//html/body/div[2]/div[5]/div/div[2]/div[1]/div[1]/div[2]/div/img')

    await expect(projekciaText).toBeVisible()
    await expect(projekciaText).toHaveText("Zabezpečujeme projektovanie stavieb určených technických zariadení elektrických v zmysle Vyhlášky 205 z roku 2010 Z.z. v znení neskorších predpisov v rozsahu: E1, E2, E3, E4a, E5, E6, E7, E9, E10, E11, E12. Okrem lanových dráh to predstavuje komplexné spektrum určených technických zariadení, čo v praxi znamená pokrytie stavby z hľadiska projekcie elektrického zariadenia v celom rozsahu. Projektanti disponujú platným osvedčením v zmysle Vyhlášky 205/2010 Z.z. §27. Projekty sú vykonávané vo všetkých stupňoch od projektu pre stavebné povolenie, cez projekt realizácie stavby až po projekt skutočného vyhotovenia stavby. Súčasťou projekcie je aj vykonávanie inžinierskej činnosti na projektovanej stavbe, v zmysle zabezpečenia stavebného povolenia.")
    await expect(projekciaDescImg).toBeVisible()
    await expect(projekciaDescImg).toHaveAttribute("src", "https://kumat.sk/assets/img/KUMAT-21.jpg")

    let projekciaClose = page.locator("xpath=/html/body/div[2]/div[5]/div/div[2]/div[1]/div[1]/div[2]/button[2]")
    await projekciaClose.click()

    //MONTÁŽ ZARIADENIA A UVEDENIE DO PREVÁDZKY
    let montazNadpis = page.locator('//*[@id="sluzby"]/div/div[2]/div[2]/div[1]/div[2]/p[1]')
    let montazPodpis = page.locator('//*[@id="sluzby"]/div/div[2]/div[2]/div[1]/div[2]/p[2]')

    await expect(montazNadpis).toBeVisible()
    await expect(montazPodpis).toBeVisible()
    await expect(montazNadpis).toHaveText("Montáž zariadenia a uvedenie do prevádzky")
    await expect(montazPodpis).toHaveText("Zabezpečujeme prípravné práce, realizáciu a profesionálny dozor stavby, funkčné skúšky a uvedenie zariadenia do prevádzky vrátane kolaudačného rozhodnutia.")

    let montazOpen = page.locator("//*[@id='sluzby']/div/div[2]/div[2]/div[1]/div[2]/button[1]")
    await montazOpen.click()

    let montazText = page.locator('//html/body/div[2]/div[5]/div/div[2]/div[2]/div[1]/div[2]/div/div')
    let montazDescImg = page.locator('//html/body/div[2]/div[5]/div/div[2]/div[2]/div[1]/div[2]/div/img')

    await expect(montazText).toBeVisible()
    await expect(montazDescImg).toBeVisible()
    await expect(montazDescImg).toHaveAttribute("src", "https://kumat.sk/assets/img/KUMAT-3.jpg")

    let udrzbaNadpis = page.locator('//*[@id="sluzby"]/div/div[2]/div[1]/div[2]/div[2]/p[1]')
    let udrzbaPodpis = page.locator('//*[@id="sluzby"]/div/div[2]/div[1]/div[2]/div[2]/p[2]')
    await expect(udrzbaNadpis).toBeVisible()
    await expect(udrzbaPodpis).toBeVisible()

    await expect(udrzbaNadpis).toHaveText("Údržba a servis zariadení")
    await expect(udrzbaPodpis).toHaveText("Poskytujeme pravidelnú údržbu, opravy vybraných dielov a zariadení, ako aj nepretržitý záručný a pozáručný servis s garanciou výjazdu a odstránenia poruchy v rozsahu 24 hodín.")

    let udrzbaOpen = page.locator("//*[@id='sluzby']/div/div[2]/div[1]/div[2]/div[2]/button[1]")
    await udrzbaOpen.click();

    let udrzbaText = page.locator('//html/body/div[2]/div[5]/div/div[2]/div[1]/div[2]/div[2]/p[3]/span')
    let udrzbaDescImg = page.locator('//html/body/div[2]/div[5]/div/div[2]/div[1]/div[2]/div[2]/p[3]/img')

    await expect(udrzbaText).toBeVisible()
    await expect(udrzbaDescImg).toBeVisible()
    await expect(udrzbaText).toHaveText("Spoločnosť zabezpečuje údržbu zariadení pracovníkmi s platným osvedčením a skúškami potrebnými pre výkon činnosti na Železniciach Slovenskej republiky. Údržba je vykonávaná na elektrických zariadeniach zabezpečovacej a oznamovacej techniky, elektroinštalácií budov, osvetlenia koľajiska a ďalších určených technických zariadeniach. Potrebné opravy na uvedených zariadeniach sú vykonávané tak, aby bola samotná doprava obmedzená čo najmenej. Spoločnosť KUMAT zabezpečuje jednotlivé náhradné diely špecifického zariadenia oznamovacej a zabezpečovacej techniky ako aj výmenné diely, ktoré podliehajú pravidelnej kontrole, zisteniu ich parametrov a nastaveniu vlastnými prostriedkami, prípadne dodávateľsky.")
    await expect(udrzbaDescImg).toHaveAttribute("src", "https://kumat.sk/assets/img/KUMAT-5.jpg")

    let prehliadkyNadpis = page.locator('//*[@id="sluzby"]/div/div[2]/div[2]/div[2]/div[2]/p[1]')
    let prehliadkyPodpis = page.locator('//*[@id="sluzby"]/div/div[2]/div[2]/div[2]/div[2]/p[2]')
    await expect(prehliadkyNadpis).toBeVisible()
    await expect(prehliadkyPodpis).toBeVisible()
    await expect(prehliadkyNadpis).toHaveText("Odborné prehliadky a pravidelné revízie")
    await expect(prehliadkyPodpis).toHaveText("Poskytujeme pravidelnú diagnostiku, kontrolné merania vrátane meracích protokolov a revízie vybraných technických zariadení nn a vn, ako aj elektroinštalácií priemyselných objektov a prevádzok.")

    let prehliadkyText = page.locator('//html/body/div[2]/div[5]/div/div[2]/div[2]/div[2]/div[2]/div/div')
    let prehliadkyDescImg = page.locator('//html/body/div[2]/div[5]/div/div[2]/div[2]/div[2]/div[2]/div/img')

    let prehliadkyOpen = page.locator("//*[@id='sluzby']/div/div[2]/div[2]/div[2]/div[2]/button[1]")

    await prehliadkyOpen.click()
    await expect(prehliadkyText).toBeVisible()
    await expect(prehliadkyDescImg).toBeVisible()
    await expect(prehliadkyText).toHaveText("Revíznu činnosť, odborné prehliadky a skúšky elektrických zariadení spoločnosť vykonáva na určených technických zariadení elektrických v zmysle Vyhlášky 205 z roku 2010 Z.z a zákona o dráhach 513/2009 Z.z. Taktiež vykonáva odborné prehliadky a skúšky vyhradených technických zariadení elektrických v zmysle Vyhlášky 508 z roku 2009 Z.z. Revízie sú vykonávané na určených technických zariadeniach v rozsahu: E1, E2, E3, E4a, E5, E6, E7, E9, E10, E11, E12.")
    await expect(prehliadkyDescImg).toHaveAttribute("src", "https://kumat.sk/assets/img/KUMAT-16.jpg")

    let vleckyNadpis = page.locator('//*[@id="sluzby"]/div/div[2]/div[1]/div[3]/div[2]/p[1]')
    let vleckyPodpis = page.locator('//*[@id="sluzby"]/div/div[2]/div[1]/div[3]/div[2]/p[2]')

    await expect(vleckyNadpis).toBeVisible()
    await expect(vleckyPodpis).toBeVisible()
    await expect(vleckyNadpis).toHaveText("Prevádzkovanie priemyselných vlečiek")
    await expect(vleckyPodpis).toHaveText("Ponúkame správu, obsluhu a zabezpečenie prevádzky vlečky v stave umožňujúcom bezpečnú a plynulú dopravu a organizovanie dopravy na vlečke v zmysle platnej legislatívy.")

  })

  test("Máme komplexné služby na desktope?", async ({ page }) => {
    test.slow()
    let komplexneSluzby = page.locator("xpath=/html/body/section[1]/div[2]")
    let komplexneNadpis = page.locator("//*[@id='komplexne-sluzby']/div[1]/p[1]")

    await expect(komplexneSluzby).toBeVisible()
    await expect(komplexneNadpis).toBeVisible()
    await expect(komplexneNadpis).toHaveText("KOMPLEXNÁ DODÁVKA OZNAMOVACÍCH A ZABEZPEČOVACÍCH ZARIADENÍ (ZabZar)")

    let tratoveZabZar = page.locator("//*[@id='komplexne-sluzby']/div[2]/div[1]/div[1]")
    await expect(tratoveZabZar).toBeVisible()
    let tratoveZabZarImg = page.locator('//*[@id="komplexne-sluzby"]/div[2]/div[1]/div[1]/img')
    await expect(tratoveZabZarImg).toBeVisible()
    await expect(tratoveZabZarImg).toHaveAttribute("src", "https://kumat.sk/assets/img/ksluzby/ksluzby1.png")
    let ZabZarNadpis = page.locator('//*[@id="komplexne-sluzby"]/div[2]/div[1]/div[1]/div/div[1]')
    await expect(ZabZarNadpis).toBeVisible()
    await expect(ZabZarNadpis).toHaveText("Traťové ZabZar")

    let ZabZarText = page.locator('//*[@id="komplexne-sluzby"]/div[2]/div[1]/div[1]/div/div[2]')
    await expect(ZabZarText).toBeVisible()
    await expect(ZabZarText).toHaveText("Následná jazda vlakov na trati, vylúčenie protismernej jazdy vlakov po jednej koľaji")

    let pokladka = page.locator('//*[@id="komplexne-sluzby"]/div[2]/div[1]/div[2]')
    await expect(pokladka).toBeVisible()

    let pokladkaImg = page.locator('//*[@id="komplexne-sluzby"]/div[2]/div[1]/div[2]/img')
    let pokladkaNadpis = page.locator('//*[@id="komplexne-sluzby"]/div[2]/div[1]/div[2]/div/div[1]')
    let pokladkaText = page.locator('//*[@id="komplexne-sluzby"]/div[2]/div[1]/div[2]/div/div[2]')

    await expect(pokladkaImg).toBeVisible()
    await expect(pokladkaNadpis).toBeVisible()
    await expect(pokladkaText).toBeVisible()

    await expect(pokladkaImg).toHaveAttribute("src", "https://kumat.sk/assets/img/ksluzby/ksluzby2.png")
    await expect(pokladkaNadpis).toHaveText('Pokládka vedení')
    await expect(pokladkaText).toHaveText('Metalické a optické vedenia pre bezpečný prenos informácii medzi prevádzkami vlakovej dopravy')

    let stanicne = page.locator('//*[@id="komplexne-sluzby"]/div[2]/div[2]/div')
    let stanicneImg = page.locator('//*[@id="komplexne-sluzby"]/div[2]/div[2]/div/img')
    let stanicneNadpis = page.locator('//*[@id="komplexne-sluzby"]/div[2]/div[2]/div/div/div[1]')
    let stanicneText = page.locator('//*[@id="komplexne-sluzby"]/div[2]/div[2]/div/div/div[2]')

    await expect(stanicne).toBeVisible()
    await expect(stanicneImg).toBeVisible()
    await expect(stanicneNadpis).toBeVisible()
    await expect(stanicneText).toBeVisible()

    await expect(stanicneImg).toHaveAttribute("src", "https://kumat.sk/assets/img/ksluzby/ksluzby3.png")
    await expect(stanicneNadpis).toHaveText('Staničné ZabZar')
    await expect(stanicneText).toHaveText('Stavanie výhybiek a výkoľajok, signalizácia priechodnosti, koľaji tak aby bol zaistený chod, prechod a posun vlakov v železničnej stanici')

    let priecestne = page.locator('//*[@id="komplexne-sluzby"]/div[2]/div[3]/div/div[1]')
    let priecestneImg = page.locator('//*[@id="komplexne-sluzby"]/div[2]/div[3]/div/div[1]/img')
    let priecestneNadpis = page.locator('//*[@id="komplexne-sluzby"]/div[2]/div[3]/div/div[1]/div/div[1]')
    let priecestneText = page.locator('//*[@id="komplexne-sluzby"]/div[2]/div[3]/div/div[1]/div/div[2]')

    await expect(priecestne).toBeVisible()
    await expect(priecestneImg).toBeVisible()
    await expect(priecestneNadpis).toBeVisible()
    await expect(priecestneText).toBeVisible()

    await expect(priecestneImg).toHaveAttribute("src", "https://kumat.sk/assets/img/ksluzby/ksluzby4.png")
    await expect(priecestneNadpis).toHaveText('Priecestné ZabZar')
    await expect(priecestneText).toHaveText('Bezpečnosť cestnej a železničnej prevádzky v mieste križovania železničnej trate s cestnou komunikáciou')

    let oznamovacie = page.locator('//*[@id="komplexne-sluzby"]/div[2]/div[3]/div/div[2]')
    let oznamovacieImg = page.locator('//*[@id="komplexne-sluzby"]/div[2]/div[3]/div/div[2]/img')
    let oznamovacieNadpis = page.locator('//*[@id="komplexne-sluzby"]/div[2]/div[3]/div/div[2]/div/div[1]')
    let oznamovacieText = page.locator('//*[@id="komplexne-sluzby"]/div[2]/div[3]/div/div[2]/div/div[2]')

    await expect(oznamovacie).toBeVisible()
    await expect(oznamovacieImg).toBeVisible()
    await expect(oznamovacieNadpis).toBeVisible()
    await expect(oznamovacieText).toBeVisible()

    await expect(oznamovacieImg).toHaveAttribute("src", "https://kumat.sk/assets/img/ksluzby/ksluzby5.png")
    await expect(oznamovacieNadpis).toHaveText('Oznamovacie zariadenia')
    await expect(oznamovacieText).toHaveText('Rýchle a spoľahlivé dorozumievanie medzi pracovníkmi vlakovej dopravy')

    let informacne = page.locator('//*[@id="komplexne-sluzby"]/div[2]/div[3]/div/div[3]')
    let informacneImg = page.locator('//*[@id="komplexne-sluzby"]/div[2]/div[3]/div/div[3]/img')
    let informacneNadpis = page.locator('//*[@id="komplexne-sluzby"]/div[2]/div[3]/div/div[3]/div/div[1]')
    let informacneText = page.locator('//*[@id="komplexne-sluzby"]/div[2]/div[3]/div/div[3]/div/div[2]')

    await expect(informacne).toBeVisible()
    await expect(informacneImg).toBeVisible()
    await expect(informacneNadpis).toBeVisible()
    await expect(informacneText).toBeVisible()

    await expect(informacneImg).toHaveAttribute("src", "https://kumat.sk/assets/img/ksluzby/ksluzby6.png")
    await expect(informacneNadpis).toHaveText('Informačné zariadenia')
    await expect(informacneText).toHaveText('Informovanie cestujúcej verejnosti o stave vlakovej dopravy')


  })

  test("Realizácie", async ({ page }) => {
    page.pause()
    const realizacieNav = page.locator('//html/body/header/nav[1]/div[1]/ul/li[5]/a')
    await realizacieNav.click()

    let realizacie = page.locator('//section[@id="realizacie"]')
    let realizacieNum = page.locator('//*[@id="realizacie"]/div[3]/div[1]')
    let realizacieNadpis = page.locator('//*[@id="realizacie"]/div[3]/div[2]/div/div/div[1]/div[1]/div[1]')
    let realizacieYear = page.locator('//*[@id="realizacie"]/div[3]/div[2]/div/div/div[1]/div[1]/div[2]')
    let realizacieDetail = page.locator('//*[@id="realizacie"]/div[3]/div[2]/div/div/div[1]/div[1]/div[3]')
    let realizacieButton = page.locator('//*[@id="realizacie"]/div[3]/div[2]/div/div/div[1]/div[1]/div[4]')
    let realizacieGallery = page.locator('//*[@id="realizacie"]/div[3]/div[2]/div/div/div[1]/div[2]')
    let realGallLeft = page.locator('//*[@id="realizacie"]/div[3]/div[2]/div/div/div[1]/div[3]/button[2]')
    let realGallRight = page.locator('//*[@id="realizacie"]/div[3]/div[2]/div/div/div[1]/div[3]/button[1]')

    await expect(realizacie).toBeVisible()
    await expect(realizacieNum).toBeVisible()
    await expect(realizacieNadpis).toBeVisible()
    await expect(realizacieYear).toBeVisible()
    await expect(realizacieDetail).toBeVisible()
    await expect(realizacieButton).toBeVisible()
    await expect(realizacieGallery).toBeVisible()
    await expect(realGallLeft).toBeVisible()
    await expect(realGallRight).toBeVisible()

    await expect(realizacieNum).toHaveText("1/7")
    await expect(realizacieNadpis).toHaveText("Priemyselný park Kežmarok")
    await expect(realizacieYear).toHaveText("2019")
    await expect(realizacieDetail).toHaveText("Vybudovanie priecestných zabezpečovacích zariadení v blízkosti priemyselného parku v Kežmarku")

    await realGallLeft.click({ clickCount: 3 })
    await realGallRight.click({ clickCount: 3 })

    let nextProject = page.locator('//*[@id="carouselNext"]')
    let prevProject = page.locator('//*[@id="carouselPrev"]')

    await nextProject.click({ clickCount: 3 })
    await prevProject.click({ clickCount: 3 })

    await realizacieButton.click()


  })

  test("Referencie", async ({ page }) => {
    test.slow()
    let refe = page.locator('//*[@id="referencie"]')
    await expect(refe).toBeVisible()

    let refeNadpis = page.locator('//*[@id="referencie"]/div[1]/p')
    await expect(refeNadpis).toBeVisible()
    await expect(refeNadpis).toHaveText("REFERENCIE")

    let vuje = page.locator('//*[@id="referencie"]/div[2]/div/div[1]')
    await expect(vuje).toBeVisible()

    let psa = page.locator('//*[@id="referencie"]/div[2]/div/div[2]')
    await expect(psa).toBeVisible()

    let danucem = page.locator('//*[@id="referencie"]/div[2]/div/div[3]')
    await expect(danucem).toBeVisible()

    let ferona = page.locator('//*[@id="referencie"]/div[2]/div/div[4]')
    await expect(ferona).toBeVisible()

    let logo5 = page.locator('//*[@id="referencie"]/div[2]/div/div[5]')
    await expect(logo5).toBeVisible()

    let logo6 = page.locator('//*[@id="referencie"]/div[2]/div/div[6]')
    await expect(logo6).toBeVisible()

    let logo7 = page.locator('//*[@id="referencie"]/div[2]/div/div[7]')
    await expect(logo7).toBeVisible()

    let logo8 = page.locator('//*[@id="referencie"]/div[2]/div/div[8]')
    await expect(logo8).toBeVisible()

    let logo9 = page.locator('//*[@id="referencie"]/div[2]/div/div[9]')
    await expect(logo9).toBeVisible()
  })

  test("Kontakt", async ({ page }) => {
    test.slow()
    let nadpis = page.locator('//*[@id="kontakt"]/div[1]/p')
    await expect(nadpis).toBeVisible()
    await expect(nadpis).toHaveText("KONTAKT")

    let domcek = page.locator('//*[@id="kontakt"]/div[2]/div/div[1]/div/div[1]/i')
    let garaz = page.locator('//*[@id="kontakt"]/div[2]/div/div[1]/div/div[4]/i')
    let telefon = page.locator('//*[@id="kontakt"]/div[2]/div/div[1]/div/div[7]/i[1]')
    let globe = page.locator('//*[@id="kontakt"]/div[2]/div/div[1]/div/div[7]/i[2]')

    await expect(domcek).toBeVisible()
    await expect(garaz).toBeVisible()
    await expect(telefon).toBeVisible()
    await expect(globe).toBeVisible()

    let sidlo = page.locator('//*[@id="kontakt"]/div[2]/div/div[1]/div/div[2]/b')
    let prevadzka = page.locator('//*[@id="kontakt"]/div[2]/div/div[1]/div/div[5]/b')
    let number = page.locator('//*[@id="kontakt"]/div[2]/div/div[1]/div/div[8]/a[1]')
    let mail = page.locator('//*[@id="kontakt"]/div[2]/div/div[1]/div/div[8]/a[2]')

    await expect(sidlo).toBeVisible()
    await expect(prevadzka).toBeVisible()
    await expect(number).toBeVisible()
    await expect(mail).toBeVisible()

    await expect(sidlo).toHaveText("Sídlo spoločnosti")
    await expect(prevadzka).toHaveText("Prevádzka / Poštový kontakt")
    await expect(number).toHaveText("+421 (0)2 2029 7818")
    await expect(mail).toHaveText("kumat@kumat.sk")

    await expect(number).toHaveAttribute("href", "tel:+421 (0)220 297 818")
    await expect(mail).toHaveAttribute("href", "mailto:kumat@kumat.sk")

    let a1 = page.locator('//*[@id="kontakt"]/div[2]/div/div[1]/div/div[2]/div')
    await expect(a1).toHaveText("KUMAT spol. s.r.o. Blagoevova 14 Bratislava 851 04")

    let a2 = page.locator('//*[@id="kontakt"]/div[2]/div/div[1]/div/div[5]/div')
    await expect(a2).toHaveText("KUMAT spol. s.r.o. Dopravná 53 Bratislava 831 06")

    let ico = page.locator('//*[@id="kontakt"]/div[2]/div/div[1]/div/div[8]')
    await expect(ico).toHaveText("+421 (0)2 2029 7818 kumat@kumat.sk IČO: 31334831 DIČ: 2020351278 IČ DPH: SK2020351278")

    let mapa = page.locator('//*[@id="contacts-map"]')
    await expect(mapa).toBeVisible()
  })

  test("Footer", async ({ page }) => {
    test.slow()
    let footer = page.locator("//html/body/footer")
    await expect(footer).toBeVisible()

    let footerImg = page.locator('//html/body/footer/img')
    let copyright = page.locator('//html/body/footer/p')

    await expect(footerImg).toBeVisible()
    await expect(footerImg).toHaveAttribute("src", "https://kumat.sk/assets/img/foot-logo.png")
    await expect(copyright).toBeVisible()
    await expect(copyright).toHaveText("KUMAT, spol. s.r.o.")
  })

  test("Detail Realizácie", async({page}) => {
    test.slow()
    let realizacia = page.locator('//a[@class="nav-link navlik-static registerHover " and @href="#realizacie"]')
    await realizacia.click()

    let detail = page.locator('//*[@id="realizacie"]/div[3]/div[2]/div/div/div[1]/div[1]/div[4]')
    await detail.click()

    let realSec = page.locator('//html/body/section[1]')
    await expect(realSec).toBeVisible()

    let realH = page.locator("//div[@class='realizaciaTopNadpis']")
    await expect(realH).toBeVisible()
    await expect(realH).toHaveText("Priemyselný park Kežmarok Priemyselný park Kežmarok")

    let realYear = page.locator('//html/body/section[1]/div/div[2]/div[1]/div[1]')
    await expect(realYear).toBeVisible()
    await expect(realYear).toHaveText("2019")

    let f = page.locator('//html/body/section[1]/div/div[2]/div[1]/div[2]/a[1]/i')
    let linkedIn = page.locator('//html/body/section[1]/div/div[2]/div[1]/div[2]/a[2]/i')
    let send = page.locator('//html/body/section[1]/div/div[2]/div[1]/div[2]/a[3]/i')

    await expect(f).toBeVisible()
    await expect(linkedIn).toBeVisible()
    await expect(send).toBeVisible()

    let prev = page.locator('//*[@id="carouselExampleControls"]/a[1]')
    let next = page.locator('//*[@id="carouselExampleControls"]/a[2]')

    await next.click({clickCount: 5})
    await prev.click({clickCount: 5})

    let realUpText = page.locator('//html/body/section[1]/div/div[2]/div[1]/div[4]')
    let realDownText = page.locator('//html/body/section[1]/div/div[2]/div[1]/div[5]/p')

    await expect(realDownText).toBeVisible()
    await expect(realUpText).toBeVisible()

    await expect(realUpText).toHaveText("Vybudovanie priecestných zabezpečovacích zariadení v blízkosti priemyselného parku v Kežmarku")
    await expect(realDownText).toHaveText("V rámci výstavby závodu MUBEA boli na dvoch existujúcich nezabezpečených priecestiach v km 16,715 a v km 17,287, na jednokoľajnej železničnej trati Poprad Tatry – Plaveč, vybudované priecestné zabezpečovacie zariadenia. V rámci stavby boli na predmetných priecestiach vybudované priecestné zabezpečovacie zariadenia 3. kategórie svetelné, s celými závorami a s aktívnou signalizáciou o stave priecestia. Ovládanie priecestných zariadení je riešené pomocou počítačov osí a informovanie rušňovodiča o stave priecestia je zabezpečené prostredníctvom priecestníkov. U výpravcu v ŽST Kežmarok bola doplnená nová kontrolná skrinka so zjednodušenými kontrolami stavu priecestného zabezpečovacieho zariadenia. Vybudovaním zabezpečovacieho zariadenia došlo k zrušeniu rýchlostného obmedzenia vlakovej dopravy k priecestiu od ŽST Kežmarok.")

    let otherProjects = page.locator('//html/body/section[1]/div/div[4]/div')
    await expect(otherProjects).toBeVisible()

    let otherProjectsText = page.locator('//html/body/section[1]/div/div[4]/div/div[1]')
    await expect(otherProjectsText).toBeVisible()
    await expect(otherProjects).toHaveText("ĎALŠIE PROJEKTY  Modernizácia ŽST Podbrezová 2019 Spádovisko v Čiernej nad Tisou 2018 ŽST Považská Bystrica 2017  Priecestné ZabZar Scheidt & Bachmann 2018")


  })

})

