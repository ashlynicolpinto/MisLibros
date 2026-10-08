import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Platform, Alert } from 'react-native';
import { AuthService } from '../services/AuthService';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const authService = new AuthService();

  const handleLogin = async () => {
    if (!email || !password) {
      const msg = 'Por favor ingresa tu correo y contraseña';
      Platform.OS === 'web' ? alert(msg) : Alert.alert('Error', msg);
      return;
    }

    setLoading(true);

    const exito = await authService.signIn(email, password);

    if (exito) {
      if (Platform.OS === 'web') {
        alert('¡Bienvenido!\nHas iniciado sesión correctamente.');
      } else {
        Alert.alert('¡Bienvenido!', 'Has iniciado sesión correctamente.');
      }
    }

    setLoading(false);
  };

  const handleSignUp = async () => {
    if (!email || !password) {
      const msg = 'Por favor ingresa tu correo y contraseña';
      Platform.OS === 'web' ? alert(msg) : Alert.alert('Error', msg);
      return;
    }

    setLoading(true);
    await authService.signUp(email, password);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Libros</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {loading ? (
        <ActivityIndicator size="large" color="#d81b60" style={styles.loader} />
      ) : (
        <>
          <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
            <Text style={styles.buttonText}>INICIAR SESIÓN</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={handleSignUp}>
            <Text style={styles.secondaryButtonText}>REGISTRARSE</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#ffe6f0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#000000',
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#000000',
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    fontSize: 16,
    color: '#000000',
  },
  primaryButton: {
    backgroundColor: '#d81b60',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1.5,
    borderColor: '#000000',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#000000',
  },
  secondaryButtonText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 15,
  },
  loader: {
    marginVertical: 20,
  },
});