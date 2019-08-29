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

export async function deleteAreaOfOperation({ id }) {
  const mutation = `
  mutation ($id: uuid!){
  delete_area_of_operation(where: { id: { _eq: $id } }) {
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
