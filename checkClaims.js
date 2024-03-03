const admin = require('firebase-admin');

var serviceAccount = require("./pwyc-628af-firebase-adminsdk-zvn6r-e5c1fbf39f.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

let email = 'tech@pwycwi.com';

admin.auth().getUserByEmail(email)
    .then(userRecord => {
        console.log('Successfully fetched user data:', userRecord.toJSON());
        console.log('Custom Claims:', userRecord.customClaims);
    })
    .catch(error => {
        console.log('Error fetching user data:', error);
    });

// Function to check custom claims of a user
async function checkCustomClaims(uid) {
  try {
    // Fetch the user by UID
    const userRecord = await admin.auth().getUser(uid);
    
    // Access custom claims
    const customClaims = userRecord.customClaims || {};
    
    // Log the custom claims to the console
    console.log(`Custom claims for user ${uid}:`, customClaims);
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
}

// Replace 'user-uid' with the actual UID of the user you want to check
checkCustomClaims('user-uid');
