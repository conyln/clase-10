const filas = document.querySelector("tbody");
const texto = document.querySelector("#promedio");

var total = 0;
async function notas() {
  let consulta = await fetch(
    "https://raw.githubusercontent.com/conyln/clase-09/refs/heads/main/notas.json"
  );
  let data = await consulta.json();
  console.log(data);
  data.forEach((d) => {
    filas.innerHTML += `<tr><td>${d.nombre}</td><td>${d.nota.toFixed(
      1
    )}</td><td>${carita(d.nota)}</td><td>${barrita(d.nota)}</tr>`;
    total = total + d.nota;
  });
  texto.innerHTML = (total / 12).toFixed(1);
}
notas().catch((error) => console.error(error));

function carita(n) {
  let emoji;
  if (n == 7) {
    emoji = "😱";
  } else if (n > 6.4) {
    emoji = "😃";
  } else if (n > 5.9) {
    emoji = "😄";
  } else if (n > 5.4) {
    emoji = "🙂";
  } else if (n > 4.9) {
    emoji = "😗";
  } else if (n > 4.4) {
    emoji = "😐";
  } else if (n > 4.0) {
    emoji = "😕";
  } else if (n == 4.0) {
    emoji = "🤔";
  } else {
    emoji = "😣";
  }
  return emoji;
}

function barrita(n) {
  let ancho = (n / 7) * 250;
  let color = "#000000";
  if (n === 7) {
    color = "#6FA7D7";
  } else if (n >= 6) {
    color = "#B5BF63";
  } else if (n >= 5) {
    color = "#ED5E36";
  } else if (n >= 4) {
    color = "#FE8D93";
  } else {
    color = "#FDF5E6";
  }

return `
    <svg class="barra-svg" width="250" height="20">
      <rect width="250" height="20" fill="#E7DBC5" rx="10"/>
      <rect width="${ancho}" height="20" fill="${color}" rx="10"/>
      <text x="125" y="14" text-anchor="middle" fill="#000" font-size="12">${n.toFixed(1)}</text>
    </svg>`;
}
