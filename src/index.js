function test() {
  const test = document.createElement('div');
  test.textContent = 'HEllo world';
  return test;
}

document.body.appendChild(test());