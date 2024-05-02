const puppeteer = require("puppeteer");
let rawData = [];
let matches;

async function conseguirResultados() {
  const browser = await puppeteer.launch({
    headless: false,
    ignoreHTTPSErrors: true,
    args: [`--window-size=1980,720`, "--no-sandbox", "--disable-setuid-sandbox"],
    defaultViewport: {
      width: 1980,
      height: 720,
    },
  });

  const page = await browser.newPage();
  await page.goto("https://www.laliganacional.com.ar/laliga/page/estadisticas", { waitUntil: "networkidle0" });

  console.log("# Iniciando búsqueda de info");
  await page.waitForSelector('iframe[src*="widgetscab.gesdeportiva.es"]');
  const iframeElement = await page.$('iframe[src*="widgetscab.gesdeportiva.es"]');
  const frame = await iframeElement.contentFrame();

  await new Promise((r) => setTimeout(r, 600));
  let datePickerInicio = await frame.$x('//*[@id="FechaInicio"]');
  await datePickerInicio[0].focus();
  await page.keyboard.type("26042024");
  await new Promise((r) => setTimeout(r, 600));

  let datePicker = await frame.$x('//*[@id="FechaFin"]');
  await datePicker[0].focus();
  await page.keyboard.type("25052024");
  await page.keyboard.press("Enter");
  await new Promise((r) => setTimeout(r, 5000));

  let equipos = ["RIACHUELO (LR)", "FERRO", "ZARATE BASKET", "INDEPENDIENTE (O)", "LA UNION FSA.", "COMUNICACIONES", "ARGENTINO (J)", "UNION (SF)"];
  let equipoV;
  let equipoL;

  for (var i = 11; i <= 61; i++) {
    try {
      equipoL = await frame.$eval(`body > div.tarjeta-widget > div > div > table > tbody > tr:nth-child(${i}) > td:nth-child(2)`, (element) =>
        element.textContent.trim().toUpperCase()
      );
      equipoLPuntos = await frame.$eval(`body > div.tarjeta-widget > div > div > table > tbody > tr:nth-child(${i}) > td.puntos_locales`, (element) =>
        element.textContent.trim().toUpperCase()
      );

      equipoV = await frame.$eval(`body > div.tarjeta-widget > div > div > table > tbody > tr:nth-child(${i}) > td:nth-child(7)`, (element) =>
        element.textContent.trim().toUpperCase()
      );
      equipoVPuntos = await frame.$eval(
        `body > div.tarjeta-widget > div > div > table > tbody > tr:nth-child(${i}) > td.puntos_visitantes`,
        (element) => element.textContent.trim().toUpperCase()
      );

      fecha = await frame.$eval(`body > div.tarjeta-widget > div > div > table > tbody > tr:nth-child(${i}) > td.text-center`, (element) =>
        element.textContent.trim().toUpperCase()
      );

      if (equipos.includes(equipoL) || equipos.includes(equipoV)) {
        puntosL = parseInt(equipoLPuntos);
        puntosV = parseInt(equipoVPuntos);

        if (puntosL != 0) {
          let ganador;
          if (puntosL > puntosV) {
            ganador = 1;
          } else {
            ganador = 2;
          }
          rawData.push(`L: ${equipoL} - V: ${equipoV} Fecha: ${fecha} ganador: ${ganador}`);
        } else {
          rawData.push(`L: ${equipoL} - V: ${equipoV} Fecha: ${fecha} ganador: noHay`);
        }
      }
    } catch (error) {
      console.error("# ! Error al buscar el elemento en el iframe:", error);

      await browser.close();
      return;
    }
  }

  formatearJSON();

  await new Promise((r) => setTimeout(r, 3000));
  await browser.close();

  console.log("# Búsqueda finalizada con éxito");
}

function formatearJSON() {
  matches = rawData.map((data) => {
    // Primero, separar la cadena en partes usando "Fecha:" y "ganador:"
    const parts = data.split("Fecha:");
    const teamsPart = parts[0].trim(); // "L: ARGENTINO (J) - V: RIACHUELO (LR)"
    const dateAndWinnerPart = parts[1].trim(); // "638499330000000000 30/04/2024 22:00 ganador: 1"

    // Separar la fecha del ganador
    const datePart = dateAndWinnerPart.split(" ganador:")[0].trim(); // "638499330000000000 30/04/2024 22:00"
    const winnerPart = dateAndWinnerPart.split(" ganador:")[1].trim(); // "1"

    // Extraer la fecha y hora, ignorando el número grande al inicio
    const dateTime = datePart.substring(datePart.indexOf(" ") + 1).trim(); // "30/04/2024 22:00"
    const formattedDateTime = dateTime.replace(/\//g, "-"); // Reemplaza '/' por '-'

    // Dividir la parte de los equipos
    const localPart = teamsPart.split(" - V: ")[0].replace("L: ", "").trim(); // "ARGENTINO (J)"
    const visitorPart = teamsPart.split(" - V: ")[1].trim(); // "RIACHUELO (LR)"

    // Crear el objeto JSON para este match incluyendo el ganador

    if (winnerPart == "noHay") {
      ganador = null;
    } else {
      ganador = parseInt(winnerPart);
    }

    return {
      local: localPart,
      visitante: visitorPart,
      Fecha: formattedDateTime,
      ganador: ganador, // Convertir a número el identificador del ganador
    };
  });

  console.log(matches);
}

console.log("# Iniciando función");
conseguirResultados();

// FILA 1
// /html/body/div[2]/div/div/table/tbody/tr[11]/td[2]
// /html/body/div[2]/div/div/table/tbody/tr[11]/td[7]

// FILA 2
// /html/body/div[2]/div/div/table/tbody/tr[12]/td[2]
// /html/body/div[2]/div/div/table/tbody/tr[12]/td[7]

//puntos
// /html/body/div[2]/div/div/table/tbody/tr[11]/td[4]

// ULTIMA FILA
///html/body/div[2]/div/div/table/tbody/tr[61]/td[3]
