document.getElementById("cedula").addEventListener("input", function(event) {
    let cedula = event.target.value.replace(/\D/g, '');
    let formateada = formatearCedula(cedula);
    event.target.value = formateada;
});

document.getElementById("cedulaForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let cedula = document.getElementById("cedula").value.replace(/\D/g, '');
    let resultado = validarCedula(cedula);
    
    let resultadoTexto = document.getElementById("resultado");
    if (resultado) {
        resultadoTexto.textContent = "Cédula válida.";
        resultadoTexto.style.color = "green";
    } else {
        resultadoTexto.textContent = "Cédula inválida.";
        resultadoTexto.style.color = "red";
    }
});

function validarCedula(cedula) {

    if (cedula.length !== 11 || isNaN(cedula)) {
        return false;
    }

    let total = 0;
    let multiplicador = [1, 2];

    for (let i = 0; i < cedula.length; i++) {
        let digito = parseInt(cedula[i]);
        let multiplicado = digito * multiplicador[i % 2];

        if (multiplicado > 9) {
            multiplicado = Math.floor(multiplicado / 10) + (multiplicado % 10);
        }

        total += multiplicado;
    }

    return total % 10 === 0;
}

function formatearCedula(cedula) {
    let parte1 = cedula.substring(0, 3);
    let parte2 = cedula.substring(3, 10);
    let parte3 = cedula.substring(10, 11);

    if (cedula.length > 10) {
        return `${parte1}-${parte2}-${parte3}`;
    } else if (cedula.length > 3) {
        return `${parte1}-${parte2}`;
    } else {
        return parte1;
    }
}
