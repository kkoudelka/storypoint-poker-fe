import dynamic from "next/dynamic";

const CreateBoardDialogDynamic = dynamic(
  () => import("./create-board-dialog"),
  {
    ssr: false,
  },
);

export default CreateBoardDialogDynamic;
