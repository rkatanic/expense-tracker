import "../styles/main.scss";
import type { AppProps } from "next/app";
import { AuthUserProvider } from "../context/AuthUserContext";
import { GlobalContextProvider } from "../context/GlobalContext";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthUserProvider>
      <GlobalContextProvider>
        <div className="bg-white dark:bg-gray-900">
          <Component {...pageProps} />
        </div>
      </GlobalContextProvider>
    </AuthUserProvider>
  );
};

export default MyApp;
