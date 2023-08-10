function ValidaCPF(cpfEnviado) {
    Object.defineProperty(this, 'cpfLimpo', {
        get: function () {
            return cpfEnviado.replace(/\D+/g, ''); 
        }
    });
}

ValidaCPF.prototype.valida = function () {
    if (typeof this.cpfLimpo === 'undefined') return false;
    if (this.cpfLimpo.length !== 11) return false; 
    if (this.isSequencia()) return false; 
    const cpfParcial = this.cpfLimpo.slice(0, -2);    
    const digito1 = this.criaDigito(cpfParcial);
    const digito2 = this.criaDigito(cpfParcial + digito1);
    const novoCpf = cpfParcial + digito1 + digito2;
    return novoCpf === this.cpfLimpo; // Corrigido aqui
};
 
ValidaCPF.prototype.criaDigito = function (cpfParcial) {
    const cpfArray = Array.from(cpfParcial);
    let regressivo = cpfArray.length + 1;
    let total = cpfArray.reduce((ac, val) => {
        ac += (regressivo * Number(val));
        regressivo--;        
        return ac;
    }, 0);
   const digito = 11 - (total % 11);
   return digito > 9 ? '0' : String(digito);
};

ValidaCPF.prototype.isSequencia = function () {
    const sequencia = this.cpfLimpo[0].repeat(this.cpfLimpo.length);
    return sequencia === this.cpfLimpo;
};

const cpf = new ValidaCPF('705.484.450-52');
if (cpf.valida()) {
    console.log('CPF válido');
} else {
    console.log('CPF inválido');
}
document.addEventListener('DOMContentLoaded', () => {
    const validateButton = document.getElementById('validate-button');
    const cpfInput = document.getElementById('cpf-input');
    const resultMessage = document.getElementById('result-message');

    validateButton.addEventListener('click', () => {
        const cpfValue = cpfInput.value.replace(/\D+/g, '');
        const cpfValidator = new ValidaCPF(cpfValue);

        if (cpfValidator.valida()) {
            resultMessage.textContent = 'CPF válido';
            resultMessage.style.color = 'green';
        } else {
            resultMessage.textContent = 'CPF inválido';
            resultMessage.style.color = 'red';
        }
    });
});
