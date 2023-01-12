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
import type { AppProps } from 'next/app'

import NavBar from "./components/navBar";

import { withAuthenticator } from "@aws-amplify/ui-react";

import "../styles/globals.css";

interface UpdatedAppProps extends AppProps{
  user: {
    Session: string,
    username:string
  },
  signOut: Function,
}

Amplify.configure({ ...awsExports, ssr: true });

function MyApp({ Component, pageProps, user, signOut }: UpdatedAppProps) {
  const auth = { signOut, user }

  return <>
    <NavBar auth={auth}></NavBar>
    <Component {...pageProps} user={user} signOut={signOut} />
  </>
}

// export default MyApp;
export default withAuthenticator(MyApp);