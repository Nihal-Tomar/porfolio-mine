/**
 * ══════════════════════════════════════════════════════════════════
 * PORTFOLIO — NIHAL SINGH TOMAR (<NS/>)
 * Interactive Developer Terminal & Playable Mini-Games Module
 * 
 * Features:
 * - Real interactive command-line experience with safe whitelist parser
 * - Live portfolio data commands: help, about, skills, projects, stack, contact, date, clear
 * - Two fully playable interactive mini-games:
 *     1. guess — Number Guessing Challenge (1-20)
 *     2. rps   — Rock Paper Scissors with score tracking
 * - Terminal features: command history (Up/Down arrows), auto-scroll,
 *   typing welcome message, clickable quick-command chips, clear button.
 * - Zero unsafe execution (no eval, no external shell).
 * ══════════════════════════════════════════════════════════════════
 */

// Portfolio data for terminal commands
const PORTFOLIO_DATA = {
  name: "Nihal Singh Tomar",
  role: "Full Stack Developer | MERN Stack",
  education: "Computer Science & Engineering Student",
  location: "Delhi, India",
  status: "Available for freelance & full-time software engineering roles",
  email: "nihaltomar95@gmail.com",
  linkedin: "https://www.linkedin.com/in/nihal-singh-tomar-5385462ba",
  github: "https://github.com/Nihal-Tomar",
  whatsapp: "https://wa.me/919935891260",
  stack: [
    "Frontend: React.js, JavaScript (ES6+), TypeScript, HTML5, CSS3, Tailwind CSS",
    "Backend: Node.js, Express.js, FastAPI, Flask, RESTful APIs, WebSockets",
    "Databases: MongoDB, PostgreSQL, MySQL",
    "Tools & Others: Git, GitHub, Docker, Postman, Vite, Vercel"
  ],
  skills: {
    languages: ["Java", "Python", "JavaScript", "TypeScript", "C", "GoLang"],
    frontend: ["React.js", "HTML5/CSS3", "Tailwind CSS", "Responsive UI"],
    backend: ["Node.js", "Express.js", "FastAPI", "Flask", "REST APIs", "WebSockets", "JWT Auth", "Microservices"],
    databases: ["MongoDB", "PostgreSQL", "MySQL"],
    ai_ml: ["Agentic AI Systems", "Generative AI (LLMs)", "Prompt Engineering", "PyTorch", "Hugging Face"]
  },
  projects: [
    {
      name: "ApnaKart",
      badge: "⭐ Featured",
      tech: "MERN Stack, Redux, Stripe API",
      desc: "Turns daily grocery shopping into mindful household budgeting—combining fresh produce delivery, pantry expiry tracking, and real-time spend analytics.",
      demo: "https://apnakart-pi.vercel.app/",
      repo: "https://github.com/Nihal-Tomar/apnakart"
    },
    {
      name: "ChatSphere",
      badge: "⭐ Featured",
      tech: "React, Node.js, WebSockets, MongoDB",
      desc: "Real-time communication application with instant messaging, active status tracking, and group chat support.",
      demo: "https://chat-sphere-navy.vercel.app/",
      repo: "https://github.com/Nihal-Tomar"
    },
    {
      name: "Student Portal",
      badge: "⭐ Featured",
      tech: "JavaScript, HTML5, CSS3, Local Storage",
      desc: "Academic and student records management system with grade calculation and record administration.",
      demo: "https://nihal-tomar.github.io/student-portal/",
      repo: "https://github.com/Nihal-Tomar/student-portal"
    },
    {
      name: "TaskFlow",
      badge: "Productivity",
      tech: "React, LocalStorage, CSS Modules",
      desc: "Clean productivity and task tracking application with categorization, deadlines, and persistence.",
      demo: "https://nihal-tomar.github.io/TODO-List/",
      repo: "https://github.com/Nihal-Tomar/TODO-List"
    },
    {
      name: "Weather App",
      badge: "Utility",
      tech: "JavaScript, OpenWeatherMap API",
      desc: "Live atmospheric dashboard delivering real-time forecasts, temperature metrics, and search capabilities.",
      demo: "https://nihal-tomar.github.io/weather/",
      repo: "https://github.com/Nihal-Tomar/weather"
    }
  ]
};

export function initTerminal() {
  const terminal = document.getElementById("interactiveTerminal");
  const output = document.getElementById("terminalOutput");
  const input = document.getElementById("terminalInput");
  const promptEl = document.getElementById("terminalPrompt");
  const clearBtn = document.getElementById("termClearBtn");
  const chipButtons = document.querySelectorAll(".cmd-chip");
  const terminalBody = document.getElementById("terminalBody");

  if (!terminal || !output || !input) return;

  // Terminal State
  const state = {
    history: [],
    historyIndex: -1,
    activeGame: null, // null | 'guess' | 'rps'
    guessGame: {
      target: 0,
      attempts: 0
    },
    rpsGame: {
      playerScore: 0,
      computerScore: 0,
      draws: 0,
      rounds: 0
    }
  };

  // Focus terminal input when clicking anywhere in terminal body
  terminal.addEventListener("click", (e) => {
    // Avoid re-focusing if user is selecting text
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) return;
    if (e.target.closest("a") || e.target.closest("button")) return;
    input.focus();
  });

  // Display initial banner
  renderWelcomeBanner();

  // Listen to input submissions
  input.addEventListener("keydown", handleInputKeydown);

  // Clear button action
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      executeCommand("clear");
      input.focus();
    });
  }

  // Quick Command Chips
  chipButtons.forEach((chip) => {
    chip.addEventListener("click", () => {
      const cmd = chip.getAttribute("data-cmd");
      if (cmd) {
        input.value = cmd;
        executeCommand(cmd);
        input.focus();
      }
    });
  });

  /* ─────────────────────────────────────────────────────────────
     KEYBOARD & INPUT HANDLING
  ───────────────────────────────────────────────────────────── */
  function handleInputKeydown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      const rawVal = input.value;
      input.value = "";
      processInput(rawVal);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!state.history.length) return;
      if (state.historyIndex === -1) {
        state.historyIndex = state.history.length - 1;
      } else if (state.historyIndex > 0) {
        state.historyIndex--;
      }
      input.value = state.history[state.historyIndex] || "";
      // Move cursor to end of text
      setTimeout(() => {
        input.selectionStart = input.selectionEnd = input.value.length;
      }, 0);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (state.historyIndex !== -1) {
        if (state.historyIndex < state.history.length - 1) {
          state.historyIndex++;
          input.value = state.history[state.historyIndex];
        } else {
          state.historyIndex = -1;
          input.value = "";
        }
      }
    }
  }

  /* ─────────────────────────────────────────────────────────────
     INPUT DISPATCHER
  ───────────────────────────────────────────────────────────── */
  function processInput(val) {
    const trimmed = val.trim();

    // Print command line to output
    printCommandLine(trimmed);

    // If an active mini-game is running, route input to game handler
    if (state.activeGame === "guess") {
      handleGuessInput(trimmed);
      scrollToBottom();
      return;
    }

    if (state.activeGame === "rps") {
      handleRpsInput(trimmed);
      scrollToBottom();
      return;
    }

    if (!trimmed) {
      scrollToBottom();
      return;
    }

    // Add to history
    state.history.push(trimmed);
    state.historyIndex = -1;

    // Execute normal command
    executeCommand(trimmed);
    scrollToBottom();
  }

  function printCommandLine(cmdText) {
    const row = document.createElement("div");
    row.className = "term-history-row";
    const promptText = promptEl ? promptEl.textContent : "nihal@portfolio:~$";
    row.innerHTML = `<span class="term-history-prompt">${escapeHtml(promptText)}</span> <span class="term-history-cmd">${escapeHtml(cmdText)}</span>`;
    output.appendChild(row);
  }

  /* ─────────────────────────────────────────────────────────────
     COMMAND EXECUTOR
  ───────────────────────────────────────────────────────────── */
  function executeCommand(rawCmd) {
    const cmdClean = rawCmd.trim().toLowerCase();
    const args = cmdClean.split(/\s+/);
    const mainCmd = args[0];

    switch (mainCmd) {
      case "help":
        renderHelp();
        break;

      case "about":
        renderAbout();
        break;

      case "skills":
        renderSkills();
        break;

      case "projects":
        renderProjects();
        break;

      case "stack":
        renderStack();
        break;

      case "contact":
        if (args[1] === "go") {
          const contactSec = document.getElementById("contact");
          if (contactSec) {
            contactSec.scrollIntoView({ behavior: "smooth" });
            printOutput(`<div class="term-success">✓ Navigating to Contact Section...</div>`);
          } else {
            renderContact();
          }
        } else {
          renderContact();
        }
        break;

      case "date":
        printOutput(`<div class="term-date">📅 Current Date & Time: <strong>${new Date().toLocaleString("en-US", { dateStyle: "full", timeStyle: "medium" })}</strong></div>`);
        break;

      case "clear":
        output.innerHTML = "";
        break;

      case "game":
      case "games":
        renderGameList();
        break;

      case "guess":
        startGuessGame();
        break;

      case "rps":
        startRpsGame();
        break;

      case "whoami":
        printOutput(`<div class="term-info">guest@portfolio — Visitor exploring Nihal Singh Tomar's Portfolio</div>`);
        break;

      case "sudo":
        printOutput(`<div class="term-warning">⚠️ Permission denied: Root privileges not required! Feel free to explore with standard commands.</div>`);
        break;

      case "exit":
        printOutput(`<div class="term-muted">Terminal session is active. Type <strong>'clear'</strong> to wipe screen or <strong>'help'</strong> for commands.</div>`);
        break;

      default:
        printOutput(`<div class="term-error">Command not found: '<strong>${escapeHtml(rawCmd)}</strong>'. Type <span class="term-kbd">help</span> to see available commands.</div>`);
        break;
    }
  }

  /* ─────────────────────────────────────────────────────────────
     COMMAND OUTPUT RENDERERS
  ───────────────────────────────────────────────────────────── */
  function renderWelcomeBanner() {
    output.innerHTML = `
      <div class="term-welcome">
        <div class="term-welcome-title">Welcome to Nihal's Interactive Terminal!</div>
        <div class="term-welcome-sub">Full Stack Developer | MERN Stack</div>
        <div class="term-welcome-hint">Explore my skills, projects, and interactive mini-games.</div>
        <div class="term-welcome-action">Type '<span class="term-kbd">help</span>' to get started.</div>
      </div>
    `;
  }

  function renderHelp() {
    const html = `
      <div class="term-block">
        <div class="term-heading">AVAILABLE COMMANDS</div>
        <table class="term-table">
          <tbody>
            <tr>
              <td class="col-cmd"><span class="term-kbd">about</span></td>
              <td class="col-desc">Concise professional developer introduction</td>
            </tr>
            <tr>
              <td class="col-cmd"><span class="term-kbd">skills</span></td>
              <td class="col-desc">Technical skills, languages, and frameworks</td>
            </tr>
            <tr>
              <td class="col-cmd"><span class="term-kbd">projects</span></td>
              <td class="col-desc">Portfolio projects with live demos and repositories</td>
            </tr>
            <tr>
              <td class="col-cmd"><span class="term-kbd">stack</span></td>
              <td class="col-desc">Core technology stack & architecture overview</td>
            </tr>
            <tr>
              <td class="col-cmd"><span class="term-kbd">contact</span></td>
              <td class="col-desc">Email, LinkedIn, GitHub, WhatsApp & location details</td>
            </tr>
            <tr>
              <td class="col-cmd"><span class="term-kbd">date</span></td>
              <td class="col-desc">Display current local date and time</td>
            </tr>
            <tr>
              <td class="col-cmd"><span class="term-kbd">clear</span></td>
              <td class="col-desc">Clear the terminal screen</td>
            </tr>
          </tbody>
        </table>

        <div class="term-heading term-heading-games">INTERACTIVE MINI-GAMES</div>
        <table class="term-table">
          <tbody>
            <tr>
              <td class="col-cmd"><span class="term-kbd game-cmd">guess</span></td>
              <td class="col-desc">Play Number Guessing Challenge (1 to 20)</td>
            </tr>
            <tr>
              <td class="col-cmd"><span class="term-kbd game-cmd">rps</span></td>
              <td class="col-desc">Play Rock Paper Scissors with live score tracking</td>
            </tr>
            <tr>
              <td class="col-cmd"><span class="term-kbd">game</span></td>
              <td class="col-desc">Overview of available mini-games</td>
            </tr>
          </tbody>
        </table>
        <div class="term-tip">💡 Tip: You can also click the quick-command buttons below the terminal!</div>
      </div>
    `;
    printOutput(html);
  }

  function renderAbout() {
    const html = `
      <div class="term-block">
        <div class="term-heading">ABOUT ME</div>
        <p class="term-line"><strong>${PORTFOLIO_DATA.name}</strong></p>
        <p class="term-line text-lavender">${PORTFOLIO_DATA.role} · ${PORTFOLIO_DATA.education}</p>
        <p class="term-line mt-1">Passionate about building scalable, reliable, and user-focused digital applications across the MERN stack.</p>
        <p class="term-line">Combines clean architecture, performance-focused development, and thoughtful problem-solving to create software that is both functional and intuitive.</p>
        <div class="term-pills mt-2">
          <span class="term-tag">📍 ${PORTFOLIO_DATA.location}</span>
          <span class="term-tag">🟢 ${PORTFOLIO_DATA.status}</span>
        </div>
      </div>
    `;
    printOutput(html);
  }

  function renderSkills() {
    const s = PORTFOLIO_DATA.skills;
    const html = `
      <div class="term-block">
        <div class="term-heading">TECHNICAL SKILLS</div>
        <div class="term-skill-cat">
          <span class="skill-cat-label">Languages:</span>
          <span class="skill-cat-items">${s.languages.join(" · ")}</span>
        </div>
        <div class="term-skill-cat">
          <span class="skill-cat-label">Frontend:</span>
          <span class="skill-cat-items">${s.frontend.join(" · ")}</span>
        </div>
        <div class="term-skill-cat">
          <span class="skill-cat-label">Backend:</span>
          <span class="skill-cat-items">${s.backend.join(" · ")}</span>
        </div>
        <div class="term-skill-cat">
          <span class="skill-cat-label">Databases:</span>
          <span class="skill-cat-items">${s.databases.join(" · ")}</span>
        </div>
        <div class="term-skill-cat">
          <span class="skill-cat-label">AI / ML:</span>
          <span class="skill-cat-items">${s.ai_ml.join(" · ")}</span>
        </div>
      </div>
    `;
    printOutput(html);
  }

  function renderProjects() {
    let projsHtml = PORTFOLIO_DATA.projects.map((p, i) => `
      <div class="term-proj-item">
        <div class="term-proj-header">
          <span class="term-proj-num">${i + 1}.</span>
          <span class="term-proj-name">${p.name}</span>
          <span class="term-proj-badge">${p.badge}</span>
        </div>
        <div class="term-proj-desc">${p.desc}</div>
        <div class="term-proj-tech">Tech: ${p.tech}</div>
        <div class="term-proj-links">
          <a href="${p.demo}" target="_blank" rel="noopener noreferrer" class="term-link">🔗 Live Demo</a>
          ${p.repo ? `· <a href="${p.repo}" target="_blank" rel="noopener noreferrer" class="term-link">📂 GitHub</a>` : ""}
        </div>
      </div>
    `).join("");

    const html = `
      <div class="term-block">
        <div class="term-heading">PORTFOLIO PROJECTS</div>
        ${projsHtml}
      </div>
    `;
    printOutput(html);
  }

  function renderStack() {
    const html = `
      <div class="term-block">
        <div class="term-heading">CORE ARCHITECTURE & TECH STACK</div>
        <ul class="term-list">
          ${PORTFOLIO_DATA.stack.map(st => `<li>${st}</li>`).join("")}
        </ul>
        <div class="term-subtext mt-1">Focusing on clean modular code, RESTful API design, and responsive fluid interfaces.</div>
      </div>
    `;
    printOutput(html);
  }

  function renderContact() {
    const html = `
      <div class="term-block">
        <div class="term-heading">GET IN TOUCH</div>
        <div class="term-contact-grid">
          <div>📧 <strong>Email:</strong> <a href="mailto:${PORTFOLIO_DATA.email}" class="term-link">${PORTFOLIO_DATA.email}</a></div>
          <div>💼 <strong>LinkedIn:</strong> <a href="${PORTFOLIO_DATA.linkedin}" target="_blank" rel="noopener noreferrer" class="term-link">linkedin.com/in/nihal-singh-tomar</a></div>
          <div>🐙 <strong>GitHub:</strong> <a href="${PORTFOLIO_DATA.github}" target="_blank" rel="noopener noreferrer" class="term-link">github.com/Nihal-Tomar</a></div>
          <div>💬 <strong>WhatsApp:</strong> <a href="${PORTFOLIO_DATA.whatsapp}" target="_blank" rel="noopener noreferrer" class="term-link">+91 99358 91260</a></div>
          <div>📍 <strong>Location:</strong> Delhi, India</div>
          <div>🟢 <strong>Status:</strong> Available for new opportunities</div>
        </div>
        <div class="term-tip mt-2">💡 Type '<span class="term-kbd">contact go</span>' to scroll directly to the contact form on page!</div>
      </div>
    `;
    printOutput(html);
  }

  function renderGameList() {
    const html = `
      <div class="term-block">
        <div class="term-heading">🎮 PLAYABLE MINI-GAMES</div>
        <div class="term-game-card">
          <div class="game-card-title">1. Number Guessing Challenge (<span class="term-kbd game-cmd">guess</span>)</div>
          <div class="game-card-desc">Try to guess a secret number between 1 and 20 in the fewest attempts!</div>
        </div>
        <div class="term-game-card mt-1">
          <div class="game-card-title">2. Rock Paper Scissors (<span class="term-kbd game-cmd">rps</span>)</div>
          <div class="game-card-desc">Battle the computer in Rock Paper Scissors with live round score tracking!</div>
        </div>
        <div class="term-tip mt-2">Type <span class="term-kbd game-cmd">guess</span> or <span class="term-kbd game-cmd">rps</span> to start playing right now!</div>
      </div>
    `;
    printOutput(html);
  }

  /* ─────────────────────────────────────────────────────────────
     GAME 1: NUMBER GUESSING CHALLENGE
  ───────────────────────────────────────────────────────────── */
  function startGuessGame() {
    state.activeGame = "guess";
    state.guessGame.target = Math.floor(Math.random() * 20) + 1;
    state.guessGame.attempts = 0;

    if (promptEl) promptEl.textContent = "guess[1-20]:~$";

    const html = `
      <div class="term-game-box">
        <div class="term-game-banner">🎯 NUMBER GUESSING CHALLENGE</div>
        <div class="term-line">I've picked a secret number between <strong>1 and 20</strong>.</div>
        <div class="term-line">Enter your guess below, or type '<span class="term-kbd">exit</span>' to return to terminal.</div>
      </div>
    `;
    printOutput(html);
  }

  function handleGuessInput(inputVal) {
    const val = inputVal.toLowerCase();

    if (val === "exit" || val === "quit") {
      exitGuessGame("Game ended. Returning to standard terminal.");
      return;
    }

    const num = parseInt(val, 10);
    if (isNaN(num) || num < 1 || num > 20) {
      printOutput(`<div class="term-warning">⚠️ Please enter a valid number between 1 and 20 (or type 'exit' to quit).</div>`);
      return;
    }

    state.guessGame.attempts++;
    const attempts = state.guessGame.attempts;
    const target = state.guessGame.target;

    if (num < target) {
      printOutput(`<div class="term-line">📉 [Attempt ${attempts}] <strong>${num}</strong> is <em>Too low!</em> Try a higher number.</div>`);
    } else if (num > target) {
      printOutput(`<div class="term-line">📈 [Attempt ${attempts}] <strong>${num}</strong> is <em>Too high!</em> Try a lower number.</div>`);
    } else {
      // Correct!
      const congrats = `
        <div class="term-success-box">
          <div class="term-success-title">🎉 CONGRATULATIONS! YOU FOUND IT!</div>
          <div class="term-line">The secret number was <strong>${target}</strong>.</div>
          <div class="term-line">Total attempts: <strong>${attempts}</strong>.</div>
          <div class="term-tip mt-1">Type '<span class="term-kbd game-cmd">guess</span>' to play again, or '<span class="term-kbd">help</span>' for commands.</div>
        </div>
      `;
      printOutput(congrats);
      resetPrompt();
      state.activeGame = null;
    }
  }

  function exitGuessGame(msg) {
    resetPrompt();
    state.activeGame = null;
    printOutput(`<div class="term-muted">${msg}</div>`);
  }

  /* ─────────────────────────────────────────────────────────────
     GAME 2: ROCK PAPER SCISSORS
  ───────────────────────────────────────────────────────────── */
  function startRpsGame() {
    state.activeGame = "rps";
    state.rpsGame.playerScore = 0;
    state.rpsGame.computerScore = 0;
    state.rpsGame.draws = 0;
    state.rpsGame.rounds = 0;

    if (promptEl) promptEl.textContent = "rps[choice]:~$";

    const html = `
      <div class="term-game-box">
        <div class="term-game-banner">✂️ ROCK PAPER SCISSORS</div>
        <div class="term-line">Choose: <strong>rock</strong>, <strong>paper</strong>, or <strong>scissors</strong> (or shorthand <strong>r</strong>, <strong>p</strong>, <strong>s</strong>).</div>
        <div class="term-line">Type '<span class="term-kbd">exit</span>' anytime to quit and see final score.</div>
      </div>
    `;
    printOutput(html);
  }

  function handleRpsInput(inputVal) {
    const val = inputVal.toLowerCase();

    if (val === "exit" || val === "quit") {
      const g = state.rpsGame;
      const finalMsg = `
        <div class="term-game-box">
          <div class="term-game-banner">🏁 GAME OVER — FINAL SCORE</div>
          <div class="term-score-row">
            <span>Player: <strong>${g.playerScore}</strong></span>
            <span>Computer: <strong>${g.computerScore}</strong></span>
            <span>Draws: <strong>${g.draws}</strong></span>
          </div>
          <div class="term-line mt-1">${g.playerScore > g.computerScore ? "🏆 Overall Winner: YOU! Outstanding play!" : g.playerScore < g.computerScore ? "🤖 Overall Winner: Computer! Better luck next time!" : "🤝 Tied match! Equal skill!"}</div>
          <div class="term-tip mt-1">Type '<span class="term-kbd game-cmd">rps</span>' to play again!</div>
        </div>
      `;
      printOutput(finalMsg);
      resetPrompt();
      state.activeGame = null;
      return;
    }

    // Map shortcuts
    let choice = val;
    if (choice === "r") choice = "rock";
    if (choice === "p") choice = "paper";
    if (choice === "s") choice = "scissors";

    const validChoices = ["rock", "paper", "scissors"];
    if (!validChoices.includes(choice)) {
      printOutput(`<div class="term-warning">⚠️ Invalid choice! Please type 'rock', 'paper', or 'scissors' (or 'exit').</div>`);
      return;
    }

    state.rpsGame.rounds++;
    const compChoices = ["rock", "paper", "scissors"];
    const compChoice = compChoices[Math.floor(Math.random() * compChoices.length)];

    const icons = {
      rock: "✊ Rock",
      paper: "✋ Paper",
      scissors: "✌️ Scissors"
    };

    let resultHtml = "";
    if (choice === compChoice) {
      state.rpsGame.draws++;
      resultHtml = `<span class="term-result-draw">🤝 IT'S A DRAW!</span>`;
    } else if (
      (choice === "rock" && compChoice === "scissors") ||
      (choice === "paper" && compChoice === "rock") ||
      (choice === "scissors" && compChoice === "paper")
    ) {
      state.rpsGame.playerScore++;
      resultHtml = `<span class="term-result-win">🎉 YOU WIN THIS ROUND!</span>`;
    } else {
      state.rpsGame.computerScore++;
      resultHtml = `<span class="term-result-lose">💻 COMPUTER WINS THIS ROUND!</span>`;
    }

    const g = state.rpsGame;
    const roundOutput = `
      <div class="term-rps-round">
        <div class="rps-choices">
          <span>You: <strong>${icons[choice]}</strong></span>
          <span class="rps-vs">vs</span>
          <span>Computer: <strong>${icons[compChoice]}</strong></span>
        </div>
        <div class="rps-outcome">${resultHtml}</div>
        <div class="term-score-row mt-1">
          <span>Score — Player: <strong>${g.playerScore}</strong> | Computer: <strong>${g.computerScore}</strong> (Round ${g.rounds})</span>
        </div>
        <div class="term-muted-prompt">Next round: rock, paper, scissors (or 'exit'):</div>
      </div>
    `;
    printOutput(roundOutput);
  }

  function resetPrompt() {
    if (promptEl) promptEl.textContent = "nihal@portfolio:~$";
  }

  /* ─────────────────────────────────────────────────────────────
     HELPERS
  ───────────────────────────────────────────────────────────── */
  function printOutput(htmlString) {
    const container = document.createElement("div");
    container.className = "term-output-entry";
    container.innerHTML = htmlString;
    output.appendChild(container);
  }

  function scrollToBottom() {
    if (terminalBody) {
      terminalBody.scrollTop = terminalBody.scrollHeight;
    }
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
}
