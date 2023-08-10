function GeradorCPF() {}

GeradorCPF.prototype.geraCPF = function () {
    const cpfParcial = this.criaCPFParcial();
    const digito1 = this.criaDigito(cpfParcial);
    const digito2 = this.criaDigito(cpfParcial + digito1);
    const novoCpf = cpfParcial + digito1 + digito2;
    return this.formataCPF(novoCpf);
};

GeradorCPF.prototype.criaCPFParcial = function () {
    let cpfParcial = '';
    for (let i = 0; i < 9; i++) {
        cpfParcial += Math.floor(Math.random() * 10);
    }
    return cpfParcial;
};

GeradorCPF.prototype.criaDigito = function (cpfParcial) {
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

GeradorCPF.prototype.formataCPF = function (cpf) {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

const gerador = new GeradorCPF();

const gerarCPFButton = document.getElementById('gerarCPF');
const cpfGeradoElement = document.getElementById('cpfGerado');

gerarCPFButton.addEventListener('click', () => {
    const novoCpf = gerador.geraCPF();
    cpfGeradoElement.textContent = 'Novo CPF gerado: ' + novoCpf;
});
