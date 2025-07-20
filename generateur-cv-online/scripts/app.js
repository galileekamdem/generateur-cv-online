// Récupérer les éléments HTML
const cvForm = document.getElementById("cv-form");
const cvPreview = document.getElementById("cv-preview");
const exportPdfBtn = document.getElementById("export-pdf");

// Quand on soumet le formulaire
cvForm.addEventListener("submit", function(e) {
    e.preventDefault(); // Empêche le rechargement de la page

    // Récupérer les valeurs du formulaire
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const skills = document.getElementById("skills").value.split(",");

    // Afficher l'aperçu du CV
    document.getElementById("preview-name").textContent = name;
    document.getElementById("preview-email").textContent = email;

    const skillsList = document.getElementById("preview-skills");
    skillsList.innerHTML = ""; // Vider la liste avant de la remplir

    skills.forEach(skill => {
        if (skill.trim() !== "") {
            const li = document.createElement("li");
            li.textContent = skill.trim();
            skillsList.appendChild(li);
        }
    });

    // Afficher l'aperçu et le bouton PDF
    cvPreview.classList.remove("hidden");
    exportPdfBtn.classList.remove("hidden");
});

// Export PDF
exportPdfBtn.addEventListener("click", function() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.text("CV de " + document.getElementById("preview-name").textContent, 10, 10);
    doc.text("Email: " + document.getElementById("preview-email").textContent, 10, 20);
    
    // Ajouter les compétences
    let yPosition = 30;
    const skills = document.querySelectorAll("#preview-skills li");
    skills.forEach(skill => {
        doc.text("- " + skill.textContent, 10, yPosition);
        yPosition += 10;
    });

    doc.save("mon-cv.pdf");
});