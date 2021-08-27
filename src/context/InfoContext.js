import { createContext, useState } from "react";

export const InfoContext = createContext({
  icMsg: null,
  show: false,
  news: [],
  hasNews: false,
  hasStats: false,
  hasResources: false,
  stats: {},
  setShow: () => {},
  reset: () => {},
  loadData: () => {}
});

const InfoContextProvider = ({ children }) => {
  const [hasResources, setHasResources] = useState(true);
  const [show, setShow] = useState(false);
  const [icMsg, setIcMsg] = useState(null);
  const [hasNews, setHasNews] = useState(false);
  const [news, setNews] = useState([]);
  const [hasStats, setHasStats] = useState(true);
  const [stats, setStats] = useState(null);

  const reset = () => {
    setShow((_) => false);
    setHasNews(false);
    setHasStats(false);
    setIcMsg(null);
    setNews([]);
    setStats(null);
  };

  const loadData = (data) => {
    console.log("Loading Data = ", data);
    setIcMsg(data);
    setShow(true);
    if (data?.response?.hasResources) {
      setHasResources(true);
      if (data?.response?.resources?.hasNews) {
        setHasNews(true);
        setNews(data?.response?.resources?.news?.articles);
      }
      if (data?.response?.resources?.hasStats) {
        setHasStats(true);
        setStats(data?.response?.resources?.stats);
      }
    }
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
        hasResources,
        reset,
        setShow,
        loadData,
      }}
    >
      {children}
    </InfoContext.Provider>
  );
};

export default InfoContextProvider;
