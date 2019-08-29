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
            id
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
  skillsDescription,
  name,
  letter
}) {
  const date = new Date();
  const dateFormatted = date.toISOString();

  const post = `
    mutation updateTask($id: uuid!, $knowledge_description: String!, $objective: String!, $risk_management_description: String!, $skills_description: String!, $updated_at: timestamptz!, $name: String!, $letter: String!){
    update_task(where: { id: { _eq: $id } }, _set: {knowledge_description: $knowledge_description, objective: $objective, risk_management_description: $risk_management_description, skills_description: $skills_description, updated_at: $updated_at, name: $name, letter: $letter }) {
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
    updated_at: dateFormatted,
    name,
    letter
  };

  const results = await client.request(post, variables);
  return results;
}

export async function deleteTask({ id }) {
  const mutation = `
  mutation ($id: uuid!){
  delete_task(where: { id: { _eq: $id } }) {
    affected_rows
  }
}

`;
  const variables = {
    id
  };

  const results = await client.request(mutation, variables);
  return results;
}
