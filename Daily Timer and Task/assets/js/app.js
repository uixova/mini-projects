let timeLeft = 25 * 60;
let timerId = null;
let isRunning = false;
let mode = 'timer';
let isLocked = JSON.parse(localStorage.getItem('tasksLocked')) || false;

const timerDisplay = document.getElementById('timer-display');
const startBtn = document.getElementById('start-btn');
const btnText = document.getElementById('btn-text');
const modeBtn = document.getElementById('mode-toggle');
const dailyTimeEl = document.getElementById('daily-session-time');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const lockBtn = document.getElementById('lock-tasks');
const noiseBtn = document.getElementById('white-noise-btn');
const noiseMenu = document.getElementById('noise-menu');
const audioPlayer = document.getElementById('bg-audio');

// SES KÜTÜPHANESİ (Listeler halinde)
const soundLibrary = {
    rain: ['assets/sounds/rain1.mp3'],
    forest: ['assets/sounds/forest1.mp3'],
    cafe: ['assets/sounds/cafe.mp3', 'assets/sounds/cafe2.mp3', 
        'assets/sounds/cafe3.mp3', 'assets/sounds/cafe4.mp3', 
        'assets/sounds/cafe5.mp3', 'assets/sounds/cafe6.mp3', 
        'assets/sounds/cafe7.mp3', 'assets/sounds/cafe8.mp3'],
    waves: ['assets/sounds/waves1.mp3']
};

// --- EKRAN GÜNCELLEME ---
function updateDisplay() {
    let m = Math.floor(Math.abs(timeLeft) / 60);
    let s = Math.abs(timeLeft) % 60;
    timerDisplay.value = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

// --- TIMER GİRİŞ KONTROLLERİ ---
timerDisplay.addEventListener('input', (e) => {
    let val = e.target.value.replace(/[^0-9:]/g, '');
    if (val.includes(':')) {
        let parts = val.split(':');
        parts = parts.map(p => {
            let n = p.substring(0, 2);
            return parseInt(n) > 60 ? "60" : n;
        });
        val = parts.join(':');
    } else {
        if (val.length > 2) val = val.substring(0, 2) + ':' + val.substring(2, 4);
        if (parseInt(val) > 60) val = "60";
    }
    e.target.value = val;
});

timerDisplay.addEventListener('change', (e) => {
    if (mode === 'timer') {
        const parts = e.target.value.split(':');
        timeLeft = parts.length === 2 ? (parseInt(parts[0]) * 60) + (parseInt(parts[1]) || 0) : parseInt(parts[0]) * 60;
        updateDisplay();
    }
});

// --- TIMER ÇALIŞTIRMA ---
function startTimer() {
    if (isRunning) {
        clearInterval(timerId);
        btnText.textContent = "Start to Focus";
        startBtn.querySelector('i').classList.replace('fa-pause', 'fa-play');
    } else {
        btnText.textContent = "Pause";
        startBtn.querySelector('i').classList.replace('fa-play', 'fa-pause');
        timerId = setInterval(() => {
            mode === 'timer' ? timeLeft-- : timeLeft++;
            if (mode === 'timer' && timeLeft <= 0) completeSession();
            updateDisplay();
        }, 1000);
    }
    isRunning = !isRunning;
}

modeBtn.addEventListener('click', () => {
    clearInterval(timerId);
    isRunning = false;
    btnText.textContent = "Start to Focus";
    startBtn.querySelector('i').className = 'fa-solid fa-play';
    if (mode === 'timer') {
        mode = 'chrono'; timeLeft = 0;
        modeBtn.classList.add('active-mode');
        modeBtn.querySelector('span').textContent = "Chrono Mode";
    } else {
        mode = 'timer'; timeLeft = 25 * 60;
        modeBtn.classList.remove('active-mode');
        modeBtn.querySelector('span').textContent = "Timer Mode";
    }
    updateDisplay();
});

function completeSession() {
    clearInterval(timerId);
    alert("Focus session completed!");
    addRecord(document.getElementById('current-focus-name').textContent, "Completed");
    timeLeft = 25 * 60; isRunning = false;
    btnText.textContent = "Start to Focus";
    startBtn.querySelector('i').className = 'fa-solid fa-play';
    updateDisplay();
}

// --- SİTEDE KALMA SÜRESİ ---
function startSiteStayTimer() {
    setInterval(() => {
        let cur = (parseInt(localStorage.getItem('siteTime')) || 0) + 1;
        localStorage.setItem('siteTime', cur);
        dailyTimeEl.innerHTML = `${Math.floor(cur / 3600)}<small>h</small> ${Math.floor((cur % 3600) / 60)}<small>m</small>`;
    }, 1000);
}

// --- TODO LİSTESİ ---
document.getElementById('add-todo').addEventListener('click', () => {
    const text = todoInput.value.trim();
    if (text) {
        let todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.push({ text, done: false, id: Date.now() });
        localStorage.setItem('todos', JSON.stringify(todos));
        todoInput.value = ""; renderTodos();
    }
});

function renderTodos() {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todoList.innerHTML = todos.map(t => `
        <div class="task-item ${t.done ? 'done' : ''}">
            <span onclick="toggleTodo(${t.id})" style="flex:1;">${t.text}</span>
            <div class="task-actions">
                <button onclick="editTodo(${t.id})"><i class="fa-solid fa-pen"></i></button>
                <button onclick="deleteTodo(${t.id})"><i class="fa-solid fa-trash"></i></button>
            </div>
        </div>`).join('');
}

window.toggleTodo = (id) => {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos = todos.map(t => t.id === id ? { ...t, done: !t.done } : t);
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos();
    let active = todos.find(t => t.id === id);
    if (active && !active.done) document.getElementById('current-focus-name').textContent = active.text;
};

window.editTodo = (id) => {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    let t = todos.find(item => item.id === id);
    let n = prompt("Edit task:", t.text);
    if (n) { t.text = n; localStorage.setItem('todos', JSON.stringify(todos)); renderTodos(); }
};

window.deleteTodo = (id) => {
    if (confirm("Delete task?")) {
        let todos = (JSON.parse(localStorage.getItem('todos')) || []).filter(t => t.id !== id);
        localStorage.setItem('todos', JSON.stringify(todos)); renderTodos();
    }
};

// --- KAYITLAR ---
function addRecord(name, duration) {
    let records = JSON.parse(localStorage.getItem('records')) || [];
    records.push({ name, duration, color: ['#f39c12', '#3498db', '#27ae60'][Math.floor(Math.random() * 3)] });
    localStorage.setItem('records', JSON.stringify(records)); renderRecords();
}

function renderRecords() {
    let recs = JSON.parse(localStorage.getItem('records')) || [];
    document.getElementById('record-list').innerHTML = recs.map(r => `
        <div class="record-box" style="background:${r.color}"><span>${r.name}</span><span>${r.duration}</span></div>`).join('');
}

// --- DİĞER FONKSİYONLAR ---
document.getElementById('fullscreen-btn').addEventListener('click', () => {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen();
    else document.exitFullscreen();
});

lockBtn.addEventListener('click', () => {
    isLocked = !isLocked;
    localStorage.setItem('tasksLocked', isLocked);
    lockBtn.innerHTML = isLocked ? '<i class="fa-solid fa-lock"></i>' : '<i class="fa-solid fa-lock-open"></i>';
});

// --- WHITE NOISE & SES YÖNETİMİ ---
noiseBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    noiseMenu.style.display = (noiseMenu.style.display === 'block') ? 'none' : 'block';
});

document.querySelectorAll('.noise-option').forEach(option => {
    option.addEventListener('click', (e) => {
        e.stopPropagation();
        const type = option.getAttribute('data-sound');

        if (type === 'none') {
            audioPlayer.pause();
            noiseBtn.style.color = "#ccc";
        } else {
            // Rastgele ses seçme mantığı
            const tracks = soundLibrary[type];
            const randomTrack = tracks[Math.floor(Math.random() * tracks.length)];

            audioPlayer.src = randomTrack;
            audioPlayer.play().catch(err => console.log("Hata:", err));
            noiseBtn.style.color = "#ff5e5e"; // Aktifken ikon rengi değişir
        }
        noiseMenu.style.display = 'none';
    });
});

document.addEventListener('click', () => noiseMenu.style.display = 'none');

// BAŞLAT
startBtn.addEventListener('click', startTimer);
startSiteStayTimer();
renderTodos();
renderRecords();
updateDisplay();