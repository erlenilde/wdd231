const revenue = document.querySelector('#revenue');
const sales = document.querySelector('#sales');
const ticket = document.querySelector('#ticket');
const monthlyRevenue = document.querySelector('#monthly-revenue');
const proposals = document.querySelector('#proposals');
const channel = document.querySelector('#channel');
const salesRanking = document.querySelector('#sales-ranking');
const urlSales = 'data/vendas_formatado.json';
const urlProposals = 'data/propostas_formatado.json';

let dadosVendas = [];
let dadosExtraidos = [];

async function getNumbers() {
    const response = await fetch(urlSales);
    const data = await response.json();

    dadosVendas = data;
    dadosExtraidos = extractedData(data);
    //console.log(data);
    renderDashboard(data);
}

getNumbers();

const extractedData = (data) => {
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
};



function renderDashboard(data) {
    displayNumbers(data);
    displayMonthlyRevenue(data);
    displayAnnualRevenue(data);
    /*displayProposals(data);
    displayChannels(data);
    displaySalesRanking(data);*/
}

//-----------Totals------------

const displayNumbers = (dataSales) => {
    const totalRevenue = dataSales.reduce((sum, sale) => sum + sale.preco, 0);
    const totalSales = dataSales.length;
    const averageTicket = totalRevenue / totalSales;

    revenue.innerHTML = `<h2>${totalRevenue.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</h2><p>Revenue</p>`;
    sales.innerHTML = `<h2>${totalSales}</h2><p>Total Sales</p>`;
    ticket.innerHTML = `<h2>${averageTicket.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</h2><p>Avg Ticket</p>`;
}

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

const displayAnnualRevenue = (dataSales) => {
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
};


//-----------Buttons-----------

const showAll = document.querySelector('#all');
const showMonth = document.querySelector('#month');
const showPeriod = document.querySelector('#period');

showMonth.addEventListener("click", (e) => {
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
});





