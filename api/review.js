import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  try {
    const data = req.body;

    const GAS_URL = 'https://script.google.com/macros/s/AKfycbxS6G2hpt2Lsl4esplUzyPY3PsduRHoaKzW6vQyaKW0EPkxuaaXevG_SAy3EZtbUkSx/exec';

    const response = await fetch(GAS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      res.status(200).json({ message: 'Review submitted successfully!' });
    } else {
      const errorText = await response.text();
      res.status(500).json({ message: 'Error from Google Apps Script: ' + errorText });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
