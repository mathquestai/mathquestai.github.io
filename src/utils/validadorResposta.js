/**
 * validadorResposta.js
 * Valida a resposta do aluno comparando com a resposta correta.
 * Aceita pequenas variações de digitação (espaços).
 */

/**
 * Valida se a resposta do usuário está correta.
 * @param {string|number} respostaUsuario
 * @param {number}        respostaCorreta
 * @returns {boolean}
 */
export function validarResposta(respostaUsuario, respostaCorreta) {
  if (respostaUsuario === '' || respostaUsuario === null || respostaUsuario === undefined) {
    return false;
  }
  const valor = parseInt(String(respostaUsuario).trim(), 10);
  if (isNaN(valor)) return false;
  return valor === respostaCorreta;
}
