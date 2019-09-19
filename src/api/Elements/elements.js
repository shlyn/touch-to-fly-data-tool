const GraphQL = require("graphql-request");

const client = new GraphQL.GraphQLClient(
  "https://api.touchtofly.io/v1/graphql",
  {
    headers: {
      "X-Hasura-Access-Key": "T0uch_to_Fly"
    }
  }
);

export async function createElement({
  abbreviation_code,
  element_type_id,
  task_id,
  text,
  id
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
    id,
    task_id,
    text
  };

  const results = await client.request(post, variables);
  return results;
}

export async function editElement({ id, text, abbreviation_code }) {
  const date = new Date();
  const dateFormatted = date.toISOString();

  const post = `
mutation ($id: uuid!, $updated_at: timestamptz!, $text: String!, $abbreviation_code: String!){
  update_element(where: { id: { _eq: $id } }, _set: { updated_at: $updated_at, text: $text, abbreviation_code: $abbreviation_code }) {
    affected_rows
    returning {
      id
    }
  }
}
`;

  const variables = {
    id,
    updated_at: dateFormatted,
    text,
    abbreviation_code
  };

  const results = await client.request(post, variables);
  return results;
}

export async function deleteElement({ id }) {
  const mutation = `
  mutation ($id: uuid!){
  delete_element(where: { id: { _eq: $id } }) {
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

export async function createSubElement({
  abbreviation_code,
  elementId,
  text,
  id
}) {
  console.log(abbreviation_code, elementId, text, id);
  const date = new Date();
  const dateFormatted = date.toISOString();
  const post = `
  mutation($id: uuid!, $element_id: uuid!, $created_at: timestamptz!, $text: String!, $abbreviation_code: String!){
    insert_sub_element(objects: {element_id: $element_id, id: $id, text: $text, created_at: $created_at, abbreviation_code: $abbreviation_code}) {
      affected_rows
      returning {
        element {
          abbreviation_code
        }
        abbreviation_code
      }
    }
  }`;
  const variables = {
    abbreviation_code,
    created_at: dateFormatted,
    element_id: elementId,
    text,
    id
  };
  console.log(variables);
  const results = await client.request(post, variables);
  return results;
}

export async function editSubElement({ abbreviation_code, text, id }) {
  console.log(abbreviation_code, text, id);
  const date = new Date();
  const dateFormatted = date.toISOString();
  const post = `
  mutation ($id: uuid!, $updated_at: timestamptz!, $text: String!, $abbreviation_code: String!){
    update_sub_element(where: { id: { _eq: $id } }, _set: { updated_at: $updated_at, text: $text, abbreviation_code: $abbreviation_code }) {
      affected_rows
      returning {
        id
      }
    }
  }`;
  const variables = {
    abbreviation_code,
    updated_at: dateFormatted,
    text,
    id
  };

  const results = await client.request(post, variables);
  return results;
}

export async function deleteSubElement({ id }) {
  const mutation = `
  mutation ($id: uuid!){
  delete_sub_element(where: { id: { _eq: $id } }) {
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
