(function() {

    var t_min = 0;
    var t_max = 3.1*Math.PI;
    var delta_t = .1;
    var t = basetempo(0, 3.1*Math.PI, delta_t);
    
    var cos = cosseno(10,t);
    var x1 = escala(2, cos);
    var sen = seno(30, t);
    var x2 = escala(-4, sen);

    var x_t = soma_simples(x1,x2);    
    criarGrafico(t, x_t, 'x(t) = 2cos(10t) - 4 sin(30t)', true);

    var y_t = eq_1_grau(1, 'rand', x_t);
    criarGrafico(t, y_t, 'y(t) = 2cos(10t) - 4 sin(30t) + rand', true);
    
    var fft_x = fft(x_t);
    var fft_y = fft(y_t);

    var f = escala_tempo(delta_t,t);
    
    var mod_x = modulo(fft_x.real, fft_x.imaginario);
    criarGrafico(f, mod_x, 'X(k) = FT( x(t) )', true);
    
    var mod_y = modulo(fft_y.real, fft_y.imaginario);    
    mod_y[0] = mod_y[1];
    criarGrafico(f, mod_y, 'Y(k) = FFT( y(t) )', true);

})();



function ft_wn(N, k, n){    
    return {real: Math.cos( (2*Math.PI*n*k)*1.0 /N ), imag: Math.sin( (2*Math.PI*n*k)*1.0/N )};
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
        for(var n = 1; n <= N ; n+=2){
            var wn_par = ft_wn(N,k,n-1); 
            xi_par += xn[n-1] * wn_par.imag;
            xr_par += xn[n-1] * wn_par.real;
            var wn_impar = ft_wn(N,k,n); 
            xi_impar += xn[n] * wn_impar.imag;
            xr_impar += xn[n] * wn_impar.real;
        }
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
            else r.push(a*t[i] + Math.random()*2)
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
        t.push(parseFloat(i).toFixed(1));
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
       r.push(t[i]*1.0/x); 
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
        etapas[i] = parseFloat(etapas[i]).toFixed(1);
        console.log('f('+etapas[i]+') = ', resultados[i]);
    }
    Chart.defaults.global.defaultFontColor = '#000';
    Chart.defaults.global.defaultFontSize = 11;

     var grafico = new Chart(canvas, {
                type: 'line',
                data: {
                    labels: etapas,
                    datasets: [{
                        label: 'y(t)',
                        data: resultados,
                        borderWidth: 2,
                        borderColor: 'rgb(0, 0, 0)',
                        showLine: continuo,
                        pointRadius: (continuo? 0:4),
                        tension: 0.3
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
                    },
                    legend: {
                        display: false
                    }
                }
            });
}
