import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { api } from '../services/api';
import {type  Usuario } from '../types';

interface AuthContextType {
  usuario: Usuario | null;
  isLoading: boolean;
  login: (email: string, senha: string) => Promise<void>;
  cadastrar: (dados: {
    nome: string;
    cpf: string;
    idade: number;
    genero: string;
    email: string;
    senha: string;
    telefone?: string;
  }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar se há usuário salvo no localStorage
    const usuarioSalvo = localStorage.getItem('usuario');
    if (usuarioSalvo) {
      try {
        setUsuario(JSON.parse(usuarioSalvo));
      } catch (error) {
        console.error('Erro ao carregar usuário:', error);
        localStorage.removeItem('usuario');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, senha: string) => {
    try {
      
      const usuarios = await api.getUsuarios();
      const usuarioEncontrado = usuarios.find(
        (u: Usuario) => u.email === email && u.senha === senha
      );

      if (!usuarioEncontrado) {
        throw new Error('Email ou senha incorretos');
      }

      setUsuario(usuarioEncontrado);
      localStorage.setItem('usuario', JSON.stringify(usuarioEncontrado));
    } catch (error) {
      throw error;
    }
  };

  const cadastrar = async (dados: {
    nome: string;
    cpf: string;
    idade: number;
    genero: string;
    email: string;
    senha: string;
    telefone?: string;
  }) => {
    try {
      // aqui a msm coisa, ve se ja existe o email que digitarem,
      const usuarios = await api.getUsuarios();
      const emailExiste = usuarios.some((u: Usuario) => u.email === dados.email);

      if (emailExiste) {
        throw new Error('Email já cadastrado');
      }

      //aqui é pra ver se CPF existe ou precisa criar outro
      const cpfExiste = usuarios.some((u: Usuario) => u.cpf === dados.cpf);
      if (cpfExiste) {
        throw new Error('CPF já cadastrado');
      }

      const novoUsuario = await api.criarUsuario(dados);
      setUsuario(novoUsuario);
      localStorage.setItem('usuario', JSON.stringify(novoUsuario));
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem('usuario');
  };

  return (
    <AuthContext.Provider value={{ usuario, isLoading, login, cadastrar, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};