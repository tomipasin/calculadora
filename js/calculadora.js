//crio uma função geral pra fugir do escopo global ;-)
function general() {
    //faço queryselector nas classes de display - uma principal e outra para memória de cálculo.
    const display = document.querySelector('.display');
    const displayRes = document.querySelector('.displayRes');

    //crio uma função que vai trabalhar os botões da calculadora.
    function clicaBotoes() {
        //primeira ação é adicinoar um listener de click no documento. 
        //ao perceber um clique ele executa uma função anônima.
        document.addEventListener('click', function (e) {
            //crio uma var de evento e atribuo a ela o target do que foi clicado. 
            const evento = e.target

            //faço umas condicionais para atribuir ações baseado nas classes.
            //por exemplo se a classe for de btn-num (botões de números)
            if (evento.classList.contains('btn-num')) {
                //eu mando para o display o innerText do botão clicado. 
                //tipo se cliquei o 9 ele manda para o display o numeral 9 e assim por diante.
                //a cada botão clicado vou ADICIONANDO ao display o innerText (usei += em vez de só =)
                display.value += evento.innerText;
            }
            //se a classe constiver btn-clear ele atribui ao display um valor vazio (limpa o display).
            if (evento.classList.contains('btn-clear')) {
                display.value = '';
            }
            //se ele contiver btn-del ele pega o valor que está no display e faz um slice retirando o último dígito.
            if (evento.classList.contains('btn-del')) {
                display.value = display.value.slice(0, -1);
            }
            //e por fim se o botão clicado for o de igual ele executa a função "executa" que faz o cálculo propriamente dito.
            if (evento.classList.contains('btn-eq')) {
                executa();
            }
        });
    }

    //aqui criei uma função para habilitar o uso de enter como sinal de =.
    function pressionaEnter() {
        //ela basicamente adiciona um listener em display que monitora o keyup da tecla de código 13 (enter)
        display.addEventListener('keyup', e => {
            if (e.keyCode === 13) {
                //quando isso acontecer o comprtamento é o mesmo de clicar no sinal de igual da calculadora. 
                executa();
            }
        });
    }

    //a função executa é quem faz o cálculo baseada no que estiver no display.
    function executa() {
        //desta forma a primaira ação é criar uma variável chamada equacao e atribuir a ela o que estiver no display.
        let equacao = display.value;
        //crio uma outra variável chamada conta e atribuo a ela a equação do display. Usarei isso no campo de memória de cálculo.
        const conta = equacao

        //com essas variáveis declaradas vamos executar a conta e obter o resultado matemático usando eval.
        //o JS tentará fazer com que o valor atribuido à variável equacao seja o resultado de eval(equacao).
        try {
            equacao = eval(equacao);

            //determino umas condicionais:
            //se não tiver nada no display e tentarmos clicar em = ele mostrará um erro.
            if (!equacao) {
                display.value = 'erro  :-(';
                //e para a execução do código por aqui.
                return;
            }

            //mas se tiver algo no dislpay então ele mostrará nele o resultado do nosso eval(equacao) como string.
            display.value = String(equacao);
            //e também mandará para o campo de memória de cálculo a equação e seu resultado.
            displayRes.innerHTML += `<li>[${conta}] = ${String(equacao)} </li>`;
        
        //caso algo saia fora disso ele exibirá um erra no display e então encerrará a execução.
        } catch (e) {
            display.value = 'erro  :-(';
            return;
        };
    }

    //aqui as funções de clicaBotões e pressionaEnter são invocados pra que o comportamento de cliques e etc seja o que desejamos.
    clicaBotoes();
    pressionaEnter();

};
 //pra tudo funcionar ao abrir a página a função general é invocada.
general();