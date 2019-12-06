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

export async function getACS() {
  const query = `
    query airmanCertificationStandards {
        airman_certification_standards {
            id
            name
            ready
            updated_at
            created_at
        }
      }
    `;
  const results = await client.request(query);
  return results;
}

export async function createACS({ name }) {
  console.log(name);
  const date = new Date();
  const dateFormatted = date.toISOString();
  const post = `
  mutation ($id: uuid!, $name: String!, $created_at: timestamptz!) {
    insert_airman_certification_standards(objects: {id: $id, name: $name, created_at: $created_at}) {
      returning {
        id
        name
      }
      affected_rows
    }
  }
  `;
  const variables = {
    id: uuidv4(),
    name,
    created_at: dateFormatted
  };

  const results = await client.request(post, variables);
  return results;
}

export async function editACS({ id, name }) {
  const date = new Date();
  const dateFormatted = date.toISOString();

  const post = `
  mutation ($id: uuid!, $name: String!, $updated_at: timestamptz!){
    update_airman_certification_standards(where: {id: {_eq: $id}}, _set: {name: $name, updated_at: $updated_at}) {
      affected_rows
      returning {
        id
        name
      }
    }
  }
  
  `;
  const variables = {
    id,
    name,
    updated_at: dateFormatted
  };

  const results = await client.request(post, variables);
  return results;
}

export async function deleteACS({ id }) {
  const mutation = `
    mutation ($id: uuid!){
    delete_airman_certification_standards(where: { id: { _eq: $id } }) {
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
