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

      let products = JSON.parse(localStorage.getItem("products")) || [];

      const newPerson = {
        name,
        gender,
        phone,
        email,
        date,
        age,
      };

      products.push(newPerson);

      localStorage.setItem("products", JSON.stringify(products));

      window.location.href = "./index.html";
    });
  }
});
