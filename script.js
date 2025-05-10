const filas = document.querySelector("tbody");
const texto = document.querySelector("#promedio");
let total = 0;
let dataGlobal = [];

async function notas() {
  try {
    const consulta = await fetch(
      "https://raw.githubusercontent.com/conyln/clase-09/refs/heads/main/notas.json"
    );
    const data = await consulta.json();
    dataGlobal = data;
    renderizarTabla(dataGlobal);
  } catch (error) {
    console.error("Error al cargar las notas:", error);
  }
}

function renderizarTabla(data) {
  filas.innerHTML = "";
  total = 0;

  data.forEach((d) => {
    filas.innerHTML += `<tr>
      <td>${d.nombre}</td>
      <td>${d.nota.toFixed(1)}</td>
      <td>${carita(d.nota)}</td>
      <td>${barrita(d.nota)}</td>
    </tr>`;
    total += d.nota;
  });

  texto.textContent = (total / data.length).toFixed(1);
}

function ordenarNotas(direccion) {
  const ordenado = [...dataGlobal];
  ordenado.sort((a, b) => direccion === "asc" ? a.nota - b.nota : b.nota - a.nota);
  renderizarTabla(ordenado);
}

function carita(n) {
  let emoji;
  if (n === 7) {
    emoji = "😱";
  } else if (n > 6.5) {
    emoji = "😃";
  } else if (n > 5.9) {
    emoji = "😄";
  } else if (n > 5.5) {
    emoji = "🙂";
  } else if (n > 4.9) {
    emoji = "😗";
  } else if (n > 4.0) {
    emoji = "😐";
  } else if (n === 4.0) {
    emoji = "🤔";
  }
  return emoji;
}

function barrita(n) {
  const ancho = (n / 7) * 250;
  let color = "#000000";

  if (n === 7) {
    color = "#00FF7F";
  } else if (n >= 6) {
    color = "#70e000";
  } else if (n >= 5) {
    color = "#ffba08";
  } else if (n >= 4) {
    color = "#E36414";
  } else {
    color = "#FDF5E6";
  }

  return `
    <svg class="barra-svg" width="250" height="20">
      <rect width="250" height="20" fill="#eee"/>
      <rect width="${ancho}" height="20" fill="${color}"/>
      <text x="125" y="14" text-anchor="middle" fill="#000" font-size="12">${n.toFixed(1)}</text>
    </svg>`;
}

notas();
