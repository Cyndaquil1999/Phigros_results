"use client";

import { useEffect, useState } from "react";

type Music = {
  id: number;
  name: string;
  composer: string;
  difficulty: {
    id: number;
    name: string;
  };
  noteConstant: number;
};

export default function Home() {
  const [music, setMusic] = useState<Music[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/music");
      const data = await response.json();
      console.log(data);
      setMusic(data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Music List</h1>
      <ul>
        {music.map((track) => (
          <li key={track.id}>
            {track.name}: 難易度 {track.difficulty.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
