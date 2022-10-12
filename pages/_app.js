import { ToastContainer } from 'react-toastify'
import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.min.css'

function MyApp({ Component, pageProps }) {

  return (
    <>
      <Component {...pageProps} />
      <ToastContainer toastStyle={{ backgroundColor: "#222", color: 'white' }} />
    </>
  )

}

export default MyApp
