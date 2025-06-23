const revenue = document.querySelector('#revenue');
const sales = document.querySelector('#sales');
const ticket = document.querySelector('#ticket');
const monthlyRevenue = document.querySelector('#monthly-revenue');
const proposals = document.querySelector('#proposals');
const channel = document.querySelector('#channel');
const salesRanking = document.querySelector('#sales-ranking');
const urlSales = 'data/vendas_formatado.json';
const urlProposals = 'data/propostas_formatado.json';

let salesData = [];

async function getNumbers() {
    const response = await fetch(urlSales);
    const data = await response.json();
    salesData = data;
    console.log(data);
    showTotals(salesData);
    showYearlyRevenue(salesData);
    showChannels(salesData);
    showSalesRanking(salesData);

}

getNumbers();

const showTotals = (dados) => {
    revenue.innerHTML = "";
    sales.innerHTML = "";
    ticket.innerHTML = "";

    let totalRevenue = dados.reduce((acc, sale) => acc + sale.preco, 0);
    let totalSales = dados.length;
    let avgTicket = totalSales > 0 ? totalRevenue / totalSales : 0;

    // Revenue
    let revenueCard = document.createElement('div');
    let revenueLabel = document.createElement('h5');
    let revenueValue = document.createElement('h2');
    revenueLabel.textContent = "Total Revenue";
    revenueValue.textContent = totalRevenue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    revenueCard.appendChild(revenueLabel);
    revenueCard.appendChild(revenueValue);
    revenue.appendChild(revenueCard);

    // Sales
    let salesCard = document.createElement('div');
    let salesLabel = document.createElement('h5');
    let salesValue = document.createElement('h2');
    salesLabel.textContent = "Total Sales";
    salesValue.textContent = totalSales;
    salesCard.appendChild(salesLabel);
    salesCard.appendChild(salesValue);
    sales.appendChild(salesCard);

    // Ticket
    let ticketCard = document.createElement('div');
    let ticketLabel = document.createElement('h5');
    let ticketValue = document.createElement('h2');
    ticketLabel.textContent = "Average Ticket";
    ticketValue.textContent = avgTicket.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    ticketCard.appendChild(ticketLabel);
    ticketCard.appendChild(ticketValue);
    ticket.appendChild(ticketCard);
}

showTotals(salesData)

const showMonthlyRevenue = (dados, meses = null) => {
    monthlyRevenue.innerHTML = "";

    if (!meses) {
        const agora = new Date();

        // 1️⃣ Array dos últimos 12 meses
        meses = [];
        for (let i = 11; i >= 0; i--) {
            const data = new Date(agora.getFullYear(), agora.getMonth() - i, 1);
            meses.push({
                ano: data.getFullYear(),
                mes: data.getMonth() + 1 // 1-12
            });
        }
    }

    // 2️⃣ Container grid
    const gridContainer = document.createElement('div');
    gridContainer.style.width = '100%';

    // 3️⃣ Preenche os cards
    meses.forEach(({ ano, mes }) => {
        const vendasDoMes = dados.filter(sale => {
            const dataVenda = new Date(sale.data_venda);
            return dataVenda.getFullYear() === ano && (dataVenda.getMonth() + 1) === mes;
        });

        const total = vendasDoMes.reduce((acc, sale) => acc + sale.preco, 0);

        // Card do mês
        const card = document.createElement('div');
        card.style.border = '1px solid #ccc';
        card.style.padding = '0.5rem';
        card.style.borderRadius = '8px';
        card.style.background = 'none';
        card.style.color = '#2b3d91';
        card.style.textAlign = 'center';

        const label = document.createElement('p');
        label.style.margin = '0';
        label.style.fontSize = '0.8rem';
        label.textContent = `${String(mes).padStart(2, '0')}/${ano}`;

        const value = document.createElement('h3');
        value.style.margin = '0.3rem 0 0 0';
        value.style.fontSize = '1rem';
        value.textContent = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        card.appendChild(label);
        card.appendChild(value);

        gridContainer.appendChild(card);
    });

    // 4️⃣ Adiciona ao DOM
    monthlyRevenue.appendChild(gridContainer);
};


const showYearlyRevenue = (dados) => {
    monthlyRevenue.innerHTML = "";  // Reaproveitamos o container para o gráfico

    const anos = [...new Set(dados.map(sale => new Date(sale.data_venda).getFullYear()))].sort();

    const gridContainer = document.createElement('div');
    gridContainer.style.display = 'grid';
    gridContainer.style.gridTemplateColumns = 'repeat(auto-fit, minmax(120px, auto))';
    gridContainer.style.gap = '0.5rem';
    gridContainer.style.width = '100%';
    gridContainer.style.justifyContent = 'center';
    gridContainer.style.alignItems = 'start';

    anos.forEach(ano => {
        const vendasDoAno = dados.filter(sale => new Date(sale.data_venda).getFullYear() === ano);
        const total = vendasDoAno.reduce((acc, sale) => acc + sale.preco, 0);

        const card = document.createElement('div');
        card.style.border = '1px solid #ccc';
        card.style.padding = '0.5rem';
        card.style.borderRadius = '8px';
        card.style.background = 'none';
        card.style.color = '#2b3d91';
        card.style.textAlign = 'center';
        card.style.maxWidth = '150px';
        card.style.width = '100%';
        card.style.boxSizing = 'border-box';

        const label = document.createElement('p');
        label.style.margin = '0';
        label.style.fontSize = '0.8rem';
        label.textContent = `${ano}`;

        const value = document.createElement('h3');
        value.style.margin = '0.3rem 0 0 0';
        value.style.fontSize = '1rem';
        value.textContent = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        card.appendChild(label);
        card.appendChild(value);

        gridContainer.appendChild(card);
    });

    monthlyRevenue.appendChild(gridContainer);
};

const showChannels = (dados) => {
    channel.innerHTML = "";

    // Agrupa por canal
    const canais = {};
    dados.forEach(sale => {
        if (!canais[sale.fonte]) {
            canais[sale.fonte] = { vendas: 0, faturamento: 0 };
        }
        canais[sale.fonte].vendas += 1;
        canais[sale.fonte].faturamento += sale.preco;
    });

    // Cria tabela
    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.textAlign = 'left';

    const header = document.createElement('tr');
    header.innerHTML = `
        <th>Canal</th>
        <th>Nº de Vendas</th>
        <th>Faturamento</th>
    `;
    table.appendChild(header);

    for (const [canal, data] of Object.entries(canais)) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${canal}</td>
            <td>${data.vendas}</td>
            <td>${data.faturamento.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
        `;
        table.appendChild(row);
    }

    channel.appendChild(table);
};

const showSalesRanking = (dados) => {
    salesRanking.innerHTML = "";

    // Agrupa por vendedor
    const vendedores = {};
    dados.forEach(sale => {
        if (!vendedores[sale.vendedor]) {
            vendedores[sale.vendedor] = { vendas: 0, faturamento: 0 };
        }
        vendedores[sale.vendedor].vendas += 1;
        vendedores[sale.vendedor].faturamento += sale.preco;
    });

    // Ordena por faturamento e pega os top 5
    const topVendedores = Object.entries(vendedores)
        .sort((a, b) => b[1].faturamento - a[1].faturamento)
        .slice(0, 5);

    // Cria tabela
    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.textAlign = 'left';

    const header = document.createElement('tr');
    header.innerHTML = `
        <th>Vendedor</th>
        <th>Nº de Vendas</th>
        <th>Faturamento</th>
    `;
    table.appendChild(header);

    topVendedores.forEach(([vendedor, data]) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${vendedor}</td>
            <td>${data.vendas}</td>
            <td>${data.faturamento.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
        `;
        table.appendChild(row);
    });

    salesRanking.appendChild(table);
};









//-----------Buttons-----------

const showAll = document.querySelector('#all');
const showMonth = document.querySelector('#month');
const showPeriod = document.querySelector('#period');
const periodModal = document.getElementById('period-modal');
const startDateInput = document.getElementById('start-date');
const endDateInput = document.getElementById('end-date');
const applyPeriodBtn = document.getElementById('apply-period');
const cancelPeriodBtn = document.getElementById('cancel-period');

showAll.addEventListener("click", (e) => {
    e.preventDefault();

    showYearlyRevenue(salesData);
    showTotals(salesData);
    showChannels(salesData);
    showSalesRanking(salesData);
});

showMonth.addEventListener("click", (e) => {
    e.preventDefault();

    // Gráfico dos últimos 12 meses (usando salesData completo)
    showMonthlyRevenue(salesData);

    // Filtra dados do mês atual para totals, channels, ranking
    const now = new Date();
    const filtered = salesData.filter(sale => {
        const d = new Date(sale.data_venda);
        return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
    });

    showTotals(filtered);
    showChannels(filtered);
    showSalesRanking(filtered);
});

showPeriod.addEventListener("click", (e) => {
    e.preventDefault();
    periodModal.style.display = 'flex';
});

applyPeriodBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const start = new Date(startDateInput.value);
    const end = new Date(endDateInput.value);

    if (isNaN(start) || isNaN(end)) {
        alert("Please select both start and end dates.");
        return;
    }

    const filtered = salesData.filter(sale => {
        const d = new Date(sale.data_venda);
        return d >= start && d <= end;
    });

    // Gerar meses do período
    const meses = [];
    let current = new Date(start.getFullYear(), start.getMonth(), 1);
    const endMonth = new Date(end.getFullYear(), end.getMonth(), 1);
    while (current <= endMonth) {
        meses.push({
            ano: current.getFullYear(),
            mes: current.getMonth() + 1
        });
        current.setMonth(current.getMonth() + 1);
    }

    showMonthlyRevenue(filtered, meses);
    showTotals(filtered);
    showChannels(filtered);
    showSalesRanking(filtered);

    periodModal.style.display = 'none';
});

cancelPeriodBtn.addEventListener("click", () => {
    periodModal.style.display = 'none';
});



/*const extractedData = (data) => {
    const result = data.map(sale => {
        return {
            client: sale.cliente,
            power: sale.potencia,
            price: sale.preco,
            proposalDate: sale.data_criacao,
            saleDate: sale.data_venda,
            font: sale.fonte,
            salesman: sale.vendedor,
        };
    });

    console.log("extracted data:", result);
    return result;
};*/



/*function renderDashboard(data) {
    displayNumbers(data);
    displayMonthlyRevenue(data);
    displayAnnualRevenue(data);
    /*displayProposals(data);
    displayChannels(data);
    displaySalesRanking(data);
}*/

//-----------Totals------------

/*const displayNumbers = (dataSales) => {
    const totalRevenue = dataSales.reduce((sum, sale) => sum + sale.preco, 0);
    const totalSales = dataSales.length;
    const averageTicket = totalRevenue / totalSales;

    revenue.innerHTML = `<h2>${totalRevenue.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</h2><p>Revenue</p>`;
    sales.innerHTML = `<h2>${totalSales}</h2><p>Total Sales</p>`;
    ticket.innerHTML = `<h2>${averageTicket.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</h2><p>Avg Ticket</p>`;
}*/

//-----------Monthly Revenues--
/*const displayMonthlyRevenue = (dataSales) => {
    let today = new Date();
    let startDate = new Date(today);
    startDate.setMonth(startDate.getMonth() - 11);
    startDate.setDate(1);

    const filteredData = dataSales.filter(sale => {
        if (!sale.data_venda) return false;
        const saleDate = new Date(sale.data_venda);
        return saleDate >= startDate;
    });

    const monthlyTotals = {};
    filteredData.forEach(sale => {
        const saleDate = new Date(sale.data_venda);
        const year = saleDate.getFullYear();
        const month = (saleDate.getMonth()+1).toString().padStart(2, '0');
        const key = `${year}-${month}`;

        if (monthlyTotals[key]) {
            monthlyTotals[key] += sale.preco;
        }
        else {
            monthlyTotals[key] = sale.preco;
        }
    });

    console.log(monthlyTotals);

    }*/

//------Annual revenues--------

/*const displayAnnualRevenue = (dataSales) => {
    const filteredData = dataSales.filter(sale => {
        if (!sale.data_venda) return false;
        return true;
    });

    const annualTotals = {};
    filteredData.forEach(sale => {
        const saleDate = new Date(sale.data_venda);
        const year = saleDate.getFullYear();
        const key = `${year}`;

        if (annualTotals[key]) {
            annualTotals[key] += sale.preco;
        } else {
            annualTotals[key] = sale.preco;
        }
    });

    console.log(annualTotals);
};*/


/*showAll.addEventListener("click", () => {
    const resumo = gerarResumoDashboard(dadosVendas);
    renderDashboard(resumo, 'anual');
  });
  
  showMonth.addEventListener("click", () => {
    const hoje = new Date();
    const inicio = new Date(hoje.getFullYear(), hoje.getMonth() - 11, 1);
    const fim = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0);
  
    const vendas12Meses = dadosVendas.filter(venda => {
      const data = new Date(venda.data_venda);
      return data >= inicio && data <= fim;
    });
    const vendasMesAtual = dadosVendas.filter(venda => {
      const data = new Date(venda.data_venda);
      return data.getMonth() === hoje.getMonth() && data.getFullYear() === hoje.getFullYear();
    });
    
    const resumo12Meses = gerarResumoDashboard(vendas12Meses);
    const resumoMesAtual = gerarResumoDashboard(vendasMesAtual);
    renderDashboard(resumoMesAtual, 'mensal', resumo12Meses);
  });
  
  showPeriod.addEventListener("click", (e) => {
    e.preventDefault();
  
    // Se o popup já existir, não cria de novo
    if (document.querySelector('#date-container')) return;
  
    // Cria o popup
    const container = document.createElement('div');
    container.id = 'date-container';
    container.innerHTML = `
      <label>Início: <input type="date" id="start-date"></label>
      <label>Fim: <input type="date" id="end-date"></label>
      <button id="confirm-dates">OK</button>
    `;
    document.body.appendChild(container); // adiciona ao body para flutuar
  
    // Evento do botão OK
    const confirmButton = container.querySelector('#confirm-dates');
    confirmButton.addEventListener('click', () => {
      const startInput = document.querySelector('#start-date').value;
      const endInput = document.querySelector('#end-date').value;
  
      if (startInput && endInput) {
        const startDate = new Date(startInput);
        const endDate = new Date(endInput);
  
        const vendasPeriodo = dadosVendas.filter(venda => {
          const data = new Date(venda.data_venda);
          return data >= startDate && data <= endDate;
        });
  
        const resumo = gerarResumoDashboard(vendasPeriodo);
        renderDashboard(resumo, 'mensal');
  
        // Remove o popup
        container.remove();
      } else {
        alert("Por favor selecione as duas datas.");
      }
    });
  });*/




/*showMonth.addEventListener("click", (e) => {
    e.preventDefault();

    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    const monthlyDisplay = dadosVendas.filter(sale => {
        if (!sale.data_venda) return false;
        const saleDate = new Date(sale.data_venda);
        return saleDate >= startOfMonth && saleDate <= endOfMonth;
    });

    renderDashboard(monthlyDisplay); // <- igual ao displayTemples()
});

showAll.addEventListener("click", (e) => {
    e.preventDefault();
    renderDashboard(dadosVendas);
});


showPeriod.addEventListener("click", (e) => {
    e.preventDefault();

    const startInput = prompt("Enter start date (YYYY-MM-DD):");
    const endInput = prompt("Enter end date (YYYY-MM-DD):");

    if (startInput && endInput) {
        const startDate = new Date(startInput);
        const endDate = new Date(endInput);

        const periodDisplay = dadosVendas.filter(sale => {
            if (!sale.data_venda) return false;
            const saleDate = new Date(sale.data_venda);
            return saleDate >= startDate && saleDate <= endDate;
        });

        renderDashboard(periodDisplay);
    }
});*/

/*function gerarResumoDashboard(vendas) {
    const resumo = {
      totalVendas: vendas.length,
      totalFaturado: 0,
      porVendedor: {},
      porMes: {},
      porAno: {},
      porFonte: {},
    };
    vendas.forEach(venda => {
      const preco = venda.preco || 0;
      const vendedor = venda.vendedor || "Sem vendedor";
      const data = new Date(venda.data_venda);
      const mes = venda.data_venda?.slice(0, 7);
      const ano = data.getFullYear().toString();
      const fonte = venda.fonte || "Não informada";
  
      resumo.totalFaturado += preco;
  
      // Por vendedor
      resumo.porVendedor[vendedor] = (resumo.porVendedor[vendedor] || 0) + preco;
  
      // Por mês
      resumo.porMes[mes] = (resumo.porMes[mes] || 0) + preco;
  
      // Por ano
      resumo.porAno[ano] = (resumo.porAno[ano] || 0) + preco;
  
      // Por fonte
      if (!resumo.porFonte[fonte]) {
        resumo.porFonte[fonte] = { quantidade: 0, faturamento: 0 };
      }
      resumo.porFonte[fonte].quantidade += 1;
      resumo.porFonte[fonte].faturamento += preco;
    });
    return resumo;
  }
  

  function renderDashboard(resumo, modo = 'mensal', resumo12Meses = null) {
    // Totais
    revenue.innerHTML = `<h2>${resumo.totalFaturado.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</h2><p>Receita Total</p>`;
    sales.innerHTML = `<h2>${resumo.totalVendas}</h2><p>Vendas</p>`;
    ticket.innerHTML = `<h2>${(resumo.totalFaturado / (resumo.totalVendas || 1)).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</h2><p>Ticket Médio</p>`;
  
    // Receita Mensal / Anual
    const agrupamento = (resumo12Meses || modo === 'anual') ? (resumo12Meses?.porMes || resumo.porAno) : resumo.porMes;
  
    const receitaHTML = Object.entries(agrupamento)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([tempo, valor]) => `<tr><td>${tempo}</td><td>${valor.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td></tr>`)
      .join('');
  
    monthlyRevenue.innerHTML = `
      <table>
        <tr><th>Período</th><th>Faturamento</th></tr>
        ${receitaHTML}
      </table>`;
  
    // Fontes de Captação
    const canaisHTML = Object.entries(resumo.porFonte).map(([fonte, info]) =>
      `<tr><td>${fonte}</td><td>${info.quantidade}</td><td>${info.faturamento.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td></tr>`)
      .join('');
  
    channel.innerHTML = `
      <table>
        <tr><th>Fonte</th><th>Vendas</th><th>Faturamento</th></tr>
        ${canaisHTML}
      </table>`;
  
    // Ranking de Vendedores
    const rankingHTML = Object.entries(resumo.porVendedor)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([vendedor, valor]) =>
        `<tr><td>${vendedor}</td><td>${valor.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td></tr>`)
      .join('');
  
    salesRanking.innerHTML = `
      <table>
        <tr><th>Vendedor</th><th>Faturamento</th></tr>
        ${rankingHTML}
      </table>`;

    
  }*/







