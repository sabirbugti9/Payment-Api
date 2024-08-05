const express = require('express');
const axios = require('axios');
const cors = require('cors');  // Import the cors package
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Use cors middleware
app.use(cors({
    origin: 'http://localhost:8080'  // Allow requests from this origin
}));

app.post('/api/payment', async (req, res) => {
    try {
        const body = req.body;

        const response = await axios.post(
            'https://sandbox.paguelofacil.com/rest/processTx/AUTH_CAPTURE',
            body,
            {
                headers: {
                    Authorization: 'WT5hTaUcpa4J3h4AmrZa2EXXJs8boUVa|DIRd852djHbq2j5Fca5VDUkDbExTBCVf',
                    'Content-Type': 'application/json'
                }
            }
        );

        res.status(response.status).json(response.data);
    } catch (error) {
        console.error('Error making payment request:', error);
        res.status(error.response ? error.response.status : 500).json({ message: 'An error occurred' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
