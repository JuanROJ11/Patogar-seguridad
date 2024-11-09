const darkModeBtn = document.getElementById('darkModeBtn');
const languageEspañolBtn = document.getElementById('languageEspañolBtn');
const languageInglesBtn = document.getElementById('languageInglesBtn');
const call911Btn = document.getElementById('call911Btn');
const solveProblemBtn = document.getElementById('solveProblemBtn');
const resolvedBtn = document.getElementById('resolvedBtn');
const problemsSelect = document.getElementById('problems');
const solutionText = document.getElementById('solutionText');
const historyList = document.getElementById('historyList');
const alarmSound = document.getElementById('alarmSound');


const solutions = {
    es: {
        1: ["Reemplazar la chapa con una nueva.", "Revisar las conexiones de la chapa y asegurarse de que estén en buen estado.", "Contactar a un cerrajero para cambiar la chapa."],
        2: ["Revisar las cámaras de seguridad para obtener más detalles.", "Verificar si hay huellas de entrada no autorizada.", "Asegurarse de que la cerradura esté funcionando correctamente."],
        3: ["Llamar a la policía inmediatamente.", "Asegurarse de que las cámaras de seguridad estén funcionando.", "Revisar las grabaciones de seguridad para obtener pruebas."],
        4: ["Revisar si el sistema de la chapa necesita una actualización de firmware.", "Probar desconectar y volver a conectar la chapa.", "Contactar a soporte técnico para revisar la chapa."]
    },
    en: {
        1: ["Replace the lock with a new one.", "Check the lock connections to ensure they are in good condition.", "Contact a locksmith to change the lock."],
        2: ["Review security cameras for more details.", "Check for evidence of unauthorized entry.", "Ensure that the lock is functioning properly."],
        3: ["Call the police immediately.", "Ensure that security cameras are functioning.", "Review security recordings for evidence."],
        4: ["Check if the lock system needs a firmware update.", "Try disconnecting and reconnecting the lock.", "Contact technical support to check the lock."]
    }
};

let currentLanguage = 'es';


solveProblemBtn.addEventListener('click', () => {
    const selectedProblem = problemsSelect.value;
    let problemText = '';
    let randomSolution = '';

    
    switch (selectedProblem) {
        case '1': problemText = currentLanguage === 'es' ? 'La chapa está rota' : 'The lock is broken'; break;
        case '2': problemText = currentLanguage === 'es' ? 'Alguien abrió la puerta' : 'Someone opened the door'; break;
        case '3': problemText = currentLanguage === 'es' ? 'Se detectó forcejeo' : 'Forced entry detected'; break;
        case '4': problemText = currentLanguage === 'es' ? 'La chapa está fallando, puede ser un error técnico' : 'The lock is malfunctioning, it might be a technical error'; break;
    }

    
    randomSolution = solutions[currentLanguage][selectedProblem][Math.floor(Math.random() * solutions[currentLanguage][selectedProblem].length)];

    const date = new Date().toLocaleString();
    addHistoryEntry(problemText, randomSolution, date);
    solutionText.textContent = `Solución: ${randomSolution}`;

    
    if (selectedProblem === '3' || selectedProblem === '4') {
        alarmSound.play();
    }
});


resolvedBtn.addEventListener('click', () => {
    solutionText.textContent = "Se logró resolver el problema.";
    if (!alarmSound.paused) {
        alarmSound.pause();
        alarmSound.currentTime = 0;
    }
});


function addHistoryEntry(problem, solution, date) {
    const li = document.createElement('li');
    li.textContent = `${problem} - Solución: ${solution} - Fecha: ${date}`;
    historyList.appendChild(li);
}


call911Btn.addEventListener('click', () => {
    alert("Llamando al 911...");
    window.location.href = 'tel:911';
});


languageEspañolBtn.addEventListener('click', () => { changeLanguage('es'); });
languageInglesBtn.addEventListener('click', () => { changeLanguage('en'); });

function changeLanguage(lang) {
    currentLanguage = lang;
    const translations = {
        en: {
            header: "Select the problem",
            problemLabel: "Problem:",
            solutionText: "Select a problem to view the solution.",
            solveProblemBtn: "Solve Problem",
            resolvedBtn: "Problem Resolved",
            languageEspañolBtn: "Español",
            languageInglesBtn: "English",
            problems: ["The lock is broken", "Someone opened the door", "Forced entry detected", "The lock is malfunctioning, it might be a technical error"],
            history: "History of Resolutions"
        },
        es: {
            header: "Seleccione el problema",
            problemLabel: "Problema:",
            solutionText: "Seleccione un problema para ver la solución.",
            solveProblemBtn: "Solucionar Problema",
            resolvedBtn: "Se resolvió el problema",
            languageEspañolBtn: "Español",
            languageInglesBtn: "Inglés",
            problems: ["La chapa está rota", "Alguien abrió la puerta", "Se detectó forcejeo", "La chapa está fallando, puede ser un error técnico"],
            history: "Historial de Resoluciones"
        }
    };

    const translation = translations[lang];
    document.getElementById('mainTitle').textContent = translation.header;
    document.querySelector('label').textContent = translation.problemLabel;
    solutionText.textContent = translation.solutionText;
    solveProblemBtn.textContent = translation.solveProblemBtn;
    resolvedBtn.textContent = translation.resolvedBtn;
    languageEspañolBtn.textContent = translation.languageEspañolBtn;
    languageInglesBtn.textContent = translation.languageInglesBtn;
    document.getElementById('historyTitle').textContent = translation.history;

    const options = problemsSelect.querySelectorAll('option');
    options.forEach((option, index) => {
        option.textContent = translation.problems[index];
    });
}


darkModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});
const supportBtn = document.getElementById('supportBtn');

supportBtn.addEventListener('click', () => {
    window.location.href = 'https://seguridad68.webnode.mx/contacto/';
});
