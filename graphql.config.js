require('dotenv').config();

module.exports = {
  schema: 'schema.graphql',
  extensions: {
    endpoints: {
      default: {
        url: `${process.env.NEXT_PUBLIC_PARSE_GRAPHQL_URL}`,
        headers: {
          'X-Parse-Application-Id': `${process.env.NEXT_PUBLIC_PARSE_APPLICATION_ID}`,
          'X-Parse-Master-Key': `${process.env.PARSE_MASTER_KEY}`,
        },
      },
    },
    languageService: {
      useSchemaFileDefinitions: true,
    },
  },
};
