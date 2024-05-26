function toggleTheme() {
  var body = document.body;
  var themeIcon = document.getElementById('theme-icon');
  var statsItems = document.querySelectorAll('.stats-item');

  body.classList.toggle('dark-theme');
  if (body.classList.contains('dark-theme')) {
    body.style.backgroundColor = '#1F1F1F';
    body.style.color = '#D3D3D3';
    statsItems.forEach(item => {
      item.style.filter = 'brightness(0.8)';
    });
    themeIcon.src = 'https://img.shields.io/badge/Theme-Dark-5865F2?style=for-the-badge';
  } else {
    body.style.backgroundColor = '#ffffff';
    body.style.color = '#333';
    statsItems.forEach(item => {
      item.style.filter = 'none';
    });
    themeIcon.src = 'https://img.shields.io/badge/Theme-Light-4E5D94?style=for-the-badge';
  }
}

// Initialize with light theme
document.addEventListener('DOMContentLoaded', function() {
  toggleTheme();
});