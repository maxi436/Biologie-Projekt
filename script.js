const WOCHENTAGE = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];
const MIN_KCAL = 1200;

function setStatus(el, valid) {
    el.className = valid ? "valid" : "invalid";
}

function berechneBedarf() {
    const gew = document.getElementById("gew");
    const gro = document.getElementById("gro");
    const alt = document.getElementById("alt");
    const ges = document.getElementById("ges");
    const dia = document.getElementById("dia");
    const kal = document.getElementById("kalorien");
    const sport = document.getElementById("sport");

    sport.textContent = "";

    let fehler = false;
    for (const input of [gew, gro, alt]) {
        const ok = Number.isFinite(parseFloat(input.value)) && parseFloat(input.value) > 0;
        setStatus(input, ok);
        if (!ok) fehler = true;
    }
    if (fehler) {
        kal.textContent = "Ungültige Zahlenwerte!";
        setStatus(kal, false);
        return;
    }

    const geschlechtOk = ges.value === "m" || ges.value === "f";
    setStatus(ges, geschlechtOk);
    if (!geschlechtOk) {
        kal.textContent = "Ungültiges Geschlecht!";
        setStatus(kal, false);
        return;
    }

    const gewicht = parseFloat(gew.value);
    const groesse = parseFloat(gro.value);
    const alter = parseFloat(alt.value);

    let kalorien = 10 * gewicht + 6.25 * groesse - 5 * alter - 160;
    if (ges.value === "m") kalorien += 400;
    if (alter >= 15 && alter <= 18) kalorien *= 1.15;
    if (dia.value === "2" && alter >= 18) kalorien -= 400;

    kalorien = Math.max(MIN_KCAL, Math.round(kalorien));

    kal.textContent = `Täglicher Grundbedarf: ${kalorien} kcal`;
    setStatus(kal, true);

    for (const tag of WOCHENTAGE) {
        const extra = parseInt(document.getElementById(`sport${tag}`)?.value, 10) || 0;
        const zeile = document.createElement("div");
        zeile.textContent = `${tag}: ${kalorien + extra} kcal`;
        sport.appendChild(zeile);
    }
}