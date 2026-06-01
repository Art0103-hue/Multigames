// ==================== QUESTIONS DATABASE ====================
const questionsDB = [
    {
        question: "Qual desses grupos de K-Pop é da 4ª geração?",
        options: ["BTS", "BLACKPINK", "SEVENTEEN", "Stray Kids"],
        correct: 3
    },
    {
        question: "Em qual círculo do Inferno de Dante ficam os glutões?",
        options: ["Limbo", "Segundo Círculo", "Terceiro Círculo", "Nono Círculo"],
        correct: 2
    },
    {
        question: "Qual foi o primeiro canal do T3ddy no YouTube?",
        options: ["T3ddy Games", "T3ddy Plays", "T3ddy", "T3ddy Vlogs"],
        correct: 2
    },
    {
        question: "Em 'A Metamorfose', de Franz Kafka, em que Gregor Samsa se transforma?",
        options: ["Em um rato", "Em uma barata", "Em um pássaro", "Em um inseto alado"],
        correct: 1
    },
    {
        question: "Qual é o maior planeta do Sistema Solar?",
        options: ["Saturno", "Netuno", "Júpiter", "Urano"],
        correct: 2
    },
    {
        question: "Quem pintou a Mona Lisa?",
        options: ["Michelangelo", "Leonardo da Vinci", "Rafael Sanzio", "Caravaggio"],
        correct: 1
    },
    {
        question: "Qual é o elemento químico com símbolo 'O'?",
        options: ["Ouro", "Osmío", "Oxigênio", "Ouro Branco"],
        correct: 2
    },
    {
        question: "Em que ano o Brasil declarou independência?",
        options: ["1808", "1815", "1822", "1889"],
        correct: 2
    },
    {
        question: "Qual é a capital da Austrália?",
        options: ["Sydney", "Melbourne", "Camberra", "Brisbane"],
        correct: 2
    },
    {
        question: "Qual livro foi escrito por George Orwell em 1949?",
        options: ["A Revolução dos Bichos", "1984", "Admirável Mundo Novo", "Fahrenheit 451"],
        correct: 1
    },
    {
        question: "Qual é o rio mais longo do mundo?",
        options: ["Rio Amazonas", "Rio Nilo", "Rio Mississipi", "Rio Yangtze"],
        correct: 1
    },
    {
        question: "Quem desenvolveu a Teoria da Relatividade?",
        options: ["Isaac Newton", "Niels Bohr", "Albert Einstein", "Stephen Hawking"],
        correct: 2
    },
    {
        question: "Qual é o menor país do mundo?",
        options: ["Mônaco", "Vaticano", "San Marino", "Liechtenstein"],
        correct: 1
    },
    {
        question: "Qual filme ganhou o Oscar de Melhor Filme em 1994?",
        options: ["Pulp Fiction", "Forrest Gump", "The Shawshank Redemption", "Schindler's List"],
        correct: 1
    },
    {
        question: "Qual é a língua mais falada no mundo?",
        options: ["Inglês", "Espanhol", "Mandarim", "Hindi"],
        correct: 2
    }
];

// Function to get 5 random questions
function getRandomQuestions() {
    const shuffled = [...questionsDB].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 5);
}
