import getApolloClient from "@/src/gql/client";
import { BoardDetailDocument, BoardDetailQuery } from "@/src/gql/types";

const getBoardData = async (code: string) => {
  const res = await getApolloClient().query<BoardDetailQuery>({
    query: BoardDetailDocument,
    variables: {
      boardCode: code,
    },
  });

  return res.data?.board;
};

export default getBoardData;
