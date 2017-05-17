(function() {

    //f(x) = 2*cos(10t) + 4sen(30t)
    var t = basetempo(0, .25*Math.PI, .1);
    
    var cos = cosseno(10,t);
    var x1 = escala(2, cos);
    var sen = seno(30, t);
    var x2 = escala(-4, sen);

    var soma = soma_simples(x1,x2);    
    
    console.log(soma);

//    criarGrafico(t, soma, 'x(t) = 2cos(10t) - 4 sin(30t)', true);

    var rand = eq_1_grau(1, 'rand', soma);
//    criarGrafico(t, rand, 'x(t) = 2cos(10t) - 4 sin(30t) + rand', true);
    
    var fourrier = ft(soma);
    var fourrier_fast = fft(soma);

    console.log(fourrier);
    console.log(fourrier_fast)

    //var mod = modulo(fourrier.real, fourrier.imaginario);
    //criarGrafico(t, mod, 'X(k) = FT( x(t) )', true);
    
    //var mod = modulo(fourrier_fast.par.real, fourrier_fast.impar.imaginario);    
    //criarGrafico(t, mod, 'X(k) = FFT( x(t) )', true);

 //   console.log(fourrier)
//    console.log(fourrier_fast);


//    var f = escala_tempo(.05,t);

//    criarGrafico(f, mod, 'abs(f)', true);

    


/*
    // Exercício 2
    var f1 = resultados(-4,-1,1,.75,3);
    var f2 = resultados(0,6,1,-.5,3);
    criarGrafico( f1.etapas.concat(f2.etapas), f1.resultados.concat(f2.resultados), 'exercicio 2');

    //Exercicio 3 - A 
    criarGrafico(exe1.etapas, mudarEscala(3, exe1.resultados), 'k*y(t)');

    var soma = somarFuncao(exe1.resultados, f2.resultados);
    criarGrafico(f1.etapas.concat(f2.etapas), f1.resultados.concat(soma), 'y1(t) + y2(t)');

    var t = basetempo(0,2,.01);
    criarGrafico(t, exponencial(.1,t), 'y(t) = e^(at)');
    //criarGrafico(t, rambo(1,t), 'y(t) = cos(2pift)');

    document.querySelector('button').onclick = function(){
        submitForm();            
    };
    */

    //init();

})();

var num_f = 1;
var func_desc = document.querySelector('#func-desc');

function init(){
    func_desc = document.querySelector('#func-desc');
    createInput('ti'+num_f, 't inicial', 'tempo');
    createInput('tf'+num_f, 't final', 'tempo');
    createInput('dt'+num_f, 'intervalo', 'tempo').addEventListener('blur', function(){
                
    });

    createCheck('escala_tempo'+num_f, 'escala tempo', 'tempo');
    createRadio('tipo_grafico'+num_f, 'discreto', 'tipo');
    createRadio('tipo_grafico'+num_f, 'continuo', 'tipo');
    createSelect(num_f);    
}


function calcularIntervalos(){
    var t_inputs = document.querySelectorAll('input.tempo');
    var ti = parseFloat(t_inputs[0].value);
    var tf = parseFloat(t_inputs[1].value);
    var dt = parseFloat(t_inputs[2].value);
    var func = document.querySelector('select').value;
    return basetempo(ti, tf, dt);
}

function submitForm(){
    var t_inputs = document.querySelectorAll('input.tempo');
    var ti = parseFloat(t_inputs[0].value);
    var tf = parseFloat(t_inputs[1].value);
    var dt = parseFloat(t_inputs[2].value);
    var esc_tempo = document.querySelector('input')

    var func = document.querySelector('select').value;
    var t = basetempo(ti, tf, dt);

    switch(func){
        case 'exp':
            var a = document.querySelector('input#a').value;
            criarGrafico(t, exponencial(a,t), 'y(t) = e^(at)')
        break;
        case 'cos':
            var f = document.querySelector('input#f').value;
            criarGrafico(t, cos(f,t), 'y(t) = cos(2*pi*f*t)')
        break;
        case 'p_grau':
            var a = parseFloat(document.querySelector('input#a').value);
            var b = parseFloat(document.querySelector('input#b').value);
            criarGrafico(t, eq_1_grau(a,b,t), 'y(t)= a*t+b')
        }
    basetempo(ti,tf,dt)
}

function loadFunction(func){
    console.log(func);
    switch(func){
        case 'exp': 
            createInput('a', 'Amplitude');
        break;
        case 'cos':
            createInput('f', 'Frequência');
        break;
        case 'p_grau':
            createInput('a', 'A', 'params');
            createInput('b', 'B', 'params');
        break;
    }
}

function createInput(name, placeholder, classe){
    var div = document.createElement('div');
    div.className = 'input created';
    var p = document.createElement('p');
    p.textContent = placeholder;
    var input = document.createElement('input');
    input.type = 'number';
    input.id = name;
    input.className = classe;
    div.appendChild(p);
    div.appendChild(input);
    document.forms[0].appendChild(div);
    return input;
}

function createSelect(i){
    var options = [
        {value: '', label: 'Selecione'},
        {value: 'p_grau', label: '1º Grau'},
        {value: 'm_escala', label: 'Escala'},
        {value: 'exp', label: 'Exponencial'},
        {value: 'sen', label: 'Seno'},
        {value: 'cos', label: 'Cosseno'},
    ];

    var div = document.createElement('div');
    div.className = 'input created';
    var p = document.createElement('p');
    p.textContent = 'Função';
    var input = document.createElement('select');
    input.type = 'number';
    input.id = 'select' + i;
    input.className = 'function';
    div.appendChild(p);
    div.appendChild(input);

    for (var i = 0; i < options.length; i++) {
        var option = document.createElement("option");
        option.value = options[i].value;
        option.text = options[i].label;
        input.appendChild(option);
    }
    document.forms[0].appendChild(div);

    input.addEventListener('change', function(){
        loadFunction(this.value);    
                
    });

}

function createCheck(name, placeholder, classe){
    var div = document.createElement('div');
    div.className = 'input created';
    var p = document.createElement('p');
    p.textContent = placeholder;
    var input = document.createElement('input');
    input.type = 'checkbox';
    input.id = name;
    input.className = classe;
    div.appendChild(p);
    div.appendChild(input);
    document.forms[0].appendChild(div);
    input.addEventListener('click', function(){
        console.log('teste', this.checked);
        if(this.checked){
            createInput('esc_tempo', 'esc tempo');
        }
    });
}


function createRadio(name, placeholder, classe){
    var div = document.createElement('div');
    div.className = 'input created';
    var p = document.createElement('p');
    p.textContent = placeholder;
    var input = document.createElement('input');
    input.type = 'radio';
    input.name = name;
    input.className = classe;
    div.appendChild(p);
    div.appendChild(input);
    document.forms[0].appendChild(div);
}


function ft_wn(N, k, n){    
    return {real: Math.cos( (2*Math.PI*n*k)/N ), imag: Math.sin( (2*Math.PI*n*k)/N )};
}

function ft(xn){
    var N = xn.length;

    var X = {real: [], imaginario: []};
    
    for(var k = 0 ; k < N; k++){
        var xr = 0;
        var xi = 0;
        for(var n = 0; n < N; n++){
            var wn = ft_wn(N,k,n); 
            xr += xn[n] * wn.real;
            xi += xn[n] * wn.imag;
        }
        X.real.push(xr);
        X.imaginario.push(xi);    
    }
    return X;
}

function fft(xn){
    var N = xn.length;

    var X = {real: [], imaginario: []};

    for(var k = 0 ; k < N; k++){
        var xi_impar = 0, xr_impar = 0, xi_par = 0, xr_par = 0;
        for(var n = 0; n < N/2 ; n++){
            
            var wn_par = ft_wn(N,k,n*2); 
            
            xi_par += xn[n*2] * wn_par.imag;
            xr_par += xn[n*2] * wn_par.real;

            var wn_impar = ft_wn(N,k,n*2+1); 
            
            xi_impar += xn[n*2+1] * wn_impar.imag;
            xr_impar += xn[n*2+1] * wn_impar.real;
        }
        var wn2 = ft_wn(N,k,1);
        xr_impar = (xr_impar*wn2.real + xi_impar*wn2.imag);
        xi_impar = (xi_impar*wn2.real + xr_impar*wn2.imag);
        X.real.push(xr_par + xr_impar);
        X.imaginario.push(xi_par + xi_impar);    
    }
    return X;
}



/*
 Entradas:
    a = primeiro termo, b = segundo termo, t = vetor de valores
 Saída: 
    vetor de valores calculados referente ao vetor 't'
    Cálculo: 'a' multiplcado pelo 't' referente, mais valor de 'b'
 Exemplo:  
     a = 1, b = 2, t = [1,2]
     r[0] = 1 * 1 + 2 = 3
     r[1] = 1 * 2 + 2 = 4
     r => [3,4]
*/
    function eq_1_grau(a, b, t){
        var r = [];
        for(var i=0; i<t.length; i++){
            if(b !='rand') r.push(a*t[i]+b);
            else r.push(a*t[i] + Math.random())
        }
        return r;
    }


/*
 Entradas:
    ti = Tempo Inicial, tf = Tempo Final, dt = Intervalo
 Saída: 
    vetor de valores com 6 casas decimais, 
    gerados de 'ti' até 'tf' com intevcalos de 'dt'.
 Exemplo:  
     ti = 0, tf = 10, dt = 2.5
     r => [0, 2.5, 5, 7.5, 10]
*/
function basetempo(ti, tf, dt){
    var t = [];
    for(var i=ti; i<= tf; i= i+dt){
        t.push(parseFloat(i.toFixed(6)));
    }
    return t;
}

/*
 Entradas:
    x = escala, t = vetor de valores
 Saída: 
    vetor de valores calculados referente ao vetor 't'
    Cálculo: 'x' dividido por 't' referente
 Exemplo:  
     x = 2, t = [0,1]
     r[0] = 0/2 = 0
     r[1] = 1/2 = .5
     r => [0, .5]
*/
function escala_tempo(x, t){
    var r = [];
    for(var i=0; i<t.length; i++){
       r.push(t[i]/x); 
    }
    return r;
}

/*
 Entradas:
    x = escala, t = vetor de valores
 Saída: 
    vetor de valores calculados referente ao vetor 't'
    Cálculo: 'x' multiplicado por 't' referente
 Exemplo:  
     a = 2, t = [0,1]
     r[0] = 2*0 = 0
     r[1] = 2*1 = 2
     r => [0, 2]
*/
function escala(x, t){
    var r = [];
    for(var i=0; i<t.length; i++){
       r.push(x*t[i]); 
    }
    return r;
}

/*
 Entradas:
    a = amplitude, t = vetor de valores
 Saída: 
    vetor de valores calculados referente ao vetor 't'
    Cálculo: exponencial de 'a'multiplicado por 't' referente
 Exemplo:  
     a = 2, t = [0,1]
     r[0] = exp(2*0) = 1
     r[1] = exp(2*1) = 1,12412
     r => [1, 1.24123]
*/
function exponencial(a, t){
    var r = [];
    for(var i=0; i<t.length; i++){
       r.push(Math.exp(a*t[i])); 
    }
    return r;
}

/*
 Entradas:
    f = frequncia, t = vetor de valores
 Saída: 
    vetor de valores calculados referente ao vetor 't'
    Cálculo: cosseno de 'f' multiplicado pelo 't' referente, em radiano
 Exemplo:  
     a = 2, t = [0,1]
     r[0] = cos(2*0) = 1
     r[1] = cos(2*1) = -0,4161
     r => [1, -0.4161]
*/
function cosseno(f, t){
    var r = [];
    //var r1 = (2 * Math.PI) * f;
    for(var i=0; i<t.length; i++){
       r.push(Math.cos(f * parseFloat(t[i]))); 
    }
    return r;
}


function seno(f, t){
    var r = [];
    //var r1 = (2 * Math.PI) * f;
    for(var i=0; i<t.length; i++){
       r.push(Math.sin(f * parseFloat(t[i]))); 
    }
    return r;
}

function soma_simples(r1,r2){
    r = []
    for(var i=0;i<r1.length;i++){
        r.push(r1[i] + r2[i]);
    }
    return r;
}

function somar_funcoes(t1, r1, t2, r2){    
    var t = [];
    var r = [];
    var t_menor =[];
    var t_maior =[];
    if(t1[0] < t2[0]){
        t_menor = t1;
        t_maior = t2;
    }else{
        t_menor = t2;
        t_maior = t1;
    }

    var aux= null;
    for(var i=t_menor[0]; i<=t_maior[t_maior.length-1]; i=i+(t_menor[1]-t_menor[0])){
        if(i !== aux)t.push(i);
        aux = i;
    }

    for(var i=0;i<t.length;i++){
        for(var j=0;j<t_menor.length;j++)
            if(t[i] == t_menor[j])r[i] = r1[j];
            else if (t_menor[j] > t[i])break;    
        if(typeof r[i] ==  'undefined') r[i] = 0;
        for(var j=0;j<t_maior.length;j++)
            if(t[i] == t_maior[j])r[i] = r2[j];
            else if(t_maior[j] > t[i])break;
    }
    return {t:t, r:r};
}


function mudarEscala(k, res){
    var r = [];
    for(var i=0; i< res.length;i++){
        r.push(res[i]*k);
    }
    return r;
}


/*
 Entradas:
    t_real = vetor dos valores reais, t_imag = vetor dos valores imaginários
 Saída: 
    vetor de valores calculados referente ao vetor 't'
    Cálculo:  raiz quadrada das soma dos catetos ao quadrado, sendo um cateto o valor 
                referente ao vetor real e o outro ao vetor imaginário
 Exemplo:  
    t_real = [1,2], t_image = [4,3]
 	r[0] =   = 4,123
 	r[1] =  = 3,605
 	r => [4.123 , 3.605]
*/

function modulo(t_real, t_imag){
    var r = [];
    for(var i=0;i<t_real.length;i++){
        var cats = Math.pow(t_real[i], 2) + Math.pow(t_imag[i], 2); 
        r.push(Math.sqrt(cats));
    }
    return r;
}

function criarGrafico(etapas, resultados, titulo, continuo){
    var body = document.body;
    var canvas = document.createElement('canvas');
    body.appendChild(canvas);

    for(var i=0;i<etapas.length;i++){
        etapas[i] = parseFloat(etapas[i]).toFixed(2);
        console.log('f('+etapas[i]+') = ', resultados[i]);
    }

     var grafico = new Chart(canvas, {
                type: 'line',
                data: {
                    labels: etapas,
                    datasets: [{
                        label: 'y(t)',
                        data: resultados,
                        borderWidth: 1,
                        backgroundColor: 'rgba(239, 108, 0, 0.2)',
                        borderColor: 'rgba(239, 108, 0,1)',
                        showLine: continuo,
                        pointRadius: (continuo? 0:4),
                        tension: .4,
                        
                    }]
                },
                options: {
                    title: {
                        display: true,
                        text: titulo,
                        fontSize:  18
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:true
                            }
                        }]
                    }
                }
            });
}
