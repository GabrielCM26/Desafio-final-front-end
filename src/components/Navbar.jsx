import Link from 'next/link'
import { useRouter } from 'next/router'
import { FaUser } from "react-icons/fa";
import { PiMicrophoneStageFill } from "react-icons/pi";
import { IoMdMusicalNote } from "react-icons/io";
import { FaMagnifyingGlass } from "react-icons/fa6";

export default function Navbar() {
  const router = useRouter()
  const isActive = (path) => router.pathname === path

  return (
    <nav className="bg-black text-white p-3 fixed bottom-0 left-0 right-0 w-full flex justify-center pb-safe">
      <div className="flex justify-center w-full">
        <div className="flex items-center justify-between max-w-[428px] w-full px-6">
          {/* Homepage/Perfil de Utilizador */}
          <Link href="/" className={isActive('/') ? 'text-[#1DB954] p-2 text-2xl' : 'p-2 text-2xl'}>
            <FaUser />
          </Link>

          {/* Top 100 Artistas */}
          <Link href="/top100Artists" className={isActive('/top100Artists') ? 'text-[#1DB954] p-2 text-2xl' : 'p-2 text-2xl'}>
            <PiMicrophoneStageFill />
          </Link>

          {/* Top 100 Músicas */}
          <Link href="/top100Songs" className={isActive('/top100Songs') ? 'text-[#1DB954] p-2 text-2xl' : 'p-2 text-2xl'}>
            <IoMdMusicalNote />
          </Link>
    
        </div>
      </div>
    </nav>
  )
}
