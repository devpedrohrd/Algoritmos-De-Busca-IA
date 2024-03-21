export class Grafo{
    constructor(){
        this.vertices = {};
        this.raiz = null;
    }

    adicionarVetices(vertice){
        if(!this.vertices[vertice]){
            this.vertices[vertice] = {};
        }
    }

    adicionarAresta(verticePai,verticeFilho,custo){
        if(!this.vertices[verticePai] || !this.vertices[verticeFilho]){
            throw new Error('Os vertices não existem no grafo!');
        }

        if(this.raiz == null){
            this.raiz = verticePai;
        }

        this.vertices[verticePai][verticeFilho] = custo;
    }

    mostrarVertices(){
        for(let vertice in this.vertices){
            console.log(`Vertice: ${vertice}`);
        }
    }

    mostrarArestas(vertice){
        let arestas = this.vertices[vertice];
        return arestas ? arestas : `Vertice ${vertice} não possui arestas`;
    }

    mostarCustoAresta(verticePai,verticeFilho){
        let custo = this.vertices[verticePai][verticeFilho];
        return custo ? custo : 'Aresta não existe!';
    }

    removerVertice(vertice){ // este metodo remove o vertice e todas as arestas que ele possui
        for(let verticePai in this.vertices){
            for(let verticeFilho in this.vertices[verticePai]){
                if(verticeFilho == vertice){
                    delete this.vertices[verticePai][verticeFilho];
                    return `Elemento ${vertice} removido com sucesso!`;
                }
            }
        }
    }

    mostarGarfoCompleto(raiz){
        let arestas = this.vertices[raiz];
        for(let aresta in arestas){
            console.log(`Aresta: ${raiz} -> ${aresta} Custo: ${arestas[aresta]}`);
            this.mostarGarfoCompleto(aresta);
        }
    }
}