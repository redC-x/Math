const categoria =
    document.getElementById("categoria");

const cantidad =
    document.getElementById("cantidad");

const unidadOrigen =
    document.getElementById("unidadOrigen");

const unidadDestino =
    document.getElementById("unidadDestino");

const resultado =
    document.getElementById("resultado");


/* =========================
   UNIDADES
========================= */

const unidades = {

    longitud: {

        mm: "Milímetros (mm)",
        cm: "Centímetros (cm)",
        m: "Metros (m)",
        km: "Kilómetros (km)",
        in: "Pulgadas (in)",
        ft: "Pies (ft)",
        yd: "Yardas (yd)",
        mi: "Millas (mi)"

    },

    masa: {

        mg: "Miligramos (mg)",
        g: "Gramos (g)",
        kg: "Kilogramos (kg)",
        oz: "Onzas (oz)",
        lb: "Libras (lb)"

    },

    temperatura: {

        C: "Celsius (°C)",
        F: "Fahrenheit (°F)",
        K: "Kelvin (K)"

    },

    sistemas: {

        decimal: "Decimal",
        binario: "Binario",
        octal: "Octal",
        hexadecimal: "Hexadecimal"

    }

};


/* =========================
   CARGAR UNIDADES
========================= */

function cargarUnidades() {

    const tipo =
        categoria.value;

    unidadOrigen.innerHTML = "";
    unidadDestino.innerHTML = "";

    const disponibles =
        unidades[tipo];

    if (!disponibles) {
        return;
    }

    for (
        const codigo in disponibles
    ) {

        const opcionOrigen =
            document.createElement("option");

        opcionOrigen.value =
            codigo;

        opcionOrigen.textContent =
            disponibles[codigo];

        unidadOrigen.appendChild(
            opcionOrigen
        );


        const opcionDestino =
            document.createElement("option");

        opcionDestino.value =
            codigo;

        opcionDestino.textContent =
            disponibles[codigo];

        unidadDestino.appendChild(
            opcionDestino
        );

    }


    /* Selección inicial */

    if (unidadOrigen.options.length > 1) {

        unidadDestino.selectedIndex = 1;

    }

}


/* =========================
   CONVERTIR LONGITUD
========================= */

function convertirLongitud(
    valor,
    origen,
    destino
) {

    const metros = {

        mm: 0.001,
        cm: 0.01,
        m: 1,
        km: 1000,
        in: 0.0254,
        ft: 0.3048,
        yd: 0.9144,
        mi: 1609.344

    };

    const valorEnMetros =
        valor * metros[origen];

    return valorEnMetros /
        metros[destino];

}


/* =========================
   CONVERTIR MASA
========================= */

function convertirMasa(
    valor,
    origen,
    destino
) {

    const gramos = {

        mg: 0.001,
        g: 1,
        kg: 1000,
        oz: 28.349523125,
        lb: 453.59237

    };

    const valorEnGramos =
        valor * gramos[origen];

    return valorEnGramos /
        gramos[destino];

}


/* =========================
   CONVERTIR TEMPERATURA
========================= */

function convertirTemperatura(
    valor,
    origen,
    destino
) {

    let celsius;


    if (origen === "C") {

        celsius = valor;

    }

    else if (origen === "F") {

        celsius =
            (valor - 32) *
            5 / 9;

    }

    else if (origen === "K") {

        celsius =
            valor - 273.15;

    }


    if (destino === "C") {

        return celsius;

    }

    if (destino === "F") {

        return (
            celsius * 9 / 5
        ) + 32;

    }

    if (destino === "K") {

        return celsius + 273.15;

    }

}


/* =========================
   CONVERTIR SISTEMAS
========================= */

function convertirSistema(
    valor,
    origen,
    destino
) {

    let decimal;


    /* =========================
       VALIDAR Y CONVERTIR A DECIMAL
    ========================= */

    if (origen === "decimal") {

        if (!/^[0-9]+$/.test(valor)) {
            return NaN;
        }

        decimal = parseInt(valor, 10);

    }

    else if (origen === "binario") {

        if (!/^[01]+$/.test(valor)) {
            return NaN;
        }

        decimal = parseInt(valor, 2);

    }

    else if (origen === "octal") {

        if (!/^[0-7]+$/.test(valor)) {
            return NaN;
        }

        decimal = parseInt(valor, 8);

    }

    else if (origen === "hexadecimal") {

        if (!/^[0-9a-fA-F]+$/.test(valor)) {
            return NaN;
        }

        decimal = parseInt(valor, 16);

    }


    if (isNaN(decimal)) {

        return NaN;

    }


    /* =========================
       CONVERTIR DESDE DECIMAL
    ========================= */

    if (destino === "decimal") {

        return decimal.toString(10);

    }

    if (destino === "binario") {

        return decimal.toString(2);

    }

    if (destino === "octal") {

        return decimal.toString(8);

    }

    if (destino === "hexadecimal") {

        return decimal
            .toString(16)
            .toUpperCase();

    }

}

/* =========================
   CONVERTIR
========================= */

function convertir() {

    const valorTexto =
        cantidad.value.trim();


    if (valorTexto === "") {

        resultado.textContent =
            "Resultado: escribe una cantidad válida";

        return;

    }


    const tipo =
        categoria.value;

    const origen =
        unidadOrigen.value;

    const destino =
        unidadDestino.value;


    /* =========================
       SISTEMAS NUMÉRICOS
    ========================= */

    if (tipo === "sistemas") {

        const convertido =
            convertirSistema(
                valorTexto,
                origen,
                destino
            );


        if (
            Number.isNaN(
                convertido
            )
        ) {

            resultado.textContent =
                "Resultado: número no válido para esa base";

            return;

        }


        resultado.textContent =
            "Resultado: " +
            convertido;

        return;

    }


    /* =========================
       UNIDADES NORMALES
    ========================= */

    const valor =
        parseFloat(
            valorTexto
        );


    if (isNaN(valor)) {

        resultado.textContent =
            "Resultado: escribe una cantidad válida";

        return;

    }


    let convertido;


    if (tipo === "longitud") {

        convertido =
            convertirLongitud(
                valor,
                origen,
                destino
            );

    }

    else if (tipo === "masa") {

        convertido =
            convertirMasa(
                valor,
                origen,
                destino
            );

    }

    else if (tipo === "temperatura") {

        convertido =
            convertirTemperatura(
                valor,
                origen,
                destino
            );

    }


    resultado.textContent =
        "Resultado: " +
        formatoNumero(
            convertido
        );

}


/* =========================
   FORMATO
========================= */

function formatoNumero(
    numero
) {

    if (
        !Number.isFinite(
            numero
        )
    ) {

        return "—";

    }

    return Number(
        numero.toFixed(10)
    ).toLocaleString(
        "es-MX"
    );

}


/* =========================
   CAMBIAR CATEGORIA
========================= */

categoria.addEventListener(
    "change",
    cargarUnidades
);


/* =========================
   CAMBIAR TIPO
========================= */

function cambiarTipoConversion() {

    const tipo =
        document.getElementById(
            "tipoConversion"
        ).value;


    if (tipo === "sistemas") {

        categoria.innerHTML = `
            <option value="sistemas">
                Sistemas numéricos
            </option>
        `;

        cargarUnidades();

    }

    else {

        categoria.innerHTML = `
            <option value="longitud">
                Longitud
            </option>

            <option value="masa">
                Masa
            </option>

            <option value="temperatura">
                Temperatura
            </option>
        `;

        cargarUnidades();

    }

}


/* =========================
   INICIAR
========================= */

cargarUnidades();