const listaFormulas =
    document.getElementById("listaFormulas");

const detalleFormula =
    document.getElementById("detalleFormula");

const buscarFormula =
    document.getElementById("buscarFormula");

const botonesCategoria =
    document.querySelectorAll(".categoria-btn");


/* =========================
   BASE DE FÓRMULAS
========================= */

const formulas = [

    /* =========================
       MATEMÁTICAS
    ========================= */

    {
        nombre: "Área de un círculo",
        categoria: "matematicas",
        formula: "A = π × r²",

        descripcion:
            "Calcula el área de un círculo a partir de su radio.",

        variables: [
            "A = área",
            "r = radio"
        ],

        ejemplo:
            "Si r = 5 cm, el área es aproximadamente 78.54 cm².",

        calcular: "circulo"
    },


    {
        nombre: "Área de un rectángulo",
        categoria: "matematicas",
        formula: "A = b × h",

        descripcion:
            "Calcula el área de un rectángulo.",

        variables: [
            "A = área",
            "b = base",
            "h = altura"
        ],

        ejemplo:
            "Si b = 8 cm y h = 4 cm, el área es 32 cm².",

        calcular: "rectangulo"
    },


    {
        nombre: "Teorema de Pitágoras",
        categoria: "matematicas",
        formula: "a² + b² = c²",

        descripcion:
            "Relaciona los lados de un triángulo rectángulo.",

        variables: [
            "a = cateto",
            "b = cateto",
            "c = hipotenusa"
        ],

        ejemplo:
            "Si a = 3 y b = 4, entonces c = 5.",

        calcular: "pitagoras"
    },


    /* =========================
       FÍSICA
    ========================= */

    {
        nombre: "Velocidad",
        categoria: "fisica",
        formula: "v = d / t",

        descripcion:
            "Calcula la velocidad a partir de la distancia recorrida y el tiempo.",

        variables: [
            "v = velocidad",
            "d = distancia",
            "t = tiempo"
        ],

        ejemplo:
            "Si recorres 100 m en 10 s, la velocidad es 10 m/s.",

        calcular: "velocidad"
    },


    {
        nombre: "Segunda ley de Newton",
        categoria: "fisica",
        formula: "F = m × a",

        descripcion:
            "Relaciona la fuerza, la masa y la aceleración.",

        variables: [
            "F = fuerza",
            "m = masa",
            "a = aceleración"
        ],

        ejemplo:
            "Una masa de 5 kg con aceleración de 2 m/s² produce 10 N.",

        calcular: "newton"
    },


    /* =========================
       ELECTRÓNICA
    ========================= */

    {
        nombre: "Ley de Ohm",
        categoria: "electronica",
        formula: "V = I × R",

        descripcion:
            "Relaciona voltaje, corriente y resistencia eléctrica.",

        variables: [
            "V = voltaje",
            "I = corriente",
            "R = resistencia"
        ],

        ejemplo:
            "Con 2 A y 10 Ω, el voltaje es 20 V.",

        calcular: "ohm"
    },


    {
        nombre: "Potencia eléctrica",
        categoria: "electronica",
        formula: "P = V × I",

        descripcion:
            "Calcula la potencia eléctrica.",

        variables: [
            "P = potencia",
            "V = voltaje",
            "I = corriente"
        ],

        ejemplo:
            "Con 12 V y 2 A, la potencia es 24 W.",

        calcular: "potencia"
    }

];


/* =========================
   CATEGORÍA ACTUAL
========================= */

let categoriaActual = "matematicas";


/* =========================
   MOSTRAR FÓRMULAS
========================= */

function mostrarFormulas() {

    const textoBusqueda =
        buscarFormula.value
            .toLowerCase()
            .trim();


    listaFormulas.innerHTML = "";


    const filtradas =
        formulas.filter(formula => {

            const coincideCategoria =
                formula.categoria === categoriaActual;

            const coincideBusqueda =
                formula.nombre
                    .toLowerCase()
                    .includes(textoBusqueda);


            return (
                coincideCategoria &&
                coincideBusqueda
            );

        });


    if (filtradas.length === 0) {

        listaFormulas.innerHTML = `
            <p>
                No se encontraron fórmulas.
            </p>
        `;

        return;

    }


    filtradas.forEach(formula => {

        const tarjeta =
            document.createElement("div");

        tarjeta.className =
            "formula-card";


        tarjeta.innerHTML = `

            <h3>
                ${formula.nombre}
            </h3>

            <p>
                ${formula.formula}
            </p>

        `;


        tarjeta.addEventListener(
            "click",
            () => mostrarDetalle(formula)
        );


        listaFormulas.appendChild(
            tarjeta
        );

    });

}


/* =========================
   MOSTRAR DETALLE
========================= */

function mostrarDetalle(formula) {

    const variables =
        formula.variables
            .map(variable => `<li>${variable}</li>`)
            .join("");


    detalleFormula.innerHTML = `

        <h2>
            ${formula.nombre}
        </h2>

        <h3>
            ${formula.formula}
        </h3>

        <p>
            ${formula.descripcion}
        </p>

        <h3>
            Variables
        </h3>

        <ul>
            ${variables}
        </ul>

        <h3>
            Ejemplo
        </h3>

        <p>
            ${formula.ejemplo}
        </p>

        <button
            class="boton-resolver"
            onclick="mostrarCalculadora('${formula.calcular}')"
        >
            🧮 Resolver fórmula
        </button>

        <div id="calculadoraFormula"></div>

    `;

}


/* =========================
   MOSTRAR CALCULADORA
========================= */

function mostrarCalculadora(tipo) {

    const contenedor =
        document.getElementById(
            "calculadoraFormula"
        );


    if (!contenedor) {
        return;
    }


    /* =========================
       ÁREA DEL CÍRCULO
    ========================= */

    if (tipo === "circulo") {

        contenedor.innerHTML = `

            <h3>
                Calcular área
            </h3>

            <label>
                Radio:
            </label>

            <input
                type="number"
                id="valorRadio"
                placeholder="Ejemplo: 5"
            >

            <button
                onclick="resolverCirculo()"
            >
                Calcular
            </button>

            <div id="resultadoFormula"></div>

        `;

    }


    /* =========================
       RECTÁNGULO
    ========================= */

    else if (tipo === "rectangulo") {

        contenedor.innerHTML = `

            <h3>
                Calcular área
            </h3>

            <label>
                Base:
            </label>

            <input
                type="number"
                id="valorBase"
                placeholder="Ejemplo: 8"
            >

            <label>
                Altura:
            </label>

            <input
                type="number"
                id="valorAltura"
                placeholder="Ejemplo: 4"
            >

            <button
                onclick="resolverRectangulo()"
            >
                Calcular
            </button>

            <div id="resultadoFormula"></div>

        `;

    }


    /* =========================
       PITÁGORAS
    ========================= */

    else if (tipo === "pitagoras") {

        contenedor.innerHTML = `

            <h3>
                Calcular hipotenusa
            </h3>

            <label>
                Cateto A:
            </label>

            <input
                type="number"
                id="valorA"
                placeholder="Ejemplo: 3"
            >

            <label>
                Cateto B:
            </label>

            <input
                type="number"
                id="valorB"
                placeholder="Ejemplo: 4"
            >

            <button
                onclick="resolverPitagoras()"
            >
                Calcular
            </button>

            <div id="resultadoFormula"></div>

        `;

    }


    /* =========================
       VELOCIDAD
    ========================= */

    else if (tipo === "velocidad") {

        contenedor.innerHTML = `

            <h3>
                Calcular velocidad
            </h3>

            <label>
                Distancia:
            </label>

            <input
                type="number"
                id="valorDistancia"
                placeholder="Ejemplo: 100"
            >

            <label>
                Tiempo:
            </label>

            <input
                type="number"
                id="valorTiempo"
                placeholder="Ejemplo: 10"
            >

            <button
                onclick="resolverVelocidad()"
            >
                Calcular
            </button>

            <div id="resultadoFormula"></div>

        `;

    }


    /* =========================
       NEWTON
    ========================= */

    else if (tipo === "newton") {

        contenedor.innerHTML = `

            <h3>
                Calcular fuerza
            </h3>

            <label>
                Masa:
            </label>

            <input
                type="number"
                id="valorMasa"
                placeholder="Ejemplo: 5"
            >

            <label>
                Aceleración:
            </label>

            <input
                type="number"
                id="valorAceleracion"
                placeholder="Ejemplo: 2"
            >

            <button
                onclick="resolverNewton()"
            >
                Calcular
            </button>

            <div id="resultadoFormula"></div>

        `;

    }


    /* =========================
       LEY DE OHM
    ========================= */

    else if (tipo === "ohm") {

        contenedor.innerHTML = `

            <h3>
                ¿Qué quieres calcular?
            </h3>

            <select id="variableOhm">

                <option value="V">
                    Voltaje (V)
                </option>

                <option value="I">
                    Corriente (I)
                </option>

                <option value="R">
                    Resistencia (R)
                </option>

            </select>

            <div id="camposOhm"></div>

            <button
                onclick="prepararOhm()"
            >
                Continuar
            </button>

            <div id="resultadoFormula"></div>

        `;

    }


    /* =========================
       POTENCIA
    ========================= */

    else if (tipo === "potencia") {

        contenedor.innerHTML = `

            <h3>
                Calcular potencia
            </h3>

            <label>
                Voltaje:
            </label>

            <input
                type="number"
                id="valorVoltaje"
                placeholder="Ejemplo: 12"
            >

            <label>
                Corriente:
            </label>

            <input
                type="number"
                id="valorCorriente"
                placeholder="Ejemplo: 2"
            >

            <button
                onclick="resolverPotencia()"
            >
                Calcular
            </button>

            <div id="resultadoFormula"></div>

        `;

    }

}


/* =========================
   CÍRCULO
========================= */

function resolverCirculo() {

    const radio =
        parseFloat(
            document.getElementById(
                "valorRadio"
            ).value
        );


    if (
        !Number.isFinite(radio) ||
        radio < 0
    ) {

        mostrarResultado(
            "Escribe un radio válido."
        );

        return;

    }


    const area =
        Math.PI *
        radio *
        radio;


    mostrarResultado(
        `Área = ${formatear(area)}`
    );

}


/* =========================
   RECTÁNGULO
========================= */

function resolverRectangulo() {

    const base =
        parseFloat(
            document.getElementById(
                "valorBase"
            ).value
        );

    const altura =
        parseFloat(
            document.getElementById(
                "valorAltura"
            ).value
        );


    if (
        !Number.isFinite(base) ||
        !Number.isFinite(altura) ||
        base < 0 ||
        altura < 0
    ) {

        mostrarResultado(
            "Escribe valores válidos."
        );

        return;

    }


    const area =
        base * altura;


    mostrarResultado(
        `Área = ${formatear(area)}`
    );

}


/* =========================
   PITÁGORAS
========================= */

function resolverPitagoras() {

    const a =
        parseFloat(
            document.getElementById(
                "valorA"
            ).value
        );

    const b =
        parseFloat(
            document.getElementById(
                "valorB"
            ).value
        );


    if (
        !Number.isFinite(a) ||
        !Number.isFinite(b) ||
        a < 0 ||
        b < 0
    ) {

        mostrarResultado(
            "Escribe valores válidos."
        );

        return;

    }


    const c =
        Math.sqrt(
            a * a +
            b * b
        );


    mostrarResultado(
        `c = ${formatear(c)}`
    );

}


/* =========================
   VELOCIDAD
========================= */

function resolverVelocidad() {

    const distancia =
        parseFloat(
            document.getElementById(
                "valorDistancia"
            ).value
        );

    const tiempo =
        parseFloat(
            document.getElementById(
                "valorTiempo"
            ).value
        );


    if (
        !Number.isFinite(distancia) ||
        !Number.isFinite(tiempo) ||
        distancia < 0 ||
        tiempo <= 0
    ) {

        mostrarResultado(
            "Escribe valores válidos."
        );

        return;

    }


    const velocidad =
        distancia / tiempo;


    mostrarResultado(
        `v = ${formatear(velocidad)}`
    );

}


/* =========================
   NEWTON
========================= */

function resolverNewton() {

    const masa =
        parseFloat(
            document.getElementById(
                "valorMasa"
            ).value
        );

    const aceleracion =
        parseFloat(
            document.getElementById(
                "valorAceleracion"
            ).value
        );


    if (
        !Number.isFinite(masa) ||
        !Number.isFinite(aceleracion) ||
        masa < 0
    ) {

        mostrarResultado(
            "Escribe valores válidos."
        );

        return;

    }


    const fuerza =
        masa * aceleracion;


    mostrarResultado(
        `F = ${formatear(fuerza)}`
    );

}


/* =========================
   LEY DE OHM
========================= */

function prepararOhm() {

    const variable =
        document.getElementById(
            "variableOhm"
        ).value;

    const campos =
        document.getElementById(
            "camposOhm"
        );


    if (variable === "V") {

        campos.innerHTML = `

            <label>
                Corriente (I):
            </label>

            <input
                type="number"
                id="ohmI"
                placeholder="Ejemplo: 2"
            >

            <label>
                Resistencia (R):
            </label>

            <input
                type="number"
                id="ohmR"
                placeholder="Ejemplo: 10"
            >

            <button
                onclick="resolverOhm()"
            >
                Calcular
            </button>

        `;

    }

    else if (variable === "I") {

        campos.innerHTML = `

            <label>
                Voltaje (V):
            </label>

            <input
                type="number"
                id="ohmV"
                placeholder="Ejemplo: 20"
            >

            <label>
                Resistencia (R):
            </label>

            <input
                type="number"
                id="ohmR"
                placeholder="Ejemplo: 10"
            >

            <button
                onclick="resolverOhm()"
            >
                Calcular
            </button>

        `;

    }

    else if (variable === "R") {

        campos.innerHTML = `

            <label>
                Voltaje (V):
            </label>

            <input
                type="number"
                id="ohmV"
                placeholder="Ejemplo: 20"
            >

            <label>
                Corriente (I):
            </label>

            <input
                type="number"
                id="ohmI"
                placeholder="Ejemplo: 2"
            >

            <button
                onclick="resolverOhm()"
            >
                Calcular
            </button>

        `;

    }

}


/* =========================
   RESOLVER OHM
========================= */

function resolverOhm() {

    const variable =
        document.getElementById(
            "variableOhm"
        ).value;


    let resultado;


    if (variable === "V") {

        const I =
            parseFloat(
                document.getElementById(
                    "ohmI"
                ).value
            );

        const R =
            parseFloat(
                document.getElementById(
                    "ohmR"
                ).value
            );


        if (
            !Number.isFinite(I) ||
            !Number.isFinite(R)
        ) {

            mostrarResultado(
                "Escribe valores válidos."
            );

            return;

        }


        resultado = I * R;


        mostrarResultado(
            `V = ${formatear(resultado)} V`
        );

    }


    else if (variable === "I") {

        const V =
            parseFloat(
                document.getElementById(
                    "ohmV"
                ).value
            );

        const R =
            parseFloat(
                document.getElementById(
                    "ohmR"
                ).value
            );


        if (
            !Number.isFinite(V) ||
            !Number.isFinite(R) ||
            R === 0
        ) {

            mostrarResultado(
                "Escribe valores válidos."
            );

            return;

        }


        resultado = V / R;


        mostrarResultado(
            `I = ${formatear(resultado)} A`
        );

    }


    else if (variable === "R") {

        const V =
            parseFloat(
                document.getElementById(
                    "ohmV"
                ).value
            );

        const I =
            parseFloat(
                document.getElementById(
                    "ohmI"
                ).value
            );


        if (
            !Number.isFinite(V) ||
            !Number.isFinite(I) ||
            I === 0
        ) {

            mostrarResultado(
                "Escribe valores válidos."
            );

            return;

        }


        resultado = V / I;


        mostrarResultado(
            `R = ${formatear(resultado)} Ω`
        );

    }

}

/* =========================
   POTENCIA
========================= */

function resolverPotencia() {

    const voltaje =
        parseFloat(
            document.getElementById(
                "valorVoltaje"
            ).value
        );

    const corriente =
        parseFloat(
            document.getElementById(
                "valorCorriente"
            ).value
        );


    if (
        !Number.isFinite(voltaje) ||
        !Number.isFinite(corriente)
    ) {

        mostrarResultado(
            "Escribe valores válidos."
        );

        return;

    }


    const potencia =
        voltaje * corriente;


    mostrarResultado(
        `P = ${formatear(potencia)} W`
    );

}


/* =========================
   MOSTRAR RESULTADO
========================= */

function mostrarResultado(texto) {

    const resultado =
        document.getElementById(
            "resultadoFormula"
        );


    if (!resultado) {
        return;
    }


    resultado.innerHTML = `
        <strong>
            ${texto}
        </strong>
    `;

}


/* =========================
   FORMATEAR RESULTADO
========================= */

function formatear(numero) {

    return Number(
        numero.toFixed(10)
    ).toLocaleString(
        "es-MX"
    );

}


/* =========================
   CAMBIAR CATEGORÍA
========================= */

botonesCategoria.forEach(
    boton => {

        boton.addEventListener(
            "click",
            () => {

                botonesCategoria.forEach(
                    otroBoton =>
                        otroBoton.classList.remove(
                            "activo"
                        )
                );


                boton.classList.add(
                    "activo"
                );


                categoriaActual =
                    boton.dataset.categoria;


                mostrarFormulas();

            }
        );

    }
);


/* =========================
   BUSCADOR
========================= */

buscarFormula.addEventListener(
    "input",
    mostrarFormulas
);


/* =========================
   INICIAR
========================= */

mostrarFormulas();