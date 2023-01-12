import { withAuthenticator } from "@aws-amplify/ui-react";
import App from "./main"
import NavBar from "./components/navBar";

// export function getServerSideProps() {
//   const renderedAt = new Date();
//   const formattedBuildDate = renderedAt.toLocaleDateString("en-US", {
//     dateStyle: "long",
//   });
//   const formattedBuildTime = renderedAt.toLocaleTimeString("en-US", {
//     timeStyle: "long",
//   });
//   return {
//     props: {
//       renderedAt: `${formattedBuildDate} at ${formattedBuildTime}`,
//     },
//   };
// }

function Home({ signOut, user, renderedAt }: any) {
  // const auth = { signOut, user }
  return (
    <div>
      {/* <NavBar auth={auth}></NavBar> */}
      <App user={user}></App>
    </div>
  );
}

export default Home;