import { Alert, Platform } from 'react-native';
import { supabase } from '../lib/supabase';

export class AuthService {
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      this.mostrarMensaje('Error al iniciar sesión', error.message);
      return false;
    } else {
      this.mostrarMensaje('¡Bienvenido!', 'Has iniciado sesión correctamente.');
      return true;
    }
  }

  async signUp(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      this.mostrarMensaje('Error al registrarse', error.message);
      return false;
    } else {
      this.mostrarMensaje('¡Registro exitoso!', 'Tu cuenta ha sido creada. Ya puedes iniciar sesión.');
      return true;
    }
  }

  async signOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      this.mostrarMensaje('Error al cerrar sesión', error.message);
      return false;
    } else {
      this.mostrarMensaje('Sesión cerrada', 'Has cerrado sesión exitosamente.');
      return true;
    }
  }

  private mostrarMensaje(titulo: string, mensaje: string) {
    if (Platform.OS === 'web') {
      alert(`${titulo}\n${mensaje}`);
    } else {
      Alert.alert(titulo, mensaje);
    }
  }
}