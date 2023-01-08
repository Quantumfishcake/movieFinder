import { withAuthenticator } from "@aws-amplify/ui-react";
import App from "./main"

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

function Home({ signOut, user, renderedAt }:any) {
  return (
    <div style={{ padding: 50 }}>
      <App></App>
    </div>
  );
}

export default withAuthenticator(Home);