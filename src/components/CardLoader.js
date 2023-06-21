import Card from "react-bootstrap/Card";
import { Placeholder } from "react-bootstrap";

function CardLoader() {
  return (
    <>
      <Placeholder as={Card} animation="glow">
        <Placeholder as={Card.Header} animation="glow">
          <Placeholder xs={7} />
        </Placeholder>
        <Card.Body>
          <Placeholder as="p" animation="glow">
            <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{" "}
            <Placeholder xs={6} /> <Placeholder xs={8} />
          </Placeholder>
        </Card.Body>
      </Placeholder>
      <br />
    </>
  );
}
export default CardLoader;
