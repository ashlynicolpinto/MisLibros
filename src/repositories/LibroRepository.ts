import { supabase } from '../lib/supabase';
import { Libro } from '../models/Libro';

export class LibroRepository {
  private static instance: LibroRepository;

  public static getInstance(): LibroRepository {
    if (!LibroRepository.instance) {
      LibroRepository.instance = new LibroRepository();
    }
    return LibroRepository.instance;
  }

  async obtenerLibros(): Promise<Libro[]> {
    const { data, error } = await supabase
      .from('libros')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error al obtener libros:', error.message);
      return [];
    }

    return data || [];
  }

  async agregarLibro(libro: Omit<Libro, 'id' | 'created_at'>): Promise<Libro | null> {
    const { data, error } = await supabase
      .from('libros')
      .insert([libro])
      .select()
      .single();

    if (error) {
      console.error('Error al agregar libro:', error.message);
      return null;
    }

    return data;
  }

  async eliminarLibro(id: number): Promise<boolean> {
    const { error } = await supabase
      .from('libros')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error al eliminar libro:', error.message);
      return false;
    }

    return true;
  }
}