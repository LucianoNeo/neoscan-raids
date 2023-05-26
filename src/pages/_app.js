import { ToastContainer } from "react-toastify";
import "../../styles/globals.css";
import "react-toastify/dist/ReactToastify.min.css";
import { Theme } from "@twilio-paste/core/theme";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Theme.Provider theme="twilio-dark">
        <Component {...pageProps} />
        <ToastContainer
          toastStyle={{
            backgroundColor: "#2A2634",
            color: "white",
            fontSize: 28,
            textAlign: "right",
            padding: 20,
          }}
        />
      </Theme.Provider>
    </>
  );
}

export default MyApp;
