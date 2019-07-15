// This optional code is used to register a service worker.
// register() is not called by default.

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on subsequent visits to a page, after all the
// existing tabs open on the page have been closed, since previously cached
// resources are updated in the background.

// To learn more about the benefits of this model and instructions on how to
// opt-in, read http://bit.ly/CRA-PWA.

/**
 * @typedef {(registration: ServiceWorkerRegistration) => void} SWCallback
 * @typedef {{ onSuccess: SWCallback, onUpdate: SWCallback, onUpdated: SWCallback }} SWConfig
 */

const SERVICE_WORKER_URL = `${process.env.PUBLIC_URL}/service-worker.js`

export async function register(config) {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    // The URL constructor is available in all browsers that support SW.
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location)
    if (publicUrl.origin !== window.location.origin) {
      // Our service worker won't work if PUBLIC_URL is on a different origin
      // from what our page is served on. This might happen if a CDN is used to
      // serve assets; see https://github.com/facebook/create-react-app/issues/2374
      return
    }

    if (isLocalhost()) {
      // This is running on localhost. Let's check if a service worker still exists or not.
      if (!await checkValidServiceWorker(config)) return

      // Add some additional logging to localhost, pointing developers to the
      // service worker/PWA documentation.
      navigator.serviceWorker.ready.then(() => {
        console.log(
          'This web app is being served cache-first by a service ' +
          'worker. To learn more, visit http://bit.ly/CRA-PWA'
        )
      })
    }

    // Register service worker
    registerValidSW(config)
  }
}

/**
 * @param {SWConfig} config
 */
async function registerValidSW(config) {
  const { serviceWorker } = navigator
  try {
    const registration = await serviceWorker.register(SERVICE_WORKER_URL)

    if (!serviceWorker.controller) {
      // The window client isn't currently controlled so it's a new service
      // worker that will activate immediately
      return handleSwInstalled(registration, config)
    }

    // When the user asks to refresh the UI, we'll need to reload the window
    let preventDevToolsReloadLoop
    serviceWorker.oncontrollerchange = () => {
      // Ensure refresh is only called once.
      // This works around a bug in "force update on reload".
      if (preventDevToolsReloadLoop) return
      preventDevToolsReloadLoop = true
      console.log('[SW] Controller loaded')
      window.location.reload(true)
    }

    if (registration.waiting) {
      // SW is waiting to activate. Can occur if multiple clients open and
      // one of the clients is refreshed.
      return handleSwInstalled(registration, config)
    }
    if (registration.installing) {
      return listenInstalledStateChange(registration, config)
    }

    // We are currently controlled so a new SW may be found...
    // Add a listener in case a new SW is found,
    registration.onupdatefound = () => listenInstalledStateChange(registration, config)
  }
  catch (error) {
    console.error('[SW] Error during service worker registration:', error)
  }
}

/**
 * @this {ServiceWorkerRegistration}
 * @param {SWConfig} config
 */
function listenInstalledStateChange(registration, config) {
  // Execute callback
  if (config && config.onUpdate) {
    config.onUpdate(registration)
  }

  const installingWorker = registration.installing

  installingWorker.onstatechange = e => {
    if (e.target.state === 'installed') {
      handleSwInstalled(registration, config)
    }
  }
}

/**
 * @param {ServiceWorkerRegistration} registration
 * @param {SWConfig} config
 */
function handleSwInstalled(registration, config) {
  if (navigator.serviceWorker.controller) {
    // At this point, the updated precached content has been fetched,
    // but the previous service worker will still serve the older
    // content until all client tabs are closed.
    console.log(
      '[SW] New content is available and will be used when all ' +
      'tabs for this page are closed. See http://bit.ly/CRA-PWA.'
    )

    // Execute callback
    if (config && config.onUpdated) {
      config.onUpdated(registration)
    }
  } else {
    // At this point, everything has been precached.
    // It's the perfect time to display a
    // "Content is cached for offline use." message.
    console.log('[SW] Content is cached for offline use.')

    // Execute callback
    if (config && config.onSuccess) {
      config.onSuccess(registration)
    }
  }
}

async function checkValidServiceWorker(config) {
  try {
    // Check if the service worker can be found. If it can't reload the page.
    const response = await fetch(SERVICE_WORKER_URL)

    // Ensure service worker exists, and that we really are getting a JS file.
    if (
      response.status === 404 ||
      response.headers.get('content-type').indexOf('javascript') === -1
    ) {
      // No service worker found. Probably a different app. Reload the page.
      const registration = await navigator.serviceWorker.ready
      await registration.unregister()
      window.location.reload()

      return false
    } else {
      // Service worker found. Proceed as normal.
      return true
    }
  } catch (e) {
    console.log('No internet connection found. App is running in offline mode.', e)
    return false
  }
}

export async function unregister() {
  if ('serviceWorker' in navigator) {
    const registration = await navigator.serviceWorker.ready
    return await registration.unregister()
  }
  return true
}

/************************[ Utilities]****************************/
function isLocalhost() {
  return Boolean(
    window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
  )
}
