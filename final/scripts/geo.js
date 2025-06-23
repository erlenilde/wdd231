const vendedorSelect = document.getElementById('vendedor-filter');
const container = document.getElementById('geo-distribution'); // ou geo-distribution se você manteve
const urlSales = 'data/vendas_formatado.json';
let salesData = [];

const populateVendedorFilter = (dados) => {
  const vendedores = [...new Set(dados.map(sale => sale.vendedor))].sort();
  vendedores.forEach(v => {
    const opt = document.createElement('option');
    opt.value = v;
    opt.textContent = v;
    vendedorSelect.appendChild(opt);
  });
};

const calcularCicloVenda = (dataCriacao, dataVenda) => {
  if (!dataCriacao || !dataVenda) return 0;
  const dtCriacao = new Date(dataCriacao);
  const dtVenda = new Date(dataVenda);
  const diffMs = dtVenda - dtCriacao;
  return diffMs / (1000 * 60 * 60 * 24);
};

const showDetailedSales = (dados) => {
  container.innerHTML = ""; 

  const vendidos = dados.filter(sale => sale.data_venda);

  if (vendidos.length === 0) {
    container.textContent = "Nenhuma venda encontrada.";
    return;
  }

  let somaFaturamento = 0;
  let somaCiclo = 0;

  const table = document.createElement('table');
  table.innerHTML = `
    <thead>
      <tr>
        <th>Cliente</th>
        <th>Faturamento</th>
        <th>Data da venda</th>
        <th>Ciclo de venda (dias)</th>
      </tr>
    </thead>
    <tbody>
    </tbody>
  `;

  vendidos.forEach(sale => {
    const ciclo = calcularCicloVenda(sale.data_criacao, sale.data_venda);
    somaFaturamento += sale.preco;
    somaCiclo += ciclo;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${sale.cliente}</td>
      <td>${sale.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
      <td>${sale.data_venda}</td>
      <td>${ciclo.toFixed(1)}</td>
    `;
    table.querySelector('tbody').appendChild(tr);
  });

  // Adiciona a linha de médias
  const mediaFaturamento = somaFaturamento / vendidos.length;
  const mediaCiclo = somaCiclo / vendidos.length;

  const resumo = document.createElement('tr');
  resumo.innerHTML = `
    <td><strong>Média</strong></td>
    <td><strong>${mediaFaturamento.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong></td>
    <td></td>
    <td><strong>${mediaCiclo.toFixed(1)}</strong></td>
  `;
  table.querySelector('tbody').appendChild(resumo);

  container.appendChild(table);
};

const getNumbers = async () => {
  try {
    const response = await fetch(urlSales);
    const data = await response.json();
    salesData = data;
    populateVendedorFilter(salesData);
    showDetailedSales(salesData);
  } catch (err) {
    console.error("Erro ao carregar dados: ", err);
    container.textContent = "Erro ao carregar dados.";
  }
};

vendedorSelect.addEventListener('change', () => {
  const selected = vendedorSelect.value;
  const filtered = selected === 'all' ? salesData : salesData.filter(sale => sale.vendedor === selected);
  showDetailedSales(filtered);
});

getNumbers();
