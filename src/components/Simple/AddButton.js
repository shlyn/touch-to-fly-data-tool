import React from "react";
import { Button, Table, Icon } from "semantic-ui-react";

const AddButton = ({ addingStateHandler }) => {
  return (
    <Table.Row>
      <Table.Cell colSpan="3">
        <Button
          style={{ background: "transparent" }}
          onClick={() => addingStateHandler()}
        >
          <Icon name="add" />
        </Button>
      </Table.Cell>
    </Table.Row>
  );
};

export default AddButton;
