import React from 'react';
import Modal from 'react-modal'; // import the react-modal package
import styled from 'styled-components';

const ModalTitle = styled.h2`
  margin-top: 1%;
  color: Black;
  @media (max-width: 600px) {
    margin-top: -20px;
  }
`;

const StyledButton = styled.button`
  // add this line to set a fixed height
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

const OfficersTitle = styled.h2`
  text-align: center;
  color: Black;
  padding-bottom: -20px; // Adjust this value as needed
  width: 80vw; // Sets the width of the title (and therefore the line)
  margin: 0 auto; // Centers the title horizontally
`;

const OfficersSection = styled.div`
 margin-top: -40px;

`;

const BoardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: auto;
  gap: 20px;
  justify-content: center;
  padding: 30px;
`;

const InfoGrid = styled.div`

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: auto;
  gap: 20px;
  justify-content: center;
  padding: 30px;
   @media (max-width: 1100px) {
  grid-template-columns: repeat(2, 1fr);
    text-align: center;
  }
     @media (max-width: 740px) {
  grid-template-columns: repeat(1, 1fr);
    text-align: center;
  }
`;

const InfoItem = styled.div`

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: Black; 
`;

const Title = styled.p`
  color: Black;
    font-weight: bold;  // add this line

`;

const ContentWrapper = styled.div`
  position: relative;
    overflow-x: none;

  overflow-y: auto;
  flex: 1;
    margin-bottom: 40px;

`;

export default function OfficersModal({ isOpen, onRequestClose }) {

    const officerData = [
        {
            title: 'COMMODORE',
            name: 'Terry White',
            duties: 'Finances & Roster',
            email: 'commodore@pwycwi.com',
        },
        {
            title: 'VICE COMMODORE',
            name: 'Troy Bretl',
            duties: 'House/Maintenance & Fish Day',
            email: 'vicecommodore@pwycwi.com',
        },
        {
            title: 'REAR COMMODORE ',
            name: 'Brian Kendzor',
            duties: 'Private Parties & Club Social Parties',
            email: 'rearcommodore@pwycwi.com',
        },
        {
            title: 'SECRETARY',
            name: 'Sara Janeshek',
            duties: 'Correspondence & Archives',
            email: 'secretary@pwycwi.com',
        },
        {
            title: 'TREASURER',
            name: 'Chuck Motl',
            duties: 'Finances & Roster',
            email: 'treasurer@pwycwi.com',
        },
        {
            title: 'FLEET CAPTAIN',
            name: 'Mark Lackovic',
            duties: 'New Membership & Race Events',
            email: 'fleetcaptain@pwycwi.com',
        }

        // add more items here...
    ];


    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Signup"
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.7)'
                },
                content: {
                    width: '80%',
                    height: '60%',
                    margin: 'auto',
                    borderRadius: '20px',
                    overflowX: 'hidden',
                    padding: '5%',
                    boxShadow: '10px 10px 25px rgba(0, 0, 0, 0.9)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    '@media (max-width: 600px)': {
                        width: '90%',
                    }
                }
            }}
        >
            <ModalTitle style={{ textAlign: 'center', borderBottom: '1px solid gray' }}>Officers</ModalTitle>

            <ContentWrapper>
                <OfficersSection>
                    <InfoGrid>
                        {officerData.map((item, index) => (
                            <InfoItem key={index}>
                                <Title>{item.title}</Title>
                                <a>{item.name}</a>
                                <p>{item.duties}</p>
                                <a href={`mailto:${item.email}`}>{item.email}</a>
                            </InfoItem>
                        ))}
                    </InfoGrid>

                </OfficersSection>
            </ContentWrapper>
            <div style={{ position: 'absolute', left: '50%', bottom: '20px', transform: 'translateX(-50%)' }}>
                <StyledButton onClick={onRequestClose}>Close</StyledButton>
            </div>
        </Modal>
    );
}
