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
  console.log(results);
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

getAllAreasOfOperation();
getAreaOfOperationForNumeral("III");
