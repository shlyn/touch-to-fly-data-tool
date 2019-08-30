const uuidv4 = require("uuid/v4");

export const sortTasks = ({ tasks }) => {
  return (
    tasks.length > 0 &&
    tasks.sort((a, b) => {
      if (a.letter < b.letter) {
        return -1;
      }
      if (a.letter > b.letter) {
        return 1;
      }
      return 0;
    })
  );
};

export const addNewElement = ({
  elements,
  newCode,
  newText,
  adding,
  elementId,
  stateChanges,
  onAddingElement
}) => {
  const id = uuidv4();

  const element = {
    abbreviation_code: newCode,
    text: newText,
    type: { id: elementId },
    id,
    addition: true
  };

  elements.push(element);

  onAddingElement({
    elements,
    abbreviation_code: "",
    text: ""
  });

  stateChanges({ changes: { adding: !adding, newCode: "", newText: "" } });
};

export const updateTask = ({
  state,
  editTask,
  stateChanges,
  createResource,
  editResource,
  createElement,
  editElement
}) => {
  const {
    taskId,
    knowledgeDescription,
    objective,
    riskManagementDescription,
    skillsDescription,
    elements,
    resources,
    name,
    letter
  } = state;

  stateChanges({ changes: { success: true } });

  editTask({
    taskId,
    knowledgeDescription,
    objective,
    riskManagementDescription,
    skillsDescription,
    name,
    letter
  });

  resources &&
    resources.map(data => {
      const { id, resource, updated, addition, resource_id } = data;
      if (addition === true && updated !== true) {
        createResource({ resource, taskId, id });
      } else if (updated === true) {
        editResource({ resource_id, resource });
      }
      return null;
    });

  elements &&
    elements.map(data => {
      const { id, abbreviation_code, text, type, updated, addition } = data;
      const typeId = type.id;

      if (addition === true && updated !== true) {
        createElement({
          abbreviation_code,
          text,
          element_type_id: typeId,
          task_id: taskId,
          id
        });
      } else if (updated === true) {
        editElement({ id, text, abbreviation_code });
      }
      return null;
    });
  setTimeout(() => stateChanges({ changes: { success: false } }), 2000);
};
