function formatNumberBR(value) {
  const number = Number(value);
  if (isNaN(number)) return value;
  return new Intl.NumberFormat('pt-BR').format(number);
}


async function getData() {
    try {
        const response = await fetch("https://covid19-brazil-api.now.sh/api/report/v1/countries");

        if (!response.ok) {
            throw new Error(`HTTP erro! status: ${response.status}`);
        }

        const json = await response.json();

        console.log(json.data[24])

        const tableBody = document.querySelector("#pais");

        let totalCases = 0;
        let totalDeaths = 0;

        let highestRatio = -Infinity;
        let lowestRatio = Infinity;
        let countryHighestRatio = '';
        let countryLowestRatio = '';

        json.data.forEach((country) => {
            const cases = parseFloat(country.confirmed);
            const deaths = parseFloat(country.deaths);

            totalCases += cases;
            totalDeaths += deaths;

            const ratio = deaths === 0 ? Infinity : cases / deaths;

            if (ratio > highestRatio) {
                highestRatio = ratio;
                countryHighestRatio = country.country;
            }

            if (ratio < lowestRatio) {
                lowestRatio = ratio;
                countryLowestRatio = country.country;
            }
        });

        const averageCases = (totalCases / json.data.length).toFixed(2);
        const averageDeaths = (totalDeaths / json.data.length).toFixed(2);

        json.data.forEach((country) => {
            const row = document.createElement("tr");

            const deaths = parseFloat(country.deaths);

            if (deaths > averageDeaths) {
                row.classList.add("acima-media");
            }

            if (country.country === countryHighestRatio) {
                row.classList.add("maior-relacao");
            }

            if (country.country === countryLowestRatio) {
                row.classList.add("menor-relacao");
            }

            if (country.country === "Brazil") {
                row.innerHTML = `
                    <td style="border: 5px solid #b22222;">${country.country}</td>
                    <td>${formatNumberBR(country.confirmed)}</td>
                    <td>${formatNumberBR(country.deaths)}</td>
                `;
            } else {
                row.innerHTML = `
                <td>${country.country}</td>
                <td>${formatNumberBR(country.confirmed)}</td>
                <td>${formatNumberBR(country.deaths)}</td>
            `;
            }


            tableBody.appendChild(row);
        });

        document.getElementById("media-num-casos").textContent = `Média dos casos: ${formatNumberBR(averageCases)}`;
        document.getElementById("media-num-falecimentos").textContent = `Média dos falecimentos: ${formatNumberBR(averageDeaths)}`;
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
    }
}

getData();
