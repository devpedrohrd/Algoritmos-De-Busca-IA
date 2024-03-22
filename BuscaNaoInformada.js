import { Grafo } from "./Grafo.js";

export class BuscaNaoInformada {
    constructor() {
        this.grafo = new Grafo();
        this.visitados = {};
        this.fila = [];
    }

    buscaEmLargura(raiz, alvo) {
        let fila = [];
        fila.push(raiz);

        while (fila.length > 0) {
            let vertice = fila.shift();
            console.log(`Visitando vertice: ${vertice}`);

            if (vertice == alvo) {
                console.log('Vertice encontrado!: ', alvo);
                return;
            }

            let arestas = this.grafo.vertices[vertice];
            for (let aresta in arestas) {
                if (!this.visitados[aresta]) {
                    fila.push(aresta);
                    this.visitados[aresta] = true;
                }
            }
        }
        return `Vertice não encontrado !`
    }

    buscaEmProfundidade(raiz,alvo){
        let visitados = {};
        let pilha = [];

        pilha.push(raiz);
        while(pilha.length > 0){
            let vertice = pilha.pop();
            console.log(`Visitando vertice: ${vertice}`);

            if(vertice == alvo){
                console.log('Vertice encontrado!: ', alvo);
                return;
            }

            let arestas = this.grafo.vertices[vertice];
            for(let aresta in arestas){
                if(!visitados[aresta]){
                    pilha.push(aresta);
                    visitados[aresta] = true;
                }
            }
        }
    }

    buscaEmProfundidadeLimitada(raiz,alvo,limite){
        let visitados = {};
        let pilha = [];
        let profundidade = {};

        pilha.push(raiz);
        profundidade[raiz] = 0;
        while(pilha.length > 0){
            let vertice = pilha.pop();
            console.log(`Visitando vertice: ${vertice}`);

            if(vertice == alvo){
                console.log('Vertice encontrado!: ', alvo);
                return;
            }

            if(profundidade[vertice] < limite){
                let arestas = this.grafo.vertices[vertice];
                for(let aresta in arestas){
                    if(!visitados[aresta]){
                        pilha.push(aresta);
                        visitados[aresta] = true;
                        profundidade[aresta] = profundidade[vertice] + 1;
                    }
                }
            }
        }
    }
}

const busca = new BuscaNaoInformada();

busca.grafo.adicionarVetices('A');
busca.grafo.adicionarVetices('B');
busca.grafo.adicionarVetices('C');
busca.grafo.adicionarVetices('D');
busca.grafo.adicionarVetices('E');

busca.grafo.adicionarAresta('A', 'E', 1);
busca.grafo.adicionarAresta('A', 'B', 1);
busca.grafo.adicionarAresta('B', 'C', 1);
busca.grafo.adicionarAresta('C', 'D', 1);

busca.buscaEmProfundidadeLimitada('A','D',3);