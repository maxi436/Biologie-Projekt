const WOCHENTAGE = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];
const MIN_KCAL = 1200;

function setStatus(el, valid) {
    el.className = valid ? "valid" : "invalid";
}

function bedarf() {
    const gew = document.getElementById("gew");
    const gro = document.getElementById("gro");
    const alt = document.getElementById("alt");
    const ges = document.getElementById("ges");
    const dia = document.getElementById("dia");
    const kal = document.getElementById("kalorien");
    const sport = document.getElementById("sportErgebnis");

    sport.textContent = "";

    let fehler = false;
    for (const input of [gew, gro, alt]) {
        const wert = parseFloat(input.value);
        const ok = Number.isFinite(wert) && wert > 0;
        setStatus(input, ok);
        if (!ok) fehler = true;
    }
    if (fehler) {
        kal.textContent = "Bitte gültige Zahlen eingeben!";
        setStatus(kal, false);
        return;
    }

    const geschlechtOk = ges.value === "m" || ges.value === "f";
    setStatus(ges, geschlechtOk);
    if (!geschlechtOk) {
        kal.textContent = "Bitte ein Geschlecht auswählen!";
        setStatus(kal, false);
        return;
    }

    const diaOk = ["0", "1", "2"].includes(dia.value);
    setStatus(dia, diaOk);
    if (!diaOk) {
        kal.textContent = "Bitte Diabetes-Angabe auswählen!";
        setStatus(kal, false);
        return;
    }

    const gewicht = parseFloat(gew.value);
    const groesse = parseFloat(gro.value);
    const alter = parseFloat(alt.value);

    let kalorien = 10 * gewicht + 6.25 * groesse - 5 * alter - 160;
    if (ges.value === "m") kalorien += 400;
    if (alter >= 15 && alter < 18) kalorien *= 1.15;
    if (dia.value === "2" && alter >= 18) kalorien -= 400;

    kalorien = Math.max(MIN_KCAL, Math.round(kalorien));

    kal.textContent = `Täglicher Grundbedarf: ${kalorien} kcal`;
    setStatus(kal, true);

    for (const tag of WOCHENTAGE) {
        const feld = document.getElementById(`sport${tag}`);
        const extra = parseInt(feld?.value, 10) || 0;
        const zeile = document.createElement("div");
        zeile.textContent = `${tag}: ${kalorien + extra} kcal`;
        sport.appendChild(zeile);
    }
}