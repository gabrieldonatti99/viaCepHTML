document.addEventListener('DOMContentLoaded', function() {
    const cepInput = document.getElementById('cep');
    const resultadoDiv = document.getElementById('resultado');

    cepInput.addEventListener('input', function() {
        const cep = cepInput.value.replace(/\D/g, ''); // Remove caracteres não numéricos

        if (cep.length === 8) {
            fetch(`https://viacep.com.br/ws/${cep}/json/`)
                .then(response => response.json())
                .then(data => {
                    if (data.erro) {
                        resultadoDiv.innerHTML = `<p>CEP não encontrado.</p>`;
                        // Limpa os campos se o CEP não for encontrado
                        document.getElementById('rua').value = '';
                        document.getElementById('bairro').value = '';
                        document.getElementById('cidade').value = '';
                    } else {
                        // Preenchendo os campos de endereço
                        document.getElementById('rua').value = data.logradouro;
                        document.getElementById('bairro').value = data.bairro;
                        document.getElementById('cidade').value = data.localidade;
                        resultadoDiv.innerHTML = `
                            <p><strong>Endereço:</strong> ${data.logradouro}</p>
                            <p><strong>Bairro:</strong> ${data.bairro}</p>
                            <p><strong>Cidade:</strong> ${data.localidade}</p>
                            <p><strong>Estado:</strong> ${data.uf}</p>
                        `;
                    }
                })
                .catch(error => {
                    console.error('Erro ao buscar CEP:', error);
                    resultadoDiv.innerHTML = `<p>Erro ao buscar CEP.</p>`;
                    // Limpa os campos em caso de erro
                    document.getElementById('rua').value = '';
                    document.getElementById('bairro').value = '';
                    document.getElementById('cidade').value = '';
                });
        } else {
            // Limpa os campos se o CEP não tiver 8 dígitos
            resultadoDiv.innerHTML = '';
            document.getElementById('rua').value = '';
            document.getElementById('bairro').value = '';
            document.getElementById('cidade').value = '';
        }
    });
});
