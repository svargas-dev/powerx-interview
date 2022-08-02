import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { useCachedUser } from "../../hooks";
import { clearLocalStorageItem } from "../../util";
import { login, LoginStatus, logout, selectAuth } from "./authslice";
import styles from "./Login.module.css";

export function Login() {
  const auth = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const [loginUsername, setLoginUsername] = useState("");
  const cachedUser = useCachedUser();

  // naive handling of sessions
  useEffect(() => {
    if (cachedUser?.name) dispatch(login({ username: cachedUser.name }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cachedUser]);

  const handleClick = (_e: React.MouseEvent<HTMLButtonElement>) => {
    if (auth.status === LoginStatus.LOGGED_IN) {
      dispatch(logout());
    }

    if (cachedUser) {
      clearLocalStorageItem("user");
    }
  };

  if (auth.status === LoginStatus.LOGIN_ERROR) {
    return (
      <div className={styles.container}>
        <span role="status">Log in error. Please try again.</span>
      </div>
    );
  }

  if (auth.status === LoginStatus.LOGGED_IN) {
    return (
      <div className={styles.container}>
        <span>Welcome, {auth.user.name}.</span>
        <button onClick={handleClick}>Logout</button>
      </div>
    );
  }

  return (
    <form
      className={styles.container}
      onSubmit={(e) => {
        e.preventDefault();
        dispatch(login({ username: loginUsername }));
      }}
    >
      <h3>Please log in to access this resource.</h3>
      <input
        className={styles.input}
        type="text"
        placeholder="Username"
        value={loginUsername}
        onChange={(e) => setLoginUsername(e.target.value)}
      />
      <button
        type="submit"
        disabled={auth.status === LoginStatus.LOGIN_PENDING}
      >
        Login
      </button>
    </form>
  );
}
