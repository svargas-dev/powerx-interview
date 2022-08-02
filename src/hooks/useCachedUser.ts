import { useEffect, useState } from "react";
import { User } from "../models";

type UseCachedUserRtn = User | null;
export const useCachedUser = (): UseCachedUserRtn => {
  const [cachedUser, setCachedUser] = useState<UseCachedUserRtn>(null);

  useEffect(() => {
    if (localStorage) {
      const item = localStorage.getItem("user");
      if (item) {
        setCachedUser(JSON.parse(item));
      }
    }
  }, []);

  return cachedUser;
};
