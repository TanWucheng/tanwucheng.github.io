importScripts("https://g.alicdn.com/kg/workbox/3.3.0/workbox-sw.js");

if (workbox) {
    workbox.setConfig({
        modulePathPrefix: "https://g.alicdn.com/kg/workbox/3.3.0/",
    });

    workbox.precaching.precache(["/", "/index.html", "/404.html", "/offline.html"]);

    workbox.routing.registerRoute(
        new RegExp("^https?://tanwucheng.github.io/?$"),
        workbox.strategies.networkFirst()
    );

    workbox.routing.registerRoute(
        new RegExp(".*.html"),
        workbox.strategies.networkFirst()
    );

    workbox.routing.registerRoute(
        new RegExp(".*.(?:js|css|jpg|png|gif)"),
        workbox.strategies.staleWhileRevalidate()
    );

    /**
     * Handling Offline Page fallback
     */
    this.addEventListener('fetch', event => {
        if (event.request.mode === 'navigate' || (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html'))) {
            event.respondWith(
                fetch(event.request.url).catch(error => {
                    console.log("fetch error", error);
                    // Return the offline page
                    return caches.match('/offline.html');
                })
            );
        }
        else {
            // Respond with everything else if we can
            event.respondWith(caches.match(event.request)
                .then(function (response) {
                    return response || fetch(event.request);
                })
            );
        }
    });
}
