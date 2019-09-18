import React from "react";

import { Button, Table, Icon, Input } from "semantic-ui-react";

const AddingDisplay = ({
  inputHandlerCode,
  inputHandlerDescription,
  removeInput,
  elements,
  elementId
}) => {
  const display = elements.map((data, i) => {
    const { text, abbreviation_code, type, id, addition } = data;
    if (type.id === elementId && addition === true) {
      return (
        <Table.Row>
          <Table.Cell>
            <Input
              placeholder={"Code"}
              value={abbreviation_code}
              name="abbreviation_code"
              onChange={e => inputHandlerCode({ e, i })}
            />
          </Table.Cell>
          <Table.Cell>
            <Input
              placeholder={"Description"}
              value={text}
              name="text"
              style={{ width: "100%" }}
              onChange={e => inputHandlerDescription({ e, i })}
            />
          </Table.Cell>
          <Table.Cell>
            <Icon
              name="add"
              color="green"
              style={{
                fontSize: "1.3em"
              }}
              // onClick={() => removeInput({ i })}
            />
          </Table.Cell>
          <Table.Cell>
            <Icon
              name="delete"
              color="red"
              style={{
                fontSize: "1.3em"
              }}
              onClick={() => removeInput({ i })}
            />
          </Table.Cell>
        </Table.Row>
      );
    }
  });

  return <>{display}</>;
};

export default AddingDisplay;
