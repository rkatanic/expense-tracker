import "../styles/main.scss";
import type { AppProps } from "next/app";
import { AuthUserProvider } from "../context/AuthUserContext";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthUserProvider>
      <Component {...pageProps} />
    </AuthUserProvider>
  );
};

export default MyApp;
