import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';

const MainGrid = styled(Grid)(({ theme }) => ({}));
const RequestsGrid = styled(Grid)(({ theme }) => ({}));

const PaginationGrid = styled(Grid)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  padding: '1rem',
  '@media (max-width: 1000px)': {
    marginBottom: '5rem',
    marginTop: '2rem',
  },
}));
const StyledPagination = styled(Pagination)(({ theme }) => ({
  '& .MuiPaginationItem-root': {
    color: theme.palette.custom.textWhite,
  },
}));

const RequestList = ({ props }) => {
  return (
    <MainGrid>
      <RequestsGrid>
        {props.requests?.map((request, index) => (
          <RequestCard
            request={request}
            isManager={isManager}
            key={index}
            id={index}
            address={router.query.campaignAddress}
            supportersCount={props.supportersCount}
          />
        ))}
      </RequestsGrid>

      <PaginationGrid>
        <StyledPagination
          count={5}
          // onChange={paginationHandler}
          page={1}
          color="secondary"
        />
      </PaginationGrid>
    </MainGrid>
  );
};

export default RequestList;
