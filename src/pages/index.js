import { contarTotalMusicas, obterPrimeiraMusica, encontrarArtistaMaisOuvido, tempoMedioDiario, minutosOuvidosTotal, horaMaisOuvida, } from '@/utils/dataProcessing'

export default function Home() {

  return (
    <div className="">
      <div className="">
        <div className="space-y-6">
          <div className="bg-gradient-to-b from-green-500 to-black-600 text-white rounded-lg shadow-lg p-8 text-center">
            <div class="profile">
              <div class="profile">

                <div class="profile-img">

                  <svg height="40" width="40" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0h24v24H0z" fill="none"></path>
                    <path fill="white" d="M4.828 21l-.02.02-.021-.02H2.992A.993.993 0 0 1 2 20.007V3.993A1 1 0 0 1 2.992 3h18.016c.548 0 .992.445.992.993v16.014a1 1 0 0 1-.992.993H4.828zM20 15V5H4v14L14 9l6 6zm0 2.828l-6-6L6.828 19H20v-1.172zM8 11a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"></path>
                  </svg>


                  <button class="edit-btn" title="Editar perfil">
                    <svg xmlns="http://www.w3.org/2000/svg" height="14" width="14" fill="white" viewBox="0 0 24 24">
                      <path d="M3 17.25V21h3.75l11.06-11.06-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 
                    0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 
                    3.75 3.75 1.83-1.83z"/>
                    </svg>
                  </button>
                </div>

              </div>
              <span class="profile-heading">João Lourenço</span>
            </div>
          </div>
          {/*aquiiiiiiiii joao */}
          <div className="cards-container">
            {/* Linha 1 card */}
            <div className="cards-row">
              <div className="card1">
                <div className="card-details">
                  <p className="text-title">126,347</p>
                  <p className="text-body">Total Plays</p>
                </div>
              </div>
            </div>

            {/* Linha 2 cards*/}
            <div className="cards-row">
              <div className="card">
                <div className="card-details">
                  <p className="text-title">547,128</p>
                  <p className="text-body">Total Minutes</p>
                </div>
              </div>
              <div className="card">
                <div className="card-details">
                  <p className="text-title">1,320</p>
                  <p className="text-body">Different Tracks</p>
                </div>
              </div>
            </div>
          </div>
          {/* e acaba aquii joao  */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">📊 Alguns dados:</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600">{contarTotalMusicas()}</div>
                <div className="text-gray-700">Total de reproduções</div>
              </div>

              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-lg font-semibold text-purple-600 truncate">{encontrarArtistaMaisOuvido()}</div>
                <div className="text-gray-700">Artista mais ouvido</div>
              </div>

              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-lg font-semibold text-yellow-600 truncate">{tempoMedioDiario().horas}h {tempoMedioDiario().minutos}m</div>
                <div className="text-gray-700">Tempo Médio Diário</div>
              </div>

              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-lg font-semibold text-yellow-600 truncate">{minutosOuvidosTotal()}</div>
                <div className="text-gray-700">Minutos de música ouvidos</div>
              </div>

              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-lg font-semibold text-yellow-600 truncate">{horaMaisOuvida()}</div>
                <div className="text-gray-700">Intervalo do dia mais ouvido</div>
              </div>
            </div>





          </div>

        </div>

      </div>

    </div>
  )
}