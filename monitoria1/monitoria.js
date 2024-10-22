const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// Middleware para parsear dados do formulário
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Rota para a página inicial com o formulário
app.get('/', (req, res) => {
    const formularioHTML = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Ficha de Monitoria</title>
        <style>
            body {
                font-family: 'Arial', sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
            }

            #form-container {
                color: #333;
                font-size: 16px;
                line-height: 1.6;
                background-color: white;
                padding: 40px;
                border: 2px solid #ff3b3b;
                border-radius: 12px;
                max-width: 800px;
                width: 100%;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                min-height: 500px;
                margin-top: 20px;
            }

            label {
                display: block;
                margin-bottom: 10px;
                font-weight: bold;
            }

            input[type="text"], input[type="date"], input[type="time"], input[type="number"], textarea, select {
                width: 100%;
                padding: 10px;
                margin-bottom: 10px;
                border: 1px solid #ccc;
                border-radius: 6px;
                box-sizing: border-box;
            }

            textarea {
                resize: none;
                height: 100px;
            }

            button {
                width: 100%;
                background-color: #ff3b3b;
                color: white;
                padding: 12px;
                border: none;
                border-radius: 6px;
                font-size: 16px;
                cursor: pointer;
                margin-top: 15px;
            }

            button:hover {
                background-color: #e60000;
            }

            input:focus, select:focus, textarea:focus, button:focus {
                outline: 2px solid #e60000;
            }
        </style>
        <script>
            // Script para preencher o campo de data e hora automaticamente com a data e hora atual
            window.onload = function() {
                var now = new Date();
                var today = now.toISOString().substr(0, 10); // Formata a data para o padrão yyyy-mm-dd
                var time = ('0' + now.getHours()).slice(-2) + ':' + ('0' + now.getMinutes()).slice(-2); // Formata a hora no padrão hh:mm
                
                document.getElementById("data").value = today; // Preenche a data
                document.getElementById("hora").value = time; // Preenche a hora
            }
        </script>
    </head>
    <body>
        <div id="form-container">
            <h1>Ficha de Monitoria</h1>
            <form action="/monitoria" method="POST">
                <label for="nome">Nome do Operador:</label>
                <input type="text" id="nome" name="nome" required>

                <label for="equipe">Equipe do Operador:</label>
                <select id="equipe" name="equipe" required>
                    <option value="">Selecione uma equipe</option>
                    <option value="GRAZI - FÊNIX">GRAZI - FÊNIX</option>
                    <option value="THAINA - SINTONIA">THAINA - SINTONIA</option>
                    <option value="NATHAN - ELITE">NATHAN - ELITE</option>
                    <option value="PEDRO - FERA">PEDRO - FERA</option>
                    <option value="LETICIA - INVICTUS">LETICIA - INVICTUS</option>
                    <option value="GUSTAVO - VELOZES E FURIOSOS">GUSTAVO - VELOZES E FURIOSOS</option>
                    <option value="VIGAS - LION">VIGAS - LION</option>
                </select>

                <label for="data">Data:</label>
                <input type="date" id="data" name="data" required readonly>

                <label for="hora">Hora:</label>
                <input type="time" id="hora" name="hora" required readonly>

                <label for="pontos_positivos">Pontos Positivos:</label>
                <textarea id="pontos_positivos" name="pontos_positivos" required></textarea>

                <label for="pontos_negativos">Pontos Negativos:</label>
                <textarea id="pontos_negativos" name="pontos_negativos" required></textarea>

                <label for="numero_ligacoes">Número de Ligações:</label>
                <input type="number" id="numero_ligacoes" name="numero_ligacoes" required>

                <label for="ligacoes_acima_5">Ligações acima de 5 minutos:</label>
                <input type="number" id="ligacoes_acima_5" name="ligacoes_acima_5" required>

                <button type="submit">Enviar</button>
            </form>
        </div>
    </body>
    </html>
    `;
    res.send(formularioHTML);
});

// Endpoint para receber os dados do formulário de monitoria e exibir no navegador
app.post('/monitoria', (req, res) => {
    const { nome, equipe, data, hora, pontos_positivos, pontos_negativos, numero_ligacoes, ligacoes_acima_5 } = req.body;

    // Verifique se todos os campos foram preenchidos
    if (!nome || !equipe || !data || !hora || !pontos_positivos || !pontos_negativos || !numero_ligacoes || !ligacoes_acima_5) {
        return res.send(`
            <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        color: red;
                        text-align: center;
                        margin-top: 50px;
                    }
                </style>
            </head>
            <body>
                <h1>Erro: Todos os campos devem ser preenchidos!</h1>
                <p><a href="/">Voltar ao formulário</a></p>
            </body>
            </html>
        `);
    }

    // Formatação dos dados em HTML
    const fichaMonitoriaHTML = `
        <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                }
                h1 {
                    color: #333;
                }
                .highlight {
                    background-color: yellow;
                }
            </style>
        </head>
        <body>
            <h1>FICHA MONITORIA</h1>
            <p><strong>NOME OPERADOR:</strong> ${nome.toUpperCase()}</p>
            <p><strong>EQUIPE:</strong> ${equipe.toUpperCase()}</p>
            <p><strong>DATA:</strong> ${data}</p>
            <p><strong>HORA:</strong> ${hora}</p>

            <h2>Pontos Positivos:</h2>
            <p>- ${pontos_positivos}</p>

            <h2>Pontos Negativos:</h2>
            <p>- ${pontos_negativos}</p>

            <p class="highlight"><strong>OBS:</strong> ${numero_ligacoes} LIGAÇÕES, ${ligacoes_acima_5} ACIMA DE 5 MINUTOS</p>
            <button onclick="window.location.href='/'">Voltar ao Formulário</button> <!-- Botão para voltar -->
        </body>
        </html>
    `;

    // Envia o HTML formatado para o navegador
    res.send(fichaMonitoriaHTML);
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
