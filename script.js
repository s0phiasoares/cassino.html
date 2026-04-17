let saldo = Number(prompt("Digite seu saldo inicial:"));

const saldoEl = document.getElementById("saldo");
const resultadoEl = document.getElementById("resultado");
const mensagemEl = document.getElementById("mensagem");
const btn = document.getElementById("btnGirar");

saldoEl.innerText = saldo.toFixed(2);

const simbolos = ["🍒", "⭐", "🔔", "7️⃣", "🍋", "🍉"];

btn.addEventListener("click", () => {
  let aposta = Number(document.getElementById("aposta").value);

  if (aposta <= 0) {
    alert("Aposta inválida!");
    return;
  }

  if (aposta > saldo) {
    alert("Saldo insuficiente!");
    return;
  }

  saldo -= aposta;

  let animacao = 0;
  let intervalo = setInterval(() => {
    let temp = [
      simbolos[Math.floor(Math.random() * simbolos.length)],
      simbolos[Math.floor(Math.random() * simbolos.length)],
      simbolos[Math.floor(Math.random() * simbolos.length)]
    ];

    resultadoEl.innerText = temp.join(" | ");
    animacao++;

    if (animacao > 10) {
      clearInterval(intervalo);

      let resultado = [
        simbolos[Math.floor(Math.random() * simbolos.length)],
        simbolos[Math.floor(Math.random() * simbolos.length)],
        simbolos[Math.floor(Math.random() * simbolos.length)]
      ];

      resultadoEl.innerText = resultado.join(" | ");

      let mensagem = "";

      if (resultado[0] === resultado[1] && resultado[1] === resultado[2]) {
        let ganho = aposta * 5;
        saldo += ganho;
        mensagem = "🎉 JACKPOT! Você ganhou R$ " + ganho.toFixed(2);
      } else if (new Set(resultado).size === 2) {
        let ganho = aposta * 2;
        saldo += ganho;
        mensagem = "✨ Dois iguais! Você ganhou R$ " + ganho.toFixed(2);
      } else {
        mensagem = "❌ Você perdeu!";
      }

      mensagemEl.innerText = mensagem;
      saldoEl.innerText = saldo.toFixed(2);

      if (saldo <= 0) {
        alert("💀 Você ficou sem saldo!");
      }
    }
  }, 100);
});