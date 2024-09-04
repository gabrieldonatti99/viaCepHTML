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
                <p><strong>Endereço:</strong> ${data.logradouro}</p>
                <p><strong>Bairro:</strong> ${data.bairro}</p>
                <p><strong>Cidade:</strong> ${data.localidade}</p>
                <p><strong>UF:</strong> ${data.uf}</p>
            `;
        }
    } catch (error) {
        document.getElementById('resultado').innerHTML = '<p style="color: red;">Erro ao buscar o CEP. Tente novamente.</p>';
    }
});
