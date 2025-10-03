import Link from 'next/link';
import { MdVerified } from "react-icons/md";
import { PlaysArtista } from '../utils/dataProcessing';


export default function PerfilArtista() {
  const porcentagem = PlaysArtista("Kendrick Lamar");

  return (
    <div className="bg-black min-h-screen">

      <div className="max-w-md mx-auto relative pb-24">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <figure className="relative w-full">
            <a href="#">
              <img className="rounded-lg w-full h-auto object-cover" src="./img/kendrick.png" alt="Kendrick Lamar" />
            </a>
            <Link href="/top100Artists">
              <img src="./img/arrow-to-left.png" alt="Seta para esquerda" className="absolute top-4 left-4 w-8 h-8" />
            </Link>
            <figcaption className="absolute px-4 text-lg text-white bottom-3">
              <p className="text-xs text-amber-300">☀️ artist</p>
              <p className="text-3xl font-bold inline-flex items-center gap-2">KENDRICK LAMAR<span className="text-[#0D99FF]"><MdVerified /></span></p>
              <p className="text-xs">TOP #6</p>
            </figcaption>
          </figure>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-linear-to-r from-[#212121] from-50% to-[#121212] to-100% rounded-[10px] p-6">
            <div className="flex flex-row gap-4 items-center">
              <img src="./img/botao_play_pag_artist.png" alt="Imagem botão play" className="w-14 h-14 mb-2" />
              <div className="flex flex-col items-center ">
                <p className="text-4xl font-bold tracking-wide">12,4K</p>
                <p className="text-xs text-gray-500 tracking-wide">nº de plays</p>
              </div>
            </div>
          </div>

          <div className="flex flex-row gap-4 mt-4">
            <div className="bg-linear-to-r from-[#212121] from-50% to-[#121212] to-100% rounded-[10px] p-6 px-13">
              <div className="flex flex-col items-center">
                <p className="text-4xl font-bold tracking-widest">30</p>
                <p className="text-xs text-gray-500 text-center tracking-wide">musics played</p>
              </div>
            </div>
            <div className="bg-linear-to-r from-[#212121] from-50% to-[#121212] to-100% rounded-[10px] p-6 flex flex-col items-center justify-center">
              <p className="text-3xl font-bold">{porcentagem}%</p>
              <p className="text-xs text-gray-500 text-center">das plays dentro do total</p>
            </div>
          </div>

          <div className="bg-linear-to-r from-[#212121] from-50% to-[#121212] to-100% rounded-[10px] p-6">
            <div className="flex flex-row gap-4 items-center">
              <img src="./img/icon-music-rhythm_pag_artist.png" alt="Ícone música" className="w-14 h-14 mb-2" />
              <div className="flex flex-col items-center">
                <p className="text-4xl font-bold">34,5K</p>
                <p className="text-xs text-gray-500">minutes played</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-green-700 text-white rounded-lg fixed bottom-14 left-0 right-0 p-2 mx-auto flex items-center justify-center max-w-sm w-[90%]">
          <Link href="/top20Artists" className="text-center text-2xl font-black">TOP 20</Link>
        </div>
      </div>

    </div>


  )
}
