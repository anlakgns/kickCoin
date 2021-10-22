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

const StyledErrorDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    backgroundColor: theme.palette.custom.red,
    color: theme.palette.custom.orangeLight,
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
  width: '15rem',
  height: '5rem',
}));

const FeedbackCard = ({ open, setOpen, headline, contentText, type }) => {
  return (
    <div>
      {type === 'waiting' ? (
        <StyledWaitingDialog open={open}>
          <DialogTitle>{headline}</DialogTitle>
          <DialogContent>
            <StyledDialogContentText>{contentText}</StyledDialogContentText>
            <Grid item container justifyContent="center">
              <CircularProgress color="inherit" />
            </Grid>
          </DialogContent>
        </StyledWaitingDialog>
      ) : (
        <StyledErrorDialog open={open}>
          <DialogTitle>{headline}</DialogTitle>
          <DialogContent>
            <StyledDialogContentText>{contentText}</StyledDialogContentText>
            <OkeyButton variant="outlined" onClick={() => setOpen(false)}>
              Okey
            </OkeyButton>
          </DialogContent>
        </StyledErrorDialog>
      )}
    </div>
  );
};

export default FeedbackCard;
