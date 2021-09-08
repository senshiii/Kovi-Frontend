import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Box,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Mic } from "@material-ui/icons";
import { useEffect, useState } from "react";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.lang = "en-US";
recognition.interimResults = true;

const useStyles = makeStyles({
  DialogBody: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginTop: "1.5rem",
    marginBottom: "1.5rem",
    flexDirection: "column",
  },
});

const VoiceInputModal = ({ open, onClose, onFinish }) => {
  const [interimSpeech, setInterimSpeech] = useState("");
  const [inProgress, setInProgress] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    if (open && !inProgress) recognition.start();
    return () => recognition.abort();
  }, [open, inProgress]);

  useEffect(() => {
    recognition.onresult = (e) => {
      for (let res of e.results) {
        const result = res[0].transcript;
        if (result) {
          if (res.isFinal) {
            result[0].toUpperCase();
            setInterimSpeech(result);
            setTimeout(() => {
              onFinish(result);
              setInProgress(false);
              setInterimSpeech("");
              onClose();
            }, 1500);
          } else {
            setInterimSpeech(result);
          }
        }
      }
    };
  }, [interimSpeech, onClose, onFinish]);

  return (
    <Dialog onClose={onClose} open={open} maxWidth="sm" fullWidth>
      <DialogTitle>Voice Input</DialogTitle>
      <DialogContent>
        <Box className={classes.DialogBody}>
          <Mic
            fontSize="large"
            style={{ marginBottom: "10px", color: "red" }}
          />
          <Typography variant="body2">{interimSpeech}</Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default VoiceInputModal;
