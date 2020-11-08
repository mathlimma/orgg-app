const connection = require('./connection');

/***  Tasks DIÁRIAS feitas com base na persona Marcos ***/
const tasks = [
    {name: "Passear com o cachorro", estimate: 1},
    {name: "Corrigir os trabalhos dos alunos do terceiro ano", estimate: 3},
    {name: "Ler o meu livro", estimate: 1},
  	{name: "Corrigir as provas dos alunos do primeiro ano", estimate: 3},
    {name: "Organizar as roupas das crianças", estimate: 2},
    {name: "Lavar minhas roupas", estimate: 1},
    {name: "Ajudar as crianças com os deveres de casa e trabalhos", estimate: 3},
    {name: "Lavar roupa das crianças", estimate: 2},
    {name: "Regar e cuidar das plantas", estimate: 1},
    {name: "Separar as contas semanais a pagar", estimate: 1},
    {name: "Acompanhar os investimentos", estimate: 1},
    {name: "Organizar a cozinha", estimate: 2},
    {name: "Elaboração de prova dos alunos do primeiro ano", estimate: 1},
    {name: "Fazer as compras do supermercado", estimate: 1},
    {name: "Jantar em família", estimate: 1},
    {name: "Assistir vídeos no Youtube", estimate: 2},
    {name: "Varrer a casa", estimate: 2},
    {name: "Preparar o almoço de amanhã", estimate: 2},
    {name: "Aula para o terceiro ano", estimate: 2},
    {name: "Tirar o pó dos móveis", estimate: 1},
   	{name: "Corrigir as provas dos alunos do terceiro ano", estimate: 3},
    {name: "Brincar com as crianças", estimate: 1},
    {name: "Lavar as máscaras", estimate: 1},
    {name: "Preparar slides para a aula do primeiro e segundo ano", estimate: 1},
    {name: "Dar banho nas crianças", estimate: 2},
    {name: "Assistir filmes com as crianças", estimate: 2},
    {name: "Consulta médica", estimate: 2},
    {name: "Arrumar a cama", estimate: 0.5},
    {name: "Passar pano na casa", estimate: 2},
    {name: "Lavar o enxoval das camas", estimate: 2},
  	{name: "Corrigir as provas dos alunos do segundo ano", estimate: 3},
    {name: "Lavar o banheiro", estimate: 1},
    {name: "Trocar o enxoval das camas", estimate: 1},
    {name: "Aula para o primeiro ano", estimate: 2},
    {name: "Larvar os pratos e limpar a pia da cozinha", estimate: 1},
    {name: "Limpar espelhos e janelas", estimate: 2},
    {name: "Recolher o lixo", estimate: 0.5},
    {name: "Corrigir os trabalhos dos alunos do segundo ano", estimate: 3},
    {name: "Aula para os segundo ano", estimate: 2},
    {name: "Organizar os armários da cozinha", estimate: 1},
    {name: "Organizar minhas roupas", estimate: 1},
    {name: "Comprar pão", estimate: 0.5},
    {name: "Recolher objetos que estão fora do lugar", estimate: 1},
    {name: "Escovar os dentes com as crianças", estimate: 1},
    {name: "Elaboração de prova dos alunos do terceiro ano", estimate: 1},
    {name: "Varrer o quintal", estimate: 1},
    {name: "Jogar Fifa", estimate: 2},
    {name: "Almoço com a família", estimate: 1},
    {name: "Corrigir os trabalhos dos alunos do primeiro ano", estimate: 3},
    {name: "Ler com os meninos", estimate: 1},
    {name: "Elaboração de prova dos alunos do segundo ano", estimate: 2},
    {name: "Fazer o café da manhã e tomar com a familia", estimate: 1},
	  {name: "Dar banho no cachorro", estimate: 1}
];

db = connection.openConnectionDB();

db.serialize(function() {
    connection.createDB(tasks);
}); 

connection.closeConnectionDB(db);