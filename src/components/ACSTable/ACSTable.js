import React, { Component } from "react";
import { Icon, Table, Button, Input } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { setACSId, setACSName } from "../../redux/ACS/actions";
import { connect } from "react-redux";
import { createACS, deleteACS } from "../../api/ACS/ACS";

class ACSTable extends Component {
  state = {
    adding: false,
    ACS: this.props.airmenCertificationStandards
  };

  setACS = ({ id, name }) => {
    localStorage.setItem("ACSId", id);
    localStorage.setItem("ACSName", name);
    this.props.setACSId(id);
    this.props.setACSName(name);
  };

  inputHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  inputHandlerACS = (e, i) => {
    const { ACS } = this.state;
    ACS[i][e.target.name] = e.target.value;
    ACS[i].updated = true;
    this.setState({ ACS });
  };

  submitHandler = () => {
    const { name, ACS } = this.state;

    ACS.push({ name });
    this.setState({
      adding: false,
      ACS,
      name: ""
    });
    createACS({ name });
  };

  updateHandler = () => {
    const { ACS } = this.state;
    const { updateACSHandler, successHandler } = this.props;

    ACS.map(data => {
      const { updated, id, name } = data;
      if (updated === true) {
        updateACSHandler({ id, name });
      }
      return null;
    });
    successHandler();
  };

  cancelHandler = async () => {
    const { editHandler, getACS } = this.props;

    this.setState({
      ACS: await getACS()
    });

    editHandler();
  };

  deleteHandler = ({ name, id }) => {
    const { updateACS } = this.props;

    const result = window.confirm(`Are you sure you want to delete ${name}?`);
    if (result === true) {
      const newACS = updateACS({ id });
      deleteACS({ id });
      this.setState({ ACS: newACS });
    }
  };

  render() {
    const { editing, editHandler } = this.props;
    const { adding, name, ACS } = this.state;
    console.log(this.state);
    const rows =
      ACS &&
      ACS.length &&
      ACS.map(({ name, id }, i) => {
        if (editing) {
          return (
            <Table.Row key={id + name}>
              <Table.Cell>
                <Input
                  placeholder={name}
                  name="name"
                  value={name}
                  onChange={e => this.inputHandlerACS(e, i)}
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
                <Link to="/entries" onClick={() => this.setACS({ id, name })}>
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
              placeholder="Title"
              name="name"
              value={name}
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
  setACSId,
  setACSName
};

export default connect(state => state, mapDispatchToProps)(ACSTable);
