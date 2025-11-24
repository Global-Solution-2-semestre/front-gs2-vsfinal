const API_BASE = 'https://zenhub-render.onrender.com';

export const api = {

  async getUsuarios() {
    const response = await fetch(`${API_BASE}/usuarios`);
    if (!response.ok) throw new Error('Erro ao buscar usuários');
    return response.json();
  },

  async getUsuario(id: number) {
    const response = await fetch(`${API_BASE}/usuarios/${id}`);
    if (!response.ok) throw new Error('Erro ao buscar usuário');
    return response.json();
  },

  async criarUsuario(usuario: { 
    nome: string; 
    cpf: string; 
    idade: number; 
    genero: string; 
    email: string; 
    senha: string;
    telefone?: string;
  }) {
    const response = await fetch(`${API_BASE}/usuarios`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usuario),
    });
    if (!response.ok) throw new Error('Erro ao criar usuário');
    return response.json();
  },

  async atualizarUsuario(id: number, usuario: Partial<{ 
    nome: string; 
    cpf: string; 
    idade: number; 
    genero: string; 
    email: string; 
    senha: string;
    telefone?: string;
  }>) {
    const response = await fetch(`${API_BASE}/usuarios/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usuario),
    });
    if (!response.ok) throw new Error('Erro ao atualizar usuário');
    return response.json();
  },

  async getSessoes() {
    const response = await fetch(`${API_BASE}/sessoes`);
    if (!response.ok) throw new Error('Erro ao buscar sessões');
    return response.json();
  },

  async criarSessao(sessao: any) {
    const response = await fetch(`${API_BASE}/sessoes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sessao),
    });
    if (!response.ok) throw new Error('Erro ao criar sessão');
    return response.json();
  },

  async atualizarSessao(id: number, sessao: any) {
    const response = await fetch(`${API_BASE}/sessoes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sessao),
    });
    if (!response.ok) throw new Error('Erro ao atualizar sessão');
    return response.json();
  },

  async deletarSessao(id: number) {
    const response = await fetch(`${API_BASE}/sessoes/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Erro ao deletar sessão');
  },

  async getSentimentos() {
    const response = await fetch(`${API_BASE}/sentimentos`);
    if (!response.ok) throw new Error('Erro ao buscar sentimentos');
    return response.json();
  },

  async criarSentimento(sentimento: any) {
    const response = await fetch(`${API_BASE}/sentimentos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sentimento),
    });
    if (!response.ok) throw new Error('Erro ao criar sentimento');
    return response.json();
  },

  async atualizarSentimento(id: number, sentimento: any) {
    const response = await fetch(`${API_BASE}/sentimentos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sentimento),
    });
    if (!response.ok) throw new Error('Erro ao atualizar sentimento');
    return response.json();
  },

  async deletarSentimento(id: number) {
    const response = await fetch(`${API_BASE}/sentimentos/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Erro ao deletar sentimento');
  },
};
