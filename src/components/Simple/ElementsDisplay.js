import React from "react";
import { Button, Table, Icon, Input } from "semantic-ui-react";
import SubElementsDisplay from "./SubElementsDisplay";
const ElementsDisplay = ({
  elements,
  editElementHandler,
  editing,
  deleteHandler,
  elementId,
  addSubElement,
  editSubElementHandler,
  deleteSubHandler,
  inputHandlerCodeSub,
  inputHandlerDescriptionSub,
  removeInput
}) => {
  return (
    elements &&
    elements.map(data => {
      const {
        text,
        abbreviation_code,
        type,
        id,
        addition,
        sub_elements
      } = data;
      if (type.id === elementId && addition !== true) {
        if (editing) {
          return (
            <>
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
                  <Icon
                    name="add"
                    color="green"
                    style={{
                      fontSize: "1.3em"
                    }}
                    onClick={() => addSubElement({ elementId, id })}
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
              {sub_elements.length > 0 && (
                <SubElementsDisplay
                  sub_elements={sub_elements}
                  editSubElementHandler={editSubElementHandler}
                  deleteSubHandler={deleteSubHandler}
                  mainId={id}
                  inputHandlerCodeSub={inputHandlerCodeSub}
                  inputHandlerDescriptionSub={inputHandlerDescriptionSub}
                  removeInput={removeInput}
                />
              )}
            </>
          );
        } else {
          return (
            <>
              <Table.Row key={id}>
                <Table.Cell>{abbreviation_code}</Table.Cell>
                <Table.Cell>{text}</Table.Cell>
              </Table.Row>
              {sub_elements.map((data, i) => {
                return (
                  <Table.Row key={id + i}>
                    <Table.Cell textAlign="right">
                      *{data.abbreviation_code}
                    </Table.Cell>
                    <Table.Cell textAlign="right">{data.text}</Table.Cell>
                  </Table.Row>
                );
              })}
            </>
          );
        }
      }
    })
  );
};

export default ElementsDisplay;
