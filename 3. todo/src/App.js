import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './styles.css';
import { useState, useId } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';

export default function App() {
  const [toDoList, setToDoList] = useState([]);
  const [item, setItem] = useState('');
  const [counter, setCounter] = useState(0);

  function handleDelete(id) {
    const newtoDoList = toDoList.filter((item) => item.id !== id);

    setToDoList(newtoDoList);
  }

  function renderList() {
    const listItems = toDoList.map((list) => (
      <ListGroup.Item key={list.id}>
        {list.item}{' '}
        <Button
          align="right"
          variant="danger"
          type="button"
          onClick={() => handleDelete(list.id)}
        >
          Delete
        </Button>
      </ListGroup.Item>
    ));
    return (
      <Row className="justify-content-md-center">
        <Col></Col>
        <Col>
          <ListGroup>{listItems}</ListGroup>
        </Col>
        <Col></Col>
      </Row>
    );
  }

  function handleAdd() {
    setCounter(counter + 1);
    setToDoList([...toDoList, { id: counter, item: item }]);
  }

  function handleChange(event) {
    setItem(event.target.value);
  }

  return (
    <div className="App">
      <h1>To Do List</h1>
      <Container>
        <Form>
          <Row className="justify-content-md-center">
            <Col md={{ span: 6, offset: 3 }}>
              <Form.Group>
                <Form.Control
                  type="text"
                  id="todo"
                  name="todo"
                  value={item}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md="auto">
              <Button variant="success" onClick={() => handleAdd()}>
                Add
              </Button>{' '}
            </Col>
            <Col></Col>
          </Row>
        </Form>

        <div className="row">
          <div className="col">{renderList()}</div>
        </div>
      </Container>
    </div>
  );
}
