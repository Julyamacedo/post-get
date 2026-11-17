const form = document.querySelector("#form-heroi");
const resposta = document.querySelector("#resposta");

const apiKey = "cv_9MfBXKd0jeOgXY4rPOTHZkp9XTC6aitYrMN0gYazyBZKP0pfI07djQQQAH7uH8ZK";
const apiUrl = "https://api-ds.codeverse.dev.br/api/atletas";

if (form) {
  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const dados = new FormData(form);
    const heroi = {
      title: dados.get("title"),
      poder: dados.get("poder"),
      universo: dados.get("universo"),
      fraqueza: dados.get("fraqueza"),
      imageUrl: dados.get("imageUrl") || null,
    };

    resposta.textContent = "Enviando herói para a API...";

    try {
      const respostaApi = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
        body: JSON.stringify(heroi),
      });

      const texto = await respostaApi.text();
      let resultado = {};

      try {
        resultado = texto ? JSON.parse(texto) : {};
      } catch (error) {
        resultado = { title: heroi.title };
      }

      if (respostaApi.ok) {
        resposta.textContent = `${resultado.title || heroi.title} foi cadastrado com sucesso.`;
        form.reset();
        return;
      }

      resposta.textContent = resultado.message || "Não foi possível cadastrar o herói.";
    } catch (error) {
      console.error(error);
      resposta.textContent = "Não foi possível cadastrar o herói. Tente novamente.";
    }
  });
}
