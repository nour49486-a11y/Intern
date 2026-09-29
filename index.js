const i18n = {
  en: {
    langLabel: "العربية",
    title: "People",
    records: "records",
    refresh: "Refresh",
    addPerson: "+ Add person",
    searchPlaceholderAll: "Search by all fields...",
    searchPlaceholderName: "Search by name...",
    searchPlaceholderPhone: "Search by phone...",
    searchPlaceholderAge: "Search by age...",
    searchPlaceholderDate: "Search by birth date...",
    searchPlaceholderEmail: "Search by email...",
    optSearchAll: "Search All",
    optSearchName: "Name",
    optSearchPhone: "Phone",
    optSearchAge: "Age",
    optSearchDate: "Birth Date",
    optSearchEmail: "Email",
    thName: "Name",
    thGender: "Gender",
    thPhone: "Phone",
    thEmail: "Email",
    thBirth: "Birth date",
    thAge: "Age",
    edit: "Edit",
    remove: "Remove",
    confirmDelete: "Are you sure you want to remove this record?",
    noMatches: "No records match",
    showingOf: "of",
    addTitle: "Add Person",
    editTitle: "Edit Person",
    lblFormName: "Full Name",
    lblFormGender: "Gender",
    lblFormPhone: "Phone",
    lblFormEmail: "Email",
    lblFormDate: "Birth Date",
    lblFormAge: "Age",
    cancel: "Cancel",
    save: "Save",
    maleTag: "male",
    femaleTag: "female",
    optSortDefault: "Sort By",
    optSortNameAsc: "Name (A-Z / أ-ي)",
    optSortNameDesc: "Name (Z-A / ي-أ)",
    optSortAgeAsc: "Age (Youngest First)",
    optSortAgeDesc: "Age (Oldest First)",
    darkTheme: "Dark",
    lightTheme: "Light",
    statTotalLabel: "Total People",
    statMaleLabel: "Males",
    statFemaleLabel: "Females",
  },
  ar: {
    langLabel: "English",
    title: "إدارة المستخدمين",
    records: "سجل",
    refresh: "تحديث",
    addPerson: "+ إضافة شخص",
    searchPlaceholderAll: "ابحث في جميع الحقول...",
    searchPlaceholderName: "ابحث بالاسم...",
    searchPlaceholderPhone: "ابحث برقم الهاتف...",
    searchPlaceholderAge: "ابحث بالعمر...",
    searchPlaceholderDate: "ابحث بتاريخ الميلاد...",
    searchPlaceholderEmail: "ابحث بالبريد الإلكتروني...",
    optSearchAll: "البحث في الكل",
    optSearchName: "الاسم",
    optSearchPhone: "الهاتف",
    optSearchAge: "العمر",
    optSearchDate: "تاريخ الميلاد",
    optSearchEmail: "الإيميل",
    thName: "الاسم",
    thGender: "النوع",
    thPhone: "الهاتف",
    thEmail: "البريد الإلكتروني",
    thBirth: "تاريخ الميلاد",
    thAge: "العمر",
    edit: "تعديل",
    remove: "حذف",
    confirmDelete: "هل أنت تأكد من رغبتك في حذف هذا السجل؟",
    noMatches: "لا توجد نتائج تطابق",
    showingOf: "من إجمالي",
    addTitle: "إضافة شخص جديد",
    editTitle: "تعديل البيانات",
    lblFormName: "الاسم بالكامل",
    lblFormGender: "النوع",
    lblFormPhone: "رقم الهاتف",
    lblFormEmail: "البريد الإلكتروني",
    lblFormDate: "تاريخ الميلاد",
    lblFormAge: "العمر",
    cancel: "إلغاء",
    save: "حفظ",
    maleTag: "ذكر",
    femaleTag: "أنثى",
    optSortDefault: "ترتيب حسب",
    optSortNameAsc: "الاسم (أ-ي / A-Z)",
    optSortNameDesc: "الاسم (ي-أ / Z-A)",
    optSortAgeAsc: "العمر (الأصغر أولاً)",
    optSortAgeDesc: "العمر (الأكبر أولاً)",
    darkTheme: "داكن",
    lightTheme: "فاتح",
    statTotalLabel: "إجمالي الأشخاص",
    statMaleLabel: "الذكور",
    statFemaleLabel: "الإناث",
  },
};

let currentLang = localStorage.getItem("3s_lang") || "en";
let currentTheme = localStorage.getItem("3s_theme") || "dark";

let products = JSON.parse(localStorage.getItem("products")) || [
  {
    name: "أحمد إبراهيم",
    gender: "male",
    phone: "0115439321",
    email: "ahmed@example.com",
    date: "2004-09-26",
    age: 21,
  },
  {
    name: "marwan mohamed",
    gender: "male",
    phone: "0102558461",
    email: "marwan@example.com",
    date: "2002-04-12",
    age: 23,
  },
  {
    name: "سارة أحمد",
    gender: "female",
    phone: "0122547883",
    email: "sara@example.com",
    date: "2003-11-15",
    age: 22,
  },
];

const saveProducts = () =>
  localStorage.setItem("products", JSON.stringify(products));

if (!localStorage.getItem("products")) {
  saveProducts();
}

const table = document.getElementById("tableBody");
const pagination = document.getElementById("pagination");
const searchInput = document.getElementById("searchInput");
const searchFieldSelect = document.getElementById("searchFieldSelect");
const countLabel = document.getElementById("countLabel");
const rangeLabel = document.getElementById("rangeLabel");
const sortSelect = document.getElementById("sortSelect");

const perPage = 10;
let currentPage = 1;
let searchText = "";
let searchField = "all";
let currentSort = "none";

function toggleTheme() {
  currentTheme = currentTheme === "dark" ? "light" : "dark";
  localStorage.setItem("3s_theme", currentTheme);
  applyTheme();
}

function applyTheme() {
  const t = i18n[currentLang];
  document.documentElement.setAttribute("data-theme", currentTheme);

  const themeLabel = document.getElementById("themeLabel");
  const themeIcon = document.getElementById("themeIcon");

  if (themeLabel && themeIcon) {
    if (currentTheme === "dark") {
      themeLabel.textContent = t.lightTheme;
      themeIcon.innerHTML = `<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>`;
    } else {
      themeLabel.textContent = t.darkTheme;
      themeIcon.innerHTML = `<path d="M12 3a6 6 0 0 0 9 9 9 0 1 1-9-9Z"></path>`;
    }
  }
}

function toggleLanguage() {
  currentLang = currentLang === "en" ? "ar" : "en";
  localStorage.setItem("3s_lang", currentLang);
  applyLanguage();
}

function updateSearchPlaceholder() {
  const t = i18n[currentLang];
  if (!searchInput) return;

  switch (searchField) {
    case "name":
      searchInput.placeholder = t.searchPlaceholderName;
      break;
    case "phone":
      searchInput.placeholder = t.searchPlaceholderPhone;
      break;
    case "age":
      searchInput.placeholder = t.searchPlaceholderAge;
      break;
    case "date":
      searchInput.placeholder = t.searchPlaceholderDate;
      break;
    case "email":
      searchInput.placeholder = t.searchPlaceholderEmail;
      break;
    default:
      searchInput.placeholder = t.searchPlaceholderAll;
  }
}

function updateStats() {
  const total = products.length;
  const males = products.filter((p) => p.gender === "male").length;
  const females = products.filter((p) => p.gender === "female").length;

  if (document.getElementById("statTotalVal"))
    document.getElementById("statTotalVal").textContent = total;
  if (document.getElementById("statMaleVal"))
    document.getElementById("statMaleVal").textContent = males;
  if (document.getElementById("statFemaleVal"))
    document.getElementById("statFemaleVal").textContent = females;
}

function applyLanguage() {
  const t = i18n[currentLang];
  const isRtl = currentLang === "ar";

  document.documentElement.setAttribute("dir", isRtl ? "rtl" : "ltr");
  document.documentElement.setAttribute("lang", currentLang);

  if (document.getElementById("langLabel"))
    document.getElementById("langLabel").textContent = t.langLabel;
  if (document.getElementById("titleTxt"))
    document.getElementById("titleTxt").textContent = t.title;
  if (document.getElementById("refreshBtn"))
    document.getElementById("refreshBtn").textContent = t.refresh;
  if (document.getElementById("addBtn"))
    document.getElementById("addBtn").textContent = t.addPerson;

  if (document.getElementById("statTotalLabel"))
    document.getElementById("statTotalLabel").textContent = t.statTotalLabel;
  if (document.getElementById("statMaleLabel"))
    document.getElementById("statMaleLabel").textContent = t.statMaleLabel;
  if (document.getElementById("statFemaleLabel"))
    document.getElementById("statFemaleLabel").textContent = t.statFemaleLabel;

  updateSearchPlaceholder();

  if (document.getElementById("optSearchAll")) {
    document.getElementById("optSearchAll").textContent = t.optSearchAll;
    document.getElementById("optSearchName").textContent = t.optSearchName;
    document.getElementById("optSearchPhone").textContent = t.optSearchPhone;
    document.getElementById("optSearchAge").textContent = t.optSearchAge;
    document.getElementById("optSearchDate").textContent = t.optSearchDate;
    document.getElementById("optSearchEmail").textContent = t.optSearchEmail;
  }

  updateTableHeaderIcons();
  if (document.getElementById("thGender"))
    document.getElementById("thGender").textContent = t.thGender;
  if (document.getElementById("thPhone"))
    document.getElementById("thPhone").textContent = t.thPhone;
  if (document.getElementById("thEmail"))
    document.getElementById("thEmail").textContent = t.thEmail;
  if (document.getElementById("thBirth"))
    document.getElementById("thBirth").textContent = t.thBirth;

  if (document.getElementById("lblFormName"))
    document.getElementById("lblFormName").textContent = t.lblFormName;
  if (document.getElementById("lblFormGender"))
    document.getElementById("lblFormGender").textContent = t.lblFormGender;
  if (document.getElementById("lblFormPhone"))
    document.getElementById("lblFormPhone").textContent = t.lblFormPhone;
  if (document.getElementById("lblFormEmail"))
    document.getElementById("lblFormEmail").textContent = t.lblFormEmail;
  if (document.getElementById("lblFormDate"))
    document.getElementById("lblFormDate").textContent = t.lblFormDate;
  if (document.getElementById("lblFormAge"))
    document.getElementById("lblFormAge").textContent = t.lblFormAge;
  if (document.getElementById("cancelBtn"))
    document.getElementById("cancelBtn").textContent = t.cancel;
  if (document.getElementById("saveBtn"))
    document.getElementById("saveBtn").textContent = t.save;

  if (document.getElementById("optSortDefault")) {
    document.getElementById("optSortDefault").textContent = t.optSortDefault;
    document.getElementById("optSortNameAsc").textContent = t.optSortNameAsc;
    document.getElementById("optSortNameDesc").textContent = t.optSortNameDesc;
    document.getElementById("optSortAgeAsc").textContent = t.optSortAgeAsc;
    document.getElementById("optSortAgeDesc").textContent = t.optSortAgeDesc;
  }

  applyTheme();
  showProducts();
}

function updateTableHeaderIcons() {
  const t = i18n[currentLang];
  let nameArrow = " ↕";
  let ageArrow = " ↕";

  if (currentSort === "name-asc") nameArrow = " ↑";
  if (currentSort === "name-desc") nameArrow = " ↓";
  if (currentSort === "age-asc") ageArrow = " ↑";
  if (currentSort === "age-desc") ageArrow = " ↓";

  if (document.getElementById("thName"))
    document.getElementById("thName").textContent = t.thName + nameArrow;
  if (document.getElementById("thAge"))
    document.getElementById("thAge").textContent = t.thAge + ageArrow;
}

function handleSearchFieldChange(fieldValue) {
  searchField = fieldValue;
  updateSearchPlaceholder();
  currentPage = 1;
  showProducts();
}

function handleSortChange(sortValue) {
  currentSort = sortValue;
  updateTableHeaderIcons();
  currentPage = 1;
  showProducts();
}

function toggleSortField(field) {
  if (field === "name") {
    currentSort = currentSort === "name-asc" ? "name-desc" : "name-asc";
  } else if (field === "age") {
    currentSort = currentSort === "age-asc" ? "age-desc" : "age-asc";
  }
  if (sortSelect) sortSelect.value = currentSort;
  updateTableHeaderIcons();
  currentPage = 1;
  showProducts();
}

function getProcessedProducts() {
  let result = [...products];

  if (searchText.trim()) {
    const query = searchText.toLowerCase().trim();

    result = result.filter((p) => {
      const originalIndex = (products.indexOf(p) + 1).toString();

      switch (searchField) {
        case "name":
          return p.name.toLowerCase().includes(query);
        case "phone":
          return p.phone.toLowerCase().includes(query);
        case "age":
          return p.age.toString().includes(query);
        case "date":
          return p.date.toLowerCase().includes(query);
        case "email":
          return p.email.toLowerCase().includes(query);
        case "all":
        default:
          const nameMatch = p.name.toLowerCase().includes(query);
          const phoneMatch = p.phone.toLowerCase().includes(query);
          const emailMatch = p.email.toLowerCase().includes(query);
          const dateMatch = p.date.toLowerCase().includes(query);
          const ageMatch = p.age.toString().includes(query);
          const indexMatch =
            originalIndex === query || originalIndex.includes(query);

          return (
            nameMatch ||
            phoneMatch ||
            emailMatch ||
            dateMatch ||
            ageMatch ||
            indexMatch
          );
      }
    });
  }

  if (currentSort === "name-asc") {
    result.sort((a, b) =>
      a.name.localeCompare(b.name, ["ar", "en"], { sensitivity: "base" }),
    );
  } else if (currentSort === "name-desc") {
    result.sort((a, b) =>
      b.name.localeCompare(a.name, ["ar", "en"], { sensitivity: "base" }),
    );
  } else if (currentSort === "age-asc") {
    result.sort((a, b) => Number(a.age) - Number(b.age));
  } else if (currentSort === "age-desc") {
    result.sort((a, b) => Number(b.age) - Number(a.age));
  }

  return result;
}

function showProducts() {
  const t = i18n[currentLang];
  const processed = getProcessedProducts();
  const start = (currentPage - 1) * perPage;
  const pageItems = processed.slice(start, start + perPage);

  if (countLabel) countLabel.textContent = `${products.length} ${t.records}`;

  updateStats();

  if (!table) return;

  if (pageItems.length === 0) {
    table.innerHTML = `<tr><td colspan="9"><div class="empty" style="text-align: center; padding: 20px; color: var(--text-muted);">${t.noMatches} "${searchText}"</div></td></tr>`;
  } else {
    table.innerHTML = pageItems
      .map((el) => {
        const index = products.indexOf(el);
        const tagLabel = el.gender === "male" ? t.maleTag : t.femaleTag;
        return `
        <tr>
          <td>${index + 1}</td>
          <td class="name-cell">${el.name}</td>
          <td><span class="tag tag-${el.gender}">${tagLabel}</span></td>
          <td>+20 ${el.phone}</td>
          <td class="muted-cell">${el.email}</td>
          <td class="muted-cell">${el.date}</td>
          <td>${el.age}</td>
          <td><button class="icon-btn" onclick="openModal(${index})">${t.edit}</button></td>
          <td><button class="icon-btn danger" onclick="removePerson(${index})">${t.remove}</button></td>
        </tr>`;
      })
      .join("");
  }

  if (rangeLabel) {
    rangeLabel.textContent = processed.length
      ? `${start + 1}–${Math.min(start + perPage, processed.length)} ${t.showingOf} ${processed.length}`
      : "0 of 0";
  }

  showPagination(processed.length);
}

function showPagination(totalFilteredCount) {
  if (!pagination) return;
  const totalPages = Math.ceil(totalFilteredCount / perPage) || 1;

  let html = `
    <li class="page-item ${currentPage === 1 ? "disabled" : ""}">
      <a class="page-link" href="#" onclick="changePage(${currentPage - 1}); return false;">‹</a>
    </li>`;

  for (let i = 1; i <= totalPages; i++) {
    html += `
      <li class="page-item ${i === currentPage ? "active" : ""}">
        <a class="page-link" href="#" onclick="changePage(${i}); return false;">${i}</a>
      </li>`;
  }

  html += `
    <li class="page-item ${currentPage === totalPages ? "disabled" : ""}">
      <a class="page-link" href="#" onclick="changePage(${currentPage + 1}); return false;">›</a>
    </li>`;

  pagination.innerHTML = html;
}

function changePage(page) {
  const totalPages = Math.ceil(getProcessedProducts().length / perPage) || 1;
  if (page < 1 || page > totalPages) return;
  currentPage = page;
  showProducts();
}

function removePerson(index) {
  const t = i18n[currentLang];
  if (confirm(t.confirmDelete)) {
    products.splice(index, 1);
    saveProducts();

    const totalPages = Math.ceil(getProcessedProducts().length / perPage) || 1;
    if (currentPage > totalPages) currentPage = totalPages;

    showProducts();
  }
}

function showProductsRefresh() {
  searchText = "";
  searchField = "all";
  if (searchInput) searchInput.value = "";
  if (searchFieldSelect) searchFieldSelect.value = "all";
  updateSearchPlaceholder();
  currentPage = 1;
  showProducts();
}

function openModal(editIdx = -1) {
  if (editIdx < 0) {
    window.location.href = "newuser.html";
    return;
  }
  window.location.href = `./edit.html?index=${editIdx}`;
}

function closeModal() {
  const modal = document.getElementById("userModal");
  if (modal) modal.classList.remove("active");
}

function calculateAge() {
  const dobVal = document.getElementById("inputDate").value;
  if (!dobVal) return;

  const dob = new Date(dobVal);
  const today = new Date();

  let calculatedAge = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    calculatedAge--;
  }

  document.getElementById("inputAge").value = Math.max(0, calculatedAge);
}

function handleFormSubmit(e) {
  e.preventDefault();
  const editIdx = parseInt(document.getElementById("editIndex").value);

  const updatedPerson = {
    name: document.getElementById("inputName").value,
    gender: document.getElementById("inputGender").value,
    phone: document.getElementById("inputPhone").value,
    email: document.getElementById("inputEmail").value,
    date: document.getElementById("inputDate").value,
    age: parseInt(document.getElementById("inputAge").value) || 0,
  };

  if (editIdx >= 0) {
    products[editIdx] = updatedPerson;
    saveProducts();
    closeModal();
    showProducts();
  }
}

if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    searchText = e.target.value;
    currentPage = 1;
    showProducts();
  });
}

applyLanguage();
