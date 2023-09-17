![Imagem do projeto TrainSys com o logo da DEVinHouse Zucchetti](https://github.com/VeronicaVilas/ProjetoTrainSys/assets/135287830/b939883d-1e61-4251-b0cb-ee105c49f381)

# TrainSys
TrainSys é um software destinado aos instrutores de academias com a função de descomplicar a gestão de alunos e treinos otimizando, desta forma, o seu trabalho diário. Ele foi especialmente desenvolvido para visualização de dados em desktop.

Este é um projeto desenvolvido para o curso DEVinHouse ministrado pelo Senai (Serviço Nacional de Aprendizagem Industrial) em parceria com a Zucchetti.

## 🔨 Funcionalidades do projeto

- `Funcionalidade 1` `Cadastro e login de usuários`: O software está apto a cadastrar e logar os instrutores de academia associando seu nome na tela principal. Para cadastrar um instrutor, devem ser informados um e-mail válido, seu nome completo, informar uma senha e escolher um plano, estando dividos entre bronze, prata e ouro. Todos os campos são obrigatórios. O sistema também deve gravar estes dados pois o email e a senha serão utilizadas para entrar na pagina de gerenciamento.
- `Funcionalidade 2` `Gerenciamento de Exercícios e alunos`: O sistema agrupa na tela home a quantidade de exercícios e alunos cadastrados podendo ser visualizado em listas todos os mesmos. As telas de gestão permite ao instrutor inserir o exercício no sistema conforme seu interesse. Em contrapartida, a lista de alunos cadastrados permite, pensando em otimizar o tempo, a busca pelo nome do aluno tirando a necessidade de realizar a busca em uma ampla lista.
- `Funcionalidade 2a` `Cadastro de alunos`: Para cadastrar um aluno, onde os dados informados são os utilizados para a listagem e gerenciamento de alunos, devem ser informados um e-mail válido, seu nome completo, contato e data de aniversário. Somente o nome e contato é obrigátorios. POsteriormente é preciso informar um cep válido, para cadastro do endereço, que será utilizado para busca do logradouro, bairro, cidade e estado através do ViaCep.
- `Funcionalidade 3` `Cadastro e visualização de Treinos`: O cadastro de visualização de treinos é realizado para o aluno especifico solicitado pelo instrutor através do parâmetro de rota dinâmica. Ao selecionar o mesmo pode escolher entre montar ou visualizar o treino, sendo a pagina de visualização depende do cadastro de treinos realizados. Para cadastrar o treino é preciso selecionar o exercicio, que na funcionalidade 2, a quantidade de repetições, o peso, tempo de pausa e escolher qual o dia da semana que será executado, além disso possui um campo de observações. Somente o campo de observação que é opcional. Ao vizualizar, sempre irá mostrar na parte superior o treino cadastrado para o dia, conforme o dia da semana, este valor altera todo dia. 

## ✔️ Técnicas e tecnologias utilizadas

![Ícone do CSS](https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white)
![Ícone do JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Ícone do VUEJS](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D)

### Bibliotecas utilizadas

- [Vuetify](https://vuetifyjs.com/en/) versão 3.3.15
- [Router](https://router.vuejs.org/) versão 4.2.4
- [Yup](https://www.npmjs.com/package/yup) versão 1.2.0


## 🛠️ Criando e executando localmente o projeto
Criar e executar o TrainSys em seu ambiente de desenvolvimento local é muito fácil. Certifique-se de ter o [Git](https://git-scm.com/downloads) e o [Visual Studio Code](https://code.visualstudio.com/) instalados e siga as instruções abaixo.


1. Clone o código fonte:

```bash
git clone https://github.com/VeronicaVilas/ProjetoTrainSys.git
```

2. Instale dependências de desenvolvimento:

```bash
npm install
```

O npm install é utilizado para instalar algumas dependências que o arquivopackage.json precisa por padrão, desta forma, só é possível vizualizar o projeto quando rodado esse comando . Esse comando instala todas essas dependências dentro da pasta node_modules. 

3. Execute o projeto:

```bash
npm run dev
```

Para este projeto, é necessário também utilizar a API (Application Programming Interface) que é o software responsável por hospedar localmente os as solicitação, como por exemplo o cadastro de usuário, e receber informar a resposta. A api já está inclusa no momento da clonagem do código e para utiliza-lá basta seguir os passos a seguir:

1. Abra a API em um nova janela

2. Instale dependências de desenvolvimento:

```bash
npm install
```

3. Execute:

```bash
npm run server
```

## ❌ Melhorias
O TrainSys é um projeto em construção, desta forma, é bem-vindo modificações e melhorias que possibilite. Algumas destas melhorias são:

- Implementação de modo escuro: A visualização das informações é muito importante e cada individuo tem suas preferências conforme seu campo de visão, por exemplo, quem possui astigmatismo possui a dificuldade em enxergar em ambientes muito iluminados, desta forma, um ponto de melhoria é a implementação a opção de modo escuro, podendo alterar o fundo da tela entre claro e escuro (Dark/Light) que ajuda na visualização das informações conforme cada tipo de usuário; 
- Implementação de métrica e metas personalizadas: Este permiti ao instrutor e ao aluno registrar os resultados para progressão em direção ao objetivo estipulado; 
- Construtor de programas de treinos: Este permiti montar o treino semanal e posteriormente designar a cada aluno, que irá potencializar a rotina diária e reduzir o tempo necessário para cadastro de treino a cada novo aluno;
- Inclusão de tempo destinado ao treino cadasrado;
- Painel de gerenciamento: Neste painel será possível visualizar a quantidade de alunos cadastrados coma ficha em andamento e aqueles que precisa de atualização de treino rumo ao seu objetivo.

> [!NOTE]
> Deixe o seu feedback! O que você acha que pode melhorar no projeto?

## 👀 Veja o projeto

![Página login](https://github.com/VeronicaVilas/ProjetoTrainSys/assets/135287830/bc485480-1769-4cb9-b8c7-79848b2cc943)

![Página de cadastro usuário](https://github.com/VeronicaVilas/ProjetoTrainSys/assets/135287830/d9f38844-a487-4d2e-a149-7096ddb2b466)

![Página Dashboard](https://github.com/VeronicaVilas/ProjetoTrainSys/assets/135287830/defa5fe5-2e88-4aab-8811-0c55c83a19c7)

![Página gerenciamento de exercícios](https://github.com/VeronicaVilas/ProjetoTrainSys/assets/135287830/8b280295-f150-4f9c-a266-9828f827a774)

![Página gerenciamento de alunos](https://github.com/VeronicaVilas/ProjetoTrainSys/assets/135287830/91ee8a3f-6472-4ed7-bbab-c6df9198ad35)

![Página Cadastro de alunos](https://github.com/VeronicaVilas/ProjetoTrainSys/assets/135287830/02e10bcf-d0e6-4958-9d63-435818ea8774)

![Página de cadastro de treinos](https://github.com/VeronicaVilas/ProjetoTrainSys/assets/135287830/8ad879bb-2467-4c39-88f7-4969fb7d70cc)

![Página visualização de treinos](https://github.com/VeronicaVilas/ProjetoTrainSys/assets/135287830/f245ca54-cca9-485f-b696-548e91f9d203)