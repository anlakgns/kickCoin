import React from 'react';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import web3 from '../ethereum/web3';
import factory from '../ethereum/factory';
import Campaign from '../ethereum/campaign';

const MainGrid = styled(Grid)(({ theme }) => ({
  height: '10rem',
  width: '30rem',
  backgroundColor: theme.palette.custom.blueDark,

  borderRadius: '1rem',
  overflow: 'hidden',
  padding: '0rem 1rem',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
}));

const SubHeadline = styled(Typography)(({ theme }) => ({
  color: theme.palette.custom.orange,
  fontWeight: 'bold',
  padding: '0rem 1rem',
  paddingBottom: '0.3rem',
  width: '100%',
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

  const deleteCampaignHandler = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      const campaign = await Campaign(address);

      await campaign.methods.deleteCampaign().send({
        from: accounts[0],
      });

      await factory.methods.deleteCampaign(address).send({
        from: accounts[0],
      });
      router.push('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <MainGrid item>
      <SubHeadline noWrap={true}>
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
          <StyledLink onClick={() => deleteCampaignHandler()}>
            &nbsp;Delete Campaign
          </StyledLink>
        ) : (
          ''
        )}
      </Description>
    </MainGrid>
  );
};

export default OverviewCard;
