
"use strict";

// MENÚ PARA CELULARES
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

if (menuToggle && nav) {
    menuToggle.addEventListener("click", function () {
        const abierto = nav.classList.toggle("menu-abierto");
        menuToggle.setAttribute("aria-expanded", String(abierto));
        menuToggle.setAttribute(
            "aria-label",
            abierto ? "Cerrar menú" : "Abrir menú"
        );
        menuToggle.textContent = abierto ? "✕" : "☰";
    });

    nav.querySelectorAll("a").forEach(function (enlace) {
        enlace.addEventListener("click", function () {
            nav.classList.remove("menu-abierto");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Abrir menú");
            menuToggle.textContent = "☰";
        });
    });
}

// BOTÓN SORPRESA
const surpriseBtn = document.getElementById("surpriseBtn");
const surpriseMessage = document.getElementById("surpriseMessage");

if (surpriseBtn && surpriseMessage) {
    surpriseBtn.addEventListener("click", function () {
        surpriseMessage.hidden = !surpriseMessage.hidden;

        const texto = surpriseBtn.querySelector("small");

        if (texto) {
            texto.textContent = surpriseMessage.hidden
                ? "TOCÁ AQUÍ"
                : "¡SORPRESA! ❤️";
        }

        if (!surpriseMessage.hidden) {
            surpriseMessage.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }
    });
}

// PREGUNTAS ROMÁNTICAS
const preguntas = [
    {
        texto: "¿Qué es lo que más quiero hacer con vos?",
        opciones: [
            "Crear muchos recuerdos juntos",
            "Competir por todo",
            "No volver a hablar"
        ],
        correcta: 0
    },
    {
        texto: "¿Por qué hice esta página?",
        opciones: [
            "Porque tenía una tarea",
            "Porque sos especial para mí",
            "Porque estaba aburrido"
        ],
        correcta: 1
    },
    {
        texto: "¿Qué es importante en nuestra relación?",
        opciones: [
            "La confianza y el respeto",
            "Tener siempre la razón",
            "Nunca hablar de los problemas"
        ],
        correcta: 0
    },
    {
        texto: "¿Qué quiero que recordés siempre?",
        opciones: [
            "Que esta página es una tarea",
            "Que sos muy especial para mí",
            "Que me debés una computadora"
        ],
        correcta: 1
    }
];

let indice = 0;
let puntuacion = 0;
let respondida = false;

const questionCount = document.getElementById("questionCount");
const questionText = document.getElementById("questionText");
const answers = document.getElementById("answers");
const quizFeedback = document.getElementById("quizFeedback");
const nextQuestion = document.getElementById("nextQuestion");

function mostrarPregunta() {
    const actual = preguntas[indice];

    questionCount.textContent =
        `Pregunta ${indice + 1} de ${preguntas.length}`;

    questionText.textContent = actual.texto;
    answers.replaceChildren();
    quizFeedback.textContent = "";
    nextQuestion.disabled = true;
    nextQuestion.textContent = "Siguiente pregunta →";
    respondida = false;

    actual.opciones.forEach(function (texto, i) {
        const boton = document.createElement("button");
        boton.type = "button";
        boton.className = "opcion";
        boton.textContent = texto;

        boton.addEventListener("click", function () {
            comprobarRespuesta(i, boton);
        });

        answers.appendChild(boton);
    });
}

function comprobarRespuesta(seleccion, botonSeleccionado) {
    if (respondida) return;

    respondida = true;

    const correcta = preguntas[indice].correcta;
    const botones = answers.querySelectorAll(".opcion");

    botones.forEach(function (boton, i) {
        boton.disabled = true;

        if (i === correcta) {
            boton.classList.add("correcta");
        }
    });

    if (seleccion === correcta) {
        puntuacion++;
        quizFeedback.textContent =
            "¡Correcto! ❤️ Me encanta compartir estos momentos con vos.";
    } else {
        botonSeleccionado.classList.add("incorrecta");
        quizFeedback.textContent =
            "¡Casi! 💗 Lo importante es seguir creando recuerdos juntos.";
    }

    nextQuestion.disabled = false;

    if (indice === preguntas.length - 1) {
        nextQuestion.textContent = "Ver resultado 💕";
    }
}

function mostrarResultadoFinal() {
    questionCount.textContent = "¡Juego terminado! 💕";
    questionText.textContent = "Gracias por jugar, Ashley.";
    answers.replaceChildren();

    quizFeedback.textContent =
        `Tu puntuación: ${puntuacion} de ${preguntas.length}. ` +
        (puntuacion === preguntas.length
            ? "¡Perfecto, mi amor! ❤️"
            : "Lo bonito es todo lo que seguimos compartiendo. 💗");

    nextQuestion.disabled = false;
    nextQuestion.textContent = "Jugar otra vez ↻";
}

if (nextQuestion && questionText && answers &&
    questionCount && quizFeedback) {

    nextQuestion.addEventListener("click", function () {
        if (indice >= preguntas.length) {
            indice = 0;
            puntuacion = 0;
            mostrarPregunta();
            return;
        }

        if (!respondida) return;

        indice++;

        if (indice < preguntas.length) {
            mostrarPregunta();
        } else {
            mostrarResultadoFinal();
            indice = preguntas.length;
        }
    });

    mostrarPregunta();
}
