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

    const body = await tokenRes.body.json()*/
    const accessToken = 'MTQxMTc3NTg1MDg2NDQ0MzQwMg.00Bk8g5124IqEcQ1JRShzPkFlW2zbZ';
    // Récupération des infos utilisateur
    const userRes = await axios.get('https://discord.com/api/users/@me', {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    const user = userRes.data;

    // Page HTML stylée
    res.send(`
      <html>
        <head>
          <title>Bienvenue ${user.username}</title>
          <style>
            body { font-family: sans-serif; text-align: center; padding: 2rem; background: #2c2f33; color: white; }
            img { border-radius: 50%; margin-top: 1rem; }
            .card { background: #23272a; padding: 2rem; border-radius: 12px; display: inline-block; }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>Bienvenue ${user.username}#${user.discriminator}</h1>
            <p><strong>ID :</strong> ${user.id}</p>
            <img src="https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png" height="100" />
          </div>
        </body>
      </html>
    `);
  } catch (err) {
    console.error('Erreur OAuth Discord :', err.response?.data || err.message);
    res.status(500).send('Erreur lors de l’authentification Discord');
  }
});
