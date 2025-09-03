import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';

export default function ServerPage() {
  const [guild, setGuild] = useState(null);

  useEffect(() => {
    const id = window.location.pathname.split('/').pop();
    fetch(`http://localhost:4000/api/guild/${id}?token=ACCESS_TOKEN`)
      .then(res => res.json())
      .then(data => setGuild(data));
  }, []);

  if (!guild) return <p>Chargement...</p>;

  return (
    <Layout title={guild.name}>
      <main style={{ padding: '2rem' }}>
        <h1>{guild.name}</h1>
        <img src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`} height="100" />
        <p>ID : {guild.id}</p>
        <p>Membres : {guild.memberCount}</p>
      </main>
    </Layout>
  );
}
