function formatNumberBR(value) {
  const number = Number(value);
  if (isNaN(number)) return value;
  return new Intl.NumberFormat('pt-BR').format(number);
}


async function getData() {
    try {
        const response = await fetch("https://covid19-brazil-api.now.sh/api/report/v1");

        if (!response.ok) {
            throw new Error(`HTTP erro! status: ${response.status}`);
        }

        const json = await response.json();
        const tableBody = document.querySelector("#estados-br");

        let totalCases = 0;
        let totalSuspects = 0;
        let totalDeaths = 0;

        let highestRatio = -Infinity;
        let lowestRatio = Infinity;
        let ufHighestRatio = '';
        let ufLowestRatio = '';

        json.data.forEach((stateData) => {
            const cases = parseFloat(stateData.cases);
            const deaths = parseFloat(stateData.deaths);
            const suspects = parseFloat(stateData.suspects);

            totalCases += cases;
            totalSuspects += suspects;
            totalDeaths += deaths;

            const ratio = deaths === 0 ? Infinity : cases / deaths;

            if (ratio > highestRatio) {
                highestRatio = ratio;
                ufHighestRatio = stateData.uf;
            }

            if (ratio < lowestRatio) {
                lowestRatio = ratio;
                ufLowestRatio = stateData.uf;
            }
        });

        const averageCases = (totalCases / json.data.length).toFixed(2);
        const averageSuspects = (totalSuspects / json.data.length).toFixed(2);
        const averageDeaths = (totalDeaths / json.data.length).toFixed(2);

        json.data.forEach((stateData) => {
            const row = document.createElement("tr");

            const cases = parseFloat(stateData.cases);
            const deaths = parseFloat(stateData.deaths);
            

            if (deaths > averageDeaths) {
                row.style.backgroundColor = "#ffe0e0";
                row.style.fontWeight = "bold";
            }

            if (stateData.uf === ufHighestRatio) {
                row.style.backgroundColor = "#d1ffd1";
            }

            if (stateData.uf === ufLowestRatio) {
                row.style.backgroundColor = "#d1e0ff";
            }

            row.innerHTML = `
                <td>${stateData.state}</td>
                <td>${stateData.uf}</td>
                <td>${formatNumberBR(stateData.cases)}</td>
                <td>${formatNumberBR(stateData.suspects)}</td>
                <td>${formatNumberBR(stateData.deaths)}</td>
            `;

            tableBody.appendChild(row);
        });

        document.getElementById("media-num-casos").textContent = `Média dos casos: ${formatNumberBR(averageCases)}`;
        document.getElementById("media-num-suspeitos").textContent = `Média dos casos suspeitos: ${formatNumberBR(averageSuspects)}`;
        document.getElementById("media-num-falecimentos").textContent = `Média dos casos de falecimentos: ${formatNumberBR(averageDeaths)}`;
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
    }
}

getData();
