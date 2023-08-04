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
        .then(() => ({ message: `Success! ${data.email} has been made a captain.` }))
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
        .then(() => ({ message: `Success! ${data.email} is no longer a captain.` }))
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






