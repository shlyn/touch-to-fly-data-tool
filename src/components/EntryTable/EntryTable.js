import React, { Component } from "react";
import { Icon, Table, Button, Input } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { setTaskId, setTaskName } from "../../redux/tasks/actions";
import { connect } from "react-redux";
import {
  createAreaOfOperation,
  deleteAreaOfOperation
} from "../../api/AreasOfOperation/areasOfOperation";

class EntryTable extends Component {
  state = {
    adding: false,
    areasOfOperation: this.props.areasOfOperation
  };

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
    const { updateAOOHandler, successHandler } = this.props;

    areasOfOperation.map(data => {
      const { updated, id, order, numeral, name } = data;
      if (updated === true) {
        updateAOOHandler({ id, order, numeral, name });
      }
      return null;
    });
    successHandler();
  };

  cancelHandler = async () => {
    const { editHandler, getAreasOfOperation } = this.props;

    this.setState({
      areasOfOperation: await getAreasOfOperation()
    });

    editHandler();
  };

  deleteHandler = ({ name, id }) => {
    const { updateAreasOfOperation } = this.props;

    const result = window.confirm(`Are you sure you want to delete ${name}?`);
    if (result === true) {
      const newAreasOfOperation = updateAreasOfOperation({ id });
      deleteAreaOfOperation({ id });
      this.setState({ areasOfOperation: newAreasOfOperation });
    }
  };

  render() {
    const { editing, editHandler } = this.props;
    const { adding, order, numeral, title, areasOfOperation } = this.state;

    const rows = areasOfOperation.map(({ name, numeral, order, id }, i) => {
      if (editing) {
        return (
          <Table.Row key={id + name}>
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
                style={{ width: "100%" }}
              />
            </Table.Cell>
            <Table.Cell>
              {" "}
              <Button
                style={{
                  fontSize: "1.2em",
                  padding: "10px",
                  width: "75px"
                }}
                color="red"
                icon
                onClick={() => this.deleteHandler({ id, name })}
              >
                <Icon name="trash" position="right" />
              </Button>
            </Table.Cell>
          </Table.Row>
        );
      } else {
        return (
          <Table.Row key={id}>
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
              style={{ width: "100%" }}
            />
          </Table.Cell>
        </Table.Row>
      </>
    );
    return (
      <>
        <Button
          disabled={adding}
          color={editing ? "grey" : "green"}
          onClick={() => (editing ? this.cancelHandler() : editHandler())}
        >
          {editing ? "Done" : "Edit"}
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
              <Table.HeaderCell width="3">Order Number</Table.HeaderCell>
              <Table.HeaderCell width="3">Roman Numeral</Table.HeaderCell>
              <Table.HeaderCell width="10">Title</Table.HeaderCell>
              {editing && <Table.HeaderCell width="2">Delete</Table.HeaderCell>}
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {rows}
            {adding && inputRow}
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan={editing ? "4" : "3"}>
                {adding && (
                  <Button
                    color="grey"
                    onClick={() => this.setState({ adding: false })}
                    style={{
                      padding: "10px",
                      width: "100px"
                    }}
                  >
                    Cancel
                  </Button>
                )}
                <Button
                  style={{
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
