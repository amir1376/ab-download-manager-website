# Ajuda e perguntas frequentes (FAQ)

Encontre respostas para as perguntas mais frequentes e orientações para resolver problemas do AB Download Manager.

---

### O aplicativo permite baixar mídias de sites?

Sim! O AB Download Manager pode capturar vídeos, áudios e transmissões HLS não criptografadas de sites. Para utilizar esse recurso, verifique se a extensão do navegador está instalada.

---

### O aplicativo permite baixar vídeos do YouTube?

Não. Por motivos legais e de licenciamento, o aplicativo não oferece suporte ao download de transmissões criptografadas, incluindo vídeos do YouTube.

---

### A tela está preta ou piscando. O que devo fazer?

Talvez seja necessário alterar a API de renderização para utilizar a renderização por software. Siga estas etapas:

1. Adicione a seguinte variável de ambiente:

   ```env
   SKIKO_RENDER_API=SOFTWARE
   ```

2. Reinicie o aplicativo.

Para mais informações, consulte o [tutorial oficial sobre a API de renderização no GitHub](https://github.com/amir1376/ab-download-manager/wiki/Change-the-renderApi).

---

### A extensão não consegue se conectar ao aplicativo. O que devo fazer?

Se a extensão do navegador não conseguir se comunicar com o aplicativo no computador:

1. Verifique se o AB Download Manager está em execução no computador.
2. Confira se a VPN, o firewall ou o proxy não está bloqueando o acesso à porta local `15151`.
3. Tente acessar [http://localhost:15151](http://localhost:15151) diretamente pelo navegador. Se a conexão estiver funcionando, você verá uma resposta do aplicativo.
