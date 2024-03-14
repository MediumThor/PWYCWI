import React from 'react';
import Modal from 'react-modal'; // import the react-modal package
import styled from 'styled-components';


export default function BoardModal({ isOpen, onRequestClose }) {



    const boardData = [
        {
            name: 'Terry White',
        },
        {
            name: 'Bill Schanen IV',
        },
        {
            name: 'Lynn Brown',
        },
        {
            name: 'Dennis Cherny',
        },
        {
            name: 'Heather Huggett',
        },
        {
            name: 'Brian Kendzdor',
        },
        {
            name: 'Doug Podzilni',
        },
        {
            name: 'Gary Pritzlaff',
        },

        // add more items here...
    ];
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
            <ModalTitle style={{ textAlign: 'center', borderBottom: '1px solid gray' }}>Board Members</ModalTitle>

            <ContentWrapper>
                <OfficersSection>

                    <BoardGrid>
                        {boardData.map((item, index) => (
                            <InfoItem key={index}>
                                <a>{item.name}</a>
                            </InfoItem>
                        ))}
                    </BoardGrid>

                </OfficersSection>
            </ContentWrapper>
            <div style={{ position: 'absolute', left: '50%', bottom: '20px', transform: 'translateX(-50%)' }}>
                <StyledButton onClick={onRequestClose}>Close</StyledButton>
            </div>
        </Modal>
    );
}


const ModalTitle = styled.h2`
  margin-top: -1%;
  color: black;
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
  color: black;
  padding-bottom: -20px; // Adjust this value as needed
  width: 80vw; // Sets the width of the title (and therefore the line)
  margin: 0 auto; // Centers the title horizontally
`;

const OfficersSection = styled.div`
 margin-top: -0px;
   color: black;

   

`;

const BoardGrid = styled.div`

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: auto;
  gap: 70px;
  justify-content: center;
  padding: 70px;
  

   @media (max-width: 700px) {
  grid-template-columns: repeat(2, 1fr);
      display: column;;
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: auto;
  gap: 20px;
  justify-content: center;
  padding: 30px;
    color: black;

   @media (max-width: 600px) {
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
    color: black;

`;

const Title = styled.p`
  color: black;
`;

const ContentWrapper = styled.div`
  position: relative;
  overflow: auto;
  flex: 1;
    color: black;

`;
