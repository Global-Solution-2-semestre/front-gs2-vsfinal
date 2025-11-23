import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/UserContext';
import { Card } from '../components/card';
import { Input } from '../components/input';
import { Button } from '../components/button';

export default function Auth() {
  const navigate = useNavigate();
  const { cadastrar, login } = useAuth();
  const [modo, setModo] = useState<'login' | 'cadastro'>('login');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    idade: '',
    genero: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    telefone: '',
  });

  const formatarCPF = (valor: string) => {
    const numeros = valor.replace(/\D/g, '');
    return numeros
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  const formatarTelefone = (valor: string) => {
    const numeros = valor.replace(/\D/g, '');
    return numeros
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1');
  };

  const validarCPF = (cpf: string) => {
    const numeros = cpf.replace(/\D/g, '');
    return numeros.length === 11;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setLoading(true);

    try {
      if (modo === 'cadastro') {
        if (!formData.nome.trim()) throw new Error('Nome é obrigatório');
        if (!validarCPF(formData.cpf)) throw new Error('CPF inválido (deve ter 11 dígitos)');
        const idade = parseInt(formData.idade);
        if (!idade || idade < 13 || idade > 120) throw new Error('Idade deve estar entre 13 e 120 anos');
        if (!formData.genero) throw new Error('Gênero é obrigatório');
        if (formData.senha.length < 6) throw new Error('A senha deve ter no mínimo 6 caracteres');
        if (formData.senha !== formData.confirmarSenha) throw new Error('As senhas não coincidem');

        await cadastrar({
          nome: formData.nome,
          cpf: formData.cpf.replace(/\D/g, ''),
          idade: idade,
          genero: formData.genero,
          email: formData.email,
          senha: formData.senha,
          telefone: formData.telefone ? formData.telefone.replace(/\D/g, '') : undefined,
        });
      } else {
        await login(formData.email, formData.senha);
      }

      navigate('/dashboard');
    } catch (error: any) {
      setErro(error.message || 'Erro ao processar solicitação');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-focus flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4 animate-float">🧠</div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            <span className="bg-gradient-primary bg-clip-text text-transparent">ZenSoft</span>
          </h1>
          <p className="text-muted-foreground">
            {modo === 'login' ? 'Bem-vindo de volta!' : 'Comece sua jornada de bem-estar'}
          </p>
        </div>

        <Card variant="glow">
          <form onSubmit={handleSubmit} className="space-y-6">
            {modo === 'cadastro' && (
              <>
                <Input
                  label="Nome Completo *"
                  type="text"
                  placeholder="Seu nome completo"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  required
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="CPF *"
                    type="text"
                    placeholder="000.000.000-00"
                    value={formData.cpf}
                    onChange={(e) => setFormData({ ...formData, cpf: formatarCPF(e.target.value) })}
                    maxLength={14}
                    required
                  />

                  <Input
                    label="Idade *"
                    type="number"
                    placeholder="Sua idade"
                    value={formData.idade}
                    onChange={(e) => setFormData({ ...formData, idade: e.target.value })}
                    min="13"
                    max="120"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Gênero *</label>
                  <select
                    value={formData.genero}
                    onChange={(e) => setFormData({ ...formData, genero: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 bg-card text-foreground transition-all duration-300"
                    required
                  >
                    <option value="">Selecione...</option>
                    <option value="masculino">Masculino</option>
                    <option value="feminino">Feminino</option>
                    <option value="outro">Outro</option>
                    <option value="prefiro-nao-informar">Prefiro não informar</option>
                  </select>
                </div>

                <Input
                  label="Telefone (opcional)"
                  type="tel"
                  placeholder="(00) 00000-0000"
                  value={formData.telefone}
                  onChange={(e) => setFormData({ ...formData, telefone: formatarTelefone(e.target.value) })}
                  maxLength={15}
                />
              </>
            )}

            <Input
              label="Email *"
              type="email"
              placeholder="seu@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />

            <Input
              label="Senha *"
              type="password"
              placeholder="Mínimo 6 caracteres"
              value={formData.senha}
              onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
              required
            />

            {modo === 'cadastro' && (
              <Input
                label="Confirmar Senha *"
                type="password"
                placeholder="Confirme sua senha"
                value={formData.confirmarSenha}
                onChange={(e) => setFormData({ ...formData, confirmarSenha: e.target.value })}
                required
              />
            )}

            {erro && (
              <div className="p-4 rounded-xl bg-destructive/10 border border-destructive text-destructive text-sm">
                {erro}
              </div>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Processando...' : modo === 'login' ? 'Entrar' : 'Criar Conta'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => {
                setModo(modo === 'login' ? 'cadastro' : 'login');
                setErro('');
                setFormData({
                  nome: '',
                  cpf: '',
                  idade: '',
                  genero: '',
                  email: '',
                  senha: '',
                  confirmarSenha: '',
                  telefone: '',
                });
              }}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {modo === 'login' ? (
                <>Não tem conta? <span className="text-primary font-semibold">Cadastre-se</span></>
              ) : (
                <>Já tem conta? <span className="text-primary font-semibold">Faça login</span></>
              )}
            </button>
          </div>
        </Card>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/')}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Voltar para página inicial
          </button>
        </div>
      </div>
    </div>
  );
}
