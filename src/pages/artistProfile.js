export default function PerfilArtista() {
  return (
    <div className="bg-white rounded-lg shadow-md">
 
      <figure className="relative max-w-sm transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0">
        <a href="#">
          <img class="rounded-lg" src="./img/kendrick.png" alt="Kendrick Lamar" />
        </a>
        <figcaption class="absolute px-4 text-lg text-white bottom-6">
          <p>KENDRICK LAMAR</p>
        </figcaption>
      </figure>

    </div>

  )
}