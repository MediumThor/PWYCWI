const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();


const nodemailer = require('nodemailer');
const APP_NAME = 'PWYC';





// Gmail SMTP server configuration
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: gmailEmail,
        pass: gmailPassword,
    },
});

// Sends a welcome email to the given user.
async function sendWelcomeEmail(email, displayName) {
    const mailOptions = {
        from: `${APP_NAME} <tech@PWYCWI.com>`,
        to: email,
    };

    // The user subscribed to the newsletter.
    mailOptions.subject = `Welcome Aboard, ${displayName || ''}!`;
    mailOptions.html = `
  <div style="font-family: Arial, sans-serif; text-align: center;">
    <img src="https://cdn.discordapp.com/attachments/1090123749300379740/1117955817371607110/image.png" alt="Logo" style="width: 100px;">
    <h2>Ahoy, ${displayName || ''}!</h2>
    <p>We're thrilled to have you on board as the newest member of the Port Washington Yacht Club. We're a friendly, enthusiastic bunch and we can't wait to hit the high seas with you!</p>
    <p>Whether you're an experienced sailor or just starting out, our community is here to support you. You'll find a wide range of activities and events happening at the club - something to suit everyone.</p>
    <p>So what are you waiting for? Dive in and explore your new sailing port!</p>
    <p>Please use the password reset email you have recently received to set a new password for your account.</p>
    <p>If you have any questions or need assistance, just drop us an email. We're here to help.</p>
    <p>Happy sailing!</p>
    <p>The PWYC Crew</p>
    <p style="margin-bottom: 60px;">
     <div style="margin-top: 20px; text-align: center;">
        <a href="https://www.pwycwi.com/" style="background-color: #87CEFA; color: black; text-decoration: none; padding: 10px 20px; margin: 10px 0px; cursor: pointer; border-radius: 5px; font-size: 16px;">Visit Our Website</a>
    </div>
</div>
`;
    await mailTransport.sendMail(mailOptions);
    console.log('New welcome email sent to:', email);
    return null;
}

async function sendPasswordResetEmail(email) {
    // Fetch user's first and last name from Firestore
    const userSnapshot = await admin.firestore().collection('users').where('email', '==', email).get();
    let user;
    userSnapshot.forEach(doc => {
        user = doc.data();
    });

    const displayName = user.firstName + ' ' + user.lastName;

    const passwordResetLink = await admin.auth().generatePasswordResetLink(email);

    const mailOptions = {
        from: `${APP_NAME} <tech@PWYCWI.com>`,
        to: email,
    };

    mailOptions.subject = `Password Reset for ${APP_NAME}`;
    mailOptions.html = `
   <div style="font-family: Arial, sans-serif; text-align: center;">
      <img src="https://cdn.discordapp.com/attachments/1090123749300379740/1117955817371607110/image.png" alt="Logo" style="width: 100px;">

      <h2>Hi ${displayName || ''},</h2>
      <p>You recently requested to reset your password for your ${APP_NAME} account. Click the button below to set a new password:</p>
      <p style="margin-bottom: 60px;">
      <p style="margin-bottom: 60px;">
          <a href="${passwordResetLink}" style="background-color: #87CEFA; color: black; text-decoration: none; padding: 10px 20px; margin: 10px 0px; cursor: pointer; border-radius: 5px; font-size: 16px;">Reset Password</a>
      </p>
      <p>The link will expire in 1 hour for security reasons.</p>
      <p>Best regards,</p>
      <p>The PWYC Crew</p>
      <p style="margin-bottom: 60px;">
     <div style="margin-top: 20px; text-align: center;">
        <a href="https://www.pwycwi.com/" style="background-color: #87CEFA; color: black; text-decoration: none; padding: 10px 20px; margin: 10px 0px; cursor: pointer; border-radius: 5px; font-size: 16px;">Visit Our Website</a>
    </div>
      
  </div>
`;


    await mailTransport.sendMail(mailOptions);
    console.log('Password reset email sent to:', email);
    return null;
}

exports.sendPasswordResetEmail = functions.https.onCall(async (data, context) => {
    // Check if the user is an admin or officer
    if (!(context.auth.token.admin || context.auth.token.officer)) {
        throw new functions.https.HttpsError(
            'permission-denied',
            'You must be an admin or officer to send a password reset email.'
        );
    }

    // Send the password reset email
    return sendPasswordResetEmail(data.email);
});

exports.createUser = functions.https.onCall(async (data, context) => {
    // Check if the user is an admin or officer
    if (!(context.auth.token.admin || context.auth.token.officer)) {
        throw new functions.https.HttpsError(
            'permission-denied',
            'You must be an admin or officer to create a new user.'
        );
    }

    // Create the new user
    const userRecord = await admin.auth().createUser({
        email: data.email,
        emailVerified: false
    });

    // Create the user's document in Firestore
    await admin.firestore().collection('users').doc(userRecord.uid).set({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        roles: ['Member'],
        memberNumber: data.memberNumber
    });

    // Send welcome email
    await sendWelcomeEmail(data.email, data.firstName);

    // Send password reset email
    await sendPasswordResetEmail(data.email);

    // Return a success message
    return { message: 'User created successfully! A welcome email and a password reset email have been sent.' };
});




exports.addAdminRole = functions.https.onCall((data, context) => {
    if (context.auth.token.admin !== true) {
        return { error: "Only admins can add other admins" };
    }

    return admin
        .auth()
        .getUserByEmail(data.email)
        .then((user) => {
            return admin.auth().setCustomUserClaims(user.uid, { ...user.customClaims, admin: true });
        })
        .then(() => ({ message: `Success! ${data.email} has been made an admin.` }))
        .catch((err) => err);
});


exports.removeAdminRole = functions.https.onCall((data, context) => {
    if (context.auth.token.admin !== true) {
        return { error: "Only admins can remove other admins" };
    }

    return admin
        .auth()
        .getUserByEmail(data.email)
        .then((user) => admin.auth().setCustomUserClaims(user.uid, { admin: false }))
        .then(() => ({ message: `Success! ${data.email} is no longer an admin.` }))
        .catch((err) => err);
});





exports.addOfficerRole = functions.https.onCall((data, context) => {
    if (context.auth.token.admin !== true) {
        return { error: "Only admins can add officers" };
    }

    return admin
        .auth()
        .getUserByEmail(data.email)
        .then((user) => {
            return admin.auth().setCustomUserClaims(user.uid, { ...user.customClaims, officer: true });
        })
        .then(() => ({ message: `Success! ${data.email} has been made an officer.` }))
        .catch((err) => err);
});

exports.removeOfficerRole = functions.https.onCall((data, context) => {
    if (context.auth.token.admin !== true) {
        return { error: "Only admins can remove officers" };
    }

    return admin
        .auth()
        .getUserByEmail(data.email)
        .then((user) => {
            let { officer, ...otherClaims } = user.customClaims;
            return admin.auth().setCustomUserClaims(user.uid, otherClaims);
        })
        .then(() => ({ message: `Success! ${data.email} is no longer an officer.` }))
        .catch((err) => err);
});




exports.addCaptainRole = functions.https.onCall((data, context) => {
    if (context.auth.token.admin !== true) {
        return { error: "Only admins can add captains" };
    }

    return admin
        .auth()
        .getUserByEmail(data.email)
        .then((user) => {
            return admin.auth().setCustomUserClaims(user.uid, { ...user.customClaims, captain: true });
        })
        .then(() => ({ message: `Success! ${data.email} has been made a Captain.` }))
        .catch((err) => err);
});


exports.removeCaptainRole = functions.https.onCall((data, context) => {
    if (context.auth.token.admin !== true) {
        return { error: "Only admins can remove captains" };
    }

    return admin
        .auth()
        .getUserByEmail(data.email)
        .then((user) => {
            let { captain, ...otherClaims } = user.customClaims;
            return admin.auth().setCustomUserClaims(user.uid, otherClaims);
        })
        .then(() => ({ message: `Success! ${data.email} is no longer a Captain.` }))
        .catch((err) => err);
});





exports.removeAllClaims = functions.https.onCall((data, context) => {
    if (context.auth.token.admin !== true) {
        return { error: "Only admins can remove all claims" };
    }

    return admin
        .auth()
        .getUserByEmail(data.email)
        .then((user) => admin.auth().setCustomUserClaims(user.uid, {}))
        .then(() => ({ message: `Success! All claims have been removed from ${data.email}.` }))
        .catch((err) => err);
});


exports.sendRaceRegistrationEmail = functions.https.onCall(async (data, context) => {
    // Extract the registration details from the data
    const {
        boatName,
        sailNumber,
        boatMakeModel,
        owner,
        yachtClub,
        captain,
        address,
        phoneNumber,
        email,
        lmphrf,
        category
    } = data;

    // Define the email content
    const adminMailOptions = {
        from: `${APP_NAME} <tech@PWYCWI.com>`,
        to: 'racedirector@pwycwi.com, tech@pwycwi.com', // Change to the destination email
        subject: `New Rendezvous Regatta Race Registration ${owner}, ${boatName}`,
        html: `
      <div style="font-family: Arial, sans-serif; text-align: center;">
    <img src="https://cdn.discordapp.com/attachments/1090123749300379740/1117955817371607110/image.png" alt="Logo" style="width: 100px;">
        <div>
        <h2>New Rendezvous Regatta Race Registration</h2>
        <p>Boat Name: ${boatName}</p>
        <p>Sail Number: ${sailNumber}</p>
        <p>Boat Make/Model: ${boatMakeModel}</p>
        <p>Owner: ${owner}</p>
        <p>Yacht Club: ${yachtClub}</p>
        <p>Captain: ${captain}</p>
        <p>Address: ${address}</p>
        <p>Phone Number: ${phoneNumber}</p>
        <p>Email: ${email}</p>
        <p>LMPHRF: ${lmphrf}</p>
        <p>Category: ${category}</p>
      </div>

    <p style="margin-bottom: 60px;">
     <div style="margin-top: 20px; text-align: center;">
        <a href="https://www.pwycwi.com/" style="background-color: #87CEFA; color: black; text-decoration: none; padding: 10px 20px; margin: 10px 0px; cursor: pointer; border-radius: 5px; font-size: 16px;">Visit Our Website</a>
    </div>
</div>
    `,
    };

    const registrantMailOptions = {
        from: `${APP_NAME} Race Registration <tech@PWYCWI.com>`,
        to: email, // Email of the registrant
        subject: `Thank You for Registering, ${owner}!`,
        html: `
           <div style="font-family: Arial, sans-serif; text-align: center;">
    <img src="https://cdn.discordapp.com/attachments/1090123749300379740/1117955817371607110/image.png" alt="Logo" style="width: 100px;">
         <h2>Thank You for Registering, ${owner}!</h2>
            <p>We have received your registration for the 2023 PWYC Rendezvous Regatta Race.</p>
            <p>We look forward to seeing you, ${boatName} and your crew at the port!</p>
            <p>Best regards,</p>
            <p>The PWYC Crew</p>
             <p>Please remember to either email your waiver and PHRF certificate to racedirector@pwycwi by 9/1 or bring it with you to the PWYC the morning of 9/2</p>

    <p style="margin-bottom: 60px;">
     <div style="margin-top: 20px; text-align: center;">
        <a href="https://www.pwycwi.com/" style="background-color: #87CEFA; color: black; text-decoration: none; padding: 10px 20px; margin: 10px 0px; cursor: pointer; border-radius: 5px; font-size: 16px;">Visit Our Website</a>
    </div>
</div>
        `,
    };

    // Send the email to the race director
    await mailTransport.sendMail(adminMailOptions);
    console.log('Race registration email sent to:', adminMailOptions.to);

    // Send the thank-you email to the registrant
    await mailTransport.sendMail(registrantMailOptions);
    console.log('Thank-you email sent to registrant:', registrantMailOptions.to);

    return { message: 'Registration and thank-you emails sent successfully!' };
});



exports.sendNewApplicationEmail = functions.https.onCall(async (data, context) => {
    try {
        // Extract the application details from the data
        const {
            date,
            applicantName,
            address,
            city,
            state,
            hobbies,
            phone,
            email,
            boatName,
            typeMake,
            boatLocation,
            occupation,
            employers,
            interests,
            ownBoat,
            crewBoat,
            sponsor1,
            sponsor1length,
            sponsor1how,
            sponsor2,
            sponsor2length,
            sponsor2how,
            myExpectations,
            ourExpectations,
            signature,
            requirementsChecked
        } = data;

        const signatureBuffer = Buffer.from(signature.split(',')[1], 'base64');

        // Define the email content for admin
        const adminMembershipMailOptions = {
            from: `${APP_NAME} <tech@PWYCWI.com>`,
            to: 'tech@pwycwi.com', // Change to the destination email
            subject: `New Membership Application for ${applicantName}`,
            html: ` <div style="font-family: Arial, sans-serif; text-align: center;">
    <img src="https://cdn.discordapp.com/attachments/1090123749300379740/1117955817371607110/image.png" alt="Logo" style="width: 100px;">
    <div>
        <h2>PWYC APPLICATION FOR MEMBERSHIP</h2>
        <table style="margin: auto;">
            <tr>
                <td style="text-align: left;">
                    <strong>Date:</strong>
                </td>
                <td style="text-align: left; text-decoration: underline;">${date}</td>
            </tr>
            <tr>
                <td style="text-align: left;">
                    <strong>Name(s) of Applicant:</strong>
                </td>
                <td style="text-align: left; text-decoration: underline;">${applicantName}</td>
            </tr>
            <tr>
                <td style="text-align: left;">
                    <strong>Address:</strong>
                </td>
                <td style="text-align: left; text-decoration: underline;">${address}</td>
            </tr>
            <tr>
                <td style="text-align: left;">
                    <strong>City:</strong>
                </td>
                <td style="text-align: left; text-decoration: underline;">${city}</td>
            </tr>
            <tr>
                <td style="text-align: left;">
                    <strong>State:</strong>
                </td>
                <td style="text-align: left; text-decoration: underline;">${state}</td>
            </tr>
            <tr>
                <td style="text-align: left;">
                    <strong>Phone number:</strong>
                </td>
                <td style="text-align: left; text-decoration: underline;">${phone}</td>
            </tr>
            <tr>
                <td style="text-align: left;">
                    <strong>Email Address:</strong>
                </td>
                <td style="text-align: left; text-decoration: underline;">${email}</td>
            </tr>
          
            <tr>
                <td style="text-align: left;">
                    <strong>Occupation(s):</strong>
                </td>
                <td style="text-align: left; text-decoration: underline;">${occupation}</td>
            </tr>
            <tr>
                <td style="text-align: left;">
                    <strong>Employer(s):</strong>
                </td>
                <td style="text-align: left; text-decoration: underline;">${employers}</td>
            </tr>
            <tr>
                <td style="text-align: left;">
                    <strong>Hobbies or Special Interests:</strong>
                </td>
                <td style="text-align: left; text-decoration: underline;">${hobbies}</td>
            </tr>
            <tr>
                <td style="text-align: left;">
                    <strong>Do you own a boat?:</strong>
                </td>
                <td style="text-align: left; text-decoration: underline;">${ownBoat}</td>
            </tr>
            <tr>
                <td style="text-align: left;">
                    <strong>If you do not own a boat, do you regularly crew on a boat?:</strong>
                </td>
                <td style="text-align: left; text-decoration: underline;">${crewBoat}</td>
            </tr>
              <tr>
                <td style="text-align: left;">
                    <strong>Boat Name:</strong>
                </td>
                <td style="text-align: left; text-decoration: underline;">${boatName}</td>
            </tr>
            <tr>
                <td style="text-align: left;">
                    <strong>Sail or Power and Make of boat:</strong>
                </td>
                <td style="text-align: left; text-decoration: underline;">${typeMake}</td>
            </tr>
            <tr>
                <td style="text-align: left;">
                    <strong>Slip and location of boat:</strong>
                </td>
                <td style="text-align: left; text-decoration: underline;">${boatLocation}</td>
            </tr>
            <tr>
                <td style="text-align: left;">
                    <div style="margin-top: 20px; margin-bottom: 20px;">
                        <strong>CLUB SPONSORS:</strong>
                    </div>
                </td>
                <td style="text-align: left; text-decoration: underline;">
                    <div style="margin-top: 20px; margin-bottom: 20px;"></div>
                </td>
            </tr>
            <tr>
                <td style="text-align: left;">
                    <strong>1) Print Name of Sponsor one:</strong>
                </td>
                <td style="text-align: left; text-decoration: underline;">${sponsor1}</td>
            </tr>
            <tr>
                <td style="text-align: left;">
                    <strong>How long have you known this sponsor:</strong>
                </td>
                <td style="text-align: left; text-decoration: underline;">${sponsor1length}</td>
            </tr>
            <tr>
                <td style="text-align: left;">
                    <strong>Nature of acquaintance this sponsor?:</strong>
                </td>
                <td style="text-align: left; text-decoration: underline;">${sponsor1how}</td>
            </tr>
            <tr>
                <td style="text-align: left;">
                    <strong>2) Print Name of Sponsor two:</strong>
                </td>
                <td style="text-align: left; text-decoration: underline;">${sponsor2}</td>
            </tr>
            <tr>
                <td style="text-align: left;">
                    <strong>How long have you known this sponsor:</strong>
                </td>
                <td style="text-align: left; text-decoration: underline;">${sponsor2length}</td>
            </tr>
            <tr>
                <td style="text-align: left;">
                    <strong>Nature of acquaintance this sponsor?:</strong>
                </td>
                <td style="text-align: left; text-decoration: underline;">${sponsor2how}</td>
            </tr>
            <tr>
                <td style="text-align: left;">
                    <strong>What are your expectations from membership in the PWYC?:</strong>
                </td>
                <td style="text-align: left; text-decoration: underline;">${myExpectations}</td>
            </tr>
            <tr>
                <td style="text-align: left;">
                    <strong>What can the PWYC expect from you?:</strong>
                </td>
                <td style="text-align: left; text-decoration: underline;">${ourExpectations}</td>
            </tr>
            <tr>
                <td style="text-align: left;">
                    <strong>Volunteerism areas of interest:</strong>
                </td>
                <td style="text-align: left; text-decoration: underline;">${interests ? interests.join(', ') : 'N/A'}</td>
            </tr>
            <tr>
                <td style="text-align: left;">
                    <strong>Requirements Checked:</strong>
                </td>
                <td style="text-align: left; text-decoration: underline;">${requirementsChecked ? 'Yes' : 'No'}</td>
            </tr>
        </table>
        <div style="margin-top: 20px;">
            <strong>Signature:</strong>
            <br>
            <img src="cid:signature" alt="Applicant's Signature" width="200">
        </div>
        <div style="margin-top: 20px; text-align: center;">
            <a href="https://www.pwycwi.com/" style="background-color: #87CEFA; color: black; text-decoration: none; padding: 10px 20px; margin: 10px 0px; cursor: pointer; border-radius: 5px; font-size: 16px;">Visit Our Website</a>
        </div>
    </div>
</div> `,

            attachments: [
                {
                    filename: 'signature.png',
                    content: signatureBuffer,
                    cid: 'signature' // same cid value as in the html img src
                },
            ],
        };

        // Define the email content for registrant
        const registrantMailOptions = {
            from: `${APP_NAME} Membership Application <tech@PWYCWI.com>`,
            to: email, // Email of the applicant
            subject: `Thank You for Your Membership Application, ${applicantName}!`,
            html: `
<div style="font-family: Arial, sans-serif; text-align: center;">
             <img src="https://cdn.discordapp.com/attachments/1090123749300379740/1117955817371607110/image.png" alt="Logo" style="width: 100px;">
    <div>
            <h1>Welcome to ${APP_NAME}!</h1>
            <p>Dear ${applicantName},</p>
            <p>Thank you for submitting your membership application to ${APP_NAME}. We are thrilled to have you join our community of boating enthusiasts.</p>
            <p>Your application is now under review and will be posted on the Club bulletin board for a period of 30 days as per our bylaws. After the review period, our Board of Directors will evaluate your application.</p>
            <p>We strongly encourage active participation in Club activities and look forward to seeing you around.</p>
            <p>If you have any questions or need further information, feel free to reply to this email or contact us at <a href="mailto:tech@PWYCWI.com">tech@PWYCWI.com</a>.</p>
            <p>Best regards,</p>
            <p>The ${APP_NAME} Team</p>
            <a href="https://www.your-club-website.com" style="background-color: #87CEFA; color: black; text-decoration: none; padding: 10px 20px; margin: 10px 0px; cursor: pointer; border-radius: 5px; font-size: 16px;">Visit Our Website</a>
        </div>
         `,
        };

        // Send the email to the admin
        await mailTransport.sendMail(adminMembershipMailOptions);
        console.log('Membership application email sent to:', adminMembershipMailOptions.to);

        // Send the thank-you email to the registrant
        await mailTransport.sendMail(registrantMailOptions);
        console.log('Thank-you email sent to registrant:', registrantMailOptions.to);

        return { status: 'success', message: 'Registration and thank-you emails sent successfully!' };
    } catch (error) {
        console.error('Error sending membership application email:', error);
        throw new functions.https.HttpsError(
            'internal',
            'An error occurred while sending the membership application email.'
        );
    }
});
