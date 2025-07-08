function createProductsByPromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const number = Math.floor(Math.random() * 100);

            if (number % 2 == 0) {
                const products = [
                    { id: 1, nome: "Notebook", tipo: "Eletrônico", preco: 4200 },
                    { id: 2, nome: "Celular", tipo: "Eletrônico", preco: 2800 },
                    { id: 3, nome: "Mesa", tipo: "Móvel", preco: 700 },
                    { id: 4, nome: "Cadeira", tipo: "Móvel", preco: 300 },
                    { id: 5, nome: "Fone de Ouvido", tipo: "Acessório", preco: 150 },
                    { id: 6, nome: "Relógio", tipo: "Acessório", preco: 800 },
                    { id: 7, nome: "Livro", tipo: "Papelaria", preco: 90 },
                    { id: 8, nome: "Mochila", tipo: "Acessório", preco: 230 },
                    { id: 9, nome: "TV", tipo: "Eletrônico", preco: 3300 },
                    { id: 10, nome: "Impressora", tipo: "Eletrônico", preco: 1100 },
                ];
                resolve(products);
            } else {
                reject({ res: "ERROR", msg: "ERRO NO SISTEMA" });
            }
        });
    });
}

async function getProducts() {
    try {
        const products = await createProductsByPromise();
        showTable(products);
    } catch (error) {
        document.body.innerHTML = `<h2 style="color:red;">${error.msg}</h2>`;
    }
}

function showTable(products) {
    const average = products.reduce((acc, p) => acc + p.preco, 0) / products.length;

    const moreExpensive = Math.max(...products.map(p => p.preco));
    const cheaper = Math.min(...products.map(p => p.preco));

    const lines = products
        .map((p) => {
            let classe = "";
            if (p.preco > average) classe += " acima-media";
            if (p.preco === moreExpensive) classe += " mais-caro";
            if (p.preco === cheaper) classe += " mais-barato";

            return `
                <tr class="${classe.trim()}">
                    <td>${p.id}</td>
                    <td>${p.nome}</td>
                    <td>${p.tipo}</td>
                    <td>R$ ${p.preco.toFixed(2)}</td>
                </tr>`;
        }).join("");

    document.body.innerHTML = `
                <h1>Lista de Produtos</h1>
                <p><strong>Média de preços:</strong> R$ ${average.toFixed(2)}</p>
                <table>
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Tipo</th>
                    <th>Preço</th>
                    </tr>
                </thead>
                <tbody>
                    ${lines}
                </tbody>
                </table>
            `;
}

getProducts();