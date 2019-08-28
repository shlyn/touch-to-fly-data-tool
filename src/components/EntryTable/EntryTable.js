import React, { Component } from "react";
import { Icon, Menu, Table, Button, Input } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { setTaskId, setTaskName } from "../../redux/tasks/actions";
import { connect } from "react-redux";
import { createAreaOfOperation } from "../../api";

class EntryTable extends Component {
  state = { adding: false, areasOfOperation: this.props.areasOfOperation };
  setTask = ({ id, name }) => {
    localStorage.setItem("taskId", id);
    localStorage.setItem("taskName", name);
    this.props.setTaskId(id);
    this.props.setTaskName(name);
  };

  inputHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  inputHandlerAOO = (e, i) => {
    const { areasOfOperation } = this.state;
    areasOfOperation[i][e.target.name] = e.target.value;
    areasOfOperation[i].updated = true;
    console.log(areasOfOperation);
    this.setState({ areasOfOperation });
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
    createAreaOfOperation({ order, numeral, title });
  };

  updateHandler = () => {
    const { areasOfOperation } = this.state;
    const { updateAOOHandler, editHandler } = this.props;

    areasOfOperation.map(data => {
      const { updated, id, order, numeral, name } = data;
      if (updated === true) {
        updateAOOHandler({ id, order, numeral, name });
      }
    });

    editHandler();
  };

  render() {
    const { editing, editHandler } = this.props;
    const { adding, order, numeral, title, areasOfOperation } = this.state;
    const rows = areasOfOperation.map(({ name, numeral, order, id }, i) => {
      if (editing) {
        return (
          <Table.Row>
            <Table.Cell>
              <Input
                placeholder={order}
                name="order"
                value={order}
                onChange={e => this.inputHandlerAOO(e, i)}
              />
            </Table.Cell>
            <Table.Cell>
              <Input
                placeholder={numeral}
                name="numeral"
                value={numeral}
                onChange={e => this.inputHandlerAOO(e, i)}
              />
            </Table.Cell>
            <Table.Cell>
              <Input
                placeholder={name}
                name="name"
                value={name}
                onChange={e => this.inputHandlerAOO(e, i)}
              />
            </Table.Cell>
          </Table.Row>
        );
      } else {
        return (
          <Table.Row>
            <Table.Cell selectable>
              {" "}
              <Link to="/entry" onClick={() => this.setTask({ id, name })}>
                {order}
              </Link>
            </Table.Cell>
            <Table.Cell selectable>
              {" "}
              <Link to="/entry" onClick={() => this.setTask({ id, name })}>
                {numeral}
              </Link>
            </Table.Cell>
            <Table.Cell selectable>
              {" "}
              <Link to="/entry" onClick={() => this.setTask({ id, name })}>
                {name}
              </Link>
            </Table.Cell>
          </Table.Row>
        );
      }
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
      <>
        <Button
          color={editing ? "gray" : "green"}
          onClick={() => editHandler()}
        >
          {editing ? "Cancel" : "Edit"}
        </Button>
        {editing && (
          <Button
            color="green"
            onClick={() => this.updateHandler()}
            style={{ marginLeft: "10px" }}
          >
            Submit
          </Button>
        )}
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
                  disabled={editing}
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
      </>
    );
  }
}

const mapDispatchToProps = {
  setTaskId,
  setTaskName
};

export default connect(
  state => state,
  mapDispatchToProps
)(EntryTable);
