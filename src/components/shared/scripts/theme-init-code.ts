// Shared theme initialization code - used in both inline script and Script component
export const THEME_INIT_CODE = `(function () {
  try {
    var root = document.documentElement;

    // لو SSR حاطط class خلاص، اخرج
    if (root.classList.contains('dark')) return;

    var theme = null;
    var m = document.cookie.match(/(?:^|; )theme=([^;]*)/);
    if (m) theme = decodeURIComponent(m[1]);

    if (!theme) {
      var stored = localStorage.getItem('theme-storage');
      if (stored) {
        // الأفضل: خلي storage صغير (theme فقط)
        var parsed = JSON.parse(stored);
        theme = parsed && parsed.state && parsed.state.theme;
      }
    }

    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
  } catch (e) {}
})();
`;
