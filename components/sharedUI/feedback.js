import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { forwardRef } from 'react';

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

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Feedback = ({
  cardOpen, // all types
  cardType, // all types
  cardHeadline, // question & waiting(optional)
  setCardClose, // error
  deletePermanently, // question
  cardContentText, // error & question & waiting(optional)
  cardCancel, 

  // bar optional if you want use all below or none
  barOpen, 
  setBarClose, 
  setBarOpen, 
  barContentText,  
  barType, 
}) => {
  const handleBarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setBarClose();
  };
  return (
    <>
      <div>
        {/* Waiting Type */}
        {cardType === 'waiting' && (
          <StyledWaitingDialog open={cardOpen}>
            <DialogTitle>
              {cardHeadline ? cardHeadline : 'Validation Process'}
            </DialogTitle>
            <DialogContent>
              <StyledDialogContentText>
                {cardContentText
                  ? cardContentText
                  : 'Every attempt to change in ethereum network needs to validated by miners. This process takes 15-30 seconds in ethereum network. Please be patient and wait we will feedback you when the process is done.'}
              </StyledDialogContentText>
              <Grid item container justifyContent="center">
                <CircularProgress color="inherit" />
              </Grid>
            </DialogContent>
          </StyledWaitingDialog>
        )}

        {/* Error Type */}
        {cardType === 'error' && (
          <StyledErrorDialog open={cardOpen}>
            <DialogTitle>Something went wrong</DialogTitle>
            <DialogContent>
              <StyledDialogContentText>
                {cardContentText}
              </StyledDialogContentText>
              <GridButton>
                <OkeyButton
                  variant="outlined"
                  onClick={() => {
                    setCardClose();
                    setBarOpen ? setBarOpen() : ""
                  }}
                >
                  Okey
                </OkeyButton>
              </GridButton>
            </DialogContent>
          </StyledErrorDialog>
        )}

        {/* Question Type */}
        {cardType === 'question' && (
          <StyledQuestionDialog open={cardOpen}>
            <DialogTitle>{cardHeadline}</DialogTitle>
            <DialogContent>
              <StyledDialogContentText>
                {cardContentText}
              </StyledDialogContentText>
              <GridButton>
                <OkeyButton
                  variant="outlined"
                  onClick={() => deletePermanently()}
                >
                  Delete
                </OkeyButton>
                <OkeyButton variant="outlined" onClick={() => cardCancel()}>
                  Cancel
                </OkeyButton>
              </GridButton>
            </DialogContent>
          </StyledQuestionDialog>
        )}
      </div>

      {/* Snackbar */}
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={barOpen}
          autoHideDuration={2000}
          onClose={handleBarClose}
        >
          <Alert
            onClose={handleBarClose}
            severity={barType === 'success' ? 'success' : 'error'}
            sx={{ width: '100%' }}
          >
            {barContentText}
          </Alert>
        </Snackbar>
      </Stack>
    </>
  );
};

export default Feedback;
