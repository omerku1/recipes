import { useState, useEffect } from 'react'

// Custom hook to manage Wake Lock API for keeping screen on during cooking
export const useWakeLock = () => {
  const [wakeLock, setWakeLock] = useState(null)
  const [isSupported, setIsSupported] = useState(false)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    // Check if Wake Lock API is supported
    if ('wakeLock' in navigator) {
      setIsSupported(true)
    }
  }, [])

  const requestWakeLock = async () => {
    if (!isSupported) {
      console.log('Wake Lock API is not supported in this browser')
      return false
    }

    try {
      const lock = await navigator.wakeLock.request('screen')
      setWakeLock(lock)
      setIsActive(true)

      // Handle wake lock release
      lock.addEventListener('release', () => {
        console.log('Wake Lock was released')
        setIsActive(false)
      })

      console.log('Wake Lock is active')
      return true
    } catch (err) {
      console.error(`Wake Lock error: ${err.name}, ${err.message}`)
      return false
    }
  }

  const releaseWakeLock = async () => {
    if (wakeLock) {
      try {
        await wakeLock.release()
        setWakeLock(null)
        setIsActive(false)
        console.log('Wake Lock released successfully')
      } catch (err) {
        console.error(`Failed to release wake lock: ${err}`)
      }
    }
  }

  // Re-request wake lock when page becomes visible again
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (wakeLock !== null && document.visibilityState === 'visible') {
        requestWakeLock()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [wakeLock])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (wakeLock) {
        releaseWakeLock()
      }
    }
  }, [wakeLock])

  return {
    isSupported,
    isActive,
    requestWakeLock,
    releaseWakeLock,
  }
}

