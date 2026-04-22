const simbolos = ["🍒", "⭐", "🔔", "7️⃣", "🍋", "🍉"];

let saldo = Number(localStorage.getItem("saldo")) || 0;
let nome = localStorage.getItem("nome") || "Jogador";

document.getElementById("saldo").innerText = saldo.toFixed(2);
document.getElementById("nome").innerText = nome;

const r1 = document.getElementById("r1");
const r2 = document.getElementById("r2");
const r3 = document.getElementById("r3");

const btn = document.getElementById("btnGirar");
const msg = document.getElementById("mensagem");

const somGiro = document.getElementById("somGiro");
const somWin = document.getElementById("somWin");

btn.onclick = () => {
  let aposta = Number(document.getElementById("aposta").value);

  if (!aposta || aposta <= 0 || aposta > saldo) {
    alert("Aposta inválida!");
    return;
  }

  saldo -= aposta;
  atualizarSaldo();

  somGiro.currentTime = 0;
  somGiro.play();

  girarRolo(r1, 10, 80, () => {
    girarRolo(r2, 15, 80, () => {
      girarRolo(r3, 20, 80, resultadoFinal);
    });
  });

  function resultadoFinal() {
    let res = [r1.innerText, r2.innerText, r3.innerText];

    let texto = "";

    // 🎉 JACKPOT
    if (res[0] === res[1] && res[1] === res[2]) {
      let ganho = aposta * 5;

      // 🪙 bônus especial 🍒
      if (res[0] === "🍒") {
        ganho *= 2;
        texto = "🍒 SUPER BÔNUS!!! ";
      }

      saldo += ganho;
      somWin.play();
      texto += "🎉 JACKPOT! +" + ganho.toFixed(2);

    } else if (new Set(res).size === 2) {
      let ganho = aposta * 2;
      saldo += ganho;
      texto = "✨ Dois iguais! +" + ganho.toFixed(2);

    } else {
      texto = "❌ Perdeu!";
    }

    msg.innerText = texto;
    atualizarSaldo();
    salvar();
  }
};

function girarRolo(elemento, vezes, tempo, callback) {
  let i = 0;

  let intervalo = setInterval(() => {
    elemento.innerText = simbolos[Math.floor(Math.random() * simbolos.length)];
    i++;

    if (i >= vezes) {
      clearInterval(intervalo);
      if (callback) callback();
    }
  }, tempo);
}

function atualizarSaldo() {
  document.getElementById("saldo").innerText = saldo.toFixed(2);
}

function salvar() {
  localStorage.setItem("saldo", saldo);
}