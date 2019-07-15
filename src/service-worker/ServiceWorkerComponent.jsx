import { useEffect } from 'react'

import { register } from './service-worker'

const ServiceWorkerComponent = () => {

  useEffect(() => {
    const install = (registration) => {
      if (!registration.waiting) {
        // Just to ensure registration.waiting is available before
        // calling postMessage()
        return
      }

      registration.waiting.postMessage('skipWaiting')
    }


    const handleContentCached = () => console.info('App is cached.')
    const handleUpdateFound = () => console.warn('App has new version.')
    const handleInstalled = registration => {
      window.confirm('Install new version?', res => {
        if (res) install(registration)
      })
    }

    register({
      onUpdate: handleUpdateFound,
      onUpdated: handleInstalled,
      onSuccess: handleContentCached
    })
  }, [])

  return null
}

export default ServiceWorkerComponent
