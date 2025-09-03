const express = require('express');
const axios = require('axios');
const { request } = require('undici');
const { access } = require('fs');
const app = express();
require('dotenv').config({ path: '.env.local' });

app.listen(4000, () => console.log('Serveur d’auth lancé sur http://localhost:4000'));
app.get('/', (req, res) => {
  res.send('<h1>Serveur d’auth Discord opérationnel ✅</h1><p>Tu peux te connecter via <a href="/connect-discord">ce lien</a>.</p>');
});

app.get('/callback', async (req, res) => {

  const code = req.query.code;
  if (!code) return res.status(400).send('Code manquant');

  try {
    // Échange du code contre un token
    /*const tokenRes = await request('https://discord.com/api/oauth2/token', {
			method: 'POST',
			body: new URLSearchParams({
				client_id: process.env.CLIENT_ID,
				client_secret: process.env.DISCORD_TOKEN,
				code,
				grant_type: 'authorization_code',
				redirect_uri: process.env.DISCORD_REDIRECT_URI,
				scope: 'identify',
			}).toString(),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		});
    const body = await tokenRes.body.json()
    console.log(body)
    const accessToken = body.access_token;*/
    const accessToken = 'MTQxMTc3NTg1MDg2NDQ0MzQwMg.00Bk8g5124IqEcQ1JRShzPkFlW2zbZ';

    console.log(accessToken, ' | ', req.query.token)
    // Page HTML stylée
    app.get('/api/user', async (req, res) => {
      console.log(2)
      // récupère access_token depuis session ou query
      //const accessToken = req.query.token;
      const userRes = await axios.get('https://discord.com/api/users/@me', {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      res.json(userRes.data);
    });

  } catch (err) {
    console.error('Erreur OAuth Discord :', err.response?.data || err.message);
    res.status(500).send('Erreur lors de l’authentification Discord');
  }
});
