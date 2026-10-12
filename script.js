function bedarf() {
    const gew = document.getElementById('gew');
    const gro = document.getElementById('gro');
    const alt = document.getElementById('alt');
    const ges = document.getElementById('ges');

    const kal = document.getElementById('kalorien');

    let c = 0;
    for (const input of [gew, gro, alt]) {
        if (isNaN(input.value) || input.value <= 0) {
            kal.textContent = "Ungültige Zahlenwerte!";
            kal.className = "invalid";
            input.className = "invalid"
            c++;
        } else {
            input.className = "valid"
        }
    }
    if (c > 0) return;

    if (ges.value === "m" || ges.value === "w") {
        ges.className = "valid";
    } else {
        kal.textContent = "Ungültiges Geschlecht!";
        kal.className = "invalid";
        ges.className = "invalid";
        return
    }

    try {
        let kalorien = gew.value*10+6.25*gro.value-5*alt.value;

        if (ges.value === "m") {
            kalorien += 5;
        } else if (ges.value === "w") {
            kalorien -= 161;
        }
        if (15 <= alt.value && alt.value <= 18) {
            kalorien *= 1.15;
        }

        kalorien = Math.round(kalorien);

        document.getElementById('kalorien').textContent = `Täglicher Kalorienbedarf: ${kalorien} kcal`;
    } catch (error) {
        document.getElementById('kalorien').textContent = "Fehler bei der Berechnung.";
    }
}