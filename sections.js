function show(section) {
    document.querySelectorAll("section").forEach((s) => {
        s.hidden = s.id !== section;
    });
    window.scrollTo(0, 0);
}

show("start");