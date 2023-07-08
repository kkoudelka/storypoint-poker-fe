import React, { PropsWithChildren, useEffect } from "react";
import { useRecoilState } from "recoil";
import { v4 as uuid, validate } from "uuid";
import { userAtom } from "@/src/atoms/user-atom";

const UserContext: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useRecoilState(userAtom);

  useEffect(() => {
    if (user && user.uuid && validate(user.uuid)) {
      return;
    }

    const newUser = {
      uuid: uuid(),
      name: undefined,
    };

    setUser(newUser);
  }, [setUser, user]);

  return <>{children}</>;
};

export default UserContext;
