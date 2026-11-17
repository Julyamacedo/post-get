const resposta = document.querySelector("#resposta");
const lista = document.querySelector("#lista-herois");
const modelo = document.querySelector("#modelo-heroi");

const apiKey = "cv_9MfBXKd0jeOgXY4rPOTHZkp9XTC6aitYrMN0gYazyBZKP0pfI07djQQQAH7uH8ZK";
const apiUrl = "https://api-ds.codeverse.dev.br/api/atletas";

async function buscarAtletas() {
  if (!lista || !modelo) {
    return;
  }

  resposta.textContent = "Carregando heróis...";

  try {
    const retorno = await fetch(apiUrl, {
      method: "GET",
      headers: { "x-api-key": apiKey },
    });

    if (!retorno.ok) {
      throw new Error("Não foi possível buscar os heróis.");
    }

    const resultado = await retorno.json();
    const itens = Array.isArray(resultado) ? resultado : resultado.data || [];

    lista.innerHTML = "";

    for (const heroi of itens) {
      const card = modelo.content.cloneNode(true);

      const nome = heroi.title ?? heroi.nome ?? "Herói sem nome";
      const poder = heroi.poder ?? heroi.esporte ?? "Não informado";
      const universo = heroi.universo ?? heroi.pais ?? "Não informado";
      const fraqueza = heroi.fraqueza ?? heroi.conquistas ?? "Não informado";

      card.querySelector(".nome").textContent = nome;
      card.querySelector(".poder").textContent = poder;
      card.querySelector(".universo").textContent = universo;
      card.querySelector(".fraqueza").textContent = fraqueza;

      const imagem = card.querySelector("img");
      const imagemUrl = heroi.imageUrl ?? heroi.imagem ?? "";

      if (imagemUrl) {
        imagem.src = imagemUrl;
        imagem.alt = nome;
      } else {
        imagem.remove();
      }

      lista.appendChild(card);
    }

    resposta.textContent = itens.length ? "" : "Nenhum herói cadastrado ainda.";
  } catch (error) {
    resposta.textContent = "Não foi possível carregar os heróis. Tente novamente!";
    console.error(error);
  }
}

buscarAtletas();