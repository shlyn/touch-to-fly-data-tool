const GraphQL = require("graphql-request");

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
      task(where: {area_of_operation_id: {_eq: "e4a59928-3fbf-4f9c-bdc3-b32d2752a264"}}) {
        id
        name
        letter
        knowledge_description
        risk_management_description
        skills_description
        area_of_operation {
          id
          name
        }
         objective
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

export async function createNewTask() {
  const post = `

    mutation TasksByAreaOfOperation($area_of_operation_id: String!) {
      task(where: {area_of_operation_id: {_eq: "e4a59928-3fbf-4f9c-bdc3-b32d2752a264"}}) {
        id
        name
        letter
        knowledge_description
        risk_management_description
        skills_description
        area_of_operation {
          id
          name
        }
         objective
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

  const variables = { area_of_operation_id: "lulz" };
  const results = await client.request(post, variables);
  return results;
}
