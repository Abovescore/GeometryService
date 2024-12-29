const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/proxy', async (req, res) => {
  const { url, data } = req.body;

  // Validate the URL to ensure it points to boomlings.com
  if (!/^https?:\/\/www\.boomlings\.com\//.test(url)) {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  try {
    const response = await axios.post(url, data, {
      headers: {
        'User-Agent': '', // Set User-Agent to blank
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error occurred:', error.message, error.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Proxy server running on port ${port}`);
});
