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

export async function createResource({ resource, taskId, id }) {
  console.log(resource, taskId);
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
    id,
    urlString,
    task_id: taskId
  };
  const results = await client.request(post, variables);
  return results;
}

export async function editResource({ resource_id, resource }) {
  const date = new Date();
  const dateFormatted = date.toISOString();
  const { documentName, documentNumber } = resource;

  const post = `
mutation ($id: uuid!, $updated_at: timestamptz!, $documentName: String!, $documentNumber: String!){
  update_resources(where: { id: { _eq: $id } }, _set: { updated_at: $updated_at, documentName: $documentName, documentNumber: $documentNumber }) {
    affected_rows
    returning {
      id
    }
  }
}
`;

  const variables = {
    id: resource_id,
    updated_at: dateFormatted,
    documentName,
    documentNumber
  };

  const results = await client.request(post, variables);
  return results;
}

export async function addResourceToTask({ resource_id, taskId }) {
  const post = `
  mutation ($id: uuid!, $task_id: uuid!){
    insert_resource_task(objects: {task_id: $task_id, resource_id: $id}) {
      affected_rows
      returning {
        task {
          name
        }
        resource {
          documentName
        }
      }
    }
  }

`;

  const variables = {
    id: resource_id,
    task_id: taskId
  };

  const results = await client.request(post, variables);
  console.log(results);
  return results;
}

export async function deleteResource({ id }) {
  const mutation = `
  mutation ($id: uuid!){
  delete_resources(where: { id: { _eq: $id } }) {
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

export async function getAllResources() {
  const query = `
    query AllResources {
      resources {
        documentName
        documentNumber
        id
        thumbNailURL
        urlString
        updated_at
      }
      }
    `;
  const results = await client.request(query);
  return results;
}

export async function removeResource({ resource_id, taskId }) {
  console.log(resource_id, taskId);
  const mutation = `
  mutation ($id: uuid!, $task_id: uuid!){
    delete_resource_task(where: {resource_id: {_eq: $id}, task_id: {_eq: $task_id}}) {
      affected_rows
      returning {
        task {
          name
        }
        resource {
          documentName
        }
      }
    }
  }

`;
  const variables = {
    id: resource_id,
    task_id: taskId
  };

  const results = await client.request(mutation, variables);
  return results;
}
