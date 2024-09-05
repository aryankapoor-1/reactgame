import "../styles/globals.css";
import { useEffect } from "react";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  useEffect(() => {}, []);

  return (
    <>
      <Head>
        <title>React Three Game</title>
        <meta name="description" content="React Three Game" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
