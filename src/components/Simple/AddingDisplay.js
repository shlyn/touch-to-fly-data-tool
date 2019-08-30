import React from "react";

import { Button, Table, Icon, Input } from "semantic-ui-react";

const AddingDisplay = ({
  newCode,
  newText,
  inputHandler,
  addingStateHandler,
  addElement
}) => {
  return (
    <>
      <Table.Row>
        <Table.Cell>
          <Input
            placeholder={"Code"}
            value={newCode}
            name="newCode"
            onChange={e => inputHandler(e)}
          />
        </Table.Cell>
        <Table.Cell>
          <Input
            placeholder={"Description"}
            value={newText}
            name="newText"
            style={{ width: "100%" }}
            onChange={e => inputHandler(e)}
          />
        </Table.Cell>
        <Table.Cell>
          <Icon
            name="delete"
            color="red"
            style={{
              fontSize: "1.3em"
            }}
            onClick={() => addingStateHandler()}
          />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell colSpan="3">
          <Button
            style={{ background: "transparent", color: "green" }}
            onClick={() => addElement()}
          >
            <Icon name="add" />
          </Button>
        </Table.Cell>
      </Table.Row>
    </>
  );
};

export default AddingDisplay;
