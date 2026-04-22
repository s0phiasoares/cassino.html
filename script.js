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

  somGiro.play();

  girarRolo(r1, 10, () => {
    girarRolo(r2, 15, () => {
      girarRolo(r3, 20, resultadoFinal);
    });
  });

  function resultadoFinal() {
    let res = [r1.innerText, r2.innerText, r3.innerText];
    let texto = "";

    if (res[0] === res[1] && res[1] === res[2]) {
      let ganho = aposta * 5;

      if (res[0] === "🍒") {
        ganho *= 2;
        texto = "🍒 SUPER BÔNUS! ";
      }

      saldo += ganho;
      somWin.play();
      efeitoChuva("💰", 40);

      texto += "🎉 JACKPOT! +" + ganho.toFixed(2);

    } else if (new Set(res).size === 2) {
      let ganho = aposta * 2;
      saldo += ganho;
      efeitoChuva("💰", 20);

      texto = "✨ Dois iguais! +" + ganho.toFixed(2);

    } else {
      efeitoChuva("🐴", 50);
      texto = "🐴 Você foi mulado!";
    }

    msg.innerText = texto;
    atualizarSaldo();
    localStorage.setItem("saldo", saldo);
  }
};

function girarRolo(el, vezes, callback) {
  let i = 0;
  let intervalo = setInterval(() => {
    el.innerText = simbolos[Math.floor(Math.random() * simbolos.length)];
    i++;

    if (i >= vezes) {
      clearInterval(intervalo);
      if (callback) callback();
    }
  }, 80);
}

function atualizarSaldo() {
  document.getElementById("saldo").innerText = saldo.toFixed(2);
}

/* EFEITOS */
function efeitoChuva(emoji, quantidade) {
  const container = document.getElementById("efeitos");

  for (let i = 0; i < quantidade; i++) {
    const el = document.createElement("div");
    el.classList.add("item");
    el.innerText = emoji;

    el.style.left = Math.random() * 100 + "vw";
    el.style.animationDuration = (Math.random() * 2 + 2) + "s";

    container.appendChild(el);

    setTimeout(() => el.remove(), 4000);
  }
}