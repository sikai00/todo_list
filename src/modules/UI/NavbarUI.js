export default function drawNavbar() {
  const navbar = document.createElement('div');
  navbar.classList.add('navbar');

  const logo = document.createElement('span');
  logo.classList.add('logo');
  logo.textContent = 'Todo List';

  navbar.appendChild(logo);

  return navbar;
}