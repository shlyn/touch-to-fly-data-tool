import React from "react";
import { Button, Table, Icon, Input } from "semantic-ui-react";

const ElementsDisplay = ({
  elements,
  editElementHandler,
  editing,
  deleteHandler,
  elementId
}) => {
  return (
    elements &&
    elements.map(data => {
      const { text, abbreviation_code, type, id, addition } = data;
      if (type.id === elementId) {
        if (editing) {
          return (
            <Table.Row key={id}>
              <Table.Cell>
                <Input
                  placeholder={abbreviation_code}
                  value={abbreviation_code}
                  name="abbreviation_code"
                  onChange={e => editElementHandler({ e, id })}
                />
              </Table.Cell>
              <Table.Cell>
                <Input
                  placeholder={text}
                  value={text}
                  name="text"
                  style={{ width: "100%" }}
                  onChange={e => editElementHandler({ e, id })}
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
                  onClick={() => deleteHandler({ id, abbreviation_code })}
                  disabled={addition === true}
                >
                  <Icon name="trash" position="right" />
                </Button>
              </Table.Cell>
            </Table.Row>
          );
        } else {
          return (
            <Table.Row key={id}>
              <Table.Cell>{abbreviation_code}</Table.Cell>
              <Table.Cell>{text}</Table.Cell>
            </Table.Row>
          );
        }
      }
    })
  );
};

export default ElementsDisplay;
