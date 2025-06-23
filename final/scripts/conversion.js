const vendedorSelect = document.getElementById('vendedor-filter');
const container = document.getElementById('conversion-analysis');
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

const showConversionAnalysis = (dados) => {
  container.innerHTML = "";

  const propostas = dados.length;
  const vendas = dados.filter(sale => sale.data_venda).length;

  const vendidos = dados.filter(sale => sale.data_venda);
  const faturamentoTotal = vendidos.reduce((acc, sale) => acc + sale.preco, 0);

  const ticketVendido = vendas > 0 
      ? faturamentoTotal / vendas 
      : 0;

  // Novo: ciclo de vendas (média de dias entre criação e venda)
  let cicloVendas = 0;
  if (vendas > 0) {
    const totalDias = vendidos.reduce((acc, sale) => {
      const dataCriacao = new Date(sale.data_criacao);
      const dataVenda = new Date(sale.data_venda);
      const diffTime = dataVenda - dataCriacao;
      const diffDays = diffTime / (1000 * 60 * 60 * 24);
      return acc + diffDays;
    }, 0);
    cicloVendas = (totalDias / vendas).toFixed(1);
  }

  const table = document.createElement('table');
  table.innerHTML = `
    <tr><th>Métrica</th><th>Valor</th></tr>
    <tr><td>Propostas criadas</td><td>${propostas}</td></tr>
    <tr><td>Vendas fechadas</td><td>${vendas}</td></tr>
    <tr><td>Ticket médio vendido</td><td>${ticketVendido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td></tr>
    <tr><td>Faturamento total</td><td>${faturamentoTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td></tr>
    <tr><td>Ciclo médio de vendas (dias)</td><td>${cicloVendas}</td></tr>
  `;
  container.appendChild(table);
};

const getNumbers = async () => {
  const response = await fetch(urlSales);
  const data = await response.json();
  salesData = data;
  populateVendedorFilter(salesData);
  showConversionAnalysis(salesData);
};

vendedorSelect.addEventListener('change', () => {
  const selected = vendedorSelect.value;
  const filtered = selected === 'all' 
      ? salesData 
      : salesData.filter(sale => sale.vendedor === selected);
  showConversionAnalysis(filtered);
});

getNumbers();
