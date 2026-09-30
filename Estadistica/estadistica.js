const datosInput =
    document.getElementById("datos");

const resultado =
    document.getElementById("resultado");


function obtenerDatos() {

    const texto =
        datosInput.value.trim();

    if (!texto) {
        return [];
    }

    return texto
        .split(/[,\s]+/)
        .map(Number)
        .filter(numero => Number.isFinite(numero));
}


function calcularEstadistica() {

    const datos =
        obtenerDatos();

    if (datos.length === 0) {

        resultado.innerHTML = `
            <p>No hay datos válidos.</p>
        `;

        return;
    }

    /* =========================
       SUMA
    ========================= */

    const suma =
        datos.reduce(
            (total, numero) =>
                total + numero,
            0
        );


    /* =========================
       MEDIA
    ========================= */

    const media =
        suma / datos.length;


    /* =========================
       ORDENAR
    ========================= */

    const ordenados =
        [...datos].sort(
            (a, b) => a - b
        );


    /* =========================
       MEDIANA
    ========================= */

    const mitad =
        Math.floor(
            ordenados.length / 2
        );

    let mediana;

    if (ordenados.length % 2 === 0) {

        mediana =
            (
                ordenados[mitad - 1] +
                ordenados[mitad]
            ) / 2;

    } else {

        mediana =
            ordenados[mitad];

    }


    /* =========================
       MODA
    ========================= */

    const frecuencia = {};

    datos.forEach(numero => {

        frecuencia[numero] =
            (frecuencia[numero] || 0) + 1;

    });


    const frecuenciaMaxima =
        Math.max(
            ...Object.values(frecuencia)
        );


    let modas =
        Object.keys(frecuencia)
            .filter(
                numero =>
                    frecuencia[numero] ===
                    frecuenciaMaxima
            )
            .map(Number);


    if (frecuenciaMaxima === 1) {

        modas = [];

    }


    /* =========================
       MÍNIMO Y MÁXIMO
    ========================= */

    const minimo =
        Math.min(...datos);

    const maximo =
        Math.max(...datos);


    /* =========================
       RANGO
    ========================= */

    const rango =
        maximo - minimo;

    /* =========================
   VARIANZA Y DESVIACIÓN
========================= */

const varianza =
    datos.reduce(
        (total, numero) =>
            total + Math.pow(numero - media, 2),
        0
    ) / datos.length;

const desviacionEstandar =
    Math.sqrt(varianza);

/* =========================
   TABLA DE FRECUENCIAS
========================= */

const frecuencias = {};

datos.forEach(numero => {

    frecuencias[numero] =
        (frecuencias[numero] || 0) + 1;

});

const valoresOrdenados =
    Object.keys(frecuencias)
        .map(Number)
        .sort((a, b) => a - b);

let tabla = `
    <h3>📊 Tabla de frecuencias</h3>

    <table>
        <thead>
            <tr>
                <th>Valor</th>
                <th>Frecuencia</th>
                <th>Porcentaje</th>
            </tr>
        </thead>

        <tbody>
`;

valoresOrdenados.forEach(valor => {

    const frecuencia =
        frecuencias[valor];

    const porcentaje =
        (frecuencia / datos.length) * 100;

    tabla += `
        <tr>
            <td>${formatoNumero(valor)}</td>
            <td>${frecuencia}</td>
            <td>${formatoNumero(porcentaje)}%</td>
        </tr>
    `;

});

tabla += `
        </tbody>
    </table>
`;

document.getElementById(
    "tablaFrecuencias"
).innerHTML = tabla;
  
    /* =========================
       MOSTRAR
    ========================= */

    resultado.innerHTML = `

        <p>
            <strong>Media:</strong>
            ${formatoNumero(media)}
        </p>

        <p>
            <strong>Mediana:</strong>
            ${formatoNumero(mediana)}
        </p>

        <p>
            <strong>Moda:</strong>
            ${
                modas.length > 0
                ? modas.map(formatoNumero).join(", ")
                : "Sin moda"
            }
        </p>

        <p>
            <strong>Mínimo:</strong>
            ${formatoNumero(minimo)}
        </p>

        <p>
            <strong>Máximo:</strong>
            ${formatoNumero(maximo)}
        </p>

        <p>
            <strong>Rango:</strong>
            ${formatoNumero(rango)}
        </p>

        <p>
    <strong>Varianza:</strong>
    ${formatoNumero(varianza)}
</p>

<p>
    <strong>Desviación estándar:</strong>
    ${formatoNumero(desviacionEstandar)}
</p>

        <p>
            <strong>Cantidad de datos:</strong>
            ${datos.length}
        </p>

        <p>
            <strong>Suma:</strong>
            ${formatoNumero(suma)}
        </p>

    `;
      dibujarGraficaFrecuencias();
}


/* =========================
   FORMATO
========================= */

function formatoNumero(numero) {

    return Number(
        numero.toFixed(10)
    ).toLocaleString("es-MX");

}

function dibujarGraficaFrecuencias() {

    const canvas =
        document.getElementById(
            "graficaEstadistica"
        );

    const ctx =
        canvas.getContext("2d");

    const datos =
        obtenerDatos();

    if (datos.length === 0) {
        return;
    }


    /* =========================
       TAMAÑO DEL CANVAS
    ========================= */

    const ancho =
        canvas.clientWidth;

    const alto =
        canvas.clientHeight;

    const dpr =
        window.devicePixelRatio || 1;

    canvas.width =
        ancho * dpr;

    canvas.height =
        alto * dpr;

    ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );


    /* =========================
       FRECUENCIAS
    ========================= */

    const frecuencias = {};

    datos.forEach(numero => {

        frecuencias[numero] =
            (frecuencias[numero] || 0) + 1;

    });

    const valores =
        Object.keys(frecuencias)
            .map(Number)
            .sort((a, b) => a - b);


    const maxFrecuencia =
        Math.max(
            ...Object.values(frecuencias)
        );


    /* =========================
       LIMPIAR
    ========================= */

    ctx.clearRect(
        0,
        0,
        ancho,
        alto
    );


    /* =========================
       MÁRGENES
    ========================= */

    const margenIzquierdo = 45;
    const margenDerecho = 15;
    const margenSuperior = 20;
    const margenInferior = 45;

    const anchoGrafica =
        ancho -
        margenIzquierdo -
        margenDerecho;

    const altoGrafica =
        alto -
        margenSuperior -
        margenInferior;


    /* =========================
       EJES
    ========================= */

    ctx.strokeStyle = "#333";
    ctx.lineWidth = 1;

    ctx.beginPath();

    ctx.moveTo(
        margenIzquierdo,
        margenSuperior
    );

    ctx.lineTo(
        margenIzquierdo,
        alto - margenInferior
    );

    ctx.lineTo(
        ancho - margenDerecho,
        alto - margenInferior
    );

    ctx.stroke();


    /* =========================
       BARRAS
    ========================= */

    const espacio =
        anchoGrafica /
        valores.length;

    const anchoBarra =
        espacio * 0.65;

    valores.forEach(
        (valor, indice) => {

            const frecuencia =
                frecuencias[valor];

            const altoBarra =
                (
                    frecuencia /
                    maxFrecuencia
                ) * altoGrafica;

            const x =
                margenIzquierdo +
                indice * espacio +
                (espacio - anchoBarra) / 2;

            const y =
                alto -
                margenInferior -
                altoBarra;


            ctx.fillStyle =
                "#1565c0";

            ctx.fillRect(
                x,
                y,
                anchoBarra,
                altoBarra
            );


            /* Valor */

            ctx.fillStyle =
                "#222";

            ctx.font =
                "12px Arial";

            ctx.textAlign =
                "center";

            ctx.fillText(
                formatoNumero(valor),
                x + anchoBarra / 2,
                alto - 25
            );


            /* Frecuencia */

            ctx.fillText(
                frecuencia,
                x + anchoBarra / 2,
                y - 6
            );

        }
    );

}