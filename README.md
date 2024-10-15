# Proyecto de Coworking 🏢

## 1. Descripción del Proyecto

Este proyecto es una plataforma de renta de oficinas de coworking donde los usuarios pueden buscar, reservar y gestionar espacios de trabajo en diversas ubicaciones. Los administradores tienen la capacidad de manejar el catálogo de oficinas, gestionar reservas y recibir pagos. El proyecto está dividido en **Frontend** y **Backend**.

---

# Frontend del Proyecto de Coworking 🌐

## 1. Descripción del Proyecto

Este frontend corresponde a una plataforma de renta de oficinas de coworking, permitiendo a los usuarios buscar, reservar y gestionar oficinas de trabajo compartido. Los administradores pueden manejar el catálogo de oficinas y gestionar reservas, mientras que los usuarios pueden explorar oficinas y hacer reservas personalizadas. La aplicación está desarrollada con **Next.js** y **Tailwind CSS** para una interfaz optimizada y responsiva.

## 2. Tecnologías Usadas

-   **Next.js**: Framework de React para aplicaciones web renderizadas en el servidor.
-   **Tailwind CSS**: Para el diseño responsivo y el estilo de la interfaz.
-   **Zustand**: Para el manejo de estado global de las oficinas.
-   **Axios**: Para realizar solicitudes HTTP al backend.
-   **React Toastify**: Para mostrar notificaciones.
-   **Formik & Yup**: Para manejo y validación de formularios.

## 3. Configuración del Entorno

El proyecto requiere un archivo `.env.local` en la raíz para las variables de entorno. Estas variables incluyen:

```plaintext
NEXT_PUBLIC_API_URL= # URL de la API del backend
```

## 4. Instalación y Ejecución

### Paso 1: Clonar el Repositorio

```bash
git clone https://github.com/PF-04-Coworking/coworkingPF.git
cd frontend
```

### Paso 2: Instalar Dependencias

```bash
npm install
```

### Paso 3: Ejecutar la Aplicación

-   **Modo desarrollo**:

```bash
npm run dev
```

-   **Modo producción**:

```bash
npm run build
npm run start
```

## 5. Componentes y Páginas Principales

### Páginas

-   **Página de Inicio:**
    Muestra las oficinas destacadas y una opción para registrarse o iniciar sesión.
-   **Página de Búsqueda de Oficinas:**
    Permite a los usuarios buscar oficinas disponibles, filtrarlas y ver detalles específicos.
-   **Dashboard de Administrador:**
    Panel donde los administradores pueden gestionar oficinas, revisar y aceptar reservas.
-   **Página de Reserva:**
    Proceso de reserva donde los usuarios seleccionan fechas, revisan precios y completan el pago.

### Componentes

-   **Componentes de Formulario:**
    Componentes personalizados para el inicio de sesión, registro y validación de datos usando Formik y Yup.
-   **Notificaciones:**
    Implementadas con React Toastify para mostrar mensajes de éxito o error en el frontend.

## 6. Manejo de Estado Global

El proyecto usa **Zustand** para manejar el estado global de las oficinas, centralizando la información sobre oficinas disponibles y facilitando acciones como agregar, actualizar y eliminar oficinas. La configuración de Zustand se encuentra en `src/stores/useOfficesStore.tsx` y contiene métodos para manipular el estado de las oficinas en la aplicación.

## 7. Configuración de Axios

Axios se configura en un archivo central llamado `apiConfig`, que define la instancia de Axios (`axiosClient`). Las funciones de autenticación (registro e inicio de sesión) utilizan esta configuración a través del archivo `apiAuth`.

## 8. Estilos y UI

Para los estilos, la aplicación utiliza **Tailwind CSS**, facilitando la creación de una interfaz moderna y responsiva.

## 9. Documentación de la API

Para detalles sobre los endpoints que utiliza el frontend, consulta la documentación Swagger del backend disponible en `/api-docs`.

# Backend del Proyecto de Coworking 🛠️

## 2. Arquitectura del Proyecto

El backend está construido en NestJS y TypeORM, organizado en módulos para facilitar el mantenimiento y escalabilidad:

-   **Auth**: Manejo de autenticación mediante JWT y Google OAuth.
-   **Offices**: CRUD de oficinas, incluyendo la carga de imágenes para cada oficina.
-   **Reservations**: Gestión de reservas, permitiendo que los usuarios creen, actualicen y cancelen sus reservas.
-   **Payments**: Integración con Stripe para el procesamiento de pagos.
-   **File-Upload**: Manejo de la carga de archivos mediante Cloudinary, tanto para imágenes de oficinas como de usuarios.

### Diagrama de la Base de Datos

La estructura de la base de datos incluye las entidades principales `User`, `Office`, y `Reservation`, y sus relaciones, representadas en el siguiente diagrama ER.

![Diagrama ER](<./Diagrama_de_base_de_datos_PF_(Coworking_rental).png>)

## 3. Configuración del Entorno

Para configurar el entorno, es necesario crear un archivo `.env` en la raíz del proyecto con las siguientes variables (sin exponer valores sensibles):

```plaintext
DATABASE_URL= # URL de conexión a la base de datos PostgreSQL
JWT_SECRET=   # Clave secreta para JWT
CLOUDINARY_CLOUD_NAME= # Nombre del Cloudinary Cloud
CLOUDINARY_API_KEY=    # Clave de API de Cloudinary
CLOUDINARY_API_SECRET= # Secreto de API de Cloudinary
STRIPE_SECRET_KEY=     # Clave secreta para Stripe
```

## 4. Instalación y Ejecución

### Paso 1: Clonar el Repositorio

```bash
git clone https://github.com/PF-04-Coworking/coworkingPF.git
cd backend
```

### Paso 2: Instalar Dependencias

```bash
npm install
```

### Paso 3: Ejecutar la Aplicación

-   **Modo desarrollo**:

```bash
npm run start:dev
```

-   **Modo producción**:

```bash
npm run start:prod
```

### Paso 4: Pruebas

-   **Pruebas unitarias**:

```bash
npm run test
```

### 5. Endpoints y Funcionalidades Principales

### Autenticación (`/auth`)

Implementa autenticación mediante JWT para sesiones de usuario y Google OAuth para autenticación externa.

### Oficinas (`/offices`)

Módulo que permite a los administradores gestionar oficinas de coworking:

-   **GET** `/offices`: Obtiene la lista de oficinas, con filtros de búsqueda.
-   **GET** `/offices/:id`: Muestra los detalles de una oficina específica.
-   **POST** `/offices`: Crea una nueva oficina (solo administradores).
-   **PUT** `/offices/:id`: Actualiza la información de una oficina (solo administradores).
-   **DELETE** `/offices/:id`: Elimina una oficina (solo administradores).

### Reservas (`/reservations`)

Módulo que permite a los usuarios crear y gestionar reservas:

-   **GET** `/reservations`: Muestra todas las reservas (solo para administradores).
-   **POST** `/reservations`: Crea una nueva reserva.
-   **PUT** `/reservations/:id`: Actualiza una reserva existente (solo administradores).
-   **DELETE** `/reservations/:id`: Elimina una reserva específica (solo administradores).
-   **PUT** `/reservations/cancel/:id`: Cancela una reserva (solo administradores).

### Pagos (`/payments`)

Módulo que maneja la integración con Stripe para procesar pagos de las reservas:

-   **POST** `/payments/create-payment-intent`: Crea un intento de pago y devuelve un `client_secret` para proceder con el pago.

### Carga de Archivos (`/files`)

Permite la carga de imágenes para usuarios y oficinas usando Cloudinary:

-   **POST** `/files/uploadUserImage/:id`: Sube una imagen de perfil para un usuario.
-   **POST** `/files/uploadOfficeImage/:id`: Sube una imagen para una oficina.

## 6. Integración con Servicios Externos

-   **Stripe**: Utilizado para manejar los pagos de las reservas.
-   **Cloudinary**: Usado para almacenar imágenes de usuarios y oficinas.
-   **Nodemailer**: Para el envío de correos electrónicos de confirmación de reservas y otras notificaciones.

## 7. Documentación de la API

La documentación interactiva de los endpoints está disponible a través de Swagger en `/api-docs`.