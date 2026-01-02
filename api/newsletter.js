/**
 * Serverless Function - Newsletter Subscription Proxy
 *
 * Ten endpoint działa jako proxy między frontendem a API Mailist,
 * chroniąc klucz API przed eksponowaniem w przeglądarce.
 *
 * Działa z Vercel, Netlify lub innymi platformami serverless.
 */

export default async function handler(req, res) {
    // Tylko POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*'); // W produkcji zmień na swoją domenę
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        const { email } = req.body;

        // Walidacja
        if (!email || !email.includes('@')) {
            return res.status(400).json({
                error: 'Invalid email address'
            });
        }

        // Klucz API z zmiennej środowiskowej (bezpieczne)
        const apiKey = process.env.MAILIST_API_KEY;

        if (!apiKey) {
            console.error('MAILIST_API_KEY not configured');
            return res.status(500).json({
                error: 'Server configuration error'
            });
        }

        // Wywołanie API Mailist
        const response = await fetch('https://api.mailist.pl/api/v1/contacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': apiKey
            },
            body: JSON.stringify({
                email: email,
                list_name: 'Mailist - Newsletter'
            })
        });

        const data = await response.json();

        if (!response.ok) {
            // Zwróć błąd z API
            return res.status(response.status).json(data);
        }

        // Sukces
        return res.status(200).json(data);

    } catch (error) {
        console.error('Newsletter subscription error:', error);
        return res.status(500).json({
            error: 'Internal server error',
            message: error.message
        });
    }
}
