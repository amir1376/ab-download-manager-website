## Cómo Hacer la Aplicación Portátil (Personalizar Directorio de Configuración)

Por defecto, la aplicación almacena sus archivos de configuración en:

`~/.abdm`

Tienes dos formas de cambiar esto:

### Opción 1: Usar una Carpeta Local `.abdm`

Crea una carpeta llamada `.abdm` dentro del directorio de instalación de la aplicación.

Cuando esta carpeta existe, la aplicación automáticamente la utilizará como directorio de configuración en lugar de la ubicación predeterminada.

### Opción 2: Usar un Archivo `.portable`

Crea un archivo llamado `.portable` dentro del directorio de instalación.

Dentro de este archivo, escribe la ruta completa a la carpeta que deseas usar como directorio de configuración.

La aplicación leerá este archivo y utilizará la ruta especificada para almacenar los datos de configuración.
