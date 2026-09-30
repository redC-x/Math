const figura = document.getElementById("figura");
const campos = document.getElementById("campos");
const resultado = document.getElementById("resultado");


figura.addEventListener("change", mostrarCampos);


function mostrarCampos() {

    const tipo = figura.value;

    campos.innerHTML = "";

    if (tipo === "cuadrado") {

        campos.innerHTML = `
            <label>Lado:</label>
            <input
                type="number"
                id="lado"
                placeholder="Ejemplo: 5"
                step="any"
            >
        `;

    }


    if (tipo === "rectangulo") {

        campos.innerHTML = `
            <label>Base:</label>
            <input
                type="number"
                id="base"
                placeholder="Ejemplo: 10"
                step="any"
            >

            <label>Altura:</label>
            <input
                type="number"
                id="altura"
                placeholder="Ejemplo: 5"
                step="any"
            >
        `;

    }


    if (tipo === "triangulo") {

        campos.innerHTML = `
            <label>Base:</label>
            <input
                type="number"
                id="base"
                placeholder="Ejemplo: 10"
                step="any"
            >

            <label>Altura:</label>
            <input
                type="number"
                id="altura"
                placeholder="Ejemplo: 6"
                step="any"
            >

            <label>Lado 1:</label>
            <input
                type="number"
                id="lado1"
                placeholder="Ejemplo: 5"
                step="any"
            >

            <label>Lado 2:</label>
            <input
                type="number"
                id="lado2"
                placeholder="Ejemplo: 5"
                step="any"
            >

            <label>Lado 3:</label>
            <input
                type="number"
                id="lado3"
                placeholder="Ejemplo: 8"
                step="any"
            >
        `;

    }


    if (tipo === "circulo") {

        campos.innerHTML = `
            <label>Radio:</label>
            <input
                type="number"
                id="radio"
                placeholder="Ejemplo: 5"
                step="any"
            >
        `;

    }

}


function obtenerNumero(id) {

    const elemento =
        document.getElementById(id);

    return Number(elemento.value);

}


function formatoNumero(numero) {

    return Number(
        numero.toFixed(10)
    ).toLocaleString("es-MX");

}


function calcular() {

    const tipo = figura.value;


    if (tipo === "cuadrado") {

        const lado =
            obtenerNumero("lado");

        if (lado <= 0) {
            mostrarError();
            return;
        }

        const area =
            lado * lado;

        const perimetro =
            lado * 4;

        resultado.innerHTML = `
            <p>
                <strong>Área:</strong>
                ${formatoNumero(area)}
            </p>

            <p>
                <strong>Perímetro:</strong>
                ${formatoNumero(perimetro)}
            </p>
        `;

    }


    if (tipo === "rectangulo") {

        const base =
            obtenerNumero("base");

        const altura =
            obtenerNumero("altura");

        if (base <= 0 || altura <= 0) {
            mostrarError();
            return;
        }

        const area =
            base * altura;

        const perimetro =
            2 * (base + altura);

        resultado.innerHTML = `
            <p>
                <strong>Área:</strong>
                ${formatoNumero(area)}
            </p>

            <p>
                <strong>Perímetro:</strong>
                ${formatoNumero(perimetro)}
            </p>
        `;

    }


    if (tipo === "triangulo") {

        const base =
            obtenerNumero("base");

        const altura =
            obtenerNumero("altura");

        const lado1 =
            obtenerNumero("lado1");

        const lado2 =
            obtenerNumero("lado2");

        const lado3 =
            obtenerNumero("lado3");

        if (
            base <= 0 ||
            altura <= 0 ||
            lado1 <= 0 ||
            lado2 <= 0 ||
            lado3 <= 0
        ) {
            mostrarError();
            return;
        }

        const area =
            (base * altura) / 2;

        const perimetro =
            lado1 + lado2 + lado3;

        resultado.innerHTML = `
            <p>
                <strong>Área:</strong>
                ${formatoNumero(area)}
            </p>

            <p>
                <strong>Perímetro:</strong>
                ${formatoNumero(perimetro)}
            </p>
        `;

    }


    if (tipo === "circulo") {

        const radio =
            obtenerNumero("radio");

        if (radio <= 0) {
            mostrarError();
            return;
        }

        const area =
            Math.PI * radio * radio;

        const perimetro =
            2 * Math.PI * radio;

        resultado.innerHTML = `
            <p>
                <strong>Área:</strong>
                ${formatoNumero(area)}
            </p>

            <p>
                <strong>Circunferencia:</strong>
                ${formatoNumero(perimetro)}
            </p>
        `;

    }

}


function mostrarError() {

    resultado.innerHTML = `
        <p>
            ⚠️ Introduce valores mayores que cero.
        </p>
    `;

}


mostrarCampos();