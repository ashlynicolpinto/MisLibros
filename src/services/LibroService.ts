import { Libro } from '../models/Libro';
import { LibroRepository } from '../repositories/LibroRepository';

export class LibroService {
  private repository: LibroRepository;

  constructor() {
    this.repository = LibroRepository.getInstance();
  }

  async obtenerLibros(): Promise<Libro[]> {
    return await this.repository.obtenerLibros();
  }

  async agregarLibro(libro: Omit<Libro, 'id' | 'created_at'>): Promise<Libro | null> {
    return await this.repository.agregarLibro(libro);
  }

  async eliminarLibro(id: number): Promise<boolean> {
    return await this.repository.eliminarLibro(id);
  }

  obtenerInstanciaRepo(): LibroRepository {
    return this.repository;
  }
}