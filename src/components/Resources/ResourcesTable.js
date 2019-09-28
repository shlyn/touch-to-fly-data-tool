import React, { Component } from "react";
import { Icon, Table, Button, Input } from "semantic-ui-react";
import { createResource, deleteResource } from "../../api/Resources/resources";
const uuidv4 = require("uuid/v4");

class ResourcesTable extends Component {
  state = {
    adding: false,
    resources: this.props.resources
  };

  inputHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  inputHandlerResource = (e, i) => {
    const { resources } = this.state;
    resources[i][e.target.name] = e.target.value;
    resources[i].updated = true;
    this.setState({ resources });
  };

  submitHandler = () => {
    const { documentName, documentNumber, resources } = this.state;
    const id = uuidv4();
    resources.push({ documentName, documentNumber, id });
    this.setState({
      adding: false,
      resources,
      documentNumber: "",
      documentName: ""
    });
    createResource({ documentName, documentNumber, id });
  };

  updateHandler = () => {
    const { resources } = this.state;
    const { updateResourceHandler, successHandler } = this.props;

    resources.map(data => {
      const { updated, id, documentNumber, documentName } = data;
      if (updated === true) {
        updateResourceHandler({
          resource_id: id,
          documentNumber,
          documentName
        });
      }
      return null;
    });
    successHandler();
  };

  cancelHandler = async () => {
    const { editHandler, getResources } = this.props;

    this.setState({
      resources: await getResources()
    });

    editHandler();
  };

  deleteHandler = ({ documentNumber, id }) => {
    const { updateResources } = this.props;
    const { resources } = this.state;
    const result = window.confirm(
      `Are you sure you want to delete ${documentNumber}?`
    );
    if (result === true) {
      const newResources = updateResources({ id, resources });
      deleteResource({ id });
      this.setState({ resources: newResources });
    }
  };

  render() {
    const { editing, editHandler } = this.props;
    const { adding, documentName, documentNumber, resources } = this.state;
    console.log(resources);
    const rows =
      resources &&
      resources.map(({ documentName, documentNumber, id }, i) => {
        if (editing) {
          return (
            <Table.Row key={id + i}>
              <Table.Cell>
                <Input
                  placeholder={documentNumber}
                  name="documentNumber"
                  value={documentNumber}
                  onChange={e => this.inputHandlerResource(e, i)}
                />
              </Table.Cell>
              <Table.Cell>
                <Input
                  placeholder={documentName}
                  name="documentName"
                  value={documentName}
                  onChange={e => this.inputHandlerResource(e, i)}
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
                  onClick={() => this.deleteHandler({ id, documentNumber })}
                >
                  <Icon name="trash" position="right" />
                </Button>
              </Table.Cell>
            </Table.Row>
          );
        } else {
          return (
            <Table.Row key={id}>
              <Table.Cell>{documentNumber}</Table.Cell>
              <Table.Cell>{documentName}</Table.Cell>
            </Table.Row>
          );
        }
      });

    const inputRow = (
      <>
        <Table.Row>
          <Table.Cell>
            <Input
              placeholder="Resource Number"
              name="documentNumber"
              value={documentNumber}
              onChange={e => this.inputHandler(e)}
            />
          </Table.Cell>
          <Table.Cell>
            <Input
              placeholder="Resource Name"
              name="documentName"
              value={documentName}
              onChange={e => this.inputHandler(e)}
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
        <Table celled style={{ marginBottom: "30px" }}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width="2">Resource Number</Table.HeaderCell>
              <Table.HeaderCell width="4">Resource Name</Table.HeaderCell>
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

export default ResourcesTable;
