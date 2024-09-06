document.getElementById('cep').addEventListener('input', async function() {
    const cep = this.value.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (cep.length !== 8) {
        document.getElementById('resultado').innerHTML = ''; // Limpa o resultado se o CEP não tiver 8 dígitos
        return;
    }

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (data.erro) {
            document.getElementById('resultado').innerHTML = '<p style="color: red;">CEP não encontrado.</p>';
        } else {
            document.getElementById('resultado').innerHTML = `
                <p><label for="logradouro">Endereço:</label> <input type="text" id="logradouro" class="input-field" value="${data.logradouro}" readonly></p>
                <p><label for="bairro">Bairro:</label> <input type="text" id="bairro" class="input-field" value="${data.bairro}" readonly></p>
                <p><label for="cidade">Cidade:</label> <input type="text" id="cidade" class="input-field" value="${data.localidade}" readonly></p>
                <p><label for="uf">UF:</label> <input type="text" id="uf" class="input-field" value="${data.uf}" readonly></p>
            `;
        }
    } catch (error) {
        document.getElementById('resultado').innerHTML = '<p style="color: red;">Erro ao buscar o CEP. Tente novamente.</p>';
    }
});
