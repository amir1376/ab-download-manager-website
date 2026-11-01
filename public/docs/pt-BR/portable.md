## Como tornar o aplicativo portátil (personalizar o diretório de configurações)

Por padrão, o aplicativo armazena seus arquivos de configuração em:

`~/.abdm`

Você pode alterar esse local de duas maneiras:

### Opção 1: usar uma pasta `.abdm` local

Crie uma pasta chamada `.abdm` dentro do diretório de instalação do aplicativo.

Quando essa pasta existir, o aplicativo a utilizará automaticamente como diretório de configurações, em vez do local padrão.

### Opção 2: usar um arquivo `.portable`

Crie um arquivo chamado `.portable` dentro do diretório de instalação.

Nesse arquivo, escreva o caminho completo para a pasta que deseja utilizar como diretório de configurações.

O aplicativo lerá o arquivo e utilizará o caminho informado para armazenar os dados de configuração.
