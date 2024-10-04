document.addEventListener("DOMContentLoaded", () => {
    const ultimoPosto = localStorage.getItem("ultimoPosto");
    const headerText = document.querySelector(".header-text p:nth-child(4)");

    if (ultimoPosto) {
        headerText.textContent = `UNIDADE DE SAÚDE ${ultimoPosto}`;
    }

    const alterarPostoBtn = document.getElementById("alterar-posto");
    const postoSelect = document.getElementById("posto-select");

    // Exibir/ocultar o select ao clicar no botão "Alterar Posto"
    alterarPostoBtn.addEventListener("click", () => {
        if (postoSelect.style.display === "none" || postoSelect.style.display === "") {
            postoSelect.style.display = "block";
        } else {
            postoSelect.style.display = "none";
        }
    });

    // Atualizar o último posto selecionado ao alterar o select
    postoSelect.addEventListener("change", (event) => {
        const postoSelecionado = event.target.value;

        if (postoSelecionado !== "Selecione sua UBS") {
            headerText.textContent = `UNIDADE DE SAÚDE ${postoSelecionado}`;
            localStorage.setItem("ultimoPosto", postoSelecionado);
        } else {
            alert("Por favor, selecione uma UBS válida.");
        }
    });
});

function imprimirFormulario() {
    const form = document.getElementById('form-retorno');
    const fields = form.querySelectorAll("input[required]");
    let allValid = true;

    // Verificação manual de todos os campos obrigatórios
    fields.forEach((field) => {
        if (!field.value.trim()) {
            allValid = false;
            field.classList.add("error");  // Adiciona uma classe para destacar o erro (CSS pode ser usado para estilizar isso)
        } else {
            field.classList.remove("error");  // Remove a classe de erro se o campo estiver preenchido
        }
    });

    if (allValid) {
        window.print();
    } else {
        alert("Por favor, preencha todos os campos obrigatórios antes de imprimir.");
    }
}

const especialidadeSuggestions = [
    "Cardiologia",
    "Cirurgia Geral",
    "Dermatologia",
    "Endocrinologia",
    "Gastroenterologia",
    "Ginecologia",
    "Neurologia",
    "Neuropediatria",
    "Oftalmologia",
    "Ortopedia",
    "Otorrinolaringologia",
    "Pediatria",
    "Psiquiatria",
    "Reumatologia",
    "Urologia"
];

const medicoSuggestions = [
    "Dr. Davi Tamamaru",
    "Dr. Carlos Aoki",
    "Dr. Valdeni",
    "Dra. Luciana Vitturi",
    "Dr. Antonio Vieira",
    "Dr. Ricardo Hirayama",
    "Dra. Caroline de Pauli",
    "Dra. Fernanda",
    "Dra. Vanessa Rasmussen",
    "Dr. Luiz Gonzaga de Alencar Arrais",
    "Dr. Pedro Yones",
    "Dr. Rubens Sirena",
    "Dr. Ronaldo",
    "Dr. Robson Dal Bem",
    "Dr. Aparecido Andrade",
    "Dr. Rafael",
    "Dra. Eugênia",
    "Dr. Marcos Manente",
    "Dr. Luiz Neto",
    "Dr. Rafael Fiorelli",
    "Dr. Pablo Lima Dias",
    "Dr. Diego",
    "Dr. Eduardo",
    "Dra. Silvia Helena",
    "Dr. Edgar",
    "Dra. Mariana de Almeida",
    "Dr. Victor Simão",
    "Dra. Lisbeth",
    "Dr. Lucas Stocco"
];

// Função para mostrar sugestões
function showSuggestions(input, suggestions, suggestionBox) {
    const value = input.value.toLowerCase();
    suggestionBox.innerHTML = ''; // Limpar sugestões anteriores

    if (value) {
        const filteredSuggestions = suggestions.filter(suggestion => 
            suggestion.toLowerCase().includes(value)
        );

        filteredSuggestions.forEach(suggestion => {
            const suggestionItem = document.createElement('div');
            suggestionItem.classList.add('suggestion-item');
            suggestionItem.textContent = suggestion;

            // Adicionar evento para preencher o campo ao clicar na sugestão
            suggestionItem.addEventListener('click', () => {
                input.value = suggestion;
                suggestionBox.innerHTML = ''; // Limpar sugestões após seleção
            });

            suggestionBox.appendChild(suggestionItem);
        });
    }
}

// Adicionar eventos de input
document.getElementById('especialidade').addEventListener('input', function() {
    showSuggestions(this, especialidadeSuggestions, document.getElementById('especialidade-suggestions'));
});

document.getElementById('medico').addEventListener('input', function() {
    showSuggestions(this, medicoSuggestions, document.getElementById('medico-suggestions'));
});
