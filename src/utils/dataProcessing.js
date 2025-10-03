import dadosHistory from "../data/history.json"

// //======================= home page =================================

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

//Função para ver quantas músicas diferentes já foram ouvidas no total
export function musicasDiferentesOuvidasTotal() {
  if (!dadosHistory || dadosHistory.length === 0) {
    return [];
  }

  const musicasDiferentes = new Set();

  dadosHistory.forEach(musica => {
    const nome = musica.master_metadata_track_name;
    const artista = musica.master_metadata_album_artist_name;
    if (nome && artista) {
      const chave = `${nome}|||${artista}`;
      musicasDiferentes.add(chave);
    }
  });

  return musicasDiferentes.size;
}

//função para mostrar a hora em que mais ouve spotify
export function horaMaisOuvida() {
  if (!dadosHistory || dadosHistory.length === 0) {
    return [];
  }

  const ocorrenciaIntervaloDeHoras = dadosHistory.reduce((acc, item) => {
    const data = new Date(item.ts);
    const horasTimestamp = data.getHours();
    const chave = `${horasTimestamp}h-${horasTimestamp}h59`;
    acc[chave] = (acc[chave] || 0) + 1;

    return acc;
  }, {});

  const max = Object.entries(ocorrenciaIntervaloDeHoras).sort((a, b) => b[1] - a[1])[0][0];

  return max;
}

//encontra a estação do ano que mais ouve spotify
export function estacaoMaisOuvida() {
  if (!dadosHistory || dadosHistory.length === 0) {
    return "Nenhuma estação encontrada";
  }

  function getEstacao(date) {
    const dia = date.getDate();
    const mes = date.getMonth() + 1;

    if (
      (mes === 3 && dia >= 21) || (mes > 3 && mes < 6) ||
      (mes === 6 && dia <= 20)
    ) return "Primavera";
    if (
      (mes === 6 && dia >= 21) || (mes > 6 && mes < 9) ||
      (mes === 9 && dia <= 22)
    ) return "Verão";
    if (
      (mes === 9 && dia >= 23) || (mes > 9 && mes < 12) ||
      (mes === 12 && dia <= 20)
    ) return "Outono";
    //O que sobrar é inverno
    return "Inverno";
  }

  const tempoPorEstacao = {};

  dadosHistory.forEach(item => {
    const date = new Date(item.ts);
    const estacao = getEstacao(date);
    const ms = item.ms_played || 0;
    tempoPorEstacao[estacao] = (tempoPorEstacao[estacao] || 0) + ms;
  });

  const maisOuvida = Object.entries(tempoPorEstacao)
    .sort((a, b) => b[1] - a[1])[0][0];

  return maisOuvida;
}

// //======================= top 100 Músicas =================================

//Função para lista top100 músicas
export function obterTopMusicas(limit = 100) {
  if (!dadosHistory || dadosHistory.length === 0) {
    return [];
  }

  const tempoPorMusica = {};

  dadosHistory.forEach(musica => {
    const nome = musica.master_metadata_track_name;
    const artista = musica.master_metadata_album_artist_name;
    const ms = musica.ms_played || 0;

    if (nome && artista) {
      const chave = `${nome}|||${artista}`;
      if (!tempoPorMusica[chave]) {
        tempoPorMusica[chave] = { nome, artista, msTotal: 0 };
      }
      tempoPorMusica[chave].msTotal += ms;
    }
  });

  return Object.values(tempoPorMusica)
    .sort((a, b) => b.msTotal - a.msTotal)
    .slice(0, limit);
}

export function obterTopMusicas6(limit = 100) {
  if (!dadosHistory || dadosHistory.length === 0) {
    return [];
  }

  // Encontra a data mais recente no histórico
  const mostRecent = dadosHistory.reduce((max, item) => {
    const date = new Date(item.ts);
    return date > max ? date : max;
  }, new Date(dadosHistory[0].ts));

  // Calcula a data de corte (6 meses antes da mais recente)
  const cutoff = new Date(mostRecent);
  cutoff.setMonth(cutoff.getMonth() - 6);

  // Filtra o histórico para os últimos 6 meses
  const filteredHistory = dadosHistory.filter(item => {
    const date = new Date(item.ts);
    return date >= cutoff && date <= mostRecent;
  });

  const tempoPorMusica = {};

  filteredHistory.forEach(musica => {
    const nome = musica.master_metadata_track_name;
    const artista = musica.master_metadata_album_artist_name;
    const ms = musica.ms_played || 0;

    if (nome && artista) {
      const chave = `${nome}|||${artista}`;
      if (!tempoPorMusica[chave]) {
        tempoPorMusica[chave] = { nome, artista, msTotal: 0 };
      }
      tempoPorMusica[chave].msTotal += ms;
    }
  });

  return Object.values(tempoPorMusica)
    .sort((a, b) => b.msTotal - a.msTotal)
    .slice(0, limit);
}

export function obterTopMusicas1(limit = 100) {
  if (!dadosHistory || dadosHistory.length === 0) {
    return [];
  }

  // Encontra a data mais recente no histórico
  const mostRecent = dadosHistory.reduce((max, item) => {
    const date = new Date(item.ts);
    return date > max ? date : max;
  }, new Date(dadosHistory[0].ts));

  // Calcula a data de corte (1 ano antes da mais recente)
  const cutoff = new Date(mostRecent);
  cutoff.setMonth(cutoff.getMonth() - 12);

  // Filtra o histórico para o ultimo ano
  const filteredHistory = dadosHistory.filter(item => {
    const date = new Date(item.ts);
    return date >= cutoff && date <= mostRecent;
  });

  const tempoPorMusica = {};

  filteredHistory.forEach(musica => {
    const nome = musica.master_metadata_track_name;
    const artista = musica.master_metadata_album_artist_name;
    const ms = musica.ms_played || 0;

    if (nome && artista) {
      const chave = `${nome}|||${artista}`;
      if (!tempoPorMusica[chave]) {
        tempoPorMusica[chave] = { nome, artista, msTotal: 0 };
      }
      tempoPorMusica[chave].msTotal += ms;
    }
  });

  return Object.values(tempoPorMusica)
    .sort((a, b) => b.msTotal - a.msTotal)
    .slice(0, limit);
}

export function obterTopMusicas4(limit = 100) {
  if (!dadosHistory || dadosHistory.length === 0) {
    return [];
  }

  // Encontra a data mais recente no histórico
  const mostRecent = dadosHistory.reduce((max, item) => {
    const date = new Date(item.ts);
    return date > max ? date : max;
  }, new Date(dadosHistory[0].ts));

  // Calcula a data de corte (28 dias antes da mais recente)
  const cutoff = new Date(mostRecent);
  cutoff.setDate(cutoff.getDate() - 28);

  // Filtra o histórico para as últimas 4 semanas
  const filteredHistory = dadosHistory.filter(item => {
    const date = new Date(item.ts);
    return date >= cutoff && date <= mostRecent;
  });

  const tempoPorMusica = {};

  filteredHistory.forEach(musica => {
    const nome = musica.master_metadata_track_name;
    const artista = musica.master_metadata_album_artist_name;
    const ms = musica.ms_played || 0;

    if (nome && artista) {
      const chave = `${nome}|||${artista}`;
      if (!tempoPorMusica[chave]) {
        tempoPorMusica[chave] = { nome, artista, msTotal: 0 };
      }
      tempoPorMusica[chave].msTotal += ms;
    }
  });

  return Object.values(tempoPorMusica)
    .sort((a, b) => b.msTotal - a.msTotal)
    .slice(0, limit);
}

// //======================= top 100 artistas =================================

//Função para fazer a lista dos top 100 artistas
export function obterTopArtistas(limit = 100) {
  if (!dadosHistory || dadosHistory.length === 0) {
    return [];
  }

  const playsPorArtista = {};

  dadosHistory.forEach(musica => {
    const artista = musica.master_metadata_album_artist_name;

    if (artista) {
      playsPorArtista[artista] = (playsPorArtista[artista] || 0) + 1;
    }
  });

  return Object.entries(playsPorArtista)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([artista, plays]) => ({ artista, plays }));
}

export function obterTopArtistas1(limit = 100) {
  if (!dadosHistory || dadosHistory.length === 0) {
    return [];
  }

  // Encontra a data mais recente no histórico
  const mostRecent = dadosHistory.reduce((max, item) => {
    const date = new Date(item.ts);
    return date > max ? date : max;
  }, new Date(dadosHistory[0].ts));

  // Calcula a data de corte (1 ano antes da mais recente)
  const cutoff = new Date(mostRecent);
  cutoff.setMonth(cutoff.getMonth() - 12);

  // Filtra o histórico para os últimos 1 ano
  const filteredHistory = dadosHistory.filter(item => {
    const date = new Date(item.ts);
    return date >= cutoff && date <= mostRecent;
  });

  const playsPorArtista = {};

  filteredHistory.forEach(musica => {
    const artista = musica.master_metadata_album_artist_name;
    if (artista) {
      playsPorArtista[artista] = (playsPorArtista[artista] || 0) + 1;
    }
  });

  return Object.entries(playsPorArtista)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([artista, plays]) => ({ artista, plays }));
}
export function obterTopArtistas6(limit = 100) {
  if (!dadosHistory || dadosHistory.length === 0) {
    return [];
  }

  // Encontra a data mais recente no histórico
  const mostRecent = dadosHistory.reduce((max, item) => {
    const date = new Date(item.ts);
    return date > max ? date : max;
  }, new Date(dadosHistory[0].ts));

  // Calcula a data de corte (6 meses antes da mais recente)
  const cutoff = new Date(mostRecent);
  cutoff.setMonth(cutoff.getMonth() - 6);

  // Filtra o histórico para os últimos 6 meses
  const filteredHistory = dadosHistory.filter(item => {
    const date = new Date(item.ts);
    return date >= cutoff && date <= mostRecent;
  });

  const playsPorArtista = {};

  filteredHistory.forEach(musica => {
    const artista = musica.master_metadata_album_artist_name;
    if (artista) {
      playsPorArtista[artista] = (playsPorArtista[artista] || 0) + 1;
    }
  });

  return Object.entries(playsPorArtista)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([artista, plays]) => ({ artista, plays }));
}

export function obterTopArtistas4(limit = 100) {
  if (!dadosHistory || dadosHistory.length === 0) {
    return [];
  }

  // Encontra a data mais recente no histórico
  const mostRecent = dadosHistory.reduce((max, item) => {
    const date = new Date(item.ts);
    return date > max ? date : max;
  }, new Date(dadosHistory[0].ts));

  // Calcula a data de corte (6 meses antes da mais recente)
  const cutoff = new Date(mostRecent);
  cutoff.setDate(cutoff.getDate() - 28);

  // Filtra o histórico para os últimos 6 meses
  const filteredHistory = dadosHistory.filter(item => {
    const date = new Date(item.ts);
    return date >= cutoff && date <= mostRecent;
  });

  const playsPorArtista = {};

  filteredHistory.forEach(musica => {
    const artista = musica.master_metadata_album_artist_name;
    if (artista) {
      playsPorArtista[artista] = (playsPorArtista[artista] || 0) + 1;
    }
  });

  return Object.entries(playsPorArtista)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([artista, plays]) => ({ artista, plays }));
}

// //======================= Perfil de Artista =================================

//Função para ver quantas plays de um artista específico
export function PlaysArtista(nomeArtista) {
  if (!dadosHistory || dadosHistory.length === 0) {
    return 0;
  }

  const totalPlays = dadosHistory.length;
  const playsArtista = dadosHistory.filter(
    musica => musica.master_metadata_album_artist_name === nomeArtista
  ).length;

  if (totalPlays === 0) return 0;

  return ((playsArtista / totalPlays) * 100).toFixed(2);
}

//conta quantos minutos ouviu de um artista
export function minutosArtista(nomeArtista) {
  if (!dadosHistory || dadosHistory.length === 0) {
    return 0;
  }

  const msTotal = dadosHistory
    .filter(musica => musica.master_metadata_album_artist_name === nomeArtista)
    .reduce((acc, musica) => acc + (musica.ms_played || 0), 0);

  return Math.floor(msTotal / 60000); // minutos
}

//conta quantas músicas diferentes ouviu de um artista
export function quantidadeMusicasArtista(nomeArtista) {
  if (!dadosHistory || dadosHistory.length === 0) {
    return 0;
  }

  const musicas = dadosHistory
    .filter(musica => musica.master_metadata_album_artist_name === nomeArtista && musica.master_metadata_track_name)
    .map(musica => musica.master_metadata_track_name);

  
  const musicasUnicas = new Set(musicas);

  return musicasUnicas.size;
}

export function totalPlaysArtista(nomeArtista) {
  if (!dadosHistory || dadosHistory.length === 0) {
    return 0;
  }
  return dadosHistory.filter(
    musica => musica.master_metadata_album_artist_name === nomeArtista
  ).length;
}
