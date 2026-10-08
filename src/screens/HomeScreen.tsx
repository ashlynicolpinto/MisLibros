import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { LibroService } from '../services/LibroService';
import { AuthService } from '../services/AuthService';
import { Libro } from '../models/Libro';

export const HomeScreen = () => {
  const [libros, setLibros] = useState<Libro[]>([]);
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [anio, setAnio] = useState('');

  const libroService = new LibroService();
  const authService = new AuthService();

  const cargarLibros = async () => {
    try {
      const data = await libroService.obtenerLibros();
      setLibros(data);
    } catch (error) {
      console.error('Error cargando libros:', error);
    }
  };

  useEffect(() => {
    cargarLibros();
  }, []);

  const handleAgregar = async () => {
    if (!titulo || !autor || !anio) {
      Alert.alert('Error', 'Por favor llena todos los campos');
      return;
    }

    const nuevoLibro = await libroService.agregarLibro({
      titulo,
      autor,
      anio: parseInt(anio, 10),
    });

    if (nuevoLibro) {
      setTitulo('');
      setAutor('');
      setAnio('');
      await cargarLibros();
    } else {
      Alert.alert('Error', 'No se pudo guardar el libro.');
    }
  };

  const handleEliminar = async (id?: number) => {
    if (!id) return;
    const ok = await libroService.eliminarLibro(id);
    if (ok) {
      await cargarLibros();
    }
  };

  return (
    <View style={styles.container}>
      {/* Botón utilizando AuthService para activar la alerta */}
      <TouchableOpacity style={styles.logoutButton} onPress={() => authService.signOut()}>
        <Text style={styles.logoutText}>CERRAR SESIÓN</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Agregar Nuevo Libro</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Título"
        placeholderTextColor="#666"
        value={titulo}
        onChangeText={setTitulo}
      />
      <TextInput
        style={styles.input}
        placeholder="Autor"
        placeholderTextColor="#666"
        value={autor}
        onChangeText={setAutor}
      />
      <TextInput
        style={styles.input}
        placeholder="Año"
        placeholderTextColor="#666"
        keyboardType="numeric"
        value={anio}
        onChangeText={setAnio}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleAgregar}>
        <Text style={styles.saveButtonText}>GUARDAR LIBRO</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Lista de Libros Guardados</Text>

      <FlatList
        data={libros}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.bookTitle}>{item.titulo}</Text>
              <Text style={styles.bookDetails}>{item.autor} ({item.anio})</Text>
            </View>
            <TouchableOpacity onPress={() => handleEliminar(item.id)}>
              <Text style={styles.deleteText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#ffe6f0'
  },
  logoutButton: { 
    backgroundColor: '#e91e63', 
    padding: 12, 
    alignItems: 'center', 
    marginBottom: 20, 
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#000000'
  },
  logoutText: { 
    color: '#ffffff', 
    fontWeight: 'bold',
    fontSize: 15 
  },
  sectionTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginVertical: 10, 
    color: '#000000' 
  },
  input: { 
    borderWidth: 1.5, 
    borderColor: '#000000',
    padding: 12, 
    marginBottom: 10, 
    borderRadius: 8, 
    backgroundColor: '#ffffff',
    fontSize: 16,
    color: '#000000'
  },
  saveButton: { 
    backgroundColor: '#d81b60', 
    padding: 14, 
    alignItems: 'center', 
    marginBottom: 20, 
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#000000'
  },
  saveButtonText: { 
    color: '#ffffff', 
    fontWeight: 'bold',
    fontSize: 16 
  },
  card: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    padding: 15, 
    borderWidth: 1.5, 
    borderColor: '#000000',
    marginBottom: 12, 
    borderRadius: 8, 
    backgroundColor: '#ffffff'
  },
  bookTitle: { 
    fontSize: 16, 
    fontWeight: 'bold',
    color: '#111111' 
  },
  bookDetails: {
    fontSize: 14,
    color: '#444444',
    marginTop: 2
  },
  deleteText: { 
    color: '#d32f2f', 
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 10 
  },
});