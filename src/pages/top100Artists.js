// import { encontrarArtistaMaisOuvido } from '../utils/dataProcessing';

export default function Top100() {
  // const topArtistas = encontrarArtistaMaisOuvido(100);

  return (
    <div className="max-w-[440px] mx-auto my-10 p-6 rounded-xl shadow-md">
      <div>
        <h1 className="text-left text-2xl font-bold mb-8">
          Your Top 100 Artists
        </h1>
        <div className="flex flex-col bg-[#121212] rounded-[10px] mb-3 items-center">
          <div className="flex flex-row space-between text-center">
            <button className="bg-white/50 p-2 px-4">4 weeks</button>
            <button className="bg-white/50 p-2 px-4">6 months</button>
            <button className="bg-white/50 p-2 px-4">1 year</button>
            <button className="bg-white/50 p-2 px-4">All time</button>
          </div>
          <div className="flex size-93 bg-[url(/img/artist_icon_top_100.jpg)] rounded-[10px] bg-cover">
            <p>#1 Kendrick Lamar</p>
          </div>
        </div>
      </div>
      <ol className="text-lg">
        {/* Importar código abaixo */}
        {/* {topArtistas.map((perfil, idx) => ( */}
        {/* Põe "key={index}" dentro de <li>*/}
          <li className="bg-linear-to-r from-[#212121] from-50% to-[#121212] to-100% p-3 rounded-[10px] flex flex-row gap-3">
            <span className="font-bold pl-3 pt-1">#2</span>
            <img className="ml-2 rounded-full" src="../img/artist_icon_top_100_s.png" />
            <span className="pt-1">Placeholder</span>
          </li>
      </ol>
    </div>
  );
}