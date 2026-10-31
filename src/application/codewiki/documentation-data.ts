import type { CodeWikiDocument } from './documentation-types.ts'

export const codeWikiDocument: CodeWikiDocument = {
  "files": [
    {
      "path": "src/main/application-state.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🧠 1\\. ApplicationState — Applikationens gemensamma minne**\n\n\nKlassen `ApplicationState` samlar information som flera delar av applikationen behöver dela.\n\nDen håller reda på vilken värld som är vald, vilka världar som finns, användarens identitet och statusen för redigeringssessioner.\n\nKlassen använder privata fält för att skydda informationen och erbjuder särskilda metoder för att läsa och ändra den.\n\n### **🌍 1.1 Vald värld**"
        },
        {
          "kind": "function",
          "name": "ApplicationState.getSelectedWorldId()",
          "identifier": "ApplicationState.getSelectedWorldId()",
          "anchor": "ApplicationState-getSelectedWorldId",
          "line": 33,
          "text": "Returnerar ID för den värld som användaren för närvarande har valt.\n\nOm ingen värld är vald returneras `null`.\n\n🔗 **Viktiga anropare:** `Navigation.showView()`, `WorldSelection.selectWorld()`, redigeringskontrollerna och hexklickhanteringen.\n\n⚙️ **Effekt:** Läser tillståndet utan att ändra det."
        },
        {
          "kind": "function",
          "name": "ApplicationState.selectWorld()",
          "identifier": "ApplicationState.selectWorld()",
          "anchor": "ApplicationState-selectWorld",
          "line": 37,
          "text": "Sparar ID för den valda världen i applikationens gemensamma tillstånd.\n\n🔗 **Anropas av:** `WorldSelection.selectWorld()`.\n\n⚙️ **Effekt:** Uppdaterar det valda världs-ID i minnet. Metoden ändrar inte gränssnittet direkt.\n\n💡 **Viktig skillnad:** `ApplicationState.selectWorld()` lagrar information, medan `WorldSelection.selectWorld()` samordnar hela processen när användaren väljer en värld."
        },
        {
          "kind": "prose",
          "text": "### **🗂️ 1.2 Listan över världar**"
        },
        {
          "kind": "function",
          "name": "ApplicationState.getWorlds()",
          "identifier": "ApplicationState.getWorlds()",
          "anchor": "ApplicationState-getWorlds",
          "line": 41,
          "text": "Returnerar den senast lagrade listan över världar som kan visas i galleriet.\n\n🔗 **Anropas av:** `WorldSelection.initializeGallery()` och `WorldSelection.selectWorld()`.\n\n⚙️ **Effekt:** Endast läsning.\n\n⚠️ **Teknisk detalj:** Metoden returnerar samma arrayreferens som lagras internt, inte en kopia."
        },
        {
          "kind": "function",
          "name": "ApplicationState.setWorlds()",
          "identifier": "ApplicationState.setWorlds()",
          "anchor": "ApplicationState-setWorlds",
          "line": 45,
          "text": "Ersätter den lagrade världslistan med nya data.\n\n🔗 **Anropas av:** `WorldSelection.initializeGallery()` efter att information hämtats från Convex.\n\n⚙️ **Effekt:** Uppdaterar världslistan i minnet."
        },
        {
          "kind": "prose",
          "text": "### **⏳ 1.3 Asynkron identitetshämtning**"
        },
        {
          "kind": "function",
          "name": "ApplicationState.getAuthenticationRequest()",
          "identifier": "ApplicationState.getAuthenticationRequest()",
          "anchor": "ApplicationState-getAuthenticationRequest",
          "line": 49,
          "text": "Returnerar generationsnumret för den aktuella identitetsförfrågningen.\n\n🔗 **Anropas av:** `Authentication.refreshFantasyIdentity()`.\n\n⚙️ **Effekt:** Endast läsning."
        },
        {
          "kind": "function",
          "name": "ApplicationState.nextAuthenticationRequest()",
          "identifier": "ApplicationState.nextAuthenticationRequest()",
          "anchor": "ApplicationState-nextAuthenticationRequest",
          "line": 53,
          "text": "Ökar generationsnumret med ett och returnerar det nya värdet.\n\n🔗 **Anropas av:** `Authentication.refreshFantasyIdentity()`.\n\n⚙️ **Effekt:** Gör äldre identitetsförfrågningar inaktuella.\n\n💡 **Varför behövs detta?** Om flera förfrågningar skickas i snabb följd kan ett äldre svar komma tillbaka sist. Generationsnumret hjälper programmet att ignorera sådana föråldrade svar."
        },
        {
          "kind": "prose",
          "text": "### **👤 1.4 Asynkron hämtning av tilldelad redigerare**"
        },
        {
          "kind": "function",
          "name": "ApplicationState.getAssignedEditorRequest()",
          "identifier": "ApplicationState.getAssignedEditorRequest()",
          "anchor": "ApplicationState-getAssignedEditorRequest",
          "line": 57,
          "text": "Returnerar generationsnumret för den senaste förfrågningen om en världs tilldelade redigerare.\n\n🔗 **Anropas av:** `AssignedEditor.refresh()`.\n\n⚙️ **Effekt:** Endast läsning."
        },
        {
          "kind": "function",
          "name": "ApplicationState.nextAssignedEditorRequest()",
          "identifier": "ApplicationState.nextAssignedEditorRequest()",
          "anchor": "ApplicationState-nextAssignedEditorRequest",
          "line": 61,
          "text": "Ökar generationsnumret och returnerar det nya värdet.\n\n🔗 **Anropas av:** `AssignedEditor.refresh()`.\n\n⚙️ **Effekt:** Gör tidigare förfrågningar om tilldelad redigerare inaktuella.\n\n💡 **Arkitekturprincip:** Båda dessa metoder hjälper till att förebygga race conditions vid asynkrona operationer."
        },
        {
          "kind": "prose",
          "text": "### **🪪 1.5 Användarens fantasy-identitet**"
        },
        {
          "kind": "function",
          "name": "ApplicationState.getCurrentIdentity()",
          "identifier": "ApplicationState.getCurrentIdentity()",
          "anchor": "ApplicationState-getCurrentIdentity",
          "line": 65,
          "text": "Returnerar den lagrade fantasy-identiteten för den aktuella användaren, eller `null`.\n\n🔗 **Anropas av:** `EditingControls` och `EditingSessionController.handleTakeoverAction()`.\n\n⚙️ **Effekt:** Endast läsning."
        },
        {
          "kind": "function",
          "name": "ApplicationState.setCurrentIdentity()",
          "identifier": "ApplicationState.setCurrentIdentity()",
          "anchor": "ApplicationState-setCurrentIdentity",
          "line": 69,
          "text": "Sparar eller rensar användarens fantasy-identitet.\n\n🔗 **Anropas av:** `Authentication` i `src/main/authentication.ts`.\n\n⚙️ **Effekt:** Ändrar identiteten i applikationens minne."
        },
        {
          "kind": "prose",
          "text": "### **✏️ 1.6 Aktiv redigeringssession**"
        },
        {
          "kind": "function",
          "name": "ApplicationState.getActiveSession()",
          "identifier": "ApplicationState.getActiveSession()",
          "anchor": "ApplicationState-getActiveSession",
          "line": 73,
          "text": "Returnerar information om den aktiva redigeringssessionen för den valda världen.\n\nOm ingen aktiv session finns returneras `null`.\n\n🔗 **Anropas av:** `EditingControls` och `EditingSessionController`.\n\n⚙️ **Effekt:** Endast läsning."
        },
        {
          "kind": "function",
          "name": "ApplicationState.setActiveSession()",
          "identifier": "ApplicationState.setActiveSession()",
          "anchor": "ApplicationState-setActiveSession",
          "line": 77,
          "text": "Sparar eller rensar den aktiva redigeringssessionen.\n\n🔗 **Anropas av:** `EditingSessionController.subscribe()` när en prenumeration startas eller levererar resultat.\n\n⚙️ **Effekt:** Uppdaterar sessionstillståndet i minnet."
        },
        {
          "kind": "prose",
          "text": "### **📡 1.7 Har sessionen laddats?**"
        },
        {
          "kind": "function",
          "name": "ApplicationState.isSessionLoaded()",
          "identifier": "ApplicationState.isSessionLoaded()",
          "anchor": "ApplicationState-isSessionLoaded",
          "line": 81,
          "text": "Kontrollerar om prenumerationen på redigeringssessionen har levererat ett första resultat eller ett fel.\n\n🔗 **Anropas av:** `EditingControls.update()`, `handleEditAction()` och `handleTakeoverAction()`.\n\n⚙️ **Effekt:** Endast läsning."
        },
        {
          "kind": "function",
          "name": "ApplicationState.setSessionLoaded()",
          "identifier": "ApplicationState.setSessionLoaded()",
          "anchor": "ApplicationState-setSessionLoaded",
          "line": 85,
          "text": "Ändrar flaggan som anger om sessionens första svar har kommit.\n\n🔗 **Anropas av:** `EditingSessionController.subscribe()`.\n\n⚙️ **Effekt:** Påverkar när redigeringskontrollerna kan tillåta åtgärder.\n\n💡 **Varför är detta viktigt?** Programmet måste kunna skilja mellan att ingen redigeringssession finns och att informationen om sessionen ännu inte har laddats."
        },
        {
          "kind": "prose",
          "text": "### **🔒 1.8 Pågående redigeringsåtgärd**"
        },
        {
          "kind": "function",
          "name": "ApplicationState.isEditingActionPending()",
          "identifier": "ApplicationState.isEditingActionPending()",
          "anchor": "ApplicationState-isEditingActionPending",
          "line": 89,
          "text": "Kontrollerar om en redigerings- eller övertagandeåtgärd redan väntar på svar från Convex.\n\n🔗 **Anropas av:** `EditingControls.update()`, `handleEditAction()` och `handleTakeoverAction()`.\n\n⚙️ **Effekt:** Endast läsning."
        },
        {
          "kind": "function",
          "name": "ApplicationState.setEditingActionPending()",
          "identifier": "ApplicationState.setEditingActionPending()",
          "anchor": "ApplicationState-setEditingActionPending",
          "line": 93,
          "text": "Aktiverar eller avaktiverar spärren för en pågående redigeringsåtgärd.\n\n🔗 **Anropas av:** `EditingSessionController`.\n\n⚙️ **Effekt:** Hjälper anroparna att förhindra att flera redigeringsmutationer startas samtidigt.\n\n💡 **Viktig detalj:** Kontrollern sätter flaggan till `true` före mutationen och återställer den till `false` i ett `finally`\\-block."
        },
        {
          "kind": "prose",
          "text": "### **🔌 1.9 Hantering av prenumerationer**"
        },
        {
          "kind": "function",
          "name": "ApplicationState.getEditingSessionUnsubscribe()",
          "identifier": "ApplicationState.getEditingSessionUnsubscribe()",
          "anchor": "ApplicationState-getEditingSessionUnsubscribe",
          "line": 97,
          "text": "Returnerar funktionen som kan avsluta den aktuella prenumerationen på redigeringssessionen.\n\nOm ingen sådan funktion finns returneras `null`.\n\n🔗 **Anropas av:** `EditingSessionController.subscribe()`.\n\n⚙️ **Effekt:** Endast läsning. Metoden avslutar inte prenumerationen själv."
        },
        {
          "kind": "function",
          "name": "ApplicationState.setEditingSessionUnsubscribe()",
          "identifier": "ApplicationState.setEditingSessionUnsubscribe()",
          "anchor": "ApplicationState-setEditingSessionUnsubscribe",
          "line": 101,
          "text": "Sparar eller rensar funktionen som används för att avsluta en prenumeration.\n\n🔗 **Anropas av:** `EditingSessionController.subscribe()`.\n\n⚙️ **Effekt:** Ändrar vilken avregistreringsfunktion som finns lagrad.\n\n💡 **Arkitekturprincip:** Att spara en funktion som ett värde gör det möjligt att senare anropa den och frigöra en resurs, exempelvis när användaren byter värld.\n\n---"
        }
      ],
      "notes": [
        "**🌍 När användaren väljer en värld**\n\n`WorldSelection.selectWorld()` → `ApplicationState.selectWorld()` → valt världs-ID sparas.\n\n**🧭 När användaren byter vy**\n\n`Navigation.showView()` → kontrollerar `ApplicationState.getSelectedWorldId()` → ändrar CSS-klassen `is-active` → `Header.setView()`.\n\n**🔐 När en identitet hämtas**\n\n`Authentication.refreshFantasyIdentity()` → `nextAuthenticationRequest()` → asynkron hämtning → kontroll med `getAuthenticationRequest()` → inaktuella svar ignoreras.\n\n**✏️ När en redigeringssession uppdateras**\n\n`EditingSessionController.subscribe()` → uppdaterar `ApplicationState` → redigeringskontrollerna läser sessionens status.\n\n---"
      ]
    },
    {
      "path": "src/main/navigation.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🧭 2\\. Navigation — Styr vilken vy som visas**\n\n\nKlassen `Navigation` ansvarar för att välja vilken av applikationens huvudvyer som ska vara synlig.\n\nDen samarbetar med `ApplicationState`, `Header` och flera redan skapade vyer.\n\n### **🏗️ 2.1 Konstruktion av Navigation**"
        },
        {
          "kind": "function",
          "name": "Navigation.constructor()",
          "identifier": "Navigation.constructor()",
          "anchor": "Navigation-constructor",
          "line": 16,
          "text": "Tar emot sex beroenden genom konstruktorn:\n\n* Sidhuvudet (`Header`)  \n* Världsgalleriet  \n* Världsbyggarens rotelement  \n* Besökarvyn  \n* Wiki-vyn  \n* Applikationens gemensamma tillstånd\n\n🔗 **Viktiga interaktioner:** Lagrar argumenten i privata fält. Skapar inga egna DOM-element och anropar inga andra metoder.\n\n⚙️ **Effekt:** Kopplar navigationslogiken till de redan skapade komponenterna.\n\n💡 **Arkitekturprincip:** Dependency Injection. `Navigation` får tillgång till sina samarbetspartners utan att själv behöva skapa dem."
        },
        {
          "kind": "prose",
          "text": "### **🖥️ 2.2 Visa en huvudvy**"
        },
        {
          "kind": "function",
          "name": "Navigation.showView()",
          "identifier": "Navigation.showView()",
          "anchor": "Navigation-showView",
          "line": 32,
          "text": "Bestämmer vilken huvudvy som ska visas.\n\nDe fyra möjliga vyerna är:\n\n* 🗺️ `map-gallery` — världsgalleriet  \n* 🏗️ `world-builder` — kartredigeraren  \n* 👥 `visitors-login` — besökarvyn  \n* 📚 `civ-wiki` — Civilization-wikin\n\n🔗 **Viktiga interaktioner:**\n\n1. Kontrollerar `ApplicationState.getSelectedWorldId()` när World Builder begärs.  \n2. Om ingen värld är vald ändras målvyn till `map-gallery`.  \n3. Använder `classList.toggle()` för att sätta eller ta bort CSS-klassen `is-active` på vyernas rotelement.  \n4. Anropar `Header.setView()` så att sidhuvudet visar rätt aktiv vy.\n\n**Bekräftade anropare:** Callbacken i `src/main.ts`, programmets startsekvens och `WorldSelection.selectWorld()`.\n\n⚙️ **Effekt:** Uppdaterar synligheten för applikationens huvudvyer och synkroniserar sidhuvudet.\n\n💡 **Arkitekturprincip — invariant:** World Builder ska inte visas utan en vald värld. `Navigation.showView()` skyddar detta villkor genom att automatiskt välja galleriet i stället.\n\n---"
        }
      ],
      "notes": [
        "**🌍 När användaren väljer en värld**\n\n`WorldSelection.selectWorld()` → `ApplicationState.selectWorld()` → valt världs-ID sparas.\n\n**🧭 När användaren byter vy**\n\n`Navigation.showView()` → kontrollerar `ApplicationState.getSelectedWorldId()` → ändrar CSS-klassen `is-active` → `Header.setView()`.\n\n**🔐 När en identitet hämtas**\n\n`Authentication.refreshFantasyIdentity()` → `nextAuthenticationRequest()` → asynkron hämtning → kontroll med `getAuthenticationRequest()` → inaktuella svar ignoreras.\n\n**✏️ När en redigeringssession uppdateras**\n\n`EditingSessionController.subscribe()` → uppdaterar `ApplicationState` → redigeringskontrollerna läser sessionens status.\n\n---"
      ]
    },
    {
      "path": "src/main.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🚀 1\\. main.ts — Applikationens kopplingscentral**\n\n\nDen här filen fungerar som applikationens **Composition Root**. Här kopplas centrala objekt och funktioner samman.\n\nFilen innehåller flera callbacks som reagerar på användarinteraktioner och delegerar arbetet till rätt kontrollklass.\n\n### **🌍 1.1 Välja en värld**"
        },
        {
          "kind": "function",
          "name": "Världsväljare",
          "identifier": "världsväljare",
          "anchor": "världsväljare",
          "line": 43,
          "text": "Tar emot ett världs-ID när användaren väljer ett kort i världsgalleriet.\n\n🔗 **Anropar:** `WorldSelection.selectWorld()` i `src/main/world-selection.ts`.\n\nCallbacken skickas genom `ApplicationLayout` vidare till `WorldGallery`.\n\n⚙️ **Effekt:** Själva världsbytet, kartuppdateringen och navigationen utförs av `WorldSelection`, inte av callbacken.\n\n💡 **Arkitekturprincip:** Callbacken fungerar som en brygga mellan användargränssnittet och applikationslogiken."
        },
        {
          "kind": "prose",
          "text": "### **🧭 1.2 Byta huvudvy**"
        },
        {
          "kind": "function",
          "name": "Vyväljare",
          "identifier": "vyväljare",
          "anchor": "vyväljare",
          "line": 46,
          "text": "Tar emot en `AppView` när användaren väljer en annan huvudvy i sidhuvudet.\n\n🔗 **Anropar:** `Navigation.showView()` i `src/main/navigation.ts`.\n\nCallbacken skickas vidare till `Header` genom `ApplicationLayout`.\n\n⚙️ **Effekt:** Navigationen ansvarar för att visa rätt vy."
        },
        {
          "kind": "prose",
          "text": "### **🔄 1.3 Uppdatera redigeringskontroller**"
        },
        {
          "kind": "function",
          "name": "Uppdateringscallback",
          "identifier": "uppdatering av redigeringskontroller",
          "anchor": "uppdatering-av-redigeringskontroller",
          "line": 100,
          "text": "Ger autentiseringsmodulen möjlighet att uppdatera redigeringsknapparna när användarens identitet förändras.\n\n🔗 **Anropar:** `EditingControls.update()`.\n\nCallbacken lagras i `Authentication` och används vid initialisering och uppdatering av fantasy-identiteten.\n\n⚙️ **Effekt:** Högerpanelens status och knappar uppdateras."
        },
        {
          "kind": "prose",
          "text": "### **✏️ 1.4 Klick på Edit**"
        },
        {
          "kind": "function",
          "name": "Edit-callback",
          "identifier": "klick på Edit",
          "anchor": "klick-på-Edit",
          "line": 105,
          "text": "Reagerar när användaren klickar på knappen Edit.\n\n🔗 **Registreras genom:** `RightPanel.onEdit()`.\n\n🔗 **Anropar:** `EditingSessionController.handleEditAction()`.\n\n⚙️ **Effekt:** Kontrollern hanterar redigeringsåtgärden, inklusive databasanrop och felhantering.\n\nCallbacken inväntar inte själv det asynkrona resultatet."
        },
        {
          "kind": "prose",
          "text": "### **👑 1.5 Klick på Take Over**"
        },
        {
          "kind": "function",
          "name": "Take Over-callback",
          "identifier": "klick på Take over",
          "anchor": "klick-på-Take-over",
          "line": 109,
          "text": "Reagerar när en administratör vill ta över en redigeringssession.\n\n🔗 **Registreras genom:** `RightPanel.onTakeover()`.\n\n🔗 **Anropar:** `EditingSessionController.handleTakeoverAction()`.\n\n⚙️ **Effekt:** Kontrollern hanterar övertagandet och eventuella fel."
        },
        {
          "kind": "prose",
          "text": "### **🎨 1.6 Klick på en hexagon**"
        },
        {
          "kind": "function",
          "name": "Hexklickhanterare",
          "identifier": "klick på hexagon",
          "anchor": "klick-på-hexagon",
          "line": 115,
          "text": "Försöker måla en hexagon med den terrängtyp som användaren valt i vänsterpanelen.\n\n**Arbetsgång:**\n\n1. Kontrollerar `EditingControls.isCurrentEditor()`.  \n2. Kontrollerar att en värld är vald genom `ApplicationState.getSelectedWorldId()`.  \n3. Hämtar terrängvalet med `LeftPanel.getSelectedTerrain()`.  \n4. Anropar `decideTerrainPaint()` i `src/main/terrain-paint.ts`.  \n5. Tolkar beslutet och avgör om databasen ska uppdateras.\n\n**Tre möjliga beslut:**\n\n* ⏭️ `ignore` — avbryt utan mutation.  \n* ⚠️ `unknown-terrain` — logga det okända terrängvalet.  \n* 🎨 `paint` — anropa `api.hexes.setTerrain` via Convex.\n\n🔗 **Viktiga samarbetspartner:** `MapGrid`, `EditingControls`, `ApplicationState`, `LeftPanel`, `decideTerrainPaint()` och Convex.\n\n⚙️ **Effekt:** Vid ett lyckat mutationsanrop uppdateras hexagonens terräng och relief i databasen.\n\n💡 **Arkitekturprincip:** Beslutslogiken är separerad från själva databasanropet. Det gör reglerna enklare att testa.\n\n---"
        }
      ],
      "notes": [
        "### **🧭 Från menyknapp till vybyte**\n\n`Header` → callback i `main.ts` → `Navigation.showView()` → rätt vy visas.\n\n### **🌍 Från världskort till vald värld**\n\n`WorldGallery` → callback i `main.ts` → `WorldSelection.selectWorld()` → valt världs-ID och relaterade komponenter uppdateras.\n\n### **🎨 Från hexklick till databas**\n\n`MapGrid` → callback i `main.ts` → behörighetskontroll → `decideTerrainPaint()` → `api.hexes.setTerrain`.\n\n### **🔐 Från inloggning till behörighet**\n\n`ClerkAuthentication` → `Authentication.refreshFantasyIdentity()` → Convex → `ApplicationState.setCurrentIdentity()` → `EditingControls.update()`.\n\n### **👑 Från Take Over-knapp till åtgärd**\n\n`RightPanel` → callback i `main.ts` → `EditingSessionController.handleTakeoverAction()`.\n\n---"
      ]
    },
    {
      "path": "src/main/application-layout.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🏗️ 2\\. ApplicationLayout — Bygger gränssnittet**"
        },
        {
          "kind": "function",
          "name": "ApplicationLayout.constructor()",
          "identifier": "ApplicationLayout.constructor()",
          "anchor": "ApplicationLayout-constructor",
          "line": 21,
          "text": "Konstruktorn bygger applikationens övergripande DOM-struktur och skapar flera av de viktigaste gränssnittskomponenterna.\n\n**Komponenter som skapas:**\n\n* 🛠️ `EditorLayout` — världsbyggarens layout.  \n* 🗺️ `WorldMapController` — kopplingen mellan världens data och kartan.  \n* 🌍 `WorldGallery` — galleriet med världskort.  \n* 👥 `VisitorsLayout` — besökargränssnittet.  \n* 📚 `CivWiki` — wiki-vyn.  \n* 🧭 `Header` — applikationens sidhuvud.\n\n**Arbetsgång:**\n\n1. Hämtar HTML-elementet `#app`.  \n2. Kastar ett `Error` om elementet saknas.  \n3. Skapar gränssnittskomponenterna och kopplar deras beroenden.  \n4. Skickar `onSelectWorld` vidare till världsgalleriet.  \n5. Skickar `onShowView` vidare till sidhuvudet.  \n6. Lägger de fyra huvudvyerna i ett `main`\\-element.  \n7. Placerar sidhuvudet och `main` i en yttre `div.editor`.  \n8. Ersätter innehållet i `#app` med den färdiga strukturen genom `replaceChildren()`.\n\nVärldsbyggarens sektion får CSS-klassen `world-builder` och tillgänglighetsetiketten `World Builder`.\n\n🔗 **Viktiga beroenden:** `convex.client`, kartans `mapGrid` och de två callback-funktionerna.\n\n⚙️ **Effekt:** Applikationens övergripande gränssnitt byggs upp i DOM.\n\n💡 **Arkitekturprincip:** Composition. En större komponent sätts samman av flera mindre, specialiserade komponenter.\n\n---"
        }
      ],
      "notes": [
        "### **🧭 Från menyknapp till vybyte**\n\n`Header` → callback i `main.ts` → `Navigation.showView()` → rätt vy visas.\n\n### **🌍 Från världskort till vald värld**\n\n`WorldGallery` → callback i `main.ts` → `WorldSelection.selectWorld()` → valt världs-ID och relaterade komponenter uppdateras.\n\n### **🎨 Från hexklick till databas**\n\n`MapGrid` → callback i `main.ts` → behörighetskontroll → `decideTerrainPaint()` → `api.hexes.setTerrain`.\n\n### **🔐 Från inloggning till behörighet**\n\n`ClerkAuthentication` → `Authentication.refreshFantasyIdentity()` → Convex → `ApplicationState.setCurrentIdentity()` → `EditingControls.update()`.\n\n### **👑 Från Take Over-knapp till åtgärd**\n\n`RightPanel` → callback i `main.ts` → `EditingSessionController.handleTakeoverAction()`.\n\n---"
      ]
    },
    {
      "path": "src/main/authentication.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🔐 3\\. Authentication — Inloggning och fantasy-identitet**\n\n\nDen här klassen samordnar Clerk, Convex och applikationens lokala identitetstillstånd."
        },
        {
          "kind": "function",
          "name": "Authentication.constructor()",
          "identifier": "Authentication.constructor()",
          "anchor": "Authentication-constructor",
          "line": 14,
          "text": "Tar emot fem beroenden:\n\n* Clerk-autentisering  \n* Convex-anslutning  \n* Besökarlayout  \n* `ApplicationState`  \n* Callback för uppdatering av redigeringskontroller\n\n⚙️ **Effekt:** Lagrar referenserna i privata fält.\n\nKonstruktorn gör inga nätverksanrop och ändrar inte DOM."
        },
        {
          "kind": "function",
          "name": "Authentication.initialize()",
          "identifier": "Authentication.initialize()",
          "anchor": "Authentication-initialize",
          "line": 28,
          "text": "Startar och kopplar samman applikationens autentiseringssystem.\n\n**Arbetsgång:**\n\n1. Anropar `ClerkAuthentication.initialize()`.  \n2. Initierar inloggningssidan genom `LoginPage.initialize()`.  \n3. Registrerar en callback för ändringar av Clerk-användaren.  \n4. Anropar `ConvexConnection.connectAuthentication()`.  \n5. Hämtar användarens fantasy-identitet genom `refreshFantasyIdentity()`.\n\n**Vid fel:**\n\n* Rensar identiteten med `ApplicationState.setCurrentIdentity(null)`.  \n* Rensar inloggningssidans identitet med `LoginPage.setFantasyIdentity(null)`.  \n* Uppdaterar redigeringskontrollerna.  \n* Loggar felet.\n\n💡 **Arkitekturprincip:** Orchestration. En kontrollklass samordnar flera specialiserade tjänster."
        },
        {
          "kind": "function",
          "name": "Inloggningssidans ändringscallback",
          "identifier": "inloggningssidans ändringscallback",
          "anchor": "inloggningssidans-ändringscallback",
          "line": 32,
          "text": "Reagerar när inloggningssidan upptäcker att Clerk-användarens ID har ändrats.\n\n🔗 **Anropar:** `Authentication.refreshFantasyIdentity()`.\n\nCallbacken sparas av `LoginPage.initialize()` och anropas från `LoginPage.#updateAuthenticationState()`.\n\n⚙️ **Effekt:** Startar en ny identitetshämtning."
        },
        {
          "kind": "function",
          "name": "Authentication.refreshFantasyIdentity()",
          "identifier": "Authentication.refreshFantasyIdentity()",
          "anchor": "Authentication-refreshFantasyIdentity",
          "line": 47,
          "text": "Hämtar den aktuella användarens fantasy-identitet från Convex och publicerar den i applikationen.\n\n**Arbetsgång:**\n\n1. Ökar generationsnumret genom `ApplicationState.nextAuthenticationRequest()`.  \n2. Hämtar Clerk-användarens ID med `ClerkAuthentication.getUserId()`.  \n3. Rensar tidigare fantasy-identitet medan ny information hämtas.  \n4. Om inget användar-ID finns avslutas metoden.  \n5. Annars anropas Convex-frågan `api.authentication.currentUser`.  \n6. När svaret kommer kontrolleras både generationsnumret och användar-ID.  \n7. Om svaret fortfarande är aktuellt sparas identiteten i `ApplicationState` och på inloggningssidan.\n\n**Vid inaktuellt svar:** Resultatet ignoreras.\n\n**Vid aktuellt fel:** Identiteten rensas och felet loggas.\n\n🔗 **Viktiga metoder:** `nextAuthenticationRequest()`, `getAuthenticationRequest()`, `getUserId()`, `setCurrentIdentity()` och `setFantasyIdentity()`.\n\n⚙️ **Effekt:** Uppdaterar applikationens aktuella fantasy-identitet och därmed förutsättningarna för redigeringskontrollerna.\n\n💡 **Arkitekturprincip:** Skydd mot race conditions. Både generationsnummer och användar-ID kontrolleras så att ett gammalt databassvar inte återställer fel användares identitet.\n\n---"
        }
      ],
      "notes": [
        "### **🧭 Från menyknapp till vybyte**\n\n`Header` → callback i `main.ts` → `Navigation.showView()` → rätt vy visas.\n\n### **🌍 Från världskort till vald värld**\n\n`WorldGallery` → callback i `main.ts` → `WorldSelection.selectWorld()` → valt världs-ID och relaterade komponenter uppdateras.\n\n### **🎨 Från hexklick till databas**\n\n`MapGrid` → callback i `main.ts` → behörighetskontroll → `decideTerrainPaint()` → `api.hexes.setTerrain`.\n\n### **🔐 Från inloggning till behörighet**\n\n`ClerkAuthentication` → `Authentication.refreshFantasyIdentity()` → Convex → `ApplicationState.setCurrentIdentity()` → `EditingControls.update()`.\n\n### **👑 Från Take Over-knapp till åtgärd**\n\n`RightPanel` → callback i `main.ts` → `EditingSessionController.handleTakeoverAction()`.\n\n---"
      ]
    },
    {
      "path": "src/main/assigned-editor.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **👤 4\\. AssignedEditor — Visar världens tilldelade redigerare**"
        },
        {
          "kind": "function",
          "name": "AssignedEditor.constructor()",
          "identifier": "AssignedEditor.constructor()",
          "anchor": "AssignedEditor-constructor",
          "line": 12,
          "text": "Tar emot och lagrar:\n\n* Convex-anslutningen  \n* `EditorLayout`  \n* `ApplicationState`\n\n⚙️ **Effekt:** Lagrar beroenden utan att hämta data eller ändra panelen."
        },
        {
          "kind": "function",
          "name": "AssignedEditor.refresh()",
          "identifier": "AssignedEditor.refresh()",
          "anchor": "AssignedEditor-refresh",
          "line": 22,
          "text": "Hämtar den redigerare som är tilldelad en viss värld och visar redigerarens fantasy-namn i högerpanelen.\n\n**Arbetsgång:**\n\n1. Ökar generationsnumret med `nextAssignedEditorRequest()`.  \n2. Anropar Convex-frågan `api.worlds.getAssignedEditor`.  \n3. Väntar på svaret.  \n4. Kontrollerar att generationsnumret fortfarande är aktuellt.  \n5. Kontrollerar att samma värld fortfarande är vald.  \n6. Uppdaterar högerpanelens rubrik med `RightPanel.setEditorTitle()`.\n\nOm inget namn finns visas `Unassigned`.\n\n🔗 **Anropas av:** `WorldSelection.selectWorld()`.\n\n⚙️ **Effekt:** Uppdaterar namnet på den tilldelade redigeraren.\n\nEtt föråldrat svar ignoreras. Vid ett aktuellt fel loggas felet och rubriken sätts till `Unassigned`.\n\n💡 **Arkitekturprincip:** Asynkron konsistens. Resultatet måste fortfarande höra till den värld som användaren tittar på.\n\n---"
        }
      ],
      "notes": [
        "### **🧭 Från menyknapp till vybyte**\n\n`Header` → callback i `main.ts` → `Navigation.showView()` → rätt vy visas.\n\n### **🌍 Från världskort till vald värld**\n\n`WorldGallery` → callback i `main.ts` → `WorldSelection.selectWorld()` → valt världs-ID och relaterade komponenter uppdateras.\n\n### **🎨 Från hexklick till databas**\n\n`MapGrid` → callback i `main.ts` → behörighetskontroll → `decideTerrainPaint()` → `api.hexes.setTerrain`.\n\n### **🔐 Från inloggning till behörighet**\n\n`ClerkAuthentication` → `Authentication.refreshFantasyIdentity()` → Convex → `ApplicationState.setCurrentIdentity()` → `EditingControls.update()`.\n\n### **👑 Från Take Over-knapp till åtgärd**\n\n`RightPanel` → callback i `main.ts` → `EditingSessionController.handleTakeoverAction()`.\n\n---"
      ]
    },
    {
      "path": "src/main/editing-controls.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🛡️ 5\\. EditingControls — Behörigheter och redigeringsknappar**\n\n\nDen här klassen läser applikationens tillstånd och bestämmer hur redigeringskontrollerna ska presenteras."
        },
        {
          "kind": "function",
          "name": "EditingControls.constructor()",
          "identifier": "EditingControls.constructor()",
          "anchor": "EditingControls-constructor",
          "line": 8,
          "text": "Tar emot `EditorLayout` och `ApplicationState`.\n\n⚙️ **Effekt:** Lagrar beroendena. Ändrar inte gränssnittet direkt."
        },
        {
          "kind": "function",
          "name": "EditingControls.isCurrentEditor()",
          "identifier": "EditingControls.isCurrentEditor()",
          "anchor": "EditingControls-isCurrentEditor",
          "line": 16,
          "text": "Kontrollerar om den aktiva redigeringssessionen tillhör den nuvarande användaren.\n\n🔗 **Anropar:** `ApplicationState.getActiveSession()`.\n\nReturnerar `true` om sessionens `isMine` är `true`.\n\n🔗 **Används av:** `EditingControls.update()`, hexklickhanteringen och redigeringssessionens åtgärdsmetoder.\n\n⚙️ **Effekt:** Endast läsning.\n\n💡 **Viktig skillnad:** Att vara tilldelad en värld betyder inte automatiskt att man äger den aktiva redigeringssessionen."
        },
        {
          "kind": "function",
          "name": "EditingControls.canEditSelectedWorld()",
          "identifier": "EditingControls.canEditSelectedWorld()",
          "anchor": "EditingControls-canEditSelectedWorld",
          "line": 20,
          "text": "Avgör om användarens identitet ger rätt att redigera den valda världen.\n\n**Regler enligt den dokumenterade implementationen:**\n\n* Ingen vald värld → `false`.  \n* Ingen identitet → `false`.  \n* Besökarroll → `false`.  \n* Administratör → `true`.  \n* Annan behörig redigerare → `true` om identitetens `worldId` matchar den valda världen.\n\n🔗 **Anropar:** `getSelectedWorldId()` och `getCurrentIdentity()`.\n\n🔗 **Används av:** `EditingControls.update()` och `EditingSessionController.handleEditAction()`.\n\n⚙️ **Effekt:** Endast läsning.\n\n💡 **Arkitekturprincip:** Authorization. Metoden avgör om användaren har rätt att försöka starta redigering. Det är skilt från att redan äga en aktiv session."
        },
        {
          "kind": "function",
          "name": "EditingControls.update()",
          "identifier": "EditingControls.update()",
          "anchor": "EditingControls-update",
          "line": 38,
          "text": "Uppdaterar högerpanelens redigeringsstatus och knappar utifrån aktuellt applikationstillstånd.\n\n**Information som läses:**\n\n* Användarens identitet  \n* Aktiv redigeringssession  \n* Om sessionen har laddats  \n* Om en redigeringsåtgärd pågår  \n* Om användaren äger sessionen  \n* Om användaren får redigera den valda världen\n\n**Metoder som anropas på RightPanel:**\n\n* `setEditingStatus()`  \n* `setEditing()`  \n* `setEditButtonVisible()`  \n* `setTakeoverButtonVisible()`  \n* `setEditingButtonsDisabled()`\n\n**När visas Edit?**\n\nNär sessionen är laddad, användaren får redigera världen och det antingen inte finns någon aktiv session eller användaren själv äger den.\n\n**När visas Take Over?**\n\nNär sessionen är laddad, användaren är administratör, en aktiv session finns och den tillhör någon annan.\n\n**När inaktiveras knapparna?**\n\nNär en redigeringsåtgärd väntar på svar.\n\n**Statusmeddelanden:**\n\n* `Loading status...` — sessionens första svar har ännu inte kommit.  \n* `Viewing mode` — ingen aktiv session finns.  \n* Vid aktiv session visas redigerarens namn.\n\n⚙️ **Effekt:** Uppdaterar panelens text, redigeringsläge och knapparnas synlighet och aktiveringsstatus.\n\n💡 **Arkitekturprincip:** Separation of Concerns. `EditingControls` avgör hur gränssnittet ska presenteras utifrån tillståndet, medan `EditingSessionController` hanterar själva redigeringsåtgärderna.\n\n---"
        }
      ],
      "notes": [
        "### **🧭 Från menyknapp till vybyte**\n\n`Header` → callback i `main.ts` → `Navigation.showView()` → rätt vy visas.\n\n### **🌍 Från världskort till vald värld**\n\n`WorldGallery` → callback i `main.ts` → `WorldSelection.selectWorld()` → valt världs-ID och relaterade komponenter uppdateras.\n\n### **🎨 Från hexklick till databas**\n\n`MapGrid` → callback i `main.ts` → behörighetskontroll → `decideTerrainPaint()` → `api.hexes.setTerrain`.\n\n### **🔐 Från inloggning till behörighet**\n\n`ClerkAuthentication` → `Authentication.refreshFantasyIdentity()` → Convex → `ApplicationState.setCurrentIdentity()` → `EditingControls.update()`.\n\n### **👑 Från Take Over-knapp till åtgärd**\n\n`RightPanel` → callback i `main.ts` → `EditingSessionController.handleTakeoverAction()`.\n\n---"
      ]
    },
    {
      "path": "src/main/editing-session.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **✏️ 1\\. EditingSessionController — Hanterar redigeringssessioner**\n\n\nKlassen `EditingSessionController` ansvarar för att samordna redigeringssessioner mellan applikationens tillstånd, gränssnitt och Convex.\n\nDen kan prenumerera på sessionsförändringar, starta redigering, avsluta redigering och låta en administratör ta över en session."
        },
        {
          "kind": "function",
          "name": "EditingSessionController.constructor()",
          "identifier": "EditingSessionController.constructor()",
          "anchor": "EditingSessionController-constructor",
          "line": 13,
          "text": "Tar emot tre beroenden:\n\n* `ConvexConnection` — anslutningen till databasen.  \n* `ApplicationState` — applikationens gemensamma tillstånd.  \n* `EditingControls` — hanteringen av redigeringsknappar och status.\n\n🔗 **Viktiga interaktioner:** Sparar objekten i privata fält.\n\n⚙️ **Effekt:** Ingen prenumeration eller nätverksoperation startas.\n\n💡 **Arkitekturprincip:** Dependency Injection. Kontrollern får sina beroenden utifrån."
        },
        {
          "kind": "function",
          "name": "EditingSessionController.subscribe()",
          "identifier": "EditingSessionController.subscribe()",
          "anchor": "EditingSessionController-subscribe",
          "line": 23,
          "text": "Startar en liveprenumeration på den aktiva redigeringssessionen för en viss värld.\n\n**Arbetsgång:**\n\n1. Hämtar den tidigare avregistreringsfunktionen genom `getEditingSessionUnsubscribe()`.  \n2. Anropar den gamla funktionen för att avsluta föregående prenumeration.  \n3. Rensar den lagrade avregistreringsfunktionen.  \n4. Sätter aktiv session till `null`.  \n5. Sätter `sessionLoaded` till `false`.  \n6. Uppdaterar redigeringskontrollerna.  \n7. Startar en ny Convex-prenumeration med `client.onUpdate()`.  \n8. Sparar den nya avregistreringsfunktionen.\n\n🔗 **Convex-fråga:** `api.editingSessions.getActiveSession` med `{ worldId }`.\n\n🔗 **Anropas av:** `WorldSelection.selectWorld()`.\n\n⚙️ **Effekt:** Den gamla världens prenumeration avslutas och en ny startas. Högerpanelen visar laddningsstatus tills sessionsinformationen kommer.\n\n💡 **Arkitekturprincip:** Subscription Lifecycle Management. Prenumerationer måste hanteras så att gamla lyssnare inte fortsätter påverka applikationen."
        },
        {
          "kind": "function",
          "name": "Sessionsvar",
          "identifier": "sessionsvar",
          "anchor": "sessionsvar",
          "line": 35,
          "text": "Callback som tar emot uppdateringar från Convex-prenumerationen.\n\n**Arbetsgång:**\n\n1. Kontrollerar att användaren fortfarande har samma värld vald.  \n2. Om världen har ändrats ignoreras resultatet.  \n3. Sparar den mottagna sessionen genom `setActiveSession()`.  \n4. Markerar sessionen som laddad genom `setSessionLoaded(true)`.  \n5. Anropar `EditingControls.update()`.\n\n⚙️ **Effekt:** Uppdaterar redigeringssessionen och högerpanelens knappar och status.\n\n💡 **Viktig detalj:** Även ett tomt sessionsvärde kan vara ett giltigt svar. Det betyder att prenumerationen har svarat men att ingen aktiv redigeringssession finns."
        },
        {
          "kind": "function",
          "name": "Sessionsfel",
          "identifier": "sessionsfel",
          "anchor": "sessionsfel",
          "line": 44,
          "text": "Callback som hanterar fel från prenumerationen.\n\n**Arbetsgång:**\n\n1. Kontrollerar att den aktuella världen fortfarande är densamma.  \n2. Ignorerar fel som hör till en tidigare vald värld.  \n3. Loggar felet.  \n4. Rensar den aktiva sessionen.  \n5. Sätter `sessionLoaded` till `false`.  \n6. Uppdaterar redigeringskontrollerna.\n\n⚙️ **Effekt:** Sessionen töms och gränssnittet visar `Loading status...`.\n\n💡 **Arkitekturprincip:** Defensive Programming. Ett föråldrat fel ska inte påverka en annan värld som användaren redan har öppnat."
        },
        {
          "kind": "function",
          "name": "EditingSessionController.handleEditAction()",
          "identifier": "EditingSessionController.handleEditAction()",
          "anchor": "EditingSessionController-handleEditAction",
          "line": 59,
          "text": "Startar eller avslutar redigering för den valda världen.\n\n**Kontroller innan åtgärden får fortsätta:**\n\n* En värld måste vara vald.  \n* Sessionsinformationen måste ha laddats.  \n* Användaren måste ha redigeringsbehörighet.  \n* Ingen annan redigeringsåtgärd får redan pågå.\n\nDärefter kontrolleras om användaren redan äger sessionen.\n\n**Om användaren redan redigerar:**\n\n🔗 Anropar `api.editingSessions.stopEditing` med `{ worldId }`.\n\n**Om användaren inte redigerar:**\n\n* Kontrollerar att ingen annan aktiv session finns.  \n* Anropar `api.editingSessions.startEditing` med `{ worldId }`.\n\n**Under operationen:**\n\n1. `setEditingActionPending(true)` spärrar nya åtgärder.  \n2. `EditingControls.update()` uppdaterar knapparna.  \n3. Convex-mutationen körs.  \n4. Eventuella fel loggas och visas med `window.alert()`.  \n5. Ett `finally`\\-block återställer spärren.  \n6. Redigeringskontrollerna uppdateras igen.\n\n⚙️ **Effekt:** Startar eller stoppar redigering på servern.\n\nSjälva sessionsförändringen når sedan gränssnittet genom liveprenumerationen.\n\n💡 **Arkitekturprincip:** Asynchronous State Management. Programmet skyddar användargränssnittet mot upprepade åtgärder medan en mutation pågår."
        },
        {
          "kind": "function",
          "name": "EditingSessionController.handleTakeoverAction()",
          "identifier": "EditingSessionController.handleTakeoverAction()",
          "anchor": "EditingSessionController-handleTakeoverAction",
          "line": 106,
          "text": "Låter en administratör ta över en redigeringssession som ägs av någon annan.\n\n**Villkor som måste uppfyllas:**\n\n* En värld är vald.  \n* Sessionsinformationen har laddats.  \n* Användaren har rollen `admin`.  \n* Det finns en aktiv redigeringssession.  \n* Administratören äger inte redan sessionen.  \n* Ingen annan redigeringsåtgärd väntar på svar.\n\n**Arbetsgång:**\n\n1. Kontrollerar alla villkor.  \n2. Sätter `editingActionPending` till `true`.  \n3. Uppdaterar redigeringskontrollerna.  \n4. Anropar Convex-mutationen `api.editingSessions.startEditing` med `{ worldId, takeover: true }`.  \n5. Hanterar eventuella fel med loggning och `window.alert()`.  \n6. Återställer spärren i `finally`.  \n7. Uppdaterar redigeringskontrollerna.\n\n⚙️ **Effekt:** Begär att servern ersätter den tidigare redigeraren med administratören.\n\n💡 **Arkitekturprincip:** Authorization och kontroll av konkurrerande åtkomst. Klienten kontrollerar förutsättningarna innan den begär övertagandet.\n\n---"
        }
      ],
      "notes": [
        "### **🌍 När användaren väljer en värld**\n\n`WorldGallery` → `WorldSelection.selectWorld()` → `ApplicationState.selectWorld()` → `WorldMapController.selectWorld()` → `EditingSessionController.subscribe()` → `Navigation.showView()`.\n\n### **✏️ När användaren klickar på Edit**\n\n`RightPanel` → `EditingSessionController.handleEditAction()` → `startEditing` eller `stopEditing` i Convex → sessionsprenumerationen tar emot uppdateringen → `EditingControls.update()`.\n\n### **👑 När administratören tar över**\n\n`RightPanel` → `handleTakeoverAction()` → `startEditing({ worldId, takeover: true })` → Convex → sessionsprenumerationen uppdaterar gränssnittet.\n\n### **🎨 När användaren målar en hexagon**\n\n`MapGrid` → hexklickhanteraren i `main.ts` → `decideTerrainPaint()` → beslutet `paint` → `api.hexes.setTerrain`.\n\n---"
      ]
    },
    {
      "path": "src/main/world-selection.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🌍 2\\. WorldSelection — Samordnar världsvalet**\n\n\nKlassen `WorldSelection` ansvarar för att hämta världar och samordna vad som händer när användaren väljer en värld."
        },
        {
          "kind": "function",
          "name": "WorldSelection.constructor()",
          "identifier": "WorldSelection.constructor()",
          "anchor": "WorldSelection-constructor",
          "line": 25,
          "text": "Tar emot nio samarbetande objekt:\n\n* Convex-anslutning  \n* Världsgalleri  \n* Editorlayout  \n* Kartkontroll  \n* Sidhuvud  \n* Gemensamt applikationstillstånd  \n* Hantering av tilldelad redigerare  \n* Redigeringssessionskontroll  \n* Navigation\n\n🔗 **Viktiga interaktioner:** Lagrar objekten i privata fält.\n\n⚙️ **Effekt:** Inga databasanrop eller vybyten sker vid konstruktionen.\n\n💡 **Arkitekturprincip:** Orchestration. Klassen har ett samordnande ansvar och använder flera specialiserade komponenter."
        },
        {
          "kind": "function",
          "name": "WorldSelection.initializeGallery()",
          "identifier": "WorldSelection.initializeGallery()",
          "anchor": "WorldSelection-initializeGallery",
          "line": 47,
          "text": "Hämtar listan över tillgängliga världar från Convex och skickar den till världsgalleriet.\n\n**Arbetsgång:**\n\n1. Anropar Convex-frågan `api.worlds.list` med `{}`.  \n2. Sparar resultatet genom `ApplicationState.setWorlds()`.  \n3. Hämtar den lagrade listan med `ApplicationState.getWorlds()`.  \n4. Skickar listan till `WorldGallery.setWorlds()`.\n\n🔗 **Anropas från:** Startsekvensen i `src/main.ts`.\n\n⚙️ **Effekt:** Uppdaterar både applikationens lagrade världslista och galleriets gränssnitt.\n\nVid fel fångas felet av anroparens `.catch` och loggas."
        },
        {
          "kind": "function",
          "name": "WorldSelection.selectWorld()",
          "identifier": "WorldSelection.selectWorld()",
          "anchor": "WorldSelection-selectWorld",
          "line": 56,
          "text": "Samordnar hela processen när användaren väljer en värld i galleriet.\n\n**Arbetsgång:**\n\n1. Söker efter världens ID i den lagrade världslistan.  \n2. Om världen inte finns loggas ID och metoden avslutas.  \n3. Sparar den valda världen med `ApplicationState.selectWorld()`.  \n4. Sätter kartans information till `Unedited Map` och `Loading...`.  \n5. Aktiverar World Builder-knappen genom `Header.setWorldBuilderAvailable(true)`.  \n6. Anropar `WorldMapController.selectWorld()` för att byta karta.  \n7. Startar redigeringssessionens prenumeration genom `EditingSessionController.subscribe()`.  \n8. Visar World Builder genom `Navigation.showView('world-builder')`.  \n9. Startar `AssignedEditor.refresh()` för att hämta den tilldelade redigerarens namn.\n\n🔗 **Anropas från:** Världsväljarens callback i `src/main.ts`.\n\n⚙️ **Effekt:** Ändrar vald värld, uppdaterar gränssnittet, startar kartans och redigeringssessionens prenumerationer och hämtar information om tilldelad redigerare.\n\n💡 **Arkitekturprincip:** Coordination. `WorldSelection` ser till att flera moduler reagerar på samma användarbeslut.\n\n---"
        }
      ],
      "notes": [
        "### **🌍 När användaren väljer en värld**\n\n`WorldGallery` → `WorldSelection.selectWorld()` → `ApplicationState.selectWorld()` → `WorldMapController.selectWorld()` → `EditingSessionController.subscribe()` → `Navigation.showView()`.\n\n### **✏️ När användaren klickar på Edit**\n\n`RightPanel` → `EditingSessionController.handleEditAction()` → `startEditing` eller `stopEditing` i Convex → sessionsprenumerationen tar emot uppdateringen → `EditingControls.update()`.\n\n### **👑 När administratören tar över**\n\n`RightPanel` → `handleTakeoverAction()` → `startEditing({ worldId, takeover: true })` → Convex → sessionsprenumerationen uppdaterar gränssnittet.\n\n### **🎨 När användaren målar en hexagon**\n\n`MapGrid` → hexklickhanteraren i `main.ts` → `decideTerrainPaint()` → beslutet `paint` → `api.hexes.setTerrain`.\n\n---"
      ]
    },
    {
      "path": "src/main/terrain-paint.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🎨 3\\. TerrainPaint — Ren beslutslogik för terrängmålning**\n\n\nDen här modulen innehåller en funktion som avgör vad ett hexklick ska innebära.\n\nDen fattar beslut men gör inga egna databasanrop."
        },
        {
          "kind": "function",
          "name": "decideTerrainPaint()",
          "identifier": "decideTerrainPaint()",
          "anchor": "decideTerrainPaint",
          "line": 54,
          "text": "Tar emot information om redigeringsstatus, vald värld, vald terräng och hexagonens koordinater.\n\nReturnerar ett beslut som anroparen kan agera på.\n\n**Tre möjliga resultat:**\n\n**⏭️ `ignore`**\n\nReturneras när användaren inte är aktuell redigerare eller när ingen värld är vald.\n\nResultat: `{ kind: 'ignore' }`\n\n**⚠️ `unknown-terrain`**\n\nReturneras när det valda terräng-ID inte finns bland de kända terrängtyperna.\n\nResultat: `{ kind: 'unknown-terrain', selectedTerrain }`\n\n**🎨 `paint`**\n\nReturneras när förutsättningarna är uppfyllda och terrängtypen är känd.\n\nResultatet innehåller argumenten:\n\n* `worldId` — världens ID.  \n* `x` — hexagonens x-koordinat.  \n* `y` — hexagonens y-koordinat.  \n* `terrain` — terrängtyp.  \n* `relief` — relief.\n\n**Terrängtyper som stöds:**\n\n🌱 `grass`  \n🌾 `plains`  \n🏜️ `desert`  \n❄️ `tundra`  \n⛄ `snow`  \n🌊 `coast`  \n🌊 `ocean`\n\nDe fem landterrängerna stöder dessutom suffixen `-hills` och `-mountains`.\n\n**Reliefvärden:**\n\n* `flat` — platt terräng.  \n* `hills` — kullar.  \n* `mountain` — berg.\n\nFunktionen använder `Object.hasOwn()` för att kontrollera om terrängvalet finns i uppslagstabellen `TERRAIN_SELECTIONS`.\n\n🔗 **Anropas av:** Hexklickhanteringen i `src/main.ts`.\n\n⚙️ **Effekt:** Ingen sidoeffekt. Funktionen returnerar endast ett beräknat beslut.\n\n💡 **Arkitekturprincip — Pure Function:** En ren funktion beräknar ett resultat utifrån sina argument utan att ändra externa tillstånd.\n\n💡 **Arkitekturprincip — Separation of Concerns:** Beslutet om vad som ska målas är separerat från Convex-mutationen som faktiskt sparar förändringen.\n\n---"
        }
      ],
      "notes": [
        "### **🌍 När användaren väljer en värld**\n\n`WorldGallery` → `WorldSelection.selectWorld()` → `ApplicationState.selectWorld()` → `WorldMapController.selectWorld()` → `EditingSessionController.subscribe()` → `Navigation.showView()`.\n\n### **✏️ När användaren klickar på Edit**\n\n`RightPanel` → `EditingSessionController.handleEditAction()` → `startEditing` eller `stopEditing` i Convex → sessionsprenumerationen tar emot uppdateringen → `EditingControls.update()`.\n\n### **👑 När administratören tar över**\n\n`RightPanel` → `handleTakeoverAction()` → `startEditing({ worldId, takeover: true })` → Convex → sessionsprenumerationen uppdaterar gränssnittet.\n\n### **🎨 När användaren målar en hexagon**\n\n`MapGrid` → hexklickhanteraren i `main.ts` → `decideTerrainPaint()` → beslutet `paint` → `api.hexes.setTerrain`.\n\n---"
      ]
    },
    {
      "path": "src/application/database/convex-client.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🌐 1\\. ConvexConnection — Kopplingen till databasen**\n\n\nKlassen `ConvexConnection` skapar applikationens Convex-klient och kopplar användarens autentisering till den."
        },
        {
          "kind": "function",
          "name": "ConvexConnection.constructor()",
          "identifier": "ConvexConnection.constructor()",
          "anchor": "ConvexConnection-constructor",
          "line": 8,
          "text": "Skapar klienten som används för kommunikation med Convex.\n\n**Arbetsgång:**\n\n1. Läser miljövariabeln `import.meta.env.VITE_CONVEX_URL`.  \n2. Om värdet saknas kastas ett `Error` med meddelandet `VITE_CONVEX_URL is not configured`.  \n3. Skapar en `ConvexClient` med den angivna adressen.  \n4. Lagrar klienten i egenskapen `client`.\n\n🔗 **Anropas från:** `src/main.ts`.\n\n⚙️ **Effekt:** Skapar Convex-klienten. Autentiseringen ansluts separat.\n\n💡 **Begrepp — Environment Variable:** En konfigurationsvariabel som gör att samma kod kan användas i olika miljöer med olika inställningar."
        },
        {
          "kind": "function",
          "name": "ConvexConnection.connectAuthentication()",
          "identifier": "ConvexConnection.connectAuthentication()",
          "anchor": "ConvexConnection-connectAuthentication",
          "line": 18,
          "text": "Kopplar Clerk-autentiseringen till Convex-klienten.\n\n**Arbetsgång:**\n\n1. Anropar `client.setAuth()`.  \n2. Registrerar en funktion som hämtar Clerk-token.  \n3. Registrerar en callback som tar emot autentiseringsresultatet.  \n4. Returnerar ett `Promise` som avgörs när Convex rapporterar autentiseringsläget första gången.\n\n🔗 **Anropas av:** `Authentication.initialize()`.\n\n⚙️ **Effekt:** Convex får tillgång till en funktion som kan leverera användarens token.\n\n💡 **Begrepp — Promise:** Ett objekt som representerar resultatet av en asynkron operation."
        },
        {
          "kind": "function",
          "name": "Tokenhämtare",
          "identifier": "tokenhämtare",
          "anchor": "tokenhämtare",
          "line": 23,
          "text": "En callback som Convex använder när en autentiseringstoken behövs.\n\n🔗 **Anropar:** `ClerkAuthentication.getConvexToken()`.\n\nCallbacken registreras som första argument till `ConvexClient.setAuth()`.\n\n⚙️ **Effekt:** Returnerar ett löfte om en token, eller `null`. Funktionen ändrar inget eget tillstånd.\n\n💡 **Arkitekturprincip:** Callback-baserad integration. Convex behöver inte själv känna till detaljerna i vår Clerk-klass."
        },
        {
          "kind": "function",
          "name": "Autentiseringsresultat",
          "identifier": "autentiseringsresultat",
          "anchor": "autentiseringsresultat",
          "line": 24,
          "text": "Tar emot ett booleskt autentiseringsresultat från Convex.\n\n🔗 **Anropar:** `resolve(isAuthenticated)`.\n\n⚙️ **Effekt:** Avgör det `Promise` som `connectAuthentication()` returnerar.\n\nEtt redan avgjort Promise påverkas inte av senare anrop till `resolve()`.\n\n---"
        }
      ],
      "notes": [
        "### **🚀 Vid applikationens uppstart**\n\n`main.ts` → `ClerkAuthentication.constructor()` → `ConvexConnection.constructor()` → `Authentication.initialize()`.\n\n### **🎟️ När Convex behöver en token**\n\n`ConvexClient.setAuth()` → tokenhämtaren → `ClerkAuthentication.getConvexToken()` → Clerk-sessionens `getToken()`.\n\n### **🔐 När användaren loggar in**\n\n`LoginPage.#handleAction()` → `ClerkAuthentication.signIn()` → Clerk → autentiseringslyssnaren → `LoginPage.#updateAuthenticationState()` → `Authentication.refreshFantasyIdentity()`.\n\n### **👤 När fantasy-identiteten har hämtats**\n\nConvex-frågan `currentUser` → `ApplicationState.setCurrentIdentity()` → `LoginPage.setFantasyIdentity()` → `LoginPage.#render()`.\n\n---"
      ]
    },
    {
      "path": "src/application/authentication/clerk-authentication.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🪪 2\\. ClerkAuthentication — Hanterar Clerk**\n\n\nDen här klassen kapslar in användningen av Clerk och erbjuder ett mindre API för resten av applikationen."
        },
        {
          "kind": "function",
          "name": "ClerkAuthentication.constructor()",
          "identifier": "ClerkAuthentication.constructor()",
          "anchor": "ClerkAuthentication-constructor",
          "line": 6,
          "text": "Skapar Clerk-klienten med projektets publika nyckel.\n\n**Arbetsgång:**\n\n1. Läser `VITE_CLERK_PUBLISHABLE_KEY`.  \n2. Kastar ett fel om nyckeln saknas.  \n3. Skapar en Clerk-instans med `new Clerk(publishableKey)`.  \n4. Lagrar instansen i ett privat fält.\n\n🔗 **Anropas från:** `src/main.ts`.\n\n⚙️ **Effekt:** Skapar klienten utan att ännu ladda sessionen."
        },
        {
          "kind": "function",
          "name": "ClerkAuthentication.initialize()",
          "identifier": "ClerkAuthentication.initialize()",
          "anchor": "ClerkAuthentication-initialize",
          "line": 17,
          "text": "Startar Clerk genom att anropa `this.#clerk.load()`.\n\n🔗 **Anropas av:** `Authentication.initialize()`.\n\n⚙️ **Effekt:** Initierar Clerk så att användarens session och identitet kan läsas."
        },
        {
          "kind": "function",
          "name": "ClerkAuthentication.isSignedIn()",
          "identifier": "ClerkAuthentication.isSignedIn()",
          "anchor": "ClerkAuthentication-isSignedIn",
          "line": 21,
          "text": "Returnerar om Clerk har en inloggad användare.\n\n🔗 **Läser:** `this.#clerk.isSignedIn`.\n\n🔗 **Anropas av:** `LoginPage.#render()` och `LoginPage.#handleAction()`.\n\n⚙️ **Effekt:** Endast läsning."
        },
        {
          "kind": "function",
          "name": "ClerkAuthentication.getUserId()",
          "identifier": "ClerkAuthentication.getUserId()",
          "anchor": "ClerkAuthentication-getUserId",
          "line": 25,
          "text": "Returnerar den aktuella Clerk-användarens ID.\n\nOm ingen användare finns returneras `null`.\n\n🔗 **Läser:** `this.#clerk.user?.id`.\n\n🔗 **Anropas av:** `Authentication.refreshFantasyIdentity()` och `LoginPage.#updateAuthenticationState()`.\n\n⚙️ **Effekt:** Endast läsning.\n\n💡 **Begrepp — Optional Chaining:** Operatorn `?.` gör det möjligt att läsa en egenskap även när objektet kan saknas, utan att kasta ett fel."
        },
        {
          "kind": "function",
          "name": "ClerkAuthentication.getConvexToken()",
          "identifier": "ClerkAuthentication.getConvexToken()",
          "anchor": "ClerkAuthentication-getConvexToken",
          "line": 29,
          "text": "Hämtar den sessionstoken som Convex använder för att verifiera användaren.\n\n🔗 **Anropar:** `this.#clerk.session?.getToken()`.\n\nOm session eller token saknas returneras `null`.\n\n🔗 **Anropas av:** Tokenhämtaren i `convex-client.ts`.\n\n⚙️ **Effekt:** Själva tokenhämtningen hanteras av Clerk. Metoden ändrar inget eget tillstånd."
        },
        {
          "kind": "function",
          "name": "ClerkAuthentication.onAuthenticationChange()",
          "identifier": "ClerkAuthentication.onAuthenticationChange()",
          "anchor": "ClerkAuthentication-onAuthenticationChange",
          "line": 33,
          "text": "Registrerar en callback som Clerk ska anropa när autentiseringsläget förändras.\n\n🔗 **Anropar:** `this.#clerk.addListener(callback)`.\n\n🔗 **Anropas av:** `LoginPage.initialize()`.\n\n⚙️ **Effekt:** Registrerar en ny lyssnare hos Clerk.\n\nMetoden tar inte bort tidigare lyssnare.\n\n💡 **Begrepp — Event Listener:** En funktion som registreras för att reagera på en viss händelse."
        },
        {
          "kind": "function",
          "name": "ClerkAuthentication.signIn()",
          "identifier": "ClerkAuthentication.signIn()",
          "anchor": "ClerkAuthentication-signIn",
          "line": 37,
          "text": "Skickar användaren till Clerks inloggningssida.\n\n🔗 **Anropar:** `this.#clerk.redirectToSignIn()`.\n\nEfter inloggningen används applikationens ursprungsadress med `/` som omdirigeringsmål.\n\n🔗 **Anropas av:** `LoginPage.#handleAction()` när användaren inte är inloggad.\n\n⚙️ **Effekt:** Startar en omdirigering till inloggningen."
        },
        {
          "kind": "function",
          "name": "ClerkAuthentication.signOut()",
          "identifier": "ClerkAuthentication.signOut()",
          "anchor": "ClerkAuthentication-signOut",
          "line": 43,
          "text": "Loggar ut den aktuella användaren från Clerk.\n\n🔗 **Anropar:** `this.#clerk.signOut()`.\n\n🔗 **Anropas av:** `LoginPage.#handleAction()` när användaren är inloggad.\n\n⚙️ **Effekt:** Clerk avslutar användarens session.\n\n---"
        }
      ],
      "notes": [
        "### **🚀 Vid applikationens uppstart**\n\n`main.ts` → `ClerkAuthentication.constructor()` → `ConvexConnection.constructor()` → `Authentication.initialize()`.\n\n### **🎟️ När Convex behöver en token**\n\n`ConvexClient.setAuth()` → tokenhämtaren → `ClerkAuthentication.getConvexToken()` → Clerk-sessionens `getToken()`.\n\n### **🔐 När användaren loggar in**\n\n`LoginPage.#handleAction()` → `ClerkAuthentication.signIn()` → Clerk → autentiseringslyssnaren → `LoginPage.#updateAuthenticationState()` → `Authentication.refreshFantasyIdentity()`.\n\n### **👤 När fantasy-identiteten har hämtats**\n\nConvex-frågan `currentUser` → `ApplicationState.setCurrentIdentity()` → `LoginPage.setFantasyIdentity()` → `LoginPage.#render()`.\n\n---"
      ]
    },
    {
      "path": "src/application/authentication/login-page.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🖥️ 3\\. LoginPage — Inloggningsgränssnittet**\n\n\nKlassen `LoginPage` ansvarar för att visa autentiseringsstatus, fantasy-identitet, användarroll och knappen för inloggning eller utloggning."
        },
        {
          "kind": "function",
          "name": "LoginPage.constructor()",
          "identifier": "LoginPage.constructor()",
          "anchor": "LoginPage-constructor",
          "line": 23,
          "text": "Bygger inloggningspanelens DOM-element.\n\n**Element som skapas:**\n\n* `div.login-page` — panelens rotelement.  \n* Statusrad med texten `Checking authentication...`.  \n* Rollrad som från början är tom.  \n* Åtgärdsknapp som från början är inaktiverad.\n\nKonstruktorn registrerar även en klicklyssnare på knappen.\n\n🔗 **Anropas av:** `VisitorsLayout.constructor()`.\n\n⚙️ **Effekt:** Skapar panelen i minnet. Den monteras senare av besökarlayouten."
        },
        {
          "kind": "function",
          "name": "Klick på inloggningsknappen",
          "identifier": "klick på inloggningsknappen",
          "anchor": "klick-på-inloggningsknappen",
          "line": 41,
          "text": "Callback som körs när användaren klickar på knappen.\n\n🔗 **Registreras med:** `addEventListener('click')`.\n\n🔗 **Anropar:** `LoginPage.#handleAction()`.\n\n⚙️ **Effekt:** Startar hanteringen av inloggning eller utloggning."
        },
        {
          "kind": "function",
          "name": "LoginPage.initialize()",
          "identifier": "LoginPage.initialize()",
          "anchor": "LoginPage-initialize",
          "line": 52,
          "text": "Förbereder inloggningssidan för att reagera på autentiseringsändringar.\n\n**Arbetsgång:**\n\n1. Sparar en eventuell callback från applikationslagret.  \n2. Registrerar en lyssnare hos Clerk genom `onAuthenticationChange()`.  \n3. Anropar `#updateAuthenticationState()` för att visa det aktuella läget direkt.\n\n🔗 **Anropas av:** `Authentication.initialize()`.\n\nÄven `VisitorsLayout.initializeAuthentication()` innehåller ett anrop till metoden, men Cursor hittade inget anrop till den senare metoden från övrig applikationskod.\n\n⚙️ **Effekt:** Startar den första renderingen och registrerar framtida autentiseringshändelser."
        },
        {
          "kind": "function",
          "name": "Clerk-lyssnare",
          "identifier": "Clerk-lyssnare",
          "anchor": "Clerk-lyssnare",
          "line": 57,
          "text": "Callback som reagerar när Clerk rapporterar att autentiseringen har förändrats.\n\n🔗 **Anropar:** `LoginPage.#updateAuthenticationState()`.\n\n⚙️ **Effekt:** Uppdaterar inloggningspanelen.\n\nOm användar-ID har ändrats kan även en ny hämtning av fantasy-identiteten startas."
        },
        {
          "kind": "function",
          "name": "LoginPage.setFantasyIdentity()",
          "identifier": "LoginPage.setFantasyIdentity()",
          "anchor": "LoginPage-setFantasyIdentity",
          "line": 64,
          "text": "Tar emot fantasy-identiteten från applikationslagret.\n\n**Arbetsgång:**\n\n1. Sparar identiteten i det privata fältet `#fantasyIdentity`.  \n2. Anropar `#render()`.\n\n🔗 **Anropas av:** `Authentication.initialize()` och `Authentication.refreshFantasyIdentity()`.\n\n⚙️ **Effekt:** Uppdaterar den information som visas på inloggningssidan.\n\nMetoden startar inte någon ny identitetshämtning."
        },
        {
          "kind": "function",
          "name": "LoginPage.#updateAuthenticationState()",
          "identifier": "LoginPage.#updateAuthenticationState()",
          "anchor": "LoginPage-updateAuthenticationState",
          "line": 71,
          "text": "Kontrollerar Clerk-användarens aktuella ID och avgör om identiteten har förändrats.\n\n**Om användar-ID har ändrats:**\n\n1. Sparar det nya ID.  \n2. Rensar tidigare fantasy-identitet.  \n3. Anropar `#render()`.  \n4. Anropar den sparade callbacken `#onAuthenticationChange`, om den finns.\n\n**Om användar-ID är oförändrat:**\n\n* Anropar endast `#render()`.\n\n🔗 **Anropas av:** `initialize()`, Clerk-lyssnaren och `#handleAction()`.\n\n⚙️ **Effekt:** Ser till att en tidigare användares fantasy-identitet inte fortsätter visas när en annan användare loggar in.\n\n💡 **Arkitekturprincip:** State Synchronization. Gränssnittets identitet hålls synkroniserad med Clerk-sessionen."
        },
        {
          "kind": "function",
          "name": "LoginPage.#render()",
          "identifier": "LoginPage.#render()",
          "anchor": "LoginPage-render",
          "line": 86,
          "text": "Uppdaterar inloggningspanelens text och knapp utifrån användarens autentiseringsstatus.\n\n**När ingen användare är inloggad:**\n\n* Status: `Visitor`.  \n* Rollrad: tom.  \n* Knapp: `Sign in with Google`.\n\n**När användaren är inloggad men fantasy-identiteten ännu saknas:**\n\n* Status: `Loading fantasy identity...`.  \n* Knapp: `Sign out`.\n\n**När fantasy-identiteten finns:**\n\n* Rollen `visitor` visas som `Visitor`.  \n* Andra roller visar användarens fantasy-namn, eller `Visitor` om namnet saknas.  \n* Rollraden visar `Administrator` eller `Editor`.\n\n🔗 **Anropar:** `ClerkAuthentication.isSignedIn()`.\n\n⚙️ **Effekt:** Uppdaterar statustext, rolltext och knapptext samt aktiverar knappen.\n\n💡 **Begrepp — Rendering:** Att omvandla aktuellt tillstånd till det som användaren ser i gränssnittet."
        },
        {
          "kind": "function",
          "name": "LoginPage.#handleAction()",
          "identifier": "LoginPage.#handleAction()",
          "anchor": "LoginPage-handleAction",
          "line": 118,
          "text": "Hanterar klick på inloggnings- eller utloggningsknappen.\n\n**Arbetsgång:**\n\n1. Inaktiverar knappen.  \n2. Kontrollerar `ClerkAuthentication.isSignedIn()`.  \n3. Om användaren är inloggad anropas `signOut()`.  \n4. Annars anropas `signIn()`.  \n5. Om något misslyckas loggas felet och texten `Authentication failed. Please try again.` visas.  \n6. I `finally` anropas `#updateAuthenticationState()`.\n\n⚙️ **Effekt:** Startar rätt Clerk-operation och uppdaterar panelen efteråt.\n\n💡 **Viktig detalj:** Eftersom `finally` renderar panelen igen kan felmeddelandet ersättas av den vanliga statustexten.\n\n---"
        }
      ],
      "notes": [
        "### **🚀 Vid applikationens uppstart**\n\n`main.ts` → `ClerkAuthentication.constructor()` → `ConvexConnection.constructor()` → `Authentication.initialize()`.\n\n### **🎟️ När Convex behöver en token**\n\n`ConvexClient.setAuth()` → tokenhämtaren → `ClerkAuthentication.getConvexToken()` → Clerk-sessionens `getToken()`.\n\n### **🔐 När användaren loggar in**\n\n`LoginPage.#handleAction()` → `ClerkAuthentication.signIn()` → Clerk → autentiseringslyssnaren → `LoginPage.#updateAuthenticationState()` → `Authentication.refreshFantasyIdentity()`.\n\n### **👤 När fantasy-identiteten har hämtats**\n\nConvex-frågan `currentUser` → `ApplicationState.setCurrentIdentity()` → `LoginPage.setFantasyIdentity()` → `LoginPage.#render()`.\n\n---"
      ]
    },
    {
      "path": "src/application/editor/editor-layout.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🏗️ 1\\. EditorLayout — Editorns övergripande layout**\n\n\nKlassen `EditorLayout` bygger själva redigerarens tre huvudkolumner."
        },
        {
          "kind": "function",
          "name": "EditorLayout.constructor()",
          "identifier": "EditorLayout.constructor()",
          "anchor": "EditorLayout-constructor",
          "line": 12,
          "text": "Skapar redigerarens layout och de tre huvuddelarna.\n\n**Arbetsgång:**\n\n1. Skapar rotelementet `div.editor-layout`.  \n2. Skapar `LeftPanel`, som innehåller verktygen.  \n3. Skapar `MapArea`, som innehåller kartan.  \n4. Skapar `RightPanel`, som innehåller bland annat minikartan och redigeringskontrollerna.  \n5. Skickar samma `MapGrid` till högerpanelen som kartytan använder.  \n6. Lägger in de tre delarna i layoutens DOM-element.\n\n🔗 **Anropas av:** `ApplicationLayout.constructor()`.\n\n⚙️ **Effekt:** Bygger redigerarens DOM-struktur.\n\n💡 **Arkitekturprincip:** Composition. Layouten byggs av flera mindre komponenter som har tydliga ansvarsområden."
        },
        {
          "kind": "function",
          "name": "EditorLayout.setWorldInformation()",
          "identifier": "EditorLayout.setWorldInformation()",
          "anchor": "EditorLayout-setWorldInformation",
          "line": 29,
          "text": "Uppdaterar världens titel och namnet på den tilldelade redigeraren.\n\n🔗 **Anropar:**\n\n* `LeftPanel.setWorldTitle(worldTitle)`  \n* `RightPanel.setEditorTitle(editorTitle)`\n\n🔗 **Anropas av:** `WorldSelection.selectWorld()`.\n\n⚙️ **Effekt:** Uppdaterar två texter i gränssnittet utan att själv hämta några data.\n\n---"
        }
      ],
      "notes": [
        "### **🏗️ När editorn byggs**\n\n`ApplicationLayout` → `EditorLayout` → `LeftPanel` \\+ `MapArea` \\+ `RightPanel`.\n\n### **🗺️ När kartytan skapas**\n\n`EditorLayout` → `MapArea` → `MapGrid`.\n\n### **🧭 När användaren byter vy**\n\n`Header` → knappens klickcallback → `main.ts` → `Navigation.showView()` → `Header.setView()`.\n\n### **🌱 När en terrängknapp skapas**\n\n`LeftPanel` → `TerrainButton` → `ToolButton` → särskild SVG-grafik.\n\n### **🎯 När användaren väljer ett verktyg**\n\n`ToolSection.addButton()` → klickcallback → `ToolSection.#select()` → `ToolButton.setSelected()`.\n\n---"
      ]
    },
    {
      "path": "src/application/editor/header.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🧭 2\\. Header — Sidhuvud och navigation**\n\n\nKlassen `Header` bygger applikationens sidhuvud och hanterar de fyra knapparna för huvudvyerna."
        },
        {
          "kind": "function",
          "name": "Header.constructor()",
          "identifier": "Header.constructor()",
          "anchor": "Header-constructor",
          "line": 23,
          "text": "Skapar sidhuvudet och dess navigationsknappar.\n\n**Arbetsgång:**\n\n1. Sparar callbacken `onChange`.  \n2. Skapar `header.editor-header`.  \n3. Anropar `createHeaderMark()` för märket.  \n4. Anropar `#createTitle()` för rubriken.  \n5. Anropar `#createModes()` för navigationsknapparna.  \n6. Markerar `map-gallery` som vald.  \n7. Inaktiverar World Builder-knappen tills en värld har valts.\n\n🔗 **Anropas av:** `ApplicationLayout.constructor()`.\n\n⚙️ **Effekt:** Skapar ett färdigt sidhuvud med Map Gallery som aktivt läge."
        },
        {
          "kind": "function",
          "name": "Header.setView()",
          "identifier": "Header.setView()",
          "anchor": "Header-setView",
          "line": 39,
          "text": "Markerar vilken navigationsknapp som motsvarar den aktiva vyn.\n\n**Arbetsgång:**\n\n1. Går igenom knapparna i `#buttons`.  \n2. Den aktiva knappen får CSS-klassen `is-selected`.  \n3. Den aktiva knappen får `aria-pressed=\"true\"`.  \n4. Övriga knappar förlorar klassen och får `aria-pressed=\"false\"`.\n\n🔗 **Anropas av:** Konstruktorn och `Navigation.showView()`.\n\n⚙️ **Effekt:** Uppdaterar knapparnas visuella och tillgänglighetsrelaterade tillstånd.\n\n💡 **Viktig skillnad:** `Header.setView()` markerar rätt knapp. Det är `Navigation.showView()` som faktiskt byter synlig vy."
        },
        {
          "kind": "function",
          "name": "Header.setWorldBuilderAvailable()",
          "identifier": "Header.setWorldBuilderAvailable()",
          "anchor": "Header-setWorldBuilderAvailable",
          "line": 47,
          "text": "Bestämmer om användaren får klicka på World Builder-knappen.\n\n**När `available` är `false`:**\n\n* Knappen inaktiveras.  \n* Hjälptexten blir `Select a world in Map Gallery first`.\n\n**När `available` är `true`:**\n\n* Knappen aktiveras.  \n* Hjälptexten töms.\n\n🔗 **Anropas av:** Konstruktorn och `WorldSelection.selectWorld()`.\n\n⚙️ **Effekt:** Ändrar knappens `disabled`\\-egenskap och `title`."
        },
        {
          "kind": "function",
          "name": "Header.#createTitle()",
          "identifier": "Header.#createTitle()",
          "anchor": "Header-createTitle",
          "line": 56,
          "text": "Skapar sidhuvudets rubrik:\n\n**Civilization of Wonders — World Builder**\n\nRubriken byggs med ett `p`\\-element och tre `span`\\-element för namnet, tankstrecket och lägesnamnet.\n\n🔗 **Anropas av:** `Header.constructor()`.\n\n⚙️ **Effekt:** Returnerar rubrikelementet som konstruktorn placerar i sidhuvudet."
        },
        {
          "kind": "function",
          "name": "Header.#createModes()",
          "identifier": "Header.#createModes()",
          "anchor": "Header-createModes",
          "line": 76,
          "text": "Skapar navigationsknapparna för de fyra huvudvyerna:\n\n* 🗺️ Map Gallery  \n* 🏗️ World Builder  \n* 👥 Visitors & Login  \n* 📚 CoW Wiki\n\n**Arbetsgång:**\n\n1. Läser definitionerna i `APP_VIEWS`.  \n2. Skapar `nav.editor-header__modes`.  \n3. Sätter `aria-label` till `Application views`.  \n4. Skapar en knapp för varje vy.  \n5. Registrerar en klicklyssnare på varje knapp.  \n6. Sparar knapparna i `#buttons` med respektive `AppView` som nyckel.\n\n⚙️ **Effekt:** Returnerar navigationselementet till konstruktorn."
        },
        {
          "kind": "function",
          "name": "Klick på vyknapp",
          "identifier": "klick på vyknapp",
          "anchor": "klick-på-vyknapp",
          "line": 87,
          "text": "Callback som körs när användaren klickar på en navigationsknapp.\n\n🔗 **Anropar:** `#onChange(view)`.\n\nAnropet går vidare genom `ApplicationLayout` och callbacken i `main.ts` till `Navigation.showView()`.\n\n⚙️ **Effekt:** Begär ett vybyte.\n\n💡 **Begrepp — Closure:** Varje klicklyssnare kommer ihåg sin egen `view` från loopen där knappen skapades.\n\n---"
        }
      ],
      "notes": [
        "### **🏗️ När editorn byggs**\n\n`ApplicationLayout` → `EditorLayout` → `LeftPanel` \\+ `MapArea` \\+ `RightPanel`.\n\n### **🗺️ När kartytan skapas**\n\n`EditorLayout` → `MapArea` → `MapGrid`.\n\n### **🧭 När användaren byter vy**\n\n`Header` → knappens klickcallback → `main.ts` → `Navigation.showView()` → `Header.setView()`.\n\n### **🌱 När en terrängknapp skapas**\n\n`LeftPanel` → `TerrainButton` → `ToolButton` → särskild SVG-grafik.\n\n### **🎯 När användaren väljer ett verktyg**\n\n`ToolSection.addButton()` → klickcallback → `ToolSection.#select()` → `ToolButton.setSelected()`.\n\n---"
      ]
    },
    {
      "path": "src/application/editor/map-area.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🗺️ 3\\. MapArea — Kartans behållare**\n\n\nKlassen `MapArea` fungerar som en behållare för kartans `MapGrid`."
        },
        {
          "kind": "function",
          "name": "MapArea.element",
          "identifier": "MapArea.element",
          "anchor": "MapArea-element",
          "line": 7,
          "text": "En getter som returnerar kartytans rotelement.\n\n🔗 **Läser:** `#element`.\n\n🔗 **Används av:** `EditorLayout.constructor()`.\n\n⚙️ **Effekt:** Endast läsning."
        },
        {
          "kind": "function",
          "name": "MapArea.mapGrid",
          "identifier": "MapArea.mapGrid",
          "anchor": "MapArea-mapGrid",
          "line": 11,
          "text": "En getter som returnerar kartans `MapGrid`\\-instans.\n\n🔗 **Läser:** `#mapGrid`.\n\n🔗 **Används av:** `EditorLayout`, `ApplicationLayout` och hexklickhanteringen i `main.ts`.\n\n⚙️ **Effekt:** Endast läsning.\n\n💡 **Arkitekturprincip:** Encapsulation. Objektet ger kontrollerad åtkomst till sina interna referenser genom getters."
        },
        {
          "kind": "function",
          "name": "MapArea.constructor()",
          "identifier": "MapArea.constructor()",
          "anchor": "MapArea-constructor",
          "line": 15,
          "text": "Skapar kartans behållare och själva hexrutnätet.\n\n**Arbetsgång:**\n\n1. Skapar `div.editor-layout__map-area`.  \n2. Skapar en `MapGrid`.  \n3. Lägger `mapGrid.element` i behållaren.\n\n🔗 **Anropas av:** `EditorLayout.constructor()`.\n\n⚙️ **Effekt:** Skapar kartytans DOM-struktur. Själva hexrutnätets uppbyggnad sköts av `MapGrid`.\n\n---"
        }
      ],
      "notes": [
        "### **🏗️ När editorn byggs**\n\n`ApplicationLayout` → `EditorLayout` → `LeftPanel` \\+ `MapArea` \\+ `RightPanel`.\n\n### **🗺️ När kartytan skapas**\n\n`EditorLayout` → `MapArea` → `MapGrid`.\n\n### **🧭 När användaren byter vy**\n\n`Header` → knappens klickcallback → `main.ts` → `Navigation.showView()` → `Header.setView()`.\n\n### **🌱 När en terrängknapp skapas**\n\n`LeftPanel` → `TerrainButton` → `ToolButton` → särskild SVG-grafik.\n\n### **🎯 När användaren väljer ett verktyg**\n\n`ToolSection.addButton()` → klickcallback → `ToolSection.#select()` → `ToolButton.setSelected()`.\n\n---"
      ]
    },
    {
      "path": "src/application/editor/tool-button.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🔘 4\\. ToolButton — Grundklassen för verktygsknappar**\n\n\nKlassen `ToolButton` representerar en verktygsknapp med ID, ikon, etikett och eventuell urvalsgrupp."
        },
        {
          "kind": "function",
          "name": "ToolButton.constructor()",
          "identifier": "ToolButton.constructor()",
          "anchor": "ToolButton-constructor",
          "line": 9,
          "text": "Skapar en verktygsknapp med SVG-ikon.\n\n**Arbetsgång:**\n\n1. Skapar `button.tool-button`.  \n2. Sätter `title` och `aria-label` till knappens etikett.  \n3. Sparar knappens ID.  \n4. Sparar eventuell grupp.  \n5. Sätter `aria-pressed=\"false\"` om knappen tillhör en grupp.  \n6. Anropar `createIcon(icon)` från `icons.ts`.  \n7. Lägger CSS-klassen `tool-icon` på ikonen.\n\n🔗 **Anropas av:** `LeftPanel`, `RightPanel` och subklassen `TerrainButton`.\n\n⚙️ **Effekt:** Skapar en knapp som från början inte är vald.\n\nIngen klicklyssnare registreras här."
        },
        {
          "kind": "function",
          "name": "ToolButton.id",
          "identifier": "ToolButton.id",
          "anchor": "ToolButton-id",
          "line": 28,
          "text": "Getter som returnerar knappens ID.\n\n🔗 **Läser:** `#id`.\n\n🔗 **Används av:** Terrängklickhanteringen i `LeftPanel`.\n\n⚙️ **Effekt:** Endast läsning."
        },
        {
          "kind": "function",
          "name": "ToolButton.group",
          "identifier": "ToolButton.group",
          "anchor": "ToolButton-group",
          "line": 32,
          "text": "Getter som returnerar knappens grupp, eller `undefined` om ingen grupp finns.\n\n🔗 **Läser:** `#group`.\n\n🔗 **Används av:** `ToolSection.#select()`.\n\n⚙️ **Effekt:** Endast läsning."
        },
        {
          "kind": "function",
          "name": "ToolButton.setSelected()",
          "identifier": "ToolButton.setSelected()",
          "anchor": "ToolButton-setSelected",
          "line": 36,
          "text": "Markerar eller avmarkerar en verktygsknapp.\n\n**Arbetsgång:**\n\n1. Sätter eller tar bort CSS-klassen `is-selected`.  \n2. Om knappen tillhör en grupp uppdateras `aria-pressed`.\n\n🔗 **Anropas av:** `ToolSection.#select()` och `LeftPanel.constructor()`.\n\n⚙️ **Effekt:** Ändrar knappens visuella tillstånd och dess tillgänglighetsinformation.\n\n---"
        }
      ],
      "notes": [
        "### **🏗️ När editorn byggs**\n\n`ApplicationLayout` → `EditorLayout` → `LeftPanel` \\+ `MapArea` \\+ `RightPanel`.\n\n### **🗺️ När kartytan skapas**\n\n`EditorLayout` → `MapArea` → `MapGrid`.\n\n### **🧭 När användaren byter vy**\n\n`Header` → knappens klickcallback → `main.ts` → `Navigation.showView()` → `Header.setView()`.\n\n### **🌱 När en terrängknapp skapas**\n\n`LeftPanel` → `TerrainButton` → `ToolButton` → särskild SVG-grafik.\n\n### **🎯 När användaren väljer ett verktyg**\n\n`ToolSection.addButton()` → klickcallback → `ToolSection.#select()` → `ToolButton.setSelected()`.\n\n---"
      ]
    },
    {
      "path": "src/application/editor/terrain-button.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🌱 5\\. TerrainButton — Specialiserad terrängknapp**"
        },
        {
          "kind": "function",
          "name": "TerrainButton.constructor()",
          "identifier": "TerrainButton.constructor()",
          "anchor": "TerrainButton-constructor",
          "line": 5,
          "text": "Skapar en terrängknapp med en särskild SVG-grafik.\n\n**Arbetsgång:**\n\n1. Anropar basklassens konstruktor genom `super(id, label, 'grass', 'terrain')`.  \n2. Skapar därmed först en vanlig `ToolButton`.  \n3. Anropar den inskickade funktionen `createGraphic()`.  \n4. Lägger klassen `tool-icon` på den skapade grafiken.  \n5. Ersätter knappens innehåll med grafiken genom `replaceChildren()`.\n\n🔗 **Anropas av:** `LeftPanel.constructor()`.\n\n⚙️ **Effekt:** Skapar en knapp som alltid tillhör urvalsgruppen `terrain`.\n\nDen tillfälliga gräsikonen från basklassen ersätts av den specifika terränggrafiken.\n\n💡 **Arkitekturprincip — Inheritance:** `TerrainButton` ärver från `ToolButton` och återanvänder dess grundläggande funktionalitet.\n\n💡 **Arkitekturprincip — Specialization:** Subklassen anpassar knappens innehåll för ett särskilt användningsområde.\n\n---"
        }
      ],
      "notes": [
        "### **🏗️ När editorn byggs**\n\n`ApplicationLayout` → `EditorLayout` → `LeftPanel` \\+ `MapArea` \\+ `RightPanel`.\n\n### **🗺️ När kartytan skapas**\n\n`EditorLayout` → `MapArea` → `MapGrid`.\n\n### **🧭 När användaren byter vy**\n\n`Header` → knappens klickcallback → `main.ts` → `Navigation.showView()` → `Header.setView()`.\n\n### **🌱 När en terrängknapp skapas**\n\n`LeftPanel` → `TerrainButton` → `ToolButton` → särskild SVG-grafik.\n\n### **🎯 När användaren väljer ett verktyg**\n\n`ToolSection.addButton()` → klickcallback → `ToolSection.#select()` → `ToolButton.setSelected()`.\n\n---"
      ]
    },
    {
      "path": "src/application/editor/tool-section.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🧰 6\\. ToolSection — Organiserar verktygsknappar**\n\n\nKlassen `ToolSection` bygger en sektion med rubrik och knappar."
        },
        {
          "kind": "function",
          "name": "ToolSection.constructor()",
          "identifier": "ToolSection.constructor()",
          "anchor": "ToolSection-constructor",
          "line": 10,
          "text": "Skapar en tom verktygssektion.\n\n**Element som skapas:**\n\n* `section.tool-section`  \n* En `h2` med sektionens titel  \n* `div.tool-section__body`  \n* `div.tool-grid`\n\nKnappfältet `#buttons` startar tomt.\n\n🔗 **Anropas av:** `LeftPanel.constructor()` och `RightPanel.constructor()`.\n\n⚙️ **Effekt:** Skapar en sektion utan knappar."
        },
        {
          "kind": "function",
          "name": "ToolSection.addGridClass()",
          "identifier": "ToolSection.addGridClass()",
          "anchor": "ToolSection-addGridClass",
          "line": 29,
          "text": "Lägger till en extra CSS-klass på sektionens knapprutnät.\n\n🔗 **Anropar:** `#grid.classList.add(className)`.\n\n🔗 **Anropas av:** `LeftPanel.constructor()`, som lägger till klassen `terrain-grid`.\n\n⚙️ **Effekt:** Ändrar rutnätets CSS-klasser."
        },
        {
          "kind": "function",
          "name": "ToolSection.addButton()",
          "identifier": "ToolSection.addButton()",
          "anchor": "ToolSection-addButton",
          "line": 33,
          "text": "Lägger till en verktygsknapp i sektionen.\n\n**Arbetsgång:**\n\n1. Sparar knappen i `#buttons`.  \n2. Lägger knappens DOM-element i rutnätet.  \n3. Registrerar en klicklyssnare.\n\n🔗 **Anropas av:** `LeftPanel.constructor()` och `RightPanel.constructor()`.\n\n⚙️ **Effekt:** Knappen blir synlig och kan reagera på klick."
        },
        {
          "kind": "function",
          "name": "Klick på verktygsknapp",
          "identifier": "klick på verktygsknapp",
          "anchor": "klick-på-verktygsknapp",
          "line": 36,
          "text": "Callback som körs när användaren klickar på en knapp i sektionen.\n\n🔗 **Anropar:** `ToolSection.#select(button)`.\n\nVarje klicklyssnare kommer ihåg vilken knapp den tillhör.\n\n⚙️ **Effekt:** Startar urvalslogiken. Själva logiken dokumenteras i del 06\\.\n\n---"
        },
        {
          "kind": "prose",
          "text": "## **🧰 1\\. ToolSection — Hanterar verktygsgrupper**\n\n\nKlassen `ToolSection` organiserar verktygsknappar i sektioner och hanterar vilka knappar som är valda.\n\nDe första metoderna dokumenterades i del 05\\. Här avslutar vi klassen."
        },
        {
          "kind": "function",
          "name": "ToolSection.setUnavailable()",
          "identifier": "ToolSection.setUnavailable()",
          "anchor": "ToolSection-setUnavailable",
          "line": 39,
          "text": "Markerar en hel verktygssektion som otillgänglig.\n\n**Arbetsgång:**\n\n1. Lägger CSS-klassen `tool-section--unavailable` på sektionens rotelement.  \n2. Går igenom alla knappar i `#buttons`.  \n3. Sätter `button.element.disabled = true` för varje knapp.\n\n🔗 **Anropas av:** `LeftPanel.constructor()` för sektionerna Brush, Features, Resources och Rivers.\n\n⚙️ **Effekt:** Knapparna i dessa sektioner inaktiveras.\n\nTerrängsektionen och högerpanelens sektioner omfattas inte av de bekräftade anropen.\n\n💡 **Arkitekturprincip — Encapsulation:** Sektionen ansvarar själv för att inaktivera sina knappar. Anroparen behöver inte känna till hur knapparna lagras internt."
        },
        {
          "kind": "function",
          "name": "ToolSection.#select()",
          "identifier": "ToolSection.#select()",
          "anchor": "ToolSection-select",
          "line": 47,
          "text": "Hanterar valet av en verktygsknapp inom dess urvalsgrupp.\n\n**Arbetsgång:**\n\n1. Tar emot den klickade knappen.  \n2. Läser `button.group`.  \n3. Om knappen saknar grupp avslutas metoden.  \n4. Annars går den igenom knapparna och uppdaterar dem som tillhör samma grupp.\n\n🔗 **Anropas av:** Klicklyssnaren som registreras i `ToolSection.addButton()`.\n\n⚙️ **Effekt:** Endast knappar inom den aktuella gruppen kan få ändrat valt tillstånd.\n\nKnappar utan grupp, exempelvis Undo och Redo, ändrar inte någon markering genom denna metod.\n\n💡 **Viktig skillnad:** Att en knapp kan klickas betyder inte automatiskt att den ska vara markerad som ett aktivt verktyg."
        },
        {
          "kind": "function",
          "name": "Gruppjämförelse i #select()",
          "identifier": "gruppjämförelse i #select()",
          "anchor": "gruppjämförelse-i-select",
          "line": 52,
          "text": "En callback som jämför varje knapp med den klickade knappens grupp.\n\n**Arbetsgång:**\n\n1. Jämför `otherButton.group` med `button.group`.  \n2. Om grupperna matchar anropas `ToolButton.setSelected()`.  \n3. Argumentet är `true` endast om `otherButton` och `button` är samma objekt.  \n4. Övriga knappar i gruppen får `false`.\n\n⚙️ **Effekt:** Den klickade knappen markeras och övriga knappar i samma grupp avmarkeras.\n\n💡 **Begrepp — Object Identity:** Två variabler refererar till samma objekt när de jämförs med `===` och resultatet är `true`.\n\n💡 **Arkitekturprincip:** Ömsesidigt uteslutande val inom en grupp, liknande radioknappar.\n\n---"
        }
      ],
      "notes": [
        "### **🏗️ När editorn byggs**\n\n`ApplicationLayout` → `EditorLayout` → `LeftPanel` \\+ `MapArea` \\+ `RightPanel`.\n\n### **🗺️ När kartytan skapas**\n\n`EditorLayout` → `MapArea` → `MapGrid`.\n\n### **🧭 När användaren byter vy**\n\n`Header` → knappens klickcallback → `main.ts` → `Navigation.showView()` → `Header.setView()`.\n\n### **🌱 När en terrängknapp skapas**\n\n`LeftPanel` → `TerrainButton` → `ToolButton` → särskild SVG-grafik.\n\n### **🎯 När användaren väljer ett verktyg**\n\n`ToolSection.addButton()` → klickcallback → `ToolSection.#select()` → `ToolButton.setSelected()`.\n\n---",
        "### **🎯 När användaren väljer ett verktyg**\n\n`ToolSection.addButton()` → klicklyssnare → `ToolSection.#select()` → gruppjämförelse → `ToolButton.setSelected()`.\n\n### **✏️ När Edit blir Stop Editing**\n\n`EditingControls.update()` → `RightPanel.setEditing()` → `EditorActionButton.setLabel()` \\+ `EditorActionButton.setIcon()`.\n\n### **🖼️ När en redigeringsikon skapas**\n\n`EditorActionButton` → `createEditorActionIcon()` → motsvarande SVG-ritfunktion.\n\n### **🌱 När en vanlig verktygsikon skapas**\n\n`ToolButton` → `createIcon()` → motsvarande SVG-ritfunktion i grafikbiblioteket.\n\n---"
      ]
    },
    {
      "path": "src/application/editor/editor-action-button.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🔘 2\\. EditorActionButton — Redigeringsknappar med ikon och text**\n\n\nKlassen `EditorActionButton` skapar knappar för redigeringsåtgärder.\n\nTill skillnad från en vanlig `ToolButton` innehåller dessa knappar både en ikon och en synlig textetikett."
        },
        {
          "kind": "function",
          "name": "EditorActionButton.constructor()",
          "identifier": "EditorActionButton.constructor()",
          "anchor": "EditorActionButton-constructor",
          "line": 13,
          "text": "Skapar en redigeringsknapp med ikon, text och klickfunktion.\n\n**Arbetsgång:**\n\n1. Skapar `button.tool-button.editor-action-button`.  \n2. Skapar en `span` för ikonen.  \n3. Anropar `createEditorActionIcon(icon)`.  \n4. Lägger CSS-klassen `tool-icon` på SVG-elementet.  \n5. Skapar en `span` för textetiketten.  \n6. Sätter etikettens text till `label`.  \n7. Registrerar `onClick` med `addEventListener('click', onClick)`.\n\n🔗 **Anropas av:** `RightPanel.constructor()`.\n\n**Knappar som skapas:**\n\n* 👍 Like — med en tom callback.  \n* ✏️ Edit — med callback för redigeringsåtgärden.  \n* 👑 Take Over — med callback för övertagande.\n\n⚙️ **Effekt:** Knapparna skapas som synliga och aktiva.\n\nHögerpanelen döljer sedan Edit och Take Over och inaktiverar Like.\n\n💡 **Arkitekturprincip — Dependency Injection:** Klickbeteendet skickas in som en funktion. Knappklassen behöver därför inte veta vad åtgärden faktiskt gör."
        },
        {
          "kind": "function",
          "name": "EditorActionButton.setLabel()",
          "identifier": "EditorActionButton.setLabel()",
          "anchor": "EditorActionButton-setLabel",
          "line": 41,
          "text": "Ändrar knappens synliga text.\n\n🔗 **Ändrar:** `#labelElement.textContent`.\n\n🔗 **Anropas av:** `RightPanel.setEditing()`.\n\n**Exempel:**\n\n* När användaren redigerar: `Stop Editing`.  \n* Annars: `Edit`.\n\n⚙️ **Effekt:** Uppdaterar texten utan att ändra ikonen."
        },
        {
          "kind": "function",
          "name": "EditorActionButton.setIcon()",
          "identifier": "EditorActionButton.setIcon()",
          "anchor": "EditorActionButton-setIcon",
          "line": 45,
          "text": "Byter ut knappens SVG-ikon.\n\n**Arbetsgång:**\n\n1. Anropar `createEditorActionIcon(icon)`.  \n2. Lägger till CSS-klassen `tool-icon`.  \n3. Ersätter den tidigare ikonen med `replaceChildren()`.\n\n🔗 **Anropas av:** `RightPanel.setEditing()`.\n\n**Möjliga ikoner i detta flöde:**\n\n* `edit`  \n* `stop-editing`\n\n⚙️ **Effekt:** Den gamla ikonen tas bort och en ny visas.\n\n💡 **Begrepp — DOM Replacement:** Att ersätta befintliga element i dokumentträdet med nya element."
        },
        {
          "kind": "function",
          "name": "EditorActionButton.setDisabled()",
          "identifier": "EditorActionButton.setDisabled()",
          "anchor": "EditorActionButton-setDisabled",
          "line": 51,
          "text": "Aktiverar eller inaktiverar en knapp.\n\n🔗 **Ändrar:** `element.disabled`.\n\n🔗 **Anropas av:** `RightPanel.constructor()` och `RightPanel.setEditingButtonsDisabled()`.\n\n⚙️ **Effekt:** En inaktiverad knapp kan inte aktiveras genom ett vanligt användarklick.\n\nLike-knappen inaktiveras i konstruktorn. Edit och Take Over kan tillfälligt inaktiveras medan en redigeringsåtgärd pågår."
        },
        {
          "kind": "function",
          "name": "EditorActionButton.setVisible()",
          "identifier": "EditorActionButton.setVisible()",
          "anchor": "EditorActionButton-setVisible",
          "line": 55,
          "text": "Visar eller döljer en knapp.\n\n🔗 **Ändrar:** `element.hidden = !visible`.\n\n🔗 **Anropas av:** `RightPanel.constructor()`, `setEditButtonVisible()` och `setTakeoverButtonVisible()`.\n\n⚙️ **Effekt:** Knappen visas eller döljs.\n\n💡 **Viktig skillnad:**\n\n`hidden` avgör om knappen visas.\n\n`disabled` avgör om knappen kan användas.\n\nEn knapp kan alltså vara synlig men inaktiverad.\n\n---"
        }
      ],
      "notes": [
        "### **🎯 När användaren väljer ett verktyg**\n\n`ToolSection.addButton()` → klicklyssnare → `ToolSection.#select()` → gruppjämförelse → `ToolButton.setSelected()`.\n\n### **✏️ När Edit blir Stop Editing**\n\n`EditingControls.update()` → `RightPanel.setEditing()` → `EditorActionButton.setLabel()` \\+ `EditorActionButton.setIcon()`.\n\n### **🖼️ När en redigeringsikon skapas**\n\n`EditorActionButton` → `createEditorActionIcon()` → motsvarande SVG-ritfunktion.\n\n### **🌱 När en vanlig verktygsikon skapas**\n\n`ToolButton` → `createIcon()` → motsvarande SVG-ritfunktion i grafikbiblioteket.\n\n---"
      ]
    },
    {
      "path": "src/application/editor/editor-action-icons.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🖼️ 3\\. EditorActionIcons — Ikonval för redigeringsknappar**"
        },
        {
          "kind": "function",
          "name": "createEditorActionIcon()",
          "identifier": "createEditorActionIcon()",
          "anchor": "createEditorActionIcon",
          "line": 20,
          "text": "Väljer rätt SVG-ritfunktion utifrån ett ikonnamn.\n\n**Tillgängliga ikonval:**\n\n* ✏️ `edit` → `createEditIcon`  \n* 🛑 `stop-editing` → `createStopEditingIcon`  \n* 👑 `take-over` → `createTakeOverIcon`  \n* 👍 `like` → `createLikeIcon`\n\n**Arbetsgång:**\n\n1. Tar emot ett ikonnamn.  \n2. Slår upp namnet i objektet `drawers`.  \n3. Anropar motsvarande ritfunktion.  \n4. Returnerar ett nytt `SVGSVGElement`.\n\n🔗 **Anropas av:** `EditorActionButton.constructor()` och `EditorActionButton.setIcon()`.\n\n⚙️ **Effekt:** Skapar och returnerar SVG-grafik.\n\nFunktionen monterar inte själv grafiken i DOM och använder ingen cache.\n\n💡 **Arkitekturprincip — Dispatch Table:** En uppslagstabell kopplar olika nycklar till funktioner. Det är ett alternativ till långa kedjor av `if` eller `switch`.\n\n---"
        }
      ],
      "notes": [
        "### **🎯 När användaren väljer ett verktyg**\n\n`ToolSection.addButton()` → klicklyssnare → `ToolSection.#select()` → gruppjämförelse → `ToolButton.setSelected()`.\n\n### **✏️ När Edit blir Stop Editing**\n\n`EditingControls.update()` → `RightPanel.setEditing()` → `EditorActionButton.setLabel()` \\+ `EditorActionButton.setIcon()`.\n\n### **🖼️ När en redigeringsikon skapas**\n\n`EditorActionButton` → `createEditorActionIcon()` → motsvarande SVG-ritfunktion.\n\n### **🌱 När en vanlig verktygsikon skapas**\n\n`ToolButton` → `createIcon()` → motsvarande SVG-ritfunktion i grafikbiblioteket.\n\n---"
      ]
    },
    {
      "path": "src/application/editor/icons.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🌈 4\\. Icons — Gemensam ikonhantering**"
        },
        {
          "kind": "function",
          "name": "createIcon()",
          "identifier": "createIcon()",
          "anchor": "createIcon",
          "line": 124,
          "text": "Väljer en SVG-ritfunktion utifrån namnet på ett verktyg eller wiki-objekt.\n\nFunktionen använder en uppslagstabell som heter `drawers`.\n\n**Terräng — 7 ikoner**\n\n🌱 `grass`, `plains`, `desert`, `tundra`, `snow`, `coast`, `ocean`\n\n**Terrängegenskaper — 8 ikoner**\n\n🌲 `woods`, `rainforest`, `marsh`, `oasis`, `floodplains`, `ice`, `reef`, `volcano`\n\n**Floder — 3 ikoner**\n\n🌊 `river`, `river-source`, `river-mouth`\n\n**Penslar och historik — 5 ikoner**\n\n🖌️ `brush-small`, `brush-medium`, `brush-large`, `undo`, `redo`\n\n**Underverk — 6 ikoner**\n\n🏛️ `pyramid`, `colossus`, `lighthouse`, `temple`, `gardens`, `observatory`\n\n**Kontinenter — 6 ikoner**\n\n🌍 `continent-crimson`, `continent-blue`, `continent-green`, `continent-gold`, `continent-purple`, `continent-orange`\n\n**Resurser — 8 ikoner**\n\n🌾 `wheat`, `cattle`, `horses`, `deer`, `fish`, `stone`, `iron`, `gold`\n\n**Förbättringar — 8 ikoner**\n\n🏗️ `farm`, `mine`, `quarry`, `camp`, `pasture`, `fishing`, `plantation`, `fort`\n\n**Arbetsgång:**\n\n1. Tar emot ett ikonnamn.  \n2. Söker efter namnet i `drawers`.  \n3. Anropar motsvarande SVG-ritfunktion.  \n4. Returnerar ett nytt `SVGSVGElement`.\n\n🔗 **Anropas av:** `ToolButton.constructor()` och `CivWikiIcons`.\n\n⚙️ **Effekt:** Returnerar SVG-grafik från en ritfunktion i `src/library-svg-graphics/`.\n\nFunktionen har ingen reservgren för okända ikonnamn.\n\n💡 **Arkitekturprincip — Separation of Concerns:** `createIcon()` väljer vilken ikon som ska användas. Den detaljerade SVG-ritningen ligger i separata grafikmoduler.\n\n---"
        }
      ],
      "notes": [
        "### **🎯 När användaren väljer ett verktyg**\n\n`ToolSection.addButton()` → klicklyssnare → `ToolSection.#select()` → gruppjämförelse → `ToolButton.setSelected()`.\n\n### **✏️ När Edit blir Stop Editing**\n\n`EditingControls.update()` → `RightPanel.setEditing()` → `EditorActionButton.setLabel()` \\+ `EditorActionButton.setIcon()`.\n\n### **🖼️ När en redigeringsikon skapas**\n\n`EditorActionButton` → `createEditorActionIcon()` → motsvarande SVG-ritfunktion.\n\n### **🌱 När en vanlig verktygsikon skapas**\n\n`ToolButton` → `createIcon()` → motsvarande SVG-ritfunktion i grafikbiblioteket.\n\n---"
      ]
    },
    {
      "path": "src/application/editor/left-panel.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🎨 1\\. LeftPanel — Vänsterpanelens verktyg och terrängval**\n\n\nKlassen `LeftPanel` bygger verktygspanelen till vänster om kartan.\n\nHär finns bland annat penslar, terrängtyper, terrängegenskaper, resurser och floder."
        },
        {
          "kind": "function",
          "name": "LeftPanel.constructor()",
          "identifier": "LeftPanel.constructor()",
          "anchor": "LeftPanel-constructor",
          "line": 34,
          "text": "Skapar hela vänsterpanelen och dess verktygssektioner.\n\n**DOM-element som skapas:**\n\n* `div.editor-layout__left-panel` — panelens rotelement.  \n* `div.tool-panel__scroll` — panelens rullbara område.  \n* `h2` — världens rubrik, med starttexten `Unedited Map`.\n\n**Verktygssektioner:**\n\n🖌️ **Brush**\n\n* `brush-small`  \n* `brush-medium`  \n* `brush-large`  \n* `undo`  \n* `redo`\n\nPenslarna tillhör gruppen `brush`. Undo och Redo saknar grupp.\n\n🌱 **Terrain**\n\n* Grundterräng: `grass`, `plains`, `desert`, `tundra`, `snow`  \n* Samma fem terrängtyper med suffixet `-hills`  \n* Samma fem terrängtyper med suffixet `-mountains`  \n* Vattenterräng: `coast`, `ocean`\n\nTotalt 17 terrängknappar. Varje knapp använder en egen SVG-ritfunktion.\n\n🌲 **Features**\n\n`woods`, `rainforest`, `marsh`, `oasis`, `floodplains`, `ice`, `reef`, `volcano`\n\n⛏️ **Resources**\n\n`wheat`, `cattle`, `horses`, `deer`, `fish`, `stone`, `iron`, `gold`\n\n🌊 **Rivers**\n\n`river`, `river-source`, `river-mouth`\n\n**Viktiga metodanrop:**\n\n* `new ToolSection()`  \n* `addGridClass('terrain-grid')`  \n* `new ToolButton()`  \n* `new TerrainButton()`  \n* `addButton()`  \n* `setSelected()`  \n* `setUnavailable()`\n\n**Starttillstånd:**\n\n* Mediumpenseln är markerad.  \n* Gräs är markerat som terräng.  \n* `#selectedTerrain` innehåller `grass`.  \n* Brush, Features, Resources och Rivers är inaktiverade.  \n* Terrain är fortfarande klickbar.\n\n🔗 **Anropas av:** `EditorLayout.constructor()`.\n\n⚙️ **Effekt:** Skapar vänsterpanelens DOM och konfigurerar alla verktyg.\n\n💡 **Arkitekturprincip — Composition:** Panelen byggs av återanvändbara komponenter som `ToolSection`, `ToolButton` och `TerrainButton`."
        },
        {
          "kind": "function",
          "name": "Klick på terrängknapp",
          "identifier": "klick på terrängknapp",
          "anchor": "klick-på-terrängknapp",
          "line": 327,
          "text": "En callback som registreras för var och en av de 17 terrängknapparna.\n\n**Arbetsgång:**\n\n1. Användaren klickar på en terrängknapp.  \n2. Callbacken läser knappens `id`.  \n3. Värdet sparas i `#selectedTerrain`.\n\nSamma knapp har också en klicklyssnare från `ToolSection.addButton()`.\n\nDärför sker två saker vid klicket:\n\n* Den valda knappen markeras visuellt.  \n* Terrängens ID sparas som det aktuella målningsvalet.\n\n🔗 **Läses senare av:** `LeftPanel.getSelectedTerrain()` och hexklickhanteringen i `src/main.ts`.\n\n⚙️ **Effekt:** Nästa hexklick kan använda den valda terrängtypen.\n\n💡 **Viktig skillnad:** Ett klick på terrängknappen ändrar inte kartan direkt. Det väljer endast vilken terräng som ska användas vid ett senare hexklick."
        },
        {
          "kind": "function",
          "name": "LeftPanel.element",
          "identifier": "LeftPanel.element",
          "anchor": "LeftPanel-element",
          "line": 370,
          "text": "Getter som returnerar vänsterpanelens rotelement.\n\n🔗 **Läser:** `#element`.\n\n🔗 **Används av:** `EditorLayout.constructor()`.\n\n⚙️ **Effekt:** Endast läsning."
        },
        {
          "kind": "function",
          "name": "LeftPanel.scroll",
          "identifier": "LeftPanel.scroll",
          "anchor": "LeftPanel-scroll",
          "line": 374,
          "text": "Getter som returnerar panelens rullbara område.\n\n🔗 **Läser:** `#scroll`.\n\nCursor hittade ingen annan fil i `src/` som använder denna getter.\n\n⚙️ **Effekt:** Endast läsning."
        },
        {
          "kind": "function",
          "name": "LeftPanel.getSelectedTerrain()",
          "identifier": "LeftPanel.getSelectedTerrain()",
          "anchor": "LeftPanel-getSelectedTerrain",
          "line": 378,
          "text": "Returnerar ID för den senast valda terrängen.\n\n🔗 **Läser:** `#selectedTerrain`.\n\n**Startvärde:** `grass`.\n\n🔗 **Anropas av:** Hexklickhanteringen i `src/main.ts`.\n\n⚙️ **Effekt:** Returnerar terrängvalet utan att ändra något.\n\n💡 **Arkitekturprincip — Encapsulation:** Det privata fältet kan läsas genom en publik metod, men anroparen får inte direkt tillgång till att skriva i fältet."
        },
        {
          "kind": "function",
          "name": "LeftPanel.setWorldTitle()",
          "identifier": "LeftPanel.setWorldTitle()",
          "anchor": "LeftPanel-setWorldTitle",
          "line": 382,
          "text": "Ändrar rubriken ovanför verktygen.\n\n🔗 **Ändrar:** `#heading.textContent`.\n\n🔗 **Anropas av:** `EditorLayout.setWorldInformation()`.\n\n⚙️ **Effekt:** Ersätter rubriktexten. Vid världsval används för närvarande `Unedited Map`.\n\n---"
        }
      ],
      "notes": [
        "### **🌱 När användaren väljer terräng**\n\n`TerrainButton` → klicklyssnaren i `LeftPanel` → `#selectedTerrain` → `getSelectedTerrain()` → hexklicket i `main.ts` → `decideTerrainPaint()`.\n\n### **✏️ När användaren klickar på Edit**\n\n`RightPanel` → `#onEditAction` → `EditingSessionController.handleEditAction()` → Convex.\n\n### **👑 När administratören klickar på Take Over**\n\n`RightPanel` → `#onTakeoverAction` → `EditingSessionController.handleTakeoverAction()` → Convex.\n\n### **📡 När redigeringssessionen förändras**\n\nConvex-prenumerationen → `ApplicationState` → `EditingControls.update()` → `RightPanel.setEditingStatus()` \\+ `setEditing()` \\+ synlighets- och knappstatusmetoderna.\n\n### **🗺️ När minikartan skapas**\n\n`EditorLayout` → `RightPanel` → `MapGrid.getWorldFrame()` → `Minimap` → `Minimap.connect(map)`.\n\n---"
      ]
    },
    {
      "path": "src/application/editor/right-panel.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🧭 2\\. RightPanel — Redigeringskontroller och verktyg**\n\n\nKlassen `RightPanel` bygger panelen till höger om kartan.\n\nHär finns redigerarens namn, sessionsstatus, redigeringsknappar, ytterligare verktygssektioner och minikartan."
        },
        {
          "kind": "function",
          "name": "RightPanel.constructor()",
          "identifier": "RightPanel.constructor()",
          "anchor": "RightPanel-constructor",
          "line": 20,
          "text": "Skapar högerpanelens samtliga delar.\n\n**DOM-element och startvärden:**\n\n* `div.editor-layout__right-panel`  \n* En rullbar verktygscontainer  \n* En `h2` med texten `Unassigned`  \n* En statusrad med texten `Viewing mode`\n\n**Åtgärdsknappar:**\n\n👍 **Like**\n\n* Skapas med `EditorActionButton`.  \n* Har en tom callback.  \n* Inaktiveras.  \n* Får hjälptexten `Likes coming soon`.\n\n✏️ **Edit**\n\n* Skapas med en callback för redigeringsåtgärder.  \n* Döljs från början.\n\n👑 **Take Over**\n\n* Skapas med en callback för administratörens övertagande.  \n* Döljs från början.\n\n**Verktygssektioner:**\n\n🏗️ **Improvements**\n\n`farm`, `mine`, `quarry`, `camp`, `pasture`, `fishing`, `plantation`, `fort`\n\n🏛️ **Wonders**\n\n`pyramid`, `colossus`, `lighthouse`, `temple`, `gardens`, `observatory`\n\n🌍 **Continents**\n\n`continent-crimson`, `continent-blue`, `continent-green`, `continent-gold`, `continent-purple`, `continent-orange`\n\nAlla dessa verktygssektioner lämnas klickbara.\n\nDet finns däremot ingen kod i högerpanelen som sparar vilket av dessa verktyg som har valts.\n\n**Minikartan:**\n\n1. Anropar `map.getWorldFrame()`.  \n2. Skapar en `Minimap`.  \n3. Anropar `minimap.connect(map)`.  \n4. Lägger minikartan sist i panelen.\n\n🔗 **Anropas av:** `EditorLayout.constructor()`.\n\n⚙️ **Effekt:** Skapar hela högerpanelen och ansluter minikartan till samma `MapGrid` som huvudkartan använder.\n\n💡 **Arkitekturprincip — Shared Object Reference:** Huvudkartan och minikartan använder en gemensam kartinstans i stället för att skapa två oberoende kartmodeller."
        },
        {
          "kind": "function",
          "name": "Klick på Edit",
          "identifier": "klick på Edit",
          "anchor": "klick-på-Edit",
          "line": 61,
          "text": "Callback som körs när användaren klickar på Edit-knappen.\n\n🔗 **Anropar:** `#onEditAction`, om callbacken finns.\n\nCallbacken registreras genom `RightPanel.onEdit()`.\n\nI `src/main.ts` kopplas den till `EditingSessionController.handleEditAction()`.\n\n⚙️ **Effekt:** Startar begäran om att börja eller sluta redigera. Själva sessionsändringen sker utanför högerpanelen."
        },
        {
          "kind": "function",
          "name": "Klick på Take Over",
          "identifier": "klick på Take Over",
          "anchor": "klick-på-Take-Over",
          "line": 69,
          "text": "Callback som körs när administratören klickar på Take Over.\n\n🔗 **Anropar:** `#onTakeoverAction`, om callbacken finns.\n\nCallbacken registreras genom `RightPanel.onTakeover()`.\n\nI `src/main.ts` kopplas den till `EditingSessionController.handleTakeoverAction()`.\n\n⚙️ **Effekt:** Startar begäran om övertagande. Högerpanelen utför inte själv någon Convex-mutation."
        },
        {
          "kind": "function",
          "name": "RightPanel.element",
          "identifier": "RightPanel.element",
          "anchor": "RightPanel-element",
          "line": 257,
          "text": "Getter som returnerar högerpanelens rotelement.\n\n🔗 **Läser:** `#element`.\n\n🔗 **Används av:** `EditorLayout.constructor()`.\n\n⚙️ **Effekt:** Endast läsning."
        },
        {
          "kind": "function",
          "name": "RightPanel.scroll",
          "identifier": "RightPanel.scroll",
          "anchor": "RightPanel-scroll",
          "line": 261,
          "text": "Getter som returnerar panelens rullbara verktygsyta.\n\n🔗 **Läser:** `#scroll`.\n\nIngen annan fil i `src/` använder denna getter enligt inventeringen.\n\n⚙️ **Effekt:** Endast läsning."
        },
        {
          "kind": "function",
          "name": "RightPanel.setEditorTitle()",
          "identifier": "RightPanel.setEditorTitle()",
          "anchor": "RightPanel-setEditorTitle",
          "line": 265,
          "text": "Uppdaterar rubriken med namnet på världens tilldelade redigerare.\n\n🔗 **Ändrar:** `#heading.textContent`.\n\n🔗 **Anropas av:**\n\n* `EditorLayout.setWorldInformation()`, med `Loading...`.  \n* `AssignedEditor.refresh()`, med redigerarens fantasy-namn eller `Unassigned`.\n\n⚙️ **Effekt:** Uppdaterar redigerarrubriken."
        },
        {
          "kind": "function",
          "name": "RightPanel.setEditingStatus()",
          "identifier": "RightPanel.setEditingStatus()",
          "anchor": "RightPanel-setEditingStatus",
          "line": 269,
          "text": "Uppdaterar statusraden ovanför redigeringsknapparna.\n\n🔗 **Ändrar:** `#editingStatus.textContent`.\n\n🔗 **Anropas av:** `EditingControls.update()`.\n\n**Möjliga statustexter:**\n\n* `Loading status...`  \n* `Editing: ${session.fantasyName}`  \n* `Viewing mode`\n\n⚙️ **Effekt:** Visar det aktuella redigeringsläget för användaren."
        },
        {
          "kind": "function",
          "name": "RightPanel.setEditing()",
          "identifier": "RightPanel.setEditing()",
          "anchor": "RightPanel-setEditing",
          "line": 273,
          "text": "Växlar Edit-knappens text och ikon beroende på om användaren redigerar.\n\n**När `isEditing` är `true`:**\n\n* Text: `Stop Editing`  \n* Ikon: `stop-editing`\n\n**När `isEditing` är `false`:**\n\n* Text: `Edit`  \n* Ikon: `edit`\n\n🔗 **Anropar:** `EditorActionButton.setLabel()` och `EditorActionButton.setIcon()`.\n\n🔗 **Anropas av:** `EditingControls.update()`.\n\n⚙️ **Effekt:** Uppdaterar knappens utseende.\n\nMetoden ändrar inte knappens synlighet eller `disabled`\\-status."
        },
        {
          "kind": "function",
          "name": "RightPanel.setEditButtonVisible()",
          "identifier": "RightPanel.setEditButtonVisible()",
          "anchor": "RightPanel-setEditButtonVisible",
          "line": 283,
          "text": "Visar eller döljer Edit-knappen.\n\n🔗 **Anropar:** `#editButton.setVisible(visible)`.\n\n🔗 **Anropas av:** `EditingControls.update()`.\n\n⚙️ **Effekt:** Styr Edit-knappens `hidden`\\-egenskap."
        },
        {
          "kind": "function",
          "name": "RightPanel.setTakeoverButtonVisible()",
          "identifier": "RightPanel.setTakeoverButtonVisible()",
          "anchor": "RightPanel-setTakeoverButtonVisible",
          "line": 287,
          "text": "Visar eller döljer Take Over-knappen.\n\n🔗 **Anropar:** `#takeoverButton.setVisible(visible)`.\n\n🔗 **Anropas av:** `EditingControls.update()`.\n\n⚙️ **Effekt:** Styr Take Over-knappens `hidden`\\-egenskap."
        },
        {
          "kind": "function",
          "name": "RightPanel.setEditingButtonsDisabled()",
          "identifier": "RightPanel.setEditingButtonsDisabled()",
          "anchor": "RightPanel-setEditingButtonsDisabled",
          "line": 291,
          "text": "Aktiverar eller inaktiverar Edit och Take Over samtidigt.\n\n🔗 **Anropar:** `setDisabled(disabled)` på båda knapparna.\n\n🔗 **Anropas av:** `EditingControls.update()`, med värdet från `ApplicationState.isEditingActionPending()`.\n\n⚙️ **Effekt:** Förhindrar nya klick medan en redigeringsåtgärd väntar på svar.\n\nLike-knappen påverkas inte."
        },
        {
          "kind": "function",
          "name": "RightPanel.onEdit()",
          "identifier": "RightPanel.onEdit()",
          "anchor": "RightPanel-onEdit",
          "line": 296,
          "text": "Registrerar callbacken som ska köras när Edit-knappen klickas.\n\n🔗 **Ändrar:** `#onEditAction`.\n\n🔗 **Anropas från:** `src/main.ts`, med `EditingSessionController.handleEditAction()`.\n\n⚙️ **Effekt:** Sparar funktionen för framtida klick.\n\nIngen redigeringsåtgärd utförs när callbacken registreras."
        },
        {
          "kind": "function",
          "name": "RightPanel.onTakeover()",
          "identifier": "RightPanel.onTakeover()",
          "anchor": "RightPanel-onTakeover",
          "line": 300,
          "text": "Registrerar callbacken för Take Over-knappen.\n\n🔗 **Ändrar:** `#onTakeoverAction`.\n\n🔗 **Anropas från:** `src/main.ts`, med `EditingSessionController.handleTakeoverAction()`.\n\n⚙️ **Effekt:** Sparar funktionen för framtida klick.\n\nIngen mutation utförs när callbacken registreras.\n\n---"
        }
      ],
      "notes": [
        "### **🌱 När användaren väljer terräng**\n\n`TerrainButton` → klicklyssnaren i `LeftPanel` → `#selectedTerrain` → `getSelectedTerrain()` → hexklicket i `main.ts` → `decideTerrainPaint()`.\n\n### **✏️ När användaren klickar på Edit**\n\n`RightPanel` → `#onEditAction` → `EditingSessionController.handleEditAction()` → Convex.\n\n### **👑 När administratören klickar på Take Over**\n\n`RightPanel` → `#onTakeoverAction` → `EditingSessionController.handleTakeoverAction()` → Convex.\n\n### **📡 När redigeringssessionen förändras**\n\nConvex-prenumerationen → `ApplicationState` → `EditingControls.update()` → `RightPanel.setEditingStatus()` \\+ `setEditing()` \\+ synlighets- och knappstatusmetoderna.\n\n### **🗺️ När minikartan skapas**\n\n`EditorLayout` → `RightPanel` → `MapGrid.getWorldFrame()` → `Minimap` → `Minimap.connect(map)`.\n\n---"
      ]
    },
    {
      "path": "src/application/editor/minimap.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🗺️ 1\\. Minimap — Kartans navigationsöversikt**\n\n\nKlassen `Minimap` skapar en mindre översiktskarta som visar hela världen och markerar vilken del av världen som för närvarande syns i huvudkartan.\n\nMinikartan fungerar också som ett navigationsverktyg. Användaren kan klicka för att centrera huvudkartan och välja mellan fem zoomnivåer."
        },
        {
          "kind": "function",
          "name": "Minimap.element",
          "identifier": "Minimap.element",
          "anchor": "Minimap-element",
          "line": 24,
          "text": "En getter som returnerar minikartans rotelement.\n\n🔗 **Läser:** `#element`.\n\n🔗 **Används av:** `RightPanel.constructor()`, som placerar minikartan längst ned i högerpanelen.\n\n⚙️ **Effekt:** Endast läsning. Inga DOM-element skapas eller ändras.\n\n💡 **Begrepp — Getter:** En metodliknande egenskap som ger tillgång till ett värde utan att anroparen behöver känna till hur det lagras."
        },
        {
          "kind": "function",
          "name": "Minimap.constructor()",
          "identifier": "Minimap.constructor()",
          "anchor": "Minimap-constructor",
          "line": 35,
          "text": "Bygger minikartans samtliga visuella delar.\n\n**Arbetsgång:**\n\n1. Skapar `section.minimap` med `aria-label=\"Minimap\"`.  \n2. Sätter CSS-variabeln `--world-aspect` till förhållandet mellan världens bredd och höjd.  \n3. Skapar rubriken `Minimap` och väderstrecksmarkeringen `N`.  \n4. Skapar fem zoomknappar utifrån `ZOOM_LEVELS`, som innehåller `[1, 2, 3, 4, 5]`.  \n5. Markerar zoomnivå 1 som vald.  \n6. Skapar SVG-ytan med `createMinimapCanvas(world)` och bakgrunden med `createMinimapBackground(world)`.  \n7. Skapar ett hexrutnät med `new HexGrid('x-dominated')`.  \n8. Anropar `createGrid()` med `hexDiameter: HEX_WORLD_WIDTH`, `skeletonWidth: 42` och `skeletonHeight: 13`.  \n9. Skapar SVG-polygoner för hexagonerna med `createMinimapHexagonPolygon()`.  \n10. Lägger en visningsrektangel från `createMinimapViewport(world)` ovanpå hexagonerna.  \n11. Registrerar klicklyssnare för zoomknappar och SVG-ytan.\n\n**Hexagonernas grafik:**\n\n* Fyllning: `#15536f`  \n* Kontur: `#3d8eab`  \n* Polygonpunkter anges som koordinatpar `x,y`, separerade med mellanslag.\n\n🔗 **Anropas av:** `RightPanel.constructor()`, med världens ram från `map.getWorldFrame()`.\n\n⚙️ **Effekt:** Skapar minikartans visuella struktur och registrerar klickhändelser.\n\nZoomning och centrering fungerar först när `connect()` har kopplat minikartan till huvudkartan.\n\n💡 **Arkitekturprincip — Separation of Concerns:** Konstruktorn bygger gränssnittet. `connect()` kopplar därefter gränssnittet till kartans beteende."
        },
        {
          "kind": "function",
          "name": "Klick på zoomknapp",
          "identifier": "klick på zoomknapp",
          "anchor": "klick-på-zoomknapp",
          "line": 82,
          "text": "Callback som körs när användaren klickar på någon av de fem zoomknapparna.\n\n**Arbetsgång:**\n\n1. Identifierar zoomnivån som hör till knappen.  \n2. Kontrollerar om `#zoomListener` finns.  \n3. Anropar lyssnaren med zoomnivån.\n\n🔗 **Anropar:** `#zoomListener(level)`.\n\n⚙️ **Effekt:** Efter `connect()` skickas zoomnivån vidare till huvudkartan.\n\nFöre `connect()` händer ingenting.\n\n💡 **Begrepp — Closure:** Varje klickcallback kommer ihåg den zoomnivå som användes när dess knapp skapades."
        },
        {
          "kind": "function",
          "name": "Klick i minikartans SVG",
          "identifier": "klick i minikartans SVG",
          "anchor": "klick-i-minikartans-SVG",
          "line": 128,
          "text": "Callback som används när användaren klickar någonstans i minikartans SVG.\n\n**Arbetsgång:**\n\n1. Läser musklickets koordinater `event.clientX` och `event.clientY`.  \n2. Anropar `clientToSvg()` för att omvandla koordinaterna.  \n3. Avslutar om omvandlingen misslyckas.  \n4. Anropar `#centerListener(point.x, point.y)` om lyssnaren finns.\n\n🔗 **Anropar:** `clientToSvg()` och `#centerListener`.\n\n⚙️ **Effekt:** Ber huvudkartan centrera sig på den klickade positionen.\n\nSjälva centreringen utförs inte av denna callback."
        },
        {
          "kind": "function",
          "name": "Minimap.connect()",
          "identifier": "Minimap.connect()",
          "anchor": "Minimap-connect",
          "line": 146,
          "text": "Kopplar minikartan till huvudkartans `MapViewport`.\n\n**Arbetsgång:**\n\n1. Skapar och sparar en zoomlyssnare.  \n2. Skapar och sparar en centreringslyssnare.  \n3. Registrerar en vylyssnare genom `map.onViewChange()`.  \n4. Hämtar den aktuella kartvyn med `map.getView()`.  \n5. Anropar `#showView()` för att visa rätt zoomnivå och visningsrektangel direkt.\n\n🔗 **Anropas av:** `RightPanel.constructor()`.\n\n⚙️ **Effekt:** Gör minikartan interaktiv och synkroniserad med huvudkartan.\n\n💡 **Viktig detalj:** `MapGrid.onViewChange()` lägger till lyssnare. Den ersätter inte automatiskt tidigare registrerade lyssnare."
        },
        {
          "kind": "function",
          "name": "Zoomlyssnare",
          "identifier": "zoomlyssnare",
          "anchor": "zoomlyssnare",
          "line": 147,
          "text": "Callback som skickar en ny zoomnivå till huvudkartan.\n\n🔗 **Anropar:** `map.setZoomLevel(level)`.\n\nI `MapGrid` sparas nivån och `#applyView()` anropas.\n\n⚙️ **Effekt:** Huvudkartans vy ändras, varefter registrerade vylyssnare får en uppdatering."
        },
        {
          "kind": "function",
          "name": "Centreringslyssnare",
          "identifier": "centreringslyssnare",
          "anchor": "centreringslyssnare",
          "line": 151,
          "text": "Callback som skickar en ny centrumposition till huvudkartan.\n\n🔗 **Anropar:** `map.centerOn(x, y)`.\n\nI `MapGrid` sparas koordinaterna och `#applyView()` anropas.\n\n⚙️ **Effekt:** Kartan försöker centrera sig på den valda punkten.\n\nKartans egen begränsningslogik kan justera centrum så att visningen håller sig inom tillåtna gränser.\n\n💡 **Begrepp — Clamping:** Att begränsa ett värde till ett tillåtet intervall."
        },
        {
          "kind": "function",
          "name": "Vylyssnare",
          "identifier": "vylyssnare",
          "anchor": "vylyssnare",
          "line": 155,
          "text": "Callback som reagerar när huvudkartans vy förändras.\n\n🔗 **Anropar:** `#showView(view)`.\n\nRegistreras med `MapGrid.onViewChange()`.\n\nNär `MapGrid.#applyView()` körs anropas vylyssnarna med en kopia av den aktuella vyn från `getView()`.\n\n⚙️ **Effekt:** Minikartan uppdateras automatiskt när huvudkartans zoomnivå eller centrum förändras.\n\n💡 **Arkitekturprincip — Observer Pattern:** En komponent registrerar en lyssnare och får meddelanden när ett annat objekts tillstånd förändras."
        },
        {
          "kind": "function",
          "name": "Minimap.#showView()",
          "identifier": "Minimap.#showView()",
          "anchor": "Minimap-showView",
          "line": 162,
          "text": "Uppdaterar minikartans visningsrektangel och markerar rätt zoomknapp.\n\n**Arbetsgång:**\n\n1. Läser den aktuella kartvyn.  \n2. Sätter SVG-rektangelns `x`, `y`, `width` och `height`.  \n3. Går igenom zoomknapparna.  \n4. Markerar knappen vars nivå motsvarar `view.zoomLevel`.  \n5. Uppdaterar CSS-klassen `is-selected` och attributet `aria-pressed`.\n\n🔗 **Anropas av:** `connect()` och vylyssnaren.\n\n⚙️ **Effekt:** Visar vilken del av världen som syns i huvudkartan och vilken zoomnivå som används."
        },
        {
          "kind": "function",
          "name": "clientToSvg()",
          "identifier": "clientToSvg()",
          "anchor": "clientToSvg",
          "line": 180,
          "text": "Omvandlar koordinater från webbläsarens skärmsystem till SVG-elementets koordinatsystem.\n\n**Arbetsgång:**\n\n1. Hämtar transformationsmatrisen med `svg.getScreenCTM()`.  \n2. Returnerar `null` om matrisen saknas.  \n3. Skapar en SVG-punkt med musklickets `clientX` och `clientY`.  \n4. Inverterar transformationsmatrisen med `matrix.inverse()`.  \n5. Använder `matrixTransform()` för att beräkna SVG-koordinaterna.  \n6. Returnerar `{ x: world.x, y: world.y }`.\n\n🔗 **Anropas av:** Klickhanteringen på minikartans SVG.\n\n⚙️ **Effekt:** Returnerar en beräknad position utan att ändra något tillstånd.\n\n💡 **Begrepp — Coordinate Transformation:** En matematisk omvandling mellan två koordinatsystem. Här behövs den eftersom skärmpixlar och SVG-koordinater inte nödvändigtvis har samma skala eller origo.\n\n---"
        }
      ],
      "notes": [
        "### **🔍 När användaren zoomar**\n\n`ZoomButton` → zoomcallback → `Minimap.#zoomListener` → `MapGrid.setZoomLevel()` → `MapGrid.#applyView()` → vylyssnare → `Minimap.#showView()`.\n\n### **📍 När användaren klickar i minikartan**\n\nSVG-klick → `clientToSvg()` → `Minimap.#centerListener` → `MapGrid.centerOn()` → `MapGrid.#applyView()` → `Minimap.#showView()`.\n\n### **🌍 När galleriet fylls med världar**\n\n`WorldSelection.initializeGallery()` → `WorldGallery.setWorlds()` → sortering → `WorldGallery.#createWorldCard()`.\n\n### **🗺️ När användaren väljer en värld**\n\nVärldskort → klickcallback → `#onSelectWorld(world._id)` → `WorldSelection.selectWorld()` → huvudkartan och redigeringssessionen uppdateras.\n\n---"
      ]
    },
    {
      "path": "src/application/gallery/world-gallery.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🌍 2\\. WorldGallery — Galleriet med tolv världar**\n\n\nKlassen `WorldGallery` bygger gallerisidan där användaren väljer vilken värld som ska visas.\n\nGalleriet sköter presentation och klickhantering, medan själva världsbytet hanteras av `WorldSelection`."
        },
        {
          "kind": "function",
          "name": "WorldGallery.constructor()",
          "identifier": "WorldGallery.constructor()",
          "anchor": "WorldGallery-constructor",
          "line": 16,
          "text": "Bygger världsgalleriets tre kolumner.\n\n**Vänsterkolumn:**\n\n* Rubriken `Welcome to Civilization of Wonders`.  \n* En introduktion till de tolv levande världarna.\n\n**Mittenkolumn:**\n\n* Rubriken `Map Gallery`.  \n* Texten `Choose a world to explore.`  \n* Ett tomt `div.world-gallery__grid` för världskorten.\n\n**Högerkolumn:**\n\n* Rubriken `Discover the Worlds`.  \n* En beskrivning av att varje värld skapas av en redigerare.\n\n**Arbetsgång:**\n\n1. Sparar callbacken `onSelectWorld`.  \n2. Skapar `section.world-gallery`.  \n3. Sätter `aria-label=\"Map Gallery\"`.  \n4. Bygger de tre kolumnerna.  \n5. Sparar rotelementet.\n\n🔗 **Anropas av:** `ApplicationLayout.constructor()`.\n\n⚙️ **Effekt:** Skapar galleriets struktur, men inga världskort.\n\n💡 **Arkitekturprincip — Separation of Concerns:** Galleriet bygger gränssnittet. En separat del av applikationen ansvarar för att hämta världarna."
        },
        {
          "kind": "function",
          "name": "WorldGallery.setWorlds()",
          "identifier": "WorldGallery.setWorlds()",
          "anchor": "WorldGallery-setWorlds",
          "line": 70,
          "text": "Tar emot en lista med världar och bygger galleriets kort.\n\n**Arbetsgång:**\n\n1. Tömmer kortcontainern med `replaceChildren()`.  \n2. Kopierar världslistan.  \n3. Sorterar kopian med `first.number - second.number`.  \n4. Anropar `#createWorldCard()` för varje värld.  \n5. Lägger korten i galleriets rutnät.\n\n🔗 **Anropas av:** `WorldSelection.initializeGallery()`.\n\n⚙️ **Effekt:** Ersätter tidigare kort med nya kort, sorterade efter världsnummer i stigande ordning.\n\n💡 **Viktig detalj:** Genom att sortera en kopia undviker metoden att ändra ordningen i den ursprungliga listan."
        },
        {
          "kind": "function",
          "name": "WorldGallery.#createWorldCard()",
          "identifier": "WorldGallery.#createWorldCard()",
          "anchor": "WorldGallery-createWorldCard",
          "line": 82,
          "text": "Skapar ett klickbart kort för en värld.\n\n**Kortets innehåll:**\n\n* Ett `button.world-gallery__card`.  \n* Världstiteln `Unedited Map`.  \n* Redigerarens fantasy-namn från `world.fantasyName`, eller `Unassigned` om namnet saknas.\n\n**Arbetsgång:**\n\n1. Skapar knappelementet.  \n2. Skapar kortets texter.  \n3. Registrerar en klicklyssnare.  \n4. Returnerar det färdiga kortet.\n\n🔗 **Anropas av:** `WorldGallery.setWorlds()`.\n\n⚙️ **Effekt:** Skapar ett världskort som senare monteras i galleriet.\n\n💡 **Viktig detalj:** `world.name` används inte i den nuvarande implementationen. Världstiteln är fortfarande den fasta texten `Unedited Map`."
        },
        {
          "kind": "function",
          "name": "Klick på världskort",
          "identifier": "klick på världskort",
          "anchor": "klick-på-världskort",
          "line": 97,
          "text": "Callback som körs när användaren klickar på ett världskort.\n\n🔗 **Anropar:** `#onSelectWorld(world._id)`.\n\nI den sammansatta applikationen går anropet vidare till `WorldSelection.selectWorld()`.\n\n⚙️ **Effekt:** Begär att den valda världen ska öppnas.\n\nSjälva kortet ändrar inte vilken vy som visas.\n\n💡 **Arkitekturprincip — Callback-Based Communication:** Galleriet meddelar resten av applikationen vilken värld användaren har valt, utan att själv känna till navigationslogiken.\n\n---"
        }
      ],
      "notes": [
        "### **🔍 När användaren zoomar**\n\n`ZoomButton` → zoomcallback → `Minimap.#zoomListener` → `MapGrid.setZoomLevel()` → `MapGrid.#applyView()` → vylyssnare → `Minimap.#showView()`.\n\n### **📍 När användaren klickar i minikartan**\n\nSVG-klick → `clientToSvg()` → `Minimap.#centerListener` → `MapGrid.centerOn()` → `MapGrid.#applyView()` → `Minimap.#showView()`.\n\n### **🌍 När galleriet fylls med världar**\n\n`WorldSelection.initializeGallery()` → `WorldGallery.setWorlds()` → sortering → `WorldGallery.#createWorldCard()`.\n\n### **🗺️ När användaren väljer en värld**\n\nVärldskort → klickcallback → `#onSelectWorld(world._id)` → `WorldSelection.selectWorld()` → huvudkartan och redigeringssessionen uppdateras.\n\n---"
      ]
    },
    {
      "path": "src/application/map/map-grid.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "🔢 **Antal:** 20 funktioner och metoder  \n🎯 **Huvudområden:** Hexrutnät, SVG, koordinater, zoomning, centrering, vyberäkning, grafikuppdatering och händelselyssnare.\n\n---\n\n## **🗺️ 1\\. MapGrid — Kartans centrala klass**\n\n`MapGrid` ansvarar för att skapa och visa huvudkartans hexagoner.\n\nKlassen använder biblioteket `midgard-hex-grid` för hexgeometrin, men ansvarar själv för kartans SVG-element, interaktioner och synliga vy.\n\nDen fungerar även som en gemensam anslutningspunkt för minikartan och applikationens kartkontroller."
        },
        {
          "kind": "function",
          "name": "MapGrid.element",
          "identifier": "MapGrid.element",
          "anchor": "MapGrid-element",
          "line": 100,
          "text": "En getter som returnerar kartans SVG-rotelement.\n\n🔗 **Läser:** `#element`.\n\n🔗 **Används av:** `MapArea.constructor()`.\n\n⚙️ **Effekt:** Endast läsning."
        },
        {
          "kind": "function",
          "name": "MapGrid.constructor()",
          "identifier": "MapGrid.constructor()",
          "anchor": "MapGrid-constructor",
          "line": 119,
          "text": "Skapar världens hexrutnät, SVG-polygoner och den första kartvyn.\n\n**Arbetsgång:**\n\n1. Skapar `new HexGrid('x-dominated')`.  \n2. Anropar `createGrid()` med hexbredden `HEX_WORLD_WIDTH` och ett skelett på 42 × 13\\.  \n3. Sparar hexagonernas koordinater.  \n4. Anropar `getGridBounds()` för att beräkna rutnätets ytterkanter.  \n5. Utökar världens ram med `WORLD_VIEW_PADDING`.  \n6. Sätter kartans centrum till världens mitt.  \n7. Skapar den första vyn med `frameOf(this.#world)` och zoomnivå 1\\.  \n8. Skapar SVG-ytan med `createMapCanvas()`.  \n9. Skapar en polygon för varje hexagon med `createWorldHexPolygon()`.  \n10. Registrerar lyssnare för `pointerenter`, `pointerleave` och `click`.  \n11. Sparar polygoner och grafikplaceringar i interna samlingar.  \n12. Skapar en `ResizeObserver` som bevakar SVG-ytans storlek.\n\n**Hexagonernas grundutseende:**\n\n* Fyllning: `#0e4664`  \n* Kontur: `#3d8eab`\n\nGrafikens placering beräknas från hexagonens centrum minus halva `HEX_BOUNDS`.\n\n🔗 **Anropas av:** `MapArea.constructor()`.\n\n⚙️ **Effekt:** Skapar huvudkartans SVG-struktur.\n\nDen första fullständiga vyberäkningen sker när `ResizeObserver` anropar sin callback.\n\n💡 **Arkitekturprincip — Composition:** Kartan kombinerar geometri från ett separat bibliotek med egna SVG-komponenter och händelselyssnare."
        },
        {
          "kind": "function",
          "name": "Pointerenter på hexagon",
          "identifier": "pointerenter på hexagon",
          "anchor": "pointerenter-på-hexagon",
          "line": 167,
          "text": "Callback som reagerar när pekaren kommer in över en hexagon.\n\n**Arbetsgång:**\n\n1. Hämtar hexagonens nyckel.  \n2. Söker efter dess grafik i `#graphics`.  \n3. Om grafiken finns läggs CSS-klassen `map-hex--hovered` till.\n\n⚙️ **Effekt:** Markerar hexagonens grafik som hovrad.\n\nSjälva polygonen får inte klassen."
        },
        {
          "kind": "function",
          "name": "Pointerleave på hexagon",
          "identifier": "pointerleave på hexagon",
          "anchor": "pointerleave-på-hexagon",
          "line": 171,
          "text": "Callback som reagerar när pekaren lämnar en hexagon.\n\n🔗 **Anropar:** `classList.remove('map-hex--hovered')` på hexagonens grafik, om den finns.\n\n⚙️ **Effekt:** Tar bort hover-markeringen.\n\nOm hexagonen saknar grafik sker ingen förändring."
        },
        {
          "kind": "function",
          "name": "Klick på hexagon",
          "identifier": "klick på hexagon",
          "anchor": "klick-på-hexagon",
          "line": 175,
          "text": "Callback som meddelar registrerade lyssnare vilken hexagon användaren klickade på.\n\n**Arbetsgång:**\n\n1. Läser hexagonens koordinat.  \n2. Skapar ett nytt objekt `{ x, y }`.  \n3. Går igenom `#hexClickListeners`.  \n4. Anropar varje registrerad funktion med koordinaten.\n\n🔗 **Lyssnare registreras genom:** `MapGrid.onHexClick()`.\n\n🔗 **Bekräftad lyssnare:** Hexklickhanteringen i `src/main.ts`.\n\n⚙️ **Effekt:** Meddelar resten av applikationen att en hexagon har klickats.\n\nSjälva terrängmålningen sker utanför `MapGrid`.\n\n💡 **Arkitekturprincip — Observer Pattern:** Kartan skickar händelser till registrerade lyssnare utan att behöva känna till vad de ska göra."
        },
        {
          "kind": "function",
          "name": "ResizeObserver-callback",
          "identifier": "ResizeObserver-callback",
          "anchor": "ResizeObserver-callback",
          "line": 198,
          "text": "Callback som reagerar när kartans SVG-yta ändrar storlek.\n\n🔗 **Anropar:** `#applyView()`.\n\n⚙️ **Effekt:** Startar en ny beräkning av kartans synliga område.\n\nDetta gör att kartvyn kan anpassas efter tillgänglig skärmstorlek."
        },
        {
          "kind": "prose",
          "text": "## **📍 2\\. Kartans koordinater och aktuella vy**"
        },
        {
          "kind": "function",
          "name": "MapGrid.getCoordinates()",
          "identifier": "MapGrid.getCoordinates()",
          "anchor": "MapGrid-getCoordinates",
          "line": 203,
          "text": "Returnerar en lista med kartans hexagonkoordinater.\n\nMetoden skapar nya objekt med samma `x` och `y` för varje koordinat.\n\n⚙️ **Effekt:** Endast läsning.\n\nOriginalobjekten i `#coordinates` ändras inte.\n\nCursor hittade ingen annan anropare i `src/`.\n\n💡 **Arkitekturprincip — Defensive Copying:** Genom att returnera kopior skyddas den interna datastrukturen från ändringar utifrån."
        },
        {
          "kind": "function",
          "name": "MapGrid.getWorldFrame()",
          "identifier": "MapGrid.getWorldFrame()",
          "anchor": "MapGrid-getWorldFrame",
          "line": 207,
          "text": "Returnerar världens ytterram.\n\n🔗 **Anropar:** `frameOf(this.#world)`.\n\nResultatet innehåller:\n\n* `x`  \n* `y`  \n* `width`  \n* `height`\n\n🔗 **Anropas av:** `RightPanel.constructor()`, som skickar ramen till minikartan.\n\n⚙️ **Effekt:** Returnerar en ny ram utan att ändra kartan."
        },
        {
          "kind": "function",
          "name": "MapGrid.getView()",
          "identifier": "MapGrid.getView()",
          "anchor": "MapGrid-getView",
          "line": 211,
          "text": "Returnerar en kopia av kartans aktuella vy.\n\nKopian innehåller position, storlek och `zoomLevel`.\n\n🔗 **Anropas av:** `Minimap.connect()` och internt av `#applyView()`.\n\n⚙️ **Effekt:** Endast läsning.\n\n💡 **Viktig skillnad:** Världens ram beskriver hela kartans utsträckning. Den aktuella vyn beskriver vilken del av världen som visas just nu."
        },
        {
          "kind": "prose",
          "text": "## **🔍 3\\. Zoomning och centrering**"
        },
        {
          "kind": "function",
          "name": "MapGrid.setZoomLevel()",
          "identifier": "MapGrid.setZoomLevel()",
          "anchor": "MapGrid-setZoomLevel",
          "line": 215,
          "text": "Ändrar kartans zoomnivå.\n\n**Arbetsgång:**\n\n1. Sparar nivån i `#zoomLevel`.  \n2. Anropar `#applyView()`.\n\n🔗 **Anropas av:** Minikartans zoomlyssnare.\n\n⚙️ **Effekt:** Startar omberäkning av den synliga kartvyn.\n\nMetoden gör detta även om den nya zoomnivån är samma som den tidigare."
        },
        {
          "kind": "function",
          "name": "MapGrid.centerOn()",
          "identifier": "MapGrid.centerOn()",
          "anchor": "MapGrid-centerOn",
          "line": 220,
          "text": "Begär att kartan ska centreras på en viss koordinat.\n\n**Arbetsgång:**\n\n1. Sparar `x` i `#centerX`.  \n2. Sparar `y` i `#centerY`.  \n3. Anropar `#applyView()`.\n\n🔗 **Anropas av:** Minikartans centreringslyssnare.\n\n⚙️ **Effekt:** Kartans centrum uppdateras.\n\nDen slutliga centrumpositionen kan justeras av `#clampCenter()`."
        },
        {
          "kind": "function",
          "name": "MapGrid.onViewChange()",
          "identifier": "MapGrid.onViewChange()",
          "anchor": "MapGrid-onViewChange",
          "line": 226,
          "text": "Registrerar en lyssnare som ska få meddelanden när kartans vy räknas om.\n\n🔗 **Ändrar:** `#viewListeners` genom `push()`.\n\n🔗 **Anropas av:** `Minimap.connect()`.\n\n⚙️ **Effekt:** Lägger till en lyssnare som senare anropas av `#applyView()`.\n\nTidigare lyssnare ersätts inte."
        },
        {
          "kind": "function",
          "name": "MapGrid.onHexClick()",
          "identifier": "MapGrid.onHexClick()",
          "anchor": "MapGrid-onHexClick",
          "line": 230,
          "text": "Registrerar en funktion som ska anropas när användaren klickar på en hexagon.\n\n🔗 **Ändrar:** `#hexClickListeners` genom `push()`.\n\n🔗 **Anropas från:** `src/main.ts`.\n\n⚙️ **Effekt:** Registrerar en framtida klickhanterare.\n\nIngen klickhändelse utlöses vid registreringen."
        },
        {
          "kind": "prose",
          "text": "## **🎨 4\\. Uppdatering av hexagonernas grafik**"
        },
        {
          "kind": "function",
          "name": "MapGrid.setHexFill()",
          "identifier": "MapGrid.setHexFill()",
          "anchor": "MapGrid-setHexFill",
          "line": 234,
          "text": "Ändrar fyllningsfärgen på en hexagons polygon.\n\n**Arbetsgång:**\n\n1. Skapar en koordinatnyckel med `coordinateKey(coordinate)`.  \n2. Söker efter polygonen.  \n3. Om polygonen saknas kastas ett fel.  \n4. Annars uppdateras SVG-attributet `fill`.\n\n**Felmeddelande:**\n\n`No hexagon is rendered at coordinate (x, y).`\n\n⚙️ **Effekt:** Ändrar polygonens fyllningsfärg.\n\nEventuell SVG-grafik ovanpå polygonen påverkas inte.\n\nCursor hittade ingen annan anropare i `src/`."
        },
        {
          "kind": "function",
          "name": "MapGrid.setHexGraphic()",
          "identifier": "MapGrid.setHexGraphic()",
          "anchor": "MapGrid-setHexGraphic",
          "line": 246,
          "text": "Placerar eller ersätter SVG-grafiken för en hexagon.\n\n**Arbetsgång:**\n\n1. Skapar en koordinatnyckel.  \n2. Söker efter polygon och grafikplacering.  \n3. Kastar ett fel om någon av dem saknas.  \n4. Sätter grafikens `x`, `y`, `width` och `height`.  \n5. Sätter attributet `data-hex-graphic`.  \n6. Kopierar hover-klassen om den tidigare grafiken var hovrad.  \n7. Ersätter tidigare grafik med `replaceWith()`, eller placerar ny grafik direkt efter polygonen med `after()`.  \n8. Sparar den nya grafiken i `#graphics`.\n\n🔗 **Anropas av:** `WorldMapController`.\n\n⚙️ **Effekt:** Byter den synliga grafiken för en hexagon.\n\nDen tidigare SVG-noden tas bort ur DOM när den ersätts.\n\n💡 **Arkitekturprincip — State Preservation:** Hover-markeringen bevaras vid grafikbyte så att användarens visuella återkoppling inte försvinner."
        },
        {
          "kind": "prose",
          "text": "## **⚙️ 5\\. Intern beräkning av kartvyn**"
        },
        {
          "kind": "function",
          "name": "MapGrid.#applyView()",
          "identifier": "MapGrid.#applyView()",
          "anchor": "MapGrid-applyView",
          "line": 278,
          "text": "Detta är den centrala metoden för kartans vyberäkning.\n\nDen används när kartan zoomas, centreras eller ändrar storlek.\n\n**Arbetsgång:**\n\n1. Läser SVG-ytans storlek med `getBoundingClientRect()`.  \n2. Sparar bredd och höjd i `#viewportWidth` och `#viewportHeight`.  \n3. Anropar `#fittedViewSize()` för att beräkna den synliga världens storlek.  \n4. Anropar `#clampCenter()` för att begränsa centrum.  \n5. Sparar det justerade centrumet.  \n6. Bygger `#view` från centrum, bredd, höjd och zoomnivå.  \n7. Skapar en `viewBox`\\-sträng med `#viewBoxOf()`.  \n8. Uppdaterar SVG-elementets `viewBox`.  \n9. Hämtar en kopia av vyn med `getView()`.  \n10. Anropar samtliga registrerade vylyssnare.\n\n🔗 **Anropas av:** `setZoomLevel()`, `centerOn()` och `ResizeObserver`\\-callbacken.\n\n⚙️ **Effekt:** Uppdaterar kartans synliga område och meddelar minikartan.\n\n💡 **Arkitekturprincip — Centralized State Update:** Flera olika händelser använder samma metod för att beräkna en konsekvent kartvy."
        },
        {
          "kind": "function",
          "name": "MapGrid.#fittedViewSize()",
          "identifier": "MapGrid.#fittedViewSize()",
          "anchor": "MapGrid-fittedViewSize",
          "line": 313,
          "text": "Beräknar hur stor del av världen som ska synas vid den aktuella zoomnivån.\n\n**Arbetsgång:**\n\n1. Kontrollerar viewportens bredd och höjd.  \n2. Om någon dimension är noll eller mindre returneras hela världens storlek.  \n3. Annars beräknas en skala genom `zoomScales(this.#fitScale())`.  \n4. Skalan för aktuell zoomnivå väljs.  \n5. Vybredden beräknas som viewportbredden dividerad med skalan.  \n6. Vyhöjden beräknas på motsvarande sätt.\n\n🔗 **Anropas av:** `#applyView()`.\n\n⚙️ **Effekt:** Returnerar beräknad vybredd och vyhöjd."
        },
        {
          "kind": "function",
          "name": "MapGrid.#fitScale()",
          "identifier": "MapGrid.#fitScale()",
          "anchor": "MapGrid-fitScale",
          "line": 329,
          "text": "Beräknar skalan som krävs för att hela världen ska få plats i SVG-ytan.\n\n**Beräkning:**\n\n`Math.min(viewportWidth / worldWidth, viewportHeight / worldHeight)`\n\nDen mindre skalan används för att hela världen ska rymmas inom både bredd och höjd.\n\n🔗 **Anropas av:** `#fittedViewSize()`.\n\n⚙️ **Effekt:** Returnerar ett skalvärde utan att ändra tillstånd."
        },
        {
          "kind": "function",
          "name": "MapGrid.#clampCenter()",
          "identifier": "MapGrid.#clampCenter()",
          "anchor": "MapGrid-clampCenter",
          "line": 336,
          "text": "Begränsar kartans centrum så att den synliga vyn håller sig inom världens tillåtna område.\n\n**Arbetsgång:**\n\n1. Anropar `clampAxis()` för x-axeln.  \n2. Anropar `clampAxis()` för y-axeln.  \n3. Returnerar det begränsade centrumet `{ x, y }`.\n\nOm den synliga vyn är minst lika stor som världens utsträckning på en axel används mitten av världens spann.\n\nAnnars begränsas centrum så att vyn inte går utanför kanterna.\n\n🔗 **Anropas av:** `#applyView()`.\n\n⚙️ **Effekt:** Returnerar en beräknad centrumposition. Det är anroparen som skriver tillbaka den till fälten."
        },
        {
          "kind": "function",
          "name": "MapGrid.#viewBoxOf()",
          "identifier": "MapGrid.#viewBoxOf()",
          "anchor": "MapGrid-viewBoxOf",
          "line": 348,
          "text": "Omvandlar en `MapFrame` till en sträng som SVG kan använda som `viewBox`.\n\n**Format:**\n\n`x y width height`\n\n🔗 **Anropas av:** `#applyView()`.\n\n⚙️ **Effekt:** Returnerar en formaterad sträng. Själva SVG-attributet sätts av anroparen.\n\n---"
        },
        {
          "kind": "prose",
          "text": "## **📐 1\\. MapGrid — Kartans matematiska hjälpfunktioner**\n\n\nI del 09 gick vi igenom klassen `MapGrid`, som ansvarar för att skapa och visa huvudkartan.\n\nHär avslutar vi filen genom att dokumentera dess fristående hjälpfunktioner.\n\nDessa funktioner utför avgränsade beräkningar och används av klassens metoder."
        },
        {
          "kind": "function",
          "name": "coordinateKey()",
          "identifier": "coordinateKey()",
          "anchor": "coordinateKey",
          "line": 51,
          "text": "Omvandlar en hexagons koordinater till en textnyckel.\n\n**Beräkning:**\n\n`x-y`\n\nExempelvis blir koordinaten `{ x: 12, y: 4 }` nyckeln `12-4`.\n\nFunktionen använder en template literal:\n\n`$coordinate.x-${coordinate.y}`\n\n🔗 **Anropas av:**\n\n* `MapGrid.constructor()`  \n* `MapGrid.setHexFill()`  \n* `MapGrid.setHexGraphic()`\n\n⚙️ **Effekt:** Returnerar en sträng utan att ändra något tillstånd.\n\n💡 **Varför behövs detta?**\n\nKartans interna `Map`\\-samlingar behöver kunna hitta en polygon eller grafik genom en koordinat. Textnyckeln gör att samma koordinat kan användas konsekvent vid lagring och uppslagning."
        },
        {
          "kind": "function",
          "name": "clamp()",
          "identifier": "clamp()",
          "anchor": "clamp",
          "line": 55,
          "text": "Begränsar ett tal så att det aldrig hamnar utanför ett bestämt intervall.\n\n**Beräkning:**\n\n`Math.min(Math.max(value, min), max)`\n\n**Exempel:**\n\nOm intervallet är 0–100 blir:\n\n* `clamp(50, 0, 100)` → 50  \n* `clamp(-20, 0, 100)` → 0  \n* `clamp(150, 0, 100)` → 100\n\n🔗 **Anropas av:** `clampAxis()`.\n\n⚙️ **Effekt:** Returnerar ett begränsat tal. Inga objekt eller fält ändras.\n\n💡 **Begrepp — Clamping:** En vanlig teknik inom grafik, spelutveckling och användargränssnitt för att hålla värden inom tillåtna gränser."
        },
        {
          "kind": "function",
          "name": "clampAxis()",
          "identifier": "clampAxis()",
          "anchor": "clampAxis",
          "line": 59,
          "text": "Begränsar kartans centrum längs en axel så att den synliga delen av kartan håller sig inom världens gränser.\n\nFunktionen används separat för x-axeln och y-axeln.\n\n**Två möjliga situationer:**\n\n**Situation A — Vyn är lika stor som eller större än världen**\n\nNär `viewSpan >= span` returneras världens mitt:\n\n`origin + span / 2`\n\nDet finns då inget utrymme att förflytta vyn längs den axeln utan att visa området utanför världen.\n\n**Situation B — Vyn är mindre än världen**\n\nDå beräknas två gränser:\n\n* Minsta centrum: `origin + viewSpan / 2`  \n* Största centrum: `origin + span - viewSpan / 2`\n\nSedan används `clamp(center, min, max)`.\n\n🔗 **Anropas av:** `MapGrid.#clampCenter()`.\n\n⚙️ **Effekt:** Returnerar ett justerat centrumvärde.\n\nFunktionen ändrar inte kartans sparade centrum själv.\n\n💡 **Varför är detta viktigt?**\n\nUtan begränsningen skulle användaren kunna centrera kartan så långt åt sidan att delar av visningsområdet hamnade utanför världens ram."
        },
        {
          "kind": "function",
          "name": "zoomScales()",
          "identifier": "zoomScales()",
          "anchor": "zoomScales",
          "line": 78,
          "text": "Beräknar skalan för kartans fem zoomnivåer.\n\nSkalan uttrycks som **CSS-pixlar per världsenhet**.\n\n**Grundprincip:**\n\n* Zoomnivå 1 visar hela världen.  \n* Zoomnivå 5 använder en CSS-pixel per världsenhet.  \n* Nivåerna däremellan beräknas med geometrisk progression.\n\nKonstanten `ZOOM_STEP_COUNT` är 4\\.\n\n**Beräkning av kvoten:**\n\n`Math.pow(1 / fitScale, 1 / 4)`\n\nDärefter skapas en ny array genom att gå igenom `ZOOM_LEVELS`.\n\n🔗 **Anropas av:** `MapGrid.#fittedViewSize()`.\n\n⚙️ **Effekt:** Returnerar en array med fem skalvärden.\n\n💡 **Begrepp — Geometrisk progression:** En talföljd där varje steg multipliceras med samma faktor. Det ger jämnare proportionella förändringar mellan zoomnivåer än att lägga till samma antal pixlar vid varje steg."
        },
        {
          "kind": "function",
          "name": "Skalberäkning i zoomScales()",
          "identifier": "skalberäkning i zoomScales()",
          "anchor": "skalberäkning-i-zoomScales",
          "line": 81,
          "text": "En callback som beräknar skalan för en enskild zoomnivå.\n\n**När nivån är 5:**\n\nReturnerar `1`.\n\n**När nivån är 1–4:**\n\nReturnerar:\n\n`fitScale * ratio ** (level - 1)`\n\nFör nivå 1 blir exponenten 0, vilket innebär att skalan blir `fitScale`.\n\n🔗 **Anropas av:** Arrayens `map()`\\-operation i `zoomScales()`.\n\n⚙️ **Effekt:** Returnerar ett skalvärde för ett element i arrayen.\n\n💡 **Viktig detalj:** Nivå 5 behandlas uttryckligen som ett specialfall för att ge exakt skalan 1\\."
        },
        {
          "kind": "function",
          "name": "frameOf()",
          "identifier": "frameOf()",
          "anchor": "frameOf",
          "line": 88,
          "text": "Skapar en kopia av en kartram.\n\n**Fält som kopieras:**\n\n* `x`  \n* `y`  \n* `width`  \n* `height`\n\n🔗 **Anropas av:**\n\n* `MapGrid.constructor()`  \n* `MapGrid.getWorldFrame()`\n\n⚙️ **Effekt:** Returnerar ett nytt objekt.\n\nOriginalramen ändras inte och `zoomLevel` ingår inte i kopian.\n\n💡 **Arkitekturprincip — Defensive Copying:** Genom att returnera ett nytt objekt minskar risken att en anropare av misstag förändrar ett internt objekt.\n\n---"
        }
      ],
      "notes": [
        "### **🗺️ När huvudkartan skapas**\n\n`MapArea` → `MapGrid.constructor()` → `HexGrid.createGrid()` → SVG-polygoner → `ResizeObserver` → `MapGrid.#applyView()`.\n\n### **🔍 När användaren zoomar via minikartan**\n\n`Minimap` → `MapGrid.setZoomLevel()` → `#applyView()` → `onViewChange`\\-lyssnare → `Minimap.#showView()`.\n\n### **📍 När användaren centrerar kartan**\n\n`Minimap` → `MapGrid.centerOn()` → `#clampCenter()` → `#applyView()` → minikartans vyuppdatering.\n\n### **🌱 När användaren klickar på en hexagon**\n\nHexagonens klicklyssnare → `#hexClickListeners` → callbacken i `main.ts` → terrängbeslut → Convex-mutation.\n\n### **🎨 När kartans terränggrafik uppdateras**\n\n`WorldMapController` → `MapGrid.setHexGraphic()` → SVG-grafiken ersätts på rätt koordinat.\n\n---",
        "### **🔍 När användaren ändrar zoomnivå**\n\n`Minimap` → `MapGrid.setZoomLevel()` → `MapGrid.#applyView()` → `zoomScales()` → `#fittedViewSize()` → ny SVG-`viewBox`.\n\n### **📍 När användaren centrerar kartan**\n\n`Minimap` → `MapGrid.centerOn()` → `MapGrid.#applyView()` → `#clampCenter()` → `clampAxis()` → `clamp()`.\n\n### **🌍 När användaren väljer en annan värld**\n\n`WorldSelection.selectWorld()` → `WorldMapController.selectWorld()` → `stop()` → `Convex.onUpdate(api.hexes.listByWorld)`.\n\n### **🎨 När Convex skickar uppdaterade hexagoner**\n\nConvex → hexsvar → `TERRAIN_GRAPHICS` → SVG-ritfunktion → `MapGrid.setHexGraphic()` → kartans DOM uppdateras.\n\n---"
      ]
    },
    {
      "path": "src/application/map/world-map-controller.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🌍 2\\. WorldMapController — Världens terräng från Convex**\n\n\nKlassen `WorldMapController` kopplar ihop databasen Convex med den grafiska kartan.\n\nDess uppgift är att prenumerera på en världs hexagondata och se till att rätt terränggrafik visas för varje hexagon.\n\nDetta är en central del av applikationens databasstyrda arkitektur."
        },
        {
          "kind": "function",
          "name": "WorldMapController.constructor()",
          "identifier": "WorldMapController.constructor()",
          "anchor": "WorldMapController-constructor",
          "line": 62,
          "text": "Skapar kartkontrollern och sparar dess två viktigaste beroenden.\n\n**Beroenden:**\n\n* `#client` — Convex-klienten.  \n* `#mapGrid` — den grafiska kartan.\n\n🔗 **Anropas av:** `ApplicationLayout.constructor()`.\n\nDen får `convex.client` och `editorLayout.mapArea.mapGrid`.\n\n⚙️ **Effekt:** Sparar referenserna.\n\nIngen databasprenumeration startas här.\n\nFältet `#unsubscribe` är från början `null`.\n\n💡 **Arkitekturprincip — Dependency Injection:** Kontrollern får sina beroenden via konstruktorn i stället för att skapa dem själv."
        },
        {
          "kind": "function",
          "name": "WorldMapController.selectWorld()",
          "identifier": "WorldMapController.selectWorld()",
          "anchor": "WorldMapController-selectWorld",
          "line": 67,
          "text": "Startar en Convex-prenumeration på hexagonerna i en vald värld.\n\n**Arbetsgång:**\n\n1. Anropar `stop()` för att avsluta en tidigare prenumeration.  \n2. Startar en ny prenumeration genom `client.onUpdate()`.  \n3. Använder Convex-frågan `api.hexes.listByWorld`.  \n4. Skickar `{ worldId }` som argument.  \n5. Registrerar en callback för inkommande hexdata.  \n6. Registrerar en felcallback.  \n7. Sparar avregistreringsfunktionen i `#unsubscribe`.\n\n**Felhantering:**\n\nOm prenumerationen misslyckas loggas:\n\n`World map subscription failed`\n\n🔗 **Anropas av:** `WorldSelection.selectWorld()`.\n\n⚙️ **Effekt:** Byter vilken världs hexdata kontrollern prenumererar på.\n\nRedan ritad SVG-grafik tas inte bort direkt av denna metod. Ny grafik ritas när prenumerationens datacallback körs.\n\n💡 **Arkitekturprincip — Reactive Data Flow:** När Convex levererar nya data kan gränssnittet uppdateras utan att användaren behöver ladda om sidan."
        },
        {
          "kind": "function",
          "name": "Hexsvar",
          "identifier": "hexsvar",
          "anchor": "hexsvar",
          "line": 73,
          "text": "Callback som tar emot hexagondata från Convex och ritar motsvarande terränggrafik.\n\n**Arbetsgång:**\n\n1. Går igenom hexagonerna i det inkommande svaret.  \n2. Skapar koordinaten `{ x: hex.x, y: hex.y }`.  \n3. Bygger en grafiknyckel av terräng och relief.  \n4. Söker efter ritfunktionen i `TERRAIN_GRAPHICS`.  \n5. Om ritfunktionen saknas loggas `Unsupported terrain`.  \n6. Om ritfunktionen finns skapas en ny SVG.  \n7. Anropar `MapGrid.setHexGraphic()` för att placera grafiken på rätt hexagon.\n\n**Grafiknyckelns format:**\n\n`$hex.terrain-${hex.relief}`\n\n**Stödda kombinationer:**\n\n🌱 Grass — flat, hills, mountain  \n🌾 Plains — flat, hills, mountain  \n🏜️ Desert — flat, hills, mountain  \n❄️ Tundra — flat, hills, mountain  \n🏔️ Snow — flat, hills, mountain  \n🌊 Coast — flat  \n🌊 Ocean — flat\n\nTotalt 17 terräng- och reliefkombinationer.\n\n**Om kombinationen är okänd:**\n\n* Ett felmeddelande loggas.  \n* Den aktuella hexagonen hoppas över med `continue`.  \n* Eventuell tidigare grafik på hexagonen lämnas orörd.\n\n⚙️ **Effekt:** Lägger till eller ersätter SVG-grafik för koordinaterna som finns i svaret.\n\n💡 **Arkitekturprincip — Data-Driven Rendering:** Det är databasens terräng- och reliefvärden som avgör vilken grafik som visas.\n\n💡 **Viktig detalj:** Kontrollern skapar inte själv terränggrafikens detaljer. Den väljer rätt ritfunktion från `TERRAIN_GRAPHICS`."
        },
        {
          "kind": "function",
          "name": "WorldMapController.stop()",
          "identifier": "WorldMapController.stop()",
          "anchor": "WorldMapController-stop",
          "line": 99,
          "text": "Avslutar den aktiva Convex-prenumerationen.\n\n**Arbetsgång:**\n\n1. Kontrollerar om `#unsubscribe` innehåller en funktion.  \n2. Anropar funktionen om den finns.  \n3. Sätter `#unsubscribe` till `null`.\n\n🔗 **Anropas av:** `WorldMapController.selectWorld()` innan en ny prenumeration startas.\n\n⚙️ **Effekt:** Avregistrerar den tidigare prenumerationen.\n\nRedan ritad SVG-grafik lämnas kvar på kartan.\n\n💡 **Begrepp — Cleanup:** Att avsluta resurser eller registreringar som inte längre behövs, exempelvis prenumerationer och händelselyssnare.\n\n---"
        }
      ],
      "notes": [
        "### **🔍 När användaren ändrar zoomnivå**\n\n`Minimap` → `MapGrid.setZoomLevel()` → `MapGrid.#applyView()` → `zoomScales()` → `#fittedViewSize()` → ny SVG-`viewBox`.\n\n### **📍 När användaren centrerar kartan**\n\n`Minimap` → `MapGrid.centerOn()` → `MapGrid.#applyView()` → `#clampCenter()` → `clampAxis()` → `clamp()`.\n\n### **🌍 När användaren väljer en annan värld**\n\n`WorldSelection.selectWorld()` → `WorldMapController.selectWorld()` → `stop()` → `Convex.onUpdate(api.hexes.listByWorld)`.\n\n### **🎨 När Convex skickar uppdaterade hexagoner**\n\nConvex → hexsvar → `TERRAIN_GRAPHICS` → SVG-ritfunktion → `MapGrid.setHexGraphic()` → kartans DOM uppdateras.\n\n---"
      ]
    },
    {
      "path": "src/application/visitors/visitors-layout.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🏛️ 1\\. VisitorsLayout — Besökarsidans struktur**\n\n\nKlassen `VisitorsLayout` bygger sidan **Visitors & Login**.\n\nDen samlar tre huvudområden: besöksstatistik till vänster, geografiska kartor i mitten och inloggning till höger."
        },
        {
          "kind": "function",
          "name": "VisitorsLayout.constructor()",
          "identifier": "VisitorsLayout.constructor()",
          "anchor": "VisitorsLayout-constructor",
          "line": 18,
          "text": "Skapar hela besökarsidans grundstruktur.\n\n**Arbetsgång:**\n\n1. Skapar `section.visitors-layout`.  \n2. Sätter `aria-label=\"Visitors & Login\"`.  \n3. Skapar en vänsterspalt för statistik.  \n4. Skapar en mittyta för kartor.  \n5. Skapar en högerspalt för inloggning.  \n6. Skapar `LoginPage` med autentiseringsobjektet.  \n7. Anropar `#createStatistics(client)`.  \n8. Anropar `#createWorldMap(client)`.  \n9. Anropar `#createLoginArea()`.\n\n🔗 **Anropas av:** `ApplicationLayout.constructor()`.\n\n⚙️ **Effekt:** Bygger sidans tre områden och exponerar `element` och `loginPage` som publika fält.\n\n💡 **Arkitekturprincip — Composition:** En större vy byggs av flera mindre, specialiserade komponenter."
        },
        {
          "kind": "function",
          "name": "VisitorsLayout.initializeAuthentication()",
          "identifier": "VisitorsLayout.initializeAuthentication()",
          "anchor": "VisitorsLayout-initializeAuthentication",
          "line": 48,
          "text": "Startar inloggningssidans initialisering.\n\n🔗 **Anropar:** `LoginPage.initialize()` utan argument.\n\n⚙️ **Effekt:** Inloggningssidans egen initialiseringslogik ansvarar för lyssnare och rendering.\n\nCursor hittade ingen anropare till denna metod i `src/`."
        },
        {
          "kind": "function",
          "name": "VisitorsLayout.#createStatistics()",
          "identifier": "VisitorsLayout.#createStatistics()",
          "anchor": "VisitorsLayout-createStatistics",
          "line": 52,
          "text": "Bygger vänsterspaltens statistikområde.\n\n**Innehåll:**\n\n* Rubriken `Visitor Statistics`.  \n* Beskrivningen `All recorded visits, by device.`  \n* Statistikpanelen.  \n* Kartkredit och integritetsnotis.\n\n🔗 **Anropar:** `createVisitorStatistics(client)` och `#createPanelNotes()`.\n\n⚙️ **Effekt:** Lägger till de fyra delarna i `#statisticsArea`."
        },
        {
          "kind": "function",
          "name": "VisitorsLayout.#createPanelNotes()",
          "identifier": "VisitorsLayout.#createPanelNotes()",
          "anchor": "VisitorsLayout-createPanelNotes",
          "line": 67,
          "text": "Samlar informationen under statistiken.\n\n🔗 **Anropar:** `#createMapCredit()` och `#createPrivacyNotice()`.\n\n⚙️ **Effekt:** Returnerar ett `div.visitors-layout__notes` med båda texterna."
        },
        {
          "kind": "function",
          "name": "VisitorsLayout.#createWorldMap()",
          "identifier": "VisitorsLayout.#createWorldMap()",
          "anchor": "VisitorsLayout-createWorldMap",
          "line": 74,
          "text": "Skapar besökarsidans tre geografiska kartor.\n\n**Kartor som skapas:**\n\n🌍 **Världskarta**\n\n`createVisitorWorldMap()`\n\nTillgänglighetstext: `Equirectangular world map`.\n\n🇸🇪 **Sverigekarta**\n\n`createVisitorSverigeMap()`\n\nTillgänglighetstext: `Map of southern Sweden`.\n\n📍 **Kalmarkarta**\n\n`createVisitorKalmarMap()`\n\nTillgänglighetstext: `Map of Kalmar and surrounding area`.\n\nAlla tre kartorna får `role=\"img\"` och tillhörande `aria-label`.\n\n**Arbetsgång:**\n\n1. Skapar rubriken `Visitor World Map`.  \n2. Skapar en beskrivning om besökarnas positioner.  \n3. Skapar de tre SVG-kartorna.  \n4. Anropar `loadVisitorLocations()` med kartorna.  \n5. Lägger kartorna i sidans `figure` och monterar området.\n\n⚙️ **Effekt:** Kartorna visas och hämtningen av besökspositioner påbörjas.\n\n💡 **Arkitekturprincip — Separation of Concerns:** Layouten skapar kartorna, medan en separat modul hämtar och placerar besöksmarkörerna."
        },
        {
          "kind": "function",
          "name": "VisitorsLayout.#createMapCredit()",
          "identifier": "VisitorsLayout.#createMapCredit()",
          "anchor": "VisitorsLayout-createMapCredit",
          "line": 127,
          "text": "Skapar käll- och licensinformationen för världskartan.\n\n**Information:**\n\n* Upphovsperson: Ebrahim.  \n* Ursprunglig kartfil: `Equirectangular_projection_world_map_without_borders.svg`.  \n* Licens: Creative Commons Attribution-ShareAlike 4.0.  \n* Kartunderlag: Natural Earth.  \n* Kartan har färganpassats för Civilization of Wonders.\n\nLänkarna öppnas i en ny flik med `target=\"_blank\"`.\n\n🔗 **Anropas av:** `#createPanelNotes()`.\n\n⚙️ **Effekt:** Returnerar ett stycke med källhänvisningarna."
        },
        {
          "kind": "function",
          "name": "VisitorsLayout.#createPrivacyNotice()",
          "identifier": "VisitorsLayout.#createPrivacyNotice()",
          "anchor": "VisitorsLayout-createPrivacyNotice",
          "line": 155,
          "text": "Skapar sidans integritetsinformation.\n\nTexten anger att:\n\n* Besök räknas anonymt.  \n* Ungefärlig geografisk plats kan bestämmas av Vercel.  \n* IP-adresser och besökaridentiteter inte lagras.\n\n🔗 **Anropas av:** `#createPanelNotes()`.\n\n⚙️ **Effekt:** Returnerar ett `p.visitors-layout__privacy`.\n\nDetta är endast skapandet av informationstexten. Metoden gör ingen nätverksbegäran och verifierar inte själv hur data hanteras."
        },
        {
          "kind": "function",
          "name": "VisitorsLayout.#createLoginArea()",
          "identifier": "VisitorsLayout.#createLoginArea()",
          "anchor": "VisitorsLayout-createLoginArea",
          "line": 164,
          "text": "Bygger högerspaltens inloggningsområde.\n\n**Innehåll:**\n\n* Rubriken `Login & Account`.  \n* En uppmaning att logga in med Google.  \n* Det befintliga `loginPage.element`.\n\n⚙️ **Effekt:** Monterar inloggningspanelen.\n\nClerk startas inte av denna metod.\n\n---"
        }
      ],
      "notes": [
        "### **🌍 När besökarsidan öppnas**\n\n`VisitorsLayout.constructor()` → `#createWorldMap()` → tre SVG-kartor → `loadVisitorLocations()` → `requestVisitorLocations()`.\n\n### **📍 När geografiska positioner hämtas**\n\nConvex → `api.visitors.getVisitorLocations` → `addVisitorMarker()` → koordinatprojektion → SVG-cirklar på kartorna.\n\n### **📊 När statistiken laddas**\n\n`#createStatistics()` → `createVisitorStatistics()` → `loadVisitorStats()` → `requestVisitorStats()` → Convex → statistikpanelens textvärden.\n\n### **🔑 När inloggningsområdet skapas**\n\n`VisitorsLayout.constructor()` → `new LoginPage(authentication)` → `#createLoginArea()` → inloggningspanelen monteras.\n\n---"
      ]
    },
    {
      "path": "src/application/visitors/visitor-locations.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **📍 2\\. VisitorLocations — Hämtning av besökspositioner**\n\n\nDenna modul hämtar geografiska positioner från Convex och fördelar dem till världskartan, Sverigekartan och Kalmarkartan."
        },
        {
          "kind": "function",
          "name": "loadVisitorLocations()",
          "identifier": "loadVisitorLocations()",
          "anchor": "loadVisitorLocations",
          "line": 33,
          "text": "Startar hämtningen av besökspositioner.\n\n**Arbetsgång:**\n\n1. Kontrollerar modulflaggan `locationsRequested`.  \n2. Avslutar om hämtning redan har begärts.  \n3. Sätter flaggan till `true`.  \n4. Anropar `requestVisitorLocations()` utan att invänta dess Promise.\n\n🔗 **Anropas av:** `VisitorsLayout.#createWorldMap()`.\n\n⚙️ **Effekt:** Startar högst en begäran genom denna funktion under samma modulinstans.\n\n💡 **Begrepp — Guard Clause:** Ett tidigt villkor som avslutar funktionen när en viss åtgärd inte ska utföras.\n\n💡 **Viktig detalj:** Flaggan sätts före nätverkssvaret. Ett misslyckat försök innebär därför inte automatiskt att nästa anrop försöker igen."
        },
        {
          "kind": "function",
          "name": "insetMarkerRadius()",
          "identifier": "insetMarkerRadius()",
          "anchor": "insetMarkerRadius",
          "line": 45,
          "text": "Beräknar en markörradie för en detaljkarta.\n\nSyftet är att markörerna på Sverige- och Kalmarkartorna ska få motsvarande visuella storlek som världsmarkörens radie 16\\.\n\n**Beräkning:**\n\n`16 * viewBoxHeight / (2880 * shareOfWorldHeight)`\n\nResultatet avrundas till två decimaler.\n\n**Användning:**\n\n* Sverige: `insetMarkerRadius(1000, 0.58)`  \n* Kalmar: `insetMarkerRadius(1000, 0.29)`\n\nResultaten sparas i `sverigePlacement` och `kalmarPlacement`.\n\n⚙️ **Effekt:** Returnerar ett beräknat tal.\n\n💡 **Begrepp — Inset Map:** En mindre detaljkarta som visar ett begränsat geografiskt område med annan skala än huvudkartan."
        },
        {
          "kind": "function",
          "name": "requestVisitorLocations()",
          "identifier": "requestVisitorLocations()",
          "anchor": "requestVisitorLocations",
          "line": 53,
          "text": "Hämtar sparade besökspositioner från Convex och ritar markörer på kartorna.\n\n**Arbetsgång:**\n\n1. Anropar `api.visitors.getVisitorLocations` med `{}`.  \n2. Går igenom de returnerade besökspositionerna.  \n3. Läser `latitude`, `longitude` och `deviceType`.  \n4. Anropar `addVisitorMarker()` för världskartan.  \n5. Anropar `addVisitorMarker()` för Sverigekartan med `sverigePlacement`.  \n6. Anropar `addVisitorMarker()` för Kalmarkartan med `kalmarPlacement`.\n\n**Felhantering:**\n\n`Failed to load visitor locations`\n\n⚙️ **Effekt:** Lägger till SVG-cirklar för besökspositionerna på de tre kartorna, där respektive projektion ger en giltig punkt.\n\n💡 **Arkitekturprincip — Data-Driven Rendering:** Geografiska data avgör var grafiska markörer ska placeras.\n\n---"
        }
      ],
      "notes": [
        "### **🌍 När besökarsidan öppnas**\n\n`VisitorsLayout.constructor()` → `#createWorldMap()` → tre SVG-kartor → `loadVisitorLocations()` → `requestVisitorLocations()`.\n\n### **📍 När geografiska positioner hämtas**\n\nConvex → `api.visitors.getVisitorLocations` → `addVisitorMarker()` → koordinatprojektion → SVG-cirklar på kartorna.\n\n### **📊 När statistiken laddas**\n\n`#createStatistics()` → `createVisitorStatistics()` → `loadVisitorStats()` → `requestVisitorStats()` → Convex → statistikpanelens textvärden.\n\n### **🔑 När inloggningsområdet skapas**\n\n`VisitorsLayout.constructor()` → `new LoginPage(authentication)` → `#createLoginArea()` → inloggningspanelen monteras.\n\n---"
      ]
    },
    {
      "path": "src/application/visitors/visitor-marker.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🎨 3\\. VisitorMarker — Geografiska SVG-markörer**\n\n\nDenna modul omvandlar geografiska koordinater till positioner i SVG och ritar färgkodade cirklar."
        },
        {
          "kind": "function",
          "name": "projectVisitorLocation()",
          "identifier": "projectVisitorLocation()",
          "anchor": "projectVisitorLocation",
          "line": 15,
          "text": "Omvandlar latitud och longitud till koordinater på en ekvirektangulär världskarta.\n\n**Beräkning av x:**\n\n`((longitude + 180) / 360) * 5760`\n\n**Beräkning av y:**\n\n`((90 - latitude) / 180) * 2880`\n\nVärldskartans koordinatsystem är alltså 5760 × 2880\\.\n\n**Förklaring:**\n\n* Longitud −180° placeras vid vänsterkanten.  \n* Longitud \\+180° placeras vid högerkanten.  \n* Latitud \\+90° placeras vid överkanten.  \n* Latitud −90° placeras vid nederkanten.\n\n🔗 **Anropas av:** `addVisitorMarker()` när ingen särskild projektion skickas med.\n\n⚙️ **Effekt:** Returnerar en punkt `{ x, y }`.\n\n💡 **Begrepp — Equirectangular Projection:** En kartprojektion där longitud och latitud omvandlas linjärt till x- och y-koordinater."
        },
        {
          "kind": "function",
          "name": "addVisitorMarker()",
          "identifier": "addVisitorMarker()",
          "anchor": "addVisitorMarker",
          "line": 35,
          "text": "Ritar en färgad cirkel för en besöksposition.\n\n**Arbetsgång:**\n\n1. Väljer en koordinatprojektion.  \n2. Använder `placement.project` om en särskild placering finns.  \n3. Använder annars `projectVisitorLocation()`.  \n4. Returnerar `null` om projektionen inte ger någon punkt.  \n5. Skapar en SVG-`circle` med `appendSvg()`.  \n6. Sätter position, radie, färg och kontur.  \n7. Lägger till CSS-klassen `visitors-layout__visitor-marker`.  \n8. Returnerar cirkeln.\n\n**Färgkodning efter enhet:**\n\n🔴 Windows — `#FF4545`\n\n🟢 Mac — `#39D96A`\n\n🔵 Mobile — `#38A9FF`\n\n🟡 Other — `#FFD447`\n\n**Grafiska egenskaper:**\n\n* Radie: 16 eller placeringens särskilda radie.  \n* Konturfärg: `#0B2941`.  \n* Konturtjocklek: `0.5`.  \n* `vector-effect=\"non-scaling-stroke\"`.\n\n🔗 **Anropas av:** `requestVisitorLocations()`.\n\n⚙️ **Effekt:** Skapar och monterar en SVG-cirkel.\n\n💡 **Begrepp — Non-Scaling Stroke:** En SVG-egenskap som gör att konturlinjens tjocklek inte förändras på samma sätt som grafiken när den skalas.\n\n---"
        }
      ],
      "notes": [
        "### **🌍 När besökarsidan öppnas**\n\n`VisitorsLayout.constructor()` → `#createWorldMap()` → tre SVG-kartor → `loadVisitorLocations()` → `requestVisitorLocations()`.\n\n### **📍 När geografiska positioner hämtas**\n\nConvex → `api.visitors.getVisitorLocations` → `addVisitorMarker()` → koordinatprojektion → SVG-cirklar på kartorna.\n\n### **📊 När statistiken laddas**\n\n`#createStatistics()` → `createVisitorStatistics()` → `loadVisitorStats()` → `requestVisitorStats()` → Convex → statistikpanelens textvärden.\n\n### **🔑 När inloggningsområdet skapas**\n\n`VisitorsLayout.constructor()` → `new LoginPage(authentication)` → `#createLoginArea()` → inloggningspanelen monteras.\n\n---"
      ]
    },
    {
      "path": "src/application/visitors/visitor-statistics.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **📊 4\\. VisitorStatistics — Statistikpanelen**\n\n\nDenna modul skapar statistikpanelen och hämtar besökssiffror från Convex."
        },
        {
          "kind": "function",
          "name": "createVisitorStatistics()",
          "identifier": "createVisitorStatistics()",
          "anchor": "createVisitorStatistics",
          "line": 21,
          "text": "Bygger statistikpanelen.\n\n**Arbetsgång:**\n\n1. Skapar `div.visitors-layout__statistics`.  \n2. Skapar ett `strong`\\-element med platshållaren `—`.  \n3. Anropar `createTotal()`.  \n4. Anropar `createDeviceCounters()`.  \n5. Anropar `loadVisitorStats()`.\n\n🔗 **Anropas av:** `VisitorsLayout.#createStatistics()`.\n\n⚙️ **Effekt:** Returnerar statistikpanelen med platshållare.\n\nSiffrorna fylls i senare när Convex svarar."
        },
        {
          "kind": "function",
          "name": "createTotal()",
          "identifier": "createTotal()",
          "anchor": "createTotal",
          "line": 40,
          "text": "Skapar raden som visar det totala antalet besökare.\n\n**Innehåll:**\n\n* CSS-klassen `visitors-layout__statistic`.  \n* CSS-klassen `visitors-layout__statistic--total`.  \n* Etiketten `Total visitors`.  \n* Ett värdeelement som skapats av anroparen.\n\n🔗 **Anropas av:** `createVisitorStatistics()`.\n\n⚙️ **Effekt:** Returnerar raden.\n\nMetoden ändrar inte själva siffervärdet."
        },
        {
          "kind": "function",
          "name": "createDeviceCounters()",
          "identifier": "createDeviceCounters()",
          "anchor": "createDeviceCounters",
          "line": 52,
          "text": "Skapar statistiklistan för fyra enhetskategorier.\n\n**Ordning:**\n\n1. 🟢 Mac  \n2. 🔵 Mobile  \n3. 🔴 Windows  \n4. 🟡 Other\n\nFör varje kategori skapas:\n\n* En färgruta.  \n* En textetikett.  \n* Ett `strong`\\-element med platshållaren `—`.\n\n🔗 **Anropas av:** `createVisitorStatistics()`.\n\n⚙️ **Effekt:** Returnerar listan och referenser till värdeelementen så att de kan uppdateras senare."
        },
        {
          "kind": "function",
          "name": "loadVisitorStats()",
          "identifier": "loadVisitorStats()",
          "anchor": "loadVisitorStats",
          "line": 84,
          "text": "Startar hämtningen av besöksstatistik.\n\n**Arbetsgång:**\n\n1. Kontrollerar `statsRequested`.  \n2. Avslutar om en begäran redan har startats.  \n3. Sätter flaggan till `true`.  \n4. Anropar `requestVisitorStats()`.\n\n🔗 **Anropas av:** `createVisitorStatistics()`.\n\n⚙️ **Effekt:** Startar en enda begäran genom funktionen under samma modulinstans.\n\nPrecis som för besökspositionerna återställs inte flaggan automatiskt efter ett misslyckat försök."
        },
        {
          "kind": "function",
          "name": "requestVisitorStats()",
          "identifier": "requestVisitorStats()",
          "anchor": "requestVisitorStats",
          "line": 97,
          "text": "Hämtar besöksstatistik från Convex och uppdaterar panelens siffror.\n\n**Arbetsgång:**\n\n1. Anropar `api.visitors.getVisitorStats` med `{}`.  \n2. Läser `stats.total`.  \n3. Skriver totalsiffran med `String(stats.total)`.  \n4. Går igenom kategorierna `mac`, `mobile`, `windows` och `other`.  \n5. Skriver varje värde med `String(stats[device])`.\n\n**Felhantering:**\n\n`Failed to load visitor statistics`\n\n⚙️ **Effekt:** Ersätter platshållarna `—` med de hämtade siffrorna.\n\nOm frågan misslyckas lämnas platshållarna kvar.\n\n💡 **Arkitekturprincip — Asynchronous UI Update:** Gränssnittet skapas först och uppdateras när nätverksanropet har returnerat data.\n\n---"
        }
      ],
      "notes": [
        "### **🌍 När besökarsidan öppnas**\n\n`VisitorsLayout.constructor()` → `#createWorldMap()` → tre SVG-kartor → `loadVisitorLocations()` → `requestVisitorLocations()`.\n\n### **📍 När geografiska positioner hämtas**\n\nConvex → `api.visitors.getVisitorLocations` → `addVisitorMarker()` → koordinatprojektion → SVG-cirklar på kartorna.\n\n### **📊 När statistiken laddas**\n\n`#createStatistics()` → `createVisitorStatistics()` → `loadVisitorStats()` → `requestVisitorStats()` → Convex → statistikpanelens textvärden.\n\n### **🔑 När inloggningsområdet skapas**\n\n`VisitorsLayout.constructor()` → `new LoginPage(authentication)` → `#createLoginArea()` → inloggningspanelen monteras.\n\n---"
      ]
    },
    {
      "path": "src/application/visitors/visitor-tracking.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🕵️ 1\\. VisitorTracking — Identifiering av enhet och position**\n\n\nDen här modulen ansvarar för att identifiera vilken typ av enhet besökaren använder och försöka hämta en ungefärlig geografisk position.\n\nEnhetsidentifieringen använder det externa biblioteket `visitor-module`.\n\nNär modulen laddas skapas en parser:\n\n`const parser = new UserAgentParser()`\n\nParsern återanvänds sedan vid enhetsidentifiering."
        },
        {
          "kind": "function",
          "name": "detectVisitorDevice()",
          "identifier": "detectVisitorDevice()",
          "anchor": "detectVisitorDevice",
          "line": 7,
          "text": "Identifierar besökarens enhetskategori utifrån webbläsarens User-Agent-sträng.\n\n**Arbetsgång:**\n\n1. Läser `navigator.userAgent` om inget annat argument skickas.  \n2. Anropar `parser.parseDeviceType(userAgent)`.  \n3. Om enheten är `Mobile` eller `Tablet` returneras `mobile`.  \n4. Annars anropas `parser.parseOperatingSystem(userAgent)`.  \n5. Om operativsystemet är `Windows` returneras `windows`.  \n6. Om operativsystemet är `MacOs` returneras `mac`.  \n7. Alla övriga kombinationer ger `other`.\n\n**Möjliga resultat:**\n\n📱 `mobile` — telefoner och surfplattor  \n🪟 `windows` — Windows-enheter  \n🍎 `mac` — Mac-enheter  \n💻 `other` — övriga eller okända enheter\n\n🔗 **Anropas av:** `sendAnonymousVisit()`.\n\n⚙️ **Effekt:** Returnerar en enhetskategori som sträng.\n\nFunktionen sparar inte något besök i databasen.\n\n💡 **Begrepp — User-Agent:** En textsträng som webbläsaren tillhandahåller och som kan innehålla information om webbläsare, operativsystem och enhet.\n\n💡 **Viktig detalj:** Enhetsidentifieringen är en klassificering baserad på User-Agent, inte en garanti för vilken fysisk enhet som används."
        },
        {
          "kind": "function",
          "name": "isValidCoordinate()",
          "identifier": "isValidCoordinate()",
          "anchor": "isValidCoordinate",
          "line": 36,
          "text": "Kontrollerar att två tal kan representera giltig latitud och longitud.\n\n**Villkor:**\n\n* Båda värdena måste vara ändliga tal.  \n* Latitud måste ligga mellan −90 och \\+90.  \n* Longitud måste ligga mellan −180 och \\+180.  \n* Gränsvärdena är tillåtna.\n\n**Exempel:**\n\n* Latitud 56, longitud 16 → giltigt.  \n* Latitud 95, longitud 16 → ogiltigt.  \n* Latitud 56, longitud 200 → ogiltigt.  \n* `NaN` eller `Infinity` → ogiltigt.\n\n🔗 **Anropas av:** `readLocation()`.\n\n⚙️ **Effekt:** Returnerar `true` eller `false`.\n\nInga värden ändras.\n\n💡 **Begrepp — Validation:** Att kontrollera att inkommande data uppfyller bestämda regler innan den används."
        },
        {
          "kind": "function",
          "name": "readLocation()",
          "identifier": "readLocation()",
          "anchor": "readLocation",
          "line": 47,
          "text": "Försöker läsa en giltig geografisk position ur ett okänt JSON-värde.\n\n**Arbetsgång:**\n\n1. Kontrollerar att värdet är ett objekt.  \n2. Avvisar `null`.  \n3. Kontrollerar att `success` är exakt `true`.  \n4. Kontrollerar att `latitude` och `longitude` är tal.  \n5. Anropar `isValidCoordinate()`.  \n6. Returnerar `undefined` om någon kontroll misslyckas.  \n7. Returnerar annars ett nytt objekt med latitud och longitud.\n\n**Resultat vid framgång:**\n\n`{ latitude, longitude }`\n\nÖvriga fält från API-svaret följer inte med.\n\n🔗 **Anropas av:** `detectVisitorLocation()`.\n\n⚙️ **Effekt:** Returnerar ett nytt positionsobjekt eller `undefined`.\n\n💡 **Arkitekturprincip — Defensive Programming:** Funktionen litar inte automatiskt på data som kommer från ett API, utan validerar innehållet före användning."
        },
        {
          "kind": "function",
          "name": "detectVisitorLocation()",
          "identifier": "detectVisitorLocation()",
          "anchor": "detectVisitorLocation",
          "line": 72,
          "text": "Försöker hämta besökarens ungefärliga geografiska position genom applikationens eget API.\n\n**Arbetsgång:**\n\n1. Anropar `fetch('/api/visitor-location')`.  \n2. Kontrollerar `response.ok`.  \n3. Returnerar `undefined` om HTTP-svaret inte är lyckat.  \n4. Läser JSON med `response.json()`.  \n5. Skickar resultatet till `readLocation()`.  \n6. Returnerar en giltig position om den finns.  \n7. Fångar eventuella fel och returnerar `undefined`.\n\n🔗 **Anropas av:** `sendAnonymousVisit()`.\n\n⚙️ **Effekt:** Gör ett nätverksanrop till samma ursprung som webbapplikationen.\n\nFunktionen loggar inte fel och kastar dem inte vidare.\n\n💡 **Begrepp — Same-Origin Request:** Ett nätverksanrop till samma webbplats eller serverursprung som sidan själv kommer från.\n\n💡 **Viktig detalj:** Funktionen begär inte GPS-position genom webbläsarens Geolocation API. Den använder applikationens egen API-adress för att försöka få en ungefärlig position.\n\n---"
        }
      ],
      "notes": [
        "### **🚀 När webbapplikationen startar**\n\n`src/main.ts` → `registerAnonymousVisit()` → `sendAnonymousVisit()`.\n\n### **💻 När enhetstypen identifieras**\n\n`sendAnonymousVisit()` → `detectVisitorDevice()` → `UserAgentParser` → `mobile`, `windows`, `mac` eller `other`.\n\n### **📍 När positionen hämtas**\n\n`sendAnonymousVisit()` → `detectVisitorLocation()` → `/api/visitor-location` → `readLocation()` → `isValidCoordinate()`.\n\n### **💾 När besöket sparas**\n\nEnhetskategori \\+ eventuell position → `api.visitors.registerVisit` → Convex-databasen.\n\n### **📊 När besöket senare visas i statistiken**\n\nConvex → `api.visitors.getVisitorStats` → `requestVisitorStats()` → statistikpanelen.\n\n### **🌍 När besökspositionen senare visas på kartorna**\n\nConvex → `api.visitors.getVisitorLocations` → `requestVisitorLocations()` → `addVisitorMarker()` → geografiska SVG-kartor.\n\n---"
      ]
    },
    {
      "path": "src/application/visitors/visitor-registration.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **📡 2\\. VisitorRegistration — Anonym besöksregistrering**\n\n\nDen här modulen samlar enhetsidentifieringen och den eventuella geografiska positionen och skickar resultatet till Convex."
        },
        {
          "kind": "function",
          "name": "registerAnonymousVisit()",
          "identifier": "registerAnonymousVisit()",
          "anchor": "registerAnonymousVisit",
          "line": 10,
          "text": "Startar registreringen av ett anonymt besök.\n\n**Arbetsgång:**\n\n1. Kontrollerar modulflaggan `registrationStarted`.  \n2. Avslutar om flaggan redan är `true`.  \n3. Sätter flaggan till `true`.  \n4. Anropar `sendAnonymousVisit(client)`.  \n5. Väntar inte på funktionens Promise.\n\n🔗 **Anropas av:** Modulstarten i `src/main.ts`, med `convex.client`.\n\n⚙️ **Effekt:** Startar högst ett registreringsförsök genom funktionen under samma sidladdning.\n\n💡 **Begrepp — Guard Clause:** Ett villkor som avslutar en funktion tidigt när en viss åtgärd inte ska upprepas.\n\n💡 **Viktig detalj:** Flaggan sätts innan registreringen är färdig. Om registreringen misslyckas försöker ett senare anrop under samma sidladdning inte automatiskt igen."
        },
        {
          "kind": "function",
          "name": "sendAnonymousVisit()",
          "identifier": "sendAnonymousVisit()",
          "anchor": "sendAnonymousVisit",
          "line": 19,
          "text": "Samlar besökarens enhetstyp och eventuella position och skickar uppgifterna till Convex.\n\n**Arbetsgång:**\n\n1. Anropar `detectVisitorDevice()`.  \n2. Väntar på `detectVisitorLocation()`.  \n3. Bygger ett argumentobjekt med `deviceType`.  \n4. Lägger till `location` om en giltig position finns.  \n5. Anropar Convex-mutationen `api.visitors.registerVisit`.  \n6. Fångar och loggar eventuella fel.\n\n**När position finns skickas:**\n\n`{ deviceType, location }`\n\n**När position saknas skickas:**\n\n`{ deviceType }`\n\n**Felmeddelande:**\n\n`Failed to register anonymous visit`\n\n🔗 **Anropas av:** `registerAnonymousVisit()`.\n\n⚙️ **Effekt:** Registrerar ett besök i Convex när mutationen lyckas.\n\n💡 **Begrepp — Conditional Spread:** Att använda spridningsoperatorn `...` för att lägga till egenskaper i ett objekt endast när ett villkor är uppfyllt.\n\n💡 **Viktig detalj:** Registreringen kräver inte att en geografisk position har kunnat hämtas. Enhetskategorin skickas även när platsinformationen saknas.\n\n---"
        }
      ],
      "notes": [
        "### **🚀 När webbapplikationen startar**\n\n`src/main.ts` → `registerAnonymousVisit()` → `sendAnonymousVisit()`.\n\n### **💻 När enhetstypen identifieras**\n\n`sendAnonymousVisit()` → `detectVisitorDevice()` → `UserAgentParser` → `mobile`, `windows`, `mac` eller `other`.\n\n### **📍 När positionen hämtas**\n\n`sendAnonymousVisit()` → `detectVisitorLocation()` → `/api/visitor-location` → `readLocation()` → `isValidCoordinate()`.\n\n### **💾 När besöket sparas**\n\nEnhetskategori \\+ eventuell position → `api.visitors.registerVisit` → Convex-databasen.\n\n### **📊 När besöket senare visas i statistiken**\n\nConvex → `api.visitors.getVisitorStats` → `requestVisitorStats()` → statistikpanelen.\n\n### **🌍 När besökspositionen senare visas på kartorna**\n\nConvex → `api.visitors.getVisitorLocations` → `requestVisitorLocations()` → `addVisitorMarker()` → geografiska SVG-kartor.\n\n---"
      ]
    },
    {
      "path": "src/application/wiki/civ-wiki.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🏛️ 1\\. CivWiki — Wikins övergripande arkitektur**\n\n\nDenna fil exporterar `CivWikiMain` under namnet `CivWiki`.\n\nDen innehåller ingen egen körbar funktion.\n\nDet betyder att när `ApplicationLayout` skapar `new CivWiki()` körs konstruktorn i `CivWikiMain`.\n\n💡 **Begrepp — Export Alias:** Ett namn som används för att exponera en befintlig klass eller funktion under ett annat namn.\n\n---"
        }
      ],
      "notes": [
        "### **🚀 När wikin skapas**\n\n`ApplicationLayout` → `CivWikiMain.constructor()` → `CivWikiNavigation` → `#createContent()` → alla sidpaneler → `#showPage('home')`.\n\n### **🧭 När användaren väljer en kategori**\n\nNavigeringsknapp → klickcallback → `#onSelect(id)` → `CivWikiMain.#showPage()` → vald panel visas.\n\n### **🌄 När terrängencyklopedin byggs**\n\n`#createTerrainPanel()` → `CivWikiTerrain.createElement()` → `#createTerrainRow()` → `#createGraphic()` → SVG.\n\n### **🎨 När ikongalleriet byggs**\n\n`#createCategoryPanel()` → `iconsFor()` → `CivWikiIcons.createGrid()` → `#createCard()` → `createIcon()` och `iconTitle()`.\n\n---"
      ]
    },
    {
      "path": "src/application/wiki/civ-wiki-home.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🏠 2\\. CivWikiHome — Wikins startsida**"
        },
        {
          "kind": "function",
          "name": "CivWikiHome.createElement()",
          "identifier": "CivWikiHome.createElement()",
          "anchor": "CivWikiHome-createElement",
          "line": 2,
          "text": "Skapar wikins välkomstsida.\n\n**Arbetsgång:**\n\n1. Skapar `section.civ-wiki__section`.  \n2. Skapar rubriken `Welcome to Civilization of Wonders`.  \n3. Ger rubriken id `civ-wiki-home`.  \n4. Kopplar sektionens `aria-labelledby` till rubriken.  \n5. Skapar tre underrubriker med tillhörande beskrivningar.\n\n**Sidans tre ämnen:**\n\n🌍 `Explore the world` — utforskning av världen.\n\n📚 `The encyclopedia` — wikins uppslagsverk.\n\n🎨 `Terrain graphics` — terränggrafiken.\n\n🔗 **Anropas av:** `CivWikiMain.#createContent()`.\n\n⚙️ **Effekt:** Returnerar startsidans HTML-sektion.\n\nMetoden bestämmer inte själv om sidan ska vara synlig.\n\n---"
        }
      ],
      "notes": [
        "### **🚀 När wikin skapas**\n\n`ApplicationLayout` → `CivWikiMain.constructor()` → `CivWikiNavigation` → `#createContent()` → alla sidpaneler → `#showPage('home')`.\n\n### **🧭 När användaren väljer en kategori**\n\nNavigeringsknapp → klickcallback → `#onSelect(id)` → `CivWikiMain.#showPage()` → vald panel visas.\n\n### **🌄 När terrängencyklopedin byggs**\n\n`#createTerrainPanel()` → `CivWikiTerrain.createElement()` → `#createTerrainRow()` → `#createGraphic()` → SVG.\n\n### **🎨 När ikongalleriet byggs**\n\n`#createCategoryPanel()` → `iconsFor()` → `CivWikiIcons.createGrid()` → `#createCard()` → `createIcon()` och `iconTitle()`.\n\n---"
      ]
    },
    {
      "path": "src/application/wiki/civ-wiki-main.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🧭 3\\. CivWikiMain — Wikins centrala styrenhet**\n\n\nKlassen `CivWikiMain` bygger hela wikins skal och bestämmer vilken innehållspanel som ska visas."
        },
        {
          "kind": "function",
          "name": "CivWikiMain.constructor()",
          "identifier": "CivWikiMain.constructor()",
          "anchor": "CivWikiMain-constructor",
          "line": 23,
          "text": "Skapar wikins huvudstruktur.\n\n**Arbetsgång:**\n\n1. Skapar `section.civ-wiki`.  \n2. Sätter `aria-label=\"Civilization of Wonders Wiki\"`.  \n3. Skapar `CivWikiHome`.  \n4. Skapar `CivWikiIcons`.  \n5. Skapar `CivWikiTerrain`.  \n6. Skapar `CivWikiNavigation` med en navigeringscallback.  \n7. Anropar `#createIntro()`.  \n8. Anropar `#createContent()`.  \n9. Anropar `#showPage('home')`.\n\n🔗 **Anropas av:** `ApplicationLayout.constructor()` genom aliaset `CivWiki`.\n\n⚙️ **Effekt:** Bygger wikins gränssnitt och visar startsidan."
        },
        {
          "kind": "function",
          "name": "Navigeringscallback",
          "identifier": "navigeringscallback",
          "anchor": "navigeringscallback",
          "line": 34,
          "text": "Tar emot ett sid-id från navigeringskomponenten.\n\n🔗 **Anropar:** `#showPage(pageId)`.\n\n⚙️ **Effekt:** Begär att wikin ska visa den valda sidan.\n\n💡 **Arkitekturprincip — Callback Communication:** Navigeringskomponenten meddelar huvudklassen vilken sida som valts, utan att själv hantera innehållspanelerna."
        },
        {
          "kind": "function",
          "name": "CivWikiMain.#createIntro()",
          "identifier": "CivWikiMain.#createIntro()",
          "anchor": "CivWikiMain-createIntro",
          "line": 54,
          "text": "Skapar wikins sidhuvud.\n\n**Innehåll:**\n\n* Huvudrubrik: `Civilization of Wonders Wiki`.  \n* Underrubrik: `Terrain encyclopedia and SVG graphics gallery`.\n\n🔗 **Anropas av:** Konstruktorn.\n\n⚙️ **Effekt:** Returnerar `header.civ-wiki__intro`."
        },
        {
          "kind": "function",
          "name": "CivWikiMain.#createContent()",
          "identifier": "CivWikiMain.#createContent()",
          "anchor": "CivWikiMain-createContent",
          "line": 71,
          "text": "Skapar samtliga innehållspaneler.\n\n**Arbetsgång:**\n\n1. Skapar en panel för startsidan.  \n2. Anropar `CivWikiHome.createElement()`.  \n3. Sparar startsidan i `#panels` under nyckeln `home`.  \n4. Går igenom kategorierna i `WIKI_GROUPS`.  \n5. Anropar `#createTerrainPanel()` för `base-terrains`.  \n6. Anropar `#createCategoryPanel()` för övriga kategorier.  \n7. Sparar varje panel i `#panels` under kategori-id.\n\n🔗 **Anropas av:** Konstruktorn.\n\n⚙️ **Effekt:** Returnerar `div.civ-wiki__content` med alla paneler.\n\nPanelerna skapas innan synligheten bestäms.\n\n💡 **Arkitekturprincip — Pre-rendered Panels:** Flera paneler byggs i förväg och visas eller döljs sedan vid navigering."
        },
        {
          "kind": "function",
          "name": "CivWikiMain.#createTerrainPanel()",
          "identifier": "CivWikiMain.#createTerrainPanel()",
          "anchor": "CivWikiMain-createTerrainPanel",
          "line": 96,
          "text": "Skapar panelen för basterräng.\n\n**Innehåll:**\n\n1. En tabell med stora terrängbilder.  \n2. En samling verktygsikoner för terräng.\n\n🔗 **Anropar:**\n\n* `CivWikiTerrain.createElement()`  \n* `CivWikiIcons.createTerrainIcons()`\n\n⚙️ **Effekt:** Returnerar `div.civ-wiki__panel`."
        },
        {
          "kind": "function",
          "name": "CivWikiMain.#createCategoryPanel()",
          "identifier": "CivWikiMain.#createCategoryPanel()",
          "anchor": "CivWikiMain-createCategoryPanel",
          "line": 108,
          "text": "Skapar en innehållspanel för en wikikategori som inte är basterräng.\n\n**Arbetsgång:**\n\n1. Skapar `section.civ-wiki__panel`.  \n2. Skapar en rubrik med kategoriens namn.  \n3. Ger rubriken id `civ-wiki-` följt av kategori-id.  \n4. Kopplar `aria-labelledby` till rubriken.  \n5. Hämtar ikonlistan med `iconsFor(category.id)`.  \n6. Skapar ett ikonrutnät med `CivWikiIcons.createGrid()`.\n\n🔗 **Anropas av:** `#createContent()`.\n\n⚙️ **Effekt:** Returnerar kategorins panel."
        },
        {
          "kind": "function",
          "name": "CivWikiMain.#showPage()",
          "identifier": "CivWikiMain.#showPage()",
          "anchor": "CivWikiMain-showPage",
          "line": 127,
          "text": "Visar en innehållspanel och döljer de övriga.\n\n**Arbetsgång:**\n\n1. Anropar `CivWikiNavigation.setSelected(pageId)`.  \n2. Går igenom panelerna i `#panels`.  \n3. Sätter `panel.hidden` till `true` för alla paneler som inte matchar sid-id.  \n4. Låter den matchande panelen vara synlig.  \n5. Sätter `this.element.scrollTop = 0`.\n\n🔗 **Anropas av:** Konstruktorn och navigeringscallbacken.\n\n⚙️ **Effekt:** Byter synlig wikisida och scrollar till toppen.\n\n💡 **Begrepp — Conditional Rendering:** Att styra vilket innehåll som visas utifrån ett valt tillstånd. Här används HTML-egenskapen `hidden` på redan skapade paneler.\n\n---"
        }
      ],
      "notes": [
        "### **🚀 När wikin skapas**\n\n`ApplicationLayout` → `CivWikiMain.constructor()` → `CivWikiNavigation` → `#createContent()` → alla sidpaneler → `#showPage('home')`.\n\n### **🧭 När användaren väljer en kategori**\n\nNavigeringsknapp → klickcallback → `#onSelect(id)` → `CivWikiMain.#showPage()` → vald panel visas.\n\n### **🌄 När terrängencyklopedin byggs**\n\n`#createTerrainPanel()` → `CivWikiTerrain.createElement()` → `#createTerrainRow()` → `#createGraphic()` → SVG.\n\n### **🎨 När ikongalleriet byggs**\n\n`#createCategoryPanel()` → `iconsFor()` → `CivWikiIcons.createGrid()` → `#createCard()` → `createIcon()` och `iconTitle()`.\n\n---"
      ]
    },
    {
      "path": "src/application/wiki/civ-wiki-navigation.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🧭 4\\. CivWikiNavigation — Wikins vänstermeny**\n\n\nDen här klassen bygger navigeringsmenyn och markerar vilken sida användaren har valt."
        },
        {
          "kind": "function",
          "name": "CivWikiNavigation.constructor()",
          "identifier": "CivWikiNavigation.constructor()",
          "anchor": "CivWikiNavigation-constructor",
          "line": 15,
          "text": "Skapar wikins vänsternavigering.\n\n**Arbetsgång:**\n\n1. Sparar callbacken `onSelect`.  \n2. Skapar `nav.civ-wiki__nav`.  \n3. Sätter `aria-label=\"Encyclopedia\"`.  \n4. Skapar knappen `Home`.  \n5. Går igenom grupperna i `WIKI_GROUPS`.  \n6. Skapar gruppetiketter.  \n7. Skapar en knapp för varje kategori.\n\n**Navigeringsgrupper:**\n\n📚 `Encyclopedia`\n\n🛠️ `Editor Reference`\n\n🔗 **Anropas av:** `CivWikiMain.constructor()`.\n\n⚙️ **Effekt:** Skapar navigeringsmenyn.\n\nIngen knapp markeras i konstruktorn."
        },
        {
          "kind": "function",
          "name": "CivWikiNavigation.setSelected()",
          "identifier": "CivWikiNavigation.setSelected()",
          "anchor": "CivWikiNavigation-setSelected",
          "line": 54,
          "text": "Markerar knappen som motsvarar den aktuella sidan.\n\n**Arbetsgång:**\n\n1. Går igenom `#buttons`.  \n2. Jämför varje knapps id med det valda sid-id.  \n3. Lägger till `is-selected` på den matchande knappen.  \n4. Tar bort klassen från övriga knappar.  \n5. Uppdaterar `aria-pressed` till `true` eller `false`.\n\n🔗 **Anropas av:** `CivWikiMain.#showPage()`.\n\n⚙️ **Effekt:** Ändrar navigeringsknapparnas visuella och tillgänglighetsrelaterade tillstånd.\n\nMetoden byter inte själv innehållspanel."
        },
        {
          "kind": "function",
          "name": "CivWikiNavigation.#createCategoryButton()",
          "identifier": "CivWikiNavigation.#createCategoryButton()",
          "anchor": "CivWikiNavigation-createCategoryButton",
          "line": 63,
          "text": "Skapar en navigeringsknapp för en kategori.\n\n🔗 **Anropar:** `#createButton(category.id, category.label)`.\n\n⚙️ **Effekt:** Returnerar den skapade knappen."
        },
        {
          "kind": "function",
          "name": "CivWikiNavigation.#createButton()",
          "identifier": "CivWikiNavigation.#createButton()",
          "anchor": "CivWikiNavigation-createButton",
          "line": 67,
          "text": "Skapar en navigeringsknapp och sparar den i klassens interna samling.\n\n**Arbetsgång:**\n\n1. Skapar `button.civ-wiki__nav-button`.  \n2. Sätter knappens text.  \n3. Registrerar en klicklyssnare.  \n4. Sparar knappen i `#buttons` under dess id.  \n5. Returnerar knappen.\n\n🔗 **Anropas av:** Konstruktorn och `#createCategoryButton()`.\n\n⚙️ **Effekt:** Skapar och registrerar knappen."
        },
        {
          "kind": "function",
          "name": "Klick på navigeringsknapp",
          "identifier": "klick på navigeringsknapp",
          "anchor": "klick-på-navigeringsknapp",
          "line": 76,
          "text": "Callback som körs när användaren klickar på en navigeringsknapp.\n\n🔗 **Anropar:** `#onSelect(id)`.\n\nVarje knapp kommer ihåg sitt eget sid-id.\n\nI `CivWikiMain` leder callbacken vidare till `#showPage()`.\n\n⚙️ **Effekt:** Begär ett sidbyte.\n\n💡 **Begrepp — Closure:** En funktion kan komma ihåg variabler från den omgivning där den skapades. Här minns varje knapp sitt sid-id.\n\n---"
        }
      ],
      "notes": [
        "### **🚀 När wikin skapas**\n\n`ApplicationLayout` → `CivWikiMain.constructor()` → `CivWikiNavigation` → `#createContent()` → alla sidpaneler → `#showPage('home')`.\n\n### **🧭 När användaren väljer en kategori**\n\nNavigeringsknapp → klickcallback → `#onSelect(id)` → `CivWikiMain.#showPage()` → vald panel visas.\n\n### **🌄 När terrängencyklopedin byggs**\n\n`#createTerrainPanel()` → `CivWikiTerrain.createElement()` → `#createTerrainRow()` → `#createGraphic()` → SVG.\n\n### **🎨 När ikongalleriet byggs**\n\n`#createCategoryPanel()` → `iconsFor()` → `CivWikiIcons.createGrid()` → `#createCard()` → `createIcon()` och `iconTitle()`.\n\n---"
      ]
    },
    {
      "path": "src/application/wiki/civ-wiki-terrains.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🌄 5\\. CivWikiTerrain — Terrängencyklopedin**\n\n\nDenna klass bygger wikins tabell med de 17 basterrängerna."
        },
        {
          "kind": "function",
          "name": "CivWikiTerrain.createElement()",
          "identifier": "CivWikiTerrain.createElement()",
          "anchor": "CivWikiTerrain-createElement",
          "line": 114,
          "text": "Skapar terrängencyklopedins tabell.\n\n**Tabellens kolumner:**\n\n* `Terrain`  \n* `Graphic`  \n* `Description`\n\n**Terrängtyper:**\n\n🌊 Ocean  \n🌊 Coast  \n🌱 Grass — Flat, Hills, Mountains  \n🌾 Plains — Flat, Hills, Mountains  \n🏜️ Desert — Flat, Hills, Mountains  \n❄️ Tundra — Flat, Hills, Mountains  \n🏔️ Snow — Flat, Hills, Mountains\n\nTotalt 17 kombinationer.\n\nFör varje post i `BASE_TERRAINS` anropas `#createTerrainRow()`.\n\n🔗 **Anropas av:** `CivWikiMain.#createTerrainPanel()`.\n\n⚙️ **Effekt:** Returnerar sektionen med den färdiga terrängtabellen."
        },
        {
          "kind": "function",
          "name": "CivWikiTerrain.#createTerrainRow()",
          "identifier": "CivWikiTerrain.#createTerrainRow()",
          "anchor": "CivWikiTerrain-createTerrainRow",
          "line": 151,
          "text": "Skapar en tabellrad för en terrängtyp.\n\n**Arbetsgång:**\n\n1. Skapar radens HTML-element.  \n2. Sätter terrängnamnet från `terrain.name`.  \n3. Anropar `#createGraphic(terrain.createGraphic)`.  \n4. Lägger till SVG-grafiken.  \n5. Sätter beskrivningen från `terrain.description`.\n\n🔗 **Anropas av:** `createElement()`.\n\n⚙️ **Effekt:** Returnerar en färdig `tr`."
        },
        {
          "kind": "function",
          "name": "CivWikiTerrain.#createGraphic()",
          "identifier": "CivWikiTerrain.#createGraphic()",
          "anchor": "CivWikiTerrain-createGraphic",
          "line": 170,
          "text": "Skapar terrängens SVG-grafik och beräknar dess bildförhållande.\n\n**Arbetsgång:**\n\n1. Anropar terrängens ritfunktion.  \n2. Lägger till CSS-klassen `civ-wiki__graphic`.  \n3. Läser SVG-attributet `viewBox`.  \n4. Delar upp koordinatsträngen.  \n5. Omvandlar delarna till tal.  \n6. Hämtar bredden från index 2 och höjden från index 3\\.  \n7. Sätter `style.aspectRatio` till bredd dividerad med höjd när båda värdena är sanningsvärda.\n\n🔗 **Anropas av:** `#createTerrainRow()`.\n\n⚙️ **Effekt:** Returnerar SVG-elementet med eventuellt anpassat bildförhållande.\n\nOm `viewBox`, bredd eller höjd saknas lämnas bildförhållandet oförändrat.\n\n💡 **Begrepp — Aspect Ratio:** Förhållandet mellan bredd och höjd. Det används för att bevara grafikens proportioner.\n\n---"
        }
      ],
      "notes": [
        "### **🚀 När wikin skapas**\n\n`ApplicationLayout` → `CivWikiMain.constructor()` → `CivWikiNavigation` → `#createContent()` → alla sidpaneler → `#showPage('home')`.\n\n### **🧭 När användaren väljer en kategori**\n\nNavigeringsknapp → klickcallback → `#onSelect(id)` → `CivWikiMain.#showPage()` → vald panel visas.\n\n### **🌄 När terrängencyklopedin byggs**\n\n`#createTerrainPanel()` → `CivWikiTerrain.createElement()` → `#createTerrainRow()` → `#createGraphic()` → SVG.\n\n### **🎨 När ikongalleriet byggs**\n\n`#createCategoryPanel()` → `iconsFor()` → `CivWikiIcons.createGrid()` → `#createCard()` → `createIcon()` och `iconTitle()`.\n\n---"
      ]
    },
    {
      "path": "src/application/wiki/civ-wiki-icons.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🎨 6\\. CivWikiIcons — Ikongalleriet**\n\n\nDenna klass skapar rutnät med SVG-ikoner och deras namn."
        },
        {
          "kind": "function",
          "name": "CivWikiIcons.createGrid()",
          "identifier": "CivWikiIcons.createGrid()",
          "anchor": "CivWikiIcons-createGrid",
          "line": 5,
          "text": "Skapar ett rutnät med ikonkort.\n\n**Arbetsgång:**\n\n1. Skapar `div.civ-wiki__grid`.  \n2. Går igenom listan med ikonnamn.  \n3. Anropar `#createCard(name)` för varje namn.  \n4. Lägger korten i rutnätet.\n\n🔗 **Anropas av:** `CivWikiMain.#createCategoryPanel()` och `createTerrainIcons()`.\n\n⚙️ **Effekt:** Returnerar det färdiga ikonrutnätet."
        },
        {
          "kind": "function",
          "name": "CivWikiIcons.createTerrainIcons()",
          "identifier": "CivWikiIcons.createTerrainIcons()",
          "anchor": "CivWikiIcons-createTerrainIcons",
          "line": 17,
          "text": "Skapar avsnittet med verktygsikoner för basterräng.\n\n**Innehåll:**\n\n* Rubriken `Terrain toolbar icons`.  \n* Information om de ursprungliga ikonerna i storleken 24 × 24\\.  \n* Ett rutnät med terrängikoner.\n\n🔗 **Anropar:** `iconsFor('base-terrains')` och `createGrid()`.\n\n⚙️ **Effekt:** Returnerar ikonsektionen."
        },
        {
          "kind": "function",
          "name": "CivWikiIcons.#createCard()",
          "identifier": "CivWikiIcons.#createCard()",
          "anchor": "CivWikiIcons-createCard",
          "line": 41,
          "text": "Skapar ett enskilt ikonkort.\n\n**Arbetsgång:**\n\n1. Anropar `createIcon(name)` från `icons.ts`.  \n2. Lägger till klassen `civ-wiki__icon`.  \n3. Hämtar en läsbar titel genom `iconTitle(name)`.  \n4. Visar ikonens tekniska id, alltså `name`.  \n5. Returnerar kortet.\n\n🔗 **Anropas av:** `createGrid()`.\n\n⚙️ **Effekt:** Returnerar `article.civ-wiki__card`.\n\nFunktionen `iconTitle()` dokumenteras i nästa del.\n\n---"
        }
      ],
      "notes": [
        "### **🚀 När wikin skapas**\n\n`ApplicationLayout` → `CivWikiMain.constructor()` → `CivWikiNavigation` → `#createContent()` → alla sidpaneler → `#showPage('home')`.\n\n### **🧭 När användaren väljer en kategori**\n\nNavigeringsknapp → klickcallback → `#onSelect(id)` → `CivWikiMain.#showPage()` → vald panel visas.\n\n### **🌄 När terrängencyklopedin byggs**\n\n`#createTerrainPanel()` → `CivWikiTerrain.createElement()` → `#createTerrainRow()` → `#createGraphic()` → SVG.\n\n### **🎨 När ikongalleriet byggs**\n\n`#createCategoryPanel()` → `iconsFor()` → `CivWikiIcons.createGrid()` → `#createCard()` → `createIcon()` och `iconTitle()`.\n\n---"
      ]
    },
    {
      "path": "src/application/wiki/catalog.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **📚 7\\. Catalog — Wikins ikonkatalog**"
        },
        {
          "kind": "function",
          "name": "iconsFor()",
          "identifier": "iconsFor()",
          "anchor": "iconsFor",
          "line": 104,
          "text": "Returnerar namnen på alla ikoner som tillhör en viss wikikategori.\n\n**Arbetsgång:**\n\n1. Hämtar nycklarna i `ICON_CATEGORY`.  \n2. Filtrerar dem efter den begärda kategorin.  \n3. Returnerar de matchande ikonnamnen.\n\nResultaten behåller katalogens deklarationsordning.\n\n🔗 **Anropas av:** `CivWikiMain.#createCategoryPanel()` och `CivWikiIcons.createTerrainIcons()`.\n\n⚙️ **Effekt:** Returnerar en ny array utan att ändra katalogen.\n\n💡 **Begrepp — Data-Driven UI:** Gränssnittets innehåll byggs från en central datastruktur i stället för att varje ikon eller kategori skrivs in separat i layoutkoden.\n\n---"
        },
        {
          "kind": "prose",
          "text": "## **📚 1\\. Catalog — Wikins sista funktioner**"
        },
        {
          "kind": "function",
          "name": "iconTitle()",
          "identifier": "iconTitle()",
          "anchor": "iconTitle",
          "line": 110,
          "text": "Omvandlar ett tekniskt ikon-id till en läsbar titel.\n\n**Arbetsgång:**\n\n1. Tar emot ikonens namn.  \n2. Delar strängen vid varje bindestreck.  \n3. Skickar varje ord till en callback.  \n4. Sätter ihop orden igen med mellanslag.\n\n**Exempel:**\n\n`river-source` → `River Source`\n\n🔗 **Anropas av:** `CivWikiIcons.#createCard()`.\n\n⚙️ **Effekt:** Returnerar en ny sträng utan att ändra originalet."
        },
        {
          "kind": "function",
          "name": "Ordcallback i iconTitle()",
          "identifier": "ord i iconTitle()",
          "anchor": "ord-i-iconTitle",
          "line": 113,
          "text": "Gör första tecknet i ett ord till versal.\n\n**Beräkning:**\n\n`word.charAt(0).toUpperCase() + word.slice(1)`\n\nFörsta tecknet görs stort medan resten av ordet behålls oförändrat.\n\n⚙️ **Effekt:** Returnerar det omvandlade ordet.\n\n---"
        }
      ],
      "notes": [
        "### **🚀 När wikin skapas**\n\n`ApplicationLayout` → `CivWikiMain.constructor()` → `CivWikiNavigation` → `#createContent()` → alla sidpaneler → `#showPage('home')`.\n\n### **🧭 När användaren väljer en kategori**\n\nNavigeringsknapp → klickcallback → `#onSelect(id)` → `CivWikiMain.#showPage()` → vald panel visas.\n\n### **🌄 När terrängencyklopedin byggs**\n\n`#createTerrainPanel()` → `CivWikiTerrain.createElement()` → `#createTerrainRow()` → `#createGraphic()` → SVG.\n\n### **🎨 När ikongalleriet byggs**\n\n`#createCategoryPanel()` → `iconsFor()` → `CivWikiIcons.createGrid()` → `#createCard()` → `createIcon()` och `iconTitle()`.\n\n---",
        "### **🔐 När en användare identifieras**\n\n`Authentication.refreshFantasyIdentity()` → `currentUser` → Clerk-identitet → `editors` → fantasy-namn och roll.\n\n### **🌍 När världsgalleriet laddas**\n\n`WorldSelection.initializeGallery()` → `worlds.list` → världsdokument → redigeraruppslag → gallerikort.\n\n### **🗺️ När en värld initialiseras**\n\n`initializeWorld` → koordinatvalidering → status `initializing` → `insertBatch` i flera omgångar → status `ready`.\n\n### **✏️ När en redigerare börjar redigera**\n\n`handleEditAction()` → `startEditing` → autentisering → behörighetskontroll → sessionsdokument.\n\n### **🎨 När en hexagon målas**\n\nHexklick → `setTerrain` → kontroll av användare, värld och session → koordinatvalidering → Convex-uppdatering → kartprenumerationen får nya data.\n\n### **📊 När ett anonymt besök registreras**\n\n`sendAnonymousVisit()` → `registerVisit` → positionsvalidering → besöksrad → uppdaterade räknare.\n\n---"
      ]
    },
    {
      "path": "convex/authentication.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🔐 2\\. Authentication — Användarens identitet i Convex**"
        },
        {
          "kind": "function",
          "name": "currentUser",
          "identifier": "currentUser",
          "anchor": "currentUser",
          "line": 7,
          "text": "En publik Convex-query som returnerar den inloggade användarens roll och fantasy-identitet.\n\n**Arbetsgång:**\n\n1. Anropar `ctx.auth.getUserIdentity()`.  \n2. Returnerar `null` om användaren inte är autentiserad.  \n3. Söker i tabellen `editors` med indexet `by_clerk_user_id`.  \n4. Använder `identity.subject` som söknyckel.  \n5. Hämtar en unik redigerare med `.unique()`.  \n6. Returnerar rollen `visitor` om användaren saknar redigerardokument.  \n7. Returnerar annars redigerarens roll, fantasy-namn och eventuella världs-id.\n\n**När redigerare saknas:**\n\n* `role`: `visitor`  \n* `fantasyName`: `null`  \n* `worldId`: `null`\n\n🔗 **Anropas av:** `Authentication.refreshFantasyIdentity()`.\n\n⚙️ **Effekt:** Endast databasläsning.\n\n💡 **Arkitekturprincip — Server-Side Authorization:** Rollinformationen hämtas från databasen i stället för att bestämmas av klientens gränssnitt.\n\n---"
        }
      ],
      "notes": [
        "### **🔐 När en användare identifieras**\n\n`Authentication.refreshFantasyIdentity()` → `currentUser` → Clerk-identitet → `editors` → fantasy-namn och roll.\n\n### **🌍 När världsgalleriet laddas**\n\n`WorldSelection.initializeGallery()` → `worlds.list` → världsdokument → redigeraruppslag → gallerikort.\n\n### **🗺️ När en värld initialiseras**\n\n`initializeWorld` → koordinatvalidering → status `initializing` → `insertBatch` i flera omgångar → status `ready`.\n\n### **✏️ När en redigerare börjar redigera**\n\n`handleEditAction()` → `startEditing` → autentisering → behörighetskontroll → sessionsdokument.\n\n### **🎨 När en hexagon målas**\n\nHexklick → `setTerrain` → kontroll av användare, värld och session → koordinatvalidering → Convex-uppdatering → kartprenumerationen får nya data.\n\n### **📊 När ett anonymt besök registreras**\n\n`sendAnonymousVisit()` → `registerVisit` → positionsvalidering → besöksrad → uppdaterade räknare.\n\n---"
      ]
    },
    {
      "path": "convex/worlds.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🌍 3\\. Worlds — Världarnas databasfunktioner**"
        },
        {
          "kind": "function",
          "name": "initialize",
          "identifier": "initialize",
          "anchor": "initialize",
          "line": 6,
          "text": "En intern mutation som skapar applikationens tolv världar.\n\n**Arbetsgång:**\n\n1. Hämtar alla dokument i tabellen `worlds`.  \n2. Kontrollerar att tabellen är tom.  \n3. Kastar ett fel om en värld redan finns.  \n4. Skapar världarna 1–12.  \n5. Tilldelar varje värld ett nummer och namnet `World 1`, `World 2` och så vidare.\n\n**Felmeddelande:**\n\n`World initialization requires an empty worlds table`\n\n⚙️ **Effekt:** Infogar tolv världsdokument.\n\n**Returvärde:**\n\n`{ created: 12 }`\n\nDetta är en intern mutation och kan inte anropas direkt från webbläsaren.\n\nCursor hittade inget anrop till den i applikationens källkod."
        },
        {
          "kind": "function",
          "name": "list",
          "identifier": "list",
          "anchor": "list",
          "line": 27,
          "text": "En publik query som returnerar världarna i nummerordning.\n\n**Arbetsgång:**\n\n1. Läser tabellen `worlds`.  \n2. Använder indexet `by_number`.  \n3. Går igenom världarna.  \n4. Anropar en callback för att hitta varje världs tilldelade redigerare.  \n5. Returnerar världarna tillsammans med deras eventuella fantasy-namn.\n\n🔗 **Anropas av:** `WorldSelection.initializeGallery()` genom `api.worlds.list`.\n\n⚙️ **Effekt:** Endast läsning."
        },
        {
          "kind": "function",
          "name": "Redigeraruppslag i list",
          "identifier": "redigeraruppslag i list",
          "anchor": "redigeraruppslag-i-list",
          "line": 34,
          "text": "En callback som söker efter en redigerare för en viss värld.\n\n**Arbetsgång:**\n\n1. Söker i tabellen `editors`.  \n2. Använder indexet `by_world`.  \n3. Matchar `worldId` mot `world._id`.  \n4. Hämtar den första träffen med `.first()`.  \n5. Returnerar världsdokumentet tillsammans med redigerarens `fantasyName`, eller `null` om ingen redigerare finns.\n\nCallbacken körs inom `Promise.all()`.\n\n⚙️ **Effekt:** En extra databasläsning per värld.\n\n💡 **Begrepp — Promise.all():** En metod som väntar på att flera asynkrona operationer ska bli färdiga."
        },
        {
          "kind": "function",
          "name": "getAssignedEditor",
          "identifier": "getAssignedEditor",
          "anchor": "getAssignedEditor",
          "line": 55,
          "text": "En publik query som hämtar den redigerare som är tilldelad en värld.\n\n**Arbetsgång:**\n\n1. Tar emot `worldId`.  \n2. Hämtar världsdokumentet.  \n3. Returnerar `null` om världen saknas.  \n4. Söker efter redigeraren via indexet `by_world`.  \n5. Returnerar `null` om ingen redigerare finns.  \n6. Returnerar annars `fantasyName` och `role`.\n\n🔗 **Anropas av:** `AssignedEditor.refresh()`.\n\n⚙️ **Effekt:** Endast läsning.\n\n---"
        }
      ],
      "notes": [
        "### **🔐 När en användare identifieras**\n\n`Authentication.refreshFantasyIdentity()` → `currentUser` → Clerk-identitet → `editors` → fantasy-namn och roll.\n\n### **🌍 När världsgalleriet laddas**\n\n`WorldSelection.initializeGallery()` → `worlds.list` → världsdokument → redigeraruppslag → gallerikort.\n\n### **🗺️ När en värld initialiseras**\n\n`initializeWorld` → koordinatvalidering → status `initializing` → `insertBatch` i flera omgångar → status `ready`.\n\n### **✏️ När en redigerare börjar redigera**\n\n`handleEditAction()` → `startEditing` → autentisering → behörighetskontroll → sessionsdokument.\n\n### **🎨 När en hexagon målas**\n\nHexklick → `setTerrain` → kontroll av användare, värld och session → koordinatvalidering → Convex-uppdatering → kartprenumerationen får nya data.\n\n### **📊 När ett anonymt besök registreras**\n\n`sendAnonymousVisit()` → `registerVisit` → positionsvalidering → besöksrad → uppdaterade räknare.\n\n---"
      ]
    },
    {
      "path": "convex/hexes.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🗺️ 4\\. Hexes — Hexagonernas databaslogik**\n\n\nDen här modulen ansvarar för att skapa, läsa och ändra världarnas hexagoner.\n\nVarje värld är konstruerad för att innehålla 1 174 hexagoner."
        },
        {
          "kind": "function",
          "name": "validateCoordinate()",
          "identifier": "validateCoordinate()",
          "anchor": "validateCoordinate",
          "line": 37,
          "text": "Kontrollerar att en koordinat följer Midgards koordinatregler.\n\n**Villkor:**\n\n* `x` måste vara ett säkert heltal.  \n* `y` måste vara ett säkert heltal.  \n* `x` och `y` måste ha samma paritet.\n\n**Paritetsregeln:**\n\n`x % 2 === y % 2`\n\nDet innebär att båda koordinaterna ska vara jämna eller båda udda.\n\n**Exempel:**\n\n* `(2, 4)` — giltig.  \n* `(3, 5)` — giltig.  \n* `(2, 3)` — ogiltig.\n\n**Felmeddelande:**\n\n`Invalid Midgard coordinate`\n\n🔗 **Anropas av:** `initializeWorld`, `setTerrain` och `testSetTerrain`.\n\n⚙️ **Effekt:** Validerar koordinaten och kastar fel vid ogiltiga värden.\n\n💡 **Arkitekturprincip — Invariant Protection:** Backend skyddar koordinatsystemets grundregler även om klienten skulle skicka felaktiga värden."
        },
        {
          "kind": "function",
          "name": "initializeWorld",
          "identifier": "initializeWorld",
          "anchor": "initializeWorld",
          "line": 53,
          "text": "En intern mutation som förbereder skapandet av en världs 1 174 hexagoner.\n\n**Arbetsgång:**\n\n1. Kontrollerar att världen finns.  \n2. Avvisar en värld med status `initializing`.  \n3. Returnerar utan ny initialisering om status är `ready`.  \n4. Kontrollerar att inga hexagoner redan finns.  \n5. Kontrollerar att koordinatlistan innehåller exakt 1 174 poster.  \n6. Validerar varje koordinat.  \n7. Kontrollerar att inga koordinater förekommer dubbelt.  \n8. Ändrar världens status till `initializing`.  \n9. Schemalägger `internal.hexes.insertBatch` med `ctx.scheduler.runAfter(0, ...)`.\n\n**Vid redan färdig värld:**\n\n`{ initialized: false, message: 'World is already initialized' }`\n\n**Vid schemalagd initialisering:**\n\n`{ initialized: true, message: 'World initialization scheduled' }`\n\n⚙️ **Effekt:** Ändrar världens status och schemalägger infogning.\n\nSjälva hexagonerna skapas av `insertBatch()`."
        },
        {
          "kind": "function",
          "name": "insertBatch",
          "identifier": "insertBatch",
          "anchor": "insertBatch",
          "line": 128,
          "text": "En intern mutation som infogar hexagoner i grupper om högst 100\\.\n\n**Arbetsgång:**\n\n1. Kontrollerar att världen finns.  \n2. Kontrollerar att status är `initializing`.  \n3. Beräknar nästa intervall med högst 100 koordinater.  \n4. Söker efter varje koordinat med indexet `by_world_coordinate`.  \n5. Infogar hexagonen om den saknas.  \n6. Sätter ny hexagon till `ocean` och `flat`.  \n7. Schemalägger nästa batch om koordinater återstår.  \n8. Ändrar världens status till `ready` efter sista batchen.\n\n**Varför batchar?**\n\n1 174 hexagoner delas upp i mindre databasoperationer.\n\nMed högst 100 per batch behövs tolv batchar för en helt tom värld.\n\n🔗 **Anropas av:** `initializeWorld()` och tidigare schemalagda körningar av `insertBatch()`.\n\n⚙️ **Effekt:** Skriver hexagoner och markerar till slut världen som färdig.\n\nRedan befintliga koordinater hoppas över.\n\n💡 **Arkitekturprincip — Batch Processing:** Stora arbetsmängder delas upp i mindre operationer som är lättare att hantera."
        },
        {
          "kind": "function",
          "name": "listByWorld",
          "identifier": "listByWorld",
          "anchor": "listByWorld",
          "line": 185,
          "text": "En publik query som hämtar alla hexagoner i en värld.\n\n**Arbetsgång:**\n\n1. Tar emot ett världs-id.  \n2. Söker i tabellen `hexes`.  \n3. Använder indexet `by_world`.  \n4. Returnerar resultatet med `.collect()`.\n\n🔗 **Anropas av:** `WorldMapController.selectWorld()`.\n\n⚙️ **Effekt:** Endast läsning.\n\nKlientens Convex-prenumeration kan få nya resultat när relevanta data förändras."
        },
        {
          "kind": "function",
          "name": "setTerrain",
          "identifier": "setTerrain",
          "anchor": "setTerrain",
          "line": 204,
          "text": "En publik mutation som ändrar en hexagons terräng och relief.\n\nDetta är en av applikationens viktigaste säkerhetskritiska funktioner.\n\n**Behörighetskontroller:**\n\n1. Användaren måste vara autentiserad.  \n2. Användaren måste finnas i tabellen `editors`.  \n3. En vanlig redigerare måste vara tilldelad rätt värld.  \n4. En aktiv redigeringssession måste finnas.  \n5. Sessionens `editorId` måste matcha användarens redigerar-id.  \n6. Världen måste ha status `ready`.  \n7. Koordinaten måste vara giltig.  \n8. Hexagonen måste finnas.\n\n**Exempel på felmeddelanden:**\n\n* `Authentication required`  \n* `Visitors cannot modify terrain`  \n* `You are not assigned to this world`\n\nOm alla kontroller godkänns uppdateras hexagonens `terrain` och `relief`.\n\n🔗 **Anropas av:** Hexklickhanteringen i `src/main.ts`.\n\n⚙️ **Effekt:** Skriver ändrad terräng och relief till Convex.\n\nReturnerar koordinaten och de nya terrängvärdena.\n\n💡 **Arkitekturprincip — Authorization at the Data Layer:** Det räcker inte att redigeringsknappar är dolda i frontend. Databasen kontrollerar själv vem som får ändra en värld."
        },
        {
          "kind": "function",
          "name": "testSetTerrain",
          "identifier": "testSetTerrain",
          "anchor": "testSetTerrain",
          "line": 295,
          "text": "En intern mutation för utvecklingstest av terrängändringar och prenumerationer.\n\n**Kontroller:**\n\n* Världen måste vara `ready`.  \n* Koordinaten måste vara giltig.  \n* Hexagonen måste finnas.\n\nTill skillnad från `setTerrain()` kräver denna interna testfunktion inte användarautentisering.\n\n⚙️ **Effekt:** Uppdaterar hexagonens terräng och relief.\n\nFunktionen kan inte anropas direkt från webbläsaren.\n\nCursor hittade inget anrop till den i applikationens källkod.\n\n---"
        }
      ],
      "notes": [
        "### **🔐 När en användare identifieras**\n\n`Authentication.refreshFantasyIdentity()` → `currentUser` → Clerk-identitet → `editors` → fantasy-namn och roll.\n\n### **🌍 När världsgalleriet laddas**\n\n`WorldSelection.initializeGallery()` → `worlds.list` → världsdokument → redigeraruppslag → gallerikort.\n\n### **🗺️ När en värld initialiseras**\n\n`initializeWorld` → koordinatvalidering → status `initializing` → `insertBatch` i flera omgångar → status `ready`.\n\n### **✏️ När en redigerare börjar redigera**\n\n`handleEditAction()` → `startEditing` → autentisering → behörighetskontroll → sessionsdokument.\n\n### **🎨 När en hexagon målas**\n\nHexklick → `setTerrain` → kontroll av användare, värld och session → koordinatvalidering → Convex-uppdatering → kartprenumerationen får nya data.\n\n### **📊 När ett anonymt besök registreras**\n\n`sendAnonymousVisit()` → `registerVisit` → positionsvalidering → besöksrad → uppdaterade räknare.\n\n---"
      ]
    },
    {
      "path": "convex/editingSessions.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🔐 5\\. EditingSessions — Redigeringsrättigheter och sessioner**\n\n\nDen här modulen upprätthåller regeln att en värld har högst en aktiv redigeringssession."
        },
        {
          "kind": "function",
          "name": "getAuthenticatedEditor()",
          "identifier": "getAuthenticatedEditor()",
          "anchor": "getAuthenticatedEditor",
          "line": 5,
          "text": "Hämtar redigerardokumentet för den autentiserade användaren.\n\n**Arbetsgång:**\n\n1. Hämtar Clerk-identiteten med `ctx.auth.getUserIdentity()`.  \n2. Kräver att användaren är inloggad.  \n3. Söker i `editors` med indexet `by_clerk_user_id`.  \n4. Kräver att ett redigerardokument finns.  \n5. Returnerar dokumentet.\n\n**Felmeddelanden:**\n\n* `You must sign in to edit a world`  \n* `Visitors cannot edit worlds`\n\n🔗 **Anropas av:** `startEditing` och `stopEditing`.\n\n⚙️ **Effekt:** Endast läsning eller fel."
        },
        {
          "kind": "function",
          "name": "getActiveSession",
          "identifier": "getActiveSession",
          "anchor": "getActiveSession",
          "line": 32,
          "text": "En publik query som returnerar en världs aktiva redigeringssession.\n\n**Arbetsgång:**\n\n1. Söker i `editingSessions` med indexet `by_world`.  \n2. Returnerar `null` om session saknas.  \n3. Hämtar sessionens redigerardokument.  \n4. Hämtar den aktuella användarens identitet.  \n5. Avgör om sessionen tillhör användaren genom `isMine`.  \n6. Returnerar sessionsinformationen.\n\n**Returnerade fält:**\n\n* `worldId`  \n* `fantasyName`  \n* `role`  \n* `startedAt`  \n* `isMine`\n\nOm redigerardokumentet saknas används reservvärdena `Unknown` och `editor`.\n\n🔗 **Anropas av:** `EditingSessionController.subscribe()`.\n\n⚙️ **Effekt:** Endast läsning.\n\n💡 **Begrepp — Ownership:** Att avgöra om en resurs eller session tillhör den aktuella användaren."
        },
        {
          "kind": "function",
          "name": "startEditing",
          "identifier": "startEditing",
          "anchor": "startEditing",
          "line": 68,
          "text": "En publik mutation som startar en redigeringssession eller tillåter en administratör att ta över den.\n\n**Arbetsgång:**\n\n1. Anropar `getAuthenticatedEditor()`.  \n2. Kontrollerar att världen är `ready`.  \n3. Kontrollerar att en vanlig redigerare är tilldelad världen.  \n4. Söker efter en befintlig session.  \n5. Om samma redigerare redan äger sessionen returneras `alreadyActive: true`.  \n6. Om någon annan äger sessionen krävs administratörsroll och `takeover`.  \n7. Vid övertagande uppdateras `editorId` och `startedAt`.  \n8. Om ingen session finns skapas en ny.\n\n**Vid redan aktiv egen session:**\n\n`{ started: true, alreadyActive: true }`\n\n**Vid blockerad session:**\n\n`Another editor currently controls this world`\n\n🔗 **Anropas av:** `handleEditAction()` och `handleTakeoverAction()`.\n\n⚙️ **Effekt:** Skapar eller ändrar ett sessionsdokument.\n\n💡 **Arkitekturprincip — Exclusive Editing:** Endast den användare som äger den aktiva sessionen kan redigera världen. En administratör kan ta över genom en uttrycklig övertagandeåtgärd."
        },
        {
          "kind": "function",
          "name": "stopEditing",
          "identifier": "stopEditing",
          "anchor": "stopEditing",
          "line": 136,
          "text": "En publik mutation som avslutar den aktuella redigeringssessionen.\n\n**Arbetsgång:**\n\n1. Hämtar den autentiserade redigeraren.  \n2. Söker efter världens aktiva session.  \n3. Returnerar `{ stopped: false }` om ingen session finns.  \n4. Kontrollerar att användaren äger sessionen.  \n5. Kastar fel om någon annan äger den.  \n6. Tar bort sessionsdokumentet med `ctx.db.delete()`.\n\n**Felmeddelande:**\n\n`Only the active editor can stop this session`\n\n🔗 **Anropas av:** `handleEditAction()` när användaren redan redigerar.\n\n⚙️ **Effekt:** Tar bort sessionen och returnerar `{ stopped: true }`.\n\n---"
        }
      ],
      "notes": [
        "### **🔐 När en användare identifieras**\n\n`Authentication.refreshFantasyIdentity()` → `currentUser` → Clerk-identitet → `editors` → fantasy-namn och roll.\n\n### **🌍 När världsgalleriet laddas**\n\n`WorldSelection.initializeGallery()` → `worlds.list` → världsdokument → redigeraruppslag → gallerikort.\n\n### **🗺️ När en värld initialiseras**\n\n`initializeWorld` → koordinatvalidering → status `initializing` → `insertBatch` i flera omgångar → status `ready`.\n\n### **✏️ När en redigerare börjar redigera**\n\n`handleEditAction()` → `startEditing` → autentisering → behörighetskontroll → sessionsdokument.\n\n### **🎨 När en hexagon målas**\n\nHexklick → `setTerrain` → kontroll av användare, värld och session → koordinatvalidering → Convex-uppdatering → kartprenumerationen får nya data.\n\n### **📊 När ett anonymt besök registreras**\n\n`sendAnonymousVisit()` → `registerVisit` → positionsvalidering → besöksrad → uppdaterade räknare.\n\n---"
      ]
    },
    {
      "path": "convex/visitors.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **📊 6\\. Visitors — Besöksregistrering i databasen**\n\n\nDen här modulen hanterar besökarnas geografiska positioner och statistik."
        },
        {
          "kind": "function",
          "name": "hasValidLocation()",
          "identifier": "hasValidLocation()",
          "anchor": "hasValidLocation",
          "line": 31,
          "text": "Kontrollerar om en lagrad besöksposition är giltig för kartvisning.\n\n**Villkor:**\n\n* Positionen måste finnas.  \n* Latitud och longitud måste vara ändliga tal.  \n* Latitud måste ligga mellan −90 och \\+90.  \n* Longitud måste ligga mellan −180 och \\+180.\n\n🔗 **Anropas av:** `getVisitorLocations`, som dokumenteras i nästa del.\n\n⚙️ **Effekt:** Returnerar ett booleskt värde utan att kasta fel."
        },
        {
          "kind": "function",
          "name": "validateLocation()",
          "identifier": "validateLocation()",
          "anchor": "validateLocation",
          "line": 49,
          "text": "Validerar en position innan den sparas.\n\nAnvänder samma geografiska gränser som `hasValidLocation()`.\n\n**Skillnaden är felhanteringen:**\n\nVid ogiltig position kastas:\n\n`Invalid visitor location`\n\n🔗 **Anropas av:** `registerVisit`.\n\n⚙️ **Effekt:** Avbryter registreringen vid ogiltig position."
        },
        {
          "kind": "function",
          "name": "registerVisit",
          "identifier": "registerVisit",
          "anchor": "registerVisit",
          "line": 71,
          "text": "En publik mutation som registrerar ett anonymt besök och uppdaterar statistiken.\n\n**Arbetsgång:**\n\n1. Validerar positionen om den finns.  \n2. Läser statistikdokumentet i `visitorStats`.  \n3. Kontrollerar hur många besök som finns lagrade.  \n4. Om minst 1 000 finns, söker den efter det äldsta besöket.  \n5. Tar bort det äldsta besöket.  \n6. Infogar det nya besöket med tidpunkt, enhetstyp och eventuell position.  \n7. Ökar det totala antalet besök.  \n8. Ökar räknaren för besökarens enhetstyp.  \n9. Uppdaterar antalet lagrade besök när gränsen inte redan är nådd.  \n10. Skapar eller uppdaterar statistikdokumentet.\n\n**Lagringsgräns:**\n\nHögst 1 000 besöksrader behålls genom att den äldsta raden ersätts när gränsen är nådd.\n\n**Viktig skillnad mellan räknarna:**\n\n* `total` fortsätter att öka.  \n* Enhetsräknarna fortsätter att öka.  \n* `stored` hålls vid lagringsgränsen.  \n* En borttagen besökares enhetstyp dras inte av från enhetsräknarna.\n\nDet betyder att den historiska statistiken kan fortsätta växa även när äldre positionsposter tas bort.\n\n🔗 **Anropas av:** `sendAnonymousVisit()`.\n\n⚙️ **Effekt:** Skriver besöksdata och statistik till Convex.\n\nReturnerar `null`.\n\n💡 **Arkitekturprincip — Bounded Storage with Historical Counters:** Antalet detaljerade besöksrader begränsas samtidigt som historiska totalräknare behålls.\n\n---"
        },
        {
          "kind": "prose",
          "text": "## **📊 1\\. Convex Visitors — Läsning av besöksdata**\n\n\nI del 14 dokumenterade vi hur anonyma besök registreras i Convex.\n\nHär avslutar vi modulen genom att undersöka de två publika databasfrågor som används för att visa besökspositioner och statistik."
        },
        {
          "kind": "function",
          "name": "getVisitorLocations",
          "identifier": "getVisitorLocations",
          "anchor": "getVisitorLocations",
          "line": 130,
          "text": "En publik Convex-query som hämtar de senaste besökarnas giltiga geografiska positioner.\n\n**Arbetsgång:**\n\n1. Läser tabellen `visitors`.  \n2. Använder indexet `by_creation_time`.  \n3. Sorterar besöken i fallande skapelseordning med `.order('desc')`.  \n4. Hämtar högst 1 000 poster genom `.take(VISITOR_LIMIT)`.  \n5. Går igenom de hämtade besöken.  \n6. Kontrollerar varje position med `hasValidLocation()`.  \n7. Hoppar över besök utan giltig position.  \n8. Lägger till godkända positioner i en resultatarray.\n\n**Varje resultat innehåller:**\n\n* `latitude` — geografisk breddgrad.  \n* `longitude` — geografisk längdgrad.  \n* `deviceType` — besökarens enhetskategori.\n\n🔗 **Anropas av:** `requestVisitorLocations()` via `api.visitors.getVisitorLocations`.\n\n⚙️ **Effekt:** Endast databasläsning.\n\n**Viktiga egenskaper:**\n\n* Nyaste besöken kommer först.  \n* Högst 1 000 besöksrader undersöks.  \n* Besök utan giltig position visas inte.  \n* Resultatet kan innehålla färre än 1 000 positioner.\n\n💡 **Begrepp — Database Index:** En datastruktur som gör det möjligt att hämta poster i en bestämd ordning utan att behöva sortera hela tabellen manuellt.\n\n💡 **Arkitekturprincip — Filtering at the Data Layer:** Ogiltiga geografiska positioner filtreras bort innan klienten får resultatet."
        },
        {
          "kind": "function",
          "name": "getVisitorStats",
          "identifier": "getVisitorStats",
          "anchor": "getVisitorStats",
          "line": 158,
          "text": "En publik Convex-query som hämtar de sparade besöksräknarna.\n\n**Arbetsgång:**\n\n1. Läser statistikdokumentet i tabellen `visitorStats`.  \n2. Använder `.unique()` för att hämta dokumentet.  \n3. Om dokumentet saknas returneras `emptyVisitorStats`.  \n4. Om dokumentet finns returneras dess sex räknare.\n\n**Statistikens sex fält:**\n\n| Fält | Betydelse |\n| ----- | ----- |\n| `total` | Totalt antal registrerade besök |\n| `windows` | Besök klassificerade som Windows |\n| `mac` | Besök klassificerade som Mac |\n| `mobile` | Besök klassificerade som mobil eller surfplatta |\n| `other` | Övriga besök |\n| `stored` | Antal lagrade besöksrader |\n\nOm statistikdokumentet saknas är samtliga värden 0\\.\n\n🔗 **Anropas av:** `requestVisitorStats()` via `api.visitors.getVisitorStats`.\n\n⚙️ **Effekt:** Endast databasläsning.\n\n💡 **Viktig detalj:** Funktionen räknar inte om statistiken genom att gå igenom alla besöksrader.\n\nDen läser räknare som tidigare har uppdaterats av `registerVisit`.\n\nDetta gör det möjligt att bevara historiska totalsiffror även när äldre besöksrader tas bort.\n\n💡 **Arkitekturprincip — Precomputed Statistics:** Statistik beräknas och uppdateras när data skrivs, så att läsningen senare blir enklare.\n\n---"
        }
      ],
      "notes": [
        "### **🔐 När en användare identifieras**\n\n`Authentication.refreshFantasyIdentity()` → `currentUser` → Clerk-identitet → `editors` → fantasy-namn och roll.\n\n### **🌍 När världsgalleriet laddas**\n\n`WorldSelection.initializeGallery()` → `worlds.list` → världsdokument → redigeraruppslag → gallerikort.\n\n### **🗺️ När en värld initialiseras**\n\n`initializeWorld` → koordinatvalidering → status `initializing` → `insertBatch` i flera omgångar → status `ready`.\n\n### **✏️ När en redigerare börjar redigera**\n\n`handleEditAction()` → `startEditing` → autentisering → behörighetskontroll → sessionsdokument.\n\n### **🎨 När en hexagon målas**\n\nHexklick → `setTerrain` → kontroll av användare, värld och session → koordinatvalidering → Convex-uppdatering → kartprenumerationen får nya data.\n\n### **📊 När ett anonymt besök registreras**\n\n`sendAnonymousVisit()` → `registerVisit` → positionsvalidering → besöksrad → uppdaterade räknare.\n\n---",
        "Nu har vi dokumenterat samtliga funktioner som ingår i den här kedjan.\n\n### **🚀 Steg 1 — Webbapplikationen startar**\n\n`src/main.ts` → `registerAnonymousVisit()` → `sendAnonymousVisit()`.\n\n### **💻 Steg 2 — Enheten identifieras**\n\n`detectVisitorDevice()` → `UserAgentParser` → `mobile`, `windows`, `mac` eller `other`.\n\n### **🌐 Steg 3 — Positionen efterfrågas**\n\n`detectVisitorLocation()` → `/api/visitor-location` → `GET()`.\n\n### **📍 Steg 4 — Vercels koordinater tolkas**\n\nHTTP-rubriker → `readCoordinate()` → geografisk intervallkontroll → JSON-svar.\n\n### **🛡️ Steg 5 — Klienten validerar svaret**\n\n`readLocation()` → `isValidCoordinate()` → giltig position eller `undefined`.\n\n### **💾 Steg 6 — Besöket registreras**\n\n`sendAnonymousVisit()` → `api.visitors.registerVisit` → `validateLocation()` → Convex.\n\n### **📊 Steg 7 — Statistiken läses**\n\n`getVisitorStats` → `requestVisitorStats()` → besökarsidans statistikpanel.\n\n### **🌍 Steg 8 — Positionerna visas på kartorna**\n\n`getVisitorLocations` → `requestVisitorLocations()` → `addVisitorMarker()` → världskartan, Sverigekartan och Kalmarkartan.\n\n---",
        "### **🔒 Flera nivåer av validering**\n\nGeografiska koordinater kontrolleras på flera platser:\n\n* I HTTP-hanteraren.  \n* I frontend när JSON-svaret läses.  \n* I Convex innan positionen sparas.  \n* I Convex när lagrade positioner ska visas.\n\nDet innebär att olika delar av systemet inte behöver lita blint på data från andra delar.\n\n### **📊 Historisk statistik och begränsad lagring**\n\nSystemet skiljer mellan:\n\n**Historiska räknare:** Hur många besök som totalt har registrerats.\n\n**Lagrade besöksrader:** De detaljerade poster som fortfarande finns kvar.\n\nDärför kan `total` fortsätta öka samtidigt som `stored` hålls vid högst 1 000\\.\n\n### **🌐 Separation mellan API och databas**\n\n`api/visitor-location.ts` ansvarar för att läsa Vercels geografiska rubriker.\n\n`convex/visitors.ts` ansvarar för att lagra och läsa besöksdata.\n\n`src/application/visitors/` ansvarar för att anropa dessa tjänster och visa resultatet.\n\nVarje del har därmed ett tydligt avgränsat ansvar.\n\n---"
      ]
    },
    {
      "path": "api/visitor-location.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🌐 2\\. Visitor Location API — Geografisk position från Vercel**\n\n\nDenna fil innehåller applikationens HTTP-hanterare för ungefärlig geografisk position.\n\nDen använder information som Vercel kan lägga till i HTTP-förfrågans rubriker.\n\nAPI är separat från Convex och skriver ingen information till databasen."
        },
        {
          "kind": "function",
          "name": "readCoordinate()",
          "identifier": "readCoordinate()",
          "anchor": "readCoordinate",
          "line": 4,
          "text": "Försöker omvandla ett HTTP-rubrikvärde till ett giltigt, ändligt tal.\n\n**Arbetsgång:**\n\n1. Tar emot ett strängvärde eller `null`.  \n2. Returnerar `undefined` om värdet är `null`.  \n3. Tar bort omgivande blanksteg med `.trim()`.  \n4. Returnerar `undefined` om strängen är tom.  \n5. Omvandlar strängen till ett tal med `Number(value)`.  \n6. Kontrollerar att talet är ändligt.  \n7. Returnerar talet om kontrollen lyckas.\n\n**Exempel:**\n\n* `\"56.66\"` → `56.66`  \n* `\" 16.36 \"` → `16.36`  \n* `\"\"` → `undefined`  \n* `null` → `undefined`  \n* `\"unknown\"` → `undefined`  \n* `\"Infinity\"` → `undefined`\n\n🔗 **Anropas av:** `GET()`.\n\n⚙️ **Effekt:** Ren värdeomvandling utan databasåtkomst.\n\n💡 **Begrepp — Parsing:** Att tolka ett textvärde och omvandla det till en annan datatyp.\n\n💡 **Viktig detalj:** Denna funktion kontrollerar bara att värdet är ett ändligt tal. Den kontrollerar inte om talet ligger inom de geografiskt tillåtna intervallen. Det gör `GET()`."
        },
        {
          "kind": "function",
          "name": "GET()",
          "identifier": "GET()",
          "anchor": "GET",
          "line": 19,
          "text": "En HTTP-hanterare som returnerar besökarens ungefärliga geografiska position.\n\n**Arbetsgång:**\n\n1. Tar emot en HTTP-förfrågan.  \n2. Läser rubriken `x-vercel-ip-latitude`.  \n3. Läser rubriken `x-vercel-ip-longitude`.  \n4. Skickar båda värdena till `readCoordinate()`.  \n5. Kontrollerar att båda värdena finns.  \n6. Kontrollerar att latitud ligger mellan −90 och \\+90.  \n7. Kontrollerar att longitud ligger mellan −180 och \\+180.  \n8. Returnerar ett JSON-svar.\n\n**Vid giltig position:**\n\n`{ success: true, latitude, longitude }`\n\n**När positionen saknas eller är ogiltig:**\n\n`{ success: false }`\n\nBåda svaren får HTTP-rubriken:\n\n`Cache-Control: private, no-store`\n\n🔗 **Anropas av:** `detectVisitorLocation()` genom:\n\n`fetch('/api/visitor-location')`\n\n⚙️ **Effekt:** Läser HTTP-förfrågans rubriker och returnerar JSON.\n\nFunktionen:\n\n* Skriver inte till databasen.  \n* Anropar inte Convex.  \n* Sparar inte någon besöksposition.  \n* Hämtar inte GPS-koordinater från besökarens enhet.\n\n💡 **Begrepp — IP Geolocation:** En uppskattning av geografisk position baserad på nätverksinformation. Positionen kan vara ungefärlig och behöver inte motsvara besökarens exakta plats.\n\n💡 **Begrepp — Cache-Control:** En HTTP-rubrik som styr hur svar får lagras i cache.\n\n`private, no-store` instruerar mottagare att inte lagra svaret och att behandla det som privat.\n\n---"
        }
      ],
      "notes": [
        "Nu har vi dokumenterat samtliga funktioner som ingår i den här kedjan.\n\n### **🚀 Steg 1 — Webbapplikationen startar**\n\n`src/main.ts` → `registerAnonymousVisit()` → `sendAnonymousVisit()`.\n\n### **💻 Steg 2 — Enheten identifieras**\n\n`detectVisitorDevice()` → `UserAgentParser` → `mobile`, `windows`, `mac` eller `other`.\n\n### **🌐 Steg 3 — Positionen efterfrågas**\n\n`detectVisitorLocation()` → `/api/visitor-location` → `GET()`.\n\n### **📍 Steg 4 — Vercels koordinater tolkas**\n\nHTTP-rubriker → `readCoordinate()` → geografisk intervallkontroll → JSON-svar.\n\n### **🛡️ Steg 5 — Klienten validerar svaret**\n\n`readLocation()` → `isValidCoordinate()` → giltig position eller `undefined`.\n\n### **💾 Steg 6 — Besöket registreras**\n\n`sendAnonymousVisit()` → `api.visitors.registerVisit` → `validateLocation()` → Convex.\n\n### **📊 Steg 7 — Statistiken läses**\n\n`getVisitorStats` → `requestVisitorStats()` → besökarsidans statistikpanel.\n\n### **🌍 Steg 8 — Positionerna visas på kartorna**\n\n`getVisitorLocations` → `requestVisitorLocations()` → `addVisitorMarker()` → världskartan, Sverigekartan och Kalmarkartan.\n\n---",
        "### **🔒 Flera nivåer av validering**\n\nGeografiska koordinater kontrolleras på flera platser:\n\n* I HTTP-hanteraren.  \n* I frontend när JSON-svaret läses.  \n* I Convex innan positionen sparas.  \n* I Convex när lagrade positioner ska visas.\n\nDet innebär att olika delar av systemet inte behöver lita blint på data från andra delar.\n\n### **📊 Historisk statistik och begränsad lagring**\n\nSystemet skiljer mellan:\n\n**Historiska räknare:** Hur många besök som totalt har registrerats.\n\n**Lagrade besöksrader:** De detaljerade poster som fortfarande finns kvar.\n\nDärför kan `total` fortsätta öka samtidigt som `stored` hålls vid högst 1 000\\.\n\n### **🌐 Separation mellan API och databas**\n\n`api/visitor-location.ts` ansvarar för att läsa Vercels geografiska rubriker.\n\n`convex/visitors.ts` ansvarar för att lagra och läsa besöksdata.\n\n`src/application/visitors/` ansvarar för att anropa dessa tjänster och visa resultatet.\n\nVarje del har därmed ett tydligt avgränsat ansvar.\n\n---"
      ]
    },
    {
      "path": "src/library-svg-graphics/primitives/svg.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🧱 1\\. SVG Primitives — Grafikbibliotekets grund**\n\n\nDen här filen innehåller två centrala hjälpfunktioner som används av stora delar av grafikbiblioteket.\n\nDe gör det möjligt att skapa SVG-element utan att upprepa samma DOM-kod i varje grafikfunktion."
        },
        {
          "kind": "function",
          "name": "createSvg()",
          "identifier": "createSvg()",
          "anchor": "createSvg",
          "line": 3,
          "text": "Skapar ett SVG-element i rätt XML-namnrymd och tilldelar det attribut.\n\n**Arbetsgång:**\n\n1. Tar emot ett SVG-taggnamn, exempelvis `svg`, `path`, `polygon` eller `circle`.  \n2. Anropar `document.createElementNS()`.  \n3. Använder namnrymden `http://www.w3.org/2000/svg`.  \n4. Läser attributen med `Object.entries(attributes)`.  \n5. Sätter varje attribut med `setAttribute()`.  \n6. Returnerar det färdiga elementet.\n\nOm inga attribut skickas används ett tomt objekt.\n\n🔗 **Anropas av:** `appendSvg()`, grafikfabriker i `map/`, `icons/` och `terrain/`, samt `Minimap.constructor()`.\n\n⚙️ **Effekt:** Skapar ett SVG-element men lägger inte till det i dokumentet.\n\n💡 **Begrepp — XML Namespace:** En identifierare som talar om vilken typ av XML-element som skapas. SVG-element behöver SVG namnrymd för att behandlas korrekt av webbläsaren.\n\n💡 **Arkitekturprincip — Abstraction:** Funktionen döljer den tekniska detaljen att SVG-element måste skapas med `createElementNS()`."
        },
        {
          "kind": "function",
          "name": "appendSvg()",
          "identifier": "appendSvg()",
          "anchor": "appendSvg",
          "line": 16,
          "text": "Skapar ett SVG-element och lägger till det i ett befintligt föräldraelement.\n\n**Arbetsgång:**\n\n1. Tar emot föräldraelement, taggnamn och attribut.  \n2. Anropar `createSvg()`.  \n3. Lägger till det nya elementet med `parent.append(element)`.  \n4. Returnerar elementet.\n\n🔗 **Anropas av:** Bland annat `addVisitorMarker()`, `createHeaderMark()`, hjälpfunktionerna i `icons/shared.ts` och `createRedoIcon()`.\n\n⚙️ **Effekt:** Ändrar förälderns DOM-struktur genom att lägga till ett nytt barn.\n\n💡 **Skillnaden mellan funktionerna:**\n\n`createSvg()` skapar ett fristående element.\n\n`appendSvg()` skapar och monterar elementet direkt i en förälder.\n\n---"
        }
      ],
      "notes": [
        "### **🌍 När huvudkartan byggs**\n\n`MapGrid.constructor()` → `createMapCanvas()` → `createSvg()`.\n\nFör varje hexagon:\n\n`MapGrid.constructor()` → `createWorldHexPolygon()` → `createSvg()`.\n\n### **🧭 När minikartan byggs**\n\n`Minimap.constructor()` → `createMinimapCanvas()` → `createMinimapBackground()` → `createMinimapHexagonPolygon()` → `createMinimapViewport()`.\n\n### **🖌️ När en penselikon skapas**\n\n`createIcon()` → `createBrushLargeIcon()` eller motsvarande storlek → `brush()` → `appendSvg()` och `stroke()`.\n\n### **↷ När Redo-ikonen skapas**\n\n`createIcon()` → `createRedoIcon()` → speglad SVG-grupp → `drawUndo()` → `stroke()`.\n\n### **🌳 När en skogsikon ritas**\n\nEn ikonfabrik → `tree()` → `appendSvg()` → `createSvg()`.\n\n---"
      ]
    },
    {
      "path": "src/library-svg-graphics/definitions/hex.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **📐 2\\. Hex Definitions — Hexagonernas geometri**\n\n\nDenna fil definierar geometriska konstanter som används för att rita hexagoner.\n\n**Viktiga konstanter:**\n\n* `HEX_WORLD_WIDTH`  \n* `HEX_BOUNDS`  \n* `HEX_POINTS`  \n* `POINTY_HEX`\n\nGeometrin bygger på biblioteket `midgard-hex-grid`.\n\nFilen innehåller inga namngivna funktioner, men fem `.map()`\\-callbacks körs när modulen laddas. Fyra finns på raderna 11–14 och en på rad 23\\.\n\nDessa läser eller förskjuter Midgard-punkter och bygger de geometriska konstanterna.\n\n💡 **Begrepp — Module Initialization:** Kod på modulnivå körs när modulen laddas. Därmed kan geometriska värden beräknas en gång och återanvändas av andra moduler.\n\n---"
        }
      ],
      "notes": [
        "### **🌍 När huvudkartan byggs**\n\n`MapGrid.constructor()` → `createMapCanvas()` → `createSvg()`.\n\nFör varje hexagon:\n\n`MapGrid.constructor()` → `createWorldHexPolygon()` → `createSvg()`.\n\n### **🧭 När minikartan byggs**\n\n`Minimap.constructor()` → `createMinimapCanvas()` → `createMinimapBackground()` → `createMinimapHexagonPolygon()` → `createMinimapViewport()`.\n\n### **🖌️ När en penselikon skapas**\n\n`createIcon()` → `createBrushLargeIcon()` eller motsvarande storlek → `brush()` → `appendSvg()` och `stroke()`.\n\n### **↷ När Redo-ikonen skapas**\n\n`createIcon()` → `createRedoIcon()` → speglad SVG-grupp → `drawUndo()` → `stroke()`.\n\n### **🌳 När en skogsikon ritas**\n\nEn ikonfabrik → `tree()` → `appendSvg()` → `createSvg()`.\n\n---"
      ]
    },
    {
      "path": "src/library-svg-graphics/map/map-canvas.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🗺️ 3\\. Map Graphics — Huvudkarta och minikarta**\n\n\nHär skapas de grundläggande SVG-elementen för världskartan och dess minikarta."
        },
        {
          "kind": "function",
          "name": "createMapCanvas()",
          "identifier": "createMapCanvas()",
          "anchor": "createMapCanvas",
          "line": 11,
          "text": "Skapar huvudkartans SVG-rot.\n\n**Arbetsgång:**\n\n1. Tar emot kartans ram med `x`, `y`, `width` och `height`.  \n2. Skapar ett `svg`\\-element.  \n3. Sätter `viewBox` utifrån ramens värden.  \n4. Sätter `preserveAspectRatio=\"xMidYMid meet\"`.  \n5. Sätter `role=\"img\"`.  \n6. Sätter `aria-label=\"Hexagonal world map\"`.\n\n🔗 **Anropas av:** `MapGrid.constructor()`.\n\n⚙️ **Effekt:** Returnerar ett SVG-element som ännu inte är monterat.\n\n💡 **Begrepp — viewBox:** SVG-attributet som definierar grafikens interna koordinatsystem och synliga område."
        }
      ],
      "notes": [
        "### **🌍 När huvudkartan byggs**\n\n`MapGrid.constructor()` → `createMapCanvas()` → `createSvg()`.\n\nFör varje hexagon:\n\n`MapGrid.constructor()` → `createWorldHexPolygon()` → `createSvg()`.\n\n### **🧭 När minikartan byggs**\n\n`Minimap.constructor()` → `createMinimapCanvas()` → `createMinimapBackground()` → `createMinimapHexagonPolygon()` → `createMinimapViewport()`.\n\n### **🖌️ När en penselikon skapas**\n\n`createIcon()` → `createBrushLargeIcon()` eller motsvarande storlek → `brush()` → `appendSvg()` och `stroke()`.\n\n### **↷ När Redo-ikonen skapas**\n\n`createIcon()` → `createRedoIcon()` → speglad SVG-grupp → `drawUndo()` → `stroke()`.\n\n### **🌳 När en skogsikon ritas**\n\nEn ikonfabrik → `tree()` → `appendSvg()` → `createSvg()`.\n\n---"
      ]
    },
    {
      "path": "src/library-svg-graphics/map/minimap-canvas.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🗺️ 3\\. Map Graphics — Huvudkarta och minikarta**\n\n\nHär skapas de grundläggande SVG-elementen för världskartan och dess minikarta."
        },
        {
          "kind": "function",
          "name": "createMinimapCanvas()",
          "identifier": "createMinimapCanvas()",
          "anchor": "createMinimapCanvas",
          "line": 11,
          "text": "Skapar minikartans SVG-rot.\n\nAnvänder samma princip som `createMapCanvas()`:\n\n* `viewBox` från kartans ram.  \n* `preserveAspectRatio=\"xMidYMid meet\"`.  \n* `aria-label=\"World minimap\"`.\n\n🔗 **Anropas av:** `Minimap.constructor()`.\n\n⚙️ **Effekt:** Returnerar ett fristående SVG-element.\n\nTill skillnad från huvudkartans SVG sätts inget `role`\\-attribut här."
        }
      ],
      "notes": [
        "### **🌍 När huvudkartan byggs**\n\n`MapGrid.constructor()` → `createMapCanvas()` → `createSvg()`.\n\nFör varje hexagon:\n\n`MapGrid.constructor()` → `createWorldHexPolygon()` → `createSvg()`.\n\n### **🧭 När minikartan byggs**\n\n`Minimap.constructor()` → `createMinimapCanvas()` → `createMinimapBackground()` → `createMinimapHexagonPolygon()` → `createMinimapViewport()`.\n\n### **🖌️ När en penselikon skapas**\n\n`createIcon()` → `createBrushLargeIcon()` eller motsvarande storlek → `brush()` → `appendSvg()` och `stroke()`.\n\n### **↷ När Redo-ikonen skapas**\n\n`createIcon()` → `createRedoIcon()` → speglad SVG-grupp → `drawUndo()` → `stroke()`.\n\n### **🌳 När en skogsikon ritas**\n\nEn ikonfabrik → `tree()` → `appendSvg()` → `createSvg()`.\n\n---"
      ]
    },
    {
      "path": "src/library-svg-graphics/map/minimap-background.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🗺️ 3\\. Map Graphics — Huvudkarta och minikarta**\n\n\nHär skapas de grundläggande SVG-elementen för världskartan och dess minikarta."
        },
        {
          "kind": "function",
          "name": "createMinimapBackground()",
          "identifier": "createMinimapBackground()",
          "anchor": "createMinimapBackground",
          "line": 11,
          "text": "Skapar minikartans bakgrund.\n\n**Arbetsgång:**\n\n1. Tar emot världens ram.  \n2. Skapar en SVG-`rect`.  \n3. Sätter rektangelns position och storlek.  \n4. Sätter fyllningsfärgen `#0e4664`.\n\n🔗 **Anropas av:** `Minimap.constructor()`.\n\n⚙️ **Effekt:** Returnerar en rektangel utan att montera den."
        }
      ],
      "notes": [
        "### **🌍 När huvudkartan byggs**\n\n`MapGrid.constructor()` → `createMapCanvas()` → `createSvg()`.\n\nFör varje hexagon:\n\n`MapGrid.constructor()` → `createWorldHexPolygon()` → `createSvg()`.\n\n### **🧭 När minikartan byggs**\n\n`Minimap.constructor()` → `createMinimapCanvas()` → `createMinimapBackground()` → `createMinimapHexagonPolygon()` → `createMinimapViewport()`.\n\n### **🖌️ När en penselikon skapas**\n\n`createIcon()` → `createBrushLargeIcon()` eller motsvarande storlek → `brush()` → `appendSvg()` och `stroke()`.\n\n### **↷ När Redo-ikonen skapas**\n\n`createIcon()` → `createRedoIcon()` → speglad SVG-grupp → `drawUndo()` → `stroke()`.\n\n### **🌳 När en skogsikon ritas**\n\nEn ikonfabrik → `tree()` → `appendSvg()` → `createSvg()`.\n\n---"
      ]
    },
    {
      "path": "src/library-svg-graphics/map/minimap-viewport.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🗺️ 3\\. Map Graphics — Huvudkarta och minikarta**\n\n\nHär skapas de grundläggande SVG-elementen för världskartan och dess minikarta."
        },
        {
          "kind": "function",
          "name": "createMinimapViewport()",
          "identifier": "createMinimapViewport()",
          "anchor": "createMinimapViewport",
          "line": 11,
          "text": "Skapar rektangeln som markerar vilken del av världskartan som för närvarande visas.\n\n**Grafiska egenskaper:**\n\n* Fyllning: `rgba(226, 194, 122, 0.12)`.  \n* Kontur: `#e2c27a`.  \n* Konturtjocklek: `2`.  \n* `vector-effect=\"non-scaling-stroke\"`.\n\nRektangelns initiala mått kommer från den ram som skickas in.\n\n🔗 **Anropas av:** `Minimap.constructor()`.\n\n⚙️ **Effekt:** Returnerar rektangeln.\n\nDess position och storlek ändras senare av `Minimap.#showView()`.\n\n💡 **Begrepp — Viewport:** Den del av ett större grafiskt område som användaren för närvarande ser."
        }
      ],
      "notes": [
        "### **🌍 När huvudkartan byggs**\n\n`MapGrid.constructor()` → `createMapCanvas()` → `createSvg()`.\n\nFör varje hexagon:\n\n`MapGrid.constructor()` → `createWorldHexPolygon()` → `createSvg()`.\n\n### **🧭 När minikartan byggs**\n\n`Minimap.constructor()` → `createMinimapCanvas()` → `createMinimapBackground()` → `createMinimapHexagonPolygon()` → `createMinimapViewport()`.\n\n### **🖌️ När en penselikon skapas**\n\n`createIcon()` → `createBrushLargeIcon()` eller motsvarande storlek → `brush()` → `appendSvg()` och `stroke()`.\n\n### **↷ När Redo-ikonen skapas**\n\n`createIcon()` → `createRedoIcon()` → speglad SVG-grupp → `drawUndo()` → `stroke()`.\n\n### **🌳 När en skogsikon ritas**\n\nEn ikonfabrik → `tree()` → `appendSvg()` → `createSvg()`.\n\n---"
      ]
    },
    {
      "path": "src/library-svg-graphics/map/minimap-hexagon-polygon.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🗺️ 3\\. Map Graphics — Huvudkarta och minikarta**\n\n\nHär skapas de grundläggande SVG-elementen för världskartan och dess minikarta."
        },
        {
          "kind": "function",
          "name": "createMinimapHexagonPolygon()",
          "identifier": "createMinimapHexagonPolygon()",
          "anchor": "createMinimapHexagonPolygon",
          "line": 4,
          "text": "Skapar en hexagonpolygon för minikartan.\n\n**Arbetsgång:**\n\n1. Tar emot en punktlista.  \n2. Tar emot fyllningsfärg och konturfärg.  \n3. Skapar en SVG-`polygon`.  \n4. Sätter `stroke-width=\"1.5\"`.\n\n🔗 **Anropas av:** `Minimap.constructor()`.\n\nDe bekräftade färgerna vid anropet är:\n\n* Fyllning: `#15536f`.  \n* Kontur: `#3d8eab`.\n\n⚙️ **Effekt:** Returnerar polygonen utan att montera den."
        }
      ],
      "notes": [
        "### **🌍 När huvudkartan byggs**\n\n`MapGrid.constructor()` → `createMapCanvas()` → `createSvg()`.\n\nFör varje hexagon:\n\n`MapGrid.constructor()` → `createWorldHexPolygon()` → `createSvg()`.\n\n### **🧭 När minikartan byggs**\n\n`Minimap.constructor()` → `createMinimapCanvas()` → `createMinimapBackground()` → `createMinimapHexagonPolygon()` → `createMinimapViewport()`.\n\n### **🖌️ När en penselikon skapas**\n\n`createIcon()` → `createBrushLargeIcon()` eller motsvarande storlek → `brush()` → `appendSvg()` och `stroke()`.\n\n### **↷ När Redo-ikonen skapas**\n\n`createIcon()` → `createRedoIcon()` → speglad SVG-grupp → `drawUndo()` → `stroke()`.\n\n### **🌳 När en skogsikon ritas**\n\nEn ikonfabrik → `tree()` → `appendSvg()` → `createSvg()`.\n\n---"
      ]
    },
    {
      "path": "src/library-svg-graphics/map/world-hex-polygon.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🗺️ 3\\. Map Graphics — Huvudkarta och minikarta**\n\n\nHär skapas de grundläggande SVG-elementen för världskartan och dess minikarta."
        },
        {
          "kind": "function",
          "name": "createWorldHexPolygon()",
          "identifier": "createWorldHexPolygon()",
          "anchor": "createWorldHexPolygon",
          "line": 17,
          "text": "Skapar en hexagonpolygon för huvudkartan.\n\n**Arbetsgång:**\n\n1. Tar emot hexagonens koordinater och hörnpunkter.  \n2. Skapar ett `polygon`\\-element.  \n3. Sätter ett unikt id.  \n4. Sparar koordinaterna i dataattribut.  \n5. Omvandlar hörnpunkterna till en SVG-punktsträng.  \n6. Sätter fyllning och kontur.  \n7. Returnerar polygonen.\n\n**Exempel på id:**\n\n`hex-12-4`\n\n**Dataattribut:**\n\n* `data-x`  \n* `data-y`\n\nVarje hörnpunkt formateras som `x,y` med två decimaler. Punkterna separeras med mellanslag.\n\n**Konturegenskaper:**\n\n* `stroke-width=\"1\"`  \n* `stroke-linejoin=\"round\"`  \n* `vector-effect=\"non-scaling-stroke\"`\n\n🔗 **Anropas av:** `MapGrid.constructor()`.\n\nVid anropet används fyllningen `#0e4664` och konturen `#3d8eab`.\n\n⚙️ **Effekt:** Returnerar en SVG-polygon.\n\nKlicklyssnaren registreras senare av `MapGrid`, inte av denna grafikfunktion.\n\n💡 **Arkitekturprincip — Separation of Concerns:** Grafikbiblioteket ansvarar för hexagonens utseende. Kartklassen ansvarar för interaktion och applikationslogik.\n\n---"
        }
      ],
      "notes": [
        "### **🌍 När huvudkartan byggs**\n\n`MapGrid.constructor()` → `createMapCanvas()` → `createSvg()`.\n\nFör varje hexagon:\n\n`MapGrid.constructor()` → `createWorldHexPolygon()` → `createSvg()`.\n\n### **🧭 När minikartan byggs**\n\n`Minimap.constructor()` → `createMinimapCanvas()` → `createMinimapBackground()` → `createMinimapHexagonPolygon()` → `createMinimapViewport()`.\n\n### **🖌️ När en penselikon skapas**\n\n`createIcon()` → `createBrushLargeIcon()` eller motsvarande storlek → `brush()` → `appendSvg()` och `stroke()`.\n\n### **↷ När Redo-ikonen skapas**\n\n`createIcon()` → `createRedoIcon()` → speglad SVG-grupp → `drawUndo()` → `stroke()`.\n\n### **🌳 När en skogsikon ritas**\n\nEn ikonfabrik → `tree()` → `appendSvg()` → `createSvg()`.\n\n---"
      ]
    },
    {
      "path": "src/library-svg-graphics/icons/shared.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🗺️ 3\\. Map Graphics — Huvudkarta och minikarta**\n\n\nHär skapas de grundläggande SVG-elementen för världskartan och dess minikarta."
        },
        {
          "kind": "prose",
          "text": "## **🧰 4\\. Shared Icons — Gemensamma ritfunktioner**\n\n\nDen här filen innehåller återanvändbara ritfunktioner som används av många olika ikoner."
        },
        {
          "kind": "function",
          "name": "nextClipId()",
          "identifier": "nextClipId()",
          "anchor": "nextClipId",
          "line": 9,
          "text": "Skapar ett nytt id för en SVG-klippmask.\n\n**Arbetsgång:**\n\n1. Ökar modulvariabeln `clipSerial`.  \n2. Bygger ett id med prefixet `icon-clip-`.  \n3. Returnerar det nya id.\n\n**Exempel:**\n\n`icon-clip-1`, `icon-clip-2`, `icon-clip-3`.\n\n🔗 **Anropas av:** `createCoastIcon()`.\n\n⚙️ **Effekt:** Ändrar en modulvariabel så att nästa anrop får ett nytt serienummer.\n\n💡 **Begrepp — clipPath:** En SVG-funktion som begränsar vilka delar av grafiken som får synas."
        },
        {
          "kind": "function",
          "name": "hex()",
          "identifier": "hex()",
          "anchor": "hex",
          "line": 14,
          "text": "Ritar en gemensam spetsig hexagonform i en ikon.\n\n**Grafiska egenskaper:**\n\n* Formen kommer från `POINTY_HEX`.  \n* Fyllningen skickas in som argument.  \n* Konturfärg: `rgba(7, 17, 28, 0.55)`.  \n* Konturtjocklek: `0.7`.  \n* Hörnform: `round`.\n\n🔗 **Anropar:** `appendSvg()`.\n\n🔗 **Anropas av:** `continent()` och flera terrängikoner, bland annat gräs, ocean, slätt och öken.\n\n⚙️ **Effekt:** Lägger till en SVG-`path` i föräldern."
        },
        {
          "kind": "function",
          "name": "stroke()",
          "identifier": "stroke()",
          "anchor": "stroke",
          "line": 24,
          "text": "Ritar en ofylld linje med rundade ändar.\n\n**Standardvärden:**\n\n* Färg: `currentColor`.  \n* Linjebredd: `1.6`.  \n* Fyllning: `none`.\n\n🔗 **Anropar:** `appendSvg()`.\n\n🔗 **Anropas av:** `brush()`, `drawUndo()` och flera ikonfabriker för exempelvis gräs, ocean, flod och vete.\n\n⚙️ **Effekt:** Lägger till en SVG-`path` i föräldern.\n\n💡 **Begrepp — currentColor:** Ett CSS-värde som låter grafiken använda elementets aktuella textfärg."
        },
        {
          "kind": "function",
          "name": "tree()",
          "identifier": "tree()",
          "anchor": "tree",
          "line": 40,
          "text": "Ritar ett stiliserat träd med krona och stam.\n\n**Arbetsgång:**\n\n1. Skapar en `path` för trädkronan.  \n2. Skapar en `rect` för stammen.  \n3. Centrerar stammen kring `cx`.\n\n**Stammens egenskaper:**\n\n* Bredd: `1.6`.  \n* Höjd: `2.2`.  \n* Fyllning: `#6a4630`.\n\n🔗 **Anropas av:** Bland annat `createWoodsIcon()`, `createRainforestIcon()`, `createGardensIcon()` och `createPlantationIcon()`.\n\n⚙️ **Effekt:** Lägger till två SVG-element i föräldern."
        },
        {
          "kind": "function",
          "name": "brush()",
          "identifier": "brush()",
          "anchor": "brush",
          "line": 64,
          "text": "Ritar den gemensamma penselformen.\n\n**Arbetsgång:**\n\n1. Skapar en cirkel för penselspetsen.  \n2. Placerar cirkeln vid `(10, 14.5)`.  \n3. Använder den radie som skickas in.  \n4. Sätter fyllningen till `currentColor`.  \n5. Anropar `stroke()` två gånger för skaft och spets.\n\nLinjerna använder bredden `1.8`.\n\n🔗 **Anropas av:** `createBrushLargeIcon()`, `createBrushMediumIcon()` och `createBrushSmallIcon()`.\n\n⚙️ **Effekt:** Lägger till en cirkel och två linjer i ikonen.\n\n💡 **Arkitekturprincip — Reusable Graphic Primitive:** Samma penselform används för flera ikoner. Endast radien behöver variera."
        },
        {
          "kind": "function",
          "name": "drawUndo()",
          "identifier": "drawUndo()",
          "anchor": "drawUndo",
          "line": 79,
          "text": "Ritar en bakåtböjd pil för Undo.\n\n**Arbetsgång:**\n\n1. Ritar pilhuvudet med `stroke()`.  \n2. Ritar ett horisontellt skaft.  \n3. Ritar en böjd del av pilen.\n\nDe tre SVG-sökvägarna är:\n\n* `M9 7.5 4.5 12 9 16.5`  \n* `M6 12h8.2`  \n* `M14.2 12a4.2 4.2 0 1 0-1.2-8.2`\n\n🔗 **Anropas av:** `createUndoIcon()` och `createRedoIcon()`.\n\n⚙️ **Effekt:** Lägger till tre linjer i föräldern.\n\n💡 **Begrepp — SVG Path:** En beskrivning av en grafisk bana med kommandon för exempelvis linjer, kurvor och bågar."
        },
        {
          "kind": "function",
          "name": "continent()",
          "identifier": "continent()",
          "anchor": "continent",
          "line": 85,
          "text": "Ritar en hexagon med en ljus mittpunkt.\n\n**Arbetsgång:**\n\n1. Anropar `hex(parent, color)`.  \n2. Lägger till en cirkel i mitten.  \n3. Placerar cirkeln vid `(12, 12)`.  \n4. Använder radien `2.1`.  \n5. Sätter fyllningen till `rgba(255,255,255,0.35)`.\n\n🔗 **Anropas av:** Kontinentikoner i bland annat blått, rött, grönt, guld, orange och lila.\n\n⚙️ **Effekt:** Lägger till hexagonformen och en mittcirkel.\n\n---"
        }
      ],
      "notes": [
        "### **🌍 När huvudkartan byggs**\n\n`MapGrid.constructor()` → `createMapCanvas()` → `createSvg()`.\n\nFör varje hexagon:\n\n`MapGrid.constructor()` → `createWorldHexPolygon()` → `createSvg()`.\n\n### **🧭 När minikartan byggs**\n\n`Minimap.constructor()` → `createMinimapCanvas()` → `createMinimapBackground()` → `createMinimapHexagonPolygon()` → `createMinimapViewport()`.\n\n### **🖌️ När en penselikon skapas**\n\n`createIcon()` → `createBrushLargeIcon()` eller motsvarande storlek → `brush()` → `appendSvg()` och `stroke()`.\n\n### **↷ När Redo-ikonen skapas**\n\n`createIcon()` → `createRedoIcon()` → speglad SVG-grupp → `drawUndo()` → `stroke()`.\n\n### **🌳 När en skogsikon ritas**\n\nEn ikonfabrik → `tree()` → `appendSvg()` → `createSvg()`.\n\n---"
      ]
    },
    {
      "path": "src/library-svg-graphics/icons/icon-header-mark.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🎨 5\\. Icon Factories — Konkreta ikoner**"
        },
        {
          "kind": "function",
          "name": "createHeaderMark()",
          "identifier": "createHeaderMark()",
          "anchor": "createHeaderMark",
          "line": 3,
          "text": "Skapar det dekorativa hexagonmärket i applikationens sidhuvud.\n\n**Arbetsgång:**\n\n1. Skapar en SVG med `viewBox=\"0 0 24 24\"`.  \n2. Sätter `aria-hidden=\"true\"`.  \n3. Lägger till en hexagonform.  \n4. Använder samma form som `POINTY_HEX`.\n\n**Färger:**\n\n* Fyllning: `#1b6a86`.  \n* Kontur: `#e2c27a`.\n\n🔗 **Anropas av:** `Header.constructor()`.\n\n⚙️ **Effekt:** Returnerar en SVG med en `path`.\n\nFunktionen använder `appendSvg()` direkt och inte den gemensamma `hex()`\\-funktionen."
        }
      ],
      "notes": [
        "### **🌍 När huvudkartan byggs**\n\n`MapGrid.constructor()` → `createMapCanvas()` → `createSvg()`.\n\nFör varje hexagon:\n\n`MapGrid.constructor()` → `createWorldHexPolygon()` → `createSvg()`.\n\n### **🧭 När minikartan byggs**\n\n`Minimap.constructor()` → `createMinimapCanvas()` → `createMinimapBackground()` → `createMinimapHexagonPolygon()` → `createMinimapViewport()`.\n\n### **🖌️ När en penselikon skapas**\n\n`createIcon()` → `createBrushLargeIcon()` eller motsvarande storlek → `brush()` → `appendSvg()` och `stroke()`.\n\n### **↷ När Redo-ikonen skapas**\n\n`createIcon()` → `createRedoIcon()` → speglad SVG-grupp → `drawUndo()` → `stroke()`.\n\n### **🌳 När en skogsikon ritas**\n\nEn ikonfabrik → `tree()` → `appendSvg()` → `createSvg()`.\n\n---"
      ]
    },
    {
      "path": "src/library-svg-graphics/icons/brush/icon-brush-large.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🎨 5\\. Icon Factories — Konkreta ikoner**"
        },
        {
          "kind": "function",
          "name": "createBrushLargeIcon()",
          "identifier": "createBrushLargeIcon()",
          "anchor": "createBrushLargeIcon",
          "line": 5,
          "text": "Skapar ikonen för den stora penseln.\n\n**Arbetsgång:**\n\n1. Skapar en SVG på 24 × 24\\.  \n2. Sätter `aria-hidden=\"true\"`.  \n3. Sätter `fill=\"none\"`.  \n4. Anropar `brush(icon, 5)`.\n\n🔗 **Anropas av:** `createIcon()` med nyckeln `brush-large`.\n\n⚙️ **Effekt:** Returnerar den färdiga ikonen."
        }
      ],
      "notes": [
        "### **🌍 När huvudkartan byggs**\n\n`MapGrid.constructor()` → `createMapCanvas()` → `createSvg()`.\n\nFör varje hexagon:\n\n`MapGrid.constructor()` → `createWorldHexPolygon()` → `createSvg()`.\n\n### **🧭 När minikartan byggs**\n\n`Minimap.constructor()` → `createMinimapCanvas()` → `createMinimapBackground()` → `createMinimapHexagonPolygon()` → `createMinimapViewport()`.\n\n### **🖌️ När en penselikon skapas**\n\n`createIcon()` → `createBrushLargeIcon()` eller motsvarande storlek → `brush()` → `appendSvg()` och `stroke()`.\n\n### **↷ När Redo-ikonen skapas**\n\n`createIcon()` → `createRedoIcon()` → speglad SVG-grupp → `drawUndo()` → `stroke()`.\n\n### **🌳 När en skogsikon ritas**\n\nEn ikonfabrik → `tree()` → `appendSvg()` → `createSvg()`.\n\n---"
      ]
    },
    {
      "path": "src/library-svg-graphics/icons/brush/icon-brush-medium.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🎨 5\\. Icon Factories — Konkreta ikoner**"
        },
        {
          "kind": "function",
          "name": "createBrushMediumIcon()",
          "identifier": "createBrushMediumIcon()",
          "anchor": "createBrushMediumIcon",
          "line": 5,
          "text": "Skapar ikonen för mellanpenseln.\n\nAnvänder samma SVG-struktur som den stora penseln men anropar:\n\n`brush(icon, 3.4)`\n\n🔗 **Anropas av:** `createIcon()` med nyckeln `brush-medium`.\n\n⚙️ **Effekt:** Returnerar ikonen."
        }
      ],
      "notes": [
        "### **🌍 När huvudkartan byggs**\n\n`MapGrid.constructor()` → `createMapCanvas()` → `createSvg()`.\n\nFör varje hexagon:\n\n`MapGrid.constructor()` → `createWorldHexPolygon()` → `createSvg()`.\n\n### **🧭 När minikartan byggs**\n\n`Minimap.constructor()` → `createMinimapCanvas()` → `createMinimapBackground()` → `createMinimapHexagonPolygon()` → `createMinimapViewport()`.\n\n### **🖌️ När en penselikon skapas**\n\n`createIcon()` → `createBrushLargeIcon()` eller motsvarande storlek → `brush()` → `appendSvg()` och `stroke()`.\n\n### **↷ När Redo-ikonen skapas**\n\n`createIcon()` → `createRedoIcon()` → speglad SVG-grupp → `drawUndo()` → `stroke()`.\n\n### **🌳 När en skogsikon ritas**\n\nEn ikonfabrik → `tree()` → `appendSvg()` → `createSvg()`.\n\n---"
      ]
    },
    {
      "path": "src/library-svg-graphics/icons/brush/icon-brush-small.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🎨 5\\. Icon Factories — Konkreta ikoner**"
        },
        {
          "kind": "function",
          "name": "createBrushSmallIcon()",
          "identifier": "createBrushSmallIcon()",
          "anchor": "createBrushSmallIcon",
          "line": 5,
          "text": "Skapar ikonen för den lilla penseln.\n\nAnropar:\n\n`brush(icon, 2.1)`\n\n🔗 **Anropas av:** `createIcon()` med nyckeln `brush-small`.\n\n⚙️ **Effekt:** Returnerar ikonen.\n\n**Jämförelse av penselstorlekar:**\n\n| Ikon | Penselspetsens radie |\n| ----- | ----- |\n| Large | 5 |\n| Medium | 3,4 |\n| Small | 2,1 |\n\nAlla tre återanvänder samma grundläggande penselritning."
        }
      ],
      "notes": [
        "### **🌍 När huvudkartan byggs**\n\n`MapGrid.constructor()` → `createMapCanvas()` → `createSvg()`.\n\nFör varje hexagon:\n\n`MapGrid.constructor()` → `createWorldHexPolygon()` → `createSvg()`.\n\n### **🧭 När minikartan byggs**\n\n`Minimap.constructor()` → `createMinimapCanvas()` → `createMinimapBackground()` → `createMinimapHexagonPolygon()` → `createMinimapViewport()`.\n\n### **🖌️ När en penselikon skapas**\n\n`createIcon()` → `createBrushLargeIcon()` eller motsvarande storlek → `brush()` → `appendSvg()` och `stroke()`.\n\n### **↷ När Redo-ikonen skapas**\n\n`createIcon()` → `createRedoIcon()` → speglad SVG-grupp → `drawUndo()` → `stroke()`.\n\n### **🌳 När en skogsikon ritas**\n\nEn ikonfabrik → `tree()` → `appendSvg()` → `createSvg()`.\n\n---"
      ]
    },
    {
      "path": "src/library-svg-graphics/icons/brush/icon-redo.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🎨 5\\. Icon Factories — Konkreta ikoner**"
        },
        {
          "kind": "function",
          "name": "createRedoIcon()",
          "identifier": "createRedoIcon()",
          "anchor": "createRedoIcon",
          "line": 5,
          "text": "Skapar en Redo-ikon genom att spegla Undo-pilen.\n\n**Arbetsgång:**\n\n1. Skapar en SVG på 24 × 24\\.  \n2. Skapar en grupp, `g`.  \n3. Sätter gruppens transformering till `translate(24 0) scale(-1 1)`.  \n4. Anropar `drawUndo()` inuti den speglade gruppen.\n\n🔗 **Anropas av:** `createIcon()` med nyckeln `redo`.\n\n⚙️ **Effekt:** Returnerar en ikon vars pil pekar åt höger.\n\n💡 **Begrepp — SVG Transform:** En grafisk transformering som kan flytta, rotera, skala eller spegla element.\n\n💡 **Arkitekturprincip — Graphic Reuse:** Samma pilgeometri används för både Undo och Redo. Redo skapas genom spegling i stället för att rita en separat pil.\n\n---"
        }
      ],
      "notes": [
        "### **🌍 När huvudkartan byggs**\n\n`MapGrid.constructor()` → `createMapCanvas()` → `createSvg()`.\n\nFör varje hexagon:\n\n`MapGrid.constructor()` → `createWorldHexPolygon()` → `createSvg()`.\n\n### **🧭 När minikartan byggs**\n\n`Minimap.constructor()` → `createMinimapCanvas()` → `createMinimapBackground()` → `createMinimapHexagonPolygon()` → `createMinimapViewport()`.\n\n### **🖌️ När en penselikon skapas**\n\n`createIcon()` → `createBrushLargeIcon()` eller motsvarande storlek → `brush()` → `appendSvg()` och `stroke()`.\n\n### **↷ När Redo-ikonen skapas**\n\n`createIcon()` → `createRedoIcon()` → speglad SVG-grupp → `drawUndo()` → `stroke()`.\n\n### **🌳 När en skogsikon ritas**\n\nEn ikonfabrik → `tree()` → `appendSvg()` → `createSvg()`.\n\n---"
      ]
    },
    {
      "path": "src/library-svg-graphics/icons/brush/icon-undo.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **↶ 1\\. Brush — Undo-ikonen**"
        },
        {
          "kind": "function",
          "name": "createUndoIcon()",
          "identifier": "createUndoIcon()",
          "anchor": "createUndoIcon",
          "line": 4,
          "text": "Skapar ikonen för att ångra en åtgärd.\n\n**Arbetsgång:**\n\n1. Skapar en SVG-rot med storleken 24 × 24\\.  \n2. Sätter `aria-hidden=\"true\"`.  \n3. Sätter `fill=\"none\"`.  \n4. Anropar `drawUndo(icon)`.  \n5. Returnerar den färdiga ikonen.\n\n🔗 **Anropas av:** `createIcon()` med nyckeln `undo`.\n\n⚙️ **Effekt:** Returnerar en SVG med en vänsterpekande, bakåtböjd pil.\n\nTill skillnad från `createRedoIcon()` används ingen spegling.\n\n💡 **Arkitekturprincip — Graphic Reuse:** Undo och Redo bygger på samma ritfunktion. Redo speglar pilen, medan Undo använder den ursprungliga formen.\n\n---"
        }
      ],
      "notes": [
        "### **🌍 Kontinentikoner**\n\n`createIcon()` → `createContinentBlueIcon()` → `continent()` → `hex()` och `appendSvg()`.\n\nSamma struktur används för alla sex kontinentfärger.\n\n### **🌳 Naturformationer**\n\n`createIcon()` → `createRainforestIcon()` → `tree()` → `appendSvg()`.\n\n### **✏️ Redigeringsikoner**\n\n`createEditorActionIcon()` → `createEditIcon()` → `appendSvg()`.\n\n### **⛺ Förbättringsikoner**\n\n`createIcon()` → `createCampIcon()` → `appendSvg()` och `stroke()`.\n\n### **↶ Undo**\n\n`createIcon()` → `createUndoIcon()` → `drawUndo()` → `stroke()`.\n\n---",
        "### **♻️ Återanvändbara ritfunktioner**\n\nMånga ikoner byggs från samma små funktioner:\n\n* `createSvg()` skapar SVG-element.  \n* `appendSvg()` lägger till element.  \n* `stroke()` ritar linjer.  \n* `hex()` ritar hexagoner.  \n* `tree()` ritar träd.  \n* `continent()` bygger kontinentikoner.  \n* `drawUndo()` bygger pilgeometri.\n\nDet minskar behovet av att upprepa samma grafikkod.\n\n### **🎨 Grafik utan applikationslogik**\n\nIkonfunktionerna returnerar SVG-element.\n\nDe ansvarar inte för att:\n\n* Starta redigeringssessioner.  \n* Ändra terräng i Convex.  \n* Hantera användarbehörigheter.  \n* Bestämma vilken värld som är aktiv.\n\nDetta är en tydlig uppdelning mellan grafik och beteende.\n\n### **🧩 Små funktioner med tydliga ansvar**\n\nVarje ikonfabrik har ett begränsat syfte: att skapa en bestämd grafisk symbol.\n\nDet gör funktionerna lättare att hitta, förstå och återanvända.\n\n---"
      ]
    },
    {
      "path": "src/library-svg-graphics/icons/continents/icon-continent-blue.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🌍 2\\. Continents — Kontinentikonerna**\n\n\nAlla sex kontinentikoner använder den gemensamma funktionen `continent()`.\n\nDen ritar en färgad hexagon med en ljus mittcirkel.\n\nVarje ikonfabrik ansvarar huvudsakligen för att välja färg."
        },
        {
          "kind": "function",
          "name": "createContinentBlueIcon()",
          "identifier": "createContinentBlueIcon()",
          "anchor": "createContinentBlueIcon",
          "line": 5,
          "text": "Skapar den blå kontinentikonen.\n\n🔗 **Anropar:** `continent(icon, '#3d7ec4')`.\n\n🔗 **Anropas av:** `createIcon()` med nyckeln `continent-blue`.\n\n⚙️ **Effekt:** Returnerar en blå hexagonikon med ljus mittpunkt."
        }
      ],
      "notes": [
        "### **🌍 Kontinentikoner**\n\n`createIcon()` → `createContinentBlueIcon()` → `continent()` → `hex()` och `appendSvg()`.\n\nSamma struktur används för alla sex kontinentfärger.\n\n### **🌳 Naturformationer**\n\n`createIcon()` → `createRainforestIcon()` → `tree()` → `appendSvg()`.\n\n### **✏️ Redigeringsikoner**\n\n`createEditorActionIcon()` → `createEditIcon()` → `appendSvg()`.\n\n### **⛺ Förbättringsikoner**\n\n`createIcon()` → `createCampIcon()` → `appendSvg()` och `stroke()`.\n\n### **↶ Undo**\n\n`createIcon()` → `createUndoIcon()` → `drawUndo()` → `stroke()`.\n\n---",
        "### **♻️ Återanvändbara ritfunktioner**\n\nMånga ikoner byggs från samma små funktioner:\n\n* `createSvg()` skapar SVG-element.  \n* `appendSvg()` lägger till element.  \n* `stroke()` ritar linjer.  \n* `hex()` ritar hexagoner.  \n* `tree()` ritar träd.  \n* `continent()` bygger kontinentikoner.  \n* `drawUndo()` bygger pilgeometri.\n\nDet minskar behovet av att upprepa samma grafikkod.\n\n### **🎨 Grafik utan applikationslogik**\n\nIkonfunktionerna returnerar SVG-element.\n\nDe ansvarar inte för att:\n\n* Starta redigeringssessioner.  \n* Ändra terräng i Convex.  \n* Hantera användarbehörigheter.  \n* Bestämma vilken värld som är aktiv.\n\nDetta är en tydlig uppdelning mellan grafik och beteende.\n\n### **🧩 Små funktioner med tydliga ansvar**\n\nVarje ikonfabrik har ett begränsat syfte: att skapa en bestämd grafisk symbol.\n\nDet gör funktionerna lättare att hitta, förstå och återanvända.\n\n---"
      ]
    },
    {
      "path": "src/library-svg-graphics/icons/continents/icon-continent-crimson.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🌍 2\\. Continents — Kontinentikonerna**\n\n\nAlla sex kontinentikoner använder den gemensamma funktionen `continent()`.\n\nDen ritar en färgad hexagon med en ljus mittcirkel.\n\nVarje ikonfabrik ansvarar huvudsakligen för att välja färg."
        },
        {
          "kind": "function",
          "name": "createContinentCrimsonIcon()",
          "identifier": "createContinentCrimsonIcon()",
          "anchor": "createContinentCrimsonIcon",
          "line": 5,
          "text": "Skapar den röda kontinentikonen.\n\n🔗 **Anropar:** `continent(icon, '#c4493a')`.\n\n🔗 **Anropas av:** `createIcon()` med nyckeln `continent-crimson`.\n\n⚙️ **Effekt:** Returnerar en röd hexagonikon."
        }
      ],
      "notes": [
        "### **🌍 Kontinentikoner**\n\n`createIcon()` → `createContinentBlueIcon()` → `continent()` → `hex()` och `appendSvg()`.\n\nSamma struktur används för alla sex kontinentfärger.\n\n### **🌳 Naturformationer**\n\n`createIcon()` → `createRainforestIcon()` → `tree()` → `appendSvg()`.\n\n### **✏️ Redigeringsikoner**\n\n`createEditorActionIcon()` → `createEditIcon()` → `appendSvg()`.\n\n### **⛺ Förbättringsikoner**\n\n`createIcon()` → `createCampIcon()` → `appendSvg()` och `stroke()`.\n\n### **↶ Undo**\n\n`createIcon()` → `createUndoIcon()` → `drawUndo()` → `stroke()`.\n\n---",
        "### **♻️ Återanvändbara ritfunktioner**\n\nMånga ikoner byggs från samma små funktioner:\n\n* `createSvg()` skapar SVG-element.  \n* `appendSvg()` lägger till element.  \n* `stroke()` ritar linjer.  \n* `hex()` ritar hexagoner.  \n* `tree()` ritar träd.  \n* `continent()` bygger kontinentikoner.  \n* `drawUndo()` bygger pilgeometri.\n\nDet minskar behovet av att upprepa samma grafikkod.\n\n### **🎨 Grafik utan applikationslogik**\n\nIkonfunktionerna returnerar SVG-element.\n\nDe ansvarar inte för att:\n\n* Starta redigeringssessioner.  \n* Ändra terräng i Convex.  \n* Hantera användarbehörigheter.  \n* Bestämma vilken värld som är aktiv.\n\nDetta är en tydlig uppdelning mellan grafik och beteende.\n\n### **🧩 Små funktioner med tydliga ansvar**\n\nVarje ikonfabrik har ett begränsat syfte: att skapa en bestämd grafisk symbol.\n\nDet gör funktionerna lättare att hitta, förstå och återanvända.\n\n---"
      ]
    },
    {
      "path": "src/library-svg-graphics/icons/continents/icon-continent-gold.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🌍 2\\. Continents — Kontinentikonerna**\n\n\nAlla sex kontinentikoner använder den gemensamma funktionen `continent()`.\n\nDen ritar en färgad hexagon med en ljus mittcirkel.\n\nVarje ikonfabrik ansvarar huvudsakligen för att välja färg."
        },
        {
          "kind": "function",
          "name": "createContinentGoldIcon()",
          "identifier": "createContinentGoldIcon()",
          "anchor": "createContinentGoldIcon",
          "line": 5,
          "text": "Skapar den guldfärgade kontinentikonen.\n\n🔗 **Anropar:** `continent(icon, '#d4a017')`.\n\n🔗 **Anropas av:** `createIcon()` med nyckeln `continent-gold`.\n\n⚙️ **Effekt:** Returnerar en guldfärgad hexagonikon."
        }
      ],
      "notes": [
        "### **🌍 Kontinentikoner**\n\n`createIcon()` → `createContinentBlueIcon()` → `continent()` → `hex()` och `appendSvg()`.\n\nSamma struktur används för alla sex kontinentfärger.\n\n### **🌳 Naturformationer**\n\n`createIcon()` → `createRainforestIcon()` → `tree()` → `appendSvg()`.\n\n### **✏️ Redigeringsikoner**\n\n`createEditorActionIcon()` → `createEditIcon()` → `appendSvg()`.\n\n### **⛺ Förbättringsikoner**\n\n`createIcon()` → `createCampIcon()` → `appendSvg()` och `stroke()`.\n\n### **↶ Undo**\n\n`createIcon()` → `createUndoIcon()` → `drawUndo()` → `stroke()`.\n\n---",
        "### **♻️ Återanvändbara ritfunktioner**\n\nMånga ikoner byggs från samma små funktioner:\n\n* `createSvg()` skapar SVG-element.  \n* `appendSvg()` lägger till element.  \n* `stroke()` ritar linjer.  \n* `hex()` ritar hexagoner.  \n* `tree()` ritar träd.  \n* `continent()` bygger kontinentikoner.  \n* `drawUndo()` bygger pilgeometri.\n\nDet minskar behovet av att upprepa samma grafikkod.\n\n### **🎨 Grafik utan applikationslogik**\n\nIkonfunktionerna returnerar SVG-element.\n\nDe ansvarar inte för att:\n\n* Starta redigeringssessioner.  \n* Ändra terräng i Convex.  \n* Hantera användarbehörigheter.  \n* Bestämma vilken värld som är aktiv.\n\nDetta är en tydlig uppdelning mellan grafik och beteende.\n\n### **🧩 Små funktioner med tydliga ansvar**\n\nVarje ikonfabrik har ett begränsat syfte: att skapa en bestämd grafisk symbol.\n\nDet gör funktionerna lättare att hitta, förstå och återanvända.\n\n---"
      ]
    },
    {
      "path": "src/library-svg-graphics/icons/continents/icon-continent-green.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🌍 2\\. Continents — Kontinentikonerna**\n\n\nAlla sex kontinentikoner använder den gemensamma funktionen `continent()`.\n\nDen ritar en färgad hexagon med en ljus mittcirkel.\n\nVarje ikonfabrik ansvarar huvudsakligen för att välja färg."
        },
        {
          "kind": "function",
          "name": "createContinentGreenIcon()",
          "identifier": "createContinentGreenIcon()",
          "anchor": "createContinentGreenIcon",
          "line": 5,
          "text": "Skapar den gröna kontinentikonen.\n\n🔗 **Anropar:** `continent(icon, '#3e9a55')`.\n\n🔗 **Anropas av:** `createIcon()` med nyckeln `continent-green`.\n\n⚙️ **Effekt:** Returnerar en grön hexagonikon."
        }
      ],
      "notes": [
        "### **🌍 Kontinentikoner**\n\n`createIcon()` → `createContinentBlueIcon()` → `continent()` → `hex()` och `appendSvg()`.\n\nSamma struktur används för alla sex kontinentfärger.\n\n### **🌳 Naturformationer**\n\n`createIcon()` → `createRainforestIcon()` → `tree()` → `appendSvg()`.\n\n### **✏️ Redigeringsikoner**\n\n`createEditorActionIcon()` → `createEditIcon()` → `appendSvg()`.\n\n### **⛺ Förbättringsikoner**\n\n`createIcon()` → `createCampIcon()` → `appendSvg()` och `stroke()`.\n\n### **↶ Undo**\n\n`createIcon()` → `createUndoIcon()` → `drawUndo()` → `stroke()`.\n\n---",
        "### **♻️ Återanvändbara ritfunktioner**\n\nMånga ikoner byggs från samma små funktioner:\n\n* `createSvg()` skapar SVG-element.  \n* `appendSvg()` lägger till element.  \n* `stroke()` ritar linjer.  \n* `hex()` ritar hexagoner.  \n* `tree()` ritar träd.  \n* `continent()` bygger kontinentikoner.  \n* `drawUndo()` bygger pilgeometri.\n\nDet minskar behovet av att upprepa samma grafikkod.\n\n### **🎨 Grafik utan applikationslogik**\n\nIkonfunktionerna returnerar SVG-element.\n\nDe ansvarar inte för att:\n\n* Starta redigeringssessioner.  \n* Ändra terräng i Convex.  \n* Hantera användarbehörigheter.  \n* Bestämma vilken värld som är aktiv.\n\nDetta är en tydlig uppdelning mellan grafik och beteende.\n\n### **🧩 Små funktioner med tydliga ansvar**\n\nVarje ikonfabrik har ett begränsat syfte: att skapa en bestämd grafisk symbol.\n\nDet gör funktionerna lättare att hitta, förstå och återanvända.\n\n---"
      ]
    },
    {
      "path": "src/library-svg-graphics/icons/continents/icon-continent-orange.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🌍 2\\. Continents — Kontinentikonerna**\n\n\nAlla sex kontinentikoner använder den gemensamma funktionen `continent()`.\n\nDen ritar en färgad hexagon med en ljus mittcirkel.\n\nVarje ikonfabrik ansvarar huvudsakligen för att välja färg."
        },
        {
          "kind": "function",
          "name": "createContinentOrangeIcon()",
          "identifier": "createContinentOrangeIcon()",
          "anchor": "createContinentOrangeIcon",
          "line": 5,
          "text": "Skapar den orange kontinentikonen.\n\n🔗 **Anropar:** `continent(icon, '#d47a2a')`.\n\n🔗 **Anropas av:** `createIcon()` med nyckeln `continent-orange`.\n\n⚙️ **Effekt:** Returnerar en orange hexagonikon."
        }
      ],
      "notes": [
        "### **🌍 Kontinentikoner**\n\n`createIcon()` → `createContinentBlueIcon()` → `continent()` → `hex()` och `appendSvg()`.\n\nSamma struktur används för alla sex kontinentfärger.\n\n### **🌳 Naturformationer**\n\n`createIcon()` → `createRainforestIcon()` → `tree()` → `appendSvg()`.\n\n### **✏️ Redigeringsikoner**\n\n`createEditorActionIcon()` → `createEditIcon()` → `appendSvg()`.\n\n### **⛺ Förbättringsikoner**\n\n`createIcon()` → `createCampIcon()` → `appendSvg()` och `stroke()`.\n\n### **↶ Undo**\n\n`createIcon()` → `createUndoIcon()` → `drawUndo()` → `stroke()`.\n\n---",
        "### **♻️ Återanvändbara ritfunktioner**\n\nMånga ikoner byggs från samma små funktioner:\n\n* `createSvg()` skapar SVG-element.  \n* `appendSvg()` lägger till element.  \n* `stroke()` ritar linjer.  \n* `hex()` ritar hexagoner.  \n* `tree()` ritar träd.  \n* `continent()` bygger kontinentikoner.  \n* `drawUndo()` bygger pilgeometri.\n\nDet minskar behovet av att upprepa samma grafikkod.\n\n### **🎨 Grafik utan applikationslogik**\n\nIkonfunktionerna returnerar SVG-element.\n\nDe ansvarar inte för att:\n\n* Starta redigeringssessioner.  \n* Ändra terräng i Convex.  \n* Hantera användarbehörigheter.  \n* Bestämma vilken värld som är aktiv.\n\nDetta är en tydlig uppdelning mellan grafik och beteende.\n\n### **🧩 Små funktioner med tydliga ansvar**\n\nVarje ikonfabrik har ett begränsat syfte: att skapa en bestämd grafisk symbol.\n\nDet gör funktionerna lättare att hitta, förstå och återanvända.\n\n---"
      ]
    },
    {
      "path": "src/library-svg-graphics/icons/continents/icon-continent-purple.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🌍 2\\. Continents — Kontinentikonerna**\n\n\nAlla sex kontinentikoner använder den gemensamma funktionen `continent()`.\n\nDen ritar en färgad hexagon med en ljus mittcirkel.\n\nVarje ikonfabrik ansvarar huvudsakligen för att välja färg."
        },
        {
          "kind": "function",
          "name": "createContinentPurpleIcon()",
          "identifier": "createContinentPurpleIcon()",
          "anchor": "createContinentPurpleIcon",
          "line": 5,
          "text": "Skapar den lila kontinentikonen.\n\n🔗 **Anropar:** `continent(icon, '#7a5cad')`.\n\n🔗 **Anropas av:** `createIcon()` med nyckeln `continent-purple`.\n\n⚙️ **Effekt:** Returnerar en lila hexagonikon."
        },
        {
          "kind": "prose",
          "text": "### **🎨 Kontinenternas färgpalett**\n\n| Kontinentikon | Färgkod |\n| ----- | ----- |\n| 🔵 Blue | `#3d7ec4` |\n| 🔴 Crimson | `#c4493a` |\n| 🟡 Gold | `#d4a017` |\n| 🟢 Green | `#3e9a55` |\n| 🟠 Orange | `#d47a2a` |\n| 🟣 Purple | `#7a5cad` |\n\n💡 **Arkitekturprincip — Parameterization:** En enda ritfunktion kan skapa flera grafiska varianter genom att ta emot olika argument.\n\n---"
        }
      ],
      "notes": [
        "### **🌍 Kontinentikoner**\n\n`createIcon()` → `createContinentBlueIcon()` → `continent()` → `hex()` och `appendSvg()`.\n\nSamma struktur används för alla sex kontinentfärger.\n\n### **🌳 Naturformationer**\n\n`createIcon()` → `createRainforestIcon()` → `tree()` → `appendSvg()`.\n\n### **✏️ Redigeringsikoner**\n\n`createEditorActionIcon()` → `createEditIcon()` → `appendSvg()`.\n\n### **⛺ Förbättringsikoner**\n\n`createIcon()` → `createCampIcon()` → `appendSvg()` och `stroke()`.\n\n### **↶ Undo**\n\n`createIcon()` → `createUndoIcon()` → `drawUndo()` → `stroke()`.\n\n---",
        "### **♻️ Återanvändbara ritfunktioner**\n\nMånga ikoner byggs från samma små funktioner:\n\n* `createSvg()` skapar SVG-element.  \n* `appendSvg()` lägger till element.  \n* `stroke()` ritar linjer.  \n* `hex()` ritar hexagoner.  \n* `tree()` ritar träd.  \n* `continent()` bygger kontinentikoner.  \n* `drawUndo()` bygger pilgeometri.\n\nDet minskar behovet av att upprepa samma grafikkod.\n\n### **🎨 Grafik utan applikationslogik**\n\nIkonfunktionerna returnerar SVG-element.\n\nDe ansvarar inte för att:\n\n* Starta redigeringssessioner.  \n* Ändra terräng i Convex.  \n* Hantera användarbehörigheter.  \n* Bestämma vilken värld som är aktiv.\n\nDetta är en tydlig uppdelning mellan grafik och beteende.\n\n### **🧩 Små funktioner med tydliga ansvar**\n\nVarje ikonfabrik har ett begränsat syfte: att skapa en bestämd grafisk symbol.\n\nDet gör funktionerna lättare att hitta, förstå och återanvända.\n\n---"
      ]
    },
    {
      "path": "src/library-svg-graphics/icons/editor-actions/icon-edit.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🛠️ 3\\. Editor Actions — Redigeringsikoner**\n\n\nDessa ikoner representerar åtgärder i redigeringsgränssnittet.\n\nDe skapas som SVG-grafik och används genom `createEditorActionIcon()`."
        },
        {
          "kind": "function",
          "name": "createEditIcon()",
          "identifier": "createEditIcon()",
          "anchor": "createEditIcon",
          "line": 4,
          "text": "Ritar en penna som symboliserar redigering.\n\n**Arbetsgång:**\n\n1. Skapar SVG-roten.  \n2. Ritar pennans ytterkontur.  \n3. Ritar två kompletterande linjer.  \n4. Använder `currentColor`.  \n5. Använder linjebredden `1.6`.\n\n**Pennans ytterkontur:**\n\n`M5 19l4.2-.9L19 8.3 15.7 5 5.9 14.8 5 19Z`\n\n**Kompletterande linjer:**\n\n`M13.8 6.9l3.3 3.3`\n\n`M5.9 14.8l3.3 3.3`\n\n🔗 **Anropas av:** `createEditorActionIcon()` med nyckeln `edit`.\n\n⚙️ **Effekt:** Returnerar en pennikon."
        }
      ],
      "notes": [
        "### **🌍 Kontinentikoner**\n\n`createIcon()` → `createContinentBlueIcon()` → `continent()` → `hex()` och `appendSvg()`.\n\nSamma struktur används för alla sex kontinentfärger.\n\n### **🌳 Naturformationer**\n\n`createIcon()` → `createRainforestIcon()` → `tree()` → `appendSvg()`.\n\n### **✏️ Redigeringsikoner**\n\n`createEditorActionIcon()` → `createEditIcon()` → `appendSvg()`.\n\n### **⛺ Förbättringsikoner**\n\n`createIcon()` → `createCampIcon()` → `appendSvg()` och `stroke()`.\n\n### **↶ Undo**\n\n`createIcon()` → `createUndoIcon()` → `drawUndo()` → `stroke()`.\n\n---",
        "### **♻️ Återanvändbara ritfunktioner**\n\nMånga ikoner byggs från samma små funktioner:\n\n* `createSvg()` skapar SVG-element.  \n* `appendSvg()` lägger till element.  \n* `stroke()` ritar linjer.  \n* `hex()` ritar hexagoner.  \n* `tree()` ritar träd.  \n* `continent()` bygger kontinentikoner.  \n* `drawUndo()` bygger pilgeometri.\n\nDet minskar behovet av att upprepa samma grafikkod.\n\n### **🎨 Grafik utan applikationslogik**\n\nIkonfunktionerna returnerar SVG-element.\n\nDe ansvarar inte för att:\n\n* Starta redigeringssessioner.  \n* Ändra terräng i Convex.  \n* Hantera användarbehörigheter.  \n* Bestämma vilken värld som är aktiv.\n\nDetta är en tydlig uppdelning mellan grafik och beteende.\n\n### **🧩 Små funktioner med tydliga ansvar**\n\nVarje ikonfabrik har ett begränsat syfte: att skapa en bestämd grafisk symbol.\n\nDet gör funktionerna lättare att hitta, förstå och återanvända.\n\n---"
      ]
    },
    {
      "path": "src/library-svg-graphics/icons/editor-actions/icon-like.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🛠️ 3\\. Editor Actions — Redigeringsikoner**\n\n\nDessa ikoner representerar åtgärder i redigeringsgränssnittet.\n\nDe skapas som SVG-grafik och används genom `createEditorActionIcon()`."
        },
        {
          "kind": "function",
          "name": "createLikeIcon()",
          "identifier": "createLikeIcon()",
          "anchor": "createLikeIcon",
          "line": 4,
          "text": "Ritar en tumme upp.\n\n**Grafiska delar:**\n\n1. En ofylld SVG-`path` för handen.  \n2. En rektangel som bildar handens bas.\n\n**Rektangelns egenskaper:**\n\n* Position: `(3, 10)`.  \n* Bredd: `4`.  \n* Höjd: `10`.  \n* Hörnradie: `1`.\n\nKonturen använder `currentColor` och linjebredden `1.6`.\n\n🔗 **Anropas av:** `createEditorActionIcon()` med nyckeln `like`.\n\n⚙️ **Effekt:** Returnerar en tumme upp-ikon."
        }
      ],
      "notes": [
        "### **🌍 Kontinentikoner**\n\n`createIcon()` → `createContinentBlueIcon()` → `continent()` → `hex()` och `appendSvg()`.\n\nSamma struktur används för alla sex kontinentfärger.\n\n### **🌳 Naturformationer**\n\n`createIcon()` → `createRainforestIcon()` → `tree()` → `appendSvg()`.\n\n### **✏️ Redigeringsikoner**\n\n`createEditorActionIcon()` → `createEditIcon()` → `appendSvg()`.\n\n### **⛺ Förbättringsikoner**\n\n`createIcon()` → `createCampIcon()` → `appendSvg()` och `stroke()`.\n\n### **↶ Undo**\n\n`createIcon()` → `createUndoIcon()` → `drawUndo()` → `stroke()`.\n\n---",
        "### **♻️ Återanvändbara ritfunktioner**\n\nMånga ikoner byggs från samma små funktioner:\n\n* `createSvg()` skapar SVG-element.  \n* `appendSvg()` lägger till element.  \n* `stroke()` ritar linjer.  \n* `hex()` ritar hexagoner.  \n* `tree()` ritar träd.  \n* `continent()` bygger kontinentikoner.  \n* `drawUndo()` bygger pilgeometri.\n\nDet minskar behovet av att upprepa samma grafikkod.\n\n### **🎨 Grafik utan applikationslogik**\n\nIkonfunktionerna returnerar SVG-element.\n\nDe ansvarar inte för att:\n\n* Starta redigeringssessioner.  \n* Ändra terräng i Convex.  \n* Hantera användarbehörigheter.  \n* Bestämma vilken värld som är aktiv.\n\nDetta är en tydlig uppdelning mellan grafik och beteende.\n\n### **🧩 Små funktioner med tydliga ansvar**\n\nVarje ikonfabrik har ett begränsat syfte: att skapa en bestämd grafisk symbol.\n\nDet gör funktionerna lättare att hitta, förstå och återanvända.\n\n---"
      ]
    },
    {
      "path": "src/library-svg-graphics/icons/editor-actions/icon-stop-editing.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🛠️ 3\\. Editor Actions — Redigeringsikoner**\n\n\nDessa ikoner representerar åtgärder i redigeringsgränssnittet.\n\nDe skapas som SVG-grafik och används genom `createEditorActionIcon()`."
        },
        {
          "kind": "function",
          "name": "createStopEditingIcon()",
          "identifier": "createStopEditingIcon()",
          "anchor": "createStopEditingIcon",
          "line": 4,
          "text": "Ritar en stoppsymbol för att avsluta redigering.\n\n**Yttre rektangel:**\n\n* Position: `(5, 5)`.  \n* Storlek: 14 × 14\\.  \n* Hörnradie: `1.5`.  \n* Ingen fyllning.  \n* Kontur: `currentColor`.  \n* Linjebredd: `1.6`.\n\n**Inre rektangel:**\n\n* Position: `(9, 9)`.  \n* Storlek: 6 × 6\\.  \n* Hörnradie: `0.5`.  \n* Fyllning: `currentColor`.\n\n🔗 **Anropas av:** `createEditorActionIcon()` med nyckeln `stop-editing`.\n\n⚙️ **Effekt:** Returnerar en ikon med en fylld stoppruta inuti en yttre ram."
        }
      ],
      "notes": [
        "### **🌍 Kontinentikoner**\n\n`createIcon()` → `createContinentBlueIcon()` → `continent()` → `hex()` och `appendSvg()`.\n\nSamma struktur används för alla sex kontinentfärger.\n\n### **🌳 Naturformationer**\n\n`createIcon()` → `createRainforestIcon()` → `tree()` → `appendSvg()`.\n\n### **✏️ Redigeringsikoner**\n\n`createEditorActionIcon()` → `createEditIcon()` → `appendSvg()`.\n\n### **⛺ Förbättringsikoner**\n\n`createIcon()` → `createCampIcon()` → `appendSvg()` och `stroke()`.\n\n### **↶ Undo**\n\n`createIcon()` → `createUndoIcon()` → `drawUndo()` → `stroke()`.\n\n---",
        "### **♻️ Återanvändbara ritfunktioner**\n\nMånga ikoner byggs från samma små funktioner:\n\n* `createSvg()` skapar SVG-element.  \n* `appendSvg()` lägger till element.  \n* `stroke()` ritar linjer.  \n* `hex()` ritar hexagoner.  \n* `tree()` ritar träd.  \n* `continent()` bygger kontinentikoner.  \n* `drawUndo()` bygger pilgeometri.\n\nDet minskar behovet av att upprepa samma grafikkod.\n\n### **🎨 Grafik utan applikationslogik**\n\nIkonfunktionerna returnerar SVG-element.\n\nDe ansvarar inte för att:\n\n* Starta redigeringssessioner.  \n* Ändra terräng i Convex.  \n* Hantera användarbehörigheter.  \n* Bestämma vilken värld som är aktiv.\n\nDetta är en tydlig uppdelning mellan grafik och beteende.\n\n### **🧩 Små funktioner med tydliga ansvar**\n\nVarje ikonfabrik har ett begränsat syfte: att skapa en bestämd grafisk symbol.\n\nDet gör funktionerna lättare att hitta, förstå och återanvända.\n\n---"
      ]
    },
    {
      "path": "src/library-svg-graphics/icons/editor-actions/icon-take-over.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🛠️ 3\\. Editor Actions — Redigeringsikoner**\n\n\nDessa ikoner representerar åtgärder i redigeringsgränssnittet.\n\nDe skapas som SVG-grafik och används genom `createEditorActionIcon()`."
        },
        {
          "kind": "function",
          "name": "createTakeOverIcon()",
          "identifier": "createTakeOverIcon()",
          "anchor": "createTakeOverIcon",
          "line": 4,
          "text": "Ritar en sköld med en bock.\n\n**Arbetsgång:**\n\n1. Skapar en ofylld sköldform.  \n2. Ritar en bock inuti skölden.  \n3. Använder `currentColor`.  \n4. Använder linjebredden `1.6`.\n\n**Sköldens SVG-path:**\n\n`M12 3l8 3v5.5c0 5-3.3 8-8 9.5-4.7-1.5-8-4.5-8-9.5V6l8-3Z`\n\n**Bocken:**\n\n`M8.5 12l2.4 2.4 4.8-5`\n\n🔗 **Anropas av:** `createEditorActionIcon()` med nyckeln `take-over`.\n\n⚙️ **Effekt:** Returnerar en sköldikon med bock.\n\n💡 **Arkitekturprincip — Separation of Concerns:** Grafikfunktionen ritar symbolen för övertagande. Själva behörighetskontrollen och övertagandet hanteras av andra delar av applikationen, bland annat Convex-mutationen `startEditing`.\n\n---"
        }
      ],
      "notes": [
        "### **🌍 Kontinentikoner**\n\n`createIcon()` → `createContinentBlueIcon()` → `continent()` → `hex()` och `appendSvg()`.\n\nSamma struktur används för alla sex kontinentfärger.\n\n### **🌳 Naturformationer**\n\n`createIcon()` → `createRainforestIcon()` → `tree()` → `appendSvg()`.\n\n### **✏️ Redigeringsikoner**\n\n`createEditorActionIcon()` → `createEditIcon()` → `appendSvg()`.\n\n### **⛺ Förbättringsikoner**\n\n`createIcon()` → `createCampIcon()` → `appendSvg()` och `stroke()`.\n\n### **↶ Undo**\n\n`createIcon()` → `createUndoIcon()` → `drawUndo()` → `stroke()`.\n\n---",
        "### **♻️ Återanvändbara ritfunktioner**\n\nMånga ikoner byggs från samma små funktioner:\n\n* `createSvg()` skapar SVG-element.  \n* `appendSvg()` lägger till element.  \n* `stroke()` ritar linjer.  \n* `hex()` ritar hexagoner.  \n* `tree()` ritar träd.  \n* `continent()` bygger kontinentikoner.  \n* `drawUndo()` bygger pilgeometri.\n\nDet minskar behovet av att upprepa samma grafikkod.\n\n### **🎨 Grafik utan applikationslogik**\n\nIkonfunktionerna returnerar SVG-element.\n\nDe ansvarar inte för att:\n\n* Starta redigeringssessioner.  \n* Ändra terräng i Convex.  \n* Hantera användarbehörigheter.  \n* Bestämma vilken värld som är aktiv.\n\nDetta är en tydlig uppdelning mellan grafik och beteende.\n\n### **🧩 Små funktioner med tydliga ansvar**\n\nVarje ikonfabrik har ett begränsat syfte: att skapa en bestämd grafisk symbol.\n\nDet gör funktionerna lättare att hitta, förstå och återanvända.\n\n---"
      ]
    },
    {
      "path": "src/library-svg-graphics/icons/features/icon-floodplains.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🌿 4\\. Features — Naturformationer och landskapselement**\n\n\nDen här kategorin innehåller ikoner för naturformationer som kan förekomma på kartan."
        },
        {
          "kind": "function",
          "name": "createFloodplainsIcon()",
          "identifier": "createFloodplainsIcon()",
          "anchor": "createFloodplainsIcon",
          "line": 5,
          "text": "Ritar tre horisontella våglinjer som symboliserar översvämningsslätter.\n\n**Arbetsgång:**\n\n1. Skapar SVG-roten.  \n2. Anropar `stroke()` tre gånger.  \n3. Placerar linjerna vid höjderna 8, 12 och 16\\.\n\n**Grafiska egenskaper:**\n\n* Färg: `#c4a36a`.  \n* Linjebredd: `1.3`.\n\n🔗 **Anropas av:** `createIcon()` med nyckeln `floodplains`.\n\n⚙️ **Effekt:** Returnerar en ikon med tre vågformer."
        }
      ],
      "notes": [
        "### **🌍 Kontinentikoner**\n\n`createIcon()` → `createContinentBlueIcon()` → `continent()` → `hex()` och `appendSvg()`.\n\nSamma struktur används för alla sex kontinentfärger.\n\n### **🌳 Naturformationer**\n\n`createIcon()` → `createRainforestIcon()` → `tree()` → `appendSvg()`.\n\n### **✏️ Redigeringsikoner**\n\n`createEditorActionIcon()` → `createEditIcon()` → `appendSvg()`.\n\n### **⛺ Förbättringsikoner**\n\n`createIcon()` → `createCampIcon()` → `appendSvg()` och `stroke()`.\n\n### **↶ Undo**\n\n`createIcon()` → `createUndoIcon()` → `drawUndo()` → `stroke()`.\n\n---",
        "### **♻️ Återanvändbara ritfunktioner**\n\nMånga ikoner byggs från samma små funktioner:\n\n* `createSvg()` skapar SVG-element.  \n* `appendSvg()` lägger till element.  \n* `stroke()` ritar linjer.  \n* `hex()` ritar hexagoner.  \n* `tree()` ritar träd.  \n* `continent()` bygger kontinentikoner.  \n* `drawUndo()` bygger pilgeometri.\n\nDet minskar behovet av att upprepa samma grafikkod.\n\n### **🎨 Grafik utan applikationslogik**\n\nIkonfunktionerna returnerar SVG-element.\n\nDe ansvarar inte för att:\n\n* Starta redigeringssessioner.  \n* Ändra terräng i Convex.  \n* Hantera användarbehörigheter.  \n* Bestämma vilken värld som är aktiv.\n\nDetta är en tydlig uppdelning mellan grafik och beteende.\n\n### **🧩 Små funktioner med tydliga ansvar**\n\nVarje ikonfabrik har ett begränsat syfte: att skapa en bestämd grafisk symbol.\n\nDet gör funktionerna lättare att hitta, förstå och återanvända.\n\n---"
      ]
    },
    {
      "path": "src/library-svg-graphics/icons/features/icon-ice.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🌿 4\\. Features — Naturformationer och landskapselement**\n\n\nDen här kategorin innehåller ikoner för naturformationer som kan förekomma på kartan."
        },
        {
          "kind": "function",
          "name": "createIceIcon()",
          "identifier": "createIceIcon()",
          "anchor": "createIceIcon",
          "line": 5,
          "text": "Ritar två diamantformer som symboliserar is.\n\n**Yttre diamant:**\n\n`M12 3.2 20 12 12 20.8 4 12Z`\n\n* Fyllning: `#d7f0f8`.  \n* Kontur: `#7eb4cc`.\n\n**Inre diamant:**\n\n`M12 7.2 16 12 12 16.8 8 12Z`\n\n* Konturfärg: `#7eb4cc`.  \n* Linjebredd: `1.1`.\n\n🔗 **Anropas av:** `createIcon()` med nyckeln `ice`.\n\n⚙️ **Effekt:** Returnerar en ikon med en stor och en mindre diamant."
        }
      ],
      "notes": [
        "### **🌍 Kontinentikoner**\n\n`createIcon()` → `createContinentBlueIcon()` → `continent()` → `hex()` och `appendSvg()`.\n\nSamma struktur används för alla sex kontinentfärger.\n\n### **🌳 Naturformationer**\n\n`createIcon()` → `createRainforestIcon()` → `tree()` → `appendSvg()`.\n\n### **✏️ Redigeringsikoner**\n\n`createEditorActionIcon()` → `createEditIcon()` → `appendSvg()`.\n\n### **⛺ Förbättringsikoner**\n\n`createIcon()` → `createCampIcon()` → `appendSvg()` och `stroke()`.\n\n### **↶ Undo**\n\n`createIcon()` → `createUndoIcon()` → `drawUndo()` → `stroke()`.\n\n---",
        "### **♻️ Återanvändbara ritfunktioner**\n\nMånga ikoner byggs från samma små funktioner:\n\n* `createSvg()` skapar SVG-element.  \n* `appendSvg()` lägger till element.  \n* `stroke()` ritar linjer.  \n* `hex()` ritar hexagoner.  \n* `tree()` ritar träd.  \n* `continent()` bygger kontinentikoner.  \n* `drawUndo()` bygger pilgeometri.\n\nDet minskar behovet av att upprepa samma grafikkod.\n\n### **🎨 Grafik utan applikationslogik**\n\nIkonfunktionerna returnerar SVG-element.\n\nDe ansvarar inte för att:\n\n* Starta redigeringssessioner.  \n* Ändra terräng i Convex.  \n* Hantera användarbehörigheter.  \n* Bestämma vilken värld som är aktiv.\n\nDetta är en tydlig uppdelning mellan grafik och beteende.\n\n### **🧩 Små funktioner med tydliga ansvar**\n\nVarje ikonfabrik har ett begränsat syfte: att skapa en bestämd grafisk symbol.\n\nDet gör funktionerna lättare att hitta, förstå och återanvända.\n\n---"
      ]
    },
    {
      "path": "src/library-svg-graphics/icons/features/icon-marsh.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🌿 4\\. Features — Naturformationer och landskapselement**\n\n\nDen här kategorin innehåller ikoner för naturformationer som kan förekomma på kartan."
        },
        {
          "kind": "function",
          "name": "createMarshIcon()",
          "identifier": "createMarshIcon()",
          "anchor": "createMarshIcon",
          "line": 5,
          "text": "Ritar ett våtmarkslandskap med vatten och vass.\n\n**Arbetsgång:**\n\n1. Ritar två vattenlinjer med `stroke()`.  \n2. Ritar tre vassrör.  \n3. Kombinerar de fem linjerna till en ikon.\n\n**Färger:**\n\n* Vatten: `#67b4cf`.  \n* Vass: `#6d9148`.\n\nSamtliga linjer använder bredden `1.3`.\n\n🔗 **Anropas av:** `createIcon()` med nyckeln `marsh`.\n\n⚙️ **Effekt:** Returnerar en våtmarksikon."
        }
      ],
      "notes": [
        "### **🌍 Kontinentikoner**\n\n`createIcon()` → `createContinentBlueIcon()` → `continent()` → `hex()` och `appendSvg()`.\n\nSamma struktur används för alla sex kontinentfärger.\n\n### **🌳 Naturformationer**\n\n`createIcon()` → `createRainforestIcon()` → `tree()` → `appendSvg()`.\n\n### **✏️ Redigeringsikoner**\n\n`createEditorActionIcon()` → `createEditIcon()` → `appendSvg()`.\n\n### **⛺ Förbättringsikoner**\n\n`createIcon()` → `createCampIcon()` → `appendSvg()` och `stroke()`.\n\n### **↶ Undo**\n\n`createIcon()` → `createUndoIcon()` → `drawUndo()` → `stroke()`.\n\n---",
        "### **♻️ Återanvändbara ritfunktioner**\n\nMånga ikoner byggs från samma små funktioner:\n\n* `createSvg()` skapar SVG-element.  \n* `appendSvg()` lägger till element.  \n* `stroke()` ritar linjer.  \n* `hex()` ritar hexagoner.  \n* `tree()` ritar träd.  \n* `continent()` bygger kontinentikoner.  \n* `drawUndo()` bygger pilgeometri.\n\nDet minskar behovet av att upprepa samma grafikkod.\n\n### **🎨 Grafik utan applikationslogik**\n\nIkonfunktionerna returnerar SVG-element.\n\nDe ansvarar inte för att:\n\n* Starta redigeringssessioner.  \n* Ändra terräng i Convex.  \n* Hantera användarbehörigheter.  \n* Bestämma vilken värld som är aktiv.\n\nDetta är en tydlig uppdelning mellan grafik och beteende.\n\n### **🧩 Små funktioner med tydliga ansvar**\n\nVarje ikonfabrik har ett begränsat syfte: att skapa en bestämd grafisk symbol.\n\nDet gör funktionerna lättare att hitta, förstå och återanvända.\n\n---"
      ]
    },
    {
      "path": "src/library-svg-graphics/icons/features/icon-oasis.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🌿 4\\. Features — Naturformationer och landskapselement**\n\n\nDen här kategorin innehåller ikoner för naturformationer som kan förekomma på kartan."
        },
        {
          "kind": "function",
          "name": "createOasisIcon()",
          "identifier": "createOasisIcon()",
          "anchor": "createOasisIcon",
          "line": 5,
          "text": "Ritar en oas med vatten och en palm.\n\n**Vattenytan:**\n\nEn SVG-`ellipse` med:\n\n* Centrum: `(12, 16.5)`.  \n* Horisontell radie: `6.5`.  \n* Vertikal radie: `2.6`.  \n* Fyllning: `#3d93b8`.\n\n**Palmen:**\n\n* Stam i `#8a5a34`, linjebredd `1.5`.  \n* Tre blad i `#2f8f49`, linjebredd `1.4`.\n\n🔗 **Anropas av:** `createIcon()` med nyckeln `oasis`.\n\n⚙️ **Effekt:** Returnerar en ikon med vattenyta och palm."
        }
      ],
      "notes": [
        "### **🌍 Kontinentikoner**\n\n`createIcon()` → `createContinentBlueIcon()` → `continent()` → `hex()` och `appendSvg()`.\n\nSamma struktur används för alla sex kontinentfärger.\n\n### **🌳 Naturformationer**\n\n`createIcon()` → `createRainforestIcon()` → `tree()` → `appendSvg()`.\n\n### **✏️ Redigeringsikoner**\n\n`createEditorActionIcon()` → `createEditIcon()` → `appendSvg()`.\n\n### **⛺ Förbättringsikoner**\n\n`createIcon()` → `createCampIcon()` → `appendSvg()` och `stroke()`.\n\n### **↶ Undo**\n\n`createIcon()` → `createUndoIcon()` → `drawUndo()` → `stroke()`.\n\n---",
        "### **♻️ Återanvändbara ritfunktioner**\n\nMånga ikoner byggs från samma små funktioner:\n\n* `createSvg()` skapar SVG-element.  \n* `appendSvg()` lägger till element.  \n* `stroke()` ritar linjer.  \n* `hex()` ritar hexagoner.  \n* `tree()` ritar träd.  \n* `continent()` bygger kontinentikoner.  \n* `drawUndo()` bygger pilgeometri.\n\nDet minskar behovet av att upprepa samma grafikkod.\n\n### **🎨 Grafik utan applikationslogik**\n\nIkonfunktionerna returnerar SVG-element.\n\nDe ansvarar inte för att:\n\n* Starta redigeringssessioner.  \n* Ändra terräng i Convex.  \n* Hantera användarbehörigheter.  \n* Bestämma vilken värld som är aktiv.\n\nDetta är en tydlig uppdelning mellan grafik och beteende.\n\n### **🧩 Små funktioner med tydliga ansvar**\n\nVarje ikonfabrik har ett begränsat syfte: att skapa en bestämd grafisk symbol.\n\nDet gör funktionerna lättare att hitta, förstå och återanvända.\n\n---"
      ]
    },
    {
      "path": "src/library-svg-graphics/icons/features/icon-rainforest.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🌿 4\\. Features — Naturformationer och landskapselement**\n\n\nDen här kategorin innehåller ikoner för naturformationer som kan förekomma på kartan."
        },
        {
          "kind": "function",
          "name": "createRainforestIcon()",
          "identifier": "createRainforestIcon()",
          "anchor": "createRainforestIcon",
          "line": 5,
          "text": "Ritar en tät regnskog med tre träd och en liten ljus punkt.\n\n**Träden skapas genom:**\n\n`tree(7.5, 8, 6.5, 9, '#1d6a3c')`\n\n`tree(12, 5, 8, 12, '#145232')`\n\n`tree(17, 9, 6, 8, '#1d6a3c')`\n\nDessutom läggs en cirkel till vid `(19, 6)` med radien `1` och färgen `#7ec8e8`.\n\n🔗 **Anropas av:** `createIcon()` med nyckeln `rainforest`.\n\n⚙️ **Effekt:** Returnerar en ikon med tre träd och en ljus detalj.\n\n💡 **Arkitekturprincip — Composition:** En komplex ikon skapas genom att kombinera flera anrop till en enklare ritfunktion."
        }
      ],
      "notes": [
        "### **🌍 Kontinentikoner**\n\n`createIcon()` → `createContinentBlueIcon()` → `continent()` → `hex()` och `appendSvg()`.\n\nSamma struktur används för alla sex kontinentfärger.\n\n### **🌳 Naturformationer**\n\n`createIcon()` → `createRainforestIcon()` → `tree()` → `appendSvg()`.\n\n### **✏️ Redigeringsikoner**\n\n`createEditorActionIcon()` → `createEditIcon()` → `appendSvg()`.\n\n### **⛺ Förbättringsikoner**\n\n`createIcon()` → `createCampIcon()` → `appendSvg()` och `stroke()`.\n\n### **↶ Undo**\n\n`createIcon()` → `createUndoIcon()` → `drawUndo()` → `stroke()`.\n\n---",
        "### **♻️ Återanvändbara ritfunktioner**\n\nMånga ikoner byggs från samma små funktioner:\n\n* `createSvg()` skapar SVG-element.  \n* `appendSvg()` lägger till element.  \n* `stroke()` ritar linjer.  \n* `hex()` ritar hexagoner.  \n* `tree()` ritar träd.  \n* `continent()` bygger kontinentikoner.  \n* `drawUndo()` bygger pilgeometri.\n\nDet minskar behovet av att upprepa samma grafikkod.\n\n### **🎨 Grafik utan applikationslogik**\n\nIkonfunktionerna returnerar SVG-element.\n\nDe ansvarar inte för att:\n\n* Starta redigeringssessioner.  \n* Ändra terräng i Convex.  \n* Hantera användarbehörigheter.  \n* Bestämma vilken värld som är aktiv.\n\nDetta är en tydlig uppdelning mellan grafik och beteende.\n\n### **🧩 Små funktioner med tydliga ansvar**\n\nVarje ikonfabrik har ett begränsat syfte: att skapa en bestämd grafisk symbol.\n\nDet gör funktionerna lättare att hitta, förstå och återanvända.\n\n---"
      ]
    },
    {
      "path": "src/library-svg-graphics/icons/features/icon-reef.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🌿 4\\. Features — Naturformationer och landskapselement**\n\n\nDen här kategorin innehåller ikoner för naturformationer som kan förekomma på kartan."
        },
        {
          "kind": "function",
          "name": "createReefIcon()",
          "identifier": "createReefIcon()",
          "anchor": "createReefIcon",
          "line": 5,
          "text": "Ritar ett korallrev.\n\n**Grafiska delar:**\n\n* En korallstam.  \n* Fyra grenar.  \n* Två dekorativa prickar.\n\nFem `stroke()`\\-anrop används för stam och grenar.\n\n**Färger:**\n\n* `#e07a68`  \n* `#f0b090`\n\n**Prickar:**\n\n* `(8, 7)`, radie `1.1`, färg `#f0b090`.  \n* `(18, 6)`, radie `1.1`, färg `#e07a68`.\n\n🔗 **Anropas av:** `createIcon()` med nyckeln `reef`.\n\n⚙️ **Effekt:** Returnerar en korallikon."
        }
      ],
      "notes": [
        "### **🌍 Kontinentikoner**\n\n`createIcon()` → `createContinentBlueIcon()` → `continent()` → `hex()` och `appendSvg()`.\n\nSamma struktur används för alla sex kontinentfärger.\n\n### **🌳 Naturformationer**\n\n`createIcon()` → `createRainforestIcon()` → `tree()` → `appendSvg()`.\n\n### **✏️ Redigeringsikoner**\n\n`createEditorActionIcon()` → `createEditIcon()` → `appendSvg()`.\n\n### **⛺ Förbättringsikoner**\n\n`createIcon()` → `createCampIcon()` → `appendSvg()` och `stroke()`.\n\n### **↶ Undo**\n\n`createIcon()` → `createUndoIcon()` → `drawUndo()` → `stroke()`.\n\n---",
        "### **♻️ Återanvändbara ritfunktioner**\n\nMånga ikoner byggs från samma små funktioner:\n\n* `createSvg()` skapar SVG-element.  \n* `appendSvg()` lägger till element.  \n* `stroke()` ritar linjer.  \n* `hex()` ritar hexagoner.  \n* `tree()` ritar träd.  \n* `continent()` bygger kontinentikoner.  \n* `drawUndo()` bygger pilgeometri.\n\nDet minskar behovet av att upprepa samma grafikkod.\n\n### **🎨 Grafik utan applikationslogik**\n\nIkonfunktionerna returnerar SVG-element.\n\nDe ansvarar inte för att:\n\n* Starta redigeringssessioner.  \n* Ändra terräng i Convex.  \n* Hantera användarbehörigheter.  \n* Bestämma vilken värld som är aktiv.\n\nDetta är en tydlig uppdelning mellan grafik och beteende.\n\n### **🧩 Små funktioner med tydliga ansvar**\n\nVarje ikonfabrik har ett begränsat syfte: att skapa en bestämd grafisk symbol.\n\nDet gör funktionerna lättare att hitta, förstå och återanvända.\n\n---"
      ]
    },
    {
      "path": "src/library-svg-graphics/icons/features/icon-volcano.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🌿 4\\. Features — Naturformationer och landskapselement**\n\n\nDen här kategorin innehåller ikoner för naturformationer som kan förekomma på kartan."
        },
        {
          "kind": "function",
          "name": "createVolcanoIcon()",
          "identifier": "createVolcanoIcon()",
          "anchor": "createVolcanoIcon",
          "line": 4,
          "text": "Ritar en vulkan med lava och rök.\n\n**Bergets form:**\n\n`M3.5 19.5 12 6l8.5 13.5Z`\n\nFyllning: `#6d5344`.\n\n**Lavarännan:**\n\n`M9.8 19.5 12 13l2.2 6.5Z`\n\nFyllning: `#d4543c`.\n\n**Rök:**\n\nTvå cirklar med färgerna `#c9d3dc` och `#d5dee6`.\n\nOpacitet: `0.85` respektive `0.9`.\n\n🔗 **Anropas av:** `createIcon()` med nyckeln `volcano`.\n\n⚙️ **Effekt:** Returnerar en vulkanikon med berg, lava och rök."
        }
      ],
      "notes": [
        "### **🌍 Kontinentikoner**\n\n`createIcon()` → `createContinentBlueIcon()` → `continent()` → `hex()` och `appendSvg()`.\n\nSamma struktur används för alla sex kontinentfärger.\n\n### **🌳 Naturformationer**\n\n`createIcon()` → `createRainforestIcon()` → `tree()` → `appendSvg()`.\n\n### **✏️ Redigeringsikoner**\n\n`createEditorActionIcon()` → `createEditIcon()` → `appendSvg()`.\n\n### **⛺ Förbättringsikoner**\n\n`createIcon()` → `createCampIcon()` → `appendSvg()` och `stroke()`.\n\n### **↶ Undo**\n\n`createIcon()` → `createUndoIcon()` → `drawUndo()` → `stroke()`.\n\n---",
        "### **♻️ Återanvändbara ritfunktioner**\n\nMånga ikoner byggs från samma små funktioner:\n\n* `createSvg()` skapar SVG-element.  \n* `appendSvg()` lägger till element.  \n* `stroke()` ritar linjer.  \n* `hex()` ritar hexagoner.  \n* `tree()` ritar träd.  \n* `continent()` bygger kontinentikoner.  \n* `drawUndo()` bygger pilgeometri.\n\nDet minskar behovet av att upprepa samma grafikkod.\n\n### **🎨 Grafik utan applikationslogik**\n\nIkonfunktionerna returnerar SVG-element.\n\nDe ansvarar inte för att:\n\n* Starta redigeringssessioner.  \n* Ändra terräng i Convex.  \n* Hantera användarbehörigheter.  \n* Bestämma vilken värld som är aktiv.\n\nDetta är en tydlig uppdelning mellan grafik och beteende.\n\n### **🧩 Små funktioner med tydliga ansvar**\n\nVarje ikonfabrik har ett begränsat syfte: att skapa en bestämd grafisk symbol.\n\nDet gör funktionerna lättare att hitta, förstå och återanvända.\n\n---"
      ]
    },
    {
      "path": "src/library-svg-graphics/icons/features/icon-woods.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🌿 4\\. Features — Naturformationer och landskapselement**\n\n\nDen här kategorin innehåller ikoner för naturformationer som kan förekomma på kartan."
        },
        {
          "kind": "function",
          "name": "createWoodsIcon()",
          "identifier": "createWoodsIcon()",
          "anchor": "createWoodsIcon",
          "line": 5,
          "text": "Ritar en mindre skog med två träd.\n\n**Träden skapas genom:**\n\n`tree(9, 6, 8, 11, '#2f8f49')`\n\n`tree(15.5, 8, 7, 9, '#226c38')`\n\n🔗 **Anropas av:** `createIcon()` med nyckeln `woods`.\n\n⚙️ **Effekt:** Returnerar en ikon med två träd.\n\n---"
        }
      ],
      "notes": [
        "### **🌍 Kontinentikoner**\n\n`createIcon()` → `createContinentBlueIcon()` → `continent()` → `hex()` och `appendSvg()`.\n\nSamma struktur används för alla sex kontinentfärger.\n\n### **🌳 Naturformationer**\n\n`createIcon()` → `createRainforestIcon()` → `tree()` → `appendSvg()`.\n\n### **✏️ Redigeringsikoner**\n\n`createEditorActionIcon()` → `createEditIcon()` → `appendSvg()`.\n\n### **⛺ Förbättringsikoner**\n\n`createIcon()` → `createCampIcon()` → `appendSvg()` och `stroke()`.\n\n### **↶ Undo**\n\n`createIcon()` → `createUndoIcon()` → `drawUndo()` → `stroke()`.\n\n---",
        "### **♻️ Återanvändbara ritfunktioner**\n\nMånga ikoner byggs från samma små funktioner:\n\n* `createSvg()` skapar SVG-element.  \n* `appendSvg()` lägger till element.  \n* `stroke()` ritar linjer.  \n* `hex()` ritar hexagoner.  \n* `tree()` ritar träd.  \n* `continent()` bygger kontinentikoner.  \n* `drawUndo()` bygger pilgeometri.\n\nDet minskar behovet av att upprepa samma grafikkod.\n\n### **🎨 Grafik utan applikationslogik**\n\nIkonfunktionerna returnerar SVG-element.\n\nDe ansvarar inte för att:\n\n* Starta redigeringssessioner.  \n* Ändra terräng i Convex.  \n* Hantera användarbehörigheter.  \n* Bestämma vilken värld som är aktiv.\n\nDetta är en tydlig uppdelning mellan grafik och beteende.\n\n### **🧩 Små funktioner med tydliga ansvar**\n\nVarje ikonfabrik har ett begränsat syfte: att skapa en bestämd grafisk symbol.\n\nDet gör funktionerna lättare att hitta, förstå och återanvända.\n\n---"
      ]
    },
    {
      "path": "src/library-svg-graphics/icons/improvements/icon-camp.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **⛺ 5\\. Improvements — Den första förbättringsikonen**"
        },
        {
          "kind": "function",
          "name": "createCampIcon()",
          "identifier": "createCampIcon()",
          "anchor": "createCampIcon",
          "line": 5,
          "text": "Ritar ett tält som symboliserar en förbättring på kartan.\n\n**Arbetsgång:**\n\n1. Skapar SVG-roten.  \n2. Ritar tältets ytterkontur.  \n3. Ritar en lodrät mittstolpe.  \n4. Ritar en inre vinkel som visar tältöppningen.\n\n**Ytterkontur:**\n\n`M3.5 19 12 5.5 20.5 19Z`\n\n* Ingen fyllning.  \n* Kontur: `currentColor`.  \n* Linjebredd: `1.6`.\n\n**Mittstolpe:**\n\n`M12 19 V11`\n\nLinjebredd: `1.4`.\n\n**Tältöppning:**\n\n`M9.2 19 12 13.5 14.8 19`\n\nLinjebredd: `1.2`.\n\n🔗 **Anropas av:** `createIcon()` med nyckeln `camp`.\n\n⚙️ **Effekt:** Returnerar en tältikon.\n\n---"
        }
      ],
      "notes": [
        "### **🌍 Kontinentikoner**\n\n`createIcon()` → `createContinentBlueIcon()` → `continent()` → `hex()` och `appendSvg()`.\n\nSamma struktur används för alla sex kontinentfärger.\n\n### **🌳 Naturformationer**\n\n`createIcon()` → `createRainforestIcon()` → `tree()` → `appendSvg()`.\n\n### **✏️ Redigeringsikoner**\n\n`createEditorActionIcon()` → `createEditIcon()` → `appendSvg()`.\n\n### **⛺ Förbättringsikoner**\n\n`createIcon()` → `createCampIcon()` → `appendSvg()` och `stroke()`.\n\n### **↶ Undo**\n\n`createIcon()` → `createUndoIcon()` → `drawUndo()` → `stroke()`.\n\n---",
        "### **♻️ Återanvändbara ritfunktioner**\n\nMånga ikoner byggs från samma små funktioner:\n\n* `createSvg()` skapar SVG-element.  \n* `appendSvg()` lägger till element.  \n* `stroke()` ritar linjer.  \n* `hex()` ritar hexagoner.  \n* `tree()` ritar träd.  \n* `continent()` bygger kontinentikoner.  \n* `drawUndo()` bygger pilgeometri.\n\nDet minskar behovet av att upprepa samma grafikkod.\n\n### **🎨 Grafik utan applikationslogik**\n\nIkonfunktionerna returnerar SVG-element.\n\nDe ansvarar inte för att:\n\n* Starta redigeringssessioner.  \n* Ändra terräng i Convex.  \n* Hantera användarbehörigheter.  \n* Bestämma vilken värld som är aktiv.\n\nDetta är en tydlig uppdelning mellan grafik och beteende.\n\n### **🧩 Små funktioner med tydliga ansvar**\n\nVarje ikonfabrik har ett begränsat syfte: att skapa en bestämd grafisk symbol.\n\nDet gör funktionerna lättare att hitta, förstå och återanvända.\n\n---"
      ]
    },
    {
      "path": "src/library-svg-graphics/icons/improvements/icon-farm.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🏗️ 1\\. Improvements — Markförbättringar**\n\n\nDessa funktioner skapar ikoner för olika förbättringar som kan placeras på kartan.\n\nAlla använder SVG med `viewBox=\"0 0 24 24\"`, `aria-hidden=\"true\"` och `fill=\"none\"`."
        },
        {
          "kind": "function",
          "name": "createFarmIcon()",
          "identifier": "createFarmIcon()",
          "anchor": "createFarmIcon",
          "line": 4,
          "text": "Ritar en åker med tre sädesstrån.\n\n**Arbetsgång:**\n\n1. Skapar SVG-roten.  \n2. Ritar en horisontell marklinje.  \n3. Ritar tre upprätta strån.  \n4. Ritar tre par sädesax.\n\n**Marklinje:**\n\n`M4 18h16`\n\n* Färg: `#8a6234`.  \n* Linjebredd: `1.4`.\n\n**Sädesstrån:**\n\n`M7 18V8M12 18V6M17 18V9`\n\n* Färg: `#d7b15a`.  \n* Linjebredd: `1.3`.\n\nAxparen använder samma färg och linjebredden `1.1`.\n\n🔗 **Anropas av:** `createIcon()` med nyckeln `farm`.\n\n⚙️ **Effekt:** Returnerar en SVG-ikon som föreställer en åker."
        }
      ],
      "notes": [
        "### **🌾 Markförbättringar**\n\n`createIcon()` → `createFarmIcon()` → `stroke()` → `appendSvg()`.\n\n### **🌳 Plantager**\n\n`createIcon()` → `createPlantationIcon()` → `tree()` → `appendSvg()`.\n\n### **💎 Naturresurser**\n\n`createIcon()` → `createGoldIcon()` → `appendSvg()` och `stroke()`.\n\n### **🌊 Floder**\n\n`createIcon()` → `createRiverIcon()` → `stroke()`.\n\n### **🏖️ Kust**\n\n`createIcon()` → `createCoastIcon()` → `nextClipId()` → `clipPath` → `hex()` och `stroke()`.\n\n---",
        "### **🧩 En funktion per ikon**\n\nVarje fil i den här delen innehåller en enda ikonfabrik.\n\nDet gör det enkelt att hitta koden som ansvarar för en viss symbol.\n\n### **♻️ Återanvändning av grafik**\n\nFunktioner som `tree()`, `stroke()` och `hex()` används av många olika ikoner.\n\nDet skapar en gemensam grafisk grund och minskar upprepning.\n\n### **🎨 Grafik som fristående ansvar**\n\nIkonfunktionerna skapar SVG-element men ändrar inte världens data.\n\nEn gruvikon är exempelvis bara en grafisk representation av en gruva. Funktionen `createMineIcon()` skapar inte någon gruva i Convex.\n\n### **📐 Geometri genom SVG**\n\nIkonerna byggs med grundläggande SVG-element:\n\n* `path` för oregelbundna former.  \n* `rect` för rektanglar.  \n* `circle` för cirklar.  \n* `ellipse` för ovala former.  \n* `clipPath` för att begränsa synliga områden.\n\n---"
      ]
    },
    {
      "path": "src/library-svg-graphics/icons/improvements/icon-fishing.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🏗️ 1\\. Improvements — Markförbättringar**\n\n\nDessa funktioner skapar ikoner för olika förbättringar som kan placeras på kartan.\n\nAlla använder SVG med `viewBox=\"0 0 24 24\"`, `aria-hidden=\"true\"` och `fill=\"none\"`."
        },
        {
          "kind": "function",
          "name": "createFishingIcon()",
          "identifier": "createFishingIcon()",
          "anchor": "createFishingIcon",
          "line": 5,
          "text": "Ritar en fiskebåt med mast och tvärslå.\n\n**Båtens skrov:**\n\n`M4 15h14l-2 4H6Z`\n\nFyllning: `currentColor`.\n\n**Mast:**\n\n`M11 15 V7`\n\n* Färg: `currentColor`.  \n* Linjebredd: `1.4`.\n\n**Tvärslå:**\n\n`M11 8h5`\n\n* Färg: `#e2c27a`.  \n* Linjebredd: `1.3`.\n\n🔗 **Anropas av:** `createIcon()` med nyckeln `fishing`.\n\n⚙️ **Effekt:** Returnerar en båtikon."
        }
      ],
      "notes": [
        "### **🌾 Markförbättringar**\n\n`createIcon()` → `createFarmIcon()` → `stroke()` → `appendSvg()`.\n\n### **🌳 Plantager**\n\n`createIcon()` → `createPlantationIcon()` → `tree()` → `appendSvg()`.\n\n### **💎 Naturresurser**\n\n`createIcon()` → `createGoldIcon()` → `appendSvg()` och `stroke()`.\n\n### **🌊 Floder**\n\n`createIcon()` → `createRiverIcon()` → `stroke()`.\n\n### **🏖️ Kust**\n\n`createIcon()` → `createCoastIcon()` → `nextClipId()` → `clipPath` → `hex()` och `stroke()`.\n\n---",
        "### **🧩 En funktion per ikon**\n\nVarje fil i den här delen innehåller en enda ikonfabrik.\n\nDet gör det enkelt att hitta koden som ansvarar för en viss symbol.\n\n### **♻️ Återanvändning av grafik**\n\nFunktioner som `tree()`, `stroke()` och `hex()` används av många olika ikoner.\n\nDet skapar en gemensam grafisk grund och minskar upprepning.\n\n### **🎨 Grafik som fristående ansvar**\n\nIkonfunktionerna skapar SVG-element men ändrar inte världens data.\n\nEn gruvikon är exempelvis bara en grafisk representation av en gruva. Funktionen `createMineIcon()` skapar inte någon gruva i Convex.\n\n### **📐 Geometri genom SVG**\n\nIkonerna byggs med grundläggande SVG-element:\n\n* `path` för oregelbundna former.  \n* `rect` för rektanglar.  \n* `circle` för cirklar.  \n* `ellipse` för ovala former.  \n* `clipPath` för att begränsa synliga områden.\n\n---"
      ]
    },
    {
      "path": "src/library-svg-graphics/icons/improvements/icon-fort.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🏗️ 1\\. Improvements — Markförbättringar**\n\n\nDessa funktioner skapar ikoner för olika förbättringar som kan placeras på kartan.\n\nAlla använder SVG med `viewBox=\"0 0 24 24\"`, `aria-hidden=\"true\"` och `fill=\"none\"`."
        },
        {
          "kind": "function",
          "name": "createFortIcon()",
          "identifier": "createFortIcon()",
          "anchor": "createFortIcon",
          "line": 5,
          "text": "Ritar en fästningsmur med tinnar och en horisontell fog.\n\n**Murens form:**\n\n`M4 19V10h3V7h3v3h4V7h3v3h3v9Z`\n\nFyllning: `currentColor`.\n\n**Horisontell fog:**\n\n`M4 14.5h16`\n\n* Färg: `#102033`.  \n* Linjebredd: `1.2`.\n\n🔗 **Anropas av:** `createIcon()` med nyckeln `fort`.\n\n⚙️ **Effekt:** Returnerar en fästningsikon."
        }
      ],
      "notes": [
        "### **🌾 Markförbättringar**\n\n`createIcon()` → `createFarmIcon()` → `stroke()` → `appendSvg()`.\n\n### **🌳 Plantager**\n\n`createIcon()` → `createPlantationIcon()` → `tree()` → `appendSvg()`.\n\n### **💎 Naturresurser**\n\n`createIcon()` → `createGoldIcon()` → `appendSvg()` och `stroke()`.\n\n### **🌊 Floder**\n\n`createIcon()` → `createRiverIcon()` → `stroke()`.\n\n### **🏖️ Kust**\n\n`createIcon()` → `createCoastIcon()` → `nextClipId()` → `clipPath` → `hex()` och `stroke()`.\n\n---",
        "### **🧩 En funktion per ikon**\n\nVarje fil i den här delen innehåller en enda ikonfabrik.\n\nDet gör det enkelt att hitta koden som ansvarar för en viss symbol.\n\n### **♻️ Återanvändning av grafik**\n\nFunktioner som `tree()`, `stroke()` och `hex()` används av många olika ikoner.\n\nDet skapar en gemensam grafisk grund och minskar upprepning.\n\n### **🎨 Grafik som fristående ansvar**\n\nIkonfunktionerna skapar SVG-element men ändrar inte världens data.\n\nEn gruvikon är exempelvis bara en grafisk representation av en gruva. Funktionen `createMineIcon()` skapar inte någon gruva i Convex.\n\n### **📐 Geometri genom SVG**\n\nIkonerna byggs med grundläggande SVG-element:\n\n* `path` för oregelbundna former.  \n* `rect` för rektanglar.  \n* `circle` för cirklar.  \n* `ellipse` för ovala former.  \n* `clipPath` för att begränsa synliga områden.\n\n---"
      ]
    },
    {
      "path": "src/library-svg-graphics/icons/improvements/icon-mine.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🏗️ 1\\. Improvements — Markförbättringar**\n\n\nDessa funktioner skapar ikoner för olika förbättringar som kan placeras på kartan.\n\nAlla använder SVG med `viewBox=\"0 0 24 24\"`, `aria-hidden=\"true\"` och `fill=\"none\"`."
        },
        {
          "kind": "function",
          "name": "createMineIcon()",
          "identifier": "createMineIcon()",
          "anchor": "createMineIcon",
          "line": 5,
          "text": "Ritar en hacka med ett guldfärgat skimmer.\n\n**Skaft:**\n\n`M5 19 16 8`\n\n* Färg: `currentColor`.  \n* Linjebredd: `1.8`.\n\n**Hackans huvud:**\n\n`M14 6.2 19.2 8.4 16.2 11.2Z`\n\n* Färg: `currentColor`.  \n* Linjebredd: `1.4`.\n\n**Gulddetalj:**\n\n`M13.2 9.2 17.6 6`\n\n* Färg: `#e2c27a`.  \n* Linjebredd: `1.6`.\n\n🔗 **Anropas av:** `createIcon()` med nyckeln `mine`.\n\n⚙️ **Effekt:** Returnerar en gruvikon."
        }
      ],
      "notes": [
        "### **🌾 Markförbättringar**\n\n`createIcon()` → `createFarmIcon()` → `stroke()` → `appendSvg()`.\n\n### **🌳 Plantager**\n\n`createIcon()` → `createPlantationIcon()` → `tree()` → `appendSvg()`.\n\n### **💎 Naturresurser**\n\n`createIcon()` → `createGoldIcon()` → `appendSvg()` och `stroke()`.\n\n### **🌊 Floder**\n\n`createIcon()` → `createRiverIcon()` → `stroke()`.\n\n### **🏖️ Kust**\n\n`createIcon()` → `createCoastIcon()` → `nextClipId()` → `clipPath` → `hex()` och `stroke()`.\n\n---",
        "### **🧩 En funktion per ikon**\n\nVarje fil i den här delen innehåller en enda ikonfabrik.\n\nDet gör det enkelt att hitta koden som ansvarar för en viss symbol.\n\n### **♻️ Återanvändning av grafik**\n\nFunktioner som `tree()`, `stroke()` och `hex()` används av många olika ikoner.\n\nDet skapar en gemensam grafisk grund och minskar upprepning.\n\n### **🎨 Grafik som fristående ansvar**\n\nIkonfunktionerna skapar SVG-element men ändrar inte världens data.\n\nEn gruvikon är exempelvis bara en grafisk representation av en gruva. Funktionen `createMineIcon()` skapar inte någon gruva i Convex.\n\n### **📐 Geometri genom SVG**\n\nIkonerna byggs med grundläggande SVG-element:\n\n* `path` för oregelbundna former.  \n* `rect` för rektanglar.  \n* `circle` för cirklar.  \n* `ellipse` för ovala former.  \n* `clipPath` för att begränsa synliga områden.\n\n---"
      ]
    },
    {
      "path": "src/library-svg-graphics/icons/improvements/icon-pasture.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🏗️ 1\\. Improvements — Markförbättringar**\n\n\nDessa funktioner skapar ikoner för olika förbättringar som kan placeras på kartan.\n\nAlla använder SVG med `viewBox=\"0 0 24 24\"`, `aria-hidden=\"true\"` och `fill=\"none\"`."
        },
        {
          "kind": "function",
          "name": "createPastureIcon()",
          "identifier": "createPastureIcon()",
          "anchor": "createPastureIcon",
          "line": 5,
          "text": "Ritar ett staket som symboliserar betesmark.\n\n**Två horisontella liggare:**\n\n`M4 10h16M4 15h16`\n\n**Tre vertikala stolpar:**\n\n`M7 7.5v12M12 7.5v12M17 7.5v12`\n\nAlla linjer använder `currentColor` och bredden `1.5`.\n\n🔗 **Anropas av:** `createIcon()` med nyckeln `pasture`.\n\n⚙️ **Effekt:** Returnerar en staketikon."
        }
      ],
      "notes": [
        "### **🌾 Markförbättringar**\n\n`createIcon()` → `createFarmIcon()` → `stroke()` → `appendSvg()`.\n\n### **🌳 Plantager**\n\n`createIcon()` → `createPlantationIcon()` → `tree()` → `appendSvg()`.\n\n### **💎 Naturresurser**\n\n`createIcon()` → `createGoldIcon()` → `appendSvg()` och `stroke()`.\n\n### **🌊 Floder**\n\n`createIcon()` → `createRiverIcon()` → `stroke()`.\n\n### **🏖️ Kust**\n\n`createIcon()` → `createCoastIcon()` → `nextClipId()` → `clipPath` → `hex()` och `stroke()`.\n\n---",
        "### **🧩 En funktion per ikon**\n\nVarje fil i den här delen innehåller en enda ikonfabrik.\n\nDet gör det enkelt att hitta koden som ansvarar för en viss symbol.\n\n### **♻️ Återanvändning av grafik**\n\nFunktioner som `tree()`, `stroke()` och `hex()` används av många olika ikoner.\n\nDet skapar en gemensam grafisk grund och minskar upprepning.\n\n### **🎨 Grafik som fristående ansvar**\n\nIkonfunktionerna skapar SVG-element men ändrar inte världens data.\n\nEn gruvikon är exempelvis bara en grafisk representation av en gruva. Funktionen `createMineIcon()` skapar inte någon gruva i Convex.\n\n### **📐 Geometri genom SVG**\n\nIkonerna byggs med grundläggande SVG-element:\n\n* `path` för oregelbundna former.  \n* `rect` för rektanglar.  \n* `circle` för cirklar.  \n* `ellipse` för ovala former.  \n* `clipPath` för att begränsa synliga områden.\n\n---"
      ]
    },
    {
      "path": "src/library-svg-graphics/icons/improvements/icon-plantation.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🏗️ 1\\. Improvements — Markförbättringar**\n\n\nDessa funktioner skapar ikoner för olika förbättringar som kan placeras på kartan.\n\nAlla använder SVG med `viewBox=\"0 0 24 24\"`, `aria-hidden=\"true\"` och `fill=\"none\"`."
        },
        {
          "kind": "function",
          "name": "createPlantationIcon()",
          "identifier": "createPlantationIcon()",
          "anchor": "createPlantationIcon",
          "line": 5,
          "text": "Ritar tre träd i rad som symboliserar en plantage.\n\n**Träden skapas med:**\n\n`tree(7, 8, 5, 8, '#2f8f49')`\n\n`tree(12, 6, 5.5, 10, '#226c38')`\n\n`tree(17, 8.5, 5, 7.5, '#2f8f49')`\n\nDet mittersta trädet är högre än de två andra.\n\n🔗 **Anropas av:** `createIcon()` med nyckeln `plantation`.\n\n⚙️ **Effekt:** Returnerar en ikon med tre träd.\n\n💡 **Arkitekturprincip — Reuse:** Funktionen bygger en ny ikon genom att återanvända den gemensamma ritfunktionen `tree()`."
        }
      ],
      "notes": [
        "### **🌾 Markförbättringar**\n\n`createIcon()` → `createFarmIcon()` → `stroke()` → `appendSvg()`.\n\n### **🌳 Plantager**\n\n`createIcon()` → `createPlantationIcon()` → `tree()` → `appendSvg()`.\n\n### **💎 Naturresurser**\n\n`createIcon()` → `createGoldIcon()` → `appendSvg()` och `stroke()`.\n\n### **🌊 Floder**\n\n`createIcon()` → `createRiverIcon()` → `stroke()`.\n\n### **🏖️ Kust**\n\n`createIcon()` → `createCoastIcon()` → `nextClipId()` → `clipPath` → `hex()` och `stroke()`.\n\n---",
        "### **🧩 En funktion per ikon**\n\nVarje fil i den här delen innehåller en enda ikonfabrik.\n\nDet gör det enkelt att hitta koden som ansvarar för en viss symbol.\n\n### **♻️ Återanvändning av grafik**\n\nFunktioner som `tree()`, `stroke()` och `hex()` används av många olika ikoner.\n\nDet skapar en gemensam grafisk grund och minskar upprepning.\n\n### **🎨 Grafik som fristående ansvar**\n\nIkonfunktionerna skapar SVG-element men ändrar inte världens data.\n\nEn gruvikon är exempelvis bara en grafisk representation av en gruva. Funktionen `createMineIcon()` skapar inte någon gruva i Convex.\n\n### **📐 Geometri genom SVG**\n\nIkonerna byggs med grundläggande SVG-element:\n\n* `path` för oregelbundna former.  \n* `rect` för rektanglar.  \n* `circle` för cirklar.  \n* `ellipse` för ovala former.  \n* `clipPath` för att begränsa synliga områden.\n\n---"
      ]
    },
    {
      "path": "src/library-svg-graphics/icons/improvements/icon-quarry.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🏗️ 1\\. Improvements — Markförbättringar**\n\n\nDessa funktioner skapar ikoner för olika förbättringar som kan placeras på kartan.\n\nAlla använder SVG med `viewBox=\"0 0 24 24\"`, `aria-hidden=\"true\"` och `fill=\"none\"`."
        },
        {
          "kind": "function",
          "name": "createQuarryIcon()",
          "identifier": "createQuarryIcon()",
          "anchor": "createQuarryIcon",
          "line": 4,
          "text": "Ritar tre rektangulära stenblock.\n\n**Blockens placering och färger:**\n\n| Block | Position | Storlek | Färg |\n| ----- | ----- | ----- | ----- |\n| Vänster | `(4, 12)` | 7 × 6 | `#9aa3ad` |\n| Höger | `(12, 12)` | 7 × 6 | `#b7c0c8` |\n| Övre | `(8, 6)` | 7 × 6 | `#d0d6dc` |\n\n🔗 **Anropas av:** `createIcon()` med nyckeln `quarry`.\n\n⚙️ **Effekt:** Returnerar en stenbrottsikon.\n\n---"
        }
      ],
      "notes": [
        "### **🌾 Markförbättringar**\n\n`createIcon()` → `createFarmIcon()` → `stroke()` → `appendSvg()`.\n\n### **🌳 Plantager**\n\n`createIcon()` → `createPlantationIcon()` → `tree()` → `appendSvg()`.\n\n### **💎 Naturresurser**\n\n`createIcon()` → `createGoldIcon()` → `appendSvg()` och `stroke()`.\n\n### **🌊 Floder**\n\n`createIcon()` → `createRiverIcon()` → `stroke()`.\n\n### **🏖️ Kust**\n\n`createIcon()` → `createCoastIcon()` → `nextClipId()` → `clipPath` → `hex()` och `stroke()`.\n\n---",
        "### **🧩 En funktion per ikon**\n\nVarje fil i den här delen innehåller en enda ikonfabrik.\n\nDet gör det enkelt att hitta koden som ansvarar för en viss symbol.\n\n### **♻️ Återanvändning av grafik**\n\nFunktioner som `tree()`, `stroke()` och `hex()` används av många olika ikoner.\n\nDet skapar en gemensam grafisk grund och minskar upprepning.\n\n### **🎨 Grafik som fristående ansvar**\n\nIkonfunktionerna skapar SVG-element men ändrar inte världens data.\n\nEn gruvikon är exempelvis bara en grafisk representation av en gruva. Funktionen `createMineIcon()` skapar inte någon gruva i Convex.\n\n### **📐 Geometri genom SVG**\n\nIkonerna byggs med grundläggande SVG-element:\n\n* `path` för oregelbundna former.  \n* `rect` för rektanglar.  \n* `circle` för cirklar.  \n* `ellipse` för ovala former.  \n* `clipPath` för att begränsa synliga områden.\n\n---"
      ]
    },
    {
      "path": "src/library-svg-graphics/icons/resources/icon-cattle.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **💎 2\\. Resources — Naturresurser**\n\n\nDessa funktioner skapar grafiska symboler för resurser som kan förekomma på kartan."
        },
        {
          "kind": "function",
          "name": "createCattleIcon()",
          "identifier": "createCattleIcon()",
          "anchor": "createCattleIcon",
          "line": 5,
          "text": "Ritar ett nötkreatur med kropp, huvud, horn, öga och fyra ben.\n\n**Grafiska delar:**\n\n* Kropp: ellips med centrum `(12, 14)`.  \n* Huvud: cirkel med centrum `(7.2, 12.2)`.  \n* Kroppsfärg: `#8b5a38`.  \n* Horn: linjer i samma färg.  \n* Fyra ben: vertikala linjer.  \n* Öga: cirkel med radie `0.45`.\n\n**Ögats färg:** `#1b120c`.\n\n🔗 **Anropas av:** `createIcon()` med nyckeln `cattle`.\n\n⚙️ **Effekt:** Returnerar en nötkreatursikon."
        }
      ],
      "notes": [
        "### **🌾 Markförbättringar**\n\n`createIcon()` → `createFarmIcon()` → `stroke()` → `appendSvg()`.\n\n### **🌳 Plantager**\n\n`createIcon()` → `createPlantationIcon()` → `tree()` → `appendSvg()`.\n\n### **💎 Naturresurser**\n\n`createIcon()` → `createGoldIcon()` → `appendSvg()` och `stroke()`.\n\n### **🌊 Floder**\n\n`createIcon()` → `createRiverIcon()` → `stroke()`.\n\n### **🏖️ Kust**\n\n`createIcon()` → `createCoastIcon()` → `nextClipId()` → `clipPath` → `hex()` och `stroke()`.\n\n---",
        "### **🧩 En funktion per ikon**\n\nVarje fil i den här delen innehåller en enda ikonfabrik.\n\nDet gör det enkelt att hitta koden som ansvarar för en viss symbol.\n\n### **♻️ Återanvändning av grafik**\n\nFunktioner som `tree()`, `stroke()` och `hex()` används av många olika ikoner.\n\nDet skapar en gemensam grafisk grund och minskar upprepning.\n\n### **🎨 Grafik som fristående ansvar**\n\nIkonfunktionerna skapar SVG-element men ändrar inte världens data.\n\nEn gruvikon är exempelvis bara en grafisk representation av en gruva. Funktionen `createMineIcon()` skapar inte någon gruva i Convex.\n\n### **📐 Geometri genom SVG**\n\nIkonerna byggs med grundläggande SVG-element:\n\n* `path` för oregelbundna former.  \n* `rect` för rektanglar.  \n* `circle` för cirklar.  \n* `ellipse` för ovala former.  \n* `clipPath` för att begränsa synliga områden.\n\n---"
      ]
    },
    {
      "path": "src/library-svg-graphics/icons/resources/icon-deer.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **💎 2\\. Resources — Naturresurser**\n\n\nDessa funktioner skapar grafiska symboler för resurser som kan förekomma på kartan."
        },
        {
          "kind": "function",
          "name": "createDeerIcon()",
          "identifier": "createDeerIcon()",
          "anchor": "createDeerIcon",
          "line": 5,
          "text": "Ritar en hjort med kropp, huvud, horn och tre ben.\n\n**Grafiska delar:**\n\n* Kropp: ellips vid `(12, 15)`.  \n* Huvud: cirkel vid `(16.5, 12.5)`.  \n* Fyllning: `#a67c52`.  \n* Horn och ben: linjer med bredd `1.2`.\n\n**Benens SVG-path:**\n\n`M8 17.6v2.8M11 17.8v2.8M14 17.6v2.8`\n\n🔗 **Anropas av:** `createIcon()` med nyckeln `deer`.\n\n⚙️ **Effekt:** Returnerar en hjortikon."
        }
      ],
      "notes": [
        "### **🌾 Markförbättringar**\n\n`createIcon()` → `createFarmIcon()` → `stroke()` → `appendSvg()`.\n\n### **🌳 Plantager**\n\n`createIcon()` → `createPlantationIcon()` → `tree()` → `appendSvg()`.\n\n### **💎 Naturresurser**\n\n`createIcon()` → `createGoldIcon()` → `appendSvg()` och `stroke()`.\n\n### **🌊 Floder**\n\n`createIcon()` → `createRiverIcon()` → `stroke()`.\n\n### **🏖️ Kust**\n\n`createIcon()` → `createCoastIcon()` → `nextClipId()` → `clipPath` → `hex()` och `stroke()`.\n\n---",
        "### **🧩 En funktion per ikon**\n\nVarje fil i den här delen innehåller en enda ikonfabrik.\n\nDet gör det enkelt att hitta koden som ansvarar för en viss symbol.\n\n### **♻️ Återanvändning av grafik**\n\nFunktioner som `tree()`, `stroke()` och `hex()` används av många olika ikoner.\n\nDet skapar en gemensam grafisk grund och minskar upprepning.\n\n### **🎨 Grafik som fristående ansvar**\n\nIkonfunktionerna skapar SVG-element men ändrar inte världens data.\n\nEn gruvikon är exempelvis bara en grafisk representation av en gruva. Funktionen `createMineIcon()` skapar inte någon gruva i Convex.\n\n### **📐 Geometri genom SVG**\n\nIkonerna byggs med grundläggande SVG-element:\n\n* `path` för oregelbundna former.  \n* `rect` för rektanglar.  \n* `circle` för cirklar.  \n* `ellipse` för ovala former.  \n* `clipPath` för att begränsa synliga områden.\n\n---"
      ]
    },
    {
      "path": "src/library-svg-graphics/icons/resources/icon-fish.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **💎 2\\. Resources — Naturresurser**\n\n\nDessa funktioner skapar grafiska symboler för resurser som kan förekomma på kartan."
        },
        {
          "kind": "function",
          "name": "createFishIcon()",
          "identifier": "createFishIcon()",
          "anchor": "createFishIcon",
          "line": 4,
          "text": "Ritar en fisk med ett öga.\n\n**Grafiska delar:**\n\n* Fiskkropp: en SVG-`path` som börjar `M3.5 12c3-3…`.  \n* Fyllning: `#5eb0d4`.  \n* Öga: cirkel vid `(8, 11.4)`.  \n* Ögats radie: `0.7`.  \n* Ögats färg: `#102028`.\n\n🔗 **Anropas av:** `createIcon()` med nyckeln `fish`.\n\n⚙️ **Effekt:** Returnerar en fiskikon."
        }
      ],
      "notes": [
        "### **🌾 Markförbättringar**\n\n`createIcon()` → `createFarmIcon()` → `stroke()` → `appendSvg()`.\n\n### **🌳 Plantager**\n\n`createIcon()` → `createPlantationIcon()` → `tree()` → `appendSvg()`.\n\n### **💎 Naturresurser**\n\n`createIcon()` → `createGoldIcon()` → `appendSvg()` och `stroke()`.\n\n### **🌊 Floder**\n\n`createIcon()` → `createRiverIcon()` → `stroke()`.\n\n### **🏖️ Kust**\n\n`createIcon()` → `createCoastIcon()` → `nextClipId()` → `clipPath` → `hex()` och `stroke()`.\n\n---",
        "### **🧩 En funktion per ikon**\n\nVarje fil i den här delen innehåller en enda ikonfabrik.\n\nDet gör det enkelt att hitta koden som ansvarar för en viss symbol.\n\n### **♻️ Återanvändning av grafik**\n\nFunktioner som `tree()`, `stroke()` och `hex()` används av många olika ikoner.\n\nDet skapar en gemensam grafisk grund och minskar upprepning.\n\n### **🎨 Grafik som fristående ansvar**\n\nIkonfunktionerna skapar SVG-element men ändrar inte världens data.\n\nEn gruvikon är exempelvis bara en grafisk representation av en gruva. Funktionen `createMineIcon()` skapar inte någon gruva i Convex.\n\n### **📐 Geometri genom SVG**\n\nIkonerna byggs med grundläggande SVG-element:\n\n* `path` för oregelbundna former.  \n* `rect` för rektanglar.  \n* `circle` för cirklar.  \n* `ellipse` för ovala former.  \n* `clipPath` för att begränsa synliga områden.\n\n---"
      ]
    },
    {
      "path": "src/library-svg-graphics/icons/resources/icon-gold.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **💎 2\\. Resources — Naturresurser**\n\n\nDessa funktioner skapar grafiska symboler för resurser som kan förekomma på kartan."
        },
        {
          "kind": "function",
          "name": "createGoldIcon()",
          "identifier": "createGoldIcon()",
          "anchor": "createGoldIcon",
          "line": 5,
          "text": "Ritar tre staplade guldmynt med en glanslinje.\n\n**Mynten:**\n\n| Höjd | Färg |\n| ----- | ----- |\n| `y = 15` | `#c4962e` |\n| `y = 12.2` | `#e6c35c` |\n| `y = 9.4` | `#f0d78a` |\n\nVarje mynt är en ellips med:\n\n* Horisontell radie: `6`.  \n* Vertikal radie: `2.3`.\n\nGlanslinjen ritas i `#a8842a` med bredden `0.8`.\n\n🔗 **Anropas av:** `createIcon()` med nyckeln `gold`.\n\n⚙️ **Effekt:** Returnerar en guldikon."
        }
      ],
      "notes": [
        "### **🌾 Markförbättringar**\n\n`createIcon()` → `createFarmIcon()` → `stroke()` → `appendSvg()`.\n\n### **🌳 Plantager**\n\n`createIcon()` → `createPlantationIcon()` → `tree()` → `appendSvg()`.\n\n### **💎 Naturresurser**\n\n`createIcon()` → `createGoldIcon()` → `appendSvg()` och `stroke()`.\n\n### **🌊 Floder**\n\n`createIcon()` → `createRiverIcon()` → `stroke()`.\n\n### **🏖️ Kust**\n\n`createIcon()` → `createCoastIcon()` → `nextClipId()` → `clipPath` → `hex()` och `stroke()`.\n\n---",
        "### **🧩 En funktion per ikon**\n\nVarje fil i den här delen innehåller en enda ikonfabrik.\n\nDet gör det enkelt att hitta koden som ansvarar för en viss symbol.\n\n### **♻️ Återanvändning av grafik**\n\nFunktioner som `tree()`, `stroke()` och `hex()` används av många olika ikoner.\n\nDet skapar en gemensam grafisk grund och minskar upprepning.\n\n### **🎨 Grafik som fristående ansvar**\n\nIkonfunktionerna skapar SVG-element men ändrar inte världens data.\n\nEn gruvikon är exempelvis bara en grafisk representation av en gruva. Funktionen `createMineIcon()` skapar inte någon gruva i Convex.\n\n### **📐 Geometri genom SVG**\n\nIkonerna byggs med grundläggande SVG-element:\n\n* `path` för oregelbundna former.  \n* `rect` för rektanglar.  \n* `circle` för cirklar.  \n* `ellipse` för ovala former.  \n* `clipPath` för att begränsa synliga områden.\n\n---"
      ]
    },
    {
      "path": "src/library-svg-graphics/icons/resources/icon-horses.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **💎 2\\. Resources — Naturresurser**\n\n\nDessa funktioner skapar grafiska symboler för resurser som kan förekomma på kartan."
        },
        {
          "kind": "function",
          "name": "createHorsesIcon()",
          "identifier": "createHorsesIcon()",
          "anchor": "createHorsesIcon",
          "line": 5,
          "text": "Ritar en häst med kropp, fyra ben och ett öga.\n\n**Grafiska delar:**\n\n* Kropp: SVG-`path`.  \n* Fyllning: `#6e4b32`.  \n* Fyra ben: linjer i samma färg.  \n* Benens linjebredd: `1.3`.  \n* Öga: cirkel vid `(15.6, 10.2)`.  \n* Ögats radie: `0.45`.  \n* Ögats färg: `#f3ead7`.\n\n🔗 **Anropas av:** `createIcon()` med nyckeln `horses`.\n\n⚙️ **Effekt:** Returnerar en hästikon."
        }
      ],
      "notes": [
        "### **🌾 Markförbättringar**\n\n`createIcon()` → `createFarmIcon()` → `stroke()` → `appendSvg()`.\n\n### **🌳 Plantager**\n\n`createIcon()` → `createPlantationIcon()` → `tree()` → `appendSvg()`.\n\n### **💎 Naturresurser**\n\n`createIcon()` → `createGoldIcon()` → `appendSvg()` och `stroke()`.\n\n### **🌊 Floder**\n\n`createIcon()` → `createRiverIcon()` → `stroke()`.\n\n### **🏖️ Kust**\n\n`createIcon()` → `createCoastIcon()` → `nextClipId()` → `clipPath` → `hex()` och `stroke()`.\n\n---",
        "### **🧩 En funktion per ikon**\n\nVarje fil i den här delen innehåller en enda ikonfabrik.\n\nDet gör det enkelt att hitta koden som ansvarar för en viss symbol.\n\n### **♻️ Återanvändning av grafik**\n\nFunktioner som `tree()`, `stroke()` och `hex()` används av många olika ikoner.\n\nDet skapar en gemensam grafisk grund och minskar upprepning.\n\n### **🎨 Grafik som fristående ansvar**\n\nIkonfunktionerna skapar SVG-element men ändrar inte världens data.\n\nEn gruvikon är exempelvis bara en grafisk representation av en gruva. Funktionen `createMineIcon()` skapar inte någon gruva i Convex.\n\n### **📐 Geometri genom SVG**\n\nIkonerna byggs med grundläggande SVG-element:\n\n* `path` för oregelbundna former.  \n* `rect` för rektanglar.  \n* `circle` för cirklar.  \n* `ellipse` för ovala former.  \n* `clipPath` för att begränsa synliga områden.\n\n---"
      ]
    },
    {
      "path": "src/library-svg-graphics/icons/resources/icon-iron.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **💎 2\\. Resources — Naturresurser**\n\n\nDessa funktioner skapar grafiska symboler för resurser som kan förekomma på kartan."
        },
        {
          "kind": "function",
          "name": "createIronIcon()",
          "identifier": "createIronIcon()",
          "anchor": "createIronIcon",
          "line": 5,
          "text": "Ritar ett järntacka med ljusa kanter.\n\n**Grundform:**\n\n`M4.5 14.5 8 10h10l3.5 4.5V18H4.5Z`\n\nFyllning: `#8d98a3`.\n\n**Ljusa kantlinjer:**\n\n`M8 10 9.2 14.5M18 10l-1.2 4.5M4.5 14.5h15`\n\n* Färg: `#d5dde4`.  \n* Linjebredd: `1`.\n\n🔗 **Anropas av:** `createIcon()` med nyckeln `iron`.\n\n⚙️ **Effekt:** Returnerar en järnikon."
        }
      ],
      "notes": [
        "### **🌾 Markförbättringar**\n\n`createIcon()` → `createFarmIcon()` → `stroke()` → `appendSvg()`.\n\n### **🌳 Plantager**\n\n`createIcon()` → `createPlantationIcon()` → `tree()` → `appendSvg()`.\n\n### **💎 Naturresurser**\n\n`createIcon()` → `createGoldIcon()` → `appendSvg()` och `stroke()`.\n\n### **🌊 Floder**\n\n`createIcon()` → `createRiverIcon()` → `stroke()`.\n\n### **🏖️ Kust**\n\n`createIcon()` → `createCoastIcon()` → `nextClipId()` → `clipPath` → `hex()` och `stroke()`.\n\n---",
        "### **🧩 En funktion per ikon**\n\nVarje fil i den här delen innehåller en enda ikonfabrik.\n\nDet gör det enkelt att hitta koden som ansvarar för en viss symbol.\n\n### **♻️ Återanvändning av grafik**\n\nFunktioner som `tree()`, `stroke()` och `hex()` används av många olika ikoner.\n\nDet skapar en gemensam grafisk grund och minskar upprepning.\n\n### **🎨 Grafik som fristående ansvar**\n\nIkonfunktionerna skapar SVG-element men ändrar inte världens data.\n\nEn gruvikon är exempelvis bara en grafisk representation av en gruva. Funktionen `createMineIcon()` skapar inte någon gruva i Convex.\n\n### **📐 Geometri genom SVG**\n\nIkonerna byggs med grundläggande SVG-element:\n\n* `path` för oregelbundna former.  \n* `rect` för rektanglar.  \n* `circle` för cirklar.  \n* `ellipse` för ovala former.  \n* `clipPath` för att begränsa synliga områden.\n\n---"
      ]
    },
    {
      "path": "src/library-svg-graphics/icons/resources/icon-stone.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **💎 2\\. Resources — Naturresurser**\n\n\nDessa funktioner skapar grafiska symboler för resurser som kan förekomma på kartan."
        },
        {
          "kind": "function",
          "name": "createStoneIcon()",
          "identifier": "createStoneIcon()",
          "anchor": "createStoneIcon",
          "line": 4,
          "text": "Ritar tre stenar med olika grå nyanser.\n\n**Färger:**\n\n* `#9aa3ad`  \n* `#b7c0c8`  \n* `#7e888f`\n\nStenarna skapas med tre SVG-`path`\\-element.\n\n🔗 **Anropas av:** `createIcon()` med nyckeln `stone`.\n\n⚙️ **Effekt:** Returnerar en stenikon."
        }
      ],
      "notes": [
        "### **🌾 Markförbättringar**\n\n`createIcon()` → `createFarmIcon()` → `stroke()` → `appendSvg()`.\n\n### **🌳 Plantager**\n\n`createIcon()` → `createPlantationIcon()` → `tree()` → `appendSvg()`.\n\n### **💎 Naturresurser**\n\n`createIcon()` → `createGoldIcon()` → `appendSvg()` och `stroke()`.\n\n### **🌊 Floder**\n\n`createIcon()` → `createRiverIcon()` → `stroke()`.\n\n### **🏖️ Kust**\n\n`createIcon()` → `createCoastIcon()` → `nextClipId()` → `clipPath` → `hex()` och `stroke()`.\n\n---",
        "### **🧩 En funktion per ikon**\n\nVarje fil i den här delen innehåller en enda ikonfabrik.\n\nDet gör det enkelt att hitta koden som ansvarar för en viss symbol.\n\n### **♻️ Återanvändning av grafik**\n\nFunktioner som `tree()`, `stroke()` och `hex()` används av många olika ikoner.\n\nDet skapar en gemensam grafisk grund och minskar upprepning.\n\n### **🎨 Grafik som fristående ansvar**\n\nIkonfunktionerna skapar SVG-element men ändrar inte världens data.\n\nEn gruvikon är exempelvis bara en grafisk representation av en gruva. Funktionen `createMineIcon()` skapar inte någon gruva i Convex.\n\n### **📐 Geometri genom SVG**\n\nIkonerna byggs med grundläggande SVG-element:\n\n* `path` för oregelbundna former.  \n* `rect` för rektanglar.  \n* `circle` för cirklar.  \n* `ellipse` för ovala former.  \n* `clipPath` för att begränsa synliga områden.\n\n---"
      ]
    },
    {
      "path": "src/library-svg-graphics/icons/resources/icon-wheat.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **💎 2\\. Resources — Naturresurser**\n\n\nDessa funktioner skapar grafiska symboler för resurser som kan förekomma på kartan."
        },
        {
          "kind": "function",
          "name": "createWheatIcon()",
          "identifier": "createWheatIcon()",
          "anchor": "createWheatIcon",
          "line": 5,
          "text": "Ritar ett veteax med strå och tre axpar.\n\n**Strå:**\n\n`M12 20 V6`\n\n* Färg: `#d7b15a`.  \n* Linjebredd: `1.4`.\n\n**Axpar:**\n\nPlacerade vid höjderna 9, 13 och 17\\.\n\nLinjebredd: `1.3`.\n\n🔗 **Anropas av:** `createIcon()` med nyckeln `wheat`.\n\n⚙️ **Effekt:** Returnerar en veteikon.\n\n---"
        }
      ],
      "notes": [
        "### **🌾 Markförbättringar**\n\n`createIcon()` → `createFarmIcon()` → `stroke()` → `appendSvg()`.\n\n### **🌳 Plantager**\n\n`createIcon()` → `createPlantationIcon()` → `tree()` → `appendSvg()`.\n\n### **💎 Naturresurser**\n\n`createIcon()` → `createGoldIcon()` → `appendSvg()` och `stroke()`.\n\n### **🌊 Floder**\n\n`createIcon()` → `createRiverIcon()` → `stroke()`.\n\n### **🏖️ Kust**\n\n`createIcon()` → `createCoastIcon()` → `nextClipId()` → `clipPath` → `hex()` och `stroke()`.\n\n---",
        "### **🧩 En funktion per ikon**\n\nVarje fil i den här delen innehåller en enda ikonfabrik.\n\nDet gör det enkelt att hitta koden som ansvarar för en viss symbol.\n\n### **♻️ Återanvändning av grafik**\n\nFunktioner som `tree()`, `stroke()` och `hex()` används av många olika ikoner.\n\nDet skapar en gemensam grafisk grund och minskar upprepning.\n\n### **🎨 Grafik som fristående ansvar**\n\nIkonfunktionerna skapar SVG-element men ändrar inte världens data.\n\nEn gruvikon är exempelvis bara en grafisk representation av en gruva. Funktionen `createMineIcon()` skapar inte någon gruva i Convex.\n\n### **📐 Geometri genom SVG**\n\nIkonerna byggs med grundläggande SVG-element:\n\n* `path` för oregelbundna former.  \n* `rect` för rektanglar.  \n* `circle` för cirklar.  \n* `ellipse` för ovala former.  \n* `clipPath` för att begränsa synliga områden.\n\n---"
      ]
    },
    {
      "path": "src/library-svg-graphics/icons/rivers/icon-river.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🌊 3\\. Rivers — Flodsystemets ikoner**\n\n\nTre ikoner representerar olika delar av ett flodsystem."
        },
        {
          "kind": "function",
          "name": "createRiverIcon()",
          "identifier": "createRiverIcon()",
          "anchor": "createRiverIcon",
          "line": 5,
          "text": "Ritar en böjd flodlinje.\n\n**SVG-path:**\n\n`M5 19C8 15 8 13 12 12s5-3 7-8`\n\n**Grafiska egenskaper:**\n\n* Färg: `#7ec8e3`.  \n* Linjebredd: `2.2`.\n\n🔗 **Anropas av:** `createIcon()` med nyckeln `river`.\n\n⚙️ **Effekt:** Returnerar en flodikon."
        }
      ],
      "notes": [
        "### **🌾 Markförbättringar**\n\n`createIcon()` → `createFarmIcon()` → `stroke()` → `appendSvg()`.\n\n### **🌳 Plantager**\n\n`createIcon()` → `createPlantationIcon()` → `tree()` → `appendSvg()`.\n\n### **💎 Naturresurser**\n\n`createIcon()` → `createGoldIcon()` → `appendSvg()` och `stroke()`.\n\n### **🌊 Floder**\n\n`createIcon()` → `createRiverIcon()` → `stroke()`.\n\n### **🏖️ Kust**\n\n`createIcon()` → `createCoastIcon()` → `nextClipId()` → `clipPath` → `hex()` och `stroke()`.\n\n---",
        "### **🧩 En funktion per ikon**\n\nVarje fil i den här delen innehåller en enda ikonfabrik.\n\nDet gör det enkelt att hitta koden som ansvarar för en viss symbol.\n\n### **♻️ Återanvändning av grafik**\n\nFunktioner som `tree()`, `stroke()` och `hex()` används av många olika ikoner.\n\nDet skapar en gemensam grafisk grund och minskar upprepning.\n\n### **🎨 Grafik som fristående ansvar**\n\nIkonfunktionerna skapar SVG-element men ändrar inte världens data.\n\nEn gruvikon är exempelvis bara en grafisk representation av en gruva. Funktionen `createMineIcon()` skapar inte någon gruva i Convex.\n\n### **📐 Geometri genom SVG**\n\nIkonerna byggs med grundläggande SVG-element:\n\n* `path` för oregelbundna former.  \n* `rect` för rektanglar.  \n* `circle` för cirklar.  \n* `ellipse` för ovala former.  \n* `clipPath` för att begränsa synliga områden.\n\n---"
      ]
    },
    {
      "path": "src/library-svg-graphics/icons/rivers/icon-river-mouth.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🌊 3\\. Rivers — Flodsystemets ikoner**\n\n\nTre ikoner representerar olika delar av ett flodsystem."
        },
        {
          "kind": "function",
          "name": "createRiverMouthIcon()",
          "identifier": "createRiverMouthIcon()",
          "anchor": "createRiverMouthIcon",
          "line": 5,
          "text": "Ritar en flod som mynnar ut i ett delta.\n\n**Flodlopp:**\n\n`M6 6c2 4 3 6 3 9`\n\n* Färg: `#7ec8e3`.  \n* Linjebredd: `2`.\n\n**Delta:**\n\nEn fylld SVG-`path` som börjar `M9 15c2 2…`.\n\nFyllning: `#7ec8e3`.\n\n🔗 **Anropas av:** `createIcon()` med nyckeln `river-mouth`.\n\n⚙️ **Effekt:** Returnerar en flodmynningsikon."
        }
      ],
      "notes": [
        "### **🌾 Markförbättringar**\n\n`createIcon()` → `createFarmIcon()` → `stroke()` → `appendSvg()`.\n\n### **🌳 Plantager**\n\n`createIcon()` → `createPlantationIcon()` → `tree()` → `appendSvg()`.\n\n### **💎 Naturresurser**\n\n`createIcon()` → `createGoldIcon()` → `appendSvg()` och `stroke()`.\n\n### **🌊 Floder**\n\n`createIcon()` → `createRiverIcon()` → `stroke()`.\n\n### **🏖️ Kust**\n\n`createIcon()` → `createCoastIcon()` → `nextClipId()` → `clipPath` → `hex()` och `stroke()`.\n\n---",
        "### **🧩 En funktion per ikon**\n\nVarje fil i den här delen innehåller en enda ikonfabrik.\n\nDet gör det enkelt att hitta koden som ansvarar för en viss symbol.\n\n### **♻️ Återanvändning av grafik**\n\nFunktioner som `tree()`, `stroke()` och `hex()` används av många olika ikoner.\n\nDet skapar en gemensam grafisk grund och minskar upprepning.\n\n### **🎨 Grafik som fristående ansvar**\n\nIkonfunktionerna skapar SVG-element men ändrar inte världens data.\n\nEn gruvikon är exempelvis bara en grafisk representation av en gruva. Funktionen `createMineIcon()` skapar inte någon gruva i Convex.\n\n### **📐 Geometri genom SVG**\n\nIkonerna byggs med grundläggande SVG-element:\n\n* `path` för oregelbundna former.  \n* `rect` för rektanglar.  \n* `circle` för cirklar.  \n* `ellipse` för ovala former.  \n* `clipPath` för att begränsa synliga områden.\n\n---"
      ]
    },
    {
      "path": "src/library-svg-graphics/icons/rivers/icon-river-source.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🌊 3\\. Rivers — Flodsystemets ikoner**\n\n\nTre ikoner representerar olika delar av ett flodsystem."
        },
        {
          "kind": "function",
          "name": "createRiverSourceIcon()",
          "identifier": "createRiverSourceIcon()",
          "anchor": "createRiverSourceIcon",
          "line": 5,
          "text": "Ritar en flodkälla och ett utflöde.\n\n**Källan:**\n\n* Cirkel vid `(8, 8)`.  \n* Radie: `2.3`.  \n* Färg: `#7ec8e3`.\n\n**Utflödet:**\n\n`M10 9.2C12 12 13 14 12 19`\n\n* Färg: `#7ec8e3`.  \n* Linjebredd: `2`.\n\n🔗 **Anropas av:** `createIcon()` med nyckeln `river-source`.\n\n⚙️ **Effekt:** Returnerar en flodkälleikon.\n\n💡 **Arkitekturprincip — Semantic Icons:** Olika ikoner används för att representera skilda begrepp inom samma system: flod, källa och mynning.\n\n---"
        }
      ],
      "notes": [
        "### **🌾 Markförbättringar**\n\n`createIcon()` → `createFarmIcon()` → `stroke()` → `appendSvg()`.\n\n### **🌳 Plantager**\n\n`createIcon()` → `createPlantationIcon()` → `tree()` → `appendSvg()`.\n\n### **💎 Naturresurser**\n\n`createIcon()` → `createGoldIcon()` → `appendSvg()` och `stroke()`.\n\n### **🌊 Floder**\n\n`createIcon()` → `createRiverIcon()` → `stroke()`.\n\n### **🏖️ Kust**\n\n`createIcon()` → `createCoastIcon()` → `nextClipId()` → `clipPath` → `hex()` och `stroke()`.\n\n---",
        "### **🧩 En funktion per ikon**\n\nVarje fil i den här delen innehåller en enda ikonfabrik.\n\nDet gör det enkelt att hitta koden som ansvarar för en viss symbol.\n\n### **♻️ Återanvändning av grafik**\n\nFunktioner som `tree()`, `stroke()` och `hex()` används av många olika ikoner.\n\nDet skapar en gemensam grafisk grund och minskar upprepning.\n\n### **🎨 Grafik som fristående ansvar**\n\nIkonfunktionerna skapar SVG-element men ändrar inte världens data.\n\nEn gruvikon är exempelvis bara en grafisk representation av en gruva. Funktionen `createMineIcon()` skapar inte någon gruva i Convex.\n\n### **📐 Geometri genom SVG**\n\nIkonerna byggs med grundläggande SVG-element:\n\n* `path` för oregelbundna former.  \n* `rect` för rektanglar.  \n* `circle` för cirklar.  \n* `ellipse` för ovala former.  \n* `clipPath` för att begränsa synliga områden.\n\n---"
      ]
    },
    {
      "path": "src/library-svg-graphics/icons/terrain/icon-coast.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🏜️ 4\\. Terrain — Kust och öken**\n\n\nHär börjar vi dokumentera ikonerna för kartans grundterränger."
        },
        {
          "kind": "function",
          "name": "createCoastIcon()",
          "identifier": "createCoastIcon()",
          "anchor": "createCoastIcon",
          "line": 10,
          "text": "Skapar en kustikon med sand, vatten och en våglinje.\n\nDetta är en av de mer tekniskt intressanta ikonfunktionerna eftersom den använder SVG klippmasker.\n\n**Arbetsgång:**\n\n1. Skapar SVG-roten.  \n2. Anropar `nextClipId()` för att få ett unikt id.  \n3. Skapar ett `defs`\\-element.  \n4. Skapar en `clipPath` med det nya id.  \n5. Lägger hexagonformen `POINTY_HEX` i klippmasken.  \n6. Ritar sandhexagonen med `hex()`.  \n7. Ritar vattenformen.  \n8. Kopplar vattenformen till klippmasken.  \n9. Ritar en ljus våglinje.\n\n**Sand:**\n\n`hex(icon, '#e2d0a8')`\n\n**Vatten:**\n\nFyllning: `#3e97be`.\n\n**Klippmask:**\n\n`clip-path=\"url(#id)\"`\n\nDär `id` ersätts med det unika klipp-id.\n\n**Våglinje:**\n\n* Färg: `#d7efe8`.  \n* Linjebredd: `1`.\n\n🔗 **Anropas av:** `createIcon()` med nyckeln `coast`.\n\n⚙️ **Effekt:** Returnerar en kustikon där vattnet begränsas till hexagonens form.\n\nVarje anrop får ett nytt klipp-id.\n\n💡 **Begrepp — SVG clipPath:** En klippmask som avgör vilka delar av ett grafiskt element som får synas.\n\n💡 **Varför ett unikt id?** Om flera SVG-ikoner använder samma klipp-id kan referenserna bli tvetydiga. Ett separat id per ikon minskar risken för sådana konflikter."
        }
      ],
      "notes": [
        "### **🌾 Markförbättringar**\n\n`createIcon()` → `createFarmIcon()` → `stroke()` → `appendSvg()`.\n\n### **🌳 Plantager**\n\n`createIcon()` → `createPlantationIcon()` → `tree()` → `appendSvg()`.\n\n### **💎 Naturresurser**\n\n`createIcon()` → `createGoldIcon()` → `appendSvg()` och `stroke()`.\n\n### **🌊 Floder**\n\n`createIcon()` → `createRiverIcon()` → `stroke()`.\n\n### **🏖️ Kust**\n\n`createIcon()` → `createCoastIcon()` → `nextClipId()` → `clipPath` → `hex()` och `stroke()`.\n\n---",
        "### **🧩 En funktion per ikon**\n\nVarje fil i den här delen innehåller en enda ikonfabrik.\n\nDet gör det enkelt att hitta koden som ansvarar för en viss symbol.\n\n### **♻️ Återanvändning av grafik**\n\nFunktioner som `tree()`, `stroke()` och `hex()` används av många olika ikoner.\n\nDet skapar en gemensam grafisk grund och minskar upprepning.\n\n### **🎨 Grafik som fristående ansvar**\n\nIkonfunktionerna skapar SVG-element men ändrar inte världens data.\n\nEn gruvikon är exempelvis bara en grafisk representation av en gruva. Funktionen `createMineIcon()` skapar inte någon gruva i Convex.\n\n### **📐 Geometri genom SVG**\n\nIkonerna byggs med grundläggande SVG-element:\n\n* `path` för oregelbundna former.  \n* `rect` för rektanglar.  \n* `circle` för cirklar.  \n* `ellipse` för ovala former.  \n* `clipPath` för att begränsa synliga områden.\n\n---"
      ]
    },
    {
      "path": "src/library-svg-graphics/icons/terrain/icon-desert.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🏜️ 4\\. Terrain — Kust och öken**\n\n\nHär börjar vi dokumentera ikonerna för kartans grundterränger."
        },
        {
          "kind": "function",
          "name": "createDesertIcon()",
          "identifier": "createDesertIcon()",
          "anchor": "createDesertIcon",
          "line": 5,
          "text": "Ritar en ökenhexagon med två sanddynlinjer.\n\n**Arbetsgång:**\n\n1. Skapar SVG-roten.  \n2. Ritar en hexagon med sandfärg.  \n3. Ritar två böjda dynlinjer.\n\n**Hexagonens färg:**\n\n`#d2b07a`\n\n**Dynlinjernas färg:**\n\n`#8a6840`\n\n**Linjebredd:**\n\n`1.2`\n\n🔗 **Anropas av:** `createIcon()` med nyckeln `desert`.\n\n⚙️ **Effekt:** Returnerar en ökenikon.\n\n---"
        }
      ],
      "notes": [
        "### **🌾 Markförbättringar**\n\n`createIcon()` → `createFarmIcon()` → `stroke()` → `appendSvg()`.\n\n### **🌳 Plantager**\n\n`createIcon()` → `createPlantationIcon()` → `tree()` → `appendSvg()`.\n\n### **💎 Naturresurser**\n\n`createIcon()` → `createGoldIcon()` → `appendSvg()` och `stroke()`.\n\n### **🌊 Floder**\n\n`createIcon()` → `createRiverIcon()` → `stroke()`.\n\n### **🏖️ Kust**\n\n`createIcon()` → `createCoastIcon()` → `nextClipId()` → `clipPath` → `hex()` och `stroke()`.\n\n---",
        "### **🧩 En funktion per ikon**\n\nVarje fil i den här delen innehåller en enda ikonfabrik.\n\nDet gör det enkelt att hitta koden som ansvarar för en viss symbol.\n\n### **♻️ Återanvändning av grafik**\n\nFunktioner som `tree()`, `stroke()` och `hex()` används av många olika ikoner.\n\nDet skapar en gemensam grafisk grund och minskar upprepning.\n\n### **🎨 Grafik som fristående ansvar**\n\nIkonfunktionerna skapar SVG-element men ändrar inte världens data.\n\nEn gruvikon är exempelvis bara en grafisk representation av en gruva. Funktionen `createMineIcon()` skapar inte någon gruva i Convex.\n\n### **📐 Geometri genom SVG**\n\nIkonerna byggs med grundläggande SVG-element:\n\n* `path` för oregelbundna former.  \n* `rect` för rektanglar.  \n* `circle` för cirklar.  \n* `ellipse` för ovala former.  \n* `clipPath` för att begränsa synliga områden.\n\n---"
      ]
    },
    {
      "path": "src/library-svg-graphics/icons/terrain/icon-grass.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🌿 1\\. Terrain Icons — De fem sista terrängikonerna**\n\n\nDessa funktioner skapar små symboler för grundterrängerna. De ska skiljas från de stora terrängbilderna som används för själva kartans hexagoner.\n\nSamtliga skapar en SVG med `viewBox=\"0 0 24 24\"` och `aria-hidden=\"true\"`."
        },
        {
          "kind": "function",
          "name": "createGrassIcon()",
          "identifier": "createGrassIcon()",
          "anchor": "createGrassIcon",
          "line": 5,
          "text": "Skapar en grön hexagon med tre stiliserade grässtrån.\n\n**Arbetsgång:**\n\n1. Skapar SVG-roten.  \n2. Anropar `hex(icon, '#3e8f46')`.  \n3. Ritar tre grässtrån med `stroke()`.  \n4. Returnerar ikonen.\n\n**Grafiska egenskaper:**\n\n* Hexagonens färg: `#3e8f46`.  \n* Grässtrånas färg: `#173d22`.  \n* Linjebredd: `1.2`.\n\nGrässtråna börjar med SVG-banorna `M9 16.5…`, `M12 17.2…` och `M15 16.4…`.\n\n🔗 **Anropas av:** `createIcon()` med nyckeln `grass`.\n\n⚙️ **Effekt:** Returnerar ett omonterat SVG-element."
        }
      ],
      "notes": [
        "### **🌱 Terrängikon**\n\n`createIcon()` → `createGrassIcon()` → `hex()` och `stroke()`.\n\n### **🏛️ Underverksikon**\n\n`createIcon()` → `createGardensIcon()` → `tree()`.\n\n### **🌊 Detaljerad kust**\n\n`WorldMapController` → `createCoast()` → `pointsAttribute()` och sex anrop till `addWave()`.\n\n### **🏜️ Platt öken**\n\n`WorldMapController` → `createDesertFlat()` → `addSandRibbon()`, `addSandGrain()` och `noise()`.\n\n### **⛰️ Kuperad öken**\n\n`WorldMapController` → `createDesertHills()` → `createDesertFlat()` → `addDune()`.\n\n---",
        "### **🖼️ Två nivåer av grafik**\n\nBiblioteket skiljer mellan små ikoner och detaljerade terrängbilder.\n\n**Ikonerna** använder ett 24 × 24-koordinatsystem och är avsedda att representera ett begrepp.\n\n**Terrängbilderna** använder hexagonens större koordinatsystem och innehåller många fler grafiska detaljer.\n\nDet är därför `createDesertIcon()` och `createDesertFlat()` är två olika funktioner.\n\n### **♻️ Återanvändning genom sammansättning**\n\n`createDesertHills()` börjar med att skapa en platt öken och lägger sedan till kullarna.\n\nDetta är ett konkret exempel på hur en mer avancerad funktion kan byggas ovanpå en enklare.\n\n### **🎲 Kontrollerad variation**\n\n`noise()` används för att ge sandkornen variation.\n\nEftersom funktionen är deterministisk kan samma frö ge samma resultat igen.\n\n### **🛡️ Defensiv programmering**\n\n`createDesertHills()` kontrollerar att de SVG-definitioner som behövs faktiskt finns.\n\nOm de saknas kastas ett tydligt fel i stället för att fortsätta med en ofullständig grafikstruktur.\n\n---"
      ]
    },
    {
      "path": "src/library-svg-graphics/icons/terrain/icon-ocean.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🌿 1\\. Terrain Icons — De fem sista terrängikonerna**\n\n\nDessa funktioner skapar små symboler för grundterrängerna. De ska skiljas från de stora terrängbilderna som används för själva kartans hexagoner.\n\nSamtliga skapar en SVG med `viewBox=\"0 0 24 24\"` och `aria-hidden=\"true\"`."
        },
        {
          "kind": "function",
          "name": "createOceanIcon()",
          "identifier": "createOceanIcon()",
          "anchor": "createOceanIcon",
          "line": 5,
          "text": "Skapar en blå hexagon med två våglinjer.\n\n**Arbetsgång:**\n\n1. Ritar en hexagon med `hex()`.  \n2. Ritar två vågor med `stroke()`.  \n3. Placerar vågorna på höjderna `10.5` och `14.2`.\n\n**Färger:**\n\n* Hav: `#1d6284`.  \n* Vågor: `#9ad4ea`.\n\nLinjebredd: `1.1`.\n\n🔗 **Anropas av:** `createIcon()` med nyckeln `ocean`.\n\n⚙️ **Effekt:** Returnerar en havsikon."
        }
      ],
      "notes": [
        "### **🌱 Terrängikon**\n\n`createIcon()` → `createGrassIcon()` → `hex()` och `stroke()`.\n\n### **🏛️ Underverksikon**\n\n`createIcon()` → `createGardensIcon()` → `tree()`.\n\n### **🌊 Detaljerad kust**\n\n`WorldMapController` → `createCoast()` → `pointsAttribute()` och sex anrop till `addWave()`.\n\n### **🏜️ Platt öken**\n\n`WorldMapController` → `createDesertFlat()` → `addSandRibbon()`, `addSandGrain()` och `noise()`.\n\n### **⛰️ Kuperad öken**\n\n`WorldMapController` → `createDesertHills()` → `createDesertFlat()` → `addDune()`.\n\n---",
        "### **🖼️ Två nivåer av grafik**\n\nBiblioteket skiljer mellan små ikoner och detaljerade terrängbilder.\n\n**Ikonerna** använder ett 24 × 24-koordinatsystem och är avsedda att representera ett begrepp.\n\n**Terrängbilderna** använder hexagonens större koordinatsystem och innehåller många fler grafiska detaljer.\n\nDet är därför `createDesertIcon()` och `createDesertFlat()` är två olika funktioner.\n\n### **♻️ Återanvändning genom sammansättning**\n\n`createDesertHills()` börjar med att skapa en platt öken och lägger sedan till kullarna.\n\nDetta är ett konkret exempel på hur en mer avancerad funktion kan byggas ovanpå en enklare.\n\n### **🎲 Kontrollerad variation**\n\n`noise()` används för att ge sandkornen variation.\n\nEftersom funktionen är deterministisk kan samma frö ge samma resultat igen.\n\n### **🛡️ Defensiv programmering**\n\n`createDesertHills()` kontrollerar att de SVG-definitioner som behövs faktiskt finns.\n\nOm de saknas kastas ett tydligt fel i stället för att fortsätta med en ofullständig grafikstruktur.\n\n---"
      ]
    },
    {
      "path": "src/library-svg-graphics/icons/terrain/icon-plains.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🌿 1\\. Terrain Icons — De fem sista terrängikonerna**\n\n\nDessa funktioner skapar små symboler för grundterrängerna. De ska skiljas från de stora terrängbilderna som används för själva kartans hexagoner.\n\nSamtliga skapar en SVG med `viewBox=\"0 0 24 24\"` och `aria-hidden=\"true\"`."
        },
        {
          "kind": "function",
          "name": "createPlainsIcon()",
          "identifier": "createPlainsIcon()",
          "anchor": "createPlainsIcon",
          "line": 5,
          "text": "Skapar en gulbrun hexagon med tre horisontella markstreck.\n\n**Hexagon:**\n\n`hex(icon, '#c6a15a')`\n\n**Markstreck:**\n\n`M7 10.5h10M7.5 13h9M8 15.5h8`\n\n* Färg: `#7a5b28`.  \n* Linjebredd: `1.1`.\n\n🔗 **Anropas av:** `createIcon()` med nyckeln `plains`.\n\n⚙️ **Effekt:** Returnerar en slättikon."
        }
      ],
      "notes": [
        "### **🌱 Terrängikon**\n\n`createIcon()` → `createGrassIcon()` → `hex()` och `stroke()`.\n\n### **🏛️ Underverksikon**\n\n`createIcon()` → `createGardensIcon()` → `tree()`.\n\n### **🌊 Detaljerad kust**\n\n`WorldMapController` → `createCoast()` → `pointsAttribute()` och sex anrop till `addWave()`.\n\n### **🏜️ Platt öken**\n\n`WorldMapController` → `createDesertFlat()` → `addSandRibbon()`, `addSandGrain()` och `noise()`.\n\n### **⛰️ Kuperad öken**\n\n`WorldMapController` → `createDesertHills()` → `createDesertFlat()` → `addDune()`.\n\n---",
        "### **🖼️ Två nivåer av grafik**\n\nBiblioteket skiljer mellan små ikoner och detaljerade terrängbilder.\n\n**Ikonerna** använder ett 24 × 24-koordinatsystem och är avsedda att representera ett begrepp.\n\n**Terrängbilderna** använder hexagonens större koordinatsystem och innehåller många fler grafiska detaljer.\n\nDet är därför `createDesertIcon()` och `createDesertFlat()` är två olika funktioner.\n\n### **♻️ Återanvändning genom sammansättning**\n\n`createDesertHills()` börjar med att skapa en platt öken och lägger sedan till kullarna.\n\nDetta är ett konkret exempel på hur en mer avancerad funktion kan byggas ovanpå en enklare.\n\n### **🎲 Kontrollerad variation**\n\n`noise()` används för att ge sandkornen variation.\n\nEftersom funktionen är deterministisk kan samma frö ge samma resultat igen.\n\n### **🛡️ Defensiv programmering**\n\n`createDesertHills()` kontrollerar att de SVG-definitioner som behövs faktiskt finns.\n\nOm de saknas kastas ett tydligt fel i stället för att fortsätta med en ofullständig grafikstruktur.\n\n---"
      ]
    },
    {
      "path": "src/library-svg-graphics/icons/terrain/icon-snow.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🌿 1\\. Terrain Icons — De fem sista terrängikonerna**\n\n\nDessa funktioner skapar små symboler för grundterrängerna. De ska skiljas från de stora terrängbilderna som används för själva kartans hexagoner.\n\nSamtliga skapar en SVG med `viewBox=\"0 0 24 24\"` och `aria-hidden=\"true\"`."
        },
        {
          "kind": "function",
          "name": "createSnowIcon()",
          "identifier": "createSnowIcon()",
          "anchor": "createSnowIcon",
          "line": 5,
          "text": "Skapar en ljus hexagon med en snöflinga.\n\n**Hexagonens färg:** `#e7eef3`.\n\n**Snöflingans SVG-path:**\n\n`M12 8v8M8.5 10l7 4M8.5 14l7-4`\n\n* Färg: `#8aa4b8`.  \n* Linjebredd: `1.1`.\n\n🔗 **Anropas av:** `createIcon()` med nyckeln `snow`.\n\n⚙️ **Effekt:** Returnerar en snöikon."
        }
      ],
      "notes": [
        "### **🌱 Terrängikon**\n\n`createIcon()` → `createGrassIcon()` → `hex()` och `stroke()`.\n\n### **🏛️ Underverksikon**\n\n`createIcon()` → `createGardensIcon()` → `tree()`.\n\n### **🌊 Detaljerad kust**\n\n`WorldMapController` → `createCoast()` → `pointsAttribute()` och sex anrop till `addWave()`.\n\n### **🏜️ Platt öken**\n\n`WorldMapController` → `createDesertFlat()` → `addSandRibbon()`, `addSandGrain()` och `noise()`.\n\n### **⛰️ Kuperad öken**\n\n`WorldMapController` → `createDesertHills()` → `createDesertFlat()` → `addDune()`.\n\n---",
        "### **🖼️ Två nivåer av grafik**\n\nBiblioteket skiljer mellan små ikoner och detaljerade terrängbilder.\n\n**Ikonerna** använder ett 24 × 24-koordinatsystem och är avsedda att representera ett begrepp.\n\n**Terrängbilderna** använder hexagonens större koordinatsystem och innehåller många fler grafiska detaljer.\n\nDet är därför `createDesertIcon()` och `createDesertFlat()` är två olika funktioner.\n\n### **♻️ Återanvändning genom sammansättning**\n\n`createDesertHills()` börjar med att skapa en platt öken och lägger sedan till kullarna.\n\nDetta är ett konkret exempel på hur en mer avancerad funktion kan byggas ovanpå en enklare.\n\n### **🎲 Kontrollerad variation**\n\n`noise()` används för att ge sandkornen variation.\n\nEftersom funktionen är deterministisk kan samma frö ge samma resultat igen.\n\n### **🛡️ Defensiv programmering**\n\n`createDesertHills()` kontrollerar att de SVG-definitioner som behövs faktiskt finns.\n\nOm de saknas kastas ett tydligt fel i stället för att fortsätta med en ofullständig grafikstruktur.\n\n---"
      ]
    },
    {
      "path": "src/library-svg-graphics/icons/terrain/icon-tundra.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🌿 1\\. Terrain Icons — De fem sista terrängikonerna**\n\n\nDessa funktioner skapar små symboler för grundterrängerna. De ska skiljas från de stora terrängbilderna som används för själva kartans hexagoner.\n\nSamtliga skapar en SVG med `viewBox=\"0 0 24 24\"` och `aria-hidden=\"true\"`."
        },
        {
          "kind": "function",
          "name": "createTundraIcon()",
          "identifier": "createTundraIcon()",
          "anchor": "createTundraIcon",
          "line": 5,
          "text": "Skapar en grågrön hexagon med tre små stenar.\n\n**Hexagon:**\n\n`hex(icon, '#8d9a78')`\n\n**Stenarna:**\n\n| Centrum | Radie |\n| ----- | ----- |\n| `(9, 12)` | 1 |\n| `(13, 14.5)` | 1,1 |\n| `(15.5, 10.5)` | 0,8 |\n\nAlla tre stenarna har fyllningen `#4d5a40`.\n\n🔗 **Anropas av:** `createIcon()` med nyckeln `tundra`.\n\n⚙️ **Effekt:** Returnerar en tundraikon.\n\n---"
        }
      ],
      "notes": [
        "### **🌱 Terrängikon**\n\n`createIcon()` → `createGrassIcon()` → `hex()` och `stroke()`.\n\n### **🏛️ Underverksikon**\n\n`createIcon()` → `createGardensIcon()` → `tree()`.\n\n### **🌊 Detaljerad kust**\n\n`WorldMapController` → `createCoast()` → `pointsAttribute()` och sex anrop till `addWave()`.\n\n### **🏜️ Platt öken**\n\n`WorldMapController` → `createDesertFlat()` → `addSandRibbon()`, `addSandGrain()` och `noise()`.\n\n### **⛰️ Kuperad öken**\n\n`WorldMapController` → `createDesertHills()` → `createDesertFlat()` → `addDune()`.\n\n---",
        "### **🖼️ Två nivåer av grafik**\n\nBiblioteket skiljer mellan små ikoner och detaljerade terrängbilder.\n\n**Ikonerna** använder ett 24 × 24-koordinatsystem och är avsedda att representera ett begrepp.\n\n**Terrängbilderna** använder hexagonens större koordinatsystem och innehåller många fler grafiska detaljer.\n\nDet är därför `createDesertIcon()` och `createDesertFlat()` är två olika funktioner.\n\n### **♻️ Återanvändning genom sammansättning**\n\n`createDesertHills()` börjar med att skapa en platt öken och lägger sedan till kullarna.\n\nDetta är ett konkret exempel på hur en mer avancerad funktion kan byggas ovanpå en enklare.\n\n### **🎲 Kontrollerad variation**\n\n`noise()` används för att ge sandkornen variation.\n\nEftersom funktionen är deterministisk kan samma frö ge samma resultat igen.\n\n### **🛡️ Defensiv programmering**\n\n`createDesertHills()` kontrollerar att de SVG-definitioner som behövs faktiskt finns.\n\nOm de saknas kastas ett tydligt fel i stället för att fortsätta med en ofullständig grafikstruktur.\n\n---"
      ]
    },
    {
      "path": "src/library-svg-graphics/icons/wonders/icon-colossus.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🏛️ 2\\. Wonders — Världens underverk**\n\n\nDessa sex funktioner skapar symboler för olika underverk.\n\nVarje ikon byggs av geometriska SVG-element och returneras utan att monteras i dokumentet."
        },
        {
          "kind": "function",
          "name": "createColossusIcon()",
          "identifier": "createColossusIcon()",
          "anchor": "createColossusIcon",
          "line": 5,
          "text": "Ritar en stående figur som håller upp en fackla.\n\n**Grafiska delar:**\n\n* Huvud: cirkel vid `(11, 5.5)`.  \n* Kropp: en fylld SVG-bana.  \n* Arm: linje från `(13, 12.5)` till `(18.5, 7.5)`.  \n* Bas: horisontell linje.  \n* Fackla: cirkel vid `(19.2, 6.4)`.\n\nFiguren använder `currentColor`.\n\nFacklan har fyllningen `#e2c27a`.\n\n🔗 **Anropas av:** `createIcon()` med nyckeln `colossus`.\n\n⚙️ **Effekt:** Returnerar en kolossikon."
        }
      ],
      "notes": [
        "### **🌱 Terrängikon**\n\n`createIcon()` → `createGrassIcon()` → `hex()` och `stroke()`.\n\n### **🏛️ Underverksikon**\n\n`createIcon()` → `createGardensIcon()` → `tree()`.\n\n### **🌊 Detaljerad kust**\n\n`WorldMapController` → `createCoast()` → `pointsAttribute()` och sex anrop till `addWave()`.\n\n### **🏜️ Platt öken**\n\n`WorldMapController` → `createDesertFlat()` → `addSandRibbon()`, `addSandGrain()` och `noise()`.\n\n### **⛰️ Kuperad öken**\n\n`WorldMapController` → `createDesertHills()` → `createDesertFlat()` → `addDune()`.\n\n---",
        "### **🖼️ Två nivåer av grafik**\n\nBiblioteket skiljer mellan små ikoner och detaljerade terrängbilder.\n\n**Ikonerna** använder ett 24 × 24-koordinatsystem och är avsedda att representera ett begrepp.\n\n**Terrängbilderna** använder hexagonens större koordinatsystem och innehåller många fler grafiska detaljer.\n\nDet är därför `createDesertIcon()` och `createDesertFlat()` är två olika funktioner.\n\n### **♻️ Återanvändning genom sammansättning**\n\n`createDesertHills()` börjar med att skapa en platt öken och lägger sedan till kullarna.\n\nDetta är ett konkret exempel på hur en mer avancerad funktion kan byggas ovanpå en enklare.\n\n### **🎲 Kontrollerad variation**\n\n`noise()` används för att ge sandkornen variation.\n\nEftersom funktionen är deterministisk kan samma frö ge samma resultat igen.\n\n### **🛡️ Defensiv programmering**\n\n`createDesertHills()` kontrollerar att de SVG-definitioner som behövs faktiskt finns.\n\nOm de saknas kastas ett tydligt fel i stället för att fortsätta med en ofullständig grafikstruktur.\n\n---"
      ]
    },
    {
      "path": "src/library-svg-graphics/icons/wonders/icon-gardens.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🏛️ 2\\. Wonders — Världens underverk**\n\n\nDessa sex funktioner skapar symboler för olika underverk.\n\nVarje ikon byggs av geometriska SVG-element och returneras utan att monteras i dokumentet."
        },
        {
          "kind": "function",
          "name": "createGardensIcon()",
          "identifier": "createGardensIcon()",
          "anchor": "createGardensIcon",
          "line": 5,
          "text": "Ritar en inhägnad trädgård med ett träd.\n\n**Inhägnaden:**\n\n* Position: `(3.5, 7)`.  \n* Storlek: 17 × 12\\.  \n* Kontur: `currentColor`.  \n* Linjebredd: `1.5`.\n\n**Trädet:**\n\n`tree(icon, 12, 8.5, 6, 7, '#2f8f49')`\n\n🔗 **Anropas av:** `createIcon()` med nyckeln `gardens`.\n\n⚙️ **Effekt:** Returnerar en trädgårdsikon.\n\n💡 **Återanvändning:** Underverksikonen använder samma `tree()`\\-funktion som skogs-, regnskogs- och plantageikonerna."
        }
      ],
      "notes": [
        "### **🌱 Terrängikon**\n\n`createIcon()` → `createGrassIcon()` → `hex()` och `stroke()`.\n\n### **🏛️ Underverksikon**\n\n`createIcon()` → `createGardensIcon()` → `tree()`.\n\n### **🌊 Detaljerad kust**\n\n`WorldMapController` → `createCoast()` → `pointsAttribute()` och sex anrop till `addWave()`.\n\n### **🏜️ Platt öken**\n\n`WorldMapController` → `createDesertFlat()` → `addSandRibbon()`, `addSandGrain()` och `noise()`.\n\n### **⛰️ Kuperad öken**\n\n`WorldMapController` → `createDesertHills()` → `createDesertFlat()` → `addDune()`.\n\n---",
        "### **🖼️ Två nivåer av grafik**\n\nBiblioteket skiljer mellan små ikoner och detaljerade terrängbilder.\n\n**Ikonerna** använder ett 24 × 24-koordinatsystem och är avsedda att representera ett begrepp.\n\n**Terrängbilderna** använder hexagonens större koordinatsystem och innehåller många fler grafiska detaljer.\n\nDet är därför `createDesertIcon()` och `createDesertFlat()` är två olika funktioner.\n\n### **♻️ Återanvändning genom sammansättning**\n\n`createDesertHills()` börjar med att skapa en platt öken och lägger sedan till kullarna.\n\nDetta är ett konkret exempel på hur en mer avancerad funktion kan byggas ovanpå en enklare.\n\n### **🎲 Kontrollerad variation**\n\n`noise()` används för att ge sandkornen variation.\n\nEftersom funktionen är deterministisk kan samma frö ge samma resultat igen.\n\n### **🛡️ Defensiv programmering**\n\n`createDesertHills()` kontrollerar att de SVG-definitioner som behövs faktiskt finns.\n\nOm de saknas kastas ett tydligt fel i stället för att fortsätta med en ofullständig grafikstruktur.\n\n---"
      ]
    },
    {
      "path": "src/library-svg-graphics/icons/wonders/icon-lighthouse.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🏛️ 2\\. Wonders — Världens underverk**\n\n\nDessa sex funktioner skapar symboler för olika underverk.\n\nVarje ikon byggs av geometriska SVG-element och returneras utan att monteras i dokumentet."
        },
        {
          "kind": "function",
          "name": "createLighthouseIcon()",
          "identifier": "createLighthouseIcon()",
          "anchor": "createLighthouseIcon",
          "line": 5,
          "text": "Ritar ett fyrtorn med två ljusstrålar.\n\n**Ljusstrålar:**\n\n`M12 6.5 5 3.2M12 6.5 19 3.2`\n\nFärg: `#e2c27a`.\n\n**Tornet:**\n\nEn fylld SVG-`path` med `currentColor`.\n\n**Tak:**\n\nEn separat form med fyllningen `#e2c27a`.\n\n**Bas:**\n\n`M8 19.8h8`\n\nLinjebredd: `1.6`.\n\n🔗 **Anropas av:** `createIcon()` med nyckeln `lighthouse`.\n\n⚙️ **Effekt:** Returnerar en fyrtornsikon."
        }
      ],
      "notes": [
        "### **🌱 Terrängikon**\n\n`createIcon()` → `createGrassIcon()` → `hex()` och `stroke()`.\n\n### **🏛️ Underverksikon**\n\n`createIcon()` → `createGardensIcon()` → `tree()`.\n\n### **🌊 Detaljerad kust**\n\n`WorldMapController` → `createCoast()` → `pointsAttribute()` och sex anrop till `addWave()`.\n\n### **🏜️ Platt öken**\n\n`WorldMapController` → `createDesertFlat()` → `addSandRibbon()`, `addSandGrain()` och `noise()`.\n\n### **⛰️ Kuperad öken**\n\n`WorldMapController` → `createDesertHills()` → `createDesertFlat()` → `addDune()`.\n\n---",
        "### **🖼️ Två nivåer av grafik**\n\nBiblioteket skiljer mellan små ikoner och detaljerade terrängbilder.\n\n**Ikonerna** använder ett 24 × 24-koordinatsystem och är avsedda att representera ett begrepp.\n\n**Terrängbilderna** använder hexagonens större koordinatsystem och innehåller många fler grafiska detaljer.\n\nDet är därför `createDesertIcon()` och `createDesertFlat()` är två olika funktioner.\n\n### **♻️ Återanvändning genom sammansättning**\n\n`createDesertHills()` börjar med att skapa en platt öken och lägger sedan till kullarna.\n\nDetta är ett konkret exempel på hur en mer avancerad funktion kan byggas ovanpå en enklare.\n\n### **🎲 Kontrollerad variation**\n\n`noise()` används för att ge sandkornen variation.\n\nEftersom funktionen är deterministisk kan samma frö ge samma resultat igen.\n\n### **🛡️ Defensiv programmering**\n\n`createDesertHills()` kontrollerar att de SVG-definitioner som behövs faktiskt finns.\n\nOm de saknas kastas ett tydligt fel i stället för att fortsätta med en ofullständig grafikstruktur.\n\n---"
      ]
    },
    {
      "path": "src/library-svg-graphics/icons/wonders/icon-observatory.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🏛️ 2\\. Wonders — Världens underverk**\n\n\nDessa sex funktioner skapar symboler för olika underverk.\n\nVarje ikon byggs av geometriska SVG-element och returneras utan att monteras i dokumentet."
        },
        {
          "kind": "function",
          "name": "createObservatoryIcon()",
          "identifier": "createObservatoryIcon()",
          "anchor": "createObservatoryIcon",
          "line": 5,
          "text": "Ritar ett observatorium med kupol, sockel och fönster.\n\n**Kupol:**\n\n`M5 14a7 7 0 0 1 14 0`\n\nRitas med `stroke()` och dess standardfärg.\n\n**Sockel:**\n\n* Position: `(7, 14)`.  \n* Storlek: 10 × 5,5.  \n* Fyllning: `currentColor`.\n\n**Fönster:**\n\n* Centrum: `(12, 11.2)`.  \n* Fyllning: `#e2c27a`.\n\n🔗 **Anropas av:** `createIcon()` med nyckeln `observatory`.\n\n⚙️ **Effekt:** Returnerar en observatorieikon."
        }
      ],
      "notes": [
        "### **🌱 Terrängikon**\n\n`createIcon()` → `createGrassIcon()` → `hex()` och `stroke()`.\n\n### **🏛️ Underverksikon**\n\n`createIcon()` → `createGardensIcon()` → `tree()`.\n\n### **🌊 Detaljerad kust**\n\n`WorldMapController` → `createCoast()` → `pointsAttribute()` och sex anrop till `addWave()`.\n\n### **🏜️ Platt öken**\n\n`WorldMapController` → `createDesertFlat()` → `addSandRibbon()`, `addSandGrain()` och `noise()`.\n\n### **⛰️ Kuperad öken**\n\n`WorldMapController` → `createDesertHills()` → `createDesertFlat()` → `addDune()`.\n\n---",
        "### **🖼️ Två nivåer av grafik**\n\nBiblioteket skiljer mellan små ikoner och detaljerade terrängbilder.\n\n**Ikonerna** använder ett 24 × 24-koordinatsystem och är avsedda att representera ett begrepp.\n\n**Terrängbilderna** använder hexagonens större koordinatsystem och innehåller många fler grafiska detaljer.\n\nDet är därför `createDesertIcon()` och `createDesertFlat()` är två olika funktioner.\n\n### **♻️ Återanvändning genom sammansättning**\n\n`createDesertHills()` börjar med att skapa en platt öken och lägger sedan till kullarna.\n\nDetta är ett konkret exempel på hur en mer avancerad funktion kan byggas ovanpå en enklare.\n\n### **🎲 Kontrollerad variation**\n\n`noise()` används för att ge sandkornen variation.\n\nEftersom funktionen är deterministisk kan samma frö ge samma resultat igen.\n\n### **🛡️ Defensiv programmering**\n\n`createDesertHills()` kontrollerar att de SVG-definitioner som behövs faktiskt finns.\n\nOm de saknas kastas ett tydligt fel i stället för att fortsätta med en ofullständig grafikstruktur.\n\n---"
      ]
    },
    {
      "path": "src/library-svg-graphics/icons/wonders/icon-pyramid.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🏛️ 2\\. Wonders — Världens underverk**\n\n\nDessa sex funktioner skapar symboler för olika underverk.\n\nVarje ikon byggs av geometriska SVG-element och returneras utan att monteras i dokumentet."
        },
        {
          "kind": "function",
          "name": "createPyramidIcon()",
          "identifier": "createPyramidIcon()",
          "anchor": "createPyramidIcon",
          "line": 5,
          "text": "Ritar en pyramid med horisontella skiktlinjer och en mittlinje.\n\n**Pyramidens kontur:**\n\n`M12 4.5 21 19.5H3Z`\n\nLinjebredd: `1.5`.\n\n**Inre linjer:**\n\n`M7.2 13.2h9.6M9.4 16.4h5.2M12 4.5v15`\n\nLinjebredd: `1.2`.\n\nBåda använder `currentColor`.\n\n🔗 **Anropas av:** `createIcon()` med nyckeln `pyramid`.\n\n⚙️ **Effekt:** Returnerar en pyramidikon."
        }
      ],
      "notes": [
        "### **🌱 Terrängikon**\n\n`createIcon()` → `createGrassIcon()` → `hex()` och `stroke()`.\n\n### **🏛️ Underverksikon**\n\n`createIcon()` → `createGardensIcon()` → `tree()`.\n\n### **🌊 Detaljerad kust**\n\n`WorldMapController` → `createCoast()` → `pointsAttribute()` och sex anrop till `addWave()`.\n\n### **🏜️ Platt öken**\n\n`WorldMapController` → `createDesertFlat()` → `addSandRibbon()`, `addSandGrain()` och `noise()`.\n\n### **⛰️ Kuperad öken**\n\n`WorldMapController` → `createDesertHills()` → `createDesertFlat()` → `addDune()`.\n\n---",
        "### **🖼️ Två nivåer av grafik**\n\nBiblioteket skiljer mellan små ikoner och detaljerade terrängbilder.\n\n**Ikonerna** använder ett 24 × 24-koordinatsystem och är avsedda att representera ett begrepp.\n\n**Terrängbilderna** använder hexagonens större koordinatsystem och innehåller många fler grafiska detaljer.\n\nDet är därför `createDesertIcon()` och `createDesertFlat()` är två olika funktioner.\n\n### **♻️ Återanvändning genom sammansättning**\n\n`createDesertHills()` börjar med att skapa en platt öken och lägger sedan till kullarna.\n\nDetta är ett konkret exempel på hur en mer avancerad funktion kan byggas ovanpå en enklare.\n\n### **🎲 Kontrollerad variation**\n\n`noise()` används för att ge sandkornen variation.\n\nEftersom funktionen är deterministisk kan samma frö ge samma resultat igen.\n\n### **🛡️ Defensiv programmering**\n\n`createDesertHills()` kontrollerar att de SVG-definitioner som behövs faktiskt finns.\n\nOm de saknas kastas ett tydligt fel i stället för att fortsätta med en ofullständig grafikstruktur.\n\n---"
      ]
    },
    {
      "path": "src/library-svg-graphics/icons/wonders/icon-temple.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🏛️ 2\\. Wonders — Världens underverk**\n\n\nDessa sex funktioner skapar symboler för olika underverk.\n\nVarje ikon byggs av geometriska SVG-element och returneras utan att monteras i dokumentet."
        },
        {
          "kind": "function",
          "name": "createTempleIcon()",
          "identifier": "createTempleIcon()",
          "anchor": "createTempleIcon",
          "line": 5,
          "text": "Ritar ett klassiskt tempel med tak, bjälke, fyra pelare och bas.\n\n**Fyra ritoperationer:**\n\n1. Takets triangelform.  \n2. En horisontell bjälke.  \n3. Fyra vertikala pelare.  \n4. En horisontell bas.\n\n**Tak:**\n\n`M3.5 9.5 12 3.5l8.5 6`\n\n**Pelare:**\n\n`M7 9.5v9M10.5 9.5v9M13.5 9.5v9M17 9.5v9`\n\nSamtliga använder `stroke()` med standardfärg.\n\n🔗 **Anropas av:** `createIcon()` med nyckeln `temple`.\n\n⚙️ **Effekt:** Returnerar en tempelikon.\n\n---"
        }
      ],
      "notes": [
        "### **🌱 Terrängikon**\n\n`createIcon()` → `createGrassIcon()` → `hex()` och `stroke()`.\n\n### **🏛️ Underverksikon**\n\n`createIcon()` → `createGardensIcon()` → `tree()`.\n\n### **🌊 Detaljerad kust**\n\n`WorldMapController` → `createCoast()` → `pointsAttribute()` och sex anrop till `addWave()`.\n\n### **🏜️ Platt öken**\n\n`WorldMapController` → `createDesertFlat()` → `addSandRibbon()`, `addSandGrain()` och `noise()`.\n\n### **⛰️ Kuperad öken**\n\n`WorldMapController` → `createDesertHills()` → `createDesertFlat()` → `addDune()`.\n\n---",
        "### **🖼️ Två nivåer av grafik**\n\nBiblioteket skiljer mellan små ikoner och detaljerade terrängbilder.\n\n**Ikonerna** använder ett 24 × 24-koordinatsystem och är avsedda att representera ett begrepp.\n\n**Terrängbilderna** använder hexagonens större koordinatsystem och innehåller många fler grafiska detaljer.\n\nDet är därför `createDesertIcon()` och `createDesertFlat()` är två olika funktioner.\n\n### **♻️ Återanvändning genom sammansättning**\n\n`createDesertHills()` börjar med att skapa en platt öken och lägger sedan till kullarna.\n\nDetta är ett konkret exempel på hur en mer avancerad funktion kan byggas ovanpå en enklare.\n\n### **🎲 Kontrollerad variation**\n\n`noise()` används för att ge sandkornen variation.\n\nEftersom funktionen är deterministisk kan samma frö ge samma resultat igen.\n\n### **🛡️ Defensiv programmering**\n\n`createDesertHills()` kontrollerar att de SVG-definitioner som behövs faktiskt finns.\n\nOm de saknas kastas ett tydligt fel i stället för att fortsätta med en ofullständig grafikstruktur.\n\n---"
      ]
    },
    {
      "path": "src/library-svg-graphics/terrain/coast.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🏛️ 2\\. Wonders — Världens underverk**\n\n\nDessa sex funktioner skapar symboler för olika underverk.\n\nVarje ikon byggs av geometriska SVG-element och returneras utan att monteras i dokumentet."
        },
        {
          "kind": "prose",
          "text": "## **🌊 3\\. Coast — Den detaljerade kustterrängen**\n\n\nHär lämnar vi de små 24 × 24-ikonerna.\n\nDen här modulen bygger i stället en större och mer detaljerad kusthexagon som används på kartan, i verktygspanelen och i uppslagsverket."
        },
        {
          "kind": "function",
          "name": "createCoast()",
          "identifier": "createCoast()",
          "anchor": "createCoast",
          "line": 6,
          "text": "Skapar en kusthexagon med färggradient, vattenfläckar och sex vågor.\n\n**Arbetsgång:**\n\n1. Ökar modulräknaren `coastSerial`.  \n2. Skapar unika id för klippmask och gradient.  \n3. Skapar SVG-roten med `viewBox` från `HEX_BOUNDS`.  \n4. Skapar en klippolygon från hexagonens punkter.  \n5. Skapar en färggradient.  \n6. Lägger till två ellipsformade ljus- och mörkerpartier.  \n7. Anropar `addWave()` sex gånger.  \n8. Returnerar den färdiga kustgrafiken.\n\n**Gradientens färger:**\n\n* `#3f9bb4`  \n* `#2d829f`  \n* `#206b89`\n\n**Grafiska detaljer:**\n\n* Ljus ellips: `#74c0cf`.  \n* Mörk ellips: `#17617f`.  \n* Sex vågor i olika positioner och längder.\n\n**Unika id:n:**\n\n`coast-clip-N`\n\n`coast-gradient-N`\n\nDär `N` är det aktuella serienumret.\n\n🔗 **Bekräftade anropare:**\n\n* `TerrainButton` för `coast`.  \n* `CivWikiTerrains.#createGraphic()`.  \n* `WorldMapController` via terrängnyckeln `coast-flat`.\n\n⚙️ **Effekt:** Returnerar en omonterad SVG med `preserveAspectRatio=\"none\"`.\n\nModulräknaren ökas vid varje anrop.\n\n💡 **Viktig skillnad:** `createCoastIcon()` skapar en liten symbol för kust. `createCoast()` skapar den detaljerade kustterrängen."
        },
        {
          "kind": "function",
          "name": "addWave()",
          "identifier": "addWave()",
          "anchor": "addWave",
          "line": 91,
          "text": "Ritar en våg på en bestämd plats i kusthexagonen.\n\n**Arbetsgång:**\n\n1. Tar emot vågens relativa position och längd.  \n2. Multiplicerar positionerna med `HEX_BOUNDS`.  \n3. Beräknar kurvans höjd.  \n4. Skapar en SVG-`path`.  \n5. Lägger till den i föräldern.\n\n**Vågens egenskaper:**\n\n* Kurvhöjd: 1,8 % av hexagonens höjd.  \n* Färg: `#b9e0e7`.  \n* Linjebredd: `2.2`.  \n* Opacitet: `0.28`.  \n* Rundade linjeändar.\n\n🔗 **Anropas endast av:** `createCoast()`.\n\n⚙️ **Effekt:** Lägger till en SVG-bana.\n\n💡 **Begrepp — Relativa koordinater:** Positioner anges som andelar av en ytas storlek i stället för som fasta pixelvärden."
        },
        {
          "kind": "function",
          "name": "pointsAttribute()",
          "identifier": "pointsAttribute()",
          "anchor": "pointsAttribute",
          "line": 120,
          "text": "Omvandlar hexagonens hörnpunkter till den sträng som SVG `polygon`\\-element behöver.\n\n**Arbetsgång:**\n\n1. Läser `HEX_POINTS`.  \n2. Omvandlar varje punkt till textformatet `x,y`.  \n3. Fogar samman punkterna med mellanslag.  \n4. Returnerar strängen.\n\n**Exempel på format:**\n\n`0,10 20,0 40,10 40,30 20,40 0,30`\n\nDetta är ett illustrativt exempel på formatet, inte de faktiska koordinaterna i biblioteket.\n\n🔗 **Anropas endast av:** `createCoast()`.\n\n⚙️ **Effekt:** Returnerar en sträng utan att ändra DOM.\n\n---"
        }
      ],
      "notes": [
        "### **🌱 Terrängikon**\n\n`createIcon()` → `createGrassIcon()` → `hex()` och `stroke()`.\n\n### **🏛️ Underverksikon**\n\n`createIcon()` → `createGardensIcon()` → `tree()`.\n\n### **🌊 Detaljerad kust**\n\n`WorldMapController` → `createCoast()` → `pointsAttribute()` och sex anrop till `addWave()`.\n\n### **🏜️ Platt öken**\n\n`WorldMapController` → `createDesertFlat()` → `addSandRibbon()`, `addSandGrain()` och `noise()`.\n\n### **⛰️ Kuperad öken**\n\n`WorldMapController` → `createDesertHills()` → `createDesertFlat()` → `addDune()`.\n\n---",
        "### **🖼️ Två nivåer av grafik**\n\nBiblioteket skiljer mellan små ikoner och detaljerade terrängbilder.\n\n**Ikonerna** använder ett 24 × 24-koordinatsystem och är avsedda att representera ett begrepp.\n\n**Terrängbilderna** använder hexagonens större koordinatsystem och innehåller många fler grafiska detaljer.\n\nDet är därför `createDesertIcon()` och `createDesertFlat()` är två olika funktioner.\n\n### **♻️ Återanvändning genom sammansättning**\n\n`createDesertHills()` börjar med att skapa en platt öken och lägger sedan till kullarna.\n\nDetta är ett konkret exempel på hur en mer avancerad funktion kan byggas ovanpå en enklare.\n\n### **🎲 Kontrollerad variation**\n\n`noise()` används för att ge sandkornen variation.\n\nEftersom funktionen är deterministisk kan samma frö ge samma resultat igen.\n\n### **🛡️ Defensiv programmering**\n\n`createDesertHills()` kontrollerar att de SVG-definitioner som behövs faktiskt finns.\n\nOm de saknas kastas ett tydligt fel i stället för att fortsätta med en ofullständig grafikstruktur.\n\n---"
      ]
    },
    {
      "path": "src/library-svg-graphics/terrain/desert.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🏛️ 2\\. Wonders — Världens underverk**\n\n\nDessa sex funktioner skapar symboler för olika underverk.\n\nVarje ikon byggs av geometriska SVG-element och returneras utan att monteras i dokumentet."
        },
        {
          "kind": "prose",
          "text": "## **🏜️ 4\\. Desert — Procedurgenererad platt öken**\n\n\nDen här modulen är betydligt mer avancerad än de små ökenikonerna.\n\nDen skapar ett detaljerat sandlandskap med gradienter, ljusfläckar, vindband och hundratals sandkorn."
        },
        {
          "kind": "function",
          "name": "createDesertFlat()",
          "identifier": "createDesertFlat()",
          "anchor": "createDesertFlat",
          "line": 7,
          "text": "Skapar en platt ökenhexagon.\n\n**Arbetsgång:**\n\n1. Ökar modulräknaren `desertSerial`.  \n2. Skapar unika id för klippmask och gradient.  \n3. Skapar en sandfärgad SVG-grund.  \n4. Lägger till fyra ljusa ellipser.  \n5. Ritar sex diagonala sandband.  \n6. Genererar sex band med sandkorn.  \n7. Sprider ytterligare sandkorn över ytan.  \n8. Returnerar den färdiga terränggrafiken.\n\n**Gradientens färger:**\n\n* `#f8db88`  \n* `#f4d17a`  \n* `#edc36d`\n\n**Ljusfläckar:**\n\nFyra ellipser med:\n\n* Färg: `#ffe8a0`.  \n* Opacitet: `0.18`.\n\n**Sandkorn:**\n\n* 6 band × 72 korn \\= 432 korn.  \n* Ytterligare 85 spridda korn.  \n* Totalt 517 anrop till `addSandGrain()`.\n\n🔗 **Bekräftade anropare:**\n\n* `TerrainButton` för `desert`.  \n* Wikins `Desert — Flat`.  \n* `WorldMapController` via `desert-flat`.  \n* `createDesertHills()`.  \n* `createDesertMountains()`.\n\n⚙️ **Effekt:** Returnerar en omonterad SVG och ökar modulräknaren.\n\n💡 **Begrepp — Procedural Generation:** Grafik skapas genom algoritmer och matematiska regler i stället för genom en färdig bildfil."
        },
        {
          "kind": "function",
          "name": "addSandRibbon()",
          "identifier": "addSandRibbon()",
          "anchor": "addSandRibbon",
          "line": 141,
          "text": "Ritar ett diagonalt sandband med två lager.\n\n**Arbetsgång:**\n\n1. Beräknar sandbandets slutpunkt.  \n2. Flyttar slutpunkten åt höger och uppåt.  \n3. Ritar en bred, mörkare bas.  \n4. Ritar en smalare, ljusare kant ovanpå.\n\n**Mörkare bas:**\n\n* Färg: `#e5b965`.  \n* Linjebredd: `17`.  \n* Opacitet: `0.11`.\n\n**Ljusare kant:**\n\n* Färg: `#ffe9a1`.  \n* Linjebredd: `9`.  \n* Opacitet: `0.20`.\n\nDen ljusare linjen förskjuts fem enheter uppåt.\n\n🔗 **Anropas endast av:** `createDesertFlat()`.\n\n⚙️ **Effekt:** Lägger till två SVG-banor."
        },
        {
          "kind": "function",
          "name": "addSandGrain()",
          "identifier": "addSandGrain()",
          "anchor": "addSandGrain",
          "line": 182,
          "text": "Ritar ett enskilt sandkorn.\n\n**Arbetsgång:**\n\n1. Tar emot position och ett numeriskt frö.  \n2. Använder `noise()` för att variera storlek och opacitet.  \n3. Väljer en av två sandfärger.  \n4. Skapar en ellips.  \n5. Lägger till ellipsen i grafiken.\n\n**Storlek:**\n\nRadien varierar mellan `0.55` och `1.35`.\n\n**Färgval:**\n\n* `#b98753` när fröet är delbart med 3\\.  \n* `#ce9f5b` annars.\n\nStandardopacitet: `0.55`.\n\n🔗 **Anropas av:** De två sandkornsslingorna i `createDesertFlat()`.\n\n⚙️ **Effekt:** Lägger till en ellips."
        },
        {
          "kind": "function",
          "name": "noise()",
          "identifier": "noise()",
          "anchor": "noise",
          "line": 204,
          "text": "Beräknar ett upprepbart tal mellan 0 och 1 utifrån ett numeriskt frö.\n\n**Beräkning:**\n\nBråkdelen av:\n\n`sin(seed * 12.9898 + 78.233) * 43758.5453`\n\n**Användning:**\n\n* Varierar sandkornens storlek.  \n* Varierar deras opacitet.  \n* Bidrar till att sprida sandkornen.\n\n🔗 **Anropas av:** `createDesertFlat()` och `addSandGrain()`.\n\n⚙️ **Effekt:** Returnerar ett tal utan att ändra DOM.\n\n💡 **Begrepp — Deterministic Pseudorandomness:** Samma frö ger samma resultat varje gång, trots att resultatet kan se slumpmässigt ut.\n\nDet är användbart när grafiken ska få ett naturligt utseende men ändå vara reproducerbar.\n\n---"
        }
      ],
      "notes": [
        "### **🌱 Terrängikon**\n\n`createIcon()` → `createGrassIcon()` → `hex()` och `stroke()`.\n\n### **🏛️ Underverksikon**\n\n`createIcon()` → `createGardensIcon()` → `tree()`.\n\n### **🌊 Detaljerad kust**\n\n`WorldMapController` → `createCoast()` → `pointsAttribute()` och sex anrop till `addWave()`.\n\n### **🏜️ Platt öken**\n\n`WorldMapController` → `createDesertFlat()` → `addSandRibbon()`, `addSandGrain()` och `noise()`.\n\n### **⛰️ Kuperad öken**\n\n`WorldMapController` → `createDesertHills()` → `createDesertFlat()` → `addDune()`.\n\n---",
        "### **🖼️ Två nivåer av grafik**\n\nBiblioteket skiljer mellan små ikoner och detaljerade terrängbilder.\n\n**Ikonerna** använder ett 24 × 24-koordinatsystem och är avsedda att representera ett begrepp.\n\n**Terrängbilderna** använder hexagonens större koordinatsystem och innehåller många fler grafiska detaljer.\n\nDet är därför `createDesertIcon()` och `createDesertFlat()` är två olika funktioner.\n\n### **♻️ Återanvändning genom sammansättning**\n\n`createDesertHills()` börjar med att skapa en platt öken och lägger sedan till kullarna.\n\nDetta är ett konkret exempel på hur en mer avancerad funktion kan byggas ovanpå en enklare.\n\n### **🎲 Kontrollerad variation**\n\n`noise()` används för att ge sandkornen variation.\n\nEftersom funktionen är deterministisk kan samma frö ge samma resultat igen.\n\n### **🛡️ Defensiv programmering**\n\n`createDesertHills()` kontrollerar att de SVG-definitioner som behövs faktiskt finns.\n\nOm de saknas kastas ett tydligt fel i stället för att fortsätta med en ofullständig grafikstruktur.\n\n---"
      ]
    },
    {
      "path": "src/library-svg-graphics/terrain/desert-hills.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🏛️ 2\\. Wonders — Världens underverk**\n\n\nDessa sex funktioner skapar symboler för olika underverk.\n\nVarje ikon byggs av geometriska SVG-element och returneras utan att monteras i dokumentet."
        },
        {
          "kind": "prose",
          "text": "## **⛰️ 5\\. Desert Hills — Öken med sanddyner**\n\n\nDen här modulen återanvänder den platta öknen och bygger vidare på den med sanddyner."
        },
        {
          "kind": "function",
          "name": "createDesertHills()",
          "identifier": "createDesertHills()",
          "anchor": "createDesertHills",
          "line": 8,
          "text": "Skapar en kuperad öken med fem dyner.\n\n**Arbetsgång:**\n\n1. Anropar `createDesertFlat()` för att skapa grundterrängen.  \n2. Hämtar SVG-elementets `defs`.  \n3. Kontrollerar att definitionerna finns.  \n4. Hämtar hexagonens klippolygon.  \n5. Kontrollerar att klippolygonen finns.  \n6. Klonar klippolygonen.  \n7. Skapar ett nytt klipp-id.  \n8. Skapar en gradient för dynerna.  \n9. Anropar `addDune()` fem gånger.  \n10. Returnerar den utökade SVG-grafiken.\n\n**Felhantering:**\n\nOm `defs` saknas kastas:\n\n`Desert SVG is missing its definitions`\n\nOm klippolygonen saknas kastas:\n\n`Desert SVG is missing its hexagon clipping polygon`\n\n**Dyn-gradientens färger:**\n\n* `#ffe29a`  \n* `#f2c46f`  \n* `#b97847`\n\n**Dynpositioner och storlekar:**\n\n| Dyn | x | y | Bredd | Höjd |\n| ----- | ----- | ----- | ----- | ----- |\n| 1 | −70 | −35 | 62 | 37 |\n| 2 | −29 | −49 | 81 | 49 |\n| 3 | 23 | −30 | 54 | 33 |\n| 4 | −48 | 7 | 57 | 30 |\n| 5 | 10 | 10 | 64 | 34 |\n\n🔗 **Bekräftade anropare:**\n\n* `TerrainButton` för `desert-hills`.  \n* Wikins `Desert — Hills`.  \n* `WorldMapController` via `desert-hills`.\n\n⚙️ **Effekt:** Returnerar SVG-elementet från `createDesertFlat()`, nu med tillagda dyner.\n\nRäknaren `hillsSerial` ökas.\n\n💡 **Arkitekturprincip — Composition:** Kuperad öken byggs ovanpå den redan färdiga platta öknen i stället för att hela terränggrafiken skapas från början igen."
        },
        {
          "kind": "function",
          "name": "addDune()",
          "identifier": "addDune()",
          "anchor": "addDune",
          "line": 64,
          "text": "En nästlad hjälpfunktion som ritar en enskild sanddyn.\n\n**Dynens fem grafiska delar:**\n\n1. Skugga.  \n2. Dynens huvudkropp.  \n3. Solbelyst sida.  \n4. Skuggad läsida.  \n5. Kamlinje.\n\n**Färger och egenskaper:**\n\n| Del | Färg | Opacitet |\n| ----- | ----- | ----- |\n| Skugga | `#a96a40` | Enligt SVG-attribut |\n| Kropp | Dyn-gradient | Enligt SVG-attribut |\n| Solsida | `#ffe5a0` | 0,72 |\n| Läsida | `#bb784b` | 0,35 |\n| Kamlinje | `#fff0b7` | Enligt SVG-attribut |\n\nKroppens konturfärg är `#c58a53`.\n\n**Skalning:**\n\nPosition och storlek multipliceras med:\n\n`HEX_BOUNDS.width / 260`\n\nDet gör att dynens geometri anpassas efter hexagonens faktiska bredd.\n\n🔗 **Anropas endast av:** `createDesertHills()`.\n\n⚙️ **Effekt:** Lägger till en ellips och fyra SVG-banor i dyngruppen.\n\n---"
        }
      ],
      "notes": [
        "### **🌱 Terrängikon**\n\n`createIcon()` → `createGrassIcon()` → `hex()` och `stroke()`.\n\n### **🏛️ Underverksikon**\n\n`createIcon()` → `createGardensIcon()` → `tree()`.\n\n### **🌊 Detaljerad kust**\n\n`WorldMapController` → `createCoast()` → `pointsAttribute()` och sex anrop till `addWave()`.\n\n### **🏜️ Platt öken**\n\n`WorldMapController` → `createDesertFlat()` → `addSandRibbon()`, `addSandGrain()` och `noise()`.\n\n### **⛰️ Kuperad öken**\n\n`WorldMapController` → `createDesertHills()` → `createDesertFlat()` → `addDune()`.\n\n---",
        "### **🖼️ Två nivåer av grafik**\n\nBiblioteket skiljer mellan små ikoner och detaljerade terrängbilder.\n\n**Ikonerna** använder ett 24 × 24-koordinatsystem och är avsedda att representera ett begrepp.\n\n**Terrängbilderna** använder hexagonens större koordinatsystem och innehåller många fler grafiska detaljer.\n\nDet är därför `createDesertIcon()` och `createDesertFlat()` är två olika funktioner.\n\n### **♻️ Återanvändning genom sammansättning**\n\n`createDesertHills()` börjar med att skapa en platt öken och lägger sedan till kullarna.\n\nDetta är ett konkret exempel på hur en mer avancerad funktion kan byggas ovanpå en enklare.\n\n### **🎲 Kontrollerad variation**\n\n`noise()` används för att ge sandkornen variation.\n\nEftersom funktionen är deterministisk kan samma frö ge samma resultat igen.\n\n### **🛡️ Defensiv programmering**\n\n`createDesertHills()` kontrollerar att de SVG-definitioner som behövs faktiskt finns.\n\nOm de saknas kastas ett tydligt fel i stället för att fortsätta med en ofullständig grafikstruktur.\n\n---"
      ]
    },
    {
      "path": "src/library-svg-graphics/terrain/desert-mountains.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🏜️ 1\\. Desert Mountains — Bergig öken**"
        },
        {
          "kind": "function",
          "name": "createDesertMountains()",
          "identifier": "createDesertMountains()",
          "anchor": "createDesertMountains",
          "line": 8,
          "text": "Skapar en bergig öken genom att lägga två berg med snötoppar ovanpå en platt ökenhexagon.\n\n**Arbetsgång:**\n\n1. Anropar `createDesertFlat()` för att skapa ökengrunden.  \n2. Kontrollerar att SVG-elementets `defs` finns.  \n3. Skapar en ny klippolygon från `HEX_POINTS`.  \n4. Tilldelar klippmasken ett unikt id: `desert-mountains-N`.  \n5. Skapar en berggrupp som skalas efter hexagonens storlek.  \n6. Ritar markskugga, bakre berg och främre berg.  \n7. Lägger till sluttningar, snökalotter, snöskuggor och åsar.  \n8. Avslutar med en sandfärgad bergfot.\n\n**Geometri:**\n\nSkalfaktorn är `HEX_BOUNDS.width / 260`.\n\nBerggruppen placeras kring den relativa mittpunkten `(0.5, 0.54)`.\n\n**Färger och detaljer:**\n\n* Markskugga: `#b88c4f`, opacitet `0.28`.  \n* Bakre berg: `#777087`.  \n* Bakre östsida: `#48475f`.  \n* Bakre snö: `#f0eee8`.  \n* Främre berg: `#a38b88`.  \n* Främre sluttningar: `#c6a69a`, `#55546c`, `#917c87`.  \n* Snökalott: `#f3f1e9`.  \n* Sandfot: `#d8aa65`, opacitet `0.72`.\n\nOm `defs` saknas kastas felet:\n\n`Desert SVG is missing its definitions`\n\n🔗 **Bekräftade anropare:** `TerrainButton`, `CivWikiTerrains` och `WorldMapController` via `desert-mountain`.\n\n⚙️ **Effekt:** Returnerar ökengrundens SVG med berg tillagda. `mountainsSerial` ökas.\n\n💡 **Arkitektur:** Funktionen återanvänder den platta öknen men skapar själv bergens SVG-geometri.\n\n---"
        }
      ],
      "notes": [
        "### **🌱 Gräs**\n\n`createGrassFlat()` → `addGrassTuft()`\n\n`createGrassHills()` → `createGrassFlat()` \\+ `addHill()`\n\n`createGrassMountains()` → `createGrassFlat()` \\+ berggrafik\n\n### **🌾 Slätt**\n\n`createPlainsFlat()` → `addDryGrass()` \\+ `addGroundTrace()`\n\n`createPlainsHills()` → `createPlainsFlat()` \\+ `addHill()`\n\n`createPlainsMountains()` → `createPlainsFlat()` \\+ berggrafik\n\n### **❄️ Snö**\n\n`createSnowFlat()` → `noise()` \\+ snötexturer\n\n`createSnowHills()` → `createSnowFlat()` \\+ `addHill()`\n\n`createSnowMountains()` → `createSnowFlat()` \\+ berggrafik\n\n### **🌊 Hav**\n\n`createOcean()` → `pointsAttribute()` \\+ `addWave()`\n\n---",
        "### **🧩 Composition — Sammansättning**\n\nKullar och berg skapas ovanpå en färdig grundterräng.\n\nDet betyder att grundens färger och texturer kan återanvändas.\n\n### **🎨 Separation of Concerns — Ansvarsuppdelning**\n\nTerrängmodulerna ansvarar för SVG-grafiken.\n\nDe ändrar inte hexagonernas terrängvärden i Convex.\n\n### **♻️ Gemensamma mönster**\n\nGräs, slätt, öken och snö använder liknande uppbyggnad:\n\n* Grundhexagon med gradient.  \n* Klippmask för att hålla grafiken inom hexagonen.  \n* Terrängspecifika texturer.  \n* Kullar eller berg som separata överlägg.\n\n### **🔁 Liknande kod i olika moduler**\n\nBergmodulerna återanvänder samma grundläggande silhuett och kullmodulerna samma positionsuppsättningar.\n\nDet är en möjlig framtida refaktoreringspunkt, men inventeringen visar inte att någon sådan gemensam berg- eller kullgenerator redan finns.\n\n---"
      ]
    },
    {
      "path": "src/library-svg-graphics/terrain/grass.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🌱 2\\. Grass — Platt gräsmark**"
        },
        {
          "kind": "function",
          "name": "createGrassFlat()",
          "identifier": "createGrassFlat()",
          "anchor": "createGrassFlat",
          "line": 7,
          "text": "Skapar en grön hexagon med färggradient, ljusa markfläckar och åtta grästuvor.\n\n**Arbetsgång:**\n\n1. Skapar SVG-roten.  \n2. Skapar klippmasken `grass-clip-N`.  \n3. Skapar den lodräta gradienten `grass-gradient-N`.  \n4. Ritar fyra ljusa färgfläckar.  \n5. Anropar `addGrassTuft()` åtta gånger.  \n6. Returnerar grafiken.\n\n**Gradient:**\n\n`#82964a` → `#788d42` → `#687f39`\n\n**Färgfläckar:**\n\n* Färg: `#a1a95b`.  \n* Opacitet: `0.11`.\n\n**Grästuvornas skalor:**\n\n`0.9`, `0.7`, `1.0`, `0.8`, `0.9`, `0.75`, `1.0`, `0.7`.\n\n🔗 **Bekräftade anropare:** `TerrainButton`, `CivWikiTerrains`, `WorldMapController`, `createGrassHills()` och `createGrassMountains()`.\n\n⚙️ **Effekt:** Returnerar en omonterad SVG och ökar `grassSerial`."
        },
        {
          "kind": "function",
          "name": "addGrassTuft()",
          "identifier": "addGrassTuft()",
          "anchor": "addGrassTuft",
          "line": 102,
          "text": "Ritar fyra grässtrån som utgår från samma baspunkt.\n\n**Arbetsgång:**\n\n1. Tar emot en relativ position.  \n2. Omvandlar positionen med `HEX_BOUNDS`.  \n3. Använder `scale` för att anpassa utbredningen.  \n4. Ritar fyra strån som en SVG-bana.\n\n**Grafiska egenskaper:**\n\n* Färg: `#405e2d`.  \n* Linjebredd: `1.8 * scale`.  \n* Opacitet: `0.35`.  \n* Rundade linjeändar.\n\n🔗 **Anropas endast av:** `createGrassFlat()`.\n\n⚙️ **Effekt:** Lägger till ett `path`\\-element.\n\n💡 **Begrepp — Skalbar hjälpfunktion:** Samma ritfunktion kan skapa både små och stora grästuvor genom att ändra en parameter.\n\n---"
        }
      ],
      "notes": [
        "### **🌱 Gräs**\n\n`createGrassFlat()` → `addGrassTuft()`\n\n`createGrassHills()` → `createGrassFlat()` \\+ `addHill()`\n\n`createGrassMountains()` → `createGrassFlat()` \\+ berggrafik\n\n### **🌾 Slätt**\n\n`createPlainsFlat()` → `addDryGrass()` \\+ `addGroundTrace()`\n\n`createPlainsHills()` → `createPlainsFlat()` \\+ `addHill()`\n\n`createPlainsMountains()` → `createPlainsFlat()` \\+ berggrafik\n\n### **❄️ Snö**\n\n`createSnowFlat()` → `noise()` \\+ snötexturer\n\n`createSnowHills()` → `createSnowFlat()` \\+ `addHill()`\n\n`createSnowMountains()` → `createSnowFlat()` \\+ berggrafik\n\n### **🌊 Hav**\n\n`createOcean()` → `pointsAttribute()` \\+ `addWave()`\n\n---",
        "### **🧩 Composition — Sammansättning**\n\nKullar och berg skapas ovanpå en färdig grundterräng.\n\nDet betyder att grundens färger och texturer kan återanvändas.\n\n### **🎨 Separation of Concerns — Ansvarsuppdelning**\n\nTerrängmodulerna ansvarar för SVG-grafiken.\n\nDe ändrar inte hexagonernas terrängvärden i Convex.\n\n### **♻️ Gemensamma mönster**\n\nGräs, slätt, öken och snö använder liknande uppbyggnad:\n\n* Grundhexagon med gradient.  \n* Klippmask för att hålla grafiken inom hexagonen.  \n* Terrängspecifika texturer.  \n* Kullar eller berg som separata överlägg.\n\n### **🔁 Liknande kod i olika moduler**\n\nBergmodulerna återanvänder samma grundläggande silhuett och kullmodulerna samma positionsuppsättningar.\n\nDet är en möjlig framtida refaktoreringspunkt, men inventeringen visar inte att någon sådan gemensam berg- eller kullgenerator redan finns.\n\n---"
      ]
    },
    {
      "path": "src/library-svg-graphics/terrain/grass-hills.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🌄 3\\. Grass Hills — Kuperad gräsmark**"
        },
        {
          "kind": "function",
          "name": "createGrassHills()",
          "identifier": "createGrassHills()",
          "anchor": "createGrassHills",
          "line": 8,
          "text": "Bygger fem gröna kullar ovanpå en platt gräshexagon.\n\n**Arbetsgång:**\n\n1. Anropar `createGrassFlat()`.  \n2. Kontrollerar att `defs` finns.  \n3. Kontrollerar att grundens klippolygon finns.  \n4. Klonar polygonen till `grass-hills-clip-N`.  \n5. Skapar kullgradienten `grass-hills-gradient-N`.  \n6. Anropar `addHill()` fem gånger.  \n7. Returnerar den utökade SVG-grafiken.\n\n**Kullgradient:**\n\n`#a9b965` → `#80984a` → `#4d7037`\n\nGradienten löper från `(0, 0)` till `(0.85, 1)`.\n\n**Kullarnas mått:**\n\n| Kulle | x | y | Bredd | Höjd |\n| ----- | ----- | ----- | ----- | ----- |\n| 1 | −70 | −35 | 62 | 37 |\n| 2 | −29 | −49 | 81 | 49 |\n| 3 | 23 | −30 | 54 | 33 |\n| 4 | −48 | 7 | 57 | 30 |\n| 5 | 10 | 10 | 64 | 34 |\n\n**Felhantering:**\n\n`Grass SVG is missing its definitions`\n\n`Grass SVG is missing its hexagon clipping polygon`\n\n🔗 **Bekräftade anropare:** `TerrainButton`, `CivWikiTerrains` och `WorldMapController` via `grass-hills`.\n\n⚙️ **Effekt:** Returnerar samma SVG med fem kullar tillagda. `hillsSerial` ökas."
        },
        {
          "kind": "function",
          "name": "addHill()",
          "identifier": "addHill()",
          "anchor": "addHill",
          "line": 64,
          "text": "En nästlad funktion som ritar en enskild gräskulle.\n\n**Tre grafiska delar:**\n\n1. Markskugga.  \n2. Kullens kropp.  \n3. Solbelyst sluttning.\n\n**Egenskaper:**\n\n* Skugga: `#385b2f`, opacitet `0.18`.  \n* Kropp: kullgradienten.  \n* Kontur: `#5b773b`.  \n* Solsida: `#b5c371`, opacitet `0.48`.\n\nKroppens kontur har linjebredden `1.1 * scale`.\n\nKullens position utgår från hexagonens relativa mittpunkt `(0.5, 0.49)`.\n\n🔗 **Anropas endast av:** `createGrassHills()`.\n\n⚙️ **Effekt:** Lägger till en ellips och två SVG-banor.\n\n---"
        }
      ],
      "notes": [
        "### **🌱 Gräs**\n\n`createGrassFlat()` → `addGrassTuft()`\n\n`createGrassHills()` → `createGrassFlat()` \\+ `addHill()`\n\n`createGrassMountains()` → `createGrassFlat()` \\+ berggrafik\n\n### **🌾 Slätt**\n\n`createPlainsFlat()` → `addDryGrass()` \\+ `addGroundTrace()`\n\n`createPlainsHills()` → `createPlainsFlat()` \\+ `addHill()`\n\n`createPlainsMountains()` → `createPlainsFlat()` \\+ berggrafik\n\n### **❄️ Snö**\n\n`createSnowFlat()` → `noise()` \\+ snötexturer\n\n`createSnowHills()` → `createSnowFlat()` \\+ `addHill()`\n\n`createSnowMountains()` → `createSnowFlat()` \\+ berggrafik\n\n### **🌊 Hav**\n\n`createOcean()` → `pointsAttribute()` \\+ `addWave()`\n\n---",
        "### **🧩 Composition — Sammansättning**\n\nKullar och berg skapas ovanpå en färdig grundterräng.\n\nDet betyder att grundens färger och texturer kan återanvändas.\n\n### **🎨 Separation of Concerns — Ansvarsuppdelning**\n\nTerrängmodulerna ansvarar för SVG-grafiken.\n\nDe ändrar inte hexagonernas terrängvärden i Convex.\n\n### **♻️ Gemensamma mönster**\n\nGräs, slätt, öken och snö använder liknande uppbyggnad:\n\n* Grundhexagon med gradient.  \n* Klippmask för att hålla grafiken inom hexagonen.  \n* Terrängspecifika texturer.  \n* Kullar eller berg som separata överlägg.\n\n### **🔁 Liknande kod i olika moduler**\n\nBergmodulerna återanvänder samma grundläggande silhuett och kullmodulerna samma positionsuppsättningar.\n\nDet är en möjlig framtida refaktoreringspunkt, men inventeringen visar inte att någon sådan gemensam berg- eller kullgenerator redan finns.\n\n---"
      ]
    },
    {
      "path": "src/library-svg-graphics/terrain/grass-mountains.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🏔️ 4\\. Grass Mountains — Bergig gräsmark**"
        },
        {
          "kind": "function",
          "name": "createGrassMountains()",
          "identifier": "createGrassMountains()",
          "anchor": "createGrassMountains",
          "line": 8,
          "text": "Skapar en gräshexagon med samma grundläggande bergsilhuett som den bergiga öknen.\n\n**Arbetsgång:**\n\n1. Skapar grunden med `createGrassFlat()`.  \n2. Kontrollerar att `defs` finns.  \n3. Skapar klippmasken `grass-mountains-clip-N`.  \n4. Ritar bergens silhuetter och sluttningar.  \n5. Anpassar markskugga och bergfot till gräsmarkens färger.  \n6. Returnerar grafiken.\n\n**Skillnader mot ökenbergen:**\n\n* Markskugga: `#354b2c`.  \n* Gräsfot: `#55753d`.  \n* Båda använder opacitet `0.28` respektive `0.72`.\n\nBergens övriga stenfärger och SVG-banornas geometri följer `createDesertMountains()`.\n\n🔗 **Bekräftade anropare:** `TerrainButton`, `CivWikiTerrains` och `WorldMapController` via `grass-mountain`.\n\n⚙️ **Effekt:** Returnerar gräshexagonen med berg. Modulens `mountainsSerial` ökas.\n\n💡 **Arkitektur:** Bergsiluetten återkommer i flera terrängtyper. Inventeringen beskriver liknande geometri, men visar inte att de olika bergmodulerna anropar en gemensam bergfunktion.\n\n---"
        }
      ],
      "notes": [
        "### **🌱 Gräs**\n\n`createGrassFlat()` → `addGrassTuft()`\n\n`createGrassHills()` → `createGrassFlat()` \\+ `addHill()`\n\n`createGrassMountains()` → `createGrassFlat()` \\+ berggrafik\n\n### **🌾 Slätt**\n\n`createPlainsFlat()` → `addDryGrass()` \\+ `addGroundTrace()`\n\n`createPlainsHills()` → `createPlainsFlat()` \\+ `addHill()`\n\n`createPlainsMountains()` → `createPlainsFlat()` \\+ berggrafik\n\n### **❄️ Snö**\n\n`createSnowFlat()` → `noise()` \\+ snötexturer\n\n`createSnowHills()` → `createSnowFlat()` \\+ `addHill()`\n\n`createSnowMountains()` → `createSnowFlat()` \\+ berggrafik\n\n### **🌊 Hav**\n\n`createOcean()` → `pointsAttribute()` \\+ `addWave()`\n\n---",
        "### **🧩 Composition — Sammansättning**\n\nKullar och berg skapas ovanpå en färdig grundterräng.\n\nDet betyder att grundens färger och texturer kan återanvändas.\n\n### **🎨 Separation of Concerns — Ansvarsuppdelning**\n\nTerrängmodulerna ansvarar för SVG-grafiken.\n\nDe ändrar inte hexagonernas terrängvärden i Convex.\n\n### **♻️ Gemensamma mönster**\n\nGräs, slätt, öken och snö använder liknande uppbyggnad:\n\n* Grundhexagon med gradient.  \n* Klippmask för att hålla grafiken inom hexagonen.  \n* Terrängspecifika texturer.  \n* Kullar eller berg som separata överlägg.\n\n### **🔁 Liknande kod i olika moduler**\n\nBergmodulerna återanvänder samma grundläggande silhuett och kullmodulerna samma positionsuppsättningar.\n\nDet är en möjlig framtida refaktoreringspunkt, men inventeringen visar inte att någon sådan gemensam berg- eller kullgenerator redan finns.\n\n---"
      ]
    },
    {
      "path": "src/library-svg-graphics/terrain/ocean.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🌊 5\\. Ocean — Djupt hav**"
        },
        {
          "kind": "function",
          "name": "createOcean()",
          "identifier": "createOcean()",
          "anchor": "createOcean",
          "line": 6,
          "text": "Skapar en havshexagon med mörkblå gradient, två färgfläckar och sex vågor.\n\n**Arbetsgång:**\n\n1. Ökar `oceanSerial`.  \n2. Skapar `ocean-clip-N`.  \n3. Skapar `ocean-gradient-N`.  \n4. Använder `pointsAttribute()` för klippolygonen.  \n5. Ritar havsytan.  \n6. Lägger till två ellipser.  \n7. Anropar `addWave()` sex gånger.\n\n**Gradient:**\n\n`#164f70` → `#0e4664` → `#0a3854`\n\n**Ellipser:**\n\n* Ljusare vatten: `#28718e`.  \n* Mörkare vatten: `#062f49`.\n\n🔗 **Bekräftade anropare:** `TerrainButton`, `CivWikiTerrains` och `WorldMapController` via `ocean-flat`.\n\n⚙️ **Effekt:** Returnerar en omonterad SVG och ökar räknaren."
        },
        {
          "kind": "function",
          "name": "addWave()",
          "identifier": "addWave()",
          "anchor": "addWave",
          "line": 91,
          "text": "Ritar en enskild våg med position och längd uttryckta som andelar av hexagonens mått.\n\n**Grafiska egenskaper:**\n\n* Färg: `#82b9ca`.  \n* Linjebredd: `2.2`.  \n* Opacitet: `0.22`.  \n* Rundade linjeändar.  \n* Kurvhöjd: 1,8 % av hexagonens höjd.\n\n🔗 **Anropas endast av:** `createOcean()`.\n\n⚙️ **Effekt:** Lägger till en SVG-`path`."
        },
        {
          "kind": "function",
          "name": "pointsAttribute()",
          "identifier": "pointsAttribute()",
          "anchor": "pointsAttribute",
          "line": 120,
          "text": "Omvandlar `HEX_POINTS` till en punktsträng för SVG.\n\n**Arbetsgång:**\n\n1. Läser varje hörnpunkt.  \n2. Omvandlar den till formatet `x,y`.  \n3. Fogar samman punkterna med mellanslag.  \n4. Returnerar strängen.\n\n🔗 **Anropas endast av:** `createOcean()`.\n\n⚙️ **Effekt:** Returnerar en sträng utan DOM-ändring.\n\n---"
        }
      ],
      "notes": [
        "### **🌱 Gräs**\n\n`createGrassFlat()` → `addGrassTuft()`\n\n`createGrassHills()` → `createGrassFlat()` \\+ `addHill()`\n\n`createGrassMountains()` → `createGrassFlat()` \\+ berggrafik\n\n### **🌾 Slätt**\n\n`createPlainsFlat()` → `addDryGrass()` \\+ `addGroundTrace()`\n\n`createPlainsHills()` → `createPlainsFlat()` \\+ `addHill()`\n\n`createPlainsMountains()` → `createPlainsFlat()` \\+ berggrafik\n\n### **❄️ Snö**\n\n`createSnowFlat()` → `noise()` \\+ snötexturer\n\n`createSnowHills()` → `createSnowFlat()` \\+ `addHill()`\n\n`createSnowMountains()` → `createSnowFlat()` \\+ berggrafik\n\n### **🌊 Hav**\n\n`createOcean()` → `pointsAttribute()` \\+ `addWave()`\n\n---",
        "### **🧩 Composition — Sammansättning**\n\nKullar och berg skapas ovanpå en färdig grundterräng.\n\nDet betyder att grundens färger och texturer kan återanvändas.\n\n### **🎨 Separation of Concerns — Ansvarsuppdelning**\n\nTerrängmodulerna ansvarar för SVG-grafiken.\n\nDe ändrar inte hexagonernas terrängvärden i Convex.\n\n### **♻️ Gemensamma mönster**\n\nGräs, slätt, öken och snö använder liknande uppbyggnad:\n\n* Grundhexagon med gradient.  \n* Klippmask för att hålla grafiken inom hexagonen.  \n* Terrängspecifika texturer.  \n* Kullar eller berg som separata överlägg.\n\n### **🔁 Liknande kod i olika moduler**\n\nBergmodulerna återanvänder samma grundläggande silhuett och kullmodulerna samma positionsuppsättningar.\n\nDet är en möjlig framtida refaktoreringspunkt, men inventeringen visar inte att någon sådan gemensam berg- eller kullgenerator redan finns.\n\n---"
      ]
    },
    {
      "path": "src/library-svg-graphics/terrain/plains.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🌾 6\\. Plains — Platt slätt**"
        },
        {
          "kind": "function",
          "name": "createPlainsFlat()",
          "identifier": "createPlainsFlat()",
          "anchor": "createPlainsFlat",
          "line": 7,
          "text": "Skapar en slätt med gradient, fyra färgfläckar, tjugo torra grästuvor och sex markspår.\n\n**Arbetsgång:**\n\n1. Skapar `plains-clip-N`.  \n2. Skapar `plains-gradient-N`.  \n3. Ritar fyra ljusa markfläckar.  \n4. Anropar `addDryGrass()` tjugo gånger.  \n5. Anropar `addGroundTrace()` sex gånger.  \n6. Returnerar grafiken.\n\n**Gradient:**\n\n`#b9b748` → `#b2b03e` → `#a4a337`\n\n**Markfläckar:**\n\n* Färg: `#d4ca61`.  \n* Opacitet: `0.12`.\n\n🔗 **Bekräftade anropare:** `TerrainButton`, `CivWikiTerrains`, `WorldMapController`, `createPlainsHills()` och `createPlainsMountains()`.\n\n⚙️ **Effekt:** Returnerar SVG-grafiken och ökar `plainsSerial`."
        },
        {
          "kind": "function",
          "name": "addDryGrass()",
          "identifier": "addDryGrass()",
          "anchor": "addDryGrass",
          "line": 117,
          "text": "Ritar tre korta, torra grässtrån.\n\n**Grafiska egenskaper:**\n\n* Färg: `#777b30`.  \n* Linjebredd: `1.5`.  \n* Opacitet: `0.34`.  \n* Rundade linjeändar.\n\n🔗 **Anropas endast av:** `createPlainsFlat()`.\n\n⚙️ **Effekt:** Lägger till en SVG-bana."
        },
        {
          "kind": "function",
          "name": "addGroundTrace()",
          "identifier": "addGroundTrace()",
          "anchor": "addGroundTrace",
          "line": 142,
          "text": "Ritar ett tunt, vågigt mark- eller växtspår.\n\n**Grafiska egenskaper:**\n\n* Färg: `#777b30`.  \n* Linjebredd: `1.7`.  \n* Opacitet: `0.20`.\n\nSpårets bredd beräknas som en andel av hexagonens bredd.\n\n🔗 **Anropas endast av:** `createPlainsFlat()`.\n\n⚙️ **Effekt:** Lägger till en SVG-bana.\n\n---"
        }
      ],
      "notes": [
        "### **🌱 Gräs**\n\n`createGrassFlat()` → `addGrassTuft()`\n\n`createGrassHills()` → `createGrassFlat()` \\+ `addHill()`\n\n`createGrassMountains()` → `createGrassFlat()` \\+ berggrafik\n\n### **🌾 Slätt**\n\n`createPlainsFlat()` → `addDryGrass()` \\+ `addGroundTrace()`\n\n`createPlainsHills()` → `createPlainsFlat()` \\+ `addHill()`\n\n`createPlainsMountains()` → `createPlainsFlat()` \\+ berggrafik\n\n### **❄️ Snö**\n\n`createSnowFlat()` → `noise()` \\+ snötexturer\n\n`createSnowHills()` → `createSnowFlat()` \\+ `addHill()`\n\n`createSnowMountains()` → `createSnowFlat()` \\+ berggrafik\n\n### **🌊 Hav**\n\n`createOcean()` → `pointsAttribute()` \\+ `addWave()`\n\n---",
        "### **🧩 Composition — Sammansättning**\n\nKullar och berg skapas ovanpå en färdig grundterräng.\n\nDet betyder att grundens färger och texturer kan återanvändas.\n\n### **🎨 Separation of Concerns — Ansvarsuppdelning**\n\nTerrängmodulerna ansvarar för SVG-grafiken.\n\nDe ändrar inte hexagonernas terrängvärden i Convex.\n\n### **♻️ Gemensamma mönster**\n\nGräs, slätt, öken och snö använder liknande uppbyggnad:\n\n* Grundhexagon med gradient.  \n* Klippmask för att hålla grafiken inom hexagonen.  \n* Terrängspecifika texturer.  \n* Kullar eller berg som separata överlägg.\n\n### **🔁 Liknande kod i olika moduler**\n\nBergmodulerna återanvänder samma grundläggande silhuett och kullmodulerna samma positionsuppsättningar.\n\nDet är en möjlig framtida refaktoreringspunkt, men inventeringen visar inte att någon sådan gemensam berg- eller kullgenerator redan finns.\n\n---"
      ]
    },
    {
      "path": "src/library-svg-graphics/terrain/plains-hills.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🌄 7\\. Plains Hills — Kuperad slätt**"
        },
        {
          "kind": "function",
          "name": "createPlainsHills()",
          "identifier": "createPlainsHills()",
          "anchor": "createPlainsHills",
          "line": 8,
          "text": "Skapar fem kullar ovanpå en platt slätt.\n\n**Arbetsgång:**\n\n1. Anropar `createPlainsFlat()`.  \n2. Kontrollerar `defs` och klippolygonen.  \n3. Klonar klippolygonen till `plains-hills-clip-N`.  \n4. Skapar en kullgradient.  \n5. Anropar `addHill()` fem gånger.  \n6. Returnerar den utökade grafiken.\n\n**Gradient:**\n\n`#d8cf70` → `#b1a947` → `#777c32`\n\nKullarnas positioner och storlekar motsvarar dem i gräslandskapet.\n\n**Felmeddelanden:**\n\n`Plains SVG is missing its definitions`\n\n`Plains SVG is missing its hexagon clipping polygon`\n\n🔗 **Bekräftade anropare:** `TerrainButton`, `CivWikiTerrains` och `WorldMapController` via `plains-hills`.\n\n⚙️ **Effekt:** Returnerar SVG med kullar. `hillsSerial` ökas."
        },
        {
          "kind": "function",
          "name": "addHill()",
          "identifier": "addHill()",
          "anchor": "addHill",
          "line": 64,
          "text": "En nästlad funktion som ritar en slättkulle.\n\n**Grafiska delar:**\n\n* Markskugga: `#77772d`, opacitet `0.18`.  \n* Kropp: kullgradienten.  \n* Kontur: `#89853b`.  \n* Solsida: `#e1d67d`, opacitet `0.48`.\n\nKullens kurvgeometri motsvarar gräskullens.\n\n🔗 **Anropas endast av:** `createPlainsHills()`.\n\n⚙️ **Effekt:** Lägger till en ellips och två SVG-banor.\n\n---"
        }
      ],
      "notes": [
        "### **🌱 Gräs**\n\n`createGrassFlat()` → `addGrassTuft()`\n\n`createGrassHills()` → `createGrassFlat()` \\+ `addHill()`\n\n`createGrassMountains()` → `createGrassFlat()` \\+ berggrafik\n\n### **🌾 Slätt**\n\n`createPlainsFlat()` → `addDryGrass()` \\+ `addGroundTrace()`\n\n`createPlainsHills()` → `createPlainsFlat()` \\+ `addHill()`\n\n`createPlainsMountains()` → `createPlainsFlat()` \\+ berggrafik\n\n### **❄️ Snö**\n\n`createSnowFlat()` → `noise()` \\+ snötexturer\n\n`createSnowHills()` → `createSnowFlat()` \\+ `addHill()`\n\n`createSnowMountains()` → `createSnowFlat()` \\+ berggrafik\n\n### **🌊 Hav**\n\n`createOcean()` → `pointsAttribute()` \\+ `addWave()`\n\n---",
        "### **🧩 Composition — Sammansättning**\n\nKullar och berg skapas ovanpå en färdig grundterräng.\n\nDet betyder att grundens färger och texturer kan återanvändas.\n\n### **🎨 Separation of Concerns — Ansvarsuppdelning**\n\nTerrängmodulerna ansvarar för SVG-grafiken.\n\nDe ändrar inte hexagonernas terrängvärden i Convex.\n\n### **♻️ Gemensamma mönster**\n\nGräs, slätt, öken och snö använder liknande uppbyggnad:\n\n* Grundhexagon med gradient.  \n* Klippmask för att hålla grafiken inom hexagonen.  \n* Terrängspecifika texturer.  \n* Kullar eller berg som separata överlägg.\n\n### **🔁 Liknande kod i olika moduler**\n\nBergmodulerna återanvänder samma grundläggande silhuett och kullmodulerna samma positionsuppsättningar.\n\nDet är en möjlig framtida refaktoreringspunkt, men inventeringen visar inte att någon sådan gemensam berg- eller kullgenerator redan finns.\n\n---"
      ]
    },
    {
      "path": "src/library-svg-graphics/terrain/plains-mountains.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🏔️ 8\\. Plains Mountains — Bergig slätt**"
        },
        {
          "kind": "function",
          "name": "createPlainsMountains()",
          "identifier": "createPlainsMountains()",
          "anchor": "createPlainsMountains",
          "line": 8,
          "text": "Skapar berg ovanpå en platt slätt.\n\n**Arbetsgång:**\n\n1. Anropar `createPlainsFlat()`.  \n2. Kontrollerar att `defs` finns.  \n3. Skapar klippmasken `plains-mountains-clip-N`.  \n4. Ritar samma grundläggande bergsilhuett som ökenbergen.  \n5. Lägger till slättanpassad markskugga och bergfot.\n\n**Färger:**\n\n* Markskugga: `#77742d`.  \n* Bergfot: `#96943d`.\n\nOpaciteterna motsvarar gräsbergens: `0.28` och `0.72`.\n\n🔗 **Bekräftade anropare:** `TerrainButton`, `CivWikiTerrains` och `WorldMapController` via `plains-mountain`.\n\n⚙️ **Effekt:** Returnerar slättens SVG med berg tillagda. `mountainsSerial` ökas.\n\n---"
        }
      ],
      "notes": [
        "### **🌱 Gräs**\n\n`createGrassFlat()` → `addGrassTuft()`\n\n`createGrassHills()` → `createGrassFlat()` \\+ `addHill()`\n\n`createGrassMountains()` → `createGrassFlat()` \\+ berggrafik\n\n### **🌾 Slätt**\n\n`createPlainsFlat()` → `addDryGrass()` \\+ `addGroundTrace()`\n\n`createPlainsHills()` → `createPlainsFlat()` \\+ `addHill()`\n\n`createPlainsMountains()` → `createPlainsFlat()` \\+ berggrafik\n\n### **❄️ Snö**\n\n`createSnowFlat()` → `noise()` \\+ snötexturer\n\n`createSnowHills()` → `createSnowFlat()` \\+ `addHill()`\n\n`createSnowMountains()` → `createSnowFlat()` \\+ berggrafik\n\n### **🌊 Hav**\n\n`createOcean()` → `pointsAttribute()` \\+ `addWave()`\n\n---",
        "### **🧩 Composition — Sammansättning**\n\nKullar och berg skapas ovanpå en färdig grundterräng.\n\nDet betyder att grundens färger och texturer kan återanvändas.\n\n### **🎨 Separation of Concerns — Ansvarsuppdelning**\n\nTerrängmodulerna ansvarar för SVG-grafiken.\n\nDe ändrar inte hexagonernas terrängvärden i Convex.\n\n### **♻️ Gemensamma mönster**\n\nGräs, slätt, öken och snö använder liknande uppbyggnad:\n\n* Grundhexagon med gradient.  \n* Klippmask för att hålla grafiken inom hexagonen.  \n* Terrängspecifika texturer.  \n* Kullar eller berg som separata överlägg.\n\n### **🔁 Liknande kod i olika moduler**\n\nBergmodulerna återanvänder samma grundläggande silhuett och kullmodulerna samma positionsuppsättningar.\n\nDet är en möjlig framtida refaktoreringspunkt, men inventeringen visar inte att någon sådan gemensam berg- eller kullgenerator redan finns.\n\n---"
      ]
    },
    {
      "path": "src/library-svg-graphics/terrain/snow.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **❄️ 9\\. Snow — Platt snöterräng**"
        },
        {
          "kind": "function",
          "name": "createSnowFlat()",
          "identifier": "createSnowFlat()",
          "anchor": "createSnowFlat",
          "line": 7,
          "text": "Skapar en detaljerad snöhexagon med snödrivor, vindlinjer, sprickor, snökorn och iskristaller.\n\nDetta är en av de mer innehållsrika terrängfunktionerna i den här delen.\n\n**Arbetsgång:**\n\n1. Skapar klippmasken `snow-clip-N`.  \n2. Skapar gradienten `snow-ground-N`.  \n3. Ritar sex roterade snödrivor.  \n4. Ritar sju dubbla snökonturer.  \n5. Genererar 34 sprickor.  \n6. Lägger till sidogrenar på var fjärde spricka.  \n7. Genererar 460 små korn.  \n8. Genererar 58 iskristaller.  \n9. Returnerar grafiken.\n\n**Gradient:**\n\n`#f6fbff` → `#e7f2fa` → `#d5e5f3`\n\nGradienten lutar mot `(0.35, 1)`.\n\n**Snödrivor:**\n\n* Ljusa: `#ffffff`, opacitet `0.34`.  \n* Skuggade: `#b8d2e9`, opacitet `0.20`.\n\n**Sprickor:**\n\n* Antal: 34\\.  \n* Färg: `#8fb3d0`.  \n* Var fjärde får en förgrening.\n\n**Korn:**\n\n* Antal: 460\\.  \n* Var fjärde: `#8eb6d7`.  \n* Övriga: vita.\n\n**Kristaller:**\n\n* Antal: 58\\.  \n* Var tredje: `#b2d0e6`.  \n* Övriga: vita.\n\n🔗 **Bekräftade anropare:** `TerrainButton`, `CivWikiTerrains`, `WorldMapController`, `createSnowHills()` och `createSnowMountains()`.\n\n⚙️ **Effekt:** Returnerar en omonterad SVG och ökar `snowSerial`."
        },
        {
          "kind": "function",
          "name": "noise()",
          "identifier": "noise()",
          "anchor": "noise",
          "line": 209,
          "text": "Genererar ett upprepbart tal mellan 0 och 1\\.\n\n**Formel:**\n\nBråkdelen av:\n\n`sin(seed * 12.9898 + 78.233) * 43758.5453`\n\n🔗 **Anropas endast av:** `createSnowFlat()`.\n\n⚙️ **Effekt:** Returnerar ett tal utan DOM-ändring.\n\n💡 **Begrepp — Deterministiskt brus:** Ett matematiskt sätt att skapa variation som ser slumpmässig ut men som kan återskapas med samma frö.\n\nSamma grundläggande brusformel förekommer även i ökenmodulen.\n\n---"
        }
      ],
      "notes": [
        "### **🌱 Gräs**\n\n`createGrassFlat()` → `addGrassTuft()`\n\n`createGrassHills()` → `createGrassFlat()` \\+ `addHill()`\n\n`createGrassMountains()` → `createGrassFlat()` \\+ berggrafik\n\n### **🌾 Slätt**\n\n`createPlainsFlat()` → `addDryGrass()` \\+ `addGroundTrace()`\n\n`createPlainsHills()` → `createPlainsFlat()` \\+ `addHill()`\n\n`createPlainsMountains()` → `createPlainsFlat()` \\+ berggrafik\n\n### **❄️ Snö**\n\n`createSnowFlat()` → `noise()` \\+ snötexturer\n\n`createSnowHills()` → `createSnowFlat()` \\+ `addHill()`\n\n`createSnowMountains()` → `createSnowFlat()` \\+ berggrafik\n\n### **🌊 Hav**\n\n`createOcean()` → `pointsAttribute()` \\+ `addWave()`\n\n---",
        "### **🧩 Composition — Sammansättning**\n\nKullar och berg skapas ovanpå en färdig grundterräng.\n\nDet betyder att grundens färger och texturer kan återanvändas.\n\n### **🎨 Separation of Concerns — Ansvarsuppdelning**\n\nTerrängmodulerna ansvarar för SVG-grafiken.\n\nDe ändrar inte hexagonernas terrängvärden i Convex.\n\n### **♻️ Gemensamma mönster**\n\nGräs, slätt, öken och snö använder liknande uppbyggnad:\n\n* Grundhexagon med gradient.  \n* Klippmask för att hålla grafiken inom hexagonen.  \n* Terrängspecifika texturer.  \n* Kullar eller berg som separata överlägg.\n\n### **🔁 Liknande kod i olika moduler**\n\nBergmodulerna återanvänder samma grundläggande silhuett och kullmodulerna samma positionsuppsättningar.\n\nDet är en möjlig framtida refaktoreringspunkt, men inventeringen visar inte att någon sådan gemensam berg- eller kullgenerator redan finns.\n\n---"
      ]
    },
    {
      "path": "src/library-svg-graphics/terrain/snow-hills.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **⛄ 10\\. Snow Hills — Snökullar**"
        },
        {
          "kind": "function",
          "name": "createSnowHills()",
          "identifier": "createSnowHills()",
          "anchor": "createSnowHills",
          "line": 8,
          "text": "Skapar fem snökullar ovanpå den platta snöterrängen.\n\n**Arbetsgång:**\n\n1. Anropar `createSnowFlat()`.  \n2. Kontrollerar att `defs` finns.  \n3. Kontrollerar att klippolygonen finns.  \n4. Klonar polygonen till `snow-hills-clip-N`.  \n5. Skapar en kullgradient.  \n6. Anropar `addHill()` fem gånger.\n\n**Gradient:**\n\n`#ffffff` → `#d9eafa` → `#8fb5d8`\n\nKullarnas grundläggande mått motsvarar de andra kulltyperna.\n\n**Felmeddelanden:**\n\n`Snow SVG is missing its definitions`\n\n`Snow SVG is missing its hexagon clipping polygon`\n\n🔗 **Bekräftade anropare:** `TerrainButton`, `CivWikiTerrains` och `WorldMapController` via `snow-hills`.\n\n⚙️ **Effekt:** Returnerar SVG med snökullar. `hillsSerial` ökas."
        },
        {
          "kind": "function",
          "name": "addHill()",
          "identifier": "addHill()",
          "anchor": "addHill",
          "line": 64,
          "text": "En nästlad funktion som ritar en snökulle.\n\nDen är mer detaljerad än motsvarande gräs- och slättkullar.\n\n**Grafiska delar:**\n\n1. Skugga.  \n2. Kullens kropp.  \n3. Solbelyst sida.  \n4. Skuggad läsida.  \n5. Vindlinjer.  \n6. Kamlinje.\n\n**Färger:**\n\n* Skugga: `#6997c0`, opacitet `0.25`.  \n* Kropp: snökullgradienten.  \n* Kontur: `#86accd`.  \n* Solsida: vit, opacitet `0.83`.  \n* Läsida: `#719ec9`, opacitet `0.28`.  \n* Vindlinjer: `#f5fbff`.  \n* Kam: vit, opacitet `0.9`.\n\n🔗 **Anropas endast av:** `createSnowHills()`.\n\n⚙️ **Effekt:** Lägger till en ellips och fem SVG-banor.\n\n---"
        }
      ],
      "notes": [
        "### **🌱 Gräs**\n\n`createGrassFlat()` → `addGrassTuft()`\n\n`createGrassHills()` → `createGrassFlat()` \\+ `addHill()`\n\n`createGrassMountains()` → `createGrassFlat()` \\+ berggrafik\n\n### **🌾 Slätt**\n\n`createPlainsFlat()` → `addDryGrass()` \\+ `addGroundTrace()`\n\n`createPlainsHills()` → `createPlainsFlat()` \\+ `addHill()`\n\n`createPlainsMountains()` → `createPlainsFlat()` \\+ berggrafik\n\n### **❄️ Snö**\n\n`createSnowFlat()` → `noise()` \\+ snötexturer\n\n`createSnowHills()` → `createSnowFlat()` \\+ `addHill()`\n\n`createSnowMountains()` → `createSnowFlat()` \\+ berggrafik\n\n### **🌊 Hav**\n\n`createOcean()` → `pointsAttribute()` \\+ `addWave()`\n\n---",
        "### **🧩 Composition — Sammansättning**\n\nKullar och berg skapas ovanpå en färdig grundterräng.\n\nDet betyder att grundens färger och texturer kan återanvändas.\n\n### **🎨 Separation of Concerns — Ansvarsuppdelning**\n\nTerrängmodulerna ansvarar för SVG-grafiken.\n\nDe ändrar inte hexagonernas terrängvärden i Convex.\n\n### **♻️ Gemensamma mönster**\n\nGräs, slätt, öken och snö använder liknande uppbyggnad:\n\n* Grundhexagon med gradient.  \n* Klippmask för att hålla grafiken inom hexagonen.  \n* Terrängspecifika texturer.  \n* Kullar eller berg som separata överlägg.\n\n### **🔁 Liknande kod i olika moduler**\n\nBergmodulerna återanvänder samma grundläggande silhuett och kullmodulerna samma positionsuppsättningar.\n\nDet är en möjlig framtida refaktoreringspunkt, men inventeringen visar inte att någon sådan gemensam berg- eller kullgenerator redan finns.\n\n---"
      ]
    },
    {
      "path": "src/library-svg-graphics/terrain/snow-mountains.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🏔️ 11\\. Snow Mountains — Snötäckta berg**"
        },
        {
          "kind": "function",
          "name": "createSnowMountains()",
          "identifier": "createSnowMountains()",
          "anchor": "createSnowMountains",
          "line": 8,
          "text": "Skapar snötäckta berg ovanpå den platta snöterrängen.\n\n**Arbetsgång:**\n\n1. Anropar `createSnowFlat()`.  \n2. Kontrollerar `defs`.  \n3. Skapar klippmasken `snow-mountains-clip-N`.  \n4. Ritar markskuggan.  \n5. Ritar det bakre berget.  \n6. Lägger till snö och snöskuggor.  \n7. Ritar det främre berget.  \n8. Lägger till snökalott och snötungor.  \n9. Ritar åsar, bergfot och en vit linje över nedre sluttningen.\n\n**Markskugga:**\n\n* Färg: `#6389b2`.  \n* Opacitet: `0.30`.\n\n**Bakre berg:**\n\n* Grundfärg: `#b2c7d9`.  \n* Östsida: `#607d9f`.  \n* Snö: `#ffffff`.  \n* Snöskugga: `#d4e8f7`.  \n* Extra snötunga: `#e7f4fc`.\n\n**Främre berg:**\n\n* Grundfärg: `#afc5d8`.  \n* Sluttningar: `#e2f1fb`, `#58789b`, `#91abc5`.  \n* Snökalott: vit.  \n* Snöskugga: `#c2def2`.\n\n**Ytterligare detaljer:**\n\n* Två snötungor: `#f4faff` och `#d7eaf8`.  \n* Åsar: `#506d8b`.  \n* Bergfot: `#d8eaf7`.  \n* Vit linje med bredd `4`.\n\n🔗 **Bekräftade anropare:** `TerrainButton`, `CivWikiTerrains` och `WorldMapController` via `snow-mountain`.\n\n⚙️ **Effekt:** Returnerar snöhexagonen med berg tillagda. `mountainsSerial` ökas.\n\n---"
        }
      ],
      "notes": [
        "### **🌱 Gräs**\n\n`createGrassFlat()` → `addGrassTuft()`\n\n`createGrassHills()` → `createGrassFlat()` \\+ `addHill()`\n\n`createGrassMountains()` → `createGrassFlat()` \\+ berggrafik\n\n### **🌾 Slätt**\n\n`createPlainsFlat()` → `addDryGrass()` \\+ `addGroundTrace()`\n\n`createPlainsHills()` → `createPlainsFlat()` \\+ `addHill()`\n\n`createPlainsMountains()` → `createPlainsFlat()` \\+ berggrafik\n\n### **❄️ Snö**\n\n`createSnowFlat()` → `noise()` \\+ snötexturer\n\n`createSnowHills()` → `createSnowFlat()` \\+ `addHill()`\n\n`createSnowMountains()` → `createSnowFlat()` \\+ berggrafik\n\n### **🌊 Hav**\n\n`createOcean()` → `pointsAttribute()` \\+ `addWave()`\n\n---",
        "### **🧩 Composition — Sammansättning**\n\nKullar och berg skapas ovanpå en färdig grundterräng.\n\nDet betyder att grundens färger och texturer kan återanvändas.\n\n### **🎨 Separation of Concerns — Ansvarsuppdelning**\n\nTerrängmodulerna ansvarar för SVG-grafiken.\n\nDe ändrar inte hexagonernas terrängvärden i Convex.\n\n### **♻️ Gemensamma mönster**\n\nGräs, slätt, öken och snö använder liknande uppbyggnad:\n\n* Grundhexagon med gradient.  \n* Klippmask för att hålla grafiken inom hexagonen.  \n* Terrängspecifika texturer.  \n* Kullar eller berg som separata överlägg.\n\n### **🔁 Liknande kod i olika moduler**\n\nBergmodulerna återanvänder samma grundläggande silhuett och kullmodulerna samma positionsuppsättningar.\n\nDet är en möjlig framtida refaktoreringspunkt, men inventeringen visar inte att någon sådan gemensam berg- eller kullgenerator redan finns.\n\n---"
      ]
    },
    {
      "path": "src/library-svg-graphics/terrain/tundra.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🪨 1\\. Tundra — Platt tundralandskap**"
        },
        {
          "kind": "function",
          "name": "createTundraFlat()",
          "identifier": "createTundraFlat()",
          "anchor": "createTundraFlat",
          "line": 7,
          "text": "Skapar en detaljerad tundrahexagon med stenformationer, åsar, sprickor, stenfragment och små snörester.\n\n**Arbetsgång:**\n\n1. Skapar SVG-roten med koordinatsystem från `HEX_BOUNDS`.  \n2. Skapar klippmasken `tundra-clip-N` utifrån `HEX_POINTS`.  \n3. Skapar markgradienten `tundra-ground-N`.  \n4. Ritar sex roterade stenformationer.  \n5. Ritar sju åsar med både skugga och ljus kant.  \n6. Genererar 46 sprickor.  \n7. Genererar 105 små stenfragment.  \n8. Ritar åtta snörester som niouddiga polygoner.  \n9. Returnerar den färdiga tundragrafiken.\n\n**Markgradient:**\n\n`#a8a38c` → `#92907c` → `#797c70`\n\nGradienten lutar mot `(0.35, 1)`.\n\n**Stenformationer:**\n\n* Ljusa: `#c3b9a0`, opacitet `0.22`.  \n* Mörka: `#686f68`, opacitet `0.16`.\n\n**Åsar:**\n\n* Skugga: `#555b55`.  \n* Ljus kant: `#d2c9b0`.\n\n**Sprickor:**\n\n* Antal: 46\\.  \n* Färg: `#4c514b`.  \n* Var tredje får en sidogren.\n\n**Stenfragment:**\n\n* Antal: 105\\.  \n* Var tredje: `#515850`.  \n* Övriga: `#d4c9b1`.\n\n**Snörester:**\n\n* Antal: 8\\.  \n* Fyllning: `#e8efea`.  \n* Kontur: `#bdceca`.\n\nSkalfaktorn är `HEX_BOUNDS.width / 260`.\n\n🔗 **Bekräftade anropare:** `TerrainButton`, `CivWikiTerrains`, `WorldMapController`, `createTundraHills()` och `createTundraMountains()`.\n\n⚙️ **Effekt:** Returnerar en omonterad SVG och ökar `tundraSerial`."
        },
        {
          "kind": "function",
          "name": "pseudoRandom()",
          "identifier": "pseudoRandom()",
          "anchor": "pseudoRandom",
          "line": 238,
          "text": "Genererar ett upprepbart tal mellan 0 och 1\\.\n\n**Formel:**\n\nBråkdelen av:\n\n`sin(seed * 127.1 + 78.233) * 43758.5453`\n\nFunktionen används för att variera placeringen av sprickor och stenfragment.\n\n🔗 **Anropas endast av:** `createTundraFlat()`.\n\n⚙️ **Effekt:** Returnerar ett tal utan att ändra DOM.\n\n💡 **Begrepp — Deterministisk pseudorandomisering:** Samma frövärde ger samma resultat. Grafiken kan därför se naturligt varierad ut utan att bli oförutsägbar.\n\n---"
        }
      ],
      "notes": [
        "### **📍 Kalmar**\n\n`addVisitorMarker()` → `projectVisitorOnKalmarMap()` → `{ x, y }` eller `null`.\n\n### **🇸🇪 Sverige**\n\n`addVisitorMarker()` → `projectVisitorOnSverigeMap()` → `pointInLand()` → `pointInRing()`.\n\n### **🌐 Världen**\n\n`VisitorsLayout.#createWorldMap()` → `createVisitorWorldMap()`.\n\nBesökarens position beräknas separat av `projectVisitorLocation()`.\n\n---",
        "### **🧩 Separation of Concerns**\n\nKartmodulerna skiljer mellan två uppgifter:\n\n**Kartskapande:** Att läsa in och färgsätta en SVG-karta.\n\n**Koordinatprojektion:** Att beräkna var en geografisk position ska placeras på kartan.\n\n### **📐 Geometriska algoritmer**\n\nSverigekartan använder `pointInRing()` för att avgöra om en punkt ligger på land.\n\nDetta är ett exempel på hur klassisk beräkningsgeometri används i en webbapplikation.\n\n### **♻️ Återanvändning**\n\nTundrakullarna och tundrabergen bygger vidare på `createTundraFlat()`.\n\nBesökskartorna använder gemensamma SVG-principer men separata geografiska projektioner.\n\n### **🛡️ Felhantering**\n\nKartskaparna kontrollerar att SVG-inläsningen lyckas.\n\nSverigekartan kontrollerar dessutom att landkonturernas path-data kan läsas.\n\n---",
        "Vi har nu dokumenterat hela kedjan från applikationens huvudlogik och databasfunktioner till dess ikoner, terränggrafik och geografiska besökskartor."
      ]
    },
    {
      "path": "src/library-svg-graphics/terrain/tundra-hills.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🌄 2\\. Tundra Hills — Kuperad tundra**"
        },
        {
          "kind": "function",
          "name": "createTundraHills()",
          "identifier": "createTundraHills()",
          "anchor": "createTundraHills",
          "line": 8,
          "text": "Bygger fem steniga kullar ovanpå den platta tundran.\n\n**Arbetsgång:**\n\n1. Anropar `createTundraFlat()`.  \n2. Kontrollerar att SVG-elementets `defs` finns.  \n3. Kontrollerar att grundens klippolygon finns.  \n4. Klonar polygonen till `tundra-hills-clip-N`.  \n5. Skapar en kullgradient.  \n6. Anropar `addHill()` fem gånger.  \n7. Returnerar den utökade grafiken.\n\n**Kullgradient:**\n\n`#aaa594` → `#7f8074` → `#505a54`\n\n**Kullarnas mått:**\n\n| Kulle | x | y | Bredd | Höjd |\n| ----- | ----- | ----- | ----- | ----- |\n| 1 | −70 | −35 | 62 | 37 |\n| 2 | −29 | −49 | 81 | 49 |\n| 3 | 23 | −30 | 54 | 33 |\n| 4 | −48 | 7 | 57 | 30 |\n| 5 | 10 | 10 | 64 | 34 |\n\n**Felhantering:**\n\n`Tundra SVG is missing its definitions`\n\n`Tundra SVG is missing its hexagon clipping polygon`\n\n🔗 **Bekräftade anropare:** `TerrainButton`, `CivWikiTerrains` och `WorldMapController` via `tundra-hills`.\n\n⚙️ **Effekt:** Returnerar tundrans SVG med kullar tillagda. `hillsSerial` ökas."
        },
        {
          "kind": "function",
          "name": "addHill()",
          "identifier": "addHill()",
          "anchor": "addHill",
          "line": 64,
          "text": "En nästlad hjälpfunktion som ritar en stenig tundrakulle.\n\n**Grafiska delar:**\n\n1. Markskugga.  \n2. Kullens kropp.  \n3. Solbelyst sida.  \n4. Sprickor.  \n5. En liten snörest.\n\n**Färger:**\n\n* Skugga: `#454e49`, opacitet `0.20`.  \n* Kropp: kullgradienten.  \n* Kontur: `#555d55`.  \n* Solsida: `#b9b4a2`, opacitet `0.38`.  \n* Sprickor: `#505b55`.  \n* Snörest: `#e4eae4`, opacitet `0.65`.\n\nKullens position utgår från hexagonens relativa mittpunkt `(0.5, 0.49)` och skalas med `HEX_BOUNDS.width / 260`.\n\n🔗 **Anropas endast av:** `createTundraHills()`.\n\n⚙️ **Effekt:** Lägger till en ellips och fyra SVG-banor.\n\n---"
        }
      ],
      "notes": [
        "### **📍 Kalmar**\n\n`addVisitorMarker()` → `projectVisitorOnKalmarMap()` → `{ x, y }` eller `null`.\n\n### **🇸🇪 Sverige**\n\n`addVisitorMarker()` → `projectVisitorOnSverigeMap()` → `pointInLand()` → `pointInRing()`.\n\n### **🌐 Världen**\n\n`VisitorsLayout.#createWorldMap()` → `createVisitorWorldMap()`.\n\nBesökarens position beräknas separat av `projectVisitorLocation()`.\n\n---",
        "### **🧩 Separation of Concerns**\n\nKartmodulerna skiljer mellan två uppgifter:\n\n**Kartskapande:** Att läsa in och färgsätta en SVG-karta.\n\n**Koordinatprojektion:** Att beräkna var en geografisk position ska placeras på kartan.\n\n### **📐 Geometriska algoritmer**\n\nSverigekartan använder `pointInRing()` för att avgöra om en punkt ligger på land.\n\nDetta är ett exempel på hur klassisk beräkningsgeometri används i en webbapplikation.\n\n### **♻️ Återanvändning**\n\nTundrakullarna och tundrabergen bygger vidare på `createTundraFlat()`.\n\nBesökskartorna använder gemensamma SVG-principer men separata geografiska projektioner.\n\n### **🛡️ Felhantering**\n\nKartskaparna kontrollerar att SVG-inläsningen lyckas.\n\nSverigekartan kontrollerar dessutom att landkonturernas path-data kan läsas.\n\n---",
        "Vi har nu dokumenterat hela kedjan från applikationens huvudlogik och databasfunktioner till dess ikoner, terränggrafik och geografiska besökskartor."
      ]
    },
    {
      "path": "src/library-svg-graphics/terrain/tundra-mountains.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🏔️ 3\\. Tundra Mountains — Bergig tundra**"
        },
        {
          "kind": "function",
          "name": "createTundraMountains()",
          "identifier": "createTundraMountains()",
          "anchor": "createTundraMountains",
          "line": 8,
          "text": "Skapar två berg med snötoppar ovanpå den platta tundran.\n\n**Arbetsgång:**\n\n1. Anropar `createTundraFlat()`.  \n2. Kontrollerar att `defs` finns.  \n3. Skapar klippmasken `tundra-mountains-clip-N`.  \n4. Skapar en berggrupp med samma grundsilhuett som övriga bergterränger.  \n5. Ritar markskugga.  \n6. Ritar bakre berg och dess snö.  \n7. Ritar främre berg, sluttningar och snökalott.  \n8. Ritar åsar och bergfot.  \n9. Returnerar grafiken.\n\n**Geometri:**\n\nBerggruppen skalas kring `(0.5, 0.54)`.\n\n**Markskugga:**\n\n`#454e49`\n\n**Bakre berg:**\n\n* Grundfärg: `#797983`.  \n* Östsida: `#454d59`.  \n* Snö: `#f0eee8`.  \n* Snöskugga: `#d5e0e5`.\n\n**Främre berg:**\n\n* Grundfärg: `#888581`.  \n* Sluttningar: `#aaa197`, `#4c5260`, `#77747a`.  \n* Snökalott: `#f3f1e9`.  \n* Snöskugga: `#cbd9e2`.\n\n**Övriga detaljer:**\n\n* Åsar: `#414850`.  \n* Bergfot: `#777c70`.  \n* Bergfotens opacitet: `0.76`.\n\n🔗 **Bekräftade anropare:** `TerrainButton`, `CivWikiTerrains` och `WorldMapController` via `tundra-mountain`.\n\n⚙️ **Effekt:** Returnerar tundrans SVG med berg tillagda. `mountainsSerial` ökas.\n\n---"
        }
      ],
      "notes": [
        "### **📍 Kalmar**\n\n`addVisitorMarker()` → `projectVisitorOnKalmarMap()` → `{ x, y }` eller `null`.\n\n### **🇸🇪 Sverige**\n\n`addVisitorMarker()` → `projectVisitorOnSverigeMap()` → `pointInLand()` → `pointInRing()`.\n\n### **🌐 Världen**\n\n`VisitorsLayout.#createWorldMap()` → `createVisitorWorldMap()`.\n\nBesökarens position beräknas separat av `projectVisitorLocation()`.\n\n---",
        "### **🧩 Separation of Concerns**\n\nKartmodulerna skiljer mellan två uppgifter:\n\n**Kartskapande:** Att läsa in och färgsätta en SVG-karta.\n\n**Koordinatprojektion:** Att beräkna var en geografisk position ska placeras på kartan.\n\n### **📐 Geometriska algoritmer**\n\nSverigekartan använder `pointInRing()` för att avgöra om en punkt ligger på land.\n\nDetta är ett exempel på hur klassisk beräkningsgeometri används i en webbapplikation.\n\n### **♻️ Återanvändning**\n\nTundrakullarna och tundrabergen bygger vidare på `createTundraFlat()`.\n\nBesökskartorna använder gemensamma SVG-principer men separata geografiska projektioner.\n\n### **🛡️ Felhantering**\n\nKartskaparna kontrollerar att SVG-inläsningen lyckas.\n\nSverigekartan kontrollerar dessutom att landkonturernas path-data kan läsas.\n\n---",
        "Vi har nu dokumenterat hela kedjan från applikationens huvudlogik och databasfunktioner till dess ikoner, terränggrafik och geografiska besökskartor."
      ]
    },
    {
      "path": "src/library-svg-graphics/visitor-map-kalmar/kalmar-map.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **📍 4\\. Kalmarkartan — Lokala besökarpositioner**\n\n\nHär går vi från terränggrafik till geografiska koordinater."
        },
        {
          "kind": "function",
          "name": "projectVisitorOnKalmarMap()",
          "identifier": "projectVisitorOnKalmarMap()",
          "anchor": "projectVisitorOnKalmarMap",
          "line": 13,
          "text": "Omvandlar en besökares latitud och longitud till en punkt på Kalmarkartan.\n\n**Kartans geografiska gränser:**\n\n| Gräns | Värde |\n| ----- | ----- |\n| Västlig longitud | 15.953952 |\n| Östlig longitud | 16.771604 |\n| Sydlig latitud | 56.589524 |\n| Nordlig latitud | 56.769186 |\n\n**Kartans koordinatsystem:**\n\n* Bredd: 2500\\.  \n* Höjd: 1000\\.\n\n**Beräkning av x:**\n\n`((longitude - west) / (east - west)) * 2500`\n\n**Beräkning av y:**\n\n`((north - latitude) / (north - south)) * 1000`\n\nY-koordinaten är omvänd jämfört med latituden eftersom SVG y-axel ökar nedåt.\n\nDet innebär att norr hamnar högst upp på kartan.\n\n**Viktiga egenskaper:**\n\n* Gränspunkter accepteras.  \n* Positioner utanför området returnerar `null`.  \n* Funktionen kontrollerar inte om punkten ligger på land.  \n* Kartans `viewBox` har redan anpassats med cosinus för mittlatituden.\n\n🔗 **Bekräftad anropare:** `addVisitorMarker()` via `kalmarPlacement.project`.\n\n⚙️ **Effekt:** Returnerar `{ x, y }` eller `null`. Ingen DOM-ändring."
        },
        {
          "kind": "function",
          "name": "createVisitorKalmarMap()",
          "identifier": "createVisitorKalmarMap()",
          "anchor": "createVisitorKalmarMap",
          "line": 32,
          "text": "Läser in Kalmars SVG-karta och tilldelar dess färger.\n\n**Arbetsgång:**\n\n1. Läser SVG-källan `kalmar-map.svg`.  \n2. Använder `DOMParser` med formatet `image/svg+xml`.  \n3. Kontrollerar att resultatet är ett `SVGSVGElement`.  \n4. Tar bort attributen `width` och `height`.  \n5. Sätter kartans CSS-variabler.  \n6. Returnerar SVG-roten.\n\n**Färger:**\n\n* Hav: `#061827`.  \n* Land: `#193F30`.  \n* Kust: `#39705C`.\n\n**Felmeddelande:**\n\n`Kalmar map SVG could not be created`\n\n🔗 **Bekräftad anropare:** `VisitorsLayout.#createWorldMap()`.\n\nAnroparen sätter klassen `visitors-layout__kalmar-map`, rollen `img` och etiketten `Map of Kalmar and surrounding area`.\n\n⚙️ **Effekt:** Returnerar den tolkade SVG-roten.\n\n---"
        }
      ],
      "notes": [
        "### **📍 Kalmar**\n\n`addVisitorMarker()` → `projectVisitorOnKalmarMap()` → `{ x, y }` eller `null`.\n\n### **🇸🇪 Sverige**\n\n`addVisitorMarker()` → `projectVisitorOnSverigeMap()` → `pointInLand()` → `pointInRing()`.\n\n### **🌐 Världen**\n\n`VisitorsLayout.#createWorldMap()` → `createVisitorWorldMap()`.\n\nBesökarens position beräknas separat av `projectVisitorLocation()`.\n\n---",
        "### **🧩 Separation of Concerns**\n\nKartmodulerna skiljer mellan två uppgifter:\n\n**Kartskapande:** Att läsa in och färgsätta en SVG-karta.\n\n**Koordinatprojektion:** Att beräkna var en geografisk position ska placeras på kartan.\n\n### **📐 Geometriska algoritmer**\n\nSverigekartan använder `pointInRing()` för att avgöra om en punkt ligger på land.\n\nDetta är ett exempel på hur klassisk beräkningsgeometri används i en webbapplikation.\n\n### **♻️ Återanvändning**\n\nTundrakullarna och tundrabergen bygger vidare på `createTundraFlat()`.\n\nBesökskartorna använder gemensamma SVG-principer men separata geografiska projektioner.\n\n### **🛡️ Felhantering**\n\nKartskaparna kontrollerar att SVG-inläsningen lyckas.\n\nSverigekartan kontrollerar dessutom att landkonturernas path-data kan läsas.\n\n---",
        "Vi har nu dokumenterat hela kedjan från applikationens huvudlogik och databasfunktioner till dess ikoner, terränggrafik och geografiska besökskartor."
      ]
    },
    {
      "path": "src/library-svg-graphics/visitor-map-sverige/sverige-map.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🇸🇪 5\\. Sverigekartan — Geografisk projektion och landkontroll**\n\n\nDen här kartmodulen är mer avancerad än Kalmarkartan eftersom den även undersöker om en besökarpunkt ligger på land."
        },
        {
          "kind": "function",
          "name": "projectVisitorOnSverigeMap()",
          "identifier": "projectVisitorOnSverigeMap()",
          "anchor": "projectVisitorOnSverigeMap",
          "line": 14,
          "text": "Omvandlar en geografisk position till koordinater på kartan över södra Sverige.\n\n**Geografiska gränser:**\n\n| Gräns | Värde |\n| ----- | ----- |\n| Västlig longitud | 10.881534 |\n| Östlig longitud | 19.448291 |\n| Sydlig latitud | 55.283466 |\n| Nordlig latitud | 60.826406 |\n\n**Kartans koordinatsystem:**\n\n* Bredd: 817,1.  \n* Höjd: 1000\\.\n\n**Arbetsgång:**\n\n1. Kontrollerar att koordinaterna ligger inom det geografiska fönstret.  \n2. Beräknar x från longituden.  \n3. Beräknar y från latituden.  \n4. Anropar `pointInLand()`.  \n5. Returnerar positionen om landkontrollen godkänns.\n\n🔗 **Bekräftad anropare:** `addVisitorMarker()` via `sverigePlacement.project`.\n\n⚙️ **Effekt:** Returnerar `{ x, y }` eller `null`."
        },
        {
          "kind": "function",
          "name": "readLandRings()",
          "identifier": "readLandRings()",
          "anchor": "readLandRings",
          "line": 39,
          "text": "Läser Sveriges landkonturer från SVG-källans första `d`\\-attribut.\n\n**Arbetsgång:**\n\n1. Läser SVG-källan.  \n2. Hämtar den första sökvägens `d`\\-attribut.  \n3. Tolkar kommandon som börjar med `M` eller `L` som punkter.  \n4. Tolkar `Z` som slutet på en ring.  \n5. Samlar punkterna i ringar.  \n6. Returnerar ringarna.\n\nFunktionen anropas när modulen laddas, på rad 12\\.\n\nResultatet lagras i `sverigeLandRings`.\n\n**Felmeddelande:**\n\n`Sweden map land path could not be read`\n\n⚙️ **Effekt:** Returnerar landringarna. Ett fel kan avbryta modulens import.\n\n💡 **Begrepp — Module Initialization:** Kod som körs direkt när en modul laddas, innan dess exporterade funktioner används."
        },
        {
          "kind": "function",
          "name": "pointInLand()",
          "identifier": "pointInLand()",
          "anchor": "pointInLand",
          "line": 69,
          "text": "Avgör om en punkt ligger på land.\n\n**Arbetsgång:**\n\n1. Läser de förberedda landringarna.  \n2. Anropar `pointInRing()` för varje ring.  \n3. Växlar mellan tillstånden utanför och innanför när en ring innehåller punkten.  \n4. Returnerar slutresultatet.\n\nMetoden med växlande tillstånd gör att hål i landkonturen kan behandlas som vatten.\n\n🔗 **Anropas endast av:** `projectVisitorOnSverigeMap()`.\n\n⚙️ **Effekt:** Returnerar `true` eller `false`."
        },
        {
          "kind": "function",
          "name": "pointInRing()",
          "identifier": "pointInRing()",
          "anchor": "pointInRing",
          "line": 81,
          "text": "Undersöker om en punkt ligger inuti en sluten polygonring.\n\nAlgoritmen använder **Ray Casting**, eller strålkastningsmetoden.\n\n**Princip:**\n\nFöreställ dig att en horisontell linje går från punkten åt höger.\n\n* Om linjen korsar polygonens gräns ett udda antal gånger ligger punkten innanför.  \n* Om antalet korsningar är jämnt ligger punkten utanför.\n\n**Arbetsgång:**\n\n1. Går igenom ringens kanter.  \n2. Undersöker om kanten korsar punktens y-nivå.  \n3. Beräknar skärningens x-koordinat.  \n4. Växlar tillstånd om skärningen ligger till höger om punkten.  \n5. Returnerar om antalet korsningar är udda.\n\n**Formel för skärningens x:**\n\n`((previousX - currentX) * (y - currentY)) / (previousY - currentY) + currentX`\n\n🔗 **Anropas endast av:** `pointInLand()`.\n\n⚙️ **Effekt:** Returnerar ett booleskt värde.\n\n💡 **Begrepp — Point-in-Polygon:** En geometrisk algoritm som avgör om en punkt ligger inom en polygon."
        },
        {
          "kind": "function",
          "name": "createVisitorSverigeMap()",
          "identifier": "createVisitorSverigeMap()",
          "anchor": "createVisitorSverigeMap",
          "line": 105,
          "text": "Läser in Sverigekartan som SVG och sätter dess färger.\n\n**Arbetsgång:**\n\n1. Tolkar `sverige-map.svg` med `DOMParser`.  \n2. Kontrollerar SVG-roten.  \n3. Tar bort `width` och `height`.  \n4. Sätter färgvariabler.  \n5. Returnerar SVG-elementet.\n\n**Färger:**\n\n* Hav: `#061827`.  \n* Land: `#193F30`.  \n* Kust: `#39705C`.\n\n**Felmeddelande:**\n\n`Sweden map SVG could not be created`\n\n🔗 **Bekräftad anropare:** `VisitorsLayout.#createWorldMap()`.\n\nAnroparen sätter klassen `visitors-layout__sverige-map` och etiketten `Map of southern Sweden`.\n\n⚙️ **Effekt:** Returnerar den tolkade SVG-roten.\n\n---"
        }
      ],
      "notes": [
        "### **📍 Kalmar**\n\n`addVisitorMarker()` → `projectVisitorOnKalmarMap()` → `{ x, y }` eller `null`.\n\n### **🇸🇪 Sverige**\n\n`addVisitorMarker()` → `projectVisitorOnSverigeMap()` → `pointInLand()` → `pointInRing()`.\n\n### **🌐 Världen**\n\n`VisitorsLayout.#createWorldMap()` → `createVisitorWorldMap()`.\n\nBesökarens position beräknas separat av `projectVisitorLocation()`.\n\n---",
        "### **🧩 Separation of Concerns**\n\nKartmodulerna skiljer mellan två uppgifter:\n\n**Kartskapande:** Att läsa in och färgsätta en SVG-karta.\n\n**Koordinatprojektion:** Att beräkna var en geografisk position ska placeras på kartan.\n\n### **📐 Geometriska algoritmer**\n\nSverigekartan använder `pointInRing()` för att avgöra om en punkt ligger på land.\n\nDetta är ett exempel på hur klassisk beräkningsgeometri används i en webbapplikation.\n\n### **♻️ Återanvändning**\n\nTundrakullarna och tundrabergen bygger vidare på `createTundraFlat()`.\n\nBesökskartorna använder gemensamma SVG-principer men separata geografiska projektioner.\n\n### **🛡️ Felhantering**\n\nKartskaparna kontrollerar att SVG-inläsningen lyckas.\n\nSverigekartan kontrollerar dessutom att landkonturernas path-data kan läsas.\n\n---",
        "Vi har nu dokumenterat hela kedjan från applikationens huvudlogik och databasfunktioner till dess ikoner, terränggrafik och geografiska besökskartor."
      ]
    },
    {
      "path": "src/library-svg-graphics/visitor-map-world/world-map.ts",
      "blocks": [
        {
          "kind": "prose",
          "text": "## **🌐 6\\. Världskartan — Global besökskarta**"
        },
        {
          "kind": "function",
          "name": "createVisitorWorldMap()",
          "identifier": "createVisitorWorldMap()",
          "anchor": "createVisitorWorldMap",
          "line": 3,
          "text": "Läser in världskartan och anpassar dess färger.\n\n**Arbetsgång:**\n\n1. Tolkar `world-map.svg` med `DOMParser`.  \n2. Kontrollerar att SVG-roten är giltig.  \n3. Tar bort `width` och `height`.  \n4. Sätter kartans CSS-variabler.  \n5. Returnerar SVG-elementet.\n\n**Färger:**\n\n* Hav: `#061827`.  \n* Land: `#193748`.  \n* Kust: `#3C6578`.\n\n**Felmeddelande:**\n\n`World map SVG could not be created`\n\n🔗 **Bekräftad anropare:** `VisitorsLayout.#createWorldMap()`.\n\nAnroparen sätter klassen `visitors-layout__world-map` och etiketten `Equirectangular world map`.\n\n⚙️ **Effekt:** Returnerar den tolkade SVG-roten.\n\n**Viktig ansvarsfördelning:**\n\nDen här funktionen projicerar inte besökarens koordinater.\n\nDen globala koordinatprojektionen utförs i stället av `projectVisitorLocation()` i `visitor-marker.ts`.\n\n---"
        }
      ],
      "notes": [
        "### **📍 Kalmar**\n\n`addVisitorMarker()` → `projectVisitorOnKalmarMap()` → `{ x, y }` eller `null`.\n\n### **🇸🇪 Sverige**\n\n`addVisitorMarker()` → `projectVisitorOnSverigeMap()` → `pointInLand()` → `pointInRing()`.\n\n### **🌐 Världen**\n\n`VisitorsLayout.#createWorldMap()` → `createVisitorWorldMap()`.\n\nBesökarens position beräknas separat av `projectVisitorLocation()`.\n\n---",
        "### **🧩 Separation of Concerns**\n\nKartmodulerna skiljer mellan två uppgifter:\n\n**Kartskapande:** Att läsa in och färgsätta en SVG-karta.\n\n**Koordinatprojektion:** Att beräkna var en geografisk position ska placeras på kartan.\n\n### **📐 Geometriska algoritmer**\n\nSverigekartan använder `pointInRing()` för att avgöra om en punkt ligger på land.\n\nDetta är ett exempel på hur klassisk beräkningsgeometri används i en webbapplikation.\n\n### **♻️ Återanvändning**\n\nTundrakullarna och tundrabergen bygger vidare på `createTundraFlat()`.\n\nBesökskartorna använder gemensamma SVG-principer men separata geografiska projektioner.\n\n### **🛡️ Felhantering**\n\nKartskaparna kontrollerar att SVG-inläsningen lyckas.\n\nSverigekartan kontrollerar dessutom att landkonturernas path-data kan läsas.\n\n---",
        "Vi har nu dokumenterat hela kedjan från applikationens huvudlogik och databasfunktioner till dess ikoner, terränggrafik och geografiska besökskartor."
      ]
    },
    {
      "path": "scripts/initialize-world.mjs",
      "blocks": [
        {
          "kind": "prose",
          "text": "🔢 **Antal funktioner:** 5\n\n🎯 **Huvuduppgift:** Kontrollera och initiera spelets tolv världar, så att varje värld innehåller exakt 1 174 hexagoner.\n\n---\n\n## **🌐 1\\. Skriptets övergripande uppgift**\n\nCivilization of Wonders har tolv permanenta världar.\n\nVarje värld består av exakt 1 174 hexagoner, vars koordinater beräknas med biblioteket Midgard Hex Grid.\n\nInitialiseringsskriptet ansvarar för att kontrollera att världarna finns, starta skapandet av hexagoner där det behövs och vänta tills databasen bekräftar att allt är färdigt.\n\n**Viktigt:** Skriptet skapar inte själva världsposterna. Det förutsätter att värld 1–12 redan finns i Convex.\n\n### **📐 Förberedelser innan huvudfunktionen**\n\nNär modulen laddas skapas ett `HexGrid` med följande inställningar:\n\n* Orientering: `x-dominated`.  \n* Hexagondiameter: `260`.  \n* Skelettbredd: `42`.  \n* Skeletthöjd: `13`.\n\nDärefter anropas `createGrid()` och koordinaterna samlas i `coordinates`.\n\nTvå kontroller utförs:\n\n**Antalskontroll:** Det måste finnas exakt 1 174 koordinater.\n\n**Unikhetskontroll:** Ingen koordinat får förekomma två gånger.\n\nVid fel kastas exempelvis:\n\n`Expected 1174 hexagons, received …`\n\neller\n\n`Midgard returned duplicate coordinates`\n\nNär kontrollerna lyckas skrivs antalet unika koordinater till konsolen.\n\n---"
        },
        {
          "kind": "function",
          "name": "runConvex()",
          "identifier": "runConvex()",
          "anchor": "runConvex",
          "line": 40,
          "text": "### **🎯 Syfte**\n\nKör en namngiven Convex-funktion genom kommandoraden och omvandlar resultatet från JSON-text till ett JavaScript-värde.\n\n### **📥 Parametrar**\n\n**functionName:** Namnet på Convex-funktionen, exempelvis `worlds:list`.\n\n**args:** Ett valfritt objekt med argument. Utelämnas om värdet är `undefined`.\n\n### **🔄 Arbetsgång**\n\n1. Skapar argumentlistan `['convex', 'run', functionName]`.  \n2. Lägger till `JSON.stringify(args)` om argument finns.  \n3. Startar kommandot `npx` genom `execFileSync()`.  \n4. Väntar tills kommandot är färdigt.  \n5. Läser kommandots textutdata.  \n6. Tolkar texten med `JSON.parse()`.  \n7. Returnerar det parsade resultatet.\n\n### **🔗 Anropas av**\n\n* `getWorlds()`  \n* `getHexCount()`  \n* `main()`\n\n### **🗄️ Databasinteraktioner**\n\n`worlds:list` — hämtar världarna.\n\n`hexes:listByWorld` — hämtar hexagonerna för en värld.\n\n`hexes:initializeWorld` — startar initieringen av hexagonerna.\n\n### **⚠️ Felhantering**\n\nFunktionen har ingen egen `try/catch`.\n\nOm kommandot misslyckas kastar `execFileSync()` ett fel. Om utdata inte är giltig JSON kastar `JSON.parse()` ett fel.\n\n### **🎓 Programmeringsbegrepp**\n\n**CLI (Command-Line Interface):** Ett gränssnitt där program styrs med textkommandon.\n\n**JSON:** Ett textformat för att överföra strukturerade data.\n\n**Synchronous Execution:** Körning där programmet väntar på att en operation ska bli färdig innan det fortsätter.\n\n---"
        },
        {
          "kind": "function",
          "name": "getWorlds()",
          "identifier": "getWorlds()",
          "anchor": "getWorlds",
          "line": 54,
          "text": "### **🎯 Syfte**\n\nHämtar listan över världar från Convex.\n\n### **🔄 Arbetsgång**\n\nFunktionen gör ett enda anrop:\n\n`runConvex('worlds:list')`\n\nResultatet returneras direkt.\n\n### **🔗 Anropas av**\n\n* `main()` för att kontrollera att samtliga tolv världar finns.  \n* `waitForWorld()` för att kontrollera en världs aktuella status.\n\n### **⚙️ Effekter**\n\nFunktionen läser data men skriver ingenting till databasen.\n\nAnropet är synkront och eventuella fel skickas vidare till anroparen.\n\n### **🎓 Programmeringsbegrepp**\n\n**Wrapper Function:** En funktion som förenklar användningen av en annan funktion genom att kapsla in ett återkommande anrop.\n\n`getWorlds()` är ett enkelt exempel: anroparen behöver inte känna till det exakta CLI-kommandot.\n\n---"
        },
        {
          "kind": "function",
          "name": "getHexCount()",
          "identifier": "getHexCount()",
          "anchor": "getHexCount",
          "line": 58,
          "text": "### **🎯 Syfte**\n\nTa reda på hur många hexagoner som finns i en viss värld.\n\n### **📥 Parameter**\n\n**worldId:** Databasidentifieraren för världen.\n\n### **🔄 Arbetsgång**\n\n1. Anropar `runConvex('hexes:listByWorld', { worldId })`.  \n2. Tar emot listan med hexagoner.  \n3. Läser listans `length`.  \n4. Returnerar antalet.\n\n### **🔗 Anropas av**\n\n* `main()` före initiering.  \n* `waitForWorld()` efter att världen har fått statusen `ready`.\n\n### **⚙️ Effekter**\n\nFunktionen läser databasen men ändrar inte några hexagoner.\n\nDen kontrollerar inte själv att det returnerade värdet verkligen är en lista.\n\n### **💡 Varför behövs den?**\n\nFunktionen används i två olika säkerhetskontroller.\n\n**Före initiering:** En värld som inte är färdig måste innehålla noll hexagoner för att skriptet ska starta initieringen.\n\n**Efter initiering:** En färdig värld måste innehålla exakt 1 174 hexagoner.\n\n---"
        },
        {
          "kind": "function",
          "name": "waitForWorld()",
          "identifier": "waitForWorld()",
          "anchor": "waitForWorld",
          "line": 64,
          "text": "### **🎯 Syfte**\n\nVäntar tills en viss värld har statusen `ready` och innehåller exakt rätt antal hexagoner.\n\n### **📥 Parametrar**\n\n**worldId:** Världens databasidentifierare.\n\n**worldNumber:** Världens nummer, som används i loggmeddelanden och felmeddelanden.\n\n### **⏱️ Tidsinställningar**\n\n* Kontrollintervall: 2 sekunder.  \n* Maximal väntetid: 120 sekunder.\n\n### **🔄 Arbetsgång**\n\n1. Beräknar en tidsgräns med `Date.now() + 120000`.  \n2. Hämtar världarna genom `getWorlds()`.  \n3. Söker efter den aktuella världens `_id`.  \n4. Kontrollerar att världen fortfarande finns.  \n5. Undersöker `initializationStatus`.  \n6. Om statusen är `ready`, anropas `getHexCount()`.  \n7. Om antalet är 1 174 avslutas funktionen.  \n8. Annars skrivs aktuell status till konsolen.  \n9. Väntar två sekunder med `sleep(2000)`.  \n10. Upprepar tills världen är färdig eller tidsgränsen passeras.\n\n### **⚠️ Felhantering**\n\nOm världen försvinner:\n\n`World ${worldNumber} disappeared`\n\nOm en färdig värld har fel antal hexagoner:\n\n`World ${worldNumber} has ${count} hexagons, expected 1174`\n\nOm tidsgränsen överskrids:\n\n`Timed out waiting for World ${worldNumber} to initialize`\n\n### **🔗 Anropas av**\n\n`main()` i tre olika situationer:\n\n* Världen är redan färdig.  \n* Världen håller redan på att initieras.  \n* En ny initiering har just startats.\n\n### **⚙️ Effekter**\n\nFunktionen gör upprepade databasläsningar och skriver statusmeddelanden.\n\nDen ändrar inte databasen.\n\nDen returnerar inget värde när kontrollen lyckas.\n\n### **🎓 Programmeringsbegrepp**\n\n**Async Function:** En funktion som kan pausa med `await` utan att blockera JavaScripts händelseloop under själva väntan.\n\n**Polling:** Att regelbundet kontrollera om ett tillstånd har förändrats.\n\n**Timeout:** En tidsgräns som förhindrar att ett program väntar hur länge som helst.\n\n**Viktig detalj:** Databasläsningarna via `execFileSync()` är fortfarande blockerande, även om själva tvåsekunderspausen är asynkron.\n\n---"
        },
        {
          "kind": "function",
          "name": "main()",
          "identifier": "main()",
          "anchor": "main",
          "line": 104,
          "text": "### **🎯 Syfte**\n\nSamordnar hela initialiseringsprocessen för värld 1–12.\n\n### **🔄 Steg 1 — Kontrollera världarna**\n\nFunktionen hämtar världarna genom `getWorlds()`.\n\nDen kontrollerar att det finns exakt tolv världar.\n\nOm antalet är fel kastas:\n\n`Expected 12 worlds, received …`\n\nDärefter kontrolleras att varje nummer från 1 till 12 förekommer exakt en gång.\n\nOm något nummer saknas eller är duplicerat kastas:\n\n`Expected exactly Worlds 1 through 12`\n\n### **🔄 Steg 2 — Sortera världarna**\n\nVärldarna sorteras i stigande nummerordning.\n\nDet innebär att skriptet behandlar värld 1 före värld 2, och så vidare till värld 12\\.\n\n### **🔄 Steg 3 — Undersök varje världs status**\n\nFör varje värld finns tre huvudsituationer.\n\n**🟢 Situationen READY**\n\nVärlden är redan markerad som färdig.\n\nSkriptet anropar `waitForWorld()` för att bekräfta att den faktiskt har 1 174 hexagoner.\n\n**🟡 Situationen INITIALIZING**\n\nVärlden håller redan på att initieras.\n\nSkriptet startar inte någon ny initiering utan väntar genom `waitForWorld()`.\n\n**⚪ Övriga statusar**\n\nSkriptet räknar först befintliga hexagoner genom `getHexCount()`.\n\nOm antalet inte är noll kastas:\n\n`World ${world.number} has ${existingCount} hexagons but is not ready`\n\nOm antalet är noll startas initieringen med:\n\n`runConvex('hexes:initializeWorld', { worldId, coordinates })`\n\nResultatets `message` skrivs till konsolen.\n\nDärefter anropas `waitForWorld()`.\n\n### **🔄 Steg 4 — Bekräfta slutresultatet**\n\nNär alla tolv världar har godkänts skrivs:\n\n`All 12 worlds verified!`\n\nSkriptet skriver också det förväntade totala antalet hexagoner.\n\n### **🔗 Anropare**\n\nDen enda bekräftade anroparen är:\n\n`await main()`\n\npå rad 172 i samma fil.\n\nIngen `package.json`\\-skriptpost anropar filen.\n\n### **⚙️ Effekter**\n\nFunktionen:\n\n* Läser världar och hexagoner från Convex.  \n* Startar initiering där det behövs.  \n* Väntar på att varje värld ska bli färdig.  \n* Skriver information till konsolen.  \n* Avbryter vid fel.\n\nOm en värld misslyckas behandlas inte de efterföljande världarna under samma körning.\n\n---"
        }
      ],
      "notes": [
        "### **📐 Förberedelse**\n\n`HexGrid` → `createGrid()` → `coordinates`\n\nKontroll: exakt 1 174 unika koordinater.\n\n### **🚀 Start**\n\n`await main()` → `getWorlds()` → `runConvex('worlds:list')`\n\n### **🔍 Kontroll**\n\n`main()` → `getHexCount()` → `runConvex('hexes:listByWorld')`\n\n### **🗄️ Initiering**\n\n`main()` → `runConvex('hexes:initializeWorld')`\n\n### **⏳ Väntan**\n\n`main()` → `waitForWorld()` → `getWorlds()` och `getHexCount()`\n\n### **🏁 Slutresultat**\n\n12 världar × 1 174 hexagoner \\= **14 088 hexagoner**.\n\n---",
        "### **🛡️ Defensive Programming**\n\nSkriptet kontrollerar viktiga förutsättningar innan det ändrar något:\n\n* Rätt antal koordinater.  \n* Inga duplicerade koordinater.  \n* Exakt tolv världar.  \n* Rätt världsnummer.  \n* Inga oväntade befintliga hexagoner.\n\n### **♻️ Återupptagbar initialisering**\n\nSkriptet skiljer mellan redan färdiga världar, pågående initialisering och världar som ännu inte har påbörjats.\n\nDet gör att det kan köras igen utan att automatiskt starta om redan pågående arbete.\n\n### **🧩 Separation of Concerns**\n\n`main()` bestämmer vad som ska göras.\n\n`runConvex()` sköter kommunikationen med Convex.\n\n`getWorlds()` och `getHexCount()` hämtar data.\n\n`waitForWorld()` övervakar resultatet.\n\n### **🗄️ Database-First Architecture**\n\nConvex är den auktoritativa lagringsplatsen.\n\nSkriptet skickar koordinater och startar initieringen, men det är Convex-funktionerna som faktiskt skriver hexagonerna.\n\n---"
      ]
    }
  ],
  "concepts": [
    {
      "title": "DEL 01 — Centrala begrepp att kunna förklara",
      "text": "**🧠 Shared State:** Gemensam information som flera delar av applikationen behöver.\n\n**🔒 Encapsulation:** Privata fält skyddas bakom ett kontrollerat publikt API.\n\n**💉 Dependency Injection:** En klass får sina beroenden utifrån i stället för att skapa dem själv.\n\n**⏳ Race Condition:** Ett problem där resultatet kan bero på i vilken ordning samtidiga eller asynkrona operationer slutförs.\n\n**🔢 Request Generation Counter:** Ett generationsnummer som används för att identifiera och ignorera föråldrade asynkrona svar.\n\n**📡 Subscription:** En prenumeration där programmet får uppdateringar när data förändras.\n\n**🔌 Unsubscribe:** En funktion som avslutar en prenumeration.\n\n**🧭 Invariant:** Ett villkor som programmet måste upprätthålla, exempelvis att World Builder kräver en vald värld.\n\n---"
    },
    {
      "title": "DEL 02 — Viktiga programmeringsbegrepp",
      "text": "**🏗️ Composition Root:** Den plats där applikationens centrala objekt skapas och kopplas samman.\n\n**💉 Dependency Injection:** Beroenden skickas in genom exempelvis konstruktorn i stället för att skapas internt.\n\n**🔔 Callback:** En funktion som skickas till en annan komponent för att kunna anropas vid ett senare tillfälle.\n\n**🧩 Composition:** En större struktur byggs genom att kombinera mindre komponenter.\n\n**🌐 DOM:** Document Object Model, webbläsarens representation av HTML-dokumentets element.\n\n**🔄 Orchestration:** En komponent samordnar flera andra komponenters arbete.\n\n**🔐 Authentication:** Att fastställa vem användaren är.\n\n**🛡️ Authorization:** Att avgöra vad användaren har rätt att göra.\n\n**⏳ Race Condition:** När ett resultat kan bli fel på grund av ordningen mellan asynkrona operationer.\n\n**🔢 Generation Counter:** Ett löpnummer som hjälper till att identifiera inaktuella svar.\n\n**🎨 Separation of Concerns:** Att dela upp programmet så att olika delar har tydliga och avgränsade ansvarsområden.\n\n---"
    },
    {
      "title": "DEL 03 — Viktiga programmeringsbegrepp",
      "text": "**📡 Live Subscription:** En prenumeration som levererar nya värden när data förändras.\n\n**🔌 Unsubscribe:** Att avsluta en tidigare registrerad prenumeration.\n\n**🛡️ Authorization:** Att kontrollera om användaren har rätt att utföra en åtgärd.\n\n**⏳ Pending State:** Ett tillstånd som anger att en asynkron operation ännu inte har avslutats.\n\n**🔄 Finally:** Ett block som körs efter `try` och eventuell `catch`, även när operationen misslyckas.\n\n**🧠 Pure Function:** En funktion utan sidoeffekter som ger samma resultat för samma indata.\n\n**🧩 Orchestration:** Att samordna flera komponenter för att genomföra en större operation.\n\n**🎯 Separation of Concerns:** Att dela upp ansvar mellan olika moduler.\n\n**🛡️ Defensive Programming:** Att kontrollera ogiltiga eller inaktuella tillstånd innan de kan orsaka fel.\n\n---\n\n\n\n🏁 **Hela `src/main/` är nu färdiginventerad enligt Cursors genomgång.**"
    },
    {
      "title": "DEL 04 — Viktiga programmeringsbegrepp",
      "text": "**🌐 API Client:** Ett objekt som används för att kommunicera med en extern tjänst.\n\n**⚙️ Environment Variable:** En variabel som innehåller konfiguration för programmets körmiljö.\n\n**🔐 Authentication:** Processen att fastställa vem användaren är.\n\n**🎟️ Authentication Token:** En digital uppgift som används för att verifiera en autentiserad session.\n\n**🔔 Event Listener:** En funktion som registreras för att reagera på händelser.\n\n**🧩 Callback:** En funktion som skickas vidare för att kunna anropas senare.\n\n**⏳ Promise:** Ett objekt som representerar ett framtida resultat av en asynkron operation.\n\n**🔄 State Synchronization:** Att hålla olika delar av programmet uppdaterade med samma aktuella information.\n\n**🎨 Rendering:** Att uppdatera användargränssnittet utifrån ett aktuellt tillstånd.\n\n**🔒 Encapsulation:** Att dölja intern implementation bakom ett kontrollerat API.\n\n---"
    },
    {
      "title": "DEL 05 — Viktiga programmeringsbegrepp",
      "text": "**🧩 Composition:** Att bygga större komponenter genom att kombinera mindre komponenter.\n\n**🔒 Encapsulation:** Att dölja intern implementation bakom ett tydligt API.\n\n**🧬 Inheritance:** Att låta en klass ärva egenskaper och metoder från en annan klass.\n\n**⬆️ Super:** Nyckelordet som används för att anropa basklassens konstruktor.\n\n**📦 Getter:** En metodliknande egenskap som ger åtkomst till ett värde.\n\n**🔔 Event Listener:** En funktion som reagerar på en händelse, exempelvis ett musklick.\n\n**🧠 Closure:** När en funktion behåller åtkomst till variabler från den omgivning där den skapades.\n\n**♿ ARIA:** HTML-attribut som hjälper hjälpmedel att förstå gränssnittets betydelse och tillstånd.\n\n**🎨 CSS Class:** Ett klassnamn som används för att styra ett elements utseende eller tillstånd.\n\n---"
    },
    {
      "title": "DEL 06 — Viktiga programmeringsbegrepp",
      "text": "**🔒 Encapsulation:** Att låta en klass hantera sina egna interna detaljer genom ett kontrollerat gränssnitt.\n\n**🎯 Object Identity:** Att kontrollera om två referenser pekar på exakt samma objekt.\n\n**🧩 Callback:** En funktion som skickas till en annan komponent för att anropas senare.\n\n**🗂️ Dispatch Table:** En tabell som kopplar nycklar till funktioner.\n\n**🎨 SVG:** Scalable Vector Graphics, ett vektorbaserat grafikformat.\n\n**🔄 DOM Replacement:** Att ersätta befintliga element i dokumentträdet.\n\n**👁️ Hidden:** En HTML-egenskap som styr om ett element ska visas.\n\n**🚫 Disabled:** En HTML-egenskap som inaktiverar ett interaktivt element.\n\n**💉 Dependency Injection:** Att tillföra en komponent dess beroenden utifrån.\n\n---"
    },
    {
      "title": "DEL 07 — Viktiga programmeringsbegrepp",
      "text": "**🧩 Composition:** Att bygga en större komponent av flera mindre komponenter.\n\n**🔒 Encapsulation:** Att skydda internt tillstånd och exponera kontrollerade metoder.\n\n**📦 Getter:** En metodliknande egenskap som returnerar ett värde.\n\n**🖱️ Event Listener:** En funktion som reagerar på en händelse, till exempel ett klick.\n\n**🔗 Callback:** En funktion som lagras eller skickas vidare för att anropas senare.\n\n**🧠 State:** Information som beskriver programmets aktuella tillstånd.\n\n**📡 Subscription:** En prenumeration som levererar uppdateringar när data förändras.\n\n**🎨 DOM:** Document Object Model, webbläsarens representation av HTML-dokumentet.\n\n**👁️ Hidden:** En egenskap som styr om ett element visas.\n\n**🚫 Disabled:** En egenskap som styr om ett interaktivt element kan användas.\n\n**🔄 Shared Reference:** När flera komponenter använder samma objektinstans.\n\n---"
    },
    {
      "title": "DEL 08 — Viktiga programmeringsbegrepp",
      "text": "**🖼️ SVG:** Scalable Vector Graphics, ett vektorbaserat format för grafik som kan skalas utan att förlora skärpa.\n\n**📐 Coordinate Transformation:** Omvandling av koordinater mellan olika koordinatsystem.\n\n**🔢 Matrix Inversion:** En matematisk operation som här används för att omvandla skärmkoordinater tillbaka till SVG-koordinater.\n\n**📍 Clamping:** Att begränsa ett värde så att det inte hamnar utanför tillåtna gränser.\n\n**🔔 Observer Pattern:** Ett designmönster där objekt kan prenumerera på förändringar hos ett annat objekt.\n\n**🧠 Closure:** En funktion som behåller åtkomst till variabler från sin omgivning.\n\n**🔗 Callback:** En funktion som skickas vidare för att anropas senare.\n\n**🗂️ Sorting:** Att ordna objekt enligt en bestämd regel, exempelvis stigande världsnummer.\n\n**🎨 DOM:** Document Object Model, webbläsarens representation av HTML-dokumentet.\n\n**🔒 Encapsulation:** Att dölja interna detaljer och ge tillgång till funktionalitet genom kontrollerade metoder.\n\n---"
    },
    {
      "title": "DEL 09 — Viktiga programmeringsbegrepp",
      "text": "**🗺️ Viewport:** Det område av kartan som för närvarande är synligt.\n\n**🖼️ SVG viewBox:** Ett attribut som bestämmer vilket koordinatområde i SVG som ska visas.\n\n**📐 Scaling:** Att förstora eller förminska ett koordinatsystem.\n\n**📍 Clamping:** Att begränsa ett värde till ett tillåtet intervall.\n\n**🔔 Observer Pattern:** Ett designmönster där lyssnare registreras för att få meddelanden om förändringar.\n\n**📦 Defensive Copying:** Att returnera kopior av data för att skydda interna objekt.\n\n**🎨 DOM Manipulation:** Att skapa, ändra, flytta eller ersätta element i dokumentträdet.\n\n**📐 ResizeObserver:** Ett webbläsar-API som rapporterar när ett elements storlek förändras.\n\n**🧩 Encapsulation:** Att skydda interna detaljer bakom ett tydligt gränssnitt.\n\n**🔑 Coordinate Key:** En identifierare som gör att en viss koordinat kan användas för uppslagning i en samling.\n\n---"
    },
    {
      "title": "DEL 10 — Viktiga programmeringsbegrepp",
      "text": "**🔑 Template Literal:** En JavaScript-sträng som kan innehålla uttryck genom `${...}`.\n\n**📏 Clamp:** En funktion som begränsar ett tal till ett intervall.\n\n**📐 Geometrisk progression:** En talföljd där varje steg multipliceras med samma faktor.\n\n**🔍 Scale Factor:** Ett tal som beskriver förhållandet mellan storlekar i två koordinatsystem.\n\n**📦 Defensive Copying:** Att skapa kopior för att skydda originaldata.\n\n**💉 Dependency Injection:** Att ge en komponent dess beroenden utifrån.\n\n**📡 Subscription:** En prenumeration som levererar uppdateringar när data förändras.\n\n**🔄 Reactive Rendering:** Att uppdatera gränssnittet när underliggande data ändras.\n\n**🎨 Data-Driven Rendering:** Att låta data avgöra vilken grafik som ska visas.\n\n**🛑 Cleanup:** Att avsluta resurser som inte längre behövs.\n\n---"
    },
    {
      "title": "DEL 11 — Viktiga programmeringsbegrepp",
      "text": "**🌐 Map Projection:** En matematisk metod för att omvandla geografiska koordinater till punkter på en plan karta.\n\n**📍 Latitude & Longitude:** Latitud och longitud, de geografiska koordinater som anger en position på jordytan.\n\n**🖼️ SVG:** Scalable Vector Graphics, ett vektorbaserat grafikformat.\n\n**🎨 Data-Driven Rendering:** Att låta data avgöra vilka grafiska element som skapas och var de placeras.\n\n**📡 Asynchronous Request:** Ett anrop vars svar kommer senare, utan att programmet behöver blockera hela gränssnittet.\n\n**🛡️ Guard Clause:** Ett villkor som avslutar en funktion tidigt när den inte ska fortsätta.\n\n**🧩 Composition:** Att bygga större komponenter av mindre komponenter.\n\n**🔒 Encapsulation:** Att skydda interna detaljer bakom ett kontrollerat gränssnitt.\n\n**📊 Placeholder:** Ett tillfälligt värde som visas innan riktiga data har laddats.\n\n**♿ ARIA:** Attribut som hjälper hjälpmedel att förstå och beskriva användargränssnitt.\n\n---"
    },
    {
      "title": "DEL 12 — Viktiga programmeringsbegrepp",
      "text": "**💻 User-Agent:** Information som en webbläsare tillhandahåller om sin programvara och miljö.\n\n**🔍 Parsing:** Att tolka text eller data och omvandla den till en mer strukturerad representation.\n\n**📐 Validation:** Att kontrollera att data följer bestämda regler.\n\n**🌐 Fetch API:** Webbläsarens gränssnitt för HTTP-anrop.\n\n**📦 JSON:** JavaScript Object Notation, ett vanligt format för datautbyte mellan klient och server.\n\n**⏳ Promise:** Ett objekt som representerar resultatet av en asynkron operation.\n\n**🔄 Async/Await:** Syntax för att arbeta med asynkrona operationer på ett mer sekventiellt sätt.\n\n**🛡️ Guard Clause:** Ett tidigt villkor som hindrar onödiga eller otillåtna operationer.\n\n**💾 Mutation:** En databasoperation som kan ändra lagrade data.\n\n**🧩 Conditional Spread:** Att villkorligt lägga till egenskaper i ett objekt.\n\n**🔒 Anonymous Registration:** Registrering som inte kräver ett inloggat användarkonto.\n\n---"
    },
    {
      "title": "DEL 13 — Viktiga programmeringsbegrepp",
      "text": "**🧩 Component Composition:** Att bygga ett större gränssnitt genom att kombinera mindre komponenter.\n\n**🔗 Callback:** En funktion som skickas vidare och anropas när en händelse inträffar.\n\n**🧠 Closure:** En funktion som behåller åtkomst till variabler från sin omgivning.\n\n**🗂️ Data-Driven UI:** Ett gränssnitt där kategorier och innehåll genereras från data.\n\n**👁️ Hidden Property:** En HTML-egenskap som används för att dölja ett element.\n\n**🎨 SVG:** Vektorbaserad grafik som kan skalas utan att förlora skärpa.\n\n**📐 Aspect Ratio:** Förhållandet mellan bredd och höjd.\n\n**♿ ARIA:** Attribut som gör gränssnitt lättare att förstå för hjälpmedel.\n\n**🔍 Array Filtering:** Att skapa en ny array som bara innehåller element som uppfyller ett villkor.\n\n**🔒 Encapsulation:** Att hålla en komponents interna detaljer bakom ett kontrollerat gränssnitt.\n\n---"
    },
    {
      "title": "DEL 14 — Viktiga programmeringsbegrepp",
      "text": "**📖 Query:** En Convex-funktion som läser data utan att ändra databasen.\n\n**💾 Mutation:** En Convex-funktion som kan skapa, ändra eller ta bort databasdata.\n\n**🔒 Internal Mutation:** En backend-funktion som endast kan anropas internt, inte direkt från webbläsaren.\n\n**🔍 Database Index:** En datastruktur som gör det möjligt att söka effektivt efter bestämda fält.\n\n**🔑 Authentication:** Att fastställa vem användaren är.\n\n**🛡️ Authorization:** Att avgöra vad en identifierad användare har rätt att göra.\n\n**📐 Invariant:** En regel som alltid ska gälla för ett systems data eller tillstånd.\n\n**📦 Batch Processing:** Att dela upp en större operation i flera mindre körningar.\n\n**📡 Subscription:** En prenumeration som levererar nya resultat när relevanta data ändras.\n\n**✏️ Exclusive Editing:** En regel som begränsar redigeringskontrollen till en aktiv användare åt gången.\n\n**🔄 Takeover:** Ett kontrollerat övertagande av en aktiv redigeringssession.\n\n**📊 Historical Counter:** En räknare som fortsätter samla historiska händelser även om äldre detaljposter tas bort.\n\n---"
    },
    {
      "title": "DEL 15 — Viktiga programmeringsbegrepp",
      "text": "**📖 Query:** En funktion som läser data från databasen utan att ändra dem.\n\n**💾 Mutation:** En funktion som kan ändra data i databasen.\n\n**🔍 Index:** En datastruktur som effektiviserar databassökningar och sortering.\n\n**📦 Precomputed Statistics:** Statistik som uppdateras när händelser registreras i stället för att räknas om vid varje läsning.\n\n**🌐 HTTP Header:** Metadata som skickas tillsammans med en HTTP-förfrågan eller ett svar.\n\n**📍 Geolocation:** Bestämning eller uppskattning av en geografisk position.\n\n**🔢 Parsing:** Att omvandla exempelvis en textsträng till ett tal.\n\n**🛡️ Validation:** Att kontrollera att data uppfyller förväntade regler.\n\n**📨 JSON:** Ett textbaserat format för att överföra strukturerade data.\n\n**🔒 Cache-Control:** Instruktioner för hur HTTP-svar får mellanlagras.\n\n**🧩 Separation of Concerns:** Att fördela olika ansvarsområden mellan separata moduler.\n\n---"
    },
    {
      "title": "DEL 16 — Viktiga programmeringsbegrepp",
      "text": "**🖼️ SVG:** Scalable Vector Graphics, ett vektorbaserat grafikformat.\n\n**🌐 Namespace:** En identifierare som skiljer olika XML-elementtyper åt.\n\n**🌳 DOM:** Document Object Model, webbläsarens trädstruktur för dokumentets element.\n\n**📐 viewBox:** SVG interna koordinatsystem.\n\n**⬡ Polygon:** En sluten form som byggs av flera punkter.\n\n**✏️ Path:** En grafisk bana som kan innehålla linjer och kurvor.\n\n**🔍 Viewport:** Det område av en större karta som visas för användaren.\n\n**🎨 currentColor:** Ett CSS-värde som använder elementets aktuella textfärg.\n\n**🪞 Transform:** En grafisk förändring såsom förflyttning, skalning eller spegling.\n\n**✂️ clipPath:** En SVG-mekanism som begränsar den synliga delen av grafik.\n\n**🧩 Abstraction:** Att dölja tekniska detaljer bakom ett enklare gränssnitt.\n\n**♻️ Reusability:** Att återanvända samma kod för flera liknande uppgifter.\n\n---"
    },
    {
      "title": "DEL 17 — Viktiga programmeringsbegrepp",
      "text": "**🎨 SVG:** Vektorbaserad grafik som byggs av geometriska element.\n\n**✏️ Path:** En grafisk bana som definieras med SVG-kommandon.\n\n**🖌️ Stroke:** Konturen eller linjen runt en grafisk form.\n\n**🟦 Fill:** Fyllningsfärgen i en grafisk form.\n\n**🌈 currentColor:** Ett CSS-värde som låter grafiken använda elementets aktuella textfärg.\n\n**🧩 Composition:** Att kombinera flera enkla delar till en större helhet.\n\n**♻️ Reusability:** Att återanvända samma funktion i flera sammanhang.\n\n**🎛️ Parameterization:** Att variera en funktions resultat genom dess argument.\n\n**🔒 Separation of Concerns:** Att skilja grafikens ansvar från applikationens beteende.\n\n**🏭 Factory Function:** En funktion som skapar och returnerar ett nytt objekt, här ett SVG-element.\n\n---"
    },
    {
      "title": "DEL 18 — Viktiga programmeringsbegrepp",
      "text": "**🏭 Factory Function:** En funktion som skapar och returnerar ett nytt objekt.\n\n**🎨 SVG:** Ett vektorbaserat format för grafik.\n\n**✏️ Path:** En grafisk bana som definieras med kommandon.\n\n**🖌️ Stroke:** En linje eller kontur.\n\n**🟦 Fill:** Fyllningen i en grafisk form.\n\n**✂️ clipPath:** En mask som begränsar vilka delar av grafiken som syns.\n\n**🧱 defs:** Ett SVG-element där återanvändbara definitioner kan placeras.\n\n**🔗 URL Fragment Reference:** En referens till ett element-id, exempelvis `url(#icon-clip-1)`.\n\n**♻️ Reusability:** Att använda samma funktion i flera sammanhang.\n\n**🧩 Composition:** Att bygga större grafiska objekt genom att kombinera mindre delar.\n\n**🎯 Separation of Concerns:** Att hålla grafik och applikationslogik åtskilda.\n\n---"
    },
    {
      "title": "DEL 19 — Viktiga programmeringsbegrepp",
      "text": "**🎨 SVG:** Scalable Vector Graphics, ett format för skalbar vektorgrafik.\n\n**📐 viewBox:** Definierar SVG-grafikens interna koordinatsystem.\n\n**🌈 Gradient:** En gradvis övergång mellan flera färger.\n\n**✂️ clipPath:** En SVG-mask som begränsar vilket område som får synas.\n\n**🧱 defs:** En plats i SVG där återanvändbara definitioner lagras.\n\n**🌊 Opacity:** Ett värde som anger hur genomskinligt ett element är.\n\n**🎲 Pseudorandomness:** Matematiskt genererade värden som ser slumpmässiga ut.\n\n**🔢 Seed:** Ett frövärde som styr en deterministisk beräkning.\n\n**🏜️ Procedural Generation:** Att skapa grafik med algoritmer i stället för färdiga bilder.\n\n**🧩 Composition:** Att kombinera enklare komponenter till en större helhet.\n\n**🛡️ Defensive Programming:** Att kontrollera viktiga förutsättningar och hantera fel tydligt.\n\n**📏 Scaling:** Att anpassa koordinater och storlekar med hjälp av en skalfaktor.\n\n---"
    },
    {
      "title": "DEL 20 — Programmeringsbegrepp",
      "text": "**🏭 Factory Function:** En funktion som skapar och returnerar ett nytt objekt.\n\n**🖼️ SVG:** Ett skalbart format för vektorgrafik.\n\n**📐 HEX\\_BOUNDS:** Hexagonens geometriska gränser, som används för skalning och placering.\n\n**✂️ clipPath:** Begränsar vilka delar av grafiken som får synas.\n\n**🌈 Gradient:** En gradvis övergång mellan färger.\n\n**🧩 Composition:** Att bygga en mer avancerad komponent ovanpå en enklare.\n\n**🎲 Deterministic Noise:** Matematiskt genererad variation som kan upprepas.\n\n**🌿 Texture:** Små grafiska detaljer som ger en yta karaktär.\n\n**🛡️ Defensive Programming:** Att kontrollera förutsättningar och kasta tydliga fel när något saknas.\n\n**🔢 Serial Counter:** En räknare som används för att skapa unika identifierare.\n\n**🎨 Opacity:** Ett elements genomskinlighet.\n\n---"
    },
    {
      "title": "DEL 21 — Programmeringsbegrepp",
      "text": "**🌍 Latitude:** Latitud, geografisk breddgrad.\n\n**🧭 Longitude:** Longitud, geografisk längdgrad.\n\n**📐 Coordinate Projection:** Omvandling från ett koordinatsystem till ett annat.\n\n**🗺️ Equirectangular Projection:** En kartprojektion där longitud och latitud avbildas linjärt på kartans axlar.\n\n**🏝️ Polygon:** En sluten geometrisk form bestående av linjesegment.\n\n**🧩 Polygon Ring:** En sluten följd av punkter som bildar en kontur.\n\n**🎯 Point-in-Polygon:** En algoritm för att avgöra om en punkt ligger i en polygon.\n\n**➡️ Ray Casting:** En metod som räknar skärningar mellan en stråle och en polygons kanter.\n\n**🖼️ DOMParser:** Ett webbläsargränssnitt för att tolka text som XML eller HTML.\n\n**🎨 CSS Custom Properties:** Namngivna CSS-variabler, exempelvis `--map-ocean`.\n\n**✂️ clipPath:** En SVG-definition som begränsar det synliga området.\n\n**🎲 Pseudorandom:** Matematiskt genererad variation som liknar slumpmässighet.\n\n---"
    },
    {
      "title": "DEL 22 — Viktiga programmeringsbegrepp",
      "text": "**🏁 Entry Point:** Platsen där programmets huvudsakliga körning startar.\n\n**⚙️ CLI:** Ett textbaserat gränssnitt för att köra program och kommandon.\n\n**📦 JSON Serialization:** Att omvandla ett JavaScript-värde till JSON-text.\n\n**📥 JSON Parsing:** Att tolka JSON-text och återskapa ett JavaScript-värde.\n\n**⏳ Async/Await:** JavaScripts syntax för att arbeta med asynkrona operationer.\n\n**🔁 Polling:** Upprepade kontroller av ett tillstånd.\n\n**⏱️ Timeout:** En maximal väntetid.\n\n**🛡️ Validation:** Kontroll av att data uppfyller bestämda regler.\n\n**🗄️ Database Mutation:** En operation som förändrar lagrad data.\n\n**📐 Grid Geometry:** Matematiska regler för att skapa och placera rutnätets celler.\n\n---"
    }
  ],
  "homeNotes": [
    {
      "title": "DEL 22 — Slutresultat",
      "text": "Alla avsedda applikationsägda källkataloger och det återstående initialiseringsskriptet är nu dokumenterade.\n\n\nTestkod, genererad kod och externa beroenden ingår inte.\n\n**Inventeringens omfattning:** 22 delar.\n\n**Dokumenterade funktioner och metoder:** 346\\.\n\nDetta är antalet dokumentationsposter enligt vår avgränsning, inte antalet samtliga JavaScript-funktionsuttryck eller callbacks i källträdet.\n\nKatalogerna `kalmar-map/` och `world-map/` finns inte i det aktuella arbetsträdet. Motsvarande besökskartor ligger i katalogerna `visitor-map-*`."
    }
  ],
  "partGuides": [
    "📂 **Filer:** `src/main/application-state.ts` och `src/main/navigation.ts`  \n🔢 **Antal metoder:** 20  \n🎯 **Huvudområden:** Tillståndshantering, inkapsling, asynkrona förfrågningar, redigeringssessioner och navigation.\n\n---",
    "📂 **Filer:** `src/main.ts`, `src/main/application-layout.ts`, `src/main/authentication.ts`, `src/main/assigned-editor.ts`, `src/main/editing-controls.ts`\n\n🔢 **Antal:** 17 funktioner och metoder  \n🎯 **Huvudområden:** Composition Root, callbacks, Dependency Injection, DOM, Clerk, Convex, asynkron identitetshantering och redigeringsbehörigheter.\n\n---",
    "📂 **Filer:** `src/main/editing-session.ts`, `src/main/world-selection.ts`, `src/main/terrain-paint.ts`\n\n🔢 **Antal:** 10 funktioner och metoder  \n🎯 **Huvudområden:** Realtidsprenumerationer, redigeringsbehörigheter, administratörsövertagande, världsval, Convex och ren beslutslogik.\n\n---",
    "📂 **Filer:** `src/application/database/convex-client.ts`, `src/application/authentication/clerk-authentication.ts`, `src/application/authentication/login-page.ts`\n\n🔢 **Antal:** 20 funktioner och metoder  \n🎯 **Huvudområden:** Databasanslutning, autentisering, sessionstoken, Clerk, Convex, callbacks, inloggningsgränssnitt och asynkrona operationer.\n\n---",
    "📂 **Filer:** `editor-layout.ts`, `header.ts`, `map-area.ts`, `tool-button.ts`, `terrain-button.ts` och `tool-section.ts`\n\n🔢 **Antal:** 20 funktioner och metoder  \n🎯 **Huvudområden:** DOM, komponentkomposition, navigation, SVG-ikoner, arv, getters, CSS-klasser och verktygsgrupper.\n\n---",
    "📂 **Filer:** `tool-section.ts`, `editor-action-button.ts`, `editor-action-icons.ts` och `icons.ts`\n\n🔢 **Antal:** 10 funktioner och metoder  \n🎯 **Huvudområden:** Verktygsgrupper, knappstatus, DOM, SVG, callbacks, dynamiska ikoner och funktionsuppslagning.\n\n---",
    "📂 **Filer:** `src/application/editor/left-panel.ts` och `src/application/editor/right-panel.ts`\n\n🔢 **Antal:** 19 funktioner och metoder  \n🎯 **Huvudområden:** Terrängval, verktygspaneler, DOM, redigeringsstatus, callbacks, behörighetsstyrda knappar och minikartans integration.\n\n---",
    "📂 **Filer:** `src/application/editor/minimap.ts` och `src/application/gallery/world-gallery.ts`\n\n🔢 **Antal:** 14 funktioner och metoder  \n🎯 **Huvudområden:** SVG, hexrutnät, zoomning, koordinattransformationer, händelselyssnare, synkronisering av kartvyer och världsgalleri.\n\n---",
    "📂 **Filer:** `src/application/map/map-grid.ts` och `src/application/map/world-map-controller.ts`\n\n🔢 **Antal:** 10 funktioner och metoder  \n🎯 **Huvudområden:** Koordinatnycklar, matematiska begränsningar, zoomskalor, kartramar, Convex-prenumerationer och terränggrafik.\n\n---",
    "📂 **Filer:** `visitors-layout.ts`, `visitor-locations.ts`, `visitor-marker.ts` och `visitor-statistics.ts`\n\n🔢 **Antal:** 18 funktioner och metoder  \n🎯 **Huvudområden:** Besökargränssnitt, geografiska kartor, koordinatprojektion, SVG-markörer, enhetskategorier, Convex-frågor och besöksstatistik.\n\n---",
    "📂 **Filer:** `src/application/visitors/visitor-tracking.ts` och `src/application/visitors/visitor-registration.ts`\n\n🔢 **Antal:** 6 funktioner och metoder  \n🎯 **Huvudområden:** User-Agent, enhetsidentifiering, koordinatvalidering, API-anrop, asynkron programmering och Convex-mutationer.\n\n---",
    "📂 **Filer:** `civ-wiki.ts`, `civ-wiki-home.ts`, `civ-wiki-main.ts`, `civ-wiki-navigation.ts`, `civ-wiki-terrains.ts`, `civ-wiki-icons.ts` och `catalog.ts`\n\n🔢 **Antal:** 20 funktioner och metoder  \n🎯 **Huvudområden:** Wikistruktur, sidnavigering, dynamiska paneler, terrängtabeller, SVG-grafik, ikonkataloger och tillgänglighet.\n\n---",
    "📂 **Filer:** `src/application/wiki/catalog.ts`, `convex/authentication.ts`, `convex/worlds.ts`, `convex/hexes.ts`, `convex/editingSessions.ts` och `convex/visitors.ts`\n\n🔢 **Antal:** 20 funktioner och callbacks  \n🎯 **Huvudområden:** Textformatering, autentisering, världshantering, hexagoner, databasindex, redigeringssessioner, behörighetskontroll och besöksregistrering.\n\n---",
    "📂 **Filer:** `convex/visitors.ts` och `api/visitor-location.ts`\n\n🔢 **Antal:** 4 funktioner och metoder  \n🎯 **Huvudområden:** Databasfrågor, besöksstatistik, geografiska koordinater, HTTP-rubriker, JSON-svar, Vercel och integritet.\n\n---",
    "📂 **Område:** `src/library-svg-graphics/`\n\n🔢 **Antal:** 20 funktioner och metoder  \n🎯 **Huvudområden:** SVG-element, DOM-manipulation, hexagoner, minikarta, SVG-attribut, återanvändbara ritfunktioner, penslar och navigeringsikoner.\n\n---",
    "📂 **Område:** `src/library-svg-graphics/icons/`\n\n🔢 **Antal:** 20 funktioner  \n🎯 **Huvudområden:** SVG-ikoner, återanvändbar grafik, kontinentfärger, redigeringskontroller, naturformationer och förbättringar.\n\n---",
    "📂 **Område:** `src/library-svg-graphics/icons/`\n\n🔢 **Antal:** 20 funktioner  \n🎯 **Huvudområden:** Markförbättringar, naturresurser, flodsystem, terrängikoner, SVG-geometri och klippmasker.\n\n---",
    "📂 **Område:** `src/library-svg-graphics/`\n\n🔢 **Antal:** 20 funktioner och metoder  \n🎯 **Huvudområden:** SVG-ikoner, världens underverk, terrängrendering, gradienter, klippmasker, procedurgenerering och återanvändbar grafik.\n\n---",
    "📂 **Område:** `src/library-svg-graphics/terrain/`\n\n🔢 **Antal:** 20 funktioner och metoder  \n🎯 **Huvudområden:** Terränggenerering, hexagongeometri, kullar, berg, gradienter, SVG-klippmasker, snö och procedurgenererade texturer.\n\n---",
    "📂 **Område:** `src/library-svg-graphics/`\n\n🔢 **Antal:** 13 funktioner och metoder  \n🎯 **Huvudområden:** Tundraterräng, kullar, berg, geografisk projektion, SVG-kartor, landkonturer och besöksmarkörer.\n\n---"
  ]
}
