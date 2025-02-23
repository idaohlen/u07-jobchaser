# Teoretiska frågor

## Vecka 1

**Allmänt om ramverket React: Hur/Varför uppkom det? Vad är centralt i React?**

React byggdes utvecklare från Facebook, som behövde ett effektivare och mer lättunderhållet sätt att kunna hantera dynamiska användargränssnitt än andra lösningar som fanns att tillgå. Prototypen till React användes först inom Facebook, men släpptes 2013 till allmänheten.

De centrala delarna i React är komponenter, JSX, state och props. Det finns mycket annat inbyggt React utöver det, men det är dessa delar som gör frameworks som React till ett kraftfullt verktyg som underlättar kodningen i frontend för webben.

**Vad är JSX?**

JSX är ett Syntax som React använder för att kunna skriva HTML i JavaScript, vilket gör det enkelt att visualisera strukturen av användargränssnittet. Att ha tillgång till JavaScript när man skriver HTML gör det smidigt att jobba med konditionell rendering och dynamiskt innehåll.

**Vad är en komponent?**

För att göra koden på en hemsida mer läsbar och organiserad kan man dela upp koden i komponenter, alltså mindre byggstenar. Man designar sin komponent på ett ställe, och sedan kan man importera den i sin JSX-kod i formen av en egen HTML-tagg.

**Vad är props?**

Props är ett sätt att skicka vidare data från en förälderkomponent till en barnkomponent. I JSX gör man detta genom attribut i komponentens HTML-tagg i den förälderkomponent man importerat barnkomponenten i. I barnkomponenten kan man komma åt propsen genom placeholders som visar att här ska datat som skickats vidare från förälderkomponenten visas.

**Vad menas med one-way-dataflow?**

Med det menas att data i komponenter bara skickas åt ett håll i ett komponentträd, från föräldrakomponenter och nedåt till barnkomponenter och inte tvärtom. Detta gör det enklare att förstå dataflödet i en applikation och underlättar vid felsökning.

**Hur kan man använda sig av konditionell rendering i React?**

Vissa element eller komponenter vill man bara visa om särskilda villkor uppfylls, och i JSX kan man göra detta med främst ternary operators och short circuiting. Man kan också hantera denna logiken utanför JSX-returneringen med if-statements och förvara JSX-koden i en variabel som man använder i JSX-returneringen för att hålla return-koden mer städad och fri från komplex JavaScript-logik, vilket kan göra koden mer läsbar.

**Vad menas med en återanvändbar komponent?**

En återanvändbar komponent innebär att man designar en komponent så att den går att använda på flera ställen i sin kod. Komponenten blir som en "mall", och genom att använda props kan man mata in värden som gör att varje instans av den återanvända komponenten har unikt innehåll.

## Vecka 2

**Vad är state i React?**

State representerar data som kan komma att förändras, och vid förändring ska detta leda till en uppdatering i användargränssnittet för att reflektera datas nya värde. Varje komponent har ett lokalt state skilt från andra komponenter, även de som är instanser av samma komponent, d.v.s. state i en `<Button/>` komponent delar inte state med en annan `<Button/>` komponent.

**Vad är det för skillnad mellan state och props?**

State är data (lokal till en komponent) som kan förändras, medan props är oföränderliga värden som skickas från en förälder till ett barn. Props kan baseras på state i en förälderkomponent så att barnkomponenten uppdateras när föräldern gör det, men det är inte propsen i sig som är ansvarig för detta, utan det är i grunden state. Barnkomponenter har ingen makt att förändra state i en förälderkomponent; man kan skicka events mellan barn och förälder för att berätta för föräldern att den behöver uppdatera sitt state, men uppdateringen i sig måste ske i föräldern.

**Vad menas med en kontrollerad komponent i React?**

Det betyder att värdena i formulärelement (input, textfält, etc.) är kopplade till ett state i React. Genom att låta React hantera inmatningsvärden i ett formulär får man mer kontroll och flexibilitet i hur man kan använda värdena. En oreglerad komponent hanteras av DOM, och om man inte har ett behov över att ha full kontroll över elementet kan man använda useRef för att hämta värden från ett formulärelement.

**Vad är en callback handler?**

En callback handler används huvudsakligen i React för att skicka vidare en funktion genom props till en komponent. Du definierar en funktion i en förälderkomponent, sedan skickar du med den som ett prop-värde till ett barn som då kan anropa funktionen när t.ex. en knapp klickas på.

**Vad menas med "lifting state up"?**

Istället för att definiera ett state i en komponent så lägger man state i dess förälderkomponent istället. På det sättet kan man sprida datat från förälderkomponenten till flera barnkomponenter som är beroende av samma data, och då slippa deklarera samma state på flera ställen och inte behöva skicka vidare information om vad som händer via events. Om ett state förändras i en förälderkomponent så känner barnkomponenterna av det och uppdateras när föräldern gör det. Så “lifting state up” innebär att när man märker att en barnkomponent är beroende av samma data som föräldern eller att man kanske kan refaktorisera sitt state till ett gemensamt state, då kan det vara lämpligt att “flytta upp” sitt state.

**Vad är syftet med useEffect-hook i React?**

UseEffects huvudsakliga uppgift är att utföra “side effects” som synkroniserar det som händer i React med system utanför, t.ex. för att hämta data med fetch, manipulera DOM:en, kommunicera med tredjepartsbibliotek, timers, etc.

**Vad är syftet kring den s.k dependency-arrayen i useEffect?**

Den är till för att ge flexibilitet att exekvera kod när det sker ändringar i specifika variabler som man anger i dependency-arrayen. Om man anger en tom array så kommer effekten bara att köras vid den första renderingen av komponenten.

**Vilka för- och nackdelar finns det att använda Tailwind CSS?**

Tailwind är populärt hos utvecklare av den anledningen att istället för att behöva hoppa över till sina CSS filer varje gång man behöver lägga till en liten stylinggrej så har man i Tailwind tillgång till många små utility classes som innehåller CSS-styling. Dessa klasser kan man enkelt stoppa in på sina element utan att behöva skriva CSS-koden själv. En nackdel med Tailwind är om man förlitar sig helt på att styla genom Tailwind är att ens element får väldigt många klasser på sig, vilket kan göra ens kod svår att läsa och navigera om man inte installerar extensions som döljer dessa.

Att lära sig Tailwind CSS kan också kännas lite kaka på kaka om man redan kan CSS, då man behöver lära sig nya namn för klasser som representerar properties i vanilla CSS.

## Vecka 3

**Vilka fördelar finns det med att använda NextJS? Nackdelar?**

NextJS är ett fullstackbibliotek för React som gör React smidigare att integrera mellan frontend och backend. Det innehåller också många andra hjälpsamma funktioner så som stöd för server-side rendering, statisk sid-generering, bildoptimering, och mycket annat.

Nackdelarna med NextJS kan vara att man har mindre kontroll över hur saker fungerar under the hood, och man behöver anpassa sin kod efter hur NextJS fungerar. Det har också en hyfsat stor lärandekurva, och kan ta lång tid att bygga stora projekt.

**Vad menas med Routing? På vilket sätt löser NextJS Routing v.s "vanliga React"?**

Med routing innebär navigation mellan sidor som reflekteras i webbläsarens adressfält. React utan externa bibliotek har inget bra sätt att hantera routing, så det hanteras så gott som alltid med paket som t.ex. React router. I React router behöver man manuellt ställa in sina rutter, och konfigurationen blir lätt komplex när man behöver hantera dynamiska rutter, omdirigeringar och skyddade sidor.

Next.js hanterar routing med ett filbaserat system, där det automatiskt genererar rutter beroende på strukturen i mappen pages eller app. Detta tar bort behovet av manuellt behöva konfigurera sina rutter.

**Vad menas med Reacts ekosystem? Nämn några viktiga bibliotek i Reacts ekosystem?**

Reacts utvecklingsteam är bara ansvariga för själva React-paketet, ingenting annat runt omkring. Men då det finns så många engagerade utvecklare finns det många bibliotek som utvecklats för att bygga ut funktionalitet i React, många av vilka är nästan synonymt med eller obligatoriskt inom React-utveckling av den anledningen att så många nyttjar dessa bibliotek som existerar i “ekosystemet”.

Några av de viktigaste biblioteken i Reacts ekosystem är bland annat React Router, React Query, Redux, Styled Components, React Hook Form m.m. Många av de viktigaste biblioteken har med state, styling, formulär och API-anrop att göra, saker som en majoritet av React applikationer kräver bra och effektiva lösningar på där vanilla React brister.

**Vad är syftet med useContext? Vilket problem med props löser den?**

Ett problem som kan uppstå när man har komponenter långt ner i komponent-trädet som är beroende av data som skickas ner från toppen är s.k. “prop drilling”. För att komponenten längst ner ska kunna få tillgång till data från toppen måste datat ärvas i varje komponent hela vägen ner, oavsett om komponenterna i mitten själva behöver datat. Att deklarera en prop på en komponent som inte behöver den kan kännas ganska onödigt, så useContext är ett sätt att lösa detta på genom att man skapar en “kontext” som lagrar state istället för att definiera det direkt i en komponent. Denna kontext kan man sedan komma åt för att läsa av state i de komponenter som behöver tillgång till det. Detta ger mer flexibilitet i hur man kan strukturera sin kod i relation till state då komponenter inte behöver följa en strikt arvsstruktur för att komma åt samma databeroenden.

## Vecka 4

**Vad är Redux Toolkit?**

Redux Toolkit är en påbyggnad på Redux-biblioteket skapat för att förenkla moment när man integrerar Redux med sitt projekt. Redux är ett avancerat state-hanteringsbibliotek, och innan hooks som useContext introducerades var det mycket populärt att använda sig av bland annat Redux för att hantera globalt state, då React länge inte hade ett bra och enkelt sätt att göra det själv.

**När, i vilka situationer vill man använda Redux Toolkit?**

Redux är speciellt önskvärt att använda till stora komplexa applikationer som kräver ett strukturerat, konsistent och skalbart sätt att hantera tillstånd på. I mindre projekt kan Redux bli onödigt komplicerat, så då kan det räcka med att använda sig av Reacts inbyggda Context API och useContext om man behöver ett globalt state.