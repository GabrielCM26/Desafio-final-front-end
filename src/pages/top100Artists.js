import Link from 'next/link';
import { useRouter } from 'next/router'
import { obterTopArtistas, obterTopArtistas1, obterTopArtistas6, obterTopArtistas4 } from '../utils/dataProcessing';
import { PiMicrophoneStageFill } from "react-icons/pi";
import { MdVerified } from "react-icons/md";
import { FaUser } from "react-icons/fa";

export default function Top100() {
  const topArtistas = obterTopArtistas(100);
  const router = useRouter()

  return (
    <div className="max-w-[440px] mx-auto pt-9 px-5">
        <h1 className="flex gap-4 text-left text-2xl font-bold mb-10">
          <span className="text-[#1DB954]"><PiMicrophoneStageFill /></span>
          Your Top 100 Artists
        </h1>
        <div className="">
          <div style={{borderRadius: "10px 10px 0px 0px"}} className="flex max-w-[440px] bg-[#212121] to-100% pt-3 pb-3 rounded-[10px] place-content-evenly">
            <button onClick="" type="button" className="text-xs">4 weeks</button>
            <button onClick="" type="button" className="text-xs">6 months</button>
            <button onClick="" type="button" className="text-xs">1 year</button>
            <button onClick="" type="button" className="text-xs">All time</button>
          </div>
        </div>
      <ol className="text-sm">
        {topArtistas.map((item, idx) => (
          <li key={idx} className="relative bg-linear-to-r from-[#212121] from-50% to-[#121212] to-100% pl-4 p-3 py-4 rounded-[10px] mb-5 first:bg-[url(/img/artist_icon_top_100.jpg)] first:max-w-[440px] first:rounded-t-[0px] first:pt-[85%] first:bg-cover first:text-lg first:text-shadow-[0_0px_4px_rgb(0_0_0)]">
            <Link href="/artistProfile" className="flex gap-3 space-between relative">
              <p className="pt-2">#{idx + 1}</p>
              <div className="bg-[#121212] text-[#B3B3B3] rounded-full p-2.5 mt-0.5"><FaUser /></div>
              <span className="pt-2">{item.artista}</span>
              <div className="text-[#0D99FF] pt-3
              "><MdVerified /></div>
              <span className="absolute pt-[11px] text-[#B3B3B3] text-[12px] right-5">{item.plays} plays</span>
            </Link>
          </li>
        ))}
      </ol>

    </div>
  );
}