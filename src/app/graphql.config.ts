import { GraphQLModule } from '@nestjs/graphql';

const GraphQL = GraphQLModule.forRoot({
  typePaths: ['./**/*.graphql'],
  playground: true,
})

export default GraphQL;