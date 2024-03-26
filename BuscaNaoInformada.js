export class BuscaNaoInf {
    constructor(estadoInicial, estadoFinal) {
        this.estadoInicial = estadoInicial;
        this.estadoFinal = estadoFinal;
        this.mapa = {
            "Arad": { acoes: { "Zerind": 75, "Timisoara": 118, "Sibiu": 140 } },
            "Zerind": { acoes: { "Arad": 75, "Oradea": 71 } },
            "Oradea": { acoes: { "Zerind": 71, "Sibiu": 151 } },
            "Timisoara": { acoes: { "Arad": 118, "Lugoj": 111 } },
            "Lugoj": { acoes: { "Timisoara": 111, "Mehadia": 70 } },
            "Mehadia": { acoes: { "Lugoj": 70, "Drobeta": 75 } },
            "Drobeta": { acoes: { "Mehadia": 75, "Craiova": 120 } },
            "Craiova": { acoes: { "Drobeta": 120, "Rimnicu Vilcea": 146, "Pitesti": 138 } },
            "Rimnicu Vilcea": { acoes: { "Craiova": 146, "Pitesti": 97, "Sibiu": 80 } },
            "Sibiu": { acoes: { "Arad": 140, "Oradea": 151, "Rimnicu Vilcea": 80, "Fagaras": 99 } },
            "Fagaras": { acoes: { "Sibiu": 99, "Bucharest": 211 } },
            "Pitesti": { acoes: { "Rimnicu Vilcea": 97, "Craiova": 138, "Bucharest": 101 } },
            "Bucharest": { acoes: { "Fagaras": 211, "Pitesti": 101 } },
            "Giurgiu": { acoes: { "Bucharest": 90 } },
            "Urziceni": { acoes: { "Bucharest": 85, "Hirsova": 98, "Vaslui": 142 } },
            "Hirsova": { acoes: { "Urziceni": 98, "Eforie": 86 } },
            "Eforie": { acoes: { "Hirsova": 86 } },
            "Vaslui": { acoes: { "Urziceni": 142, "Iasi": 92 } },
            "Iasi": { acoes: { "Vaslui": 92, "Neamt": 87 } },
            "Neamt": { acoes: { "Iasi": 87 } }
        }
    }

    acoes(estado) {
        return this.mapa[estado].acoes;
    }

    transicao(estado, acao) { // este metodo serve para retornar o estado resultante de uma ação
        if (this.acoes(estado)[acao]) {
            return acao;
        }
    }

    custo(estado, acao) {
        return this.acoes(estado)[acao];
    }

    objetivo(estado) {
        return estado == this.estadoFinal;
    }

    buscaEmLargura() {
        let borda = [{ estado: this.estadoInicial, custo: 0 }];
        let explorado = new Set(); // Set serve para armazenar valores únicos
        let custoTotal = 0;

        while (borda.length > 0) {
            let { estado, custo } = borda.shift();
            custoTotal = custo;
            if (this.objetivo(estado)) {
                console.log("Caminho: " + [...explorado, estado].join(" -> "));
                console.log("Objetivo encontrado:", estado);
                console.log("Custo: " + custoTotal);
                return;
            }
            explorado.add(estado);
            for (let acao in this.acoes(estado)) {
                let estadoResultado = this.transicao(estado, acao);
                if (!explorado.has(estadoResultado) && !borda.some(item => item.estado === estadoResultado)) { // some() verifica se algum item do array satisfaz a condição
                    borda.push({ estado: estadoResultado, custo: custo + this.custo(estado, acao) });
                }
            }
        }
    }

    buscaEmProfundidade() {
        let borda = [this.estadoInicial];
        let explorado = [];

        while (borda.length > 0) {
            let estado = borda.pop();
            if (this.objetivo(estado)) {
                console.log("Caminho: " + explorado.join(" -> "));
                console.log("Objetivo encontrado:", estado);
                return true;
            }
            explorado.push(estado);
            for (let acao in this.acoes(estado)) {
                let estadoResultado = this.transicao(estado, acao);
                if (!explorado.includes(estadoResultado) && !borda.includes(estadoResultado)) {
                    borda.push(estadoResultado);
                }
            }
        }
        console.log("Objetivo não encontrado!");
        return false;
    }

    buscaEmProfundidadeLimitada(limite) {
        let borda = [this.estadoInicial];
        let explorado = [];

        while (borda.length > 0) {
            let estado = borda.pop();
            if (this.objetivo(estado)) {
                console.log("Caminho: " + explorado.join(" -> "));
                console.log("Objetivo encontrado:", estado);
                return true;
            }
            if (explorado.length < limite) {
                explorado.push(estado);
                for (let acao in this.acoes(estado)) {
                    let estadoResultado = this.transicao(estado, acao);
                    if (!explorado.includes(estadoResultado) && !borda.includes(estadoResultado)) {
                        borda.push(estadoResultado);
                    }
                }
            }
        }
        console.log("Objetivo não encontrado neste limite!");
        return false;
    }

    buscaEmProfundidadeIterativa() {
        let limite = 0;
        let objetivo = false;
        while (!objetivo) {
            console.log(`Buscando com limite: ${limite}`);
            objetivo = this.buscaEmProfundidadeLimitada(limite);
            limite++;

            if (limite > Object.keys(this.mapa).length) { // Se o limite for maior que o número de cidades, então não há solução
                console.log("Objetivo não encontrado!");
                break;
            }
        }
    }

    buscaEmCustoUniforme() {
        let borda = [{ estado: this.estadoInicial, custo: 0 }];
        let explorado = new Set();
        let custos = { [this.estadoInicial]: 0 }; // Mantém o custo atual para cada estado

        while (borda.length > 0) {
            borda.sort((a, b) => a.custo - b.custo);
            let { estado, custo } = borda.shift();
            if (this.objetivo(estado)) {
                console.log("Caminho: " + [...explorado, estado].join(" -> "));
                console.log("Objetivo encontrado:", estado);
                console.log("Custo: " + custo);
                return;
            }
            explorado.add(estado);
            for (let acao in this.acoes(estado)) {
                let estadoResultado = this.transicao(estado, acao);
                let novoCusto = custo + this.custo(estado, acao);
                if (!explorado.has(estadoResultado) &&
                    (!custos.hasOwnProperty(estadoResultado) || novoCusto < custos[estadoResultado])) {
                    borda.push({ estado: estadoResultado, custo: novoCusto });
                    custos[estadoResultado] = novoCusto;
                }
            }
        }
    }

}

let busca = new BuscaNaoInf("Arad", "Bucharest");
busca.buscaEmLargura();
