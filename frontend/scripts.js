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
            <td contenteditable="true">${application.company}</td>
            <td contenteditable="true">${application.source}</td>
            <td contenteditable="true">${application.season}</td>
            <td contenteditable="true">${application.date}</td>
            <td>
                <button type="button" class="btn btn-danger btn-xs" id="delete-${application.id}">Delete</button>
            </td>
        `
        applicationsContainer.appendChild(row)
        const deleteButton = document.getElementById(`delete-${application.id}`)
        deleteButton.addEventListener("click", async (event) => {
            const id = application.id
            await fetch(`/api/applications/${id}`, {
                method: "DELETE"
            })
            loadTodos()
        })
        const cells = row.getElementsByTagName("td")
        for(let i = 1; i < 5; i++) {
            cells[i].addEventListener("blur", async (event) => {
                const id = application.id
                const updatedValue = event.target.innerText
                await fetch(`/api/applications/${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        company: cells[1].textContent,
                        source: cells[2].textContent,
                        season: cells[3].textContent,
                        date: cells[4].textContent
                    })
                })
            })
        }
    })


}



