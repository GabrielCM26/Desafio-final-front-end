import Link from 'next/link';
import { useRouter } from 'next/router'
import { obterTopArtistas } from '../utils/dataProcessing';
import { PiMicrophoneStageFill } from "react-icons/pi";

export default function Top100() {
  const topArtistas = obterTopArtistas(100);
  const router = useRouter()
  const isActive = (path) => router.pathname === path

  return (
    <div className="max-w-[440px] mx-auto pt-9 px-5">
      <div>
        <h1 className="flex gap-4 text-left text-2xl font-bold mb-10">
          <span className="text-[#1DB954]"><PiMicrophoneStageFill /></span>
          Your Top 100 Artists
        </h1>
        <div className="">
          <div style={{borderRadius: "10px 10px 0px 0px"}} className="flex max-w-[440px] bg-[#212121] to-100% pt-3 pb-3 rounded-[10px] place-content-evenly">
            <button className="text-xs">4 weeks</button>
            <button className="text-xs">6 months</button>
            <button className="text-xs">1 year</button>
            <button className="text-xs">All time</button>
          </div>
        </div>
      </div>
      <ol className="text-sm list-decimal list-inside">
        {topArtistas.map((item, idx) => (
          <li key={idx} className="bg-linear-to-r from-[#212121] from-50% to-[#121212] to-100% p-3 rounded-[10px] mb-3 first:bg-[url(/img/artist_icon_top_100.jpg)] first:max-w-[440px] first:rounded-t-[0px] first:pt-[70%] first:bg-cover">
            <Link href="/artistProfile" className="flex gap-3 space-between relative">
              <img className="rounded-full" src="../img/artist_icon_top_100_s.png" />
              <span className="pt-1">{item.artista}</span>
              <span className="pt-[7px] text-base text-[#B3B3B3] right-[20px] text-[12px] absolute"> {item.plays} plays</span>
            </Link>
          </li>
        ))}
      </ol>

    </div>
  );
}