let webcamStream = null;

// معالجة رفع الصورة من الجهاز وتحويلها لـ Base64
function handleImageUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function (uploadEvent) {
    const base64String = uploadEvent.target.result;
    document.getElementById("inputImageBase64").value = base64String;
    const preview = document.getElementById("previewImg");
    preview.src = base64String;
    preview.style.display = "inline-block";
  };
  reader.readAsDataURL(file);
}

// فتح كاميرا اللابتوب
async function openCameraModal() {
  const modalElement = document.getElementById("cameraModal");
  const modal = new bootstrap.Modal(modalElement);
  modal.show();

  const video = document.getElementById("webcamVideo");
  try {
    webcamStream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = webcamStream;
  } catch (err) {
    alert("Could not access webcam.");
    modal.hide();
  }
}

// إغلاق الكاميرا وإيقاف الـ Stream
function closeCameraModal() {
  if (webcamStream) {
    webcamStream.getTracks().forEach((track) => track.stop());
    webcamStream = null;
  }
}

// التقاط الصورة من الكاميرا
function captureWebcam() {
  const video = document.getElementById("webcamVideo");
  const canvas = document.getElementById("webcamCanvas");
  canvas.width = video.videoWidth || 320;
  canvas.height = video.videoHeight || 240;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  const base64String = canvas.toDataURL("image/png");

  document.getElementById("inputImageBase64").value = base64String;
  const preview = document.getElementById("previewImg");
  preview.src = base64String;
  preview.style.display = "inline-block";

  const modalElement = document.getElementById("cameraModal");
  const modal = bootstrap.Modal.getInstance(modalElement);
  modal.hide();
  closeCameraModal();
}

document.addEventListener("DOMContentLoaded", () => {
  const userForm = document.getElementById("userForm");
  const dateInput = document.getElementById("date");

  function calculateAge(dobValue) {
    const dob = new Date(dobValue);
    const today = new Date();

    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--;
    }

    return Math.max(0, age);
  }

  if (userForm) {
    userForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const gender = document.getElementById("gender").value;
      const phone = document.getElementById("phone").value.trim();
      const email = document.getElementById("email").value.trim();
      const date = dateInput.value;
      const age = calculateAge(date);
      const image = document.getElementById("inputImageBase64").value || "";

      let products = JSON.parse(localStorage.getItem("products")) || [];

      const newPerson = {
        name,
        gender,
        phone,
        email,
        date,
        age,
        image,
      };

      products.push(newPerson);

      localStorage.setItem("products", JSON.stringify(products));

      window.location.href = "./index.html";
    });
  }
});
