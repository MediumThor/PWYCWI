import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

const ModalTitle = styled.h2`
  margin-top: 1%;
  color: Black;
  @media (max-width: 600px) {
    margin-top: -20px;
  }
`;

const StyledTitle = styled.h3`
  font-size: 1.5rem;
  text-decoration: underline;
  text-align: center;
`;

const StyledText = styled.p`
  text-align: center;
    color: black;

`;

const StyledTextBody = styled.p`
  text-align: center;
    color: black;
    margin-bottom: 20%;

`;

const StyledLink = styled.a`
  color: #0000EE;
  text-decoration: underline;
`;

const StyledButton = styled.button`
  box-shadow: 0px 0px 10px 2px rgba(0,0,0,0.3);
  z-index: 2;
  font-size: 1.4rem;
  border-radius: 5px;
  border: 2px solid white;
  background-color: #000000;
  color: white;
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    color: #996515;
    border-color: #87CEFA;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
  }
`;



const ContentWrapper = styled.div`
  position: relative;
  overflow: auto;
  flex: 1;
`;

export default function MembershipModal({ isOpen, onRequestClose }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Signup"
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          zIndex: 1000 // Set a higher value for the overlay

        },
        content: {
          width: '80%',
          height: '80%',
          margin: 'auto',
          borderRadius: '20px',
          overflowX: 'none',
          padding: '5%',
          boxShadow: '10px 10px 25px rgba(0, 0, 0, 0.9)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 1001, // Set a higher value for the content

          '@media (max-width: 600px)': {
            width: '90%'
          }
        }
      }}
    >
      <ModalTitle style={{ textAlign: 'center', borderBottom: '1px solid gray' }}>APPLICATION FOR MEMBERSHIP</ModalTitle>
      <ContentWrapper>
        <StyledText>
          Requirements for membership are: <br />
          Interest in boating (boat ownership is not required) <br />
          A completed application including signatures of two current PWYC members <br />
          $25 check (non-refundable application fee)
        </StyledText>
        <StyledTextBody>
          <p>Once you submit your application, it will be displayed on the Club bulletin board for a period of 30 days. During this time, the membership will have the opportunity to review your application. After the 30-day period, your application will be presented to the Board of Directors for their evaluation and approval.

            Upon successful approval, you will receive notification of your acceptance as a member. This notification will be provided by the Fleet Captain and/or through an announcement in the upcoming edition of the Porthole, the Club's newsletter.</p>

          <p>After approval, the Club Treasurer will contact you to inform you about the applicable fees that need to be paid. These fees include a one-time building assessment charge of $250 and prorated dues based on the current annual dues of $300.

            As a member, you will enjoy the rights, privileges, and responsibilities outlined in the Club By-Laws. We strongly encourage active participation in Club activities. To proceed,

            <StyledLink href="/images/PWYC Membership Form.pdf" target="_blank"> please click here</StyledLink> to access and complete the Member Information form, which can be printed out for your convenience.
          </p>
        </StyledTextBody>
      </ContentWrapper>
      <div style={{ position: 'absolute', left: '50%', bottom: '20px', transform: 'translateX(-50%)' }}>
        <StyledButton onClick={onRequestClose}>Close</StyledButton>
      </div>
    </Modal>
  );
}
