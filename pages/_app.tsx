import { useEffect } from "react";
import type { AppProps } from "next/app";
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if ( "serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/service-worker.js")
          .then(() => console.log("SW registered"))
          .catch((err) => console.error("SW registration failed:", err));
      });
    }
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
