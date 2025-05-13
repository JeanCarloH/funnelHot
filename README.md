# Sistema de Gestión de Trámites

Aplicación web para la gestión de trámites y usuarios desarrollada con Next.js, React, TypeScript y Material UI.

## Descripción

Este sistema permite administrar usuarios y trámites, con un flujo de autenticación y acceso a rutas protegidas. La aplicación está construida utilizando tecnologías modernas como Next.js, React y TypeScript, con Material UI como biblioteca de componentes visuales.

## Características

- ✅ Autenticación de usuarios
- ✅ Rutas protegidas
- ✅ CRUD completo de usuarios
- ✅ CRUD completo de trámites
- ✅ Asignación de trámites a usuarios
- ✅ Filtrado y búsqueda de información
- ✅ Interfaz responsiva y amigable
- ✅ Testing con Jest y React Testing Library (fallando, solo se crearon)

## Requisitos previos

- Node.js (v14 o superior)
- npm o yarn
- Backend API funcionando en http://localhost:4000 (ver sección "Backend")

## Instalación

1. Clonar el repositorio:
   ```bash
   git clone https://gestionusuarios-admin@bitbucket.org/gestionusuarios/backendgestionusuarios.git
   ```

2. Instalar dependencias:
   ```bash
   npm install
   # O usando yarn
   yarn install
   ```

3. Ejecutar en modo desarrollo (RECOMENDADA):
   ```bash
   npm run dev
   # O usando yarn
   yarn dev
   ```

4. Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

## Compilación para producción

```bash
npm run build
npm run start
# O usando yarn
yarn build
yarn start
```

## Backend

Esta aplicación frontend requiere un backend API corriendo en http://localhost:3000 con las siguientes rutas:

- `GET /api/users` - Obtener todos los usuarios
- `POST /api/users/createUser` - Crear un nuevo usuario
- `PUT /api/users/:id` - Actualizar un usuario
- `DELETE /api/users/:id` - Eliminar un usuario
- `GET /api/tramites` - Obtener todos los trámites
- `POST /api/tramites/createProcess` - Crear un nuevo trámite
- `PUT /api/tramites/:id` - Actualizar un trámite
- `DELETE /api/tramites/:id` - Eliminar un trámite

Mientras configuras el backend, la aplicación utiliza datos mockeados para demostración.

## Credenciales de acceso

Para acceder al sistema, utiliza las siguientes credenciales:

```
Email: jeancarlocj14@gmail.com
Contraseña: 123456
```

## Pruebas (Testing)dsd

El proyecto incluye pruebas unitarias utilizando Jest y React Testing Library. Para ejecutar las pruebas:

```bash
npm test
# O usando yarn
yarn test
```

Para ejecutar pruebas con cobertura:

```bash
npm test -- --coverage
# O usando yarn
yarn test --coverage
```

## Arquitectura del proyecto

### Arquitectura general

El proyecto sigue una arquitectura de **Clean Architecture** adaptada a una aplicación frontend, con una clara separación de responsabilidades:

1. **Capa de presentación**: Componentes React
2. **Capa de aplicación**: Hooks personalizados y contextos
3. **Capa de dominio**: Definición de tipos y modelos
4. **Capa de infraestructura**: Servicios API y mocks

### Estructura de carpetas

```
src/
├── app/                  # Páginas principales (Next.js App Router)
├── components/           # Componentes reutilizables
├── hooks/                # Hooks personalizados (lógica de negocio)
├── lib/                  # Utilidades y funciones auxiliares
├── mocks/                # Datos mock
├── services/             # Servicios API
├── store/                # Estado global (Zustand)
├── theme/                # Configuración de tema
└── types/                # Definiciones de tipos TypeScript
```

### Patrones de diseño utilizados

1. **Componentes HOC (Higher-Order Components)**: Como `ProtectedRoute` para controlar el acceso a rutas protegidas.
2. **Custom Hooks**: Separación de la lógica de negocio en hooks como `useAuth`.
3. **Container/Presentational Pattern**: Separación entre la lógica de negocio y la presentación.
4. **Flux Pattern (con Zustand)**: Para manejo del estado global de la aplicación.
5. **Dependency Injection**: Inyección de dependencias para facilitar pruebas y mantener bajo acoplamiento.

### ¿Por qué Next.js?

Se eligió Next.js como framework por varias razones:

1. **Rendimiento**: Ofrece renderizado del lado del servidor (SSR) y generación estática para mejor rendimiento y SEO.
2. **Enrutamiento**: Sistema de enrutamiento integrado y sencillo.
3. **Escalabilidad**: Soporte para aplicaciones desde pequeñas hasta gran escala.
4. **TypeScript**: Soporte nativo para TypeScript.
5. **API Routes**: Facilidad para crear endpoints API en el mismo proyecto.

### ¿Por qué Zustand para manejo de estado?

Se eligió Zustand por:

1. **Simplicidad**: API minimalista y fácil de entender.
2. **Rendimiento**: Excelente rendimiento sin re-renderizados innecesarios.
3. **TypeScript**: Excelente soporte para tipos.
4. **Sin boilerplate**: Menos código repetitivo comparado con Redux.
5. **Sin Provider**: No requiere Context Provider.

### ¿Por qué Material UI?

Material UI se seleccionó como biblioteca de componentes porque:

1. **Diseño**: Componentes con diseño profesional y consistente.
2. **Personalización**: Sistema de temas potente y flexible.
3. **Accesibilidad**: Componentes accesibles por defecto.
4. **Componentes ricos**: Gran variedad de componentes listos para usar.
5. **Comunidad**: Gran comunidad y soporte.

