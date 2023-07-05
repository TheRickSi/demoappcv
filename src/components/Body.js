import { Row, Col, Container } from "react-bootstrap";
import SidebarCol from "./SidebarCol";
import Entries from "./Entries";
import { useState, Suspense } from "react";
import Global from "./General";
import { ErrorBoundary } from "react-error-boundary";
import CardLoader from "./CardLoader";
import ErrorMessage from "./ErrorMessage";
import { GetApi } from "../util/GetApi";
import { PutApi } from "../util/PutApi";

function Body({ token }) {
  const [liked, setLiked] = useState(null);
  const { data: member, mutate } = GetApi(
    Global.urlAPI + "/member/" + token.Form.username
  );
  const changeLiked = async (idCite) => {
    let article = {
      username: token.Form.username,
      password: token.Form.password,
      name: member.name,
      favcite: idCite,
    };
    setLiked(idCite);
    await trigger({ ...article });
    mutate({ optimisticData: article });
  };

  const { trigger } = PutApi(
    Global.urlAPI + "/member/" + member.username + "/",
    token.Response.token
  );
  return (
    <Container fluid>
      <Row className="justify-content-center">
        <>
          <Col sm={4} xs={12}>
            <ErrorBoundary FallbackComponent={ErrorMessage}>
              <Suspense fallback={<CardLoader />}>
                <SidebarCol post={member} />
              </Suspense>
            </ErrorBoundary>
          </Col>
          <Col sm={7} xs={12}>
            <br />
            <br />
            <>
              <ErrorBoundary FallbackComponent={ErrorMessage}>
                <Suspense fallback={<CardLoader />}>
                  <Entries
                    member={member}
                    setLikePost={changeLiked}
                    token={token}
                  />
                </Suspense>
              </ErrorBoundary>
              <br />
              <br />
              <br />
            </>
          </Col>
        </>
      </Row>
    </Container>
  );
}
export default Body;
