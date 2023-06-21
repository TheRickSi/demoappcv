import "../styles/App.css";
import Navbar from "../components/NavbarR";
import Body from "./Body";
import { Suspense, useState } from "react";
import Login from "./Login";
import { PostApi } from "../util/PostApi";
import Global from "./General";
import { ErrorBoundary } from "react-error-boundary";
import ErrorMessage from "./ErrorMessage";
import CardLoader from "./CardLoader";
function App() {
  const [member, setMember] = useState(null);

  const validaUser = (member) => {
    setMember(member);
  };
  const { data: token } = PostApi(
    member ? Global.urlAPI + "/api-token-auth/" : null,
    member,
    ""
  );
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
