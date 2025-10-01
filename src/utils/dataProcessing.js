import dadosHistory from "../data/history.json"

//Função para ver quantas plays no total
export function contarTotalMusicas() {
  if (!dadosHistory || dadosHistory.length === 0) {
    return 0;
  }
  return dadosHistory.length;
}

//Função para minutos ouvidos no total
export function minutosOuvidosTotal() {
  if (!dadosHistory || dadosHistory.length === 0) {
    return 0;
  }
  const somaMs = dadosHistory.reduce((acc, item) => acc + item.ms_played, 0);
  const msParaMinutos = Math.floor(somaMs / 60000);

  return msParaMinutos;
}

export function obterPrimeiraMusica() {
  if (!dadosHistory || dadosHistory.length === 0) {
    return "Nenhuma música encontrada";
  }
  return dadosHistory[0]?.master_metadata_track_name || "Música desconhecida";
}


export function encontrarArtistaMaisOuvido() {
  if (!dadosHistory || dadosHistory.length === 0) {
    return "Nenhum artista encontrado";
  }
  const contagemArtistas = {};
  
  dadosHistory.forEach(musica => {
    const artista = musica.master_metadata_album_artist_name;
    if (artista) {
      contagemArtistas[artista] = (contagemArtistas[artista] || 0) + 1;
    }
  });

  let artistaMaisOuvido = "Nenhum artista encontrado";
  let maiorContagem = 0;
  
  for (const artista in contagemArtistas) {
    if (contagemArtistas[artista] > maiorContagem) {
      maiorContagem = contagemArtistas[artista];
      artistaMaisOuvido = artista;
    }
  }

  return artistaMaisOuvido;
}

//Função para lista top100 músicas
export function obterTopMusicas(limit = 100) {
  if (!dadosHistory || dadosHistory.length === 0) {
    return [];
  }
  const contagemMusicas = {};

  dadosHistory.forEach(musica => {
    const nome = musica.master_metadata_track_name;
    const artista = musica.master_metadata_album_artist_name;
    if (nome && artista) {
      const chave = `${nome}|||${artista}`; // Composite key
      contagemMusicas[chave] = (contagemMusicas[chave] || 0) + 1;
    }
  });

  return Object.entries(contagemMusicas)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([chave, contagem]) => {
      const [nome, artista] = chave.split('|||');
      return { nome, artista, contagem };
    });
}

//Função para média de tempo diário a ouvir
export function tempoMedioDiario() {

  const porDia = dadosHistory.reduce((acc, item) => {
    const dia = item.ts.split("T")[0]; 
    acc[dia] = (acc[dia] || 0) + item.ms_played;
    return acc;
  }, {});

  const tempos = Object.values(porDia);

  if (tempos.length === 0) return { mediaMs: 0, horas: 0, minutos: 0 };

 
  const mediaMs = tempos.reduce((a, b) => a + b, 0) / tempos.length;

  const horas = Math.floor(mediaMs / (1000 * 60 * 60));
  const minutos = Math.floor((mediaMs % (1000 * 60 * 60)) / (1000 * 60));

  return { mediaMs, horas, minutos };
}