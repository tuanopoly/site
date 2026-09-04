// Light/dark toggle, same behaviour as accentpal.tuanopoly.com: follows the system until
// the visitor picks, is not persisted, and keeps the browser chrome colour in step.
(function () {
  var toggle = document.getElementById('mode-toggle');
  var meta = document.querySelector('meta[name="theme-color"]');
  var root = document.documentElement;
  var mode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

  function apply() {
    root.dataset.theme = mode;
    toggle.textContent = mode === 'light' ? 'Dark' : 'Light';
    toggle.setAttribute('aria-pressed', String(mode === 'dark'));
    if (meta) meta.content = getComputedStyle(root).getPropertyValue('--ap-background').trim();
  }

  toggle.addEventListener('click', function () {
    mode = mode === 'light' ? 'dark' : 'light';
    apply();
  });

  apply();
})();
