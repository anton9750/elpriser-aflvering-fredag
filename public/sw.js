// Ren vanilla javascript service worker, uden noget build-værktøj.
// Formål: gøre appen installerbar og lade den virke offline for de dele
// der allerede er besøgt, ved at cache statiske filer efterhånden som de hentes.

// Bump dette tal når du vil tvinge gamle caches til at blive ryddet op,
// fx hvis du ændrer cache-strategien herunder.
const CACHE_NAVN = 'elpriser-nu-cache-v1'

// Udregnes ud fra hvor sw.js selv ligger, så den samme fil virker uanset om
// appen ligger på domænets rod (lokalt) eller i en undermappe som
// "/hygge/" (GitHub Pages' projekt-sider).
const BASE = new URL('./', self.location).pathname

// Filer der altid findes med samme navn (ikke Vites hash'ede js/css-filer),
// så dem kan vi trygt precache med det samme ved installation.
const PRECACHE_FILER = [BASE, BASE + 'manifest.webmanifest', BASE + 'favicon.svg', BASE + 'pwa-icon-192.png', BASE + 'pwa-icon-512.png']

self.addEventListener('install', (event) => {
  // skipWaiting gør at en ny version af service workeren tager over med det samme,
  // i stedet for at vente på at alle gamle faner med den gamle version lukkes
  self.skipWaiting()

  event.waitUntil(caches.open(CACHE_NAVN).then((cache) => cache.addAll(PRECACHE_FILER)))
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      // Rydder gamle versioner af cachen op, så vi ikke samler på forældede filer
      const cacheNavne = await caches.keys()
      await Promise.all(cacheNavne.filter((navn) => navn !== CACHE_NAVN).map((navn) => caches.delete(navn)))

      // Overtager straks kontrollen over alle åbne faner
      await self.clients.claim()
    })(),
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Vi blander os kun i GET-kald til vores egen side. Kald til elprisenligenu.dk's
  // API skal altid gå direkte ud på nettet, så brugeren får friske priser og ikke
  // gamle cachede priser fra tidligere besøg.
  if (request.method !== 'GET' || url.origin !== self.location.origin) {
    return
  }

  // For selve siden (navigation) prøver vi nettet først, så brugeren altid får
  // den nyeste version når de er online, men falder tilbage til cachen offline.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(async () => {
        const cache = await caches.open(CACHE_NAVN)
        const cachetSvar = await cache.match(BASE)
        return cachetSvar ?? Response.error()
      }),
    )
    return
  }

  // For alt andet statisk (js, css, billeder osv.) bruger vi "cache først,
  // og gem en frisk kopi i baggrunden", så filerne også virker offline
  // efter første besøg.
  event.respondWith(
    caches.match(request).then((cachetSvar) => {
      const netværksHentning = fetch(request)
        .then((netværksSvar) => {
          if (netværksSvar.ok) {
            const kopiTilCache = netværksSvar.clone()

            // event.waitUntil holder service workeren "i live" indtil cache.put er færdig.
            // Uden den kan browseren finde på at lukke workeren ned, lige efter svaret er
            // sendt tilbage, og så når filen aldrig at blive gemt i cachen.
            event.waitUntil(caches.open(CACHE_NAVN).then((cache) => cache.put(request, kopiTilCache)))
          }
          return netværksSvar
        })
        // Hvis netværket fejler (fx offline) uden at vi har en cachet kopi at falde
        // tilbage på, skal vi stadig returnere et gyldigt Response-objekt
        .catch(() => cachetSvar ?? Response.error())

      return cachetSvar ?? netværksHentning
    }),
  )
})
