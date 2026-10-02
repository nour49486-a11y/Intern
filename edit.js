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
  try {
    const urlParams = new URLSearchParams(window.location.search);
    let userIndex = urlParams.get("index");

    let products = JSON.parse(localStorage.getItem("products")) || [];

    // لو الـ LocalStorage فاضي، بننشئ عنصر افتراضي عشان الكود مبيضربش
    if (products.length === 0) {
      products.push({
        name: "",
        gender: "Male",
        phone: "",
        email: "",
        date: "",
        image: "",
      });
      localStorage.setItem("products", JSON.stringify(products));
    }

    if (userIndex === null || isNaN(userIndex) || !products[userIndex]) {
      userIndex = 0;
    } else {
      userIndex = parseInt(userIndex);
    }

    const calcAge = (dateValue) => {
      if (!dateValue) return 0;
      const birth = new Date(dateValue);
      const today = new Date();
      let age = today.getFullYear() - birth.getFullYear();
      const m = today.getMonth() - birth.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
      return Math.max(0, age);
    };

    // تعبئة الحقول بالبيانات الحالية
    const currentUser = products[userIndex] || {};
    document.getElementById("name").value = currentUser.name || "";
    document.getElementById("gender").value = currentUser.gender || "Male";
    document.getElementById("phone").value = currentUser.phone || "";
    document.getElementById("email").value = currentUser.email || "";
    document.getElementById("date").value = currentUser.date || "";

    if (currentUser.image) {
      document.getElementById("inputImageBase64").value = currentUser.image;
      const preview = document.getElementById("previewImg");
      preview.src = currentUser.image;
      preview.style.display = "inline-block";
    }

    // تفعيل زر الحفظ وتحديث البيانات
    const form = document.getElementById("userForm");
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const dateValue = document.getElementById("date").value;
      const existingImage = currentUser.image || "";
      const newImage = document.getElementById("inputImageBase64").value;

      products[userIndex] = {
        name: document.getElementById("name").value.trim(),
        gender: document.getElementById("gender").value,
        phone: document.getElementById("phone").value.trim(),
        email: document.getElementById("email").value.trim(),
        date: dateValue,
        age: calcAge(dateValue),
        image: newImage ? newImage : existingImage,
      };

      localStorage.setItem("products", JSON.stringify(products));
      window.location.href = "./index.html";
    });
  } catch (err) {
    console.error("Error details:", err);
    alert("حدث خطأ في التشغيل: " + err.message);
  }
});
