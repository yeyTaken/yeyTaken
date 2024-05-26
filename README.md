<h1 align="center">
  <img src="./src/assets/img/eukkj.jpg" width="80px" height="80px" style="border-radius: 50%;"/>
</h1>

<h1 align="center">Olá, me chamo yey!</h1>

<h3 align="center">Eu sou o Israel, um iniciante no mundo da programação e faço projetos nas horas vagas.</h3>

<div align="center">
  <a href="#!" onclick="toggleTheme(); return false;">
    <img id="theme-icon" class="theme-icon" src="https://img.shields.io/badge/Theme-Light-4E5D94?style=for-the-badge" />
  </a>
</div>

<div align="center" style="margin-top: 20px;">
  <img class="stats-item" src="https://github-readme-stats.vercel.app/api?username=yeyTaken&show_icons=true&hide_border=true&title_color=4E5D94&icon_color=4E5D94&text_color=9fabb7&bg_color=ffffff00" alt="yeyTaken github stats" /> 
  <img class="stats-item" src="https://github-readme-stats.vercel.app/api/top-langs/?username=yeyTaken&layout=compact&hide_border=true&title_color=4E5D94&text_color=9fabb7&bg_color=ffffff00" />
</div>

<div align="center" style="margin-top: 30px;">
  <h2 style="color: #4E5D94;">📦 Projetos recentes</h2>
</div>

<div align="center">
  <a href="https://github.com/yeyTaken/gift-manager" target="_blank" style="text-decoration: none;">
    <img src="https://github-readme-stats.vercel.app/api/pin/?username=yeyTaken&repo=gift-manager&hide_border=true&title_color=4E5D94&text_color=9fabb7&icon_color=4E5D94&bg_color=ffffff00" alt="Gift Manager">
  </a>
</div>

<div align="center" style="margin-top: 30px;">
  <h2 style="color: #4E5D94;">💻 Habilidades & Ferramentas</h2>
  <img src="https://skillicons.dev/icons?i=djs,js,ts,nodejs,discordjs,npm,mongodb,vscode,git,linux,yeyTaken" />
</div>

<script>
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
</script>
<style>
  @font-face {
  font-family: 'FiraCode Nerd Font';
  src: url('./src/assets/fonts/FiraCode-Regular.woff2') format('woff2'),
       url('./src/assets/fonts/FiraCode-Regular.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}

body {
  font-family: 'FiraCode Nerd Font', 'Helvetica Neue', Arial, sans-serif;
  line-height: 1.6;
  background-color: #ffffff;
  color: #333;
  margin: 0;
  padding: 0;
}

h1, h3 {
  text-align: center;
  font-weight: normal;
}

h1 {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

#theme-icon {
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}

#theme-icon:hover {
  transform: scale(1.2);
}

.stats-item {
  width: 45%;
  margin: 10px;
  transition: transform 0.3s ease-in-out;
}

.stats-item:hover {
  transform: scale(1.05);
}
</style>