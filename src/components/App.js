import "../styles/App.css";
import Navbar from "../components/NavbarR";
import Body from "./Body";
import { Suspense } from "react";
import Login from "./Login";
import Global from "./General";
import { ErrorBoundary } from "react-error-boundary";
import ErrorMessage from "./ErrorMessage";
import useSWRMutation from "swr/mutation";
import { postFetcher } from "../util/fetchers/postFetcher";
function App() {
  const apiAuth = Global.urlAPI + "/api-token-auth/";
  const { data: token, trigger } = useSWRMutation(
    { url: apiAuth, token: "" },
    postFetcher
  );
  let validaUser = async (memberLog) => {
    try {
      await trigger({ ...memberLog });
    } catch (error) {
      console.log(error);
    }
  };

  let body;
  if (token) {
    console.log("esto se repite mucho");
    body = (
      <>
        <Navbar />
        <ErrorBoundary FallbackComponent={ErrorMessage}>
          <Suspense fallback={<></>}>
            <Body token={token} />
          </Suspense>
        </ErrorBoundary>
      </>
    );
  } else {
    body = <Login getUser={validaUser} />;
  }
  return <div className="App">{body}</div>;
}

export default App;
