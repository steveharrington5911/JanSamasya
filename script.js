
const complaintForm = document.getElementById("complaintForm");
const photoInput = document.getElementById("photo");
const photoPreview = document.getElementById("photoPreview");
const formMessage = document.getElementById("formMessage");
const trackBtn = document.getElementById("trackBtn");

let complaints = JSON.parse(localStorage.getItem("janSamasyaComplaints")) || [];

photoInput.addEventListener("change", () => {
    const file = photoInput.files[0];

    if (!file) {
        photoPreview.style.display = "none";
        return;
    }

    if (!file.type.startsWith("image/")) {
        photoInput.value = "";
        photoPreview.style.display = "none";
        formMessage.textContent = "Please select a valid image.";
        return;
    }

    if (file.size > 5 * 1024 * 1024) {
        photoInput.value = "";
        photoPreview.style.display = "none";
        formMessage.textContent = "Image size must be less than 5 MB.";
        return;
    }

    photoPreview.src = URL.createObjectURL(file);
    photoPreview.style.display = "block";
    formMessage.textContent = "";
});

complaintForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const file = photoInput.files[0];

    if (!file) {
        formMessage.textContent = "Please upload a photograph.";
        return;
    }

    if (!file.type.startsWith("image/") || file.size > 5 * 1024 * 1024) {
        formMessage.textContent = "Please upload a valid image under 5 MB.";
        return;
    }

    const complaint = {
        id: "JS" + Date.now().toString().slice(-8),
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        state: document.getElementById("state").value.trim(),
        district: document.getElementById("district").value.trim(),
        category: document.getElementById("category").value,
        location: document.getElementById("location").value.trim(),
        description: document.getElementById("description").value.trim(),
        photoName: file.name,
        status: "Pending",
        date: new Date().toLocaleDateString()
    };

    complaints.push(complaint);

    localStorage.setItem(
        "janSamasyaComplaints",
        JSON.stringify(complaints)
    );

    formMessage.textContent = "Complaint submitted. Your Complaint ID is " + complaint.id;

    complaintForm.reset();
    photoPreview.style.display = "none";
});

trackBtn.addEventListener("click", () => {
    const enteredId = document.getElementById("complaintId").value.trim();
    const trackResult = document.getElementById("trackResult");

    const complaint = complaints.find(
        item => item.id.toLowerCase() === enteredId.toLowerCase()
    );

    if (!enteredId) {
        trackResult.textContent = "Please enter your Complaint ID.";
        return;
    }

    if (!complaint) {
        trackResult.textContent = "No complaint found with this ID.";
        return;
    }

    trackResult.innerHTML = `
        <h3>Complaint Details</h3>
        <p><strong>Complaint ID:</strong> ${complaint.id}</p>
        <p><strong>Category:</strong> ${complaint.category}</p>
        <p><strong>District:</strong> ${complaint.district}</p>
        <p><strong>Location:</strong> ${complaint.location}</p>
        <p><strong>Status:</strong> ${complaint.status}</p>
        <p><strong>Date:</strong> ${complaint.date}</p>
    `;
});
