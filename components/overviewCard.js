import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import web3 from '../ethereum/web3';
import factory from '../ethereum/factory';
import FeedbackCard from './feedbackCard';
import FeedbackBar from './feedbackBar';

const MainGrid = styled(Grid)(({ theme }) => ({
  height: 'auto',
  padding: '1.5rem',
  flex: 1,
  minWidth: '30rem',
  backgroundColor: theme.palette.custom.blueDark,
  borderRadius: '1rem',
  overflow: 'hidden',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  "@media (max-width: 550px)": {
    minWidth: '25rem',
  }
}));

const SubHeadline = styled(Typography)(({ theme }) => ({
  color: theme.palette.custom.orange,
  fontWeight: 'bold',
  padding: '0rem 1rem',
  paddingBottom: '0.3rem',
  width: '100%',
  overflowWrap: "anywhere"
}));

const Description = styled(Typography)(({ theme }) => ({
  color: theme.palette.custom.textWhite,
  width: '100%',
  opacity: 0.7,
  padding: '0rem 1rem',
  paddingBottom: '0.4rem',
}));

const StyledLink = styled('span')(({ theme }) => ({
  color: theme.palette.custom.orangeLight,
  fontWeight: 'bold',
  cursor: 'pointer',
}));

const OverviewCard = ({ info, explanation }) => {
  const router = useRouter();
  const address = router.query.campaignAddress;

  // Feedback Card States
  const [feedbackCardDeletingProcessOpen, setFeedbackCardDeletingProcessOpen] =
    useState(false);
  const [feedbackCardQuestionOpen, setFeedbackQuestionCardOpen] =
    useState(false);
  const [feedbackCardErrorOpen, setFeedbackCardErrorOpen] = useState(false);
  const [feedbackCardErrorText, setFeedbackCardErrorText] = useState('');

  // Feedbackar States
  const [feedbackBarSuccessOpen, setFeedbackBarSuccessOpen] = useState(false);
  const [feedbackBarErrorOpen, setFeedbackBarErrorOpen] = useState(false);

  const deleteCampaignCardHandler = () => {
    setFeedbackQuestionCardOpen(true);
  };

  const deleteCampaignCancelButton = () => {
    setFeedbackQuestionCardOpen(false);
  };

  const deleteCampaignDeleteButton = async () => {
    try {
      const accounts = await web3.eth.getAccounts();

      setFeedbackQuestionCardOpen(false);
      setFeedbackCardDeletingProcessOpen(true);
      await factory.methods.deleteCampaign(address).send({
        from: accounts[0],
      });
      setFeedbackCardDeletingProcessOpen(false);
      setFeedbackBarSuccessOpen(true);

      setTimeout(() => {
        router.push('/');
      }, [2000]);
    } catch (err) {
      setFeedbackQuestionCardOpen(false);
      setFeedbackCardDeletingProcessOpen(false);
      setFeedbackCardErrorOpen(true);
      setFeedbackCardErrorText(err.message);
    }
  };

  // Showing error bar after error card closed.
  useEffect(() => {
    if (Boolean(feedbackCardErrorText) && !feedbackCardErrorOpen) {
      setFeedbackBarErrorOpen(true);
    }
  }, [feedbackCardErrorText, feedbackCardErrorOpen]);

  return (
    <MainGrid item>
      <SubHeadline >
        {info[0]}: {info[1]}
      </SubHeadline>
      <Description align="left" variant="subtitle2">
        {explanation}
        {info[0] === 'requestsCount' ? (
          <StyledLink
            onClick={() => router.push(`/campaigns/${address}/requests`)}
          >
            &nbsp;View Requests
          </StyledLink>
        ) : (
          ''
        )}
        {info[0] === 'manager' ? (
          <StyledLink onClick={() => deleteCampaignCardHandler()}>
            &nbsp;Delete Campaign
          </StyledLink>
        ) : (
          ''
        )}
      </Description>

      {info[0] === 'manager' ? (
        <>
          <FeedbackCard
            type="waiting"
            open={feedbackCardDeletingProcessOpen}
            setOpen={setFeedbackCardDeletingProcessOpen}
            headline="Deleting Process"
            contentText="All amount of ether in this campaign are paying back your supporters and your campaign is deleting permanently. Please wait about 15-30 seconds. "
          />
          <FeedbackCard
            type="question"
            open={feedbackCardQuestionOpen}
            setOpen={setFeedbackQuestionCardOpen}
            cancel={deleteCampaignCancelButton}
            deletePermanently={deleteCampaignDeleteButton}
            headline="Deleting Process"
            contentText="We will payback all balance in this campaing to your supporters and delete this campaign permanently. Are you sure ?"
          />
          <FeedbackCard
            type="error"
            open={feedbackCardErrorOpen}
            setOpen={setFeedbackCardErrorOpen}
            headline="Something went wrong"
            contentText={feedbackCardErrorText}
          />
          <FeedbackBar
            type="success"
            open={feedbackBarSuccessOpen}
            setOpen={setFeedbackBarSuccessOpen}
            contentText="Your campaign has deleted successfully."
          />
          <FeedbackBar
            type="error"
            open={feedbackBarErrorOpen}
            setOpen={setFeedbackBarErrorOpen}
            contentText="The delete process has not completed."
          />
        </>
      ) : (
        ''
      )}
    </MainGrid>
  );
};

export default OverviewCard;
