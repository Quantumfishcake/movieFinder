// import '../styles/globals.css'
// import type { AppProps } from 'next/app'

// import { Amplify, API } from 'aws-amplify';
// import awsconfig from '../src/aws-exports';

// Amplify.configure(awsconfig);

// export default function App({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />
// }


import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import awsExports from "../src/aws-exports";
import "../styles/globals.css";

Amplify.configure({ ...awsExports, ssr: true });

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp;