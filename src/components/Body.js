import { Row, Col, Container } from "react-bootstrap";
import SidebarCol from "./SidebarCol";
import Entries from "./Entries";
import { Suspense } from "react";
import Global from "./General";
import { ErrorBoundary } from "react-error-boundary";
import CardLoader from "./CardLoader";
import ErrorMessage from "./ErrorMessage";
import { getFetcher } from "../util/fetchers/getFetcher";
import { putFetcher } from "../util/fetchers/putFetcher";
import useSWR, { useSWRConfig } from "swr";

function Body({ token }) {
  const username = JSON.parse(token.config.data).username;
  const userUrl = Global.urlAPI + "/member/" + username + "/";
  const { mutate } = useSWRConfig();
  const { data: member } = useSWR(userUrl, getFetcher, {
    suspense: true,
  });
  const changeLiked = async (idCite) => {
    let article = {
      name: member.name,
      favcite: idCite,
    };
    mutate(
      userUrl,
      putFetcher(userUrl, JSON.stringify(article), token.data.token),
      {
        optimisticData: article,
        rollbackOnError(error) {
          // If it's timeout abort error, don't rollback
          return error.name !== "AbortError";
        },
      }
    );
  };
  return (
    <Container fluid>
      <Row className="justify-content-center">
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
          <ErrorBoundary FallbackComponent={ErrorMessage}>
            <Suspense fallback={<CardLoader />}>
              <Entries
                member={member}
                setLikePost={changeLiked}
                username={username}
              />
            </Suspense>
          </ErrorBoundary>
          <br />
          <br />
          <br />
        </Col>
      </Row>
    </Container>
  );
}
export default Body;
