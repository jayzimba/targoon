import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios'; // Import axios as a default import
import { hash } from 'bcrypt';

const app = express();
const port = process.env.PORT || 80; // You can change the port as needed

app.use(express.json());

// Simulated user biometric data stored in memory
const storedBiometricData = {
  userId: '123456789',
  biometricHash: 'hashed_biometric_data', // Replace with actual hashed data
};

// Endpoint for biometric authentication
app.post('/authenticate', (req, res) => {
  const { userId, biometricData } = req.body;

  if (!userId || !biometricData) {
    return res.status(400).json({ message: 'Invalid request. Please provide userId and biometricData.' });
  }

  // Simulate a database lookup for the user's stored biometric data
  const storedBiometricHash = storedBiometricData.biometricHash;

  // Compare the received biometric data with the stored data (in a real system, you would use a secure comparison method)
  if (biometricData === storedBiometricHash) {
    return res.status(200).json({ message: 'Biometric authentication successful' });
  } else {
    return res.status(401).json({ message: 'Biometric authentication failed' });
  }
});

// Endpoint for user registration
app.post('/register', async (req, res) => {
  try {
    const registrationData = req.body;

    if (!registrationData) {
      return res.status(400).json({ message: 'Invalid registration data.' });
    }

    // Hash the user's password before sending it to the PHP script
    const saltRounds = 10; // You can configure the number of rounds
    const hashedPassword = await hash(registrationData.password, saltRounds);
    registrationData.password = hashedPassword;

    // Make a POST request to your PHP script for user registration
    const response = await post('http://127.0.0.1/user.php', registrationData); // Change the URL to match your PHP script

    if (response.status === 200) {
      // Registration successful
      return res.status(200).json({ message: 'Registration Successful' });
    } else {
      // Registration failed
      return res.status(401).json({ message: 'Registration Failed' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'An error occurred during registration.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
