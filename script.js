// === Variables ===
let shareCount = Number(localStorage.getItem("shareCount")) || 0;

const form = document.getElementById('registrationForm');
const whatsappBtn = document.getElementById('whatsappBtn');
const shareCountDisplay = document.getElementById('shareCount');
const submitBtn = document.getElementById('submitBtn');
const thankYou = document.getElementById('thankYouMessage');

// === Prevent Resubmission ===
const isSubmitted = localStorage.getItem("submitted");
if (isSubmitted) {
  form.style.display = "none";
  thankYou.style.display = "block";
} else {
  shareCountDisplay.innerText = `Click count: ${shareCount}/5`;
}

// === WhatsApp Share Button ===
whatsappBtn.addEventListener('click', () => {
  if (shareCount < 5) {
    shareCount++;
    localStorage.setItem("shareCount", shareCount);

    const message = encodeURIComponent("Hey Buddy, Join Tech For Girls Community!");
    const whatsappURL = `https://wa.me/?text=${message}`;
    window.open(whatsappURL, "_blank");

    shareCountDisplay.innerText = `Click count: ${shareCount}/5`;

    if (shareCount === 5) {
      alert("✅ Sharing complete. You may now submit the form.");
    }
  } else {
    alert("✅ You’ve already shared 5 times.");
  }
});

// === Form Submission ===
form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (shareCount < 5) {
    alert("❌ Please share 5 times on WhatsApp before submitting.");
    return;
  }

  submitBtn.disabled = true;

  // OPTIONAL: You can still validate inputs here if needed
  // const name = document.getElementById('name').value.trim();
  // const phone = document.getElementById('phone').value.trim();

  // === Final step: Thank you message
  localStorage.setItem("submitted", true);
  localStorage.removeItem("shareCount");

  form.reset();
  form.style.display = "none";
  thankYou.style.display = "block";
});
