import React from 'react';
import styled from 'styled-components';

const PrivacyContainer = styled.div`
  width: 80vw;
  border: 1px solid white;
  border-radius: 10px;
  padding: 20px;
  color: white;
  background: #333;
  margin: 0 auto;
  margin-top: 2%;
`;

const PrivacyPolicy = () => (
    <PrivacyContainer>
        <h1>Privacy Policy</h1>
        <h2>1. Introduction</h2>
        <p>
            Port Washington Yacht Club ('we' or 'us' or 'our') respects the privacy of our users ('user' or 'you'). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website. Please read this privacy policy carefully.
        </p>
        <h2>2. Collection of Your Information</h2>
        <p>
            We may collect information about you in a variety of ways. The information we may collect on the Site includes:
            <ul>
                <li><strong>Personal Data</strong>: Personally identifiable information, such as your name, address, email address, and telephone number, and demographic information, such as your age, gender, hometown, and interests, that you voluntarily give to us when you choose to participate in various activities related to the Site.</li>
                <li><strong>Derivative Data</strong>: Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.</li>
            </ul>
        </p>
        <h2>3. Use of Your Information</h2>
        <p>
            Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
            <ul>
                <li>Administer sweepstakes, promotions, and contests.</li>
                <li>Assist law enforcement and respond to subpoena.</li>
                <li>Compile anonymous statistical data and analysis for use internally or with third parties.</li>
                <li>Create and manage your account.</li>
                <li>Email you regarding your account or order.</li>
                <li>Fulfill and manage purchases, orders, payments, and other transactions related to the Site.</li>
                <li>Notify you of updates to the Site.</li>
            </ul>
        </p>
        <h2>4. Disclosure of Your Information</h2>
        <p>
            We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
            <ul>
                <li><strong>By Law or to Protect Rights</strong>: If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.</li>
            </ul>
        </p>
        <h2>5. Security of Your Information</h2>
        <p>
            We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or othertype of misuse. Any information disclosed online is vulnerable to interception and misuse by unauthorized parties. Therefore, we cannot guarantee complete security if you provide personal information.
        </p>
    </PrivacyContainer>
);

export default PrivacyPolicy;
