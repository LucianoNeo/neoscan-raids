import { ToastContainer } from 'react-toastify'
import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.min.css'

function MyApp({ Component, pageProps }) {

  return (
    <>
      <Component {...pageProps} />
      <ToastContainer toastStyle={{ backgroundColor: "#2A2634", color: 'white', fontSize: 28, textAlign: 'right', padding: 20 }} />
    </>
  )

}

export default MyApp
