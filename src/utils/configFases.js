/**
 * configFases.js
 * Configuração central das 5 fases do MathQuest.
 * Cada fase define: guardião, cenário, dificuldade, perguntas, tempo e textos narrativos.
 */

import imgKai       from '../assets/characters/kai.png';
import imgRoko      from '../assets/characters/roko.png';
import imgVentra    from '../assets/characters/ventra.png';
import imgIgnara    from '../assets/characters/ignara.png';
import imgAqualis   from '../assets/characters/aqualis.png';
import imgObscurus  from '../assets/characters/obscurus.png';

import imgPlanicies from '../assets/backgrounds/planicies_verdes.png';
import imgPicos     from '../assets/backgrounds/picos_vento.png';
import imgVulcao    from '../assets/backgrounds/vulcao_escarlate.png';
import imgAbismo    from '../assets/backgrounds/abismo_azul.png';
import imgCastelo   from '../assets/backgrounds/castelo_obscurus.png';

/* ─────────────────────────────────────────────────────────
   Configuração das 5 fases
───────────────────────────────────────────────────────── */
export const FASES = [
  {
    id: 1,
    nome: 'Planícies Verdes',
    subtitulo: 'Fase 1',
    cor: '#4caf50',
    corBorda: '#81c784',

    // Guardião
    nomeGuardiao: 'Roko',
    titulo: 'Guardião de Pedra',
    imagemGuardiao: imgRoko,
    vidaGuardiao: 100,

    // Herói
    imagemHeroi: imgKai,
    vidaHeroi: 100,

    // Cenário
    imagemFundo: imgPlanicies,
    bgm: '/sounds/bgm_fase1.ogg',

    // Mecânica
    dificuldade:    1,   // multiplicação básica (2-9)
    totalPerguntas: 10,
    tempoTotal:     120, // segundos

    // Narrativa — intro
    dialogoIntro: [
      {
        personagem: 'Roko, Guardião de Pedra',
        texto: 'Rrrrr... Você não passa por mim sem resolver meus desafios! Prepare-se para a batalha, jovem Calculista!',
      },
      {
        personagem: 'Luna',
        texto: 'Kai! Roko é lento mas forte. Responda rápido e use os truques das tabuadas que eu te ensinei. Você consegue! 💪',
      },
    ],

    // Narrativa — vitória
    dialogoVitoria: [
      {
        personagem: 'Roko, Guardião de Pedra',
        texto: 'Impos... sível... Fui derrotado pela matemática... Vá, jovem Calculista...',
      },
      {
        personagem: 'Luna',
        texto: 'Fantástico! Roko está derrotado! As Planícies Verdes estão livres! Rumo aos Picos do Vento! 🌟',
      },
    ],
  },

  {
    id: 2,
    nome: 'Picos do Vento',
    subtitulo: 'Fase 2',
    cor: '#29b6f6',
    corBorda: '#81d4fa',

    nomeGuardiao: 'Ventra',
    titulo: 'Espírito do Vento',
    imagemGuardiao: imgVentra,
    vidaGuardiao: 110,

    imagemHeroi: imgKai,
    vidaHeroi: 100,

    imagemFundo: imgPicos,
    bgm: '/sounds/bgm_fase2.ogg',

    dificuldade:    2,   // divisão básica (resultados inteiros)
    totalPerguntas: 12,
    tempoTotal:     110,

    dialogoIntro: [
      {
        personagem: 'Ventra, Espírito do Vento',
        texto: 'Haaa... o vento nunca para, assim como meus desafios! Você consegue dividir com a mesma velocidade do vento?',
      },
      {
        personagem: 'Luna',
        texto: 'Ventra usa divisões! Lembre-se: dividir é o inverso de multiplicar. 56 ÷ 8? Pense: 8 × ? = 56! Vai lá! 🦉',
      },
    ],

    dialogoVitoria: [
      {
        personagem: 'Ventra, Espírito do Vento',
        texto: '...O vento que carrego em mim foi vencido... Você é mais rápido do que eu esperava, Calculista...',
      },
      {
        personagem: 'Luna',
        texto: 'Arrasou! Divisões dominadas! Os Picos do Vento estão liberados. Mas cuidado — o Vulcão Escarlate vai ser quente! 🔥',
      },
    ],
  },

  {
    id: 3,
    nome: 'Vulcão Escarlate',
    subtitulo: 'Fase 3',
    cor: '#ff7043',
    corBorda: '#ff8a65',

    nomeGuardiao: 'Ignara',
    titulo: 'Dragão de Fogo',
    imagemGuardiao: imgIgnara,
    vidaGuardiao: 120,

    imagemHeroi: imgKai,
    vidaHeroi: 100,

    imagemFundo: imgVulcao,
    bgm: '/sounds/bgm_fase3.ogg',

    dificuldade:    3,   // mix: multiplicação e divisão, até 20
    totalPerguntas: 14,
    tempoTotal:     100,

    dialogoIntro: [
      {
        personagem: 'Ignara, Dragão de Fogo',
        texto: 'RAAARGGH! Meu fogo consumirá sua mente! Aqui você terá que multiplicar E dividir — ao mesmo tempo!',
      },
      {
        personagem: 'Luna',
        texto: 'Ignara mistura tudo! Leia bem a operação antes de responder. Com calma e técnica, você supera qualquer dragão! 🦉🔥',
      },
    ],

    dialogoVitoria: [
      {
        personagem: 'Ignara, Dragão de Fogo',
        texto: '...Meu fogo... apagado... pela lógica... Como?!',
      },
      {
        personagem: 'Luna',
        texto: 'INCRÍVEL! Você venceu o Dragão! O Vulcão Escarlate esfria! Agora o Abismo Azul nos espera... prepare-se! 🌊',
      },
    ],
  },

  {
    id: 4,
    nome: 'Abismo Azul',
    subtitulo: 'Fase 4',
    cor: '#7c4dff',
    corBorda: '#b388ff',

    nomeGuardiao: 'Aqualis',
    titulo: 'Serpente do Abismo',
    imagemGuardiao: imgAqualis,
    vidaGuardiao: 130,

    imagemHeroi: imgKai,
    vidaHeroi: 100,

    imagemFundo: imgAbismo,
    bgm: '/sounds/bgm_fase4.mp3',

    dificuldade:    4,   // operandos maiores (até 50)
    totalPerguntas: 16,
    tempoTotal:     90,

    dialogoIntro: [
      {
        personagem: 'Aqualis, Serpente do Abismo',
        texto: '...Ssss... Bem-vindo ao meu domínio... As profundezas guardam segredos que apenas os mais sábios conseguem calcular...',
      },
      {
        personagem: 'Luna',
        texto: 'Aqualis é a mais traiçoeira! Números grandes, tempo curto. Decomponha tudo em partes menores. Você está pronto! 💙',
      },
    ],

    dialogoVitoria: [
      {
        personagem: 'Aqualis, Serpente do Abismo',
        texto: '...Ssssuperado... pelo conhecimento... Vá... antes que eu mude de ideia...',
      },
      {
        personagem: 'Luna',
        texto: 'EXTRAORDINÁRIO! Aqualis dominada! O Abismo é nosso! Uma última fase... Obscurus nos espera no castelo! ⚡',
      },
    ],
  },

  {
    id: 5,
    nome: 'Castelo de Obscurus',
    subtitulo: 'Fase 5 — Boss Final',
    cor: '#e040fb',
    corBorda: '#ce93d8',

    nomeGuardiao: 'Obscurus',
    titulo: 'O Feiticeiro das Trevas',
    imagemGuardiao: imgObscurus,
    vidaGuardiao: 150,

    imagemHeroi: imgKai,
    vidaHeroi: 100,

    imagemFundo: imgCastelo,
    bgm: '/sounds/bgm_fase5.mp3',

    dificuldade:    5,   // todos os tipos, operandos até 99
    totalPerguntas: 20,
    tempoTotal:     80,

    dialogoIntro: [
      {
        personagem: 'Obscurus, O Feiticeiro das Trevas',
        texto: 'Ah... o pequeno Calculista chegou até mim. Impressionante. Mas ninguém derrota as trevas com simples cálculos!',
      },
      {
        personagem: 'Luna',
        texto: 'Kai... esse é o momento. Tudo que aprendemos até aqui vai ser usado agora. Eu acredito em você. Vamos terminar isso! 🦉⭐',
      },
    ],

    dialogoVitoria: [
      {
        personagem: 'Obscurus, O Feiticeiro das Trevas',
        texto: '...IMPOSSÍVEL! Derrotado... por números... A matemática... mais poderosa do que imaginei...',
      },
      {
        personagem: 'Luna',
        texto: 'VOCÊ FEZ ISSO! Obscurus foi derrotado! O Reino dos Números está salvo! Você é um verdadeiro Mestre Calculista! 🏆✨',
      },
    ],
  },
];

/* Acesso por ID */
export const getFase = (id) => FASES.find(f => f.id === id) ?? FASES[0];

/* Total de fases */
export const TOTAL_FASES = FASES.length;
