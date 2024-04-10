export function distanciaEdicao(a, b) {
    let tamanhoA = a.length;
    let tamanhoB = b.length;
    let operacoes = 0;
    let indiceA = 0;
    let indiceB = 0;
    const operacoesRealizadas = [];

    // Percorre as strings a e b
    while (indiceA < tamanhoA && indiceB < tamanhoB) {
        // Verifica se os caracteres são diferentes
        if (a[indiceA] !== b[indiceB]) {
            operacoes++;
            // Verifica se o próximo caractere de a é igual ao caractere atual de b
            if (indiceA + 1 < tamanhoA && a[indiceA + 1] === b[indiceB]) {
                operacoesRealizadas.push(`remover ${a[indiceA]}`);
                indiceA++;
                // Verifica se o próximo caractere de b é igual ao caractere atual de a
            } else if (indiceB + 1 < tamanhoB && a[indiceA] === b[indiceB + 1]) {
                operacoesRealizadas.push(`inserir ${b[indiceB]}`);
                indiceB++;
            } else {
                // Se não houver correspondência, avança ambos os índices
                operacoesRealizadas.push(`substituir ${a[indiceA]} por ${b[indiceB]}`);
                indiceA++;
                indiceB++;
            }
        } else {
            // Se os caracteres forem iguais, avança ambos os índices
            indiceA++;
            indiceB++;
        }
    }

    while (indiceA < tamanhoA) {
        operacoes++;
        operacoesRealizadas.push(`remover ${a[indiceA]}`);
        indiceA++;
    }

    while (indiceB < tamanhoB) {
        operacoes++;
        operacoesRealizadas.push(`inserir ${b[indiceB]}`);
        indiceB++;
    }

    console.log(`Número total de operações: ${operacoes}`);
    console.log(`Operações realizadas: ${operacoesRealizadas.join(", ")}`);
}

// Exemplos de uso
distanciaEdicao("Olá", "Bom dia");
// distanciaEdicao("kitten", "sitting");
