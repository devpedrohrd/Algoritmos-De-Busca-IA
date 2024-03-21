import { Grafo } from "./Grafo.js";

export class BuscaEmlargura {
    constructor() {
        this.grafo = new Grafo();
        this.visitados = {};
        this.fila = [];
    }

    buscaEmlargura(verticeInicial, verticeFinal) {
        this.fila.push(verticeInicial);

        while (this.fila.length > 0) {
            let vertice = this.fila.shift();
            console.log(`Visitando vertice: ${vertice}`);

            if (vertice == verticeFinal) {
                console.log('Vertice encontrado!: ', verticeFinal);
                return;
            }

            let arestas = this.grafo.vertices[vertice];
            for (let aresta in arestas) {
                if (!this.visitados[aresta]) {
                    this.fila.push(aresta);
                    this.visitados[aresta] = true;
                }
            }
        }
        console.log('Vertice não encontrado!');
    
    }
}

const busca = new BuscaEmlargura();

busca.grafo.adicionarVetices('A');
busca.grafo.adicionarVetices('B');
busca.grafo.adicionarVetices('C');
busca.grafo.adicionarVetices('D');
busca.grafo.adicionarVetices('E');

busca.grafo.adicionarAresta('A', 'B', 1);
busca.grafo.adicionarAresta('A', 'C', 1);
busca.grafo.adicionarAresta('B', 'D', 1);
busca.grafo.adicionarAresta('B', 'E', 1);

// busca.grafo.mostrarVertices();

// busca.buscaEmlargura('A', 'D')

// console.log(busca.grafo.mostrarArestas('A'));