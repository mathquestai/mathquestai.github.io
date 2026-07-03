export const CONTEUDO_ESTUDO = {
  1: {
    titulo: 'Multiplicação Básica',
    descricao: 'Nesta fase, Roko vai te desafiar com multiplicações usando números de 2 a 9.',
    dicas: [
      {
        icone: '🔢',
        titulo: 'Tabuada do 9 — Truque dos Dedos',
        texto: 'Para multiplicar por 9, abaixe o dedo correspondente ao número. Os dedos à esquerda são as dezenas, os à direita são as unidades. Exemplo: 9×3 → abaixe o 3º dedo → 2 dedos à esquerda, 7 à direita = 27!'
      },
      {
        icone: '🔄',
        titulo: 'Propriedade Comutativa',
        texto: 'A ordem não importa! 3×7 = 7×3 = 21. Se não lembra de 3×7, tente pensar em 7×3!'
      },
      {
        icone: '✂️',
        titulo: 'Decompor para Facilitar',
        texto: 'Quebre números difíceis! 7×8 = 7×(5+3) = 35+21 = 56. Ou: 7×8 = (7×10)-(7×2) = 70-14 = 56.'
      }
    ],
    exemplos: [
      { pergunta: '7 × 8 = ?', resolucao: '7 × 8 = 56. Truque: 7×8 = 7×(10-2) = 70 - 14 = 56', resposta: 56 },
      { pergunta: '6 × 9 = ?', resolucao: '6 × 9 = 54. Truque do 9: o resultado sempre soma 9 → 5+4 = 9', resposta: 54 },
      { pergunta: '4 × 7 = ?', resolucao: '4 × 7 = 28. Pense: o dobro de 2×7 = 14, então 4×7 = 28', resposta: 28 },
    ]
  },
  2: {
    titulo: 'Divisão Básica',
    descricao: 'Ventra desafia você com divisões. Lembre-se: divisão é o oposto da multiplicação!',
    dicas: [
      {
        icone: '🔄',
        titulo: 'O Inverso da Multiplicação',
        texto: 'Se você sabe a tabuada, sabe dividir! 56 ÷ 8 = ? Pense: "Que número vezes 8 dá 56?". Como 8 × 7 = 56, a resposta é 7.'
      },
      {
        icone: '✂️',
        titulo: 'Dividir por 2 (Metade)',
        texto: 'Dividir por 2 é apenas encontrar a metade do número. 24 ÷ 2 = 12. Se o número for grande, divida cada parte: 68 ÷ 2 = (60÷2) + (8÷2) = 30 + 4 = 34.'
      },
      {
        icone: '✋',
        titulo: 'Divisão por 5',
        texto: 'Um número só pode ser dividido por 5 (com resultado exato) se terminar em 0 ou 5. Truque: dobre o número e divida por 10 (corte o zero). 45 ÷ 5 → Dobro = 90 → 90 ÷ 10 = 9.'
      }
    ],
    exemplos: [
      { pergunta: '56 ÷ 8 = ?', resolucao: 'Pense na tabuada do 8: 8 × 7 = 56. Portanto, 56 ÷ 8 = 7', resposta: 7 },
      { pergunta: '45 ÷ 9 = ?', resolucao: 'Que número vezes 9 dá 45? 9 × 5 = 45. Portanto, 45 ÷ 9 = 5', resposta: 5 },
      { pergunta: '72 ÷ 8 = ?', resolucao: 'Sabendo que 8 × 9 = 72, então 72 ÷ 8 = 9', resposta: 9 },
    ]
  },
  3: {
    titulo: 'O Vulcão Misto (× e ÷)',
    descricao: 'Ignara ataca com multiplicações E divisões (até 20). Atenção ao sinal de cada ataque!',
    dicas: [
      {
        icone: '👁️',
        titulo: 'Leia o Sinal!',
        texto: 'O erro mais comum é somar ou multiplicar quando a operação é de dividir. Leia o sinal (× ou ÷) com muita atenção antes de calcular.'
      },
      {
        icone: '🧠',
        titulo: 'Estimativa Rápida',
        texto: 'Se a conta é 12 × 15, você sabe que será maior que 12 × 10 (120). Use isso para descartar respostas absurdas na sua cabeça.'
      },
      {
        icone: '🧩',
        titulo: 'Decompor Fatores (×10)',
        texto: 'Para 12 × 15: faça 12 × 10 = 120 e 12 × 5 = 60. Somando 120 + 60 = 180.'
      }
    ],
    exemplos: [
      { pergunta: '12 × 15 = ?', resolucao: '12 × 10 = 120, 12 × 5 = 60. 120 + 60 = 180', resposta: 180 },
      { pergunta: '180 ÷ 12 = ?', resolucao: 'Use a lógica inversa do exemplo anterior! Se 12 × 15 = 180, então 180 ÷ 12 = 15', resposta: 15 },
      { pergunta: '14 × 13 = ?', resolucao: '14 × 10 = 140, 14 × 3 = 42. 140 + 42 = 182', resposta: 182 },
    ]
  },
  4: {
    titulo: 'O Abismo dos Grandes (Até 50)',
    descricao: 'Aqualis usa operandos grandes (até 50). Você precisará de estratégias avançadas de decomposição.',
    dicas: [
      {
        icone: '📦',
        titulo: 'Decomposição Total',
        texto: 'Quebre ambos os números! 25 × 32. Pense no 32 como 4 × 8. (25 × 4) = 100. 100 × 8 = 800. Muito mais fácil!'
      },
      {
        icone: '📏',
        titulo: 'Arredondamento e Ajuste',
        texto: 'Para 48 × 12. Pense em 50 × 12 = 600. Como adicionamos "2 dozes", precisamos subtrair (2 × 12 = 24). 600 - 24 = 576.'
      },
      {
        icone: '🪙',
        titulo: 'Pense em Dinheiro (×25 e ×50)',
        texto: 'Multiplicar por 25 é como contar moedas de 25 centavos. 4 moedas = 1 real (100). Então 12 × 25 → 12 moedas → 3 grupos de 4 → 300.'
      }
    ],
    exemplos: [
      { pergunta: '25 × 32 = ?', resolucao: '25 × (4 × 8) → (25 × 4) × 8 → 100 × 8 = 800', resposta: 800 },
      { pergunta: '450 ÷ 18 = ?', resolucao: 'Simplifique cortando pela metade: 225 ÷ 9. Sabendo que 9×25=225, a resposta é 25', resposta: 25 },
      { pergunta: '48 × 12 = ?', resolucao: 'Arredondamento: (50 × 12) - (2 × 12) = 600 - 24 = 576', resposta: 576 },
    ]
  },
  5: {
    titulo: 'O Desafio Final (Até 99)',
    descricao: 'Obscurus não terá piedade. Todas as operações com números até 99. Use tudo que você aprendeu!',
    dicas: [
      {
        icone: '📚',
        titulo: 'Combine as Estratégias',
        texto: 'Não existe um único truque aqui. Use decomposição, arredondamento, divisão por partes e estime o resultado antes de finalizar o cálculo.'
      },
      {
        icone: '🧘',
        titulo: 'Mantenha a Calma',
        texto: 'A pressão é alta, mas a ansiedade atrapalha o raciocínio. Respire fundo, decomponha o número e resolva por partes.'
      },
      {
        icone: '⚡',
        titulo: 'A Regra do Zero',
        texto: 'Para contas gigantes, lembre-se de usar os zeros a seu favor. 60 × 80 = (6 × 8) = 48 + dois zeros = 4800. Se for 67 × 13, quebre: (60+7) × 13.'
      }
    ],
    exemplos: [
      { pergunta: '67 × 13 = ?', resolucao: 'Decompondo: (60 × 13) + (7 × 13). 60 × 13 = 780. 7 × 13 = 91. 780 + 91 = 871', resposta: 871 },
      { pergunta: '882 ÷ 14 = ?', resolucao: 'Estimativa: 14 × 10 = 140, 14 × 50 = 700. Faltam 182. 14 × 10 = 140 (falta 42, que é 14×3). 50+10+3 = 63', resposta: 63 },
      { pergunta: '45 × 78 = ?', resolucao: 'Arredondando o 78 para 80: (45 × 80) - (45 × 2). 45 × 8 = 360 (então 3600). 3600 - 90 = 3510', resposta: 3510 },
    ]
  },
};
