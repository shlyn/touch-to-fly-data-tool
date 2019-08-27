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

async function getAreaOfOperationForNumeral(input_numeral) {
  const query = `
    query AreaOfOperation($numeral: String!) {
        area_of_operation(where: {numeral: {_eq: $numeral}}) {
          id
          name
          numeral
          order
        }
      }
    `;
  const variables = { numeral: input_numeral };
  const results = await client.request(query, variables);
  console.log(results);
}

export async function getTasksById(param) {
  const id = "e4a59928-3fbf-4f9c-bdc3-b32d2752a264";
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
    id: areaOfOperationId,
    letter: taskLetter,
    area_of_operation_id: areaOfOperationId,
    name: taskName,
    created_at: dateFormatted
  };

  console.log(post, variables);
  const results = await client.request(post, variables);
  console.log(results);
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

  console.log(post, variables);
  const results = await client.request(post, variables);
  console.log(results);
  return results;
}

export async function createElement({
  abbreviation_code,
  element_type_id,
  id,
  task_id,
  text
}) {
  //   const date = new Date();
  //   const dateFormatted = date.toISOString();
  //   const post = `
  // mutation {
  //   insert_element(objects: { abbreviation_code: "", created_at: "", element_type_id: "", id: "", task_id: "", text: "" }) {
  //     affected_rows
  //     returning {
  //       id
  //       text
  //     }
  //   }
  // }`;
  //   const variables = {
  //     id: taskId,
  //     knowledge_description: knowledgeDescription,
  //     objective: objective,
  //     risk_management_description: riskManagementDescription,
  //     skills_description: skillsDescription,
  //     updated_at: dateFormatted
  //   };
  //   console.log(post, variables);
  //   const results = await client.request(post, variables);
  //   console.log(results);
  //   return results;
}

export async function createResource({
  abbreviation_code,
  element_type_id,
  id,
  task_id,
  text
}) {
  //   const date = new Date();
  //   const dateFormatted = date.toISOString();
  //   const post = `
  // mutation {
  //   insert_element(objects: { abbreviation_code: "", created_at: "", element_type_id: "", id: "", task_id: "", text: "" }) {
  //     affected_rows
  //     returning {
  //       id
  //       text
  //     }
  //   }
  // }`;
  //   const variables = {
  //     id: taskId,
  //     knowledge_description: knowledgeDescription,
  //     objective: objective,
  //     risk_management_description: riskManagementDescription,
  //     skills_description: skillsDescription,
  //     updated_at: dateFormatted
  //   };
  //   console.log(post, variables);
  //   const results = await client.request(post, variables);
  //   console.log(results);
  //   return results;
}
