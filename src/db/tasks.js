const connection = require('./connection');

/***  Tasks DIÁRIAS feitas com base na persona Marcos ***/
const tasks =   [
  {name: "Passear com o cachorro", estimate: 60},
  {name: "Corrigir os trabalhos dos alunos do terceiro ano", estimate: 6080},
  {name: "Ler o meu livro", estimate: 60},
  {name: "Organizar as roupas das crianças", estimate: 120},
  {name: "Lavar minhas roupas", estimate: 60},
  {name: "Ajudar as crianças com os deveres de casa e trabalhos", estimate: 180},
  {name: "Lavar roupa das crianças", estimate: 120},
  {name: "Regar e cuidar das plantas", estimate: 60},
  {name: "Separar as contas semanais a pagar", estimate: 60},
  {name: "Acompanhar os investimentos", estimate: 60},
  {name: "Organizar a cozinha", estimate: 120},
  {name: "Elaboração de prova dos alunos do primeiro ano", estimate: 60},
  {name: "Fazer as compras do supermercado", estimate: 60},
  {name: "Jantar em família", estimate: 60},
  {name: "Assistir vídeos no Youtube", estimate: 120},
  {name: "Varrer a casa", estimate: 120},
  {name: "Preparar o almoço de amanhã", estimate: 120},
  {name: "Aula para o terceiro ano", estimate: 120},
  {name: "Tirar o pó dos móveis", estimate: 60},
  {name: "Brincar com as crianças", estimate: 60},
  {name: "Lavar as máscaras", estimate: 60},
  {name: "Preparar slides para a aula do primeiro e segundo ano", estimate: 60},
  {name: "Dar banho nas crianças", estimate: 120},
  {name: "Assistir filmes com as crianças", estimate: 120},
  {name: "Consulta médica", estimate: 120},
  {name: "Arrumar a cama", estimate: 30},
  {name: "Passar pano na casa", estimate: 120},
  {name: "Lavar o enxoval das camas", estimate: 120},
  {name: "Lavar o banheiro", estimate: 60},
  {name: "Trocar o enxoval das camas", estimate: 60},
  {name: "Aula para o primeiro ano", estimate: 120},
  {name: "Larvar os pratos e limpar a pia da cozinha", estimate: 60},
  {name: "Limpar espelhos e janelas", estimate: 120},
  {name: "Recolher o lixo", estimate: 30},
  {name: "Corrigir os trabalhos dos alunos do segundo ano", estimate: 180},
  {name: "Aula para os segundo ano", estimate: 120},
  {name: "Organizar os armários da cozinha", estimate: 60},
  {name: "Organizar minhas roupas", estimate: 60},
  {name: "Comprar pão", estimate: 30},
  {name: "Recolher objetos que estão fora do lugar", estimate: 60},
  {name: "Escovar os dentes com as crianças", estimate: 60},
  {name: "Elaboração de prova dos alunos do terceiro ano", estimate: 60},
  {name: "Varrer o quintal", estimate: 60},
  {name: "Jogar Fifa", estimate: 120},
  {name: "Almoço com a família", estimate: 60},
  {name: "Corrigir os trabalhos dos alunos do primeiro ano", estimate: 180},
  {name: "Ler com os meninos", estimate: 60},
  {name: "Elaboração de prova dos alunos do segundo ano", estimate: 120},
  {name: "Fazer o café da manhã e tomar com a familia", estimate: 60},
];

db = connection.openConnectionDB();

db.serialize(function() {
    connection.createDB(tasks);
}); 

connection.closeConnectionDB(db);