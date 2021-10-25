import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { Button, Grid, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import factory from '../ethereum/factory';
import web3 from '../ethereum/web3';
import CircularProgress from '@mui/material/CircularProgress';
import CampaignCard from './campaignCard';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FeedbackCard from './feedbackCard';
import FeedbackBar from './feedbackBar';

const MainGrid = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.custom.blueDark,
  borderRadius: '1rem',
  overflow: 'hidden',
  padding: '2rem 5rem',
  "@media (min-width: 0px) and (max-width: 700px)": {
    padding: "2rem 2rem"
  },
  '@media (min-width: 700px) and (max-width: 1000px)': {
    marginBottom: '5rem',
    padding: "2rem 3rem",
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: '100%',
  color: theme.palette.custom.blueLight,
  marginBottom: '1rem',
}));

const CreateButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.custom.orange,
  color: theme.palette.custom.textWhite,
  fontWeight: 'bold',
  margin: '1rem',
  marginTop: '2rem',
  margin: 'auto',
  width: '20rem',
  "@media (max-width: 1000px)": {
    marginBottom: "2rem",
    marginTop: "3rem"
  }
}));

const SubHeadline = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.main,
  marginTop: '2rem',
  fontWeight: 'bold',
  padding: '1rem 0rem',
}));

const CreateCampaignForm = ({ deployedCampaignsList }) => {
  const [spinner, setSpinner] = useState(false);
  const router = useRouter();

  // Cards
  const [feedbackCardWaitingOpen, setFeedbackWaitingCardOpen] = useState(false);
  const [feedbackCardErrorOpen, setFeedbackErrorCardOpen] = useState(false);
  const [feedbackCardErrorText, setFeedbackCardErrorText] = useState('');

  // Bars
  const [feedbackBarSuccessOpen, setFeedbackBarSuccessOpen] = useState(false);
  const [feedbackBarErrorOpen, setFeedbackBarErrorOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      minContribution: '',
      projectName: '',
      projectAim: '',
      financialAim: '',
      imageURL: '',
    },
    validationSchema: Yup.object({
      minContribution: Yup.number('Please intert a number')
        .positive('The amount should be positive.')
        .required('Please provide a min contribution amount.'),
      projectName: Yup.string().required('Please insert a project name').trim(),
      projectAim: Yup.string()
        .max(200, 'No more than 200 characters.')
        .required('Please insert a project aim')
        .trim(),
      financialAim: Yup.number().positive('The amount should be positive'),
      imageURL: Yup.string().url('Please insert an URL').trim(),
    }),
    onSubmit: async (values) => {
      setSpinner(true);
      setFeedbackWaitingCardOpen(true);
      try {
        const accounts = await web3.eth.getAccounts();

        // no need to specify gas amount, metamask will do it for us.
        await factory.methods
          .createCampaign(
            web3.utils.toWei(values.minContribution, 'ether'),
            values.projectName,
            values.projectAim,
            values.imageURL,
            web3.utils.toWei(values.financialAim, 'ether')
          )
          .send({
            from: accounts[0],
          });
        setSpinner(false);
        setFeedbackWaitingCardOpen(false);
        setFeedbackBarSuccessOpen(true);
        setTimeout(() => {
          router.push('/');
        }, [1500]);
      } catch (err) {
        setSpinner(false);
        setFeedbackWaitingCardOpen(false);
        setFeedbackErrorCardOpen(true);
        setFeedbackCardErrorText(err.message);
      }
    },
  });

  // Showing error bar after error card closed.
  useEffect(() => {
    if (Boolean(feedbackCardErrorText) && !feedbackCardErrorOpen) {
      setFeedbackBarErrorOpen(true);
    }
  }, [feedbackCardErrorText, feedbackCardErrorOpen]);

  const campaignInfo = {
    minContribution: formik.values.minContribution,
    balance: 10,
    projectName: formik.values.projectName,
    projectAim: formik.values.projectAim,
    financialAim: 20,
    imageURL:
      formik.values.imageURL === ''
        ? 'https://images.unsplash.com/photo-1504805572947-34fad45aed93?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80'
        : formik.values.imageURL,
  };

  return (
    <MainGrid>
      <form onSubmit={formik.handleSubmit}>
        <Grid item container direction="column">
          <StyledTextField
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.projectName}
            name="projectName"
            error={Boolean(
              formik.touched.projectName && formik.errors.projectName
            )}
            helperText={
              formik.touched.projectName && formik.errors.projectName
                ? formik.errors.projectName
                : ''
            }
            color="secondary"
            label="Project Name"
            variant="standard"
            inputProps={{ style: { color: 'white' } }}
            InputLabelProps={{ sx: { color: '#05AAE0' } }}
          />
          <StyledTextField
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.financialAim}
            error={Boolean(
              formik.touched.financialAim && formik.errors.financialAim
            )}
            helperText={
              formik.touched.financialAim && formik.errors.financialAim
                ? formik.errors.financialAim
                : ''
            }
            name="financialAim"
            color="secondary"
            label="Budget Goal to Start The Project (in Ether)"
            variant="standard"
            inputProps={{ style: { color: 'white' } }}
            InputLabelProps={{ sx: { color: '#05AAE0' } }}
          />
          <StyledTextField
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.minContribution}
            name="minContribution"
            error={Boolean(
              formik.touched.minContribution && formik.errors.minContribution
            )}
            helperText={
              formik.touched.minContribution && formik.errors.minContribution
                ? formik.errors.minContribution
                : ''
            }
            color="secondary"
            label="Minimum Contribution (in Ether)"
            variant="standard"
            inputProps={{ style: { color: 'white' } }}
            InputLabelProps={{ sx: { color: '#05AAE0' } }}
          />
          <StyledTextField
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.projectAim}
            name="projectAim"
            error={Boolean(
              formik.touched.projectAim && formik.errors.projectAim
            )}
            helperText={
              formik.touched.projectAim && formik.errors.projectAim
                ? formik.errors.projectAim
                : ''
            }
            color="secondary"
            label="Project Aim"
            variant="standard"
            multiline
            inputProps={{ style: { color: 'white' } }}
            InputLabelProps={{ sx: { color: '#05AAE0' } }}
          />
          <StyledTextField
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.imageURL}
            error={Boolean(formik.touched.imageURL && formik.errors.imageURL)}
            helperText={
              formik.touched.imageURL && formik.errors.imageURL
                ? formik.errors.imageURL
                : ''
            }
            name="imageURL"
            color="secondary"
            label="Cover Image URL"
            variant="standard"
            inputProps={{ style: { color: 'white' } }}
            InputLabelProps={{ sx: { color: '#05AAE0' } }}
          />
          <Grid item>
            <SubHeadline variant="subtitle1">
              Preview of your campaign
            </SubHeadline>
            <CampaignCard campaingInfo={campaignInfo} preview="true" />
          </Grid>

          <CreateButton
            type="submit"
            variant="contained"
            disabled={spinner}
            endIcon={spinner ? '' : <AddIcon />}
          >
            {spinner ? <CircularProgress color="primary" /> : 'Create!'}
          </CreateButton>
        </Grid>
      </form>
      <FeedbackCard
        type="waiting"
        open={feedbackCardWaitingOpen}
        setOpen={setFeedbackWaitingCardOpen}
        headline="Validation Process"
        contentText="Every attempt to change in ethereum network needs to validated by miners. This process takes 15-30 seconds in ethereum network. Please be patient and wait we will feedback you when the process is done. "
      />
      <FeedbackCard
        type="error"
        open={feedbackCardErrorOpen}
        setOpen={setFeedbackErrorCardOpen}
        headline="Something went wrong"
        contentText={feedbackCardErrorText}
      />
      <FeedbackBar
        type="success"
        open={feedbackBarSuccessOpen}
        setOpen={setFeedbackBarSuccessOpen}
        contentText="Your campaign has created successfully."
      />
      <FeedbackBar
        type="error"
        open={feedbackBarErrorOpen}
        setOpen={setFeedbackBarErrorOpen}
        contentText="Your campaign has not created."
      />
    </MainGrid>
  );
};

export default CreateCampaignForm;
