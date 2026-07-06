// ===============================
// The Archive — Script.js
// Milestone 1: Homepage logic
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    // Month names (used for chapters + navigation)
    const months = [
        "January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December"
    ];

    const now = new Date();

    const monthIndex = now.getMonth();
    const year = now.getFullYear();

    // ===============================
    // Update live date on homepage
    // ===============================

    const weekdayEl = document.getElementById("weekday");
    const dateEl = document.getElementById("date");

    weekdayEl.textContent = now.toLocaleDateString("en-US", {
        weekday: "long"
    });

    dateEl.textContent = now.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    // ===============================
    // Generate chapter list
    // ===============================

    const chapterContainer = document.getElementById("chapterContainer");

    months.forEach((month, i) => {

        const chapter = document.createElement("div");
        chapter.classList.add("chapter");

        const left = document.createElement("div");

        const title = document.createElement("div");
        title.classList.add("chapter-title");
        title.textContent = `Chapter ${i + 1}`;

        const subtitle = document.createElement("div");
        subtitle.classList.add("chapter-sub");
        subtitle.textContent = month;

        left.appendChild(title);
        left.appendChild(subtitle);

        const yearLabel = document.createElement("div");
        yearLabel.classList.add("chapter-sub");
        yearLabel.textContent = year;

        chapter.appendChild(left);
        chapter.appendChild(yearLabel);

        // Click behavior (temporary)
        chapter.addEventListener("click", () => {
            window.location.href = `chapter.html?month=${encodeURIComponent(month)}`;
        });

        chapterContainer.appendChild(chapter);
    });

});
