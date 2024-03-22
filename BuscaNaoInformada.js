import { Grafo } from "./Grafo.js";

export class BuscaNaoInformada {
    constructor() {
        this.grafo = new Grafo();
        this.visitados = {};
        this.fila = [];
    }

    buscaEmLargura(estadoInicial, estadoFinal) {
        let fila = [];
        fila.push(estadoInicial);

        while (fila.length > 0) {
            let vertice = fila.shift();
            console.log(`Visitando vertice: ${vertice}`);

            if (vertice == estadoFinal) {
                console.log('Vertice encontrado!: ', estadoFinal);
                return;
            }

            let arestas = this.grafo.mostrarArestas(vertice);
            for (let aresta in arestas) {
                if (!this.visitados[aresta]) {
                    fila.push(aresta);
                    this.visitados[aresta] = true;
                }
            }
        }
        return `Vertice não encontrado !`
    }

    buscaEmProfundidade(estadoInicial, estadoFinal) {
        let visitados = {};
        let pilha = [];

        pilha.push(estadoInicial);
        while (pilha.length > 0) {
            let vertice = pilha.pop();
            console.log(`Visitando vertice: ${vertice}`);

            if (vertice == estadoFinal) {
                console.log('Vertice encontrado!: ', estadoFinal);
                return;
            }

            let arestas = this.grafo.mostrarArestas(vertice);
            for (let aresta in arestas) {
                if (!visitados[aresta]) {
                    pilha.push(aresta);
                    visitados[aresta] = true;
                }
            }
        }
    }

    buscaEmProfundidadeLimitada(estadoInicial, estadoFinal, limite) {
        let visitados = {};
        let pilha = [];
        let profundidade = {};

        pilha.push(estadoInicial);
        profundidade[estadoInicial] = 0;
        while (pilha.length > 0) {
            let vertice = pilha.pop();
            console.log(`Visitando vertice: ${vertice}`);

            if (vertice == estadoFinal) {
                console.log('Vertice encontrado!: ', estadoFinal);
                return true;
            }

            if (profundidade[vertice] < limite) {
                let arestas = this.grafo.mostrarArestas(vertice);
                for (let aresta in arestas) {
                    if (!visitados[aresta]) {
                        pilha.push(aresta);
                        visitados[aresta] = true;
                        profundidade[aresta] = profundidade[vertice] + 1;
                    }
                }
            }
        }
        return false;
    }

    buscaEmProfundidadeIterativa(estadoInicial, estadoFinal) {
        let limite = 0;
        while (true) {
            console.log('Buscando com limite: ', limite);
            if (this.buscaEmProfundidadeLimitada(estadoInicial, estadoFinal, limite)) {
                break;
            }
            limite++;
        }
    }

    buscaComCustoUniforme(estadoInicial, estadoFinal) {
        let fila = [];
        fila.push({ vertice: estadoInicial, custo: 0 });

        while (fila.length > 0) {
            let vertice = fila.shift();
            console.log(`Visitando vertice: ${vertice.vertice} com custo: ${vertice.custo}`);

            if (vertice.vertice == estadoFinal) {
                console.log('Vertice encontrado!: ', estadoFinal);
                return;
            }

            let arestas = this.grafo.vertices[vertice.vertice];
            for (let aresta in arestas) {
                fila.push({ vertice: aresta, custo: vertice.custo + arestas[aresta] });
            }
            fila.sort((a, b) => a.custo - b.custo);
        }
    }
}

const busca = new BuscaNaoInformada();

busca.grafo.adicionarVetices('A');
busca.grafo.adicionarVetices('B');
busca.grafo.adicionarVetices('C');
busca.grafo.adicionarVetices('D');
busca.grafo.adicionarVetices('E');
busca.grafo.adicionarVetices('F');
busca.grafo.adicionarVetices('G');
busca.grafo.adicionarVetices('H');
busca.grafo.adicionarVetices('I');
busca.grafo.adicionarVetices('K');

busca.grafo.adicionarAresta('A', 'B', 1);
busca.grafo.adicionarAresta('A', 'C', 2);
busca.grafo.adicionarAresta('A', 'D', 5);
busca.grafo.adicionarAresta('B', 'E', 22);
busca.grafo.adicionarAresta('C', 'F', 7);
busca.grafo.adicionarAresta('C', 'G', 4);
busca.grafo.adicionarAresta('D', 'H', 3);
busca.grafo.adicionarAresta('D', 'I', 5);
busca.grafo.adicionarAresta('F', 'K', 1);

console.log(`Busca em profundidade iterativa: `);
busca.buscaEmProfundidadeIterativa('A', 'I');

// console.log(busca.grafo.estadoInicial);