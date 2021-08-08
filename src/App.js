import { CssBaseline } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ChatContextProvider from "./context/ChatContext";
import SessionContextProvider from "./context/SessionContext";
import InfoContextProvider from "./context/InfoContext";
import Chat from "./pages/Chat";

const App = () => {
  return (
    <SessionContextProvider>
      <InfoContextProvider>
        <ChatContextProvider>
          <BrowserRouter>
            <CssBaseline />
            <Switch>
              <Route path="/chat" component={Chat} />
            </Switch>
          </BrowserRouter>
        </ChatContextProvider>
      </InfoContextProvider>
    </SessionContextProvider>
  );
};

export default App;
