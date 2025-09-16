import { useState } from 'react'
import './App.css'
import { AuthContext } from './contexts/AuthContext'
import ToastProvider from './components/ui/Toast'
import { AuthPage } from './pages'

function App() {

  return (
    <AuthContext.Provider value={{}}>
      <ToastProvider>
        <AuthPage />
      </ToastProvider>
    </AuthContext.Provider>
  )
}

export default App
