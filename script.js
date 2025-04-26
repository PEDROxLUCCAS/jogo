// Pegando elementos do HTML
const canvas = document.getElementById('snakeGame');
const ctx = canvas.getContext('2d');
const resetButton = document.getElementById('resetButton');
const scoreDisplay = document.getElementById('scoreDisplay');  // Pegando o div de pontuação

// Configurações iniciais
const box = 20; // Tamanho de cada quadradinho (20px)
let snake = [{ x: 9 * box, y: 10 * box }]; // Inicia a cobrinha no meio do canvas
let food = spawnFood(); // Gera a primeira comida aleatória
let score = 0; // Pontuação inicial
let directionInput = null; // Direção atual da cobrinha
let game; // Variável para guardar o setInterval

// Eventos de teclado e botão de reset
document.addEventListener('keydown', updateDirection);
resetButton.addEventListener('click', restartGame);

// Atualiza a direção da cobrinha conforme a tecla pressionada
function updateDirection(event) {
    if (event.keyCode === 37 && directionInput !== 'RIGHT') directionInput = 'LEFT';
    else if (event.keyCode === 38 && directionInput !== 'DOWN') directionInput = 'UP';
    else if (event.keyCode === 39 && directionInput !== 'LEFT') directionInput = 'RIGHT';
    else if (event.keyCode === 40 && directionInput !== 'UP') directionInput = 'DOWN';
}

// Função que gera uma posição aleatória para a comida
function spawnFood() {
    return {
        x: Math.floor(Math.random() * 19 + 1) * box,
        y: Math.floor(Math.random() * 19 + 1) * box
    };
}

// Verifica se a cabeça da cobra colidiu com o corpo dela mesma
function hasCollision(head, snakeArray) {
    return snakeArray.some(segment => head.x === segment.x && head.y === segment.y);
}

// Função principal: desenha o jogo frame por frame
function drawGame() {
    // Limpa todo o canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenha a cobrinha
    snake.forEach((segment, index) => {
        ctx.fillStyle = (index === 0) ? '#3498db' : '#2980b9'; // Cabeça mais clara
        ctx.fillRect(segment.x, segment.y, box, box);

        ctx.strokeStyle = '#1c5980'; // Cor da borda
        ctx.strokeRect(segment.x, segment.y, box, box);
    });

    // Desenha a comida
    ctx.fillStyle = '#e74c3c';
    ctx.fillRect(food.x, food.y, box, box);

    // Pega posição atual da cabeça da cobra
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Atualiza posição conforme a direção
    if (directionInput === 'LEFT') snakeX -= box;
    if (directionInput === 'UP') snakeY -= box;
    if (directionInput === 'RIGHT') snakeX += box;
    if (directionInput === 'DOWN') snakeY += box;

    // Verifica se a cobra comeu a comida
    if (snakeX === food.x && snakeY === food.y) {
        score++;
        food = spawnFood(); // Nova comida
    } else {
        snake.pop(); // Remove o último pedaço da cobra (movimento normal)
    }

    // Cria nova cabeça da cobra
    const newHead = { x: snakeX, y: snakeY };

    // Verifica colisões: parede ou corpo
    if (
        snakeX < 0 || snakeY < 0 ||
        snakeX >= canvas.width || snakeY >= canvas.height ||
        hasCollision(newHead, snake)
    ) {
        clearInterval(game); // Para o jogo
        drawGameOver();      // Mostra mensagem de Game Over + pontuação
        resetButton.style.display = 'block'; // Mostra botão de reset
        return;
    }

    snake.unshift(newHead); // Adiciona nova cabeça no início da cobra

    updateScoreDisplay(); // Atualiza a pontuação fora do canvas
}

// Função que reinicia o jogo
function restartGame() {
    // Reseta a cobrinha
    snake = [{ x: 9 * box, y: 10 * box }];
    // Reseta a pontuação
    score = 0;
    // Reseta a direção
    directionInput = null;
    // Esconde o botão de reset
    resetButton.style.display = 'none';
    // Gera nova comida
    food = spawnFood();

    // Exibe a pontuação inicial novamente
    scoreDisplay.style.display = 'block';  // Faz a pontuação voltar

    // Limpando o intervalo antigo do jogo
    clearInterval(game); 

    // Começando o novo jogo
    game = setInterval(drawGame, 100); 
}

// Função que desenha a tela de "Game Over" quando o jogo termina
function drawGameOver() {
    // Esconde a pontuação inicial
    scoreDisplay.style.display = 'none';

    // Desenha fundo transparente
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Escreve "Game Over"
    ctx.fillStyle = "#e74c3c";
    ctx.font = "40px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2 - 20);

    // Escreve a pontuação final
    ctx.fillStyle = "#ecf0f1";
    ctx.font = "20px Arial";
    ctx.fillText("Pontuação: " + score, canvas.width / 2, canvas.height / 2 + 20);
}

// Função que atualiza a pontuação fora do canvas
function updateScoreDisplay() {
    scoreDisplay.textContent = "Pontuação: " + score;
}

// Função que desenha a tela de "Game Over" quando o jogo termina
function drawGameOver() {
    // Esconde a pontuação inicial
    scoreDisplay.style.display = 'none';

    // Desenha fundo transparente
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Escreve "Game Over"
    ctx.fillStyle = "#e74c3c";
    ctx.font = "40px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2 - 20);

    // Escreve a pontuação final
    ctx.fillStyle = "#ecf0f1";
    ctx.font = "20px Arial";
    ctx.fillText("Pontuação: " + score, canvas.width / 2, canvas.height / 2 + 20);
}

// Começa o jogo
game = setInterval(drawGame, 100);
