const GraphQL = require("graphql-request");
const uuidv4 = require("uuid/v4");

const client = new GraphQL.GraphQLClient(
  "https://api.touchtofly.io/v1/graphql",
  {
    headers: {
      "X-Hasura-Access-Key": "T0uch_to_Fly"
    }
  }
);

export async function getAllAreasOfOperation() {
  const query = `
    query AllAreasOfOperation {
        area_of_operation {
          id
          name
          numeral
          order
        }
      }
    `;
  const results = await client.request(query);
  return results;
}

export async function getTasksById({ id }) {
  const query = `
    query TasksByAreaOfOperation($area_of_operation_id: String!) {
      task(where: {area_of_operation_id: {_eq: "${id}"}}) {
        id
        name
        letter
        knowledge_description
        risk_management_description
        skills_description
        area_of_operation {
          id
          name
          order
          numeral
        }
         objective
         created_at
        resources {
          id
          resource_id
          resource {
            documentName
            documentNumber
      }
    }    elements {
          id
          text
          abbreviation_code
          type {
           id
           text
      }
    }
      }
      }
    `;

  const variables = { area_of_operation_id: id };
  const results = await client.request(query, variables);
  return results;
}

export async function createNewTask({
  areaOfOperationId,
  taskName,
  taskLetter
}) {
  const date = new Date();
  const dateFormatted = date.toISOString();
  const post = `
  mutation insertTask($id: uuid!, $letter: String!, $area_of_operation_id: uuid!, $name: String!, $created_at: timestamptz!) {
    insert_task(objects: {id: $id, letter: $letter, area_of_operation_id: $area_of_operation_id, name: $name, created_at: $created_at}) {
      affected_rows
      returning {
        name
        id
        letter
        area_of_operation_id
      }
    }
  }`;

  const variables = {
    id: uuidv4(),
    letter: taskLetter,
    area_of_operation_id: areaOfOperationId,
    name: taskName,
    created_at: dateFormatted
  };

  const results = await client.request(post, variables);
  return results;
}

export async function editTask({
  taskId,
  knowledgeDescription,
  objective,
  riskManagementDescription,
  skillsDescription
}) {
  const date = new Date();
  const dateFormatted = date.toISOString();

  const post = `
    mutation updateTask($id: uuid!, $knowledge_description: String!, $objective: String!, $risk_management_description: String!, $skills_description: String!, $updated_at: timestamptz!){
    update_task(where: { id: { _eq: $id } }, _set: {knowledge_description: $knowledge_description, objective: $objective, risk_management_description: $risk_management_description, skills_description: $skills_description, updated_at: $updated_at }) {
      affected_rows
      returning {
        id
      }
    }
  }`;

  const variables = {
    id: taskId,
    knowledge_description: knowledgeDescription,
    objective: objective,
    risk_management_description: riskManagementDescription,
    skills_description: skillsDescription,
    updated_at: dateFormatted
  };

  const results = await client.request(post, variables);
  return results;
}

export async function createElement({
  abbreviation_code,
  element_type_id,
  task_id,
  text
}) {
  const date = new Date();
  const dateFormatted = date.toISOString();
  const post = `
  mutation( $abbreviation_code: String!, $created_at: timestamptz!, $element_type_id: uuid!, $id: uuid!, $task_id: uuid!, $text: String!) {
    insert_element(objects: { abbreviation_code: $abbreviation_code, created_at: $created_at, element_type_id: $element_type_id, id: $id, task_id: $task_id, text: $text }) {
      affected_rows
      returning {
        id
        text
      }
    }
  }`;
  const variables = {
    abbreviation_code,
    created_at: dateFormatted,
    element_type_id,
    id: uuidv4(),
    task_id,
    text
  };

  const results = await client.request(post, variables);
  return results;
}

export async function createResource({ resource, taskId }) {
  const date = new Date();
  const dateFormatted = date.toISOString();
  const { documentName, documentNumber } = resource;
  const urlString = "www.test.com";
  const post = `
  mutation ($created_at: timestamptz!, $documentName: String!, $documentNumber: String!, $id: uuid!, $urlString: String!, $task_id: uuid!){
  insert_resources(objects: {created_at: $created_at, documentName: $documentName, documentNumber: $documentNumber, id: $id, urlString: $urlString, tasks: {data: {task_id: $task_id}}}) {
    affected_rows
    returning {
      id
      documentName
      documentNumber
    }
  }
}
`;
  const variables = {
    created_at: dateFormatted,
    documentName,
    documentNumber,
    id: uuidv4(),
    urlString,
    task_id: taskId
  };
  const results = await client.request(post, variables);
  return results;
}

export async function createAreaOfOperation({ order, numeral, title }) {
  const date = new Date();
  const dateFormatted = date.toISOString();
  const orderNumber = Number(order);
  const post = `
mutation ($id: uuid!, $name: String!, $numeral: String!, $order: Int!, $created_at: timestamptz!) {
  insert_area_of_operation(objects: {id: $id, name: $name, numeral: $numeral, order: $order, created_at: $created_at}) {
    returning {
      id
      name
      numeral
      order
    }
    affected_rows
  }
}
`;
  const variables = {
    id: uuidv4(),
    name: title,
    order: orderNumber,
    numeral,
    created_at: dateFormatted
  };

  const results = await client.request(post, variables);
  return results;
}

export async function editAreaOfOperation({ id, order, numeral, name }) {
  const date = new Date();
  const dateFormatted = date.toISOString();
  const orderNumber = Number(order);
  const post = `
mutation ($id: uuid!, $name: String!, $numeral: String!, $order: Int!, $updated_at: timestamptz!){
  update_area_of_operation(where: {id: {_eq: $id}}, _set: {name: $name, numeral: $numeral, order: $order, updated_at: $updated_at}) {
    affected_rows
    returning {
      id
      name
      numeral
      order
    }
  }
}

`;
  const variables = {
    id,
    name,
    order: orderNumber,
    numeral,
    updated_at: dateFormatted
  };

  const results = await client.request(post, variables);
  return results;
}

// update task

// update element

// update resource

// remove element

// remove resource

// remove AOP

// remove task
