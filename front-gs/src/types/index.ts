export interface Usuario {
  id: number;
  nome: string;
  cpf: string;
  idade: number;
  genero: string;
  email: string;
  senha?: string;
  telefone?: string;
  pontuacao?: number;
  nivel?: number;
}

export interface SessaoFoco {
  id?: number;
  usuarioId: number;
  dataInicio: string;
  dataFim?: string;
  duracao?: number;
  tipo: 'foco' | 'pausa' | 'respiracao';
  notaQualidade?: number;
}

export interface Sentimento {
  id?: number;
  usuarioId: number;
  tipo: 'feliz' | 'calmo' | 'neutro' | 'ansioso' | 'estressado' | 'focado';
  intensidade: number;
  observacoes?: string;
  dataRegistro: string;
}

export interface Conquista {
  id: string;
  titulo: string;
  descricao: string;
  icone: string;
  desbloqueada: boolean;
  progresso?: number;
  meta?: number;
}
