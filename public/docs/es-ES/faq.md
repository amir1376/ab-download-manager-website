# Ayuda y Preguntas Frecuentes

Encuentra respuestas a las preguntas frecuentes y guías de solución de problemas para AB Download Manager.

---

### ¿Esta aplicación admite descargar medios de sitios web?
¡Sí! AB Download Manager puede capturar video, audio y flujos HLS no encriptados de sitios web. Asegúrate de tener la extensión del navegador instalada para que esta función funcione.

---

### ¿Esta aplicación admite descargar desde YouTube?
No. Debido a términos legales y de licencia, la aplicación no admite descargar flujos encriptados, lo que incluye videos de YouTube.

---

### Mi pantalla está negra o parpadeante — ¿qué debo hacer?
Es posible que debas cambiar la API de renderizado a renderizado de software. Sigue los pasos a continuación:
1. Agrega esta línea a tus variables de entorno
   ```env
   SKIKO_RENDER_API=SOFTWARE
   ```
2. Reinicia la aplicación.

Para más detalles, también puedes ver el [tutorial oficial de la API de renderizado en GitHub](https://github.com/amir1376/ab-download-manager/wiki/Change-the-renderApi).

---

### La extensión no puede conectarse a la aplicación — ¿qué debo hacer?
Si la extensión del navegador no puede comunicarse con la aplicación de escritorio:
1. Asegúrate de que la aplicación de escritorio AB Download Manager esté en ejecución.
2. Verifica que tu VPN, firewall o proxy no esté bloqueando el acceso al puerto local `15151`.
3. Intenta abrir [http://localhost:15151](http://localhost:15151) directamente en tu navegador. Si está funcionando, deberías ver una respuesta de conexión de la aplicación.
