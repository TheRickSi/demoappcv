import Card from "react-bootstrap/Card";
import ToggleButton from "react-bootstrap/ToggleButton";
import { BsReverseListColumnsReverse } from "react-icons/bs";
import { Button } from "react-bootstrap";
import { Suspense } from "react";
import { getFetcher } from "../util/fetchers/getFetcher";
import useSWR from "swr";
import Global from "./General";
import CardLoader from "./CardLoader";
import { ErrorBoundary } from "react-error-boundary";
import ErrorMessage from "./ErrorMessage";
import EntriTitle from "./EntriTitle";
function Entries({ member, setLikePost, username }) {
  const consulUrl = Global.urlAPI + `/cite?owner=` + username;
  const { data } = useSWR(consulUrl, getFetcher, {
    suspense: true,
  });
  return (
    <>
      <>
        {data.map((entrie, idx) => {
          return (
            <>
              <ErrorBoundary FallbackComponent={ErrorMessage}>
                <Suspense fallback={<CardLoader />}>
                  <Card>
                    <Card.Header>
                      <div className="d-flex" key={"containerdiv-" + idx}>
                        <EntriTitle isbn={entrie.isbn} idx={idx} />
                        <ToggleButton
                          className="p-2"
                          key={"toogle-" + idx}
                          id={`radio-${idx}`}
                          variant="outline-danger"
                          name="radio"
                          type="checkbox"
                          value={entrie.id}
                          checked={entrie.id === member.favcite}
                          onChange={() => {
                            setLikePost(entrie.id);
                          }}
                        >
                          Fav
                        </ToggleButton>
                      </div>
                    </Card.Header>
                    <Card.Body>
                      <blockquote className="blockquote mb-0">
                        <p> {entrie.cite} </p>
                        <footer className="blockquote-footer">
                          <div className="d-flex">
                            <div className="p-2 flex-grow-1">
                              {entrie.autor} in page{" "}
                              <cite title="Source Title">{entrie.page}</cite>
                            </div>
                            <Button variant="outline-primary">
                              <BsReverseListColumnsReverse className="align-self-center" />
                            </Button>
                          </div>
                        </footer>
                      </blockquote>
                    </Card.Body>
                  </Card>
                  <br />
                  <br />
                  <br />
                </Suspense>
              </ErrorBoundary>
            </>
          );
        })}
      </>
    </>
  );
}
export default Entries;
