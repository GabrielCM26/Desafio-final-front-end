export default function PerfilArtista() {
  return (
    <div>
      <div className="bg-white rounded-lg shadow-md w-screen overflow-hidden">
        <figure className="relative w-screen">
          <a href="#">
            <img className="rounded-lg w-screen h-auto object-cover" src="./img/kendrick.png" alt="Kendrick Lamar" />
          </a>
          <figcaption className="absolute px-4 text-lg text-white bottom-3">
            <p className="text-xs text-amber-300">☀️ artist</p>
            <p className="text-4xl">KENDRICK LAMAR</p>
            <p className="text-xs">TOP #6</p>
          </figcaption>
        </figure>
      </div>

      <div className="p-8 space-y-6 justify-">
        <div className="bg-linear-to-r from-[#212121] from-50% to-[#121212] to-100% rounded-[10px] p-4">
          <div className="flex flex-row gap-4 items-center">
            <img src="./img/botao_play_pag_artist.png" alt="Imagem botão play" className="w-12 h-12 mb-2" />
            <div className="flex flex-col items-center">
              <p className="text-4xl">12,4K</p>
              <p className="text-xs">nº de plays</p>
            </div>
          </div>

        </div>

        <div className="flex flex-row gap-4 mt-4">
          <div className="bg-linear-to-r from-[#212121] from-50% to-[#121212] to-100% p-3 rounded-[10px]">nº de musicas played</div>
          <div className="bg-linear-to-r from-[#212121] from-50% to-[#121212] to-100% p-3 rounded-[10px]">% das plays dentro do total</div>
        </div>

        <div className="bg-linear-to-r from-[#212121] from-50% to-[#121212] to-100% p-3 rounded-[10px]">nº de plays</div>

        <div className="bg-green-700 text-white rounded-lg fixed bottom-14 left-0 right-0 p-2 mx-4 flex items-center justify-center">
          <p className="text-center text-2xl font-black">TOP 20</p>
        </div>
      </div>

    </div>

  )
}