const darkToggle = document.getElementById("darkModeToggle");
const body = document.body;

// Toggle dark mode and icon
darkToggle.addEventListener("click", () => {
  const isDark = body.classList.toggle("dark-mode");
  localStorage.setItem("darkMode", isDark);
  darkToggle.classList.toggle("fa-moon", !isDark);
  darkToggle.classList.toggle("fa-sun", isDark);
});

// Keep dark mode and icon state after reload
if (localStorage.getItem("darkMode") === "true") {
  body.classList.add("dark-mode");
  darkToggle.classList.remove("fa-moon");
  darkToggle.classList.add("fa-sun");
}

// ---------- Profile Picture Upload Preview ----------
const uploadBtn = document.getElementById("uploadBtn");
const fileInput = document.getElementById("profFileInput");
const profImage = document.getElementById("profImage");
const initials = document.querySelector(".prof-initials");

if (uploadBtn && fileInput && profImage) {
  uploadBtn.addEventListener("click", () => fileInput.click());

  fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        initials.style.display = "none";
        profImage.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });
}

// --- Working Upload Buttons ---
    const progressCount = document.getElementById("progressCount");
    let uploadedCount = 0;
    const totalDocs = document.querySelectorAll(".requirement-card").length;

    // Loop through all requirement cards
    document.querySelectorAll(".requirement-card").forEach((card) => {
      const uploadBtn = card.querySelector(".upload-btn");
      const fileInput = card.querySelector(".file-input");
      const status = card.querySelector(".status-tag");
      const viewBtn = card.querySelector(".view-btn");
      let uploaded = false;

      uploadBtn.addEventListener("click", () => fileInput.click());

      fileInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file && !uploaded) {
          uploaded = true;
          uploadedCount++;
          updateProgress();

          // Update UI
          status.textContent = "Uploaded";
          status.classList.add("uploaded");
          uploadBtn.innerHTML = '<i class="fa-solid fa-check"></i> Uploaded';
          uploadBtn.disabled = true;
          viewBtn.disabled = false;

          // Enable file viewing
          const fileURL = URL.createObjectURL(file);
          viewBtn.addEventListener("click", () => {
            window.open(fileURL, "_blank");
          });
        }
      });
    });

    // Update progress text dynamically
    function updateProgress() {
      progressCount.innerHTML = `<strong>${uploadedCount} of ${totalDocs} documents submitted</strong>`;
    }

    // Handle form submission
    document.getElementById('feedbackForm').addEventListener('submit', function(event) {
      event.preventDefault();
      alert('✅ Feedback submitted successfully! Thank you for your input.');
      this.reset();
    });

    // Dark mode toggle sync
    const themeToggle = document.getElementById("themeToggle");
    themeToggle.addEventListener("change", () => {
      document.body.classList.toggle("dark-mode", themeToggle.checked);
    });

    // Password form mock behavior
    document.getElementById("passwordForm").addEventListener("submit", e => {
      e.preventDefault();
      const newPass = document.getElementById("newPass").value;
      const confirmPass = document.getElementById("confirmPass").value;
      if (newPass !== confirmPass) {
        alert("⚠️ Passwords do not match!");
      } else {
        alert("✅ Password updated successfully!");
        e.target.reset();
      }
    });

    