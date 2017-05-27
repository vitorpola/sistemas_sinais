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

