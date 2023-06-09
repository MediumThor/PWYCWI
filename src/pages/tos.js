import React from 'react';
import styled from 'styled-components';

const TermsContainer = styled.div`
  width: 80vw;
  border: 1px solid white;
  border-radius: 10px;
  padding: 20px;
  color: white;
  background: #333;
  margin: 0 auto;
  margin-top: 2%;

`;

const TermsOfService = () => (
    <TermsContainer>
        <h1>Terms of Service</h1>
        <h2>1. Agreement to Terms</h2>
        <p>
            These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and Port Washington Yacht Club ("we," "us" or "our"), concerning your access to and use of the pwycwi.com website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the "Site").
        </p>
        <h2>2. Membership</h2>
        <p>
            To participate in our yacht club's activities, you must apply for membership and pay any relevant fees. Membership is at our discretion and may be revoked at any time for violation of these terms or any other club policies.
        </p>
        <h2>3. User Representations</h2>
        <p>
            By using the Site, you represent and warrant that you are of a legal age to form a binding contract with us and meet all of the foregoing eligibility requirements.
        </p>
        <h2>4. Content and Intellectual Property Rights</h2>
        <p>
            Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the “Content”) and the trademarks, service marks, and logos contained therein (the “Marks”) are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.
        </p>
        <h2>5. Limitation of Liability</h2>
        <p>
            In no event will we or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the Site, even if we have been advised of the possibility of such damages.
        </p>
        <h2>6. Governing Law</h2>
        <p>
            These Terms of Service and your use of the Site are governed by and construed in accordance with the laws of the State of [Your State] applicable to agreements made and to be entirely performed within the State of [Your State], without regard to its conflict of law principles.
        </p>
    </TermsContainer>
);

export default TermsOfService;
