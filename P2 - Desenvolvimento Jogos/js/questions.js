// ==================== QUESTIONS DATABASE ====================
const questionsDB = [
    {
        question: "Qual desses grupos de K-Pop e da 4a geracao?",
        options: ["BTS", "BLACKPINK", "SEVENTEEN", "Stray Kids"],
        correct: 3
    },
    {
        question: "Em qual circulo do Inferno de Dante ficam os glutoes?",
        options: ["Limbo", "Segundo Circulo", "Terceiro Circulo", "Quinto Circulo"],
        correct: 2
    },
    {
        question: "Qual foi o primeiro canal do T3ddy no YouTube?",
        options: ["T3ddy Games", "T3ddy Plays", "T3ddy", "T3ddy Vlogs"],
        correct: 2
    },
    {
        question: "Em 'A Metamorfose', de Franz Kafka, em que Gregor Samsa se transforma?",
        options: ["Em um rato", "Em uma barata", "Em um passaro", "Em um inseto alado"],
        correct: 1
    },
    {
        question: "Qual e o maior planeta do Sistema Solar?",
        options: ["Saturno", "Netuno", "Jupiter", "Urano"],
        correct: 2
    },
    {
        question: "Quem pintou a Mona Lisa?",
        options: ["Michelangelo", "Leonardo da Vinci", "Rafael Sanzio", "Caravaggio"],
        correct: 1
    },
    {
        question: "Qual e o elemento quimico com simbolo 'O'?",
        options: ["Ouro", "Osmio", "Oxigenio", "Ouro Branco"],
        correct: 2
    },
    {
        question: "Em que ano o Brasil declarou independencia?",
        options: ["1808", "1815", "1822", "1889"],
        correct: 2
    },
    {
        question: "Qual e a capital da Australia?",
        options: ["Sydney", "Melbourne", "Camberra", "Brisbane"],
        correct: 2
    },
    {
        question: "Qual livro foi escrito por George Orwell em 1949?",
        options: ["A Revolucao dos Bichos", "1984", "Admiravel Mundo Novo", "Fahrenheit 451"],
        correct: 1
    },
    {
        question: "Qual e o rio mais longo do mundo?",
        options: ["Rio Amazonas", "Rio Nilo", "Rio Mississipi", "Rio Yangtze"],
        correct: 1
    },
    {
        question: "Quem desenvolveu a Teoria da Relatividade?",
        options: ["Isaac Newton", "Niels Bohr", "Albert Einstein", "Stephen Hawking"],
        correct: 2
    },
    {
        question: "Qual e o menor pais do mundo?",
        options: ["Monaco", "Vaticano", "San Marino", "Liechtenstein"],
        correct: 1
    },
    {
        question: "Qual filme ganhou o Oscar de Melhor Filme em 1994?",
        options: ["Pulp Fiction", "Forrest Gump", "The Shawshank Redemption", "Schindler's List"],
        correct: 1
    },
    {
        question: "Qual e a lingua mais falada no mundo?",
        options: ["Ingles", "Espanhol", "Mandarim", "Hindi"],
        correct: 2
    }
];

// Function to get 5 random questions
function getRandomQuestions() {
    const shuffled = [...questionsDB].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 5);
}
