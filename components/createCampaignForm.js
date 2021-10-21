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

const MainGrid = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.custom.blueDark,
  borderRadius: '1rem',
  overflow: 'hidden',
  padding: '2rem 5rem',
}));

const Divider = styled('div')(({ theme }) => ({
  border: `0.20rem solid ${theme.palette.custom.blueLight} `,
  width: '100%',
  marginTop: '0.4rem',
  marginBottom: '2rem',
  borderRadius: '0.15rem',
  opacity: 0.7,
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
}));

const ImageDiv = styled('div')(({ theme }) => ({
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  height: '12rem',
  width: '25rem',
  borderRadius: '1rem',
}));

const SubHeadline = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.main,
  marginTop: '2rem',
  fontWeight: 'bold',
  padding: '1rem 0rem',
}));

const CreateCampaignForm = ({ deployedCampaignsList }) => {
  const [spinner, setSpinner] = useState(false);

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
        .integer(
          'In Wie unit, there is no decimals. Please insert a integer number.'
        )
        .required('Please provide a min contribution amount.'),
      projectName: Yup.string().required('Please insert a project name').trim(),
      projectAim: Yup.string().required('Please insert a project aim').trim(),
      financialAim: Yup.number().positive('The amount should be positive'),
      imageURL: Yup.string().url('Please insert an URL').trim(),
    }),
    onSubmit: async (values) => {
      setSpinner(true);
      try {
        const accounts = await web3.eth.getAccounts();

        // no need to specify gas amount, metamask will do it for us.
        await factory.methods
          .createCampaign(
            values.minContribution,
            values.projectName,
            values.projectAim,
            values.imageURL,
            values.financialAim
          )
          .send({
            from: accounts[0],
          });
      } catch (err) {
        console.log(err.message);
      }
      setSpinner(false);
      router.push('/');
    },
  });

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

  const router = useRouter();

  // const submitHandler = async (e) => {
  //   e.preventDefault();

  //   setSpinner(true);
  //   try {
  //     const accounts = await web3.eth.getAccounts();

  //     // no need to specify gas amount, metamask will do it for us.
  //     await factory.methods
  //       .createCampaign(
  //         minContribution,
  //         projectName,
  //         projectAim,
  //         imageURL,
  //         financialAim
  //       )
  //       .send({
  //         from: accounts[0],
  //       });
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  //   setSpinner(false);
  //   router.push('/');
  // };

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
            label="Budget Goal to Start The Project (Ether)"
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
            label="Minimum Contribution (Wei)"
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
            <CampaignCard campaingInfo={campaignInfo} />
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
    </MainGrid>
  );
};

export default CreateCampaignForm;
