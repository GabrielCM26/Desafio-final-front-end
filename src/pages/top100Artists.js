import Link from 'next/link';
import { obterTopArtistas } from '../utils/dataProcessing';

export default function Top100() {
  const topArtistas = obterTopArtistas(100);

  return (
    <div className="max-w-[600px] mx-auto my-10 p-6 bg-[#f9f9f9] rounded-xl shadow-md">
      <h1 className="text-center text-4xl font-bold text-[#2a3a5e] mb-8 tracking-wide shadow-[0_2px_8px_rgba(42,58,94,0.15)]">
        🎵 Top 100 Artistas Mais Ouvidos 🎵
      </h1>
      <ol className="pl-6 text-lg">
        {topArtistas.map((item, idx) => (
          <li key={idx}>
            <span className="text-[#222] font-bold">{item.artista}</span>
            <span className="text-[#888] ml-2"> — {item.plays} vezes</span>
          </li>
        ))}
      </ol>
    </div>
  );
}