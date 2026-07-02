/**
 * geradorQuestoes.js
 * Gera questões aleatórias de multiplicação e divisão com dificuldade parametrizável.
 *
 * Dificuldade 1 — multiplicação básica (tabuadas de 2 a 9)
 * Dificuldade 2 — divisão básica (resultado inteiro, divisores 2-9)
 * Dificuldade 3 — mix: multiplicação e divisão, operandos até 20
 * Dificuldade 4 — operandos maiores (até 50), fatores compostos
 * Dificuldade 5 — todos os tipos, alta pressão (operandos até 99)
 */

const FAIXAS = {
  1: { min: 2, max: 9,  operadores: ['×'] },
  2: { min: 2, max: 9,  operadores: ['÷'] },
  3: { min: 2, max: 20, operadores: ['×', '÷'] },
  4: { min: 2, max: 50, operadores: ['×', '÷'] },
  5: { min: 2, max: 99, operadores: ['×', '÷'] },
};

/**
 * Retorna um inteiro aleatório entre min e max (inclusive).
 */
function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Escolhe um item aleatório de um array.
 */
function escolher(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Gera uma questão de multiplicação ou divisão.
 * @param {number} dificuldade — 1 a 5
 * @returns {{ operando1: number, operando2: number, operador: string, resposta: number, id: string }}
 */
export function gerarQuestao(dificuldade = 1) {
  const faixa = FAIXAS[dificuldade] ?? FAIXAS[1];
  const operador = escolher(faixa.operadores);

  let operando1, operando2, resposta;

  if (operador === '×') {
    operando1 = aleatorio(faixa.min, faixa.max);
    operando2 = aleatorio(faixa.min, faixa.max);
    resposta  = operando1 * operando2;
  } else {
    // Para divisão: garantir resultado inteiro
    // Gera a multiplicação e inverte
    operando2 = aleatorio(faixa.min, Math.min(faixa.max, 12)); // divisor razoável
    resposta  = aleatorio(faixa.min, faixa.max);
    operando1 = operando2 * resposta; // dividendo
  }

  return {
    operando1,
    operando2,
    operador,
    resposta,
    id: `${Date.now()}-${Math.random()}`,
  };
}

/**
 * Gera um lote de questões únicas para uma fase.
 * @param {number} dificuldade
 * @param {number} quantidade
 * @returns {Array}
 */
export function gerarLoteQuestoes(dificuldade = 1, quantidade = 10) {
  const questoes = [];
  const vistas = new Set();

  let tentativas = 0;
  while (questoes.length < quantidade && tentativas < quantidade * 10) {
    const q = gerarQuestao(dificuldade);
    const chave = `${q.operando1}${q.operador}${q.operando2}`;
    if (!vistas.has(chave)) {
      vistas.add(chave);
      questoes.push(q);
    }
    tentativas++;
  }

  return questoes;
}
