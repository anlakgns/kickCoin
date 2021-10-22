import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';

const StyledWaitingDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    backgroundColor: theme.palette.custom.blueDark,
    color: theme.palette.custom.orangeLight,
  },
}));

const StyledQuestionDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    backgroundColor: theme.palette.custom.blueDark,
    color: theme.palette.custom.orangeLight,
  },
}));

const StyledErrorDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    backgroundColor: theme.palette.custom.blueDark,
    color: theme.palette.custom.red,
  },
}));

const StyledDialogContentText = styled(DialogContentText)(({ theme }) => ({
  color: theme.palette.custom.textWhite,
  marginBottom: '2rem',
  opacity: 0.9,
  display: 'flex',
  justifyContent: 'center',
}));

const OkeyButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.custom.orange,
  color: theme.palette.custom.textWhite,
  fontWeight: 'bold',
  margin: '1rem',
  width: '10rem',
  height: '4rem',
}));

const GridButton = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
}));

const FeedbackCard = ({
  open,
  setOpen,
  headline,
  deletePermanently,
  contentText,
  type,
  cancel,
}) => {
  return (
    <div>
      {/* Waiting Type */}
      {type === 'waiting' && (
        <StyledWaitingDialog open={open}>
          <DialogTitle>{headline}</DialogTitle>
          <DialogContent>
            <StyledDialogContentText>{contentText}</StyledDialogContentText>
            <Grid item container justifyContent="center">
              <CircularProgress color="inherit" />
            </Grid>
          </DialogContent>
        </StyledWaitingDialog>
      )}

      {/* Error Type */}
      {type === 'error' && (
        <StyledErrorDialog open={open}>
          <DialogTitle>{headline}</DialogTitle>
          <DialogContent>
            <StyledDialogContentText>{contentText}</StyledDialogContentText>
            <GridButton>
              <OkeyButton variant="outlined" onClick={() => setOpen(false)}>
                Okey
              </OkeyButton>
            </GridButton>
          </DialogContent>
        </StyledErrorDialog>
      )}

      {/* Question Type */}
      {type === 'question' && (
        <StyledQuestionDialog open={open}>
          <DialogTitle>{headline}</DialogTitle>
          <DialogContent>
            <StyledDialogContentText>{contentText}</StyledDialogContentText>
            <GridButton>
              <OkeyButton
                variant="outlined"
                onClick={() => deletePermanently()}
              >
                Delete
              </OkeyButton>
              <OkeyButton variant="outlined" onClick={() => cancel()}>
                Cancel
              </OkeyButton>
            </GridButton>
          </DialogContent>
        </StyledQuestionDialog>
      )}
    </div>
  );
};

export default FeedbackCard;
