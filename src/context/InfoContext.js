import { createContext, useState } from "react";

export const InfoContext = createContext({
  icMsg: null,
  show: false,
  hasNews: false,
  news: [],
  hasStats: false,
  stats: {},
  setIcMsg: () => {},
  setHasNews: () => {},
  setNews: () => {},
  setShow: () => {},
  setHasStats: () => {},
  setStats: () => {},
  reset: () => {},
});

const InfoContextProvider = ({ children }) => {
  const [show, setShow] = useState(false);
  const [icMsg, setIcMsg] = useState(null);
  const [hasNews, setHasNews] = useState(false);
  const [news, setNews] = useState([]);
  const [hasStats, setHasStats] = useState(false);
  const [stats, setStats] = useState(null);

  const reset = () => {
    setShow(_ => false);
    setHasNews(false);
    setHasStats(false);
    setIcMsg(null);
    setNews([]);
    setStats(null);
  };

  return (
    <InfoContext.Provider
      value={{
        icMsg,
        show,
        news,
        stats,
        hasNews,
        hasStats,
        reset,
        setNews,
        setShow,
        setStats,
        setIcMsg,
        setHasNews,
        setHasStats,
      }}
    >
      {children}
    </InfoContext.Provider>
  );
};

export default InfoContextProvider;
