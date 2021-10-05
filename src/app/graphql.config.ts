import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

const GraphQL = GraphQLModule.forRoot({
  autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
  playground: true,
})

export default GraphQL;
