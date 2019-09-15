import React, { useState, useEffect } from "react";
import { List } from "semantic-ui-react";

const ResourceList = ({ resourceList, addResourceToTask }) => {
  const resourceDisplay = resourceList.resourceList.resources.map(
    ({ documentName, documentNumber }) => {
      return (
        <List.Item onClick={() => addResourceToTask({ documentNumber })}>
          <List.Content>
            <List.Header>{documentNumber}</List.Header>
            <List.Description>{documentName}</List.Description>
          </List.Content>
        </List.Item>
      );
    }
  );
  return (
    <List selection verticalAlign="middle">
      {resourceDisplay}
    </List>
  );
};

export default ResourceList;
