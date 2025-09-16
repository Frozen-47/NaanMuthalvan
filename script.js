// DOM Elements
const fileInput = document.getElementById('fileInput');
const profileImage = document.getElementById('profileImage');
const modal = document.getElementById('passwordModal');
const passwordInput = document.getElementById('passwordInput');
const errorMsg = document.getElementById('errorMsg');
const darkToggle = document.querySelector('.dark-toggle');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabSections = document.querySelectorAll('section');

// Configuration
const correctPassword = "1234";

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  initializeProfileImage();
  initializeDarkMode();
  initializeTabNavigation();
  updateDarkToggleText();
});

// Profile Image Functions
function initializeProfileImage() {
  const savedImage = JSON.parse(sessionStorage.getItem("profileImage"));
  if (savedImage) {
    profileImage.src = savedImage;
  }
}

function showModal() {
  modal.style.display = 'flex';
  passwordInput.value = '';
  errorMsg.textContent = '';
  passwordInput.focus();
}

function checkPassword() {
  if (passwordInput.value === correctPassword) {
    modal.style.display = 'none';
    fileInput.click();
  } else {
    errorMsg.textContent = "Incorrect password!";
  }
}

// File input event listener
fileInput.addEventListener('change', function () {
  const file = this.files[0];
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = function (e) {
      profileImage.src = e.target.result;
      sessionStorage.setItem("profileImage", JSON.stringify(e.target.result));
    };
    reader.readAsDataURL(file);
  } else {
    alert("Please select a valid image file.");
  }
});

// Modal close on background click
window.onclick = function(e) {
  if (e.target === modal) {
    modal.style.display = "none";
  }
};

// Dark Mode Functions
function initializeDarkMode() {
  const savedDarkMode = JSON.parse(sessionStorage.getItem("darkMode"));
  if (savedDarkMode) {
    document.body.classList.add('dark-mode');
  }
}

function updateDarkToggleText() {
  const isDark = document.body.classList.contains('dark-mode');
  darkToggle.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
}

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  sessionStorage.setItem("darkMode", JSON.stringify(isDark));
  updateDarkToggleText();
}

// Tab Navigation
function initializeTabNavigation() {
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from current active button and section
      document.querySelector('.tab-btn.active').classList.remove('active');
      document.querySelector('section.active').classList.remove('active');
      
      // Add active class to clicked button and corresponding section
      btn.classList.add('active');
      document.getElementById(btn.getAttribute('data-tab')).classList.add('active');
    });
  });
}

// Password input enter key support
document.getElementById('passwordInput').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    checkPassword();
  }
});