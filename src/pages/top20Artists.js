import Link from 'next/link'
import { obterTop20MusicasArtista } from '../utils/dataProcessing';

export default function Estatisticas() {
  const top20 = obterTop20MusicasArtista("Kendrick Lamar", 20);

  return (
    <div className="bg-black min-h-screen">
      <div className="max-w-md mx-auto relative pb-24">
        <div className="relative w-full h-64 rounded-lg overflow-hidden">
          <figure className="relative w-full">
            <a href="#">
              <img className="rounded-lg w-full h-auto object-cover" src="./img/kendrick.png" alt="Kendrick Lamar" />
            </a>
            <Link href="/artistProfile">
              <img src="./img/cross-outline.png" alt="Seta para esquerda" className="absolute top-4 left-4 w-8 h-8 z-10" />
            </Link>
            <div className="absolute inset-0 bg-gradient-to-b from-green-600/80 to-transparent"></div>
            <figcaption className="absolute px-4 text-lg text-white bottom-3">
              <p className="text-5xl font-extrabold inline-flex items-center gap-2">TOP 20</p>
            </figcaption>
          </figure>
        </div>
        
        <ol className="text-sm">
        {top20.map((item, idx) => (
          <li key={idx} className="relative bg-linear-to-r from-[#212121] from-50% to-[#121212] to-100% pl-4 p-3 py-4 rounded-[10px] mb-5 first:bg-[url(/img/artist_icon_top_100.jpg)] first:max-w-[440px] first:rounded-t-[0px] first:pt-[85%] first:bg-cover first:text-lg first:text-shadow-[0_0px_4px_rgb(0_0_0)]">
            <div className="flex gap-3 space-between relative">
              <p className="pt-2">#{idx + 1}</p>
              <span className="pt-2">{item.nome}</span>
              <span className="absolute pt-[11px] text-[#B3B3B3] text-[12px] right-5">{Math.floor(item.msTotal / 60000)} min ouvidos</span>
            </div>
          </li>
        ))}
      </ol>
      </div>
    </div>
  )
}