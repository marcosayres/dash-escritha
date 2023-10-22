// Obtém a data atual
const dataAtual = new Date();
let totalCadastrosDoDia = 0;

// Verifica se as datas de cadastro correspondem à data de hoje
for (let chave in objetoDatas) {
  const dataFornecidaObjeto = objetoDatas[chave];
  const saoDoMesmoDia =
    dataAtual.getFullYear() === dataFornecidaObjeto.getFullYear() &&
    dataAtual.getMonth() === dataFornecidaObjeto.getMonth() &&
    dataAtual.getDate() === dataFornecidaObjeto.getDate();

  // Se as datas de cadastro forem do mesmo dia, aumenta a contagem
  if (saoDoMesmoDia) {
    totalCadastrosDoDia++;
  }
}
