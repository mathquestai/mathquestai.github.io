/**
 * geradorDicas.js
 * Sistema pedagógico de dicas da Luna.
 * Gera dicas contextualizadas com base no tipo de operação e nos operandos,
 * escalando do nível rápido (1º erro) para o passo a passo detalhado (2º erro / pedido).
 */

/* ─────────────────────────────────────────────────────────
   Estratégias para MULTIPLICAÇÃO
───────────────────────────────────────────────────────── */
const estrategiasMultiplicacao = {
  /** Multiplicar por 2: dobrar */
  por2: (a) => ({
    rapida: `Multiplicar por 2 é só dobrar o número! ${a} × 2 = ${a} + ${a}`,
    detalhada: `🦉 Dica da Luna — Multiplicar por 2:\nBasta somar o número com ele mesmo!\n\n${a} × 2\n= ${a} + ${a}\n= ${a * 2} ✓`,
  }),

  /** Multiplicar por 4: dobrar duas vezes */
  por4: (a) => ({
    rapida: `Multiplicar por 4 = dobrar duas vezes! Tente: ${a} × 2 primeiro.`,
    detalhada: `🦉 Dica da Luna — Multiplicar por 4:\nDobre o número duas vezes seguidas!\n\n${a} × 4\nPasso 1: ${a} × 2 = ${a * 2}\nPasso 2: ${a * 2} × 2 = ${a * 4} ✓`,
  }),

  /** Multiplicar por 5: × 10 ÷ 2 */
  por5: (a) => ({
    rapida: `Multiplicar por 5: multiplique por 10 e divida por 2!`,
    detalhada: `🦉 Dica da Luna — Multiplicar por 5:\nMultiplique por 10 e depois divida por 2!\n\n${a} × 5\nPasso 1: ${a} × 10 = ${a * 10}\nPasso 2: ${a * 10} ÷ 2 = ${a * 5} ✓`,
  }),

  /** Multiplicar por 8: dobrar três vezes */
  por8: (a) => ({
    rapida: `Multiplicar por 8 = dobrar três vezes! Comece com ${a} × 2.`,
    detalhada: `🦉 Dica da Luna — Multiplicar por 8:\nDobre o número três vezes!\n\n${a} × 8\nPasso 1: ${a} × 2 = ${a * 2}\nPasso 2: ${a * 2} × 2 = ${a * 4}\nPasso 3: ${a * 4} × 2 = ${a * 8} ✓`,
  }),

  /** Multiplicar por 9: × 10 - número */
  por9: (a) => ({
    rapida: `Multiplicar por 9: multiplique por 10 e subtraia o próprio número!`,
    detalhada: `🦉 Dica da Luna — Multiplicar por 9:\nMultiplique por 10 e subtraia o número!\n\n${a} × 9\nPasso 1: ${a} × 10 = ${a * 10}\nPasso 2: ${a * 10} − ${a} = ${a * 9} ✓`,
  }),

  /** Multiplicar por 11 (números de 1 dígito) */
  por11: (a) => ({
    rapida: `Para 1 dígito × 11, repita o dígito! Ex: ${a} × 11 = ${a}${a}`,
    detalhada: `🦉 Dica da Luna — Multiplicar por 11:\nPara números de 1 dígito, é só repetir!\n\n${a} × 11\n= ${a * 11} (repita o ${a} duas vezes!) ✓`,
  }),

  /** Estratégia geral: decompor em dezenas + unidades */
  decomposicao: (a, b) => {
    const dez  = Math.floor(b / 10) * 10;
    const uni  = b % 10;
    if (dez === 0) {
      // b < 10, decompõe a
      const aDez = Math.floor(a / 10) * 10;
      const aUni = a % 10;
      return {
        rapida: `Quebre em partes: ${a} × ${b} = (${aDez} × ${b}) + (${aUni} × ${b})`,
        detalhada: `🦉 Dica da Luna — Decomposição:\nQuebre o número maior em partes!\n\n${a} × ${b}\n= (${aDez} × ${b}) + (${aUni} × ${b})\n= ${aDez * b} + ${aUni * b}\n= ${a * b} ✓`,
      };
    }
    return {
      rapida: `Quebre em partes: ${a} × ${b} = (${a} × ${dez}) + (${a} × ${uni})`,
      detalhada: `🦉 Dica da Luna — Decomposição:\nQuebre o multiplicador em dezenas e unidades!\n\n${a} × ${b}\n= (${a} × ${dez}) + (${a} × ${uni})\n= ${a * dez} + ${a * uni}\n= ${a * b} ✓`,
    };
  },
};

/* ─────────────────────────────────────────────────────────
   Estratégias para DIVISÃO
───────────────────────────────────────────────────────── */
const estrategiasDivisao = {
  /** Divisão como inverso da multiplicação */
  inverso: (dividendo, divisor, resultado) => ({
    rapida: `Pense ao contrário! ${dividendo} ÷ ${divisor} = ? → ${divisor} × ? = ${dividendo}`,
    detalhada: `🦉 Dica da Luna — Divisão inversa:\nPense na multiplicação correspondente!\n\n${dividendo} ÷ ${divisor} = ?\nÉ o mesmo que: ${divisor} × ? = ${dividendo}\n\nTente: ${divisor} × ${resultado} = ${dividendo} ✓`,
  }),

  /** Divisão por 2: metade */
  por2: (dividendo, resultado) => ({
    rapida: `Dividir por 2 é encontrar a metade! Metade de ${dividendo} é...`,
    detalhada: `🦉 Dica da Luna — Dividir por 2:\nÉ só encontrar a metade do número!\n\n${dividendo} ÷ 2\nMetade de ${dividendo} = ${resultado} ✓`,
  }),

  /** Divisão por 4: dividir por 2 duas vezes */
  por4: (dividendo, resultado) => ({
    rapida: `Dividir por 4 = dividir por 2 duas vezes! Comece com ${dividendo} ÷ 2.`,
    detalhada: `🦉 Dica da Luna — Dividir por 4:\nDivida por 2 duas vezes seguidas!\n\n${dividendo} ÷ 4\nPasso 1: ${dividendo} ÷ 2 = ${dividendo / 2}\nPasso 2: ${dividendo / 2} ÷ 2 = ${resultado} ✓`,
  }),

  /** Divisão por 5: dividir por 10 e multiplicar por 2 */
  por5: (dividendo, resultado) => ({
    rapida: `Dividir por 5: divida por 10 e multiplique por 2!`,
    detalhada: `🦉 Dica da Luna — Dividir por 5:\nDivida por 10, depois multiplique por 2!\n\n${dividendo} ÷ 5\nPasso 1: ${dividendo} ÷ 10 = ${dividendo / 10}\nPasso 2: ${dividendo / 10} × 2 = ${resultado} ✓`,
  }),

  /** Estimativa progressiva */
  estimativa: (dividendo, divisor, resultado) => ({
    rapida: `Vá tentando! ${divisor} × 10 = ${divisor * 10}. Está perto de ${dividendo}?`,
    detalhada: `🦉 Dica da Luna — Estimativa:\nVá testando múltiplos até chegar perto!\n\n${dividendo} ÷ ${divisor} = ?\n${divisor} × ${Math.max(1, resultado - 2)} = ${divisor * Math.max(1, resultado - 2)}\n${divisor} × ${resultado - 1} = ${divisor * (resultado - 1)}\n${divisor} × ${resultado} = ${dividendo} ✓`,
  }),
};

/* ─────────────────────────────────────────────────────────
   Função principal: escolher a melhor dica para a questão
───────────────────────────────────────────────────────── */

/**
 * Escolhe a estratégia de dica mais adequada para a questão.
 * @param {{ operando1, operando2, operador, resposta }} questao
 * @param {number} nivelDica — 1 (rápida) | 2 (detalhada)
 * @returns {{ titulo: string, texto: string, estrategia: string }}
 */
export function gerarDica(questao, nivelDica = 1) {
  const { operando1, operando2, operador, resposta } = questao;
  const campo = nivelDica === 1 ? 'rapida' : 'detalhada';

  let estrategia;
  let nomeEstrategia;

  if (operador === '×') {
    const [a, b] = operando1 < operando2
      ? [operando1, operando2]
      : [operando2, operando1];

    if      (b === 2 || a === 2)  { estrategia = estrategiasMultiplicacao.por2(a);           nomeEstrategia = 'dobrar'; }
    else if (b === 4 || a === 4)  { estrategia = estrategiasMultiplicacao.por4(a);           nomeEstrategia = 'dobrar-duas-vezes'; }
    else if (b === 5 || a === 5)  { estrategia = estrategiasMultiplicacao.por5(a);           nomeEstrategia = 'por10-div2'; }
    else if (b === 8 || a === 8)  { estrategia = estrategiasMultiplicacao.por8(a);           nomeEstrategia = 'dobrar-tres-vezes'; }
    else if (b === 9 || a === 9)  { estrategia = estrategiasMultiplicacao.por9(a);           nomeEstrategia = 'por10-menos'; }
    else if (b === 11 || a === 11){ estrategia = estrategiasMultiplicacao.por11(Math.min(a, b)); nomeEstrategia = 'repetir-digito'; }
    else                          { estrategia = estrategiasMultiplicacao.decomposicao(operando1, operando2); nomeEstrategia = 'decomposicao'; }

  } else {
    // operador === '÷'
    const divisor    = operando2;
    const dividendo  = operando1;
    const resultado  = resposta;

    if      (divisor === 2) { estrategia = estrategiasDivisao.por2(dividendo, resultado);             nomeEstrategia = 'metade'; }
    else if (divisor === 4) { estrategia = estrategiasDivisao.por4(dividendo, resultado);             nomeEstrategia = 'div2-duas-vezes'; }
    else if (divisor === 5) { estrategia = estrategiasDivisao.por5(dividendo, resultado);             nomeEstrategia = 'div10-mul2'; }
    else                    {
      // Usar estimativa ou inverso alternadamente
      if (resultado <= 12)  { estrategia = estrategiasDivisao.inverso(dividendo, divisor, resultado); nomeEstrategia = 'inverso'; }
      else                  { estrategia = estrategiasDivisao.estimativa(dividendo, divisor, resultado); nomeEstrategia = 'estimativa'; }
    }
  }

  return {
    titulo: nivelDica === 1 ? '💡 Dica Rápida' : '📖 Passo a Passo',
    texto: estrategia[campo],
    estrategia: nomeEstrategia,
  };
}

/**
 * Gera a mensagem de encorajamento da Luna ao acertar.
 * @returns {string}
 */
export function mensagemAcerto() {
  const mensagens = [
    'Muito bem! Você está arrasando! 🎉',
    'Perfeito! Continue assim, você consegue! ⭐',
    'Excelente! Essa eu sabia que você ia acertar! 🦉',
    'Incrível! Você dominou essa! 🏆',
    'Isso mesmo! Cada acerto nos aproxima da vitória! ⚔️',
    'Uau! Que raciocínio rápido! 🚀',
  ];
  return mensagens[Math.floor(Math.random() * mensagens.length)];
}

/**
 * Gera a mensagem de encorajamento da Luna ao errar.
 * @returns {string}
 */
export function mensagemErro() {
  const mensagens = [
    'Não desanime! Errar faz parte do aprendizado. Veja minha dica! 🦉',
    'Quase lá! Vou te ajudar com uma estratégia! 💡',
    'Sem problemas! Vamos tentar de um jeito diferente! 📖',
    'Acontece com todos! Aprenda com a dica e tente novamente! 💪',
  ];
  return mensagens[Math.floor(Math.random() * mensagens.length)];
}
