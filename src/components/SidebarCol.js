import { Container, Row, Col } from "react-bootstrap";
import Figure from "react-bootstrap/Figure";
import Logo from "../assets/LogosPerfil.jpg";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import { GetApi } from "../util/GetApi";
import Global from "./General";
import { Suspense } from "react";

function SidebarCol({ post }) {
  let idCite = "";
  if (post) {
    if (post.favcite) {
      idCite = post.favcite;
    }
  }
  const { data } = GetApi(Global.urlAPI + "/cite/" + idCite);
  let isbn = "?q=key=AIzaSyDZXv-h8X6rBcHP9tOaBkMIQa18bQmQlNA";
  if (data["autor"] !== undefined) {
    isbn = "?q=" + data.isbn + "&key=AIzaSyDZXv-h8X6rBcHP9tOaBkMIQa18bQmQlNA";
  }
  const { data: book } = GetApi(Global.bookAPI + isbn);
  return (
    <Container>
      <br />
      <br />
      <Row className="d-flex justify-content-center align-items-center">
        <Col xs={5}>
          <Figure>
            <Figure.Image
              width={360}
              height={360}
              src={Logo}
              roundedCircle="true"
            />
          </Figure>
        </Col>
        <Col>
          <Card>
            <Card.Body>{post.name}</Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Suspense>
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  {book.items[0].volumeInfo.title}
                </Accordion.Header>
                <Accordion.Body>
                  <p>{data.cite}</p>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Suspense>
        </Col>
      </Row>
    </Container>
  );
}
export default SidebarCol;
