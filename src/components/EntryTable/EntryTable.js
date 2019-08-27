import React, { Component } from "react";
import { Icon, Menu, Table, Button, Input } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { setTaskId } from "../../redux/tasks/actions";
import { connect } from "react-redux";

class EntryTable extends Component {
  state = { adding: false, areasOfOperation: this.props.areasOfOperation };
  setTaskId = id => {
    localStorage.setItem("taskId", id);
    this.props.setTaskId(id);
  };

  inputHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = () => {
    const { order, numeral, title, areasOfOperation } = this.state;

    areasOfOperation.push({ numeral, order, name: title });
    this.setState({
      adding: false,
      areasOfOperation,
      numeral: "",
      order: "",
      name: ""
    });
    // api call for adding AOP here
  };

  render() {
    const { adding, order, numeral, title, areasOfOperation } = this.state;
    const rows = areasOfOperation.map(({ name, numeral, order, id }) => {
      return (
        <Table.Row>
          <Table.Cell selectable>
            {" "}
            <Link to="/entry" onClick={() => this.setTaskId(id)}>
              {order}
            </Link>
          </Table.Cell>
          <Table.Cell selectable>
            {" "}
            <Link to="/entry" onClick={() => this.setTaskId(id)}>
              {numeral}
            </Link>
          </Table.Cell>
          <Table.Cell selectable>
            {" "}
            <Link to="/entry" onClick={() => this.setTaskId(id)}>
              {name}
            </Link>
          </Table.Cell>
        </Table.Row>
      );
    });

    const inputRow = (
      <>
        <Table.Row>
          <Table.Cell>
            <Input
              placeholder="Order"
              name="order"
              value={order}
              onChange={e => this.inputHandler(e)}
            />
          </Table.Cell>
          <Table.Cell>
            <Input
              placeholder="Numeral"
              name="numeral"
              value={numeral}
              onChange={e => this.inputHandler(e)}
            />
          </Table.Cell>
          <Table.Cell>
            <Input
              placeholder="Title"
              name="title"
              value={title}
              onChange={e => this.inputHandler(e)}
            />
          </Table.Cell>
        </Table.Row>
      </>
    );
    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Order Number</Table.HeaderCell>
            <Table.HeaderCell>Roman Numeral</Table.HeaderCell>
            <Table.HeaderCell>Title</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {rows}
          {adding && inputRow}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="3">
              <Button
                style={{
                  fontSize: "1.2em",
                  padding: "10px",
                  width: "100px"
                }}
                color="green"
                onClick={() =>
                  adding
                    ? this.submitHandler()
                    : this.setState({ adding: true })
                }
              >
                <Icon name="add" />
                {adding ? "Submit" : "New"}
              </Button>
              <Menu floated="right" pagination>
                <Menu.Item as="a" icon disabled>
                  <Icon name="chevron left" />
                </Menu.Item>
                <Menu.Item as="a">1</Menu.Item>
                <Menu.Item as="a" icon disabled>
                  <Icon name="chevron right" />
                </Menu.Item>
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    );
  }
}

const mapDispatchToProps = {
  setTaskId
};

export default connect(
  state => state,
  mapDispatchToProps
)(EntryTable);
