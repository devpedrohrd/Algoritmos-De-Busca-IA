class BuscaInformada {
    constructor(estadoInicial, estadoFinal) {
        this.estadoInicial = estadoInicial;
        this.estadoFinal = estadoFinal;
        this.mapa = {
            "Arad": { acoes: { "Zerind": 75, "Timisoara": 118, "Sibiu": 140 }, heuristica: 366 },
            "Zerind": { acoes: { "Arad": 75, "Oradea": 71 }, heuristica: 374 },
            "Oradea": { acoes: { "Zerind": 71, "Sibiu": 151 }, heuristica: 380 },
            "Timisoara": { acoes: { "Arad": 118, "Lugoj": 111 }, heuristica: 329 },
            "Lugoj": { acoes: { "Timisoara": 111, "Mehadia": 70 }, heuristica: 244 },
            "Mehadia": { acoes: { "Lugoj": 70, "Drobeta": 75 }, heuristica: 241 },
            "Drobeta": { acoes: { "Mehadia": 75, "Craiova": 120 }, heuristica: 242 },
            "Craiova": { acoes: { "Drobeta": 120, "Rimnicu Vilcea": 146, "Pitesti": 138 }, heuristica: 160 },
            "Rimnicu Vilcea": { acoes: { "Craiova": 146, "Pitesti": 97, "Sibiu": 80 }, heuristica: 193 },
            "Sibiu": { acoes: { "Arad": 140, "Oradea": 151, "Rimnicu Vilcea": 80, "Fagaras": 99 }, heuristica: 253 },
            "Fagaras": { acoes: { "Sibiu": 99, "Bucharest": 211 }, heuristica: 176 },
            "Pitesti": { acoes: { "Rimnicu Vilcea": 97, "Craiova": 138, "Bucharest": 101 }, heuristica: 100 },
            "Bucharest": { acoes: { "Fagaras": 211, "Pitesti": 101 }, heuristica: 0 },
            "Giurgiu": { acoes: { "Bucharest": 90 }, heuristica: 77 },
            "Urziceni": { acoes: { "Bucharest": 85, "Hirsova": 98, "Vaslui": 142 }, heuristica: 80 },
            "Hirsova": { acoes: { "Urziceni": 98, "Eforie": 86 }, heuristica: 151 },
            "Eforie": { acoes: { "Hirsova": 86 }, heuristica: 161 },
            "Vaslui": { acoes: { "Urziceni": 142, "Iasi": 92 }, heuristica: 199 },
            "Iasi": { acoes: { "Vaslui": 92, "Neamt": 87 }, heuristica: 226 },
            "Neamt": { acoes: { "Iasi": 87 }, heuristica: 234 }
        }
    }

    acoes(estado) { // Retorna as ações possíveis para um estado
        return this.mapa[estado].acoes;
    }

    transicao(estado, acao) { // Retorna o estado resultante de uma ação
        if (this.mapa[estado].acoes[acao]) {
            return acao;
        }
    }

    custo(estado, acao) { // Retorna o custo de uma ação
        return this.mapa[estado].acoes[acao];
    }

    heuristica(estado) {
        return this.mapa[estado].heuristica;
    }

    objetivo(estado) {
        return estado == this.estadoFinal;
    }

    jaNaBorda(borda, estado) { // Verifica se o estado já está na borda
        for (let no of borda) {
            if (no.estado == estado) {
                return true;
            }
        }
        return false;
    }

    reconstruirCaminho(no) {
        let caminho = [];
        while (no) {
            caminho.unshift(no.estado); // Adiciona o estado no início do array
            no = no.pai;
        }
        return caminho; 
    }

    buscaGulosa() {
        let borda = [];
        let explorado = new Set(); // Set serve para armazenar valores únicos
        let caminho = []; 
        let custo = 0;
        let no = {estado: this.estadoInicial, custo: 0, heuristica: this.heuristica(this.estadoInicial)};
        borda.push(no); 
        
        while (borda.length > 0) {
            let noAtual = borda.shift(); 
            
            if (this.objetivo(noAtual.estado)) { 
                caminho = this.reconstruirCaminho(noAtual); 
                custo = noAtual.custo; 
                break; 
            }
            
            explorado.add(noAtual.estado); 
            let acoes = this.acoes(noAtual.estado); 
            
            for (let acao in acoes) { // Percore as ações possíveis do estado atual
                let novoEstado = acao;
                let custoAcao = this.custo(noAtual.estado, acao);
                let novoNo = { 
                    estado: novoEstado,
                    pai: noAtual, 
                    custo: noAtual.custo + custoAcao, 
                    heuristica: this.heuristica(novoEstado) 
                };
                
                if (!explorado.has(novoEstado) && !this.jaNaBorda(borda, novoEstado)) {
                    borda.push(novoNo); 
                }
            }
            
            borda.sort((a, b) => a.heuristica - b.heuristica); // Ordena a borda pela heurística,pois é uma busca gulosa
        }
        
        console.log('Caminho:', caminho.join(' -> ')); 
        console.log('Custo:', custo); 
    }
    
}

const busca = new BuscaInformada('Arad', 'Bucharest');

busca.buscaGulosa()