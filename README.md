# Mis Libros 

Aplicación móvil y web desarrollada con **React Native (Expo)**, **TypeScript** y **Supabase** para la gestión CRUD de una base de datos de libros, incluyendo autenticación de usuarios y seguridad en el acceso a los datos.

---

## Relación entre Autenticación y Acceso a Datos

En esta aplicación, el acceso a los datos está estrictamente vinculado al estado de la sesión del usuario mediante la arquitectura de **Supabase Auth** y las políticas de seguridad **RLS (Row Level Security)**:

1. **Control de Navegación y Flujo de Sesión**:
   * El componente principal `App.tsx` escucha activamente los cambios de estado en la autenticación (`onAuthStateChange`).
   * Si no existe un usuario autenticado con un token JWT válido, la aplicación restringe el acceso visual y operativo, mostrando únicamente la pantalla de inicio de sesión (`LoginScreen`).
   * Una vez iniciada la sesión, las peticiones HTTP realizadas desde `LibroRepository` adjuntan automáticamente el token de acceso del usuario autenticado en las cabeceras.

2. **Seguridad a Nivel de Base de Datos (Row Level Security - RLS)**:
   * **Autenticación vs. Autorización**: La autenticación verifica la identidad del usuario (`AuthService`), mientras que la base de datos (PostgreSQL en Supabase) autoriza si dicho usuario tiene permiso para ejecutar consultas `SELECT`, `INSERT` o `DELETE` sobre la tabla `libros`.
   * **Políticas RLS**: A través de las políticas RLS habilitadas en la tabla `libros`, se garantiza que únicamente los usuarios con una sesión activa (`auth.role() = 'authenticated'`) puedan realizar operaciones CRUD, impidiendo el acceso anónimo no autorizado a nivel de API.

---

## Características

* **Autenticación completa**: Registro e inicio de sesión de usuarios con Supabase Auth.
* **Gestión de Libros (CRUD)**:
  * Consultar la lista de libros registrados.
  * Agregar nuevos libros con datos de título, autor y año de publicación.
  * Eliminar libros existentes.
* **Persistencia de sesión**: Mantener la sesión del usuario iniciada mediante `@react-native-async-storage/async-storage`.
* **Soporte Multiplataforma**: Funciona en Web, Android e iOS gracias a Expo.

---

## Tecnologías Utilizadas

* **Framework**: [Expo](https://expo.dev/) (React Native)
* **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
* **Base de Datos y Backend**: [Supabase](https://supabase.com/) (`@supabase/supabase-js`)
* **Almacenamiento Local**: `@react-native-async-storage/async-storage`
* **Polyfills**: `react-native-url-polyfill`

---

##  Estructura del Proyecto

```text
mis-libros/
├── src/
│   ├── lib/
│   │   └── supabase.ts          # Configuración e inicialización del cliente Supabase
│   ├── types/                   # Interfases y tipos de TypeScript (Libro.ts)
│   ├── repositories/
│   │   └── LibroRepository.ts   # Operaciones CRUD con la tabla 'libros'
│   ├── services/
│   │   └── AuthService.ts       # Servicios de Registro, Login y Logout
│   └── screens/
│       ├── LoginScreen.tsx      # Pantalla de autenticación
│       └── HomeScreen.tsx       # Pantalla principal con lista y formulario CRUD
├── App.tsx                      # Componente principal y control de sesión
├── package.json
└── README.md