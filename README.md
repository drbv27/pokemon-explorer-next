# 🚀 Pokémon Explorer - Desafío Técnico Litsight

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js"/>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"/>
  <img src="https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge&logo=shadcnui&logoColor=white" alt="Shadcn/UI"/>
  <img src="https://img.shields.io/badge/Zustand-000000?style=for-the-badge&logo=zustand&logoColor=white" alt="Zustand"/>
  <img src="https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white" alt="TanStack Query"/>
</div>

<br/>

Una aplicación web moderna y 100% responsiva para explorar los Pokémon de la primera generación, construida con las mejores prácticas y un fuerte enfoque en la experiencia de usuario.

---

### 📸 Capturas de Pantalla

<table>
  <tr>
    <td align="center">
      Grid Desktop<br>
      <img src="https://raw.githubusercontent.com/drbv27/pokemon-explorer-next/main/public/screen1.jpeg" alt="Grid Desktop" width="400"/>
    </td>
    <td align="center">
      Table Desktop<br>
      <img src="https://raw.githubusercontent.com/drbv27/pokemon-explorer-next/main/public/screen2.png" alt="Table Desktop" width="400"/>
    </td>
  </tr>
  <tr>
    <td align="center">
      Grid mobile<br>
      <img src="https://raw.githubusercontent.com/drbv27/pokemon-explorer-next/main/public/screen3.png" alt="Grid Mobile" width="400"/>
    </td>
    <td align="center">
      Table mobile<br>
      <img src="https://raw.githubusercontent.com/drbv27/pokemon-explorer-next/main/public/screen4.png" alt="Table mobile" width="400"/>
    </td>
  </tr>
  </table>

---

### ✨ Demo en Vivo

Puedes explorar la aplicación desplegada aquí:(link falso)

[**https://pokemon-explorer-next.vercel.app/**](https://pokemon-explorer-next.vercel.app/)

---

## ✅ Funcionalidades Principales

Este proyecto implementa todas las funcionalidades solicitadas en el desafío técnico, y las expande con mejoras significativas de UX.

- **Dos Vistas Interactivas:** Elige entre una vista de cuadrícula visual o una potente vista de tabla.
- **Tabla de Datos Avanzada:**
  - **Paginación, Ordenamiento y Filtrado Dual** (por nombre y tipo) para una exploración de datos completa.
  - **Controles Responsivos:** La interfaz de control se adapta perfectamente a cualquier tamaño de pantalla.
- **Modal de Detalles:** Un modal claro y conciso con toda la información relevante del Pokémon seleccionado.
- **Diseño _Mobile-First_:** Garantiza una experiencia de usuario perfecta en cualquier dispositivo.
- **(Bonus) Indicadores Visuales:** Barras de estadísticas con colores condicionales para una fácil interpretación.

---

## UX/UI Mejoras Clave

Más allá de los requisitos básicos, se implementaron las siguientes mejoras para elevar la calidad de la aplicación:

- **Persistencia de Estado con Zustand:** La aplicación recuerda tus preferencias. Si seleccionas la vista de tabla y aplicas un filtro, estos ajustes se mantendrán incluso después de recargar la página, creando una experiencia continua y personalizada.
- **Tarjetas de Pokémon Intuitivas:** Se diseñaron las tarjetas en la vista de cuadrícula con un "Call to Action" explícito (`Ver Detalles`). Esto elimina la ambigüedad y asegura que la interacción sea clara tanto en dispositivos de escritorio (con mouse) como en móviles (táctiles).
- **Tabla Personalizable:** Para evitar la sobrecarga de información, se añadió un selector de columnas. Esto permite al usuario elegir qué estadísticas desea ver, ocultando por defecto las menos comunes (`At. Esp.` y `Def. Esp.`) para una vista inicial más limpia.
- **Controles de Tabla Lógicos:** La barra de controles de la tabla fue rediseñada para ser lógicamente coherente. Los filtros están agrupados y el botón "Reiniciar" aparece de forma contextual, sin causar saltos en la interfaz.

---

## 🏛️ Arquitectura y Decisiones Técnicas

### Stack Tecnológico

- **Framework:** **Next.js 14** (App Router)
- **Lenguaje:** **TypeScript**
- **UI y Estilos:** **Tailwind CSS** y **Shadcn/UI**
- **Manejo de Estado Global:** **Zustand** (para el estado de la UI y persistencia).
- **Manejo de Estado de Servidor:** **TanStack Query (React Query)**
- **Componente de Tabla:** **TanStack Table**

### Estrategia de Obtención de Datos (Fetching)

Se tomó la decisión estratégica de realizar el fetch de los detalles de los 151 Pokémon en la carga inicial.

**Justificación:** El desafío requería una tabla con columnas ordenables por estadísticas (ej. "Peso", "Altura"). Para implementar esta funcionalidad correctamente, es indispensable tener todos los datos disponibles en el cliente. Cargar los datos bajo demanda habría resultado en una tabla con funcionalidades incompletas. Esta decisión prioriza una **funcionalidad completa y una experiencia de usuario fluida** (ordenamiento y filtrado instantáneos) sobre una carga inicial ligeramente más rápida, la cual es mitigada por el sistema de caché de `TanStack Query`.

---

## ⚙️ Cómo Ejecutar el Proyecto Localmente

Para levantar una copia local de la aplicación, sigue estos sencillos pasos:

1.  **Clona el repositorio**

    ```bash
    git clone [https://github.com/tu-usuario/pokemon-explorer.git](https://github.com/tu-usuario/pokemon-explorer.git)
    ```

2.  **Navega al directorio del proyecto**

    ```bash
    cd pokemon-explorer
    ```

3.  **Instala las dependencias** (se recomienda usar `npm`)

    ```bash
    npm install
    ```

4.  **Ejecuta el servidor de desarrollo**

    ```bash
    npm run dev
    ```

5.  Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

## 📫 Contacto

[![GitHub](https://img.shields.io/badge/GitHub-drbv27-181717?logo=github)](https://github.com/drbv27)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-DiegoBonilla-0A66C2?logo=linkedin)](https://www.linkedin.com/in/diego-ricardo-bonilla-villa-7179254a/)
[![Email](https://img.shields.io/badge/Email-DiegoBonilla-D14836?logo=gmail)](mailto:drbv27@gmail.com)
