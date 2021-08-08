import { createContext, useCallback, useState } from "react";
import axios from "../axios";

export const SessionContext = createContext({
  sessionId: null,
  userDetails: null,
  inSession: false,
  loading: true,
  loadSession: () => {},
});

const SESSION_LS_KEY = "_K_SID_";

const SessionContextProvider = ({ children }) => {
  const [sessionId, setSessionId] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [inSession, setInSession] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadSessionFromLocalStorage = useCallback(async () => {
    console.log("Fetching Session details from Local Storage");
    setLoading(true);
    try {
      const sessId = localStorage.getItem(SESSION_LS_KEY);
      const res = await axios.get("/session?sessionId=" + sessId);
      const data = res.data;
      // console.log("Session: ", data);
      setSessionId(sessId);
      setUserDetails(data.userDetails);
      setLoading(false);
      setInSession(true);
    } catch (err) {
      localStorage.removeItem(SESSION_LS_KEY);
      console.log("Error Fetching Session Details", err, err?.response);
    }
  }, []);

  const loadSession = useCallback(async () => {
    console.log("Loading A New Session");
    setLoading(true);
    try {
      const sessionRes = await axios.get("/session/new");
      const session = sessionRes.data;
      // console.log("Session: ", session);
      localStorage.setItem(SESSION_LS_KEY, session.sessionId);
      setSessionId(session.sessionId);
      setUserDetails(session.userDetails);
      setLoading(false);
      setInSession(true);
    } catch (err) {
      console.log("Error Getting Session Id", err);
    }
  }, []);

  useState(() => {
    // console.log("[SessionContext] useEffect");
    if (localStorage.getItem(SESSION_LS_KEY)) {
      loadSessionFromLocalStorage();
    }
  }, []);

  return (
    <SessionContext.Provider
      value={{
        sessionId,
        userDetails,
        inSession,
        loading,
        loadSession,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContextProvider;
