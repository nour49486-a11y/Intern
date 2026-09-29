const urlParams = new URLSearchParams(window.location.search);
const userIndex = urlParams.get("index");

let products = JSON.parse(localStorage.getItem("products")) || [];

const calcAge = (dateValue) => {
  if (!dateValue) return 0;
  const birth = new Date(dateValue);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return Math.max(0, age);
};

if (userIndex !== null && products[userIndex]) {
  const currentUser = products[userIndex];
  document.getElementById("name").value = currentUser.name;
  document.getElementById("gender").value = currentUser.gender;
  document.getElementById("phone").value = currentUser.phone;
  document.getElementById("email").value = currentUser.email;
  document.getElementById("date").value = currentUser.date;
}

const form = document.getElementById("userForm");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (userIndex !== null && products[userIndex]) {
    const dateValue = document.getElementById("date").value;

    products[userIndex] = {
      name: document.getElementById("name").value.trim(),
      gender: document.getElementById("gender").value,
      phone: document.getElementById("phone").value.trim(),
      email: document.getElementById("email").value.trim(),
      date: dateValue,
      age: calcAge(dateValue),
    };

    localStorage.setItem("products", JSON.stringify(products));
    window.location.href = "./index.html";
  }
});
