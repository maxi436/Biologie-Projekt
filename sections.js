function show(section) {
    document.querySelectorAll("section").forEach((s) => {
        s.hidden = s.id !== section;
    });
}

show("start");