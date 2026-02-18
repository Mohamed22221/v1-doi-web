// Shared theme initialization code - used in both inline script and Script component
export const THEME_INIT_CODE = `(function () {
  try {
    var root = document.documentElement;

    // 1. Sync Locale & Direction from URL immediately to prevent flash
    var path = window.location.pathname;
    var segments = path.split('/');
    var locale = segments[1];
    if (locale && (locale.length === 2 || locale.length === 3)) {
        root.lang = locale;
        var rtlLocales = ['ar', 'fa', 'ur'];
        var isRTL = rtlLocales.indexOf(locale) !== -1;
        root.dir = isRTL ? 'rtl' : 'ltr';
    }

    // 2. Sync Theme
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
