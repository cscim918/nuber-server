import { GraphQLSchema } from "graphql";
import { makeExecutableSchema } from "graphql-tools";
import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas";
import path from "path";

const allTypes: GraphQLSchema[] = fileLoader(
  path.join(__dirname, "./api/**/*.graphql")
);

const allResolvers: any[] = fileLoader(
  path.join(__dirname, "./api/**/*.resolvers.*")
);

const mergedTypes = mergeTypes(allTypes);
const mergedResolvers = mergeResolvers(allResolvers);

const schema = makeExecutableSchema({ //allTypes가 하는 것처럼 schema들을 하나로 합쳐주는 일을 한다.
  typeDefs: mergedTypes, //타입스크립트가 내가 입력해야 할 내용을 힌트로 알려준다.
  resolvers: mergedResolvers
});

export default schema;