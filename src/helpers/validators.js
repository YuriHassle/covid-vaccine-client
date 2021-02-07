import { isValidCPF } from './utils';

export class Validator {
  static required(msg) {
    return v => !!v || msg || 'Este campo é obrigatório';
  }

  static email() {
    return v => /.+@.+/.test(v) || 'E-mail precisa ter um formato válido';
  }

  static max(n) {
    return v => !v || v.length <= n || `O número máximo de caracteres é ${n}`;
  }

  static min(n) {
    return v => !v || v.length >= n || `O número mínimo de caracteres é ${n}`;
  }

  static len(n) {
    return v => !v || v.length === n || `O número de caracteres deve ser ${n}`;
  }
  static validateCPF() {
    return v => !v || isValidCPF(v) || 'Número de CPF inexistente';
  }
}
