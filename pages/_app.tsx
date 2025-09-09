import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '../components/Header'


export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow p-6">
        <Header current={router.pathname} />
        <Component {...pageProps} />
      </div>
    </div>
  )
}
