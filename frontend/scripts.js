const form = document.getElementById("application")
const companyInput = document.getElementById("company")
const sourceInput = document.getElementById("source")
const seasonInput = document.getElementById("season")
const dateInput = document.getElementById("date")

const applicationsContainer = document.getElementById("applications")

form.addEventListener("submit", async (event) => {
    event.preventDefault()

    const company =  companyInput.value
    const source =  sourceInput.value
    const season =  seasonInput.value
    const date =  dateInput.value

    await fetch("/api/applications", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            company: company,
            source: source,
            season: season,
            date: date
        })
    })

    loadTodos()
})

document.addEventListener("DOMContentLoaded", async () => {
  loadTodos()
});

async function loadTodos() {
    const response = await fetch("/api/applications")
    const applicationsAll = await response.json()

    applicationsContainer.innerHTML = ""
    
    applicationsAll.forEach(application => {
        const row = document.createElement("tr")

        row.innerHTML = `
            <td>${application.id}</td>
            <td>${application.company}</td>
            <td>${application.source}</td>
            <td>${application.season}</td>
            <td>${application.date}</td>
        `
        applicationsContainer.appendChild(row)
    })


}


