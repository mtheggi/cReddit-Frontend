import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Client_ID, NODE_ENV } from './constants.js'
import { GoogleOAuthProvider } from '@react-oauth/google'
async function enableMocking() {
  if (NODE_ENV !== 'development') {
    return
  }
  const { worker } = await import('./mocks/browser')
  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start()
}
enableMocking().then(() => {

  ReactDOM.createRoot(document.getElementById('root')).render(
    <GoogleOAuthProvider clientId={Client_ID} >
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </GoogleOAuthProvider >,
  )
})

