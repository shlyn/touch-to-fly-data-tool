import React, { useState, useEffect } from "react";
import { List } from "semantic-ui-react";

const ResourceList = ({
  resourceList,
  addResourceToTask,
  setOpen,
  resources
}) => {
  const resourceDisplay = resourceList.resourceList.resources.map(
    ({ documentName, documentNumber, resource_id, id }, i) => {
      console.log(id);
      if (!resources.some(data => data.resource_id === id)) {
        return (
          <List.Item
            onClick={() => {
              return (
                addResourceToTask({
                  documentNumber,
                  documentName,
                  resource_id,
                  id
                }),
                setOpen(false)
              );
            }}
          >
            <List.Content>
              <List.Header>{documentNumber}</List.Header>
              <List.Description>{documentName}</List.Description>
            </List.Content>
          </List.Item>
        );
      }
    }
  );
  return (
    <List selection verticalAlign="middle">
      {resourceDisplay}
    </List>
  );
};

export default ResourceList;
