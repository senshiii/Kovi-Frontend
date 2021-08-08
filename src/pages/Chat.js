import { Backdrop, Box, CircularProgress, Typography } from "@material-ui/core";
import { useContext, useEffect } from "react";
import ChatArea from "../components/Chat/ChatArea";
import { SessionContext } from "../context/SessionContext";
import { ChatContext } from "../context/ChatContext";
import InfoCenter from "../components/InfoCenter/InfoCenter";
import ParticlesConfig from "../assets/particles.json";
import Particles from "react-tsparticles";

const Chat = () => {
  const { inSession, loadSession, loading } = useContext(SessionContext);

  const { messages, loading: loadingMessages, fetchSuccess } = useContext(
    ChatContext
  );

  useEffect(() => {
    // console.log("[Chat] useEffect");
    if (!inSession && !loading) loadSession();
    // eslint-disable-next-line
  }, []);

  let ChatView = (
    <div className="Chat-Page">
      <Particles
        width="100%"
        height="100%"
        options={ParticlesConfig}
        canvasClassName="p-canvas"
        className="p-container"
      />
      <div className="Chat-Area-Wrapper">
        <ChatArea
          messages={messages}
          loading={loadingMessages}
          loaded={fetchSuccess}
        />
        <InfoCenter />
      </div>
    </div>
  );

  if (loading) {
    ChatView = (
      <Backdrop open={loading}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <CircularProgress color="primary" />
          <Typography style={{ color: "#fff" }} variant="body1">
            Loading Chat Session
          </Typography>
        </Box>
      </Backdrop>
    );
  }

  return ChatView;
};

export default Chat;
