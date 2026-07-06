// ======================================
// The Archive
// Chapter Logic (Part 1)
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    const params = new URLSearchParams(window.location.search);

    const month = params.get("month") || "January";

    const months = [
        "January","February","March","April",
        "May","June","July","August",
        "September","October","November","December"
    ];

    // -------------------------
    // Update heading
    // -------------------------

    document.getElementById("monthTitle").textContent = month;

    document.getElementById("chapterNumber").textContent =
        `Chapter ${months.indexOf(month) + 1}`;

    document.getElementById("year").textContent =
        new Date().getFullYear();

    // -------------------------
    // Storage
    // -------------------------

    const STORAGE_KEY = `archive-${month}`;

    let entries =
        JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    const timeline =
        document.getElementById("timeline");

    function saveStorage(){

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(entries)
        );

    }

    function render(){

        timeline.innerHTML = "";

        if(entries.length === 0){

            timeline.innerHTML =
            "<p style='text-align:center;color:#8a8f98;'>No entries yet.</p>";

            return;

        }

        entries.forEach((entry,index)=>{

            const card = document.createElement("div");

            card.style.background = "white";
            card.style.border = "1px solid #d9d5cd";
            card.style.borderRadius = "18px";
            card.style.padding = "20px";
            card.style.marginBottom = "18px";

            card.innerHTML = `
                <h3>${entry.title}</h3>

                <small>${entry.category}</small>

                <p style="margin-top:12px;">
                    ${entry.text}
                </p>

                <button class="deleteButton"
                        data-index="${index}"
                        style="margin-top:18px;">
                    Delete
                </button>
            `;

            timeline.appendChild(card);

        });

        document.querySelectorAll(".deleteButton")
        .forEach(button=>{

            button.onclick=()=>{

                const i = Number(button.dataset.index);

                entries.splice(i,1);

                saveStorage();

                render();

            };

        });

    }

    render();

    // -------------------------
    // Save Button
    // -------------------------

    document
    .getElementById("saveEntry")
    .addEventListener("click",()=>{

        const title =
        document.getElementById("entryTitle").value.trim();

        const category =
        document.getElementById("entryCategory").value;

        const text =
        document.getElementById("entryText").value.trim();

        if(title==="" && text===""){

            return;

        }

        entries.unshift({

            title,

            category,

            text,

            created:new Date().toISOString()

        });

        saveStorage();

        render();

        document.getElementById("entryTitle").value="";

        document.getElementById("entryText").value="";

    });

});
