import { test, expect } from "@playwright/test";

test.describe("Pestucci Frondend Test", () => {

    test.beforeEach(async ({page}) => {
        test.setTimeout(10000)
        page.goto("https://www.pestucci.sk")
    })

    test("Funguje správne header?", async({page}) => {
        //DEBUG MODE
        test.slow()
        await page.pause()
        //Skontroluje či je viditeľný, funkčný navbar a či obsahuje všetko čo má.
        let navbar = page.locator("//nav[@class='navbar navbar-default navbar-fixed-top']")
        await expect(navbar).toBeVisible();


        //Skontroluje či je viditeľné logo.
        let logo = page.locator("xpath=//img[@src='img/logo.jpg']")
            await expect(logo).toBeVisible()
            await expect(logo).toHaveAttribute("src","img/logo.jpg")

        //Skoltroluje, či sú viditeľné a funkčné linky v navigácií.
        let oNas = page.getByRole('link', { name: 'O NÁS' })
        let listok = page.getByRole('link', { name: 'JEDÁLNY LÍSTOK' })
        let galeria = page.getByRole('link', { name: 'GALÉRIA' })
        let kontakt =page.getByRole('link', { name: 'KONTAKT' })
        let domov = page.getByRole('link', { name: 'DOMOV' })
            
            await expect(page.locator("xpath=//*[@id='navbar']/ul/li[1]/a")).toHaveAttribute("href", "#home")
            await expect(page.locator("xpath=//*[@id='navbar']/ul/li[2]/a")).toHaveAttribute("href", "#onas")
            await expect(page.locator("xpath=//*[@id='jedallist_mobile3']")).toHaveAttribute("href", "#jedallist")
            await expect(page.locator("xpath=//*[@id='navbar']/ul/li[6]/a")).toHaveAttribute("href", "#galeria")
            await expect(page.locator("xpath=//*[@id='navbar']/ul/li[7]/a")).toHaveAttribute("href", "#kontakt_anchor")

            await expect(oNas).toBeVisible()
            await expect(listok).toBeVisible()
            await expect(galeria).toBeVisible()
            await expect(kontakt).toBeVisible()
            await expect(domov).toBeVisible()

            await oNas.click();
            await listok.click();
            await galeria.click();
            await kontakt.click();
            await domov.click();

        //Skontroluje, či je fotka v navigácií viditeľná.
        let face = page.locator('xpath=//img[@class="face2"]')
            await expect(face).toBeVisible()
            await expect(face).toHaveAttribute("src", "img/face1.jpg")

        //Skontroluje, či je viditeľný background image.
        let background = page.locator(".img")
            await expect(background).toBeVisible()
            await expect(background).toHaveAttribute("src", "img/bg_photo.jpg")
      });
      

      test("Zobrazujú sa správne texty na background image?", async({page}) => {
        await page.pause()
        let restaurantAndPub = page.locator("//p[contains(text(), 'Restaurant & Pub') and @class='one']");
        let Pestucci = page.locator("//p[contains(text(), 'Pestucci') and @class='two']")
        let number = page.locator("//a[contains(text(), '+421 918 817 967') and @href='tel:+421918817967']")
        let button = page.locator("//a[contains(text(), 'Pozrieť menu') and @href='#jedallist']")

        await expect(restaurantAndPub).toBeVisible()
        await expect(Pestucci).toBeVisible()
        await expect(number).toBeVisible()
        await expect(button).toBeVisible()

        await expect(restaurantAndPub).toHaveText("Restaurant & Pub")
        await expect(Pestucci).toHaveText("Pestucci")
        await expect(number).toHaveText("+421 918 817 967")
        await expect(button).toHaveText("Pozrieť menu")
        await expect(button).toHaveAttribute("href", "#jedallist")

        let button2 = page.locator("//a[contains(text(), 'Pozrieť menu') and @href='#jedallist']")
        await button2.click()
      });

    test("Funguje prvá sekcia? (Rodinná reštaurácia, Jedlo varené s láskou......", async ({page}) => {
       
        await page.pause()
        
            let section1 = page.locator("//html/body/xml/div/section[1]")
        await expect(section1).toBeVisible()

        //OBRÁZKY
        let img1 = page.locator("//img[@src='img/family.jpg']");
        let img2 = page.locator("//img[@src='img/chef.jpg']");
        let img3 = page.locator("//img[@src='img/cerstve.png']");

            await expect(img1).toBeVisible()
            await expect(img2).toBeVisible()
            await expect(img3).toBeVisible()

            await expect(img1).toHaveAttribute("src", "img/family.jpg")
            await expect(img2).toHaveAttribute("src", "img/chef.jpg")
            await expect(img3).toHaveAttribute("src", "img/cerstve.png")

        // NADPISY
        let rodRes = page.locator("//p[contains(text(), 'Rodinná reštaurácia')]")
        let jedlo = page.locator("//p[contains(text(), 'Jedlo varené s láskou')]")
        let cerstveSurviny = page.locator("//p[contains(text(), 'Jedlo z čerstvých surovín')]")

            await expect(rodRes).toBeVisible()
            await expect(jedlo).toBeVisible()
            await expect(cerstveSurviny).toBeVisible()

            await expect(rodRes).toContainText("Rodinná reštaurácia")
            await expect(jedlo).toContainText("Jedlo varené s láskou")
            await expect(cerstveSurviny).toContainText("Jedlo z čerstvých surovín")
        //TEXTY
        let popis1 = page.locator("//html/body/xml/div/section[1]/div[1]/div/div[1]/p[2]")
        let popis2 = page.locator("//html/body/xml/div/section[1]/div[1]/div/div[2]/p[2]")
        let popis3 = page.locator("//*[@id='onas']/p")
        let hr = page.locator("//html/body/xml/div/section[1]/hr")

            await expect(popis1).toBeVisible()
            await expect(popis2).toBeVisible()
            await expect(popis3).toBeVisible()
            await expect(hr).toBeVisible()
            
            await expect(popis1).toContainText("Doprajte si chutné jedlo v príjemnom a modernom prostredí, kde si na svoje príde celá vaša rodina. V našej stálej ponuke nájdete tradičné receptúry, ochotný personál a skvelú atmosféru.")
            await expect(popis2).toContainText("Najdôležitejšou ingredienciou každého jedla je láska a my ňou pri príprave pokrmov pre vás vôbec nešetríme.")
            await expect(popis3).toContainText("Kladieme dôraz na čerstvosť a kvalitu surovín. Všetky potraviny starostlivo vyberáme od lokálnych a slovenských dodávateľov, aby ste si jedlo mohli skutočne vychutnať.")
            await expect(hr).toHaveAttribute("class", "hr1")

        let oNas = page.locator("//html/body/xml/div/section[1]/div[2]/div/div[1]/h3")
        let textONas = page.locator("//html/body/xml/div/section[1]/div[2]/div/div[1]/p")
        let textONas2 = page.locator("//html/body/xml/div/section[1]/div[3]/div[1]/div[1]/p")

            // await page.evaluate(() => {
            //     window.scrollTo(0, 1000);
            // })

        await expect(oNas).toBeVisible()
        await expect(textONas).toBeVisible()
        await expect(textONas2).toBeVisible()

            await expect(oNas).toContainText("O Nás")
            await expect(textONas).toContainText("Firma Pestucci s.r.o. vznikla v roku 2016 a začala svoju cestu v tržnici Michalovciach otvorením prevádzky Pestucci Bistro, ktoré je stále úspešne otvorené. K jej založeniu nás priviedla vášeň k dobrému jedlu a láska k národnej kuchyni. Po určitom čase a veľkom náraste zákazníkov sme sa rozhodli že sa posunieme ďalej a otvoríme ďalšiu prevádzku, Pestucci - Restaurant & Pub. V nadčasových priestoroch našej reštaurácie si môžete s vašou rodinou či priateľmi vychutnať tradičnú slovenskú kuchyňu v modernom šate. Záleží nám na vašej spokojnosti, preto u nás nesmie chýbať príjemná obsluha a kvalitné pokrmy z čerstvých potravín.")
            await expect(textONas2).toContainText("Máte chuť na dobré jedlo, ale nemáte veľa času nazvyš? Alebo si radšej jedlo poriadne vychutnávate s priateľmi či rodinou pri dobrom pive? Reštaurácia & Pub Pestucci vám vyhovie v každom smere. Nájdete u nás kuchyňu s raňajkovým, obedovým ale aj večerným menu, kde sa o váš hlad rýchlo postaráme formou kantíny. No rovnako pre vás ponúkame i atraktívny priestor reštaurácie, kde si môžete posedieť pri kvalitnej Plzničke a vybrať si môžete zo širokej ponuky tradičných špecialít, ale aj z medzinárodnej kuchyne. Obslúži vás profesionálna neformálna obsluha.")


        let imgONas1 = page.locator("//img[@src='img/jed1.jpeg' and @class='obr10']")
        let imgONas2 = page.locator("//img[@src='img/jed2.jpeg' and @class='obr11']")
        let imgONas3 = page.locator("//img[@src='img/jed3.jpeg' and @class='obr12']")
            
           
            await expect(imgONas1).toBeVisible()
            await expect(imgONas2).toBeVisible()
            await expect(imgONas3).toBeVisible()

            await expect(imgONas1).toHaveAttribute("src", "img/jed1.jpeg")
            await expect(imgONas2).toHaveAttribute("src", "img/jed2.jpeg")
            await expect(imgONas3).toHaveAttribute("src", "img/jed3.jpeg")


        let imgMenu = page.locator("//img[@src='img/menu.jpg']")
            
            await expect(imgMenu).toBeVisible()
            await expect(imgMenu).toHaveAttribute("src", "img/menu.jpg")

        let anchor = page.locator("//a[@href='pestucci_menu.pdf?v=7.11.2022']")
            
            await expect(anchor).toHaveAttribute("href", "pestucci_menu.pdf?v=7.11.2022")

            if(anchor === anchor){
                await anchor.click()
                console.log("Button Stiahnuť menu funguje :)");
            }else {
                console.log("Button Stiahnuť menu nefunguje :(");
            }
       
        //Svadby box
        let svadbyBg = page.locator("//html/body/xml/div/section[1]/div[3]/div[1]/div[4]/div[1]/img[1]")
        let svadbyNadpis = page.locator("//html/body/xml/div/section[1]/div[3]/div[1]/div[4]/div[3]/p[1]")
        let svadbyText = page.locator("//html/body/xml/div/section[1]/div[3]/div[1]/div[4]/div[3]/p[2]")
        let objednat = page.locator("//html/body/xml/div/section[1]/div[3]/div[1]/div[4]/div[3]/p[3]")
        let cislo = page.locator("//html/body/xml/div/section[1]/div[3]/div[1]/div[4]/div[3]/p[3]/a")
        
            await expect(svadbyBg).toBeVisible() 
            await expect(svadbyNadpis).toBeVisible()
            await expect(svadbyText).toBeVisible()
            await expect(objednat).toBeVisible()
            await expect(cislo) .toBeVisible()

            await expect(svadbyBg).toHaveAttribute("src", "img/svadba.png")
            await expect(svadbyNadpis).toHaveText("Svadby")
            await expect(svadbyText).toHaveText("Ponúkame svadobné priestory.")
            await expect(cislo).toHaveText(" 0918 817 967")
    })

    test("Funguje druhá sekcia? (Menučka)", async ({page}) => {
        await page.pause()
        let denneMenu = page.locator("//a[@class='menu a aa aktive11']")

        let section2 = page.locator("//div[@class='container jooo']")
            denneMenu.scrollIntoViewIfNeeded()
            await expect(section2).toBeVisible();
        
        let hrasok = page.locator("//img[@class='hrach']")
            await expect(hrasok).toBeVisible({timeout: 10000})
            await expect(hrasok).toHaveAttribute("src", "img/hrasok.png")

            await expect(denneMenu).toBeVisible()
            await expect(denneMenu).toHaveText("Denné menu")
        
        let vyberListok = page.locator("//a[contains(text(), 'Výber z jedálného lístka')]")
            await expect(vyberListok).toBeVisible()
            await expect(vyberListok).toHaveText("Výber z jedálného lístka")
        
        let napojovyList = page.locator("//*[@id='aktive3']")
            await expect(napojovyList).toBeVisible()
            await expect(napojovyList).toHaveText("Nápojový lístok")

            vyberListok.click()
            await expect(page.locator("//div[@id='jedallistok']")).toBeVisible()
            await expect(page.locator("//strong[contains(text(), 'Predjedlá')]")).toBeVisible()
            await expect(page.locator("//strong[contains(text(), 'Polievky')]")).toBeVisible()
            await expect(page.locator("//strong[contains(text(), 'Hotové jedlá a tradičné jedlá')]")).toBeVisible()
            await expect(page.locator("//strong[contains(text(), 'Sezónna ponuka')]")).toBeVisible()
            await expect(page.locator("//strong[contains(text(), 'Domáce dezerty')]")).toBeVisible()
            await expect(page.locator("//strong[contains(text(), 'Šaláty')]")).toBeVisible()
            await expect(page.locator("//strong[contains(text(), 'Burgre')]")).toBeVisible()
            await expect(page.locator("//strong[contains(text(), 'Prílohy')]")).toBeVisible()

            napojovyList.click()
            await expect(page.locator("//div[@id='napojovylistok']")).toBeVisible()
            await expect(page.locator("//strong[contains(text(), 'Aperitív')]")).toBeVisible()
            await expect(page.locator("//strong[contains(text(), 'Pivo z výčapu')]")).toBeVisible()
            await expect(page.locator("//strong[contains(text(), 'Likéry')]")).toBeVisible()
            await expect(page.locator("//strong[contains(text(), 'Nealko fľašové')]")).toBeVisible()
            await expect(page.locator("//strong[contains(text(), 'Rum, Ron')]")).toBeVisible()
            await expect(page.locator("//strong[contains(text(), 'Rauch džúsy')]")).toBeVisible()
            await expect(page.locator("//strong[contains(text(), 'Destiláty R. Jelínek *1894*')]")).toBeVisible()
            await expect(page.locator("//strong[contains(text(), 'Teplé nápoje')]")).toBeVisible()
            await expect(page.locator("//strong[contains(text(), 'Čaj')]")).toBeVisible()
            await expect(page.locator("//strong[contains(text(), 'Káva')]")).toBeVisible()
            await expect(page.locator("//strong[contains(text(), 'Whisky')]")).toBeVisible()
            await expect(page.locator("//strong[contains(text(), 'Pochutiny')]")).toBeVisible()
            await expect(page.locator("//strong[contains(text(), 'Cognac & Brandy')]")).toBeVisible()
            await expect(page.locator("//strong[contains(text(), 'Nealko z výčapu')]")).toBeVisible()

            denneMenu.click()
            await expect(page.locator("//div[@id='dennemenu']")).toBeVisible()
            await expect(page.locator("//strong[contains(text(), 'Pondelok')]")).toBeVisible()
            await expect(page.locator("//strong[contains(text(), 'Utorok')]")).toBeVisible()
            await expect(page.locator("//strong[contains(text(), 'Streda')]")).toBeVisible()
            await expect(page.locator("//strong[contains(text(), 'Štvrtok')]")).toBeVisible()
            await expect(page.locator("//strong[contains(text(), 'Piatok')]")).toBeVisible()
            await expect(page.locator("//strong[contains(text(), 'Sobota')]")).toBeVisible()
            await expect(page.locator("//strong[contains(text(), 'Nedeľa')]")).toBeVisible()
            await expect(page.locator("//*[@id='dennemenu']/div/div/strong[8]")).toBeVisible()
            await expect(page.locator("//*[@id='dennemenu']/div/div/strong[8]")).toHaveText("Alergény")
    })

    test("Funguje galéria?", async({page}) => {
        
        let hr = page.locator("//html/body/xml/div/section[3]/hr")
            await expect(hr).toBeVisible()
        hr.scrollIntoViewIfNeeded()
        await page.pause()
            
        let galText = page.locator("//h3[@class='galtext']")
            await expect(galText).toBeVisible()
            await expect(galText).toHaveText("GALÉRIA")
         
        let btngal1 = page.locator("//*[@id='btngal1']")
            await expect(btngal1).toBeVisible()
            await expect(btngal1).toHaveText("Akcie")

        let btngal3 = page.locator("//a[@id='btngal3']")
            await expect(btngal3).toBeVisible()
            await expect(btngal3).toHaveText("Jedlá")

            await expect(page.locator("//*[@id='1']")).toBeVisible()
            test.slow()
            btngal3.click()
            await expect(page.locator("//*[@id='gallery']")).toBeVisible()
        })

    test("Sekcia Kontakt", async({page})=> {
        test.slow()
        let hr = page.locator("//html/body/xml/div/hr")
        
            await expect(hr).toBeVisible()
        
        let kontakty = page.locator("//*[@id='kontakt']")
            kontakty.scrollIntoViewIfNeeded()
            await expect(kontakty).toBeVisible()
            await expect(kontakty).toHaveText("KONTAKT")
        

        })

    test("Prehliadka", async({page})=> {
        test.slow()
        let prehliadka = page.locator("//iframe[@src='https://vrtslovakia.sk/Pestucci/?fbclid=IwAR37r0sdG3f_lBYCsHP3fRNzWrEReXPGTn6QOIV81QrSpq1ejUhTL1eg1FM']")
            await expect(prehliadka).toBeVisible()
    })

    test("Footer", async({page}) => {
        test.slow()
        let footer = page.locator("//html/body/xml/div/section[5]/div")
            await expect(footer).toBeVisible()
            
        let mapa = page.locator("//*[@id='gmap_canvas']")
            await expect(mapa).toBeVisible()
            await expect(mapa).toHaveAttribute("src", "https://maps.google.com/maps?q=J%C3%A1na%20Holl%C3%A9ho%2085%20Michalovce&t=&z=17&ie=UTF8&iwloc=&output=embed")
        
        let kontakt = page.locator("//html/body/xml/div/section[5]/div/div[2]/div[1]/div[1]")
            await expect(kontakt).toBeVisible()
        
        let hodiny = page.locator("//html/body/xml/div/section[5]/div/div[2]/div[1]/div[2]")
            await expect(hodiny).toBeVisible()
        
        let gdpr = page.locator("//html/body/xml/div/section[5]/div/div[2]/div[1]/div[3]")
            await expect(gdpr).toBeVisible()

        let emtea = page.locator("//*[@id='emtea']/img")
            await expect(emtea).toBeVisible()
        let emteaAnchor = page.locator("//a[@id='emtea']")
            await expect(emteaAnchor).toHaveAttribute("href", "http://www.emtea.sk/")
            await page.pause()

        let lastDiv = page.locator("//div[@class='asd']")
            await expect(lastDiv).toBeVisible()
            await expect(lastDiv).toHaveText("Pestucci 2022")
        })
    })



