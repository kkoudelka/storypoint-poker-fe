import getApolloClient from "@/src/gql/client";
import { GetBoardsDocument, GetBoardsQuery } from "@/src/gql/types";

const getBoardsData = async () => {
  const res = await getApolloClient().query<GetBoardsQuery>({
    query: GetBoardsDocument,
  });

  return res.data?.boards ?? [];
};

export default getBoardsData;
