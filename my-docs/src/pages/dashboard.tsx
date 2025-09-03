import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';

export default function Dashboard() {
  const [guilds, setGuilds] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/guilds?token=ACCESS_TOKEN')
      .then(res => res.json())
      .then(data => setGuilds(data));
  }, []);

  return (
    <Layout title="Dashboard">
      <main style={{ padding: '2rem' }}>
        <h1>Choisis un serveur</h1>
        <ul>
          {guilds.map(g => (
            <li key={g.id}>
              <a href={`/dashboard/${g.id}`}>
                <img src={`https://cdn.discordapp.com/icons/${g.id}/${g.icon}.png`} height="32" />
                {g.name}
              </a>
            </li>
          ))}
        </ul>
      </main>
    </Layout>
  );
}
