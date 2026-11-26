(function () {
  'use strict';
  var defaultTitle = 'Daily Energy Dashboard';
  var english = {
  "Kartentitel (optional)": "Card title (optional)",
  "PV-Ertrag gesamt": "Total solar production",
  "Netzbezug gesamt": "Total grid import",
  "Einspeisung gesamt": "Total grid export",
  "Batterieladung gesamt": "Total battery charge",
  "Batterieentladung gesamt": "Total battery discharge",
  "Batterieladezustand": "Battery state of charge",
  "PV-Leistung": "Solar power",
  "Hausleistung": "Home power",
  "Netzleistung": "Grid power",
  "Batterieleistung (optional)": "Battery power (optional)",
  "Ladeleistung (optional)": "EV charging power (optional)",
  "Nebentarif ab": "Off-peak starts",
  "Nebentarif bis": "Off-peak ends",
  "Nebentarif (ct/kWh)": "Off-peak price (ct/kWh)",
  "Standardtarif (ct/kWh)": "Standard price (ct/kWh)",
  "Einspeisevergütung (ct/kWh)": "Export credit (ct/kWh)",
  "Grundpreis (ct/Tag)": "Daily charge (ct/day)",
  "Energiedashboard mit Beispieldaten": "Energy dashboard with sample data",
  "Wähle eine Entität, um die Live-Vorschau zu laden.": "Select an entity to load the live preview.",
  "Verlaufsdaten konnten nicht geladen werden.": "Could not load history data.",
  "Haus": "Home",
  "Netz": "Grid",
  "Batterie": "Battery",
  "Ladepunkt": "EV charger",
  "PV-Prognose": "Solar forecast",
  "Leistungsverlauf. Pfeiltasten zeigen die Werte zur gewählten Uhrzeit.": "Power history. Use the arrow keys to view values at the selected time.",
  "Einspeisung": "Grid export",
  "Eigenverbrauch": "Self-consumption",
  "Autarkie": "Self-sufficiency",
  "Batterieladung": "Battery charge",
  "Batterieentladung": "Battery discharge",
  "Stand": "As of",
  "Tarifdaten im Karteneditor eintragen.": "Enter your tariff in the card editor.",
  "Posten": "Item",
  "Energie": "Energy",
  "Betrag": "Amount",
  "Tarif / Hinweis": "Rate / note",
  "Nebentarif": "Off-peak",
  "Standardtarif": "Standard rate",
  "Einspeisevergütung": "Export credit",
  "Grundpreis pro Tag": "Daily charge",
  "Tag": "day",
  "Nettokosten": "Net cost",
  "Bezug + Grundpreis − Vergütung": "Import + daily charge − export credit",
  "PV · entgangene Einspeisevergütung": "Solar · forgone export credit",
  "Separater Vergleichswert": "Shown for comparison",
  "PV-Ertrag heute": "Solar production today",
  "Netzbezug heute": "Grid import today",
  "Stromkosten heute": "Electricity cost today",
  "Leistung heute": "Power today",
  "Tagesbilanz · ≈ Näherungswert": "Daily balance · ≈ estimate",
  "Stromkosten heute · Aufschlüsselung": "Electricity cost today · breakdown",
  "Energiezähler": "Energy meters",
  "Kumulative Zähler in Wh, kWh oder MWh. Verwende getrennte, aufwärts zählende Werte für Netzbezug, Einspeisung, Batterieladung und Batterieentladung. Daraus entstehen Tagesbilanz und Stromkosten.": "Cumulative meters in Wh, kWh or MWh. Use separate increasing totals for grid import, grid export, battery charge and battery discharge. These drive the daily balance and electricity cost.",
  "Der aktuelle Füllstand in Prozent und sein Tagesverlauf.": "Current charge level in percent and its daily history.",
  "Momentanleistung": "Instantaneous power",
  "Aktuelle Leistung in W, kW oder MW, möglichst mit Recorder-Verlauf. Bei gerichteten Leistungen muss das Vorzeichen stimmen.": "Current power in W, kW or MW, ideally with Recorder history. Use the correct sign for bidirectional power.",
  "<strong>Netz:</strong> Bezug positiv (+), Einspeisung negativ (−). ": "<strong>Grid:</strong> Import is positive (+), export is negative (−). ",
  "<strong>Batterie:</strong> Entladung ins Haus positiv (+), Ladung negativ (−). ": "<strong>Battery:</strong> Discharge to the home is positive (+), charging is negative (−). ",
  "<strong>PV, Haus und Ladepunkt:</strong> Erzeugung bzw. Verbrauch positiv (+).": "<strong>Solar, home and EV charger:</strong> Generation or consumption is positive (+).",
  "Solarprognose": "Solar forecast",
  "Optional. Zeigt die erwartete PV-Leistung für den Tag als Fläche.": "Optional. Shows expected solar power for the day as a shaded area.",
  "Forecast.Solar-Installation (optional)": "Forecast.Solar installation (optional)",
  "Stromtarif": "Electricity tariff",
  "Preise und Tarifzeiten für die tägliche Kostenschätzung. Für einen Einheitstarif wähle dieselbe Start- und Endzeit. Setze nicht benötigte Preise auf 0.": "Rates and times for the daily cost estimate. Use the same start and end time for a flat rate. Enter 0 for any unused rate.",
  "Keine Prognose": "No forecast",
  "Forecast.Solar-Auswahl nicht verfügbar": "Forecast.Solar selection unavailable"
};
  function cardLanguage(hass) {
    var language = hass && hass.language || 'en';
    return /^de(?:[-_]|$)/i.test(language) ? 'de-DE' : 'en';
  }
  function translator(locale) {
    return function (text) { return locale === 'de-DE' ? text : english[text] || text; };
  }
  function numberFormatter(locale) {
    return function (number, decimals) {
      return Number.isFinite(number) ? number.toLocaleString(locale, {
        minimumFractionDigits: decimals, maximumFractionDigits: decimals
      }) : '–';
    };
  }
  var previewSvg = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"800\" height=\"760\" viewBox=\"0 0 800 760\" role=\"img\" aria-labelledby=\"title\"><title id=\"title\">Energiedashboard mit Beispieldaten</title><style>text{font-family:system-ui,sans-serif;fill:#e9edf4;font-size:15px}.panel{fill:#1b222d;stroke:#313b48}.heading{font-weight:600}.value{font-size:27px;font-weight:650}.sub{fill:#aeb9c8;font-size:12px}.guide{stroke:#333f50}.zero{stroke:#6f7e91}</style><rect width=\"800\" height=\"760\" rx=\"14\" fill=\"#121821\"/><text x=\"20\" y=\"34\" class=\"heading\">Daily Energy Dashboard</text><text x=\"680\" y=\"34\" class=\"sub\">Beispieldaten</text><rect x=\"18\" y=\"50\" width=\"378\" height=\"90\" rx=\"10\" class=\"panel\"/><text x=\"30\" y=\"73\" class=\"heading\">PV-Ertrag heute</text><text x=\"30\" y=\"104\" class=\"value\">9,60 kWh</text><svg x=\"27\" y=\"111\" width=\"360\" height=\"22\" aria-hidden=\"true\" viewBox=\"0 0 640 44\" preserveAspectRatio=\"none\"><path d=\"M0.00 44.00L4.44 44.00L8.89 44.00L13.33 44.00L17.78 43.99L22.22 43.99L26.67 43.98L31.11 43.97L35.56 43.96L40.00 43.95L44.44 43.93L48.89 43.91L53.33 43.88L57.78 43.85L62.22 43.82L66.67 43.78L71.11 43.74L75.56 43.70L80.00 43.65L84.44 43.59L88.89 43.53L93.33 43.47L97.78 43.39L102.22 43.32L106.67 43.23L111.11 43.15L115.56 43.05L120.00 42.95L124.44 42.84L128.89 42.72L133.33 42.60L137.78 42.47L142.22 42.34L146.67 42.19L151.11 42.04L155.56 41.88L160.00 41.71L164.44 41.54L168.89 41.35L173.33 41.16L177.78 40.96L182.22 40.75L186.67 40.53L191.11 40.30L195.56 40.07L200.00 39.82L204.44 39.57L208.89 39.30L213.33 39.03L217.78 38.74L222.22 38.45L226.67 38.14L231.11 37.83L235.56 37.50L240.00 37.16L244.44 36.82L248.89 36.46L253.33 36.09L257.78 35.71L262.22 35.32L266.67 34.91L271.11 34.50L275.56 34.07L280.00 33.63L284.44 33.18L288.89 32.72L293.33 32.25L297.78 31.76L302.22 31.26L306.67 30.75L311.11 30.22L315.56 29.68L320.00 29.13L324.44 28.57L328.89 27.99L333.33 27.40L337.78 26.80L342.22 26.18L346.67 25.55L351.11 24.90L355.56 24.24L360.00 23.57L364.44 22.88L364.44444444444446 44L0 44Z\" fill=\"#fade2a\" opacity=\".23\"/><path d=\"M0.00 44.00L4.44 44.00L8.89 44.00L13.33 44.00L17.78 43.99L22.22 43.99L26.67 43.98L31.11 43.97L35.56 43.96L40.00 43.95L44.44 43.93L48.89 43.91L53.33 43.88L57.78 43.85L62.22 43.82L66.67 43.78L71.11 43.74L75.56 43.70L80.00 43.65L84.44 43.59L88.89 43.53L93.33 43.47L97.78 43.39L102.22 43.32L106.67 43.23L111.11 43.15L115.56 43.05L120.00 42.95L124.44 42.84L128.89 42.72L133.33 42.60L137.78 42.47L142.22 42.34L146.67 42.19L151.11 42.04L155.56 41.88L160.00 41.71L164.44 41.54L168.89 41.35L173.33 41.16L177.78 40.96L182.22 40.75L186.67 40.53L191.11 40.30L195.56 40.07L200.00 39.82L204.44 39.57L208.89 39.30L213.33 39.03L217.78 38.74L222.22 38.45L226.67 38.14L231.11 37.83L235.56 37.50L240.00 37.16L244.44 36.82L248.89 36.46L253.33 36.09L257.78 35.71L262.22 35.32L266.67 34.91L271.11 34.50L275.56 34.07L280.00 33.63L284.44 33.18L288.89 32.72L293.33 32.25L297.78 31.76L302.22 31.26L306.67 30.75L311.11 30.22L315.56 29.68L320.00 29.13L324.44 28.57L328.89 27.99L333.33 27.40L337.78 26.80L342.22 26.18L346.67 25.55L351.11 24.90L355.56 24.24L360.00 23.57L364.44 22.88\" fill=\"none\" stroke=\"#fade2a\" stroke-width=\"1.6\" vector-effect=\"non-scaling-stroke\"/></svg><rect x=\"404\" y=\"50\" width=\"378\" height=\"90\" rx=\"10\" class=\"panel\"/><text x=\"416\" y=\"73\" class=\"heading\">Netzbezug heute</text><text x=\"416\" y=\"104\" class=\"value\">6,42 kWh</text><svg x=\"413\" y=\"111\" width=\"360\" height=\"22\" aria-hidden=\"true\" viewBox=\"0 0 640 44\" preserveAspectRatio=\"none\"><path d=\"M0.00 44.00L4.44 43.93L8.89 43.84L13.33 43.73L17.78 43.62L22.22 43.51L26.67 43.39L31.11 43.26L35.56 43.13L40.00 43.00L44.44 42.87L48.89 42.73L53.33 42.59L57.78 42.45L62.22 42.31L66.67 42.16L71.11 42.01L75.56 41.86L80.00 41.71L84.44 41.56L88.89 41.40L93.33 41.25L97.78 41.09L102.22 40.93L106.67 40.77L111.11 40.60L115.56 40.44L120.00 40.28L124.44 40.11L128.89 39.94L133.33 39.77L137.78 39.60L142.22 39.43L146.67 39.26L151.11 39.09L155.56 38.92L160.00 38.74L164.44 38.56L168.89 38.39L173.33 38.21L177.78 38.03L182.22 37.85L186.67 37.67L191.11 37.49L195.56 37.31L200.00 37.13L204.44 36.94L208.89 36.76L213.33 36.57L217.78 36.39L222.22 36.20L226.67 36.01L231.11 35.82L235.56 35.63L240.00 35.44L244.44 35.25L248.89 35.06L253.33 34.87L257.78 34.68L262.22 34.49L266.67 34.29L271.11 34.10L275.56 33.90L280.00 33.71L284.44 33.51L288.89 33.31L293.33 33.11L297.78 32.92L302.22 32.72L306.67 32.52L311.11 32.32L315.56 32.12L320.00 31.92L324.44 31.72L328.89 31.51L333.33 31.31L337.78 31.11L342.22 30.90L346.67 30.70L351.11 30.49L355.56 30.29L360.00 30.08L364.44 29.88L364.44444444444446 44L0 44Z\" fill=\"#f2495c\" opacity=\".23\"/><path d=\"M0.00 44.00L4.44 43.93L8.89 43.84L13.33 43.73L17.78 43.62L22.22 43.51L26.67 43.39L31.11 43.26L35.56 43.13L40.00 43.00L44.44 42.87L48.89 42.73L53.33 42.59L57.78 42.45L62.22 42.31L66.67 42.16L71.11 42.01L75.56 41.86L80.00 41.71L84.44 41.56L88.89 41.40L93.33 41.25L97.78 41.09L102.22 40.93L106.67 40.77L111.11 40.60L115.56 40.44L120.00 40.28L124.44 40.11L128.89 39.94L133.33 39.77L137.78 39.60L142.22 39.43L146.67 39.26L151.11 39.09L155.56 38.92L160.00 38.74L164.44 38.56L168.89 38.39L173.33 38.21L177.78 38.03L182.22 37.85L186.67 37.67L191.11 37.49L195.56 37.31L200.00 37.13L204.44 36.94L208.89 36.76L213.33 36.57L217.78 36.39L222.22 36.20L226.67 36.01L231.11 35.82L235.56 35.63L240.00 35.44L244.44 35.25L248.89 35.06L253.33 34.87L257.78 34.68L262.22 34.49L266.67 34.29L271.11 34.10L275.56 33.90L280.00 33.71L284.44 33.51L288.89 33.31L293.33 33.11L297.78 32.92L302.22 32.72L306.67 32.52L311.11 32.32L315.56 32.12L320.00 31.92L324.44 31.72L328.89 31.51L333.33 31.31L337.78 31.11L342.22 30.90L346.67 30.70L351.11 30.49L355.56 30.29L360.00 30.08L364.44 29.88\" fill=\"none\" stroke=\"#f2495c\" stroke-width=\"1.6\" vector-effect=\"non-scaling-stroke\"/></svg><rect x=\"18\" y=\"148\" width=\"378\" height=\"90\" rx=\"10\" class=\"panel\"/><text x=\"30\" y=\"171\" class=\"heading\">Batterieladezustand</text><text x=\"30\" y=\"202\" class=\"value\">76 %</text><svg x=\"27\" y=\"209\" width=\"360\" height=\"22\" aria-hidden=\"true\" viewBox=\"0 0 640 44\" preserveAspectRatio=\"none\"><path d=\"M0.00 31.68L4.44 31.37L8.89 31.06L13.33 30.75L17.78 30.44L22.22 30.13L26.67 29.82L31.11 29.51L35.56 29.20L40.00 28.88L44.44 28.57L48.89 28.26L53.33 27.95L57.78 27.64L62.22 27.33L66.67 27.02L71.11 26.71L75.56 26.40L80.00 26.09L84.44 25.78L88.89 25.47L93.33 25.16L97.78 24.85L102.22 24.54L106.67 24.23L111.11 23.92L115.56 23.60L120.00 23.29L124.44 22.98L128.89 22.67L133.33 22.36L137.78 22.05L142.22 21.74L146.67 21.43L151.11 21.12L155.56 20.81L160.00 20.50L164.44 20.19L168.89 19.88L173.33 19.57L177.78 19.26L182.22 18.95L186.67 18.64L191.11 18.32L195.56 18.01L200.00 17.70L204.44 17.39L208.89 17.08L213.33 16.77L217.78 16.46L222.22 16.15L226.67 15.84L231.11 15.53L235.56 15.22L240.00 14.91L244.44 14.60L248.89 14.29L253.33 13.98L257.78 13.67L262.22 13.36L266.67 13.04L271.11 12.73L275.56 12.42L280.00 12.11L284.44 11.80L288.89 11.49L293.33 11.18L297.78 10.87L302.22 10.56L306.67 10.56L311.11 10.56L315.56 10.56L320.00 10.56L324.44 10.56L328.89 10.56L333.33 10.56L337.78 10.56L342.22 10.56L346.67 10.56L351.11 10.56L355.56 10.56L360.00 10.56L364.44 10.56L364.44444444444446 44L0 44Z\" fill=\"#73bf69\" opacity=\".23\"/><path d=\"M0.00 31.68L4.44 31.37L8.89 31.06L13.33 30.75L17.78 30.44L22.22 30.13L26.67 29.82L31.11 29.51L35.56 29.20L40.00 28.88L44.44 28.57L48.89 28.26L53.33 27.95L57.78 27.64L62.22 27.33L66.67 27.02L71.11 26.71L75.56 26.40L80.00 26.09L84.44 25.78L88.89 25.47L93.33 25.16L97.78 24.85L102.22 24.54L106.67 24.23L111.11 23.92L115.56 23.60L120.00 23.29L124.44 22.98L128.89 22.67L133.33 22.36L137.78 22.05L142.22 21.74L146.67 21.43L151.11 21.12L155.56 20.81L160.00 20.50L164.44 20.19L168.89 19.88L173.33 19.57L177.78 19.26L182.22 18.95L186.67 18.64L191.11 18.32L195.56 18.01L200.00 17.70L204.44 17.39L208.89 17.08L213.33 16.77L217.78 16.46L222.22 16.15L226.67 15.84L231.11 15.53L235.56 15.22L240.00 14.91L244.44 14.60L248.89 14.29L253.33 13.98L257.78 13.67L262.22 13.36L266.67 13.04L271.11 12.73L275.56 12.42L280.00 12.11L284.44 11.80L288.89 11.49L293.33 11.18L297.78 10.87L302.22 10.56L306.67 10.56L311.11 10.56L315.56 10.56L320.00 10.56L324.44 10.56L328.89 10.56L333.33 10.56L337.78 10.56L342.22 10.56L346.67 10.56L351.11 10.56L355.56 10.56L360.00 10.56L364.44 10.56\" fill=\"none\" stroke=\"#73bf69\" stroke-width=\"1.6\" vector-effect=\"non-scaling-stroke\"/></svg><rect x=\"404\" y=\"148\" width=\"378\" height=\"90\" rx=\"10\" class=\"panel\"/><text x=\"416\" y=\"171\" class=\"heading\">Stromkosten heute</text><text x=\"416\" y=\"202\" class=\"value\">≈ 2,26 €</text><svg x=\"413\" y=\"209\" width=\"360\" height=\"22\" aria-hidden=\"true\" viewBox=\"0 0 640 44\" preserveAspectRatio=\"none\"><path d=\"M0.00 42.46L4.44 42.45L4.44 42.45L8.89 42.43L8.89 42.43L13.33 42.41L13.33 42.41L17.78 42.39L17.78 42.39L22.22 42.37L22.22 42.37L26.67 42.35L26.67 42.35L31.11 42.32L31.11 42.33L35.56 42.30L35.56 42.30L40.00 42.28L40.00 42.28L44.44 42.25L44.44 42.26L48.89 42.23L48.89 42.23L53.33 42.20L53.33 42.21L57.78 42.18L57.78 42.18L62.22 42.15L62.22 42.15L66.67 42.13L66.67 42.13L71.11 42.10L71.11 42.10L75.56 42.07L75.56 42.07L80.00 42.04L80.00 42.05L84.44 42.02L84.44 42.02L88.89 41.99L88.89 41.99L93.33 41.96L93.33 41.96L97.78 41.93L97.78 41.93L102.22 41.90L102.22 41.91L106.67 41.87L106.67 41.88L111.11 41.84L111.11 41.85L115.56 41.82L115.56 41.82L120.00 41.79L120.00 41.79L124.44 41.76L124.44 41.76L128.89 41.73L128.89 41.73L133.33 41.69L133.33 41.70L137.78 41.65L137.78 41.65L142.22 41.60L142.22 41.60L146.67 41.55L146.67 41.55L151.11 41.50L151.11 41.50L155.56 41.45L155.56 41.45L160.00 41.39L160.00 41.40L164.44 41.34L164.44 41.35L168.89 41.29L168.89 41.30L173.33 41.24L173.33 41.24L177.78 41.19L177.78 41.19L182.22 41.14L182.22 41.14L186.67 41.08L186.67 41.09L191.11 41.03L191.11 41.04L195.56 40.98L195.56 40.98L200.00 40.93L200.00 40.93L204.44 40.87L204.44 40.88L208.89 40.82L208.89 40.82L213.33 40.76L213.33 40.77L217.78 40.71L217.78 40.71L222.22 40.66L222.22 40.66L226.67 40.60L226.67 40.61L231.11 40.55L231.11 40.55L235.56 40.49L235.56 40.50L240.00 40.44L240.00 40.44L244.44 40.38L244.44 40.39L248.89 40.33L248.89 40.33L253.33 40.27L253.33 40.27L257.78 40.21L257.78 40.22L262.22 40.16L262.22 40.16L266.67 40.10L266.67 40.11L271.11 40.05L271.11 40.05L275.56 39.99L275.56 39.99L280.00 39.93L280.00 39.94L284.44 39.88L284.44 39.88L288.89 39.82L288.89 39.82L293.33 39.76L293.33 39.76L297.78 39.70L297.78 39.71L302.22 39.65L302.22 39.65L306.67 39.59L306.67 39.59L311.11 39.53L311.11 39.53L315.56 39.47L315.56 39.48L320.00 39.41L320.00 39.42L324.44 39.35L324.44 39.36L328.89 39.30L328.89 39.30L333.33 39.24L333.33 39.24L337.78 39.18L337.78 39.18L342.22 39.12L342.22 39.12L346.67 39.06L346.67 39.06L351.11 39.00L351.11 39.00L355.56 38.94L355.56 38.94L360.00 38.88L360.00 38.88L364.44 38.82L364.44 38.82L364.44444444444446 44L0 44Z\" fill=\"#ff9830\" opacity=\".23\"/><path d=\"M0.00 42.46L4.44 42.45L4.44 42.45L8.89 42.43L8.89 42.43L13.33 42.41L13.33 42.41L17.78 42.39L17.78 42.39L22.22 42.37L22.22 42.37L26.67 42.35L26.67 42.35L31.11 42.32L31.11 42.33L35.56 42.30L35.56 42.30L40.00 42.28L40.00 42.28L44.44 42.25L44.44 42.26L48.89 42.23L48.89 42.23L53.33 42.20L53.33 42.21L57.78 42.18L57.78 42.18L62.22 42.15L62.22 42.15L66.67 42.13L66.67 42.13L71.11 42.10L71.11 42.10L75.56 42.07L75.56 42.07L80.00 42.04L80.00 42.05L84.44 42.02L84.44 42.02L88.89 41.99L88.89 41.99L93.33 41.96L93.33 41.96L97.78 41.93L97.78 41.93L102.22 41.90L102.22 41.91L106.67 41.87L106.67 41.88L111.11 41.84L111.11 41.85L115.56 41.82L115.56 41.82L120.00 41.79L120.00 41.79L124.44 41.76L124.44 41.76L128.89 41.73L128.89 41.73L133.33 41.69L133.33 41.70L137.78 41.65L137.78 41.65L142.22 41.60L142.22 41.60L146.67 41.55L146.67 41.55L151.11 41.50L151.11 41.50L155.56 41.45L155.56 41.45L160.00 41.39L160.00 41.40L164.44 41.34L164.44 41.35L168.89 41.29L168.89 41.30L173.33 41.24L173.33 41.24L177.78 41.19L177.78 41.19L182.22 41.14L182.22 41.14L186.67 41.08L186.67 41.09L191.11 41.03L191.11 41.04L195.56 40.98L195.56 40.98L200.00 40.93L200.00 40.93L204.44 40.87L204.44 40.88L208.89 40.82L208.89 40.82L213.33 40.76L213.33 40.77L217.78 40.71L217.78 40.71L222.22 40.66L222.22 40.66L226.67 40.60L226.67 40.61L231.11 40.55L231.11 40.55L235.56 40.49L235.56 40.50L240.00 40.44L240.00 40.44L244.44 40.38L244.44 40.39L248.89 40.33L248.89 40.33L253.33 40.27L253.33 40.27L257.78 40.21L257.78 40.22L262.22 40.16L262.22 40.16L266.67 40.10L266.67 40.11L271.11 40.05L271.11 40.05L275.56 39.99L275.56 39.99L280.00 39.93L280.00 39.94L284.44 39.88L284.44 39.88L288.89 39.82L288.89 39.82L293.33 39.76L293.33 39.76L297.78 39.70L297.78 39.71L302.22 39.65L302.22 39.65L306.67 39.59L306.67 39.59L311.11 39.53L311.11 39.53L315.56 39.47L315.56 39.48L320.00 39.41L320.00 39.42L324.44 39.35L324.44 39.36L328.89 39.30L328.89 39.30L333.33 39.24L333.33 39.24L337.78 39.18L337.78 39.18L342.22 39.12L342.22 39.12L346.67 39.06L346.67 39.06L351.11 39.00L351.11 39.00L355.56 38.94L355.56 38.94L360.00 38.88L360.00 38.88L364.44 38.82L364.44 38.82\" fill=\"none\" stroke=\"#ff9830\" stroke-width=\"1.6\" vector-effect=\"non-scaling-stroke\"/></svg><rect x=\"18\" y=\"246\" width=\"764\" height=\"306\" rx=\"10\" class=\"panel\"/><text x=\"30\" y=\"272\" class=\"heading\">Leistung heute</text><svg x=\"69\" y=\"286\" width=\"692\" height=\"213\" aria-hidden=\"true\" viewBox=\"0 0 640 220\" preserveAspectRatio=\"none\"><line class=\"guide\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"220\" vector-effect=\"non-scaling-stroke\"/><line class=\"guide\" x1=\"26.666666666666668\" y1=\"0\" x2=\"26.666666666666668\" y2=\"220\" vector-effect=\"non-scaling-stroke\"/><line class=\"guide\" x1=\"53.333333333333336\" y1=\"0\" x2=\"53.333333333333336\" y2=\"220\" vector-effect=\"non-scaling-stroke\"/><line class=\"guide\" x1=\"80\" y1=\"0\" x2=\"80\" y2=\"220\" vector-effect=\"non-scaling-stroke\"/><line class=\"guide\" x1=\"106.66666666666667\" y1=\"0\" x2=\"106.66666666666667\" y2=\"220\" vector-effect=\"non-scaling-stroke\"/><line class=\"guide\" x1=\"133.33333333333334\" y1=\"0\" x2=\"133.33333333333334\" y2=\"220\" vector-effect=\"non-scaling-stroke\"/><line class=\"guide\" x1=\"160\" y1=\"0\" x2=\"160\" y2=\"220\" vector-effect=\"non-scaling-stroke\"/><line class=\"guide\" x1=\"186.66666666666666\" y1=\"0\" x2=\"186.66666666666666\" y2=\"220\" vector-effect=\"non-scaling-stroke\"/><line class=\"guide\" x1=\"213.33333333333334\" y1=\"0\" x2=\"213.33333333333334\" y2=\"220\" vector-effect=\"non-scaling-stroke\"/><line class=\"guide\" x1=\"240\" y1=\"0\" x2=\"240\" y2=\"220\" vector-effect=\"non-scaling-stroke\"/><line class=\"guide\" x1=\"266.6666666666667\" y1=\"0\" x2=\"266.6666666666667\" y2=\"220\" vector-effect=\"non-scaling-stroke\"/><line class=\"guide\" x1=\"293.3333333333333\" y1=\"0\" x2=\"293.3333333333333\" y2=\"220\" vector-effect=\"non-scaling-stroke\"/><line class=\"guide\" x1=\"320\" y1=\"0\" x2=\"320\" y2=\"220\" vector-effect=\"non-scaling-stroke\"/><line class=\"guide\" x1=\"346.6666666666667\" y1=\"0\" x2=\"346.6666666666667\" y2=\"220\" vector-effect=\"non-scaling-stroke\"/><line class=\"guide\" x1=\"373.3333333333333\" y1=\"0\" x2=\"373.3333333333333\" y2=\"220\" vector-effect=\"non-scaling-stroke\"/><line class=\"guide\" x1=\"400\" y1=\"0\" x2=\"400\" y2=\"220\" vector-effect=\"non-scaling-stroke\"/><line class=\"guide\" x1=\"426.6666666666667\" y1=\"0\" x2=\"426.6666666666667\" y2=\"220\" vector-effect=\"non-scaling-stroke\"/><line class=\"guide\" x1=\"453.3333333333333\" y1=\"0\" x2=\"453.3333333333333\" y2=\"220\" vector-effect=\"non-scaling-stroke\"/><line class=\"guide\" x1=\"480\" y1=\"0\" x2=\"480\" y2=\"220\" vector-effect=\"non-scaling-stroke\"/><line class=\"guide\" x1=\"506.6666666666667\" y1=\"0\" x2=\"506.6666666666667\" y2=\"220\" vector-effect=\"non-scaling-stroke\"/><line class=\"guide\" x1=\"533.3333333333334\" y1=\"0\" x2=\"533.3333333333334\" y2=\"220\" vector-effect=\"non-scaling-stroke\"/><line class=\"guide\" x1=\"560\" y1=\"0\" x2=\"560\" y2=\"220\" vector-effect=\"non-scaling-stroke\"/><line class=\"guide\" x1=\"586.6666666666666\" y1=\"0\" x2=\"586.6666666666666\" y2=\"220\" vector-effect=\"non-scaling-stroke\"/><line class=\"guide\" x1=\"613.3333333333334\" y1=\"0\" x2=\"613.3333333333334\" y2=\"220\" vector-effect=\"non-scaling-stroke\"/><line class=\"guide\" x1=\"640\" y1=\"0\" x2=\"640\" y2=\"220\" vector-effect=\"non-scaling-stroke\"/><line class=\"guide\" x1=\"0\" y1=\"220\" x2=\"640\" y2=\"220\" vector-effect=\"non-scaling-stroke\"/><line class=\"guide\" x1=\"0\" y1=\"200\" x2=\"640\" y2=\"200\" vector-effect=\"non-scaling-stroke\"/><line class=\"guide\" x1=\"0\" y1=\"180\" x2=\"640\" y2=\"180\" vector-effect=\"non-scaling-stroke\"/><line class=\"guide\" x1=\"0\" y1=\"160\" x2=\"640\" y2=\"160\" vector-effect=\"non-scaling-stroke\"/><line class=\"zero\" x1=\"0\" y1=\"140\" x2=\"640\" y2=\"140\" vector-effect=\"non-scaling-stroke\"/><line class=\"guide\" x1=\"0\" y1=\"120\" x2=\"640\" y2=\"120\" vector-effect=\"non-scaling-stroke\"/><line class=\"guide\" x1=\"0\" y1=\"100.00000000000001\" x2=\"640\" y2=\"100.00000000000001\" vector-effect=\"non-scaling-stroke\"/><line class=\"guide\" x1=\"0\" y1=\"80\" x2=\"640\" y2=\"80\" vector-effect=\"non-scaling-stroke\"/><line class=\"guide\" x1=\"0\" y1=\"60\" x2=\"640\" y2=\"60\" vector-effect=\"non-scaling-stroke\"/><line class=\"guide\" x1=\"0\" y1=\"40\" x2=\"640\" y2=\"40\" vector-effect=\"non-scaling-stroke\"/><line class=\"guide\" x1=\"0\" y1=\"20\" x2=\"640\" y2=\"20\" vector-effect=\"non-scaling-stroke\"/><line class=\"guide\" x1=\"0\" y1=\"0\" x2=\"640\" y2=\"0\" vector-effect=\"non-scaling-stroke\"/><path d=\"M0.00 140.00L4.44 140.00L8.89 140.00L13.33 140.00L17.78 140.00L22.22 140.00L26.67 140.00L31.11 140.00L35.56 140.00L40.00 140.00L44.44 140.00L48.89 140.00L53.33 140.00L57.78 140.00L62.22 140.00L66.67 140.00L71.11 140.00L75.56 140.00L80.00 140.00L84.44 140.00L88.89 140.00L93.33 140.00L97.78 140.00L102.22 140.00L106.67 140.00L111.11 140.00L115.56 140.00L120.00 140.00L124.44 140.00L128.89 140.00L133.33 140.00L137.78 140.00L142.22 140.00L146.67 140.00L151.11 140.00L155.56 140.00L160.00 140.00L164.44 136.39L168.89 130.31L173.33 126.15L177.78 125.51L182.22 115.30L186.67 113.48L191.11 114.44L195.56 100.17L200.00 102.17L204.44 103.08L208.89 85.42L213.33 92.31L217.78 91.39L222.22 71.60L226.67 83.84L231.11 79.45L235.56 59.21L240.00 76.63L244.44 67.45L248.89 48.68L253.33 70.48L257.78 55.68L262.22 40.34L266.67 65.16L271.11 44.51L275.56 34.38L280.00 60.45L284.44 34.37L288.89 30.85L293.33 56.19L297.78 25.73L302.22 29.67L306.67 52.31L311.11 19.02L315.56 30.63L320.00 48.80L324.44 14.61L328.89 33.43L333.33 45.79L337.78 12.78L342.22 37.73L346.67 43.47L351.11 13.68L355.56 43.16L360.00 42.12L364.44 17.31\" fill=\"none\" stroke=\"#fade2a\" stroke-width=\"1.6\" vector-effect=\"non-scaling-stroke\"/><path d=\"M0.00 123.20L4.44 123.15L8.89 117.81L13.33 91.98L17.78 92.46L22.22 118.10L26.67 123.16L31.11 123.20L35.56 123.14L40.00 117.52L44.44 91.52L48.89 92.95L53.33 118.37L57.78 123.16L62.22 123.20L66.67 123.14L71.11 117.22L75.56 91.06L80.00 93.44L84.44 118.63L88.89 123.17L93.33 123.20L97.78 123.13L102.22 116.90L106.67 90.62L111.11 93.95L115.56 118.88L120.00 123.17L124.44 123.20L128.89 123.12L133.33 116.58L137.78 90.20L142.22 94.47L146.67 119.12L151.11 123.18L155.56 123.20L160.00 123.11L164.44 116.24L168.89 89.78L173.33 94.99L177.78 119.36L182.22 123.18L186.67 123.20L191.11 123.09L195.56 115.90L200.00 89.38L204.44 95.52L208.89 119.58L213.33 123.18L217.78 123.20L222.22 123.08L226.67 115.54L231.11 89.00L235.56 96.06L240.00 119.79L244.44 123.19L248.89 123.20L253.33 123.06L257.78 115.18L262.22 88.63L266.67 96.60L271.11 120.00L275.56 123.19L280.00 123.20L284.44 123.05L288.89 114.80L293.33 88.28L297.78 97.15L302.22 120.19L306.67 123.19L311.11 123.20L315.56 123.03L320.00 114.41L324.44 87.95L328.89 97.71L333.33 120.38L337.78 123.19L342.22 123.20L346.67 123.01L351.11 114.01L355.56 87.63L360.00 98.26L364.44 120.55\" fill=\"none\" stroke=\"#3274d9\" stroke-width=\"1.6\" vector-effect=\"non-scaling-stroke\"/><path d=\"M0.00 64.00L4.44 65.81L8.89 67.62L13.33 69.43L17.78 71.24L22.22 73.05L26.67 74.86L31.11 76.67L35.56 78.48L40.00 80.29L44.44 82.10L48.89 83.90L53.33 85.71L57.78 87.52L62.22 89.33L66.67 91.14L71.11 92.95L75.56 94.76L80.00 96.57L84.44 98.38L88.89 100.19L93.33 102.00L97.78 103.81L102.22 105.62L106.67 107.43L111.11 109.24L115.56 111.05L120.00 112.86L124.44 114.67L128.89 116.48L133.33 118.29L137.78 120.10L142.22 121.90L146.67 123.71L151.11 125.52L155.56 127.33L160.00 129.14L164.44 130.95L168.89 132.76L173.33 134.57L177.78 136.38L182.22 138.19L186.67 140.00L191.11 140.00L195.56 140.00L200.00 140.00L204.44 140.00L208.89 140.00L213.33 140.00L217.78 143.24L222.22 146.48L226.67 149.70L231.11 152.89L235.56 156.05L240.00 159.16L244.44 162.22L248.89 165.22L253.33 168.15L257.78 171.00L262.22 173.77L266.67 176.44L271.11 179.02L275.56 181.49L280.00 183.84L284.44 186.07L288.89 188.18L293.33 190.16L297.78 192.00L302.22 193.69L306.67 195.24L311.11 196.64L315.56 197.88L320.00 198.97L324.44 199.89L328.89 200.65L333.33 201.24L337.78 201.66L342.22 201.92L346.67 202.00L351.11 201.92L355.56 201.66L360.00 201.24L364.44 200.65\" fill=\"none\" stroke=\"#f2495c\" stroke-width=\"1.6\" vector-effect=\"non-scaling-stroke\"/><path d=\"M0.00 174.00L4.44 174.00L8.89 174.00L13.33 174.00L17.78 174.00L22.22 174.00L26.67 174.00L31.11 174.00L35.56 174.00L40.00 174.00L44.44 174.00L48.89 174.00L53.33 174.00L57.78 174.00L62.22 174.00L66.67 174.00L71.11 174.00L75.56 174.00L80.00 174.00L84.44 174.00L88.89 174.00L93.33 174.00L97.78 174.00L102.22 174.00L106.67 174.00L111.11 174.00L115.56 174.00L120.00 174.00L124.44 174.00L128.89 174.00L133.33 122.00L137.78 122.00L142.22 122.00L146.67 122.00L151.11 122.00L155.56 122.00L160.00 122.00L164.44 122.00L168.89 122.00L173.33 122.00L177.78 122.00L182.22 122.00L186.67 122.00L191.11 122.00L195.56 122.00L200.00 122.00L204.44 122.00L208.89 122.00L213.33 130.00L217.78 130.00L222.22 130.00L226.67 130.00L231.11 130.00L235.56 130.00L240.00 130.00L244.44 130.00L248.89 130.00L253.33 130.00L257.78 130.00L262.22 130.00L266.67 130.00L271.11 130.00L275.56 130.00L280.00 130.00L284.44 130.00L288.89 130.00L293.33 130.00L297.78 130.00L302.22 130.00L306.67 130.00L311.11 130.00L315.56 130.00L320.00 130.00L324.44 130.00L328.89 130.00L333.33 130.00L337.78 130.00L342.22 130.00L346.67 130.00L351.11 130.00L355.56 130.00L360.00 130.00L364.44 130.00\" fill=\"none\" stroke=\"#73bf69\" stroke-width=\"1.6\" vector-effect=\"non-scaling-stroke\"/><path d=\"M0.00 140.00L4.44 140.00L8.89 140.00L13.33 140.00L17.78 140.00L22.22 140.00L26.67 140.00L31.11 76.00L35.56 76.00L40.00 76.00L44.44 76.00L48.89 76.00L53.33 76.00L57.78 76.00L62.22 76.00L66.67 76.00L71.11 76.00L75.56 76.00L80.00 76.00L84.44 76.00L88.89 76.00L93.33 76.00L97.78 76.00L102.22 76.00L106.67 140.00L111.11 140.00L115.56 140.00L120.00 140.00L124.44 140.00L128.89 140.00L133.33 140.00L137.78 140.00L142.22 140.00L146.67 140.00L151.11 140.00L155.56 140.00L160.00 140.00L164.44 140.00L168.89 140.00L173.33 140.00L177.78 140.00L182.22 140.00L186.67 140.00L191.11 140.00L195.56 140.00L200.00 140.00L204.44 140.00L208.89 140.00L213.33 140.00L217.78 140.00L222.22 140.00L226.67 140.00L231.11 140.00L235.56 140.00L240.00 140.00L244.44 140.00L248.89 140.00L253.33 140.00L257.78 140.00L262.22 140.00L266.67 140.00L271.11 140.00L275.56 140.00L280.00 140.00L284.44 140.00L288.89 140.00L293.33 140.00L297.78 140.00L302.22 140.00L306.67 140.00L311.11 140.00L315.56 140.00L320.00 140.00L324.44 140.00L328.89 140.00L333.33 140.00L337.78 140.00L342.22 140.00L346.67 140.00L351.11 140.00L355.56 140.00L360.00 140.00L364.44 140.00\" fill=\"none\" stroke=\"#8ab8ff\" stroke-width=\"1.6\" vector-effect=\"non-scaling-stroke\"/><path d=\"M0.00 140.00L26.67 140.00L53.33 140.00L80.00 140.00L106.67 140.00L133.33 140.00L160.00 140.00L186.67 112.24L213.33 86.09L240.00 63.08L266.67 44.53L293.33 31.54L320.00 24.85L346.67 24.85L373.33 31.54L400.00 44.53L426.67 63.08L453.33 86.09L480.00 112.24L506.67 140.00L533.33 140.00L560.00 140.00L586.67 140.00L613.33 140.00L640.00 140.00L640 140L0 140Z\" fill=\"#fade2a\" opacity=\".23\"/></svg><text x=\"32\" y=\"292\" class=\"sub\">4 kW</text><text x=\"32\" y=\"362\" class=\"sub\">2 kW</text><text x=\"32\" y=\"432\" class=\"sub\">0 kW</text><text x=\"32\" y=\"502\" class=\"sub\">−2 kW</text><text x=\"57\" y=\"517\" class=\"sub\">00:00</text><text x=\"172\" y=\"517\" class=\"sub\">04:00</text><text x=\"287\" y=\"517\" class=\"sub\">08:00</text><text x=\"402\" y=\"517\" class=\"sub\">12:00</text><text x=\"517\" y=\"517\" class=\"sub\">16:00</text><text x=\"632\" y=\"517\" class=\"sub\">20:00</text><text x=\"747\" y=\"517\" class=\"sub\">24:00</text><rect x=\"32\" y=\"535\" width=\"12\" height=\"3\" rx=\"1\" fill=\"#fade2a\"/><text x=\"49\" y=\"540\" class=\"sub\">PV</text><rect x=\"151\" y=\"535\" width=\"12\" height=\"3\" rx=\"1\" fill=\"#3274d9\"/><text x=\"168\" y=\"540\" class=\"sub\">Haus</text><rect x=\"270\" y=\"535\" width=\"12\" height=\"3\" rx=\"1\" fill=\"#f2495c\"/><text x=\"287\" y=\"540\" class=\"sub\">Netz</text><rect x=\"389\" y=\"535\" width=\"12\" height=\"3\" rx=\"1\" fill=\"#73bf69\"/><text x=\"406\" y=\"540\" class=\"sub\">Batterie</text><rect x=\"508\" y=\"535\" width=\"12\" height=\"3\" rx=\"1\" fill=\"#8ab8ff\"/><text x=\"525\" y=\"540\" class=\"sub\">Ladepunkt</text><rect x=\"627\" y=\"535\" width=\"12\" height=\"3\" rx=\"1\" fill=\"#fade2a\"/><text x=\"644\" y=\"540\" class=\"sub\">PV-Prognose</text><rect x=\"18\" y=\"562\" width=\"764\" height=\"135\" rx=\"10\" class=\"panel\"/><text x=\"30\" y=\"590\" class=\"heading\">Tagesbilanz · ≈ Näherungswert</text><text x=\"30\" y=\"618\" class=\"\">Einspeisung</text><text x=\"255\" y=\"618\" class=\"sub\">≈ 1,58 kWh</text><text x=\"30\" y=\"644\" class=\"\">Eigenverbrauch</text><text x=\"255\" y=\"644\" class=\"sub\">≈ 83,5 %</text><text x=\"30\" y=\"670\" class=\"\">Autarkie</text><text x=\"255\" y=\"670\" class=\"sub\">≈ 50,1 %</text><text x=\"414\" y=\"618\" class=\"\">Batterieladung</text><text x=\"639\" y=\"618\" class=\"sub\">≈ 4,87 kWh</text><text x=\"414\" y=\"644\" class=\"\">Batterieentladung</text><text x=\"639\" y=\"644\" class=\"sub\">≈ 2,10 kWh</text><text x=\"414\" y=\"670\" class=\"\">Stand</text><text x=\"639\" y=\"670\" class=\"sub\">19.03. 13:40</text><rect x=\"18\" y=\"707\" width=\"764\" height=\"36\" rx=\"10\" class=\"panel\"/><text x=\"30\" y=\"730\" class=\"heading\">▸ Stromkosten heute · Aufschlüsselung</text></svg>";
  function previewImage(locale) {
    var svg = previewSvg;
    if (locale !== 'de-DE') {
      svg = svg.replace(/>([^<>]+)</g, function (match, label) {
        return '>' + (previewLabels[label] || label) + '<';
      });
    }
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }
  var previewLabels = {"PV-Ertrag gesamt": "Total solar production", "Netzbezug gesamt": "Total grid import", "Einspeisung gesamt": "Total grid export", "Batterieladung gesamt": "Total battery charge", "Batterieentladung gesamt": "Total battery discharge", "Batterieladezustand": "Battery state of charge", "PV-Leistung": "Solar power", "Hausleistung": "Home power", "Netzleistung": "Grid power", "Batterieleistung (optional)": "Battery power (optional)", "Ladeleistung (optional)": "EV charging power (optional)", "Nebentarif ab": "Off-peak starts", "Nebentarif bis": "Off-peak ends", "Nebentarif (ct/kWh)": "Off-peak price (ct/kWh)", "Standardtarif (ct/kWh)": "Standard price (ct/kWh)", "Einspeisevergütung (ct/kWh)": "Export credit (ct/kWh)", "Grundpreis (ct/Tag)": "Daily charge (ct/day)", "Energiedashboard mit Beispieldaten": "Energy dashboard with sample data", "Wähle eine Entität, um die Live-Vorschau zu laden.": "Select an entity to load the live preview.", "Verlaufsdaten konnten nicht geladen werden.": "Could not load history data.", "Haus": "Home", "Netz": "Grid", "Batterie": "Battery", "Ladepunkt": "EV charger", "PV-Prognose": "Solar forecast", "Leistungsverlauf. Pfeiltasten zeigen die Werte zur gewählten Uhrzeit.": "Power history. Use the arrow keys to view values at the selected time.", "Einspeisung": "Grid export", "Eigenverbrauch": "Self-consumption", "Autarkie": "Self-sufficiency", "Batterieladung": "Battery charge", "Batterieentladung": "Battery discharge", "Stand": "As of", "Tarifdaten im Karteneditor eintragen.": "Enter your tariff in the card editor.", "Posten": "Item", "Energie": "Energy", "Betrag": "Amount", "Tarif / Hinweis": "Rate / note", "Nebentarif": "Off-peak", "Standardtarif": "Standard rate", "Einspeisevergütung": "Export credit", "Grundpreis pro Tag": "Daily charge", "Tag": "day", "Nettokosten": "Net cost", "Bezug + Grundpreis − Vergütung": "Import + daily charge − export credit", "PV · entgangene Einspeisevergütung": "Solar · forgone export credit", "Separater Vergleichswert": "Shown for comparison", "PV-Ertrag heute": "Solar production today", "Netzbezug heute": "Grid import today", "Stromkosten heute": "Electricity cost today", "Leistung heute": "Power today", "Tagesbilanz · ≈ Näherungswert": "Daily balance · ≈ estimate", "Stromkosten heute · Aufschlüsselung": "Electricity cost today · breakdown", "Energiezähler": "Energy meters", "Kumulative Zähler in Wh, kWh oder MWh. Verwende getrennte, aufwärts zählende Werte für Netzbezug, Einspeisung, Batterieladung und Batterieentladung. Daraus entstehen Tagesbilanz und Stromkosten.": "Cumulative meters in Wh, kWh or MWh. Use separate increasing totals for grid import, grid export, battery charge and battery discharge. These drive the daily balance and electricity cost.", "Der aktuelle Füllstand in Prozent und sein Tagesverlauf.": "Current charge level in percent and its daily history.", "Momentanleistung": "Instantaneous power", "Aktuelle Leistung in W, kW oder MW, möglichst mit Recorder-Verlauf. Bei gerichteten Leistungen muss das Vorzeichen stimmen.": "Current power in W, kW or MW, ideally with Recorder history. Use the correct sign for bidirectional power.", "<strong>Netz:</strong> Bezug positiv (+), Einspeisung negativ (−). ": "<strong>Grid:</strong> Import is positive (+), export is negative (−). ", "<strong>Batterie:</strong> Entladung ins Haus positiv (+), Ladung negativ (−). ": "<strong>Battery:</strong> Discharge to the home is positive (+), charging is negative (−). ", "<strong>PV, Haus und Ladepunkt:</strong> Erzeugung bzw. Verbrauch positiv (+).": "<strong>Solar, home and EV charger:</strong> Generation or consumption is positive (+).", "Solarprognose": "Solar forecast", "Optional. Zeigt die erwartete PV-Leistung für den Tag als Fläche.": "Optional. Shows expected solar power for the day as a shaded area.", "Forecast.Solar-Installation (optional)": "Forecast.Solar installation (optional)", "Stromtarif": "Electricity tariff", "Preise und Tarifzeiten für die tägliche Kostenschätzung. Für einen Einheitstarif wähle dieselbe Start- und Endzeit. Setze nicht benötigte Preise auf 0.": "Rates and times for the daily cost estimate. Use the same start and end time for a flat rate. Enter 0 for any unused rate.", "Keine Prognose": "No forecast", "Forecast.Solar-Auswahl nicht verfügbar": "Forecast.Solar selection unavailable", "Energiedashboard": "Energy dashboard", "Beispieldaten": "Sample data", "9,60 kWh": "9.60 kWh", "6,42 kWh": "6.42 kWh", "2,26 €": "2.26 €", "1,58 kWh": "1.58 kWh", "83,5 %": "83.5%", "50,1 %": "50.1%", "4,87 kWh": "4.87 kWh", "2,10 kWh": "2.10 kWh", "19.03. 13:40": "03/19, 13:40", "▸ Stromkosten heute · Aufschlüsselung": "▸ Electricity cost today · breakdown"};
  var fields = [
    ['pv_energy', 'PV-Ertrag gesamt', 'energy'],
    ['grid_import_energy', 'Netzbezug gesamt', 'energy'],
    ['grid_export_energy', 'Einspeisung gesamt', 'energy'],
    ['battery_charge_energy', 'Batterieladung gesamt', 'energy'],
    ['battery_discharge_energy', 'Batterieentladung gesamt', 'energy'],
    ['battery_soc', 'Batterieladezustand', 'percent'],
    ['pv_power', 'PV-Leistung', 'power'],
    ['home_power', 'Hausleistung', 'power'],
    ['grid_power', 'Netzleistung', 'power'],
    ['battery_power', 'Batterieleistung (optional)', 'power'],
    ['ev_power', 'Ladeleistung (optional)', 'power']
  ];
  var units = {energy: {Wh: .001, kWh: 1, MWh: 1000}, power: {W: 1, kW: 1000, MW: 1000000}, percent: {'%': 1}};
  var tariffFields = [
    ['off_peak_start', 'Nebentarif ab', 'time'],
    ['off_peak_end', 'Nebentarif bis', 'time'],
    ['off_peak_price', 'Nebentarif (ct/kWh)', 'number'],
    ['standard_price', 'Standardtarif (ct/kWh)', 'number'],
    ['feed_in_price', 'Einspeisevergütung (ct/kWh)', 'number'],
    ['daily_fee', 'Grundpreis (ct/Tag)', 'number']
  ];
  function factor(hass, entity, kind) {
    var state = hass.states[entity];
    return state && units[kind][state.attributes.unit_of_measurement] || NaN;
  }
  function parseTariff(config) {
    var values = tariffFields.map(function (field) { return config[field[0]]; });
    if (!values.slice(0,2).every(function (value) { return /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(value); }) ||
        !values.slice(2).every(function (value) { return typeof value === 'number' && Number.isFinite(value); })) return null;
    return {start:values[0], end:values[1], offPeak:values[2]/100, standard:values[3]/100,
      feedIn:values[4]/100, daily:values[5]/100};
  }
  function localTime(day, text) {
    var parts = text.split(':').map(Number);
    var date = new Date(day);
    date.setHours(parts[0], parts[1], 0, 0);
    return +date;
  }
  var colors = ['#fade2a', '#3274d9', '#f2495c', '#73bf69', '#8ab8ff', '#fade2a'];
  function midnight(offset) {
    var date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + offset);
    return +date;
  }
  function counter(points, start, end) {
    var values = points.filter(function (p) { return p[0] >= start && p[0] <= end; });
    if (values.length < 2) return [];
    var sum = 0;
    return values.map(function (p, i) {
      if (i) sum += Math.max(0, p[1] - values[i - 1][1]);
      return [p[0], sum];
    });
  }
  function last(points) { return points.length ? points[points.length - 1][1] : NaN; }
  function costs(imports, exports, start, end, tariff) {
    var result = {go: NaN, standard: NaN, series: []};
    if (!tariff || imports.length < 2) return result;
    result.go = 0;
    result.standard = 0;
    var from = localTime(start, tariff.start), to = localTime(start, tariff.end);
    var intervals = from < to ? [[from,to]] : from > to ? [[start,to],[from,end]] : [];
    var events = [];
    imports.slice(1).forEach(function (p, i) {
      var prior = imports[i];
      var duration = p[0] - prior[0];
      var overlap = intervals.reduce(function (sum, interval) {
        return sum + Math.max(0, Math.min(interval[1], p[0]) - Math.max(interval[0], prior[0]));
      }, 0);
      var delta = p[1] - prior[1];
      var go = duration > 0 ? delta * overlap / duration : 0;
      var standard = delta - go;
      result.go += go;
      result.standard += standard;
      events.push([p[0], go * tariff.offPeak + standard * tariff.standard]);
    });
    if (!exports.length && tariff.feedIn !== 0) return result;
    exports.slice(1).forEach(function (p, i) {
      events.push([p[0], -(p[1] - exports[i][1]) * tariff.feedIn]);
    });
    events.sort(function (a,b) { return a[0]-b[0]; });
    var running = tariff.daily;
    result.series = [[start,running]].concat(events.map(function (p) {
      running += p[1];
      return [p[0],running];
    }));
    return result;
  }
  function plot(lines, start, end, min, max, filled, height, palette, grid) {
    var w = 640, h = height;
    var guides = '';
    if (grid) {
      function guide(x1, y1, x2, y2, zero) {
        return '<line class="' + (zero ? 'zero' : 'guide') + '" x1="' + x1 + '" y1="' + y1 +
          '" x2="' + x2 + '" y2="' + y2 + '" vector-effect="non-scaling-stroke"/>';
      }
      for (var hour = 0; hour <= 24; hour++) guides += guide(hour * w / 24, 0, hour * w / 24, h, false);
      for (var tick = min; tick <= max; tick += grid) {
        var y = h - (tick - min) / (max - min) * h;
        guides += guide(0, y, w, y, tick === 0);
      }
    }
    var paths = lines.map(function (line, i) {
      var points = line.filter(function (p) { return p[0] >= start && p[0] <= end; });
      var d = points.map(function (p, j) {
        var x = (p[0] - start) / (end - start) * w;
        var y = h - (Math.min(max, Math.max(i === 5 ? 0 : min, p[1])) - min) / (max - min) * h;
        return (j ? 'L' : 'M') + x.toFixed(2) + ' ' + y.toFixed(2);
      }).join('');
      if (!d) return '';
      var color = (palette || colors)[i];
      var fill = filled || i === 5;
      var baseline = i === 5 ? h - (0 - min) / (max - min) * h : h;
      var area = fill ? d + 'L' + ((points[points.length - 1][0] - start) / (end - start) * w) + ' ' + baseline +
        'L' + ((points[0][0] - start) / (end - start) * w) + ' ' + baseline + 'Z' : '';
      return (area ? '<path d="' + area + '" fill="' + color + '" opacity=".23"/>' : '') +
        (i === 5 ? '' : '<path d="' + d + '" fill="none" stroke="' + color + '" stroke-width="1.6" vector-effect="non-scaling-stroke"/>');
    });
    if (grid) paths.unshift(guides);
    return '<svg aria-hidden="true" viewBox="0 0 640 ' + h + '" preserveAspectRatio="none">' + paths.join('') + '</svg>';
  }
  function history(hass, entities, start, end) {
    var selected = entities.filter(Boolean);
    if (!selected.length) return Promise.resolve(entities.map(function () { return []; }));
    return hass.callApi('GET', 'history/period/' + new Date(start).toISOString() +
      '?end_time=' + encodeURIComponent(new Date(end).toISOString()) + '&filter_entity_id=' +
      encodeURIComponent(selected.join(',')) + '&minimal_response&no_attributes').then(function (rows) {
      var grouped = {};
      rows.forEach(function (row) {
        if (!row.length) return;
        grouped[row[0].entity_id] = row.map(function (p) {
          return [Date.parse(p.last_changed || p.last_updated), parseFloat(p.state)];
        }).filter(function (p) { return Number.isFinite(p[0]) && Number.isFinite(p[1]); });
      });
      return entities.map(function (entity, i) {
        var scale = factor(hass, entity, fields[i][2]);
        return Number.isFinite(scale) ? (grouped[entity] || []).map(function (p) { return [p[0],p[1]*scale]; }) : [];
      });
    });
  }
  class EnergyDashboardCard extends HTMLElement {
    static getConfigElement() { return document.createElement('configurable-energy-dashboard-editor'); }
    static getStubConfig() { return {off_peak_start:'00:00',off_peak_end:'00:00'}; }
    setConfig(config) {
      this.config = config;
      this.entities = fields.map(function (field) { return config[field[0]]; });
      this._loaded = 0;
      if (this.isConnected) this.updatePreview();
    }
    connectedCallback() {
      if (this.config) this.updatePreview();
    }
    updatePreview() {
      if (this.entities.some(Boolean)) {
        this.refresh();
        return;
      }
      var language = cardLanguage(this._hass);
      var t = translator(language);
      var ancestor = this;
      while (ancestor && ancestor.localName !== 'hui-card-picker') {
        ancestor = ancestor.parentElement || ancestor.getRootNode().host;
      }
      if (ancestor) {
        var image = document.createElement('img');
        image.src = previewImage(language);
        image.alt = t('Energiedashboard mit Beispieldaten');
        image.style.cssText = 'display:block;width:100%;height:auto';
        this.innerHTML = '';
        this.appendChild(image);
      } else {
        this.innerHTML = '<ha-card><p style="padding:16px;margin:0">' + t('Wähle eine Entität, um die Live-Vorschau zu laden.') + '</p></ha-card>';
      }
    }
    set hass(hass) {
      var changed = cardLanguage(this._hass) !== cardLanguage(hass);
      this._hass = hass;
      if (!this.isConnected || !this.config) return;
      if (changed) {
        this._loaded = 0;
        this.updatePreview();
      } else if (this.entities.some(Boolean)) this.refresh();
    }
    refresh() {
      if (this._hass && (!this._loaded || Date.now() - this._loaded > 60000)) {
        this._loaded = Date.now();
        this.load();
      }
    }
    getCardSize() { return 12; }
    load() {
      var t = translator(cardLanguage(this._hass));
      var self = this, hass = this._hass, config = this.config, start = midnight(0), end = midnight(1);
      var forecast = this.config.forecast_entry ? hass.callWS({
        type: 'call_service', domain: 'forecast_solar', service: 'get_forecast',
        service_data: {config_entry: this.config.forecast_entry}, return_response: true
      }).then(function (res) {
        var watts = (res.response || {}).watts || {};
        return Object.keys(watts).map(function (time) { return [Date.parse(time), Number(watts[time])]; })
          .filter(function (p) { return Number.isFinite(p[0]) && Number.isFinite(p[1]); })
          .sort(function (a,b) { return a[0]-b[0]; });
      }).catch(function () { return []; }) : Promise.resolve([]);
      Promise.all([history(hass, this.entities, start - 15 * 60000, Date.now()), forecast]).then(function (data) {
        if (self.config !== config) return;
        self.render(data[0], data[1], start, end);
      }).catch(function () {
        if (self.config === config && !self.querySelector('ha-card')) self.textContent = t('Verlaufsdaten konnten nicht geladen werden.');
      });
    }
    render(rows, forecast, start, end) {
      var locale = cardLanguage(this._hass);
      var t = translator(locale);
      var format = numberFormatter(locale);
      var entities = this.entities;
      var tariff = parseTariff(this.config);
      var current = rows.slice(0,5).map(function (p) { return counter(p,start,end); });
      var now = current.map(last);
      var cost = costs(current[1], current[2], start, end, tariff);
      var euros = cost.series;
      var state = this._hass.states[entities[5]];
      var soc = state ? parseFloat(state.state) : NaN;
      function tile(title, value, unit, points, max, color) {
        return '<article><div>' + title + '</div><strong>' + value + ' <small>' + unit + '</small></strong>' +
          plot([points], start, end, 0, max, true, 44, [color]) + '</article>';
      }
      var power = rows.slice(6).map(function (series) {
        return series.filter(function (p) { return p[0] >= start; });
      });
      var traces = [power[0], power[1], power[2], power[3], power[4], forecast];
      var extrema = traces.reduce(function (acc, series) {
        series.forEach(function (p) {
          if (p[0] >= start && p[0] <= end) {
            acc[0] = Math.min(acc[0], p[1]);
            acc[1] = Math.max(acc[1], p[1]);
          }
        });
        return acc;
      }, [0, 1000]);
      var step = [250, 500, 1000, 2000, 5000, 10000, 20000].find(function (size) {
        return (extrema[1] - extrema[0]) / size <= 10;
      }) || Math.ceil((extrema[1] - extrema[0]) / 100000) * 10000;
      var min = Math.floor(extrema[0] / step) * step;
      var max = Math.ceil(extrema[1] / step) * step;
      var ticks = [];
      for (var y = max; y >= min; y -= step) {
        ticks.push('<span style="top:' + (max - y) / (max - min) * 100 + '%">' +
          (Math.abs(y) < 1000 && y !== 0 ? y + ' W' : format(y / 1000, y % 1000 ? (y % 500 ? 2 : 1) : 0) + ' kW') + '</span>');
      }
      var hours = [];
      for (var h = 0; h <= 24; h++) {
        hours.push('<span class="' + (h % 2 ? 'odd' : 'even') + '" style="left:' + h / 24 * 100 + '%">' +
          ('0' + h).slice(-2) + ':00</span>');
      }
      var labels = ['PV', t('Haus'), t('Netz'), t('Batterie'), t('Ladepunkt'), t('PV-Prognose')];
      var liveEntities = entities.slice(6);
      var nowTime = Date.now();
      var forecastToday = forecast.filter(function (p) { return p[0] >= start && p[0] <= end; });
      function atTime(points, time, interpolate) {
        if (!points.length || time < points[0][0] || (!interpolate && time > nowTime) ||
            (interpolate && time > points[points.length - 1][0])) return NaN;
        var low = 0, high = points.length - 1;
        while (low < high) {
          var mid = Math.ceil((low + high) / 2);
          if (points[mid][0] <= time) low = mid;
          else high = mid - 1;
        }
        var point = points[low], next = points[low + 1];
        return interpolate && next ? point[1] + (next[1] - point[1]) * (time - point[0]) /
          (next[0] - point[0]) : point[1];
      }
      function kw(watts) {
        return Number.isFinite(watts) ? format(watts / 1000, 2) + ' kW' : '–';
      }
      function swatch(i) {
        return '<i class="swatch' + (i === 5 ? ' forecast' : '') + '" style="background:' + colors[i] + '"></i>';
      }
      var hass = this._hass;
      var legend = labels.map(function (label, i) {
        if (!label || (i === 5 ? !this.config.forecast_entry : !liveEntities[i])) return '';
        var live = hass.states[liveEntities[i]];
        var value = i === 5 ? atTime(forecastToday, nowTime, true) :
          (live ? parseFloat(live.state) * factor(hass, liveEntities[i], 'power') : NaN);
        return '<span>' + swatch(i) + label + ' <b>' + kw(value) + '</b></span>';
      }, this).join('');
      var powerChart = '<div class="plot"><div class="y-axis">' + ticks.join('') + '</div>' +
        '<div class="plot-area" tabindex="0" aria-label="Leistungsverlauf. Pfeiltasten zeigen die Werte zur gewählten Uhrzeit.">' +
        plot(traces, start, end, min, max, false, 220, null, step) +
        '<div class="crosshair" hidden></div></div><div class="power-tooltip" hidden></div>' +
        '<div class="x-axis">' + hours.join('') + '</div></div><div class="legend">' + legend + '</div>';

      var pvUsed = Number.isFinite(now[0]) && Number.isFinite(now[2]) ? Math.max(0, now[0] - now[2]) : NaN;
      var ownUse = now[0] > 0 ? 100 * pvUsed / now[0] : NaN;
      var supply = now[0] + now[1];
      var autonomy = supply > 0 ? 100 * pvUsed / supply : NaN;
      function amount(value, decimals, unit) {
        return Number.isFinite(value) ? format(value, decimals) + ' ' + unit : '–';
      }
      function approx(value, decimals, unit) {
        return Number.isFinite(value) ? '≈ ' + amount(value, decimals, unit) : '–';
      }
      function timestamp(value) {
        var date = new Date(value);
        return Number.isFinite(+date) ? date.toLocaleString(locale, { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'
        }).replace(',', '') : '–';
      }
      var latest = rows.reduce(function (max, series) {
        return series.length ? Math.max(max, series[series.length - 1][0]) : max;
      }, -Infinity);
      function table(headers, data, cls) {
        var heading = headers.length ? '<thead><tr>' + headers.map(function (label) {
          return '<th scope="col">' + label + '</th>';
        }).join('') + '</tr></thead>' : '';
        var columns = headers.length ? '<colgroup><col><col><col><col></colgroup>' : '';
        return '<table class="' + cls + '">' + columns + heading + '<tbody>' + data.map(function (row) {
          return '<tr><th scope="row">' + row[0] + '</th>' + row.slice(1).map(function (cell) {
            return '<td>' + cell + '</td>';
          }).join('') + '</tr>';
        }).join('') + '</tbody></table>';
      }
      var balance = '<div class="summary-grid">' + table([], [
        [t('Einspeisung'), approx(now[2], 2, 'kWh')],
        [t('Eigenverbrauch'), approx(ownUse, 1, '%')],
        [t('Autarkie'), approx(autonomy, 1, '%')]
      ], 'summary-table') + table([], [
        [t('Batterieladung'), approx(now[3], 2, 'kWh')],
        [t('Batterieentladung'), approx(now[4], 2, 'kWh')],
        [t('Stand'), timestamp(latest)]
      ], 'summary-table') + '</div>';
      var hasTrace = labels.map(function (_, i) { return i === 5 ? !!this.config.forecast_entry : !!liveEntities[i]; }, this);
      function price(value, unit) { return format(value * 100, 2) + ' ct/' + unit; }
      var charges = !tariff ? '<p>' + t('Tarifdaten im Karteneditor eintragen.') + '</p>' : table([t('Posten'), t('Energie'), t('Betrag'), t('Tarif / Hinweis')], [
        [t('Nebentarif') + ' · ' + tariff.start + '–' + tariff.end, amount(cost.go, 3, 'kWh'), amount(cost.go * tariff.offPeak, 2, '€'), price(tariff.offPeak, 'kWh')],,
        [t('Standardtarif'), amount(cost.standard, 3, 'kWh'), amount(cost.standard * tariff.standard, 2, '€'), price(tariff.standard, 'kWh')],
        [t('Netzbezug gesamt'), amount(now[1], 3, 'kWh'), amount(cost.go * tariff.offPeak + cost.standard * tariff.standard, 2, '€'), '–'],
        [t('Einspeisevergütung'), amount(now[2], 3, 'kWh'), amount(now[2] ? -now[2] * tariff.feedIn : now[2], 2, '€'), price(tariff.feedIn, 'kWh')],
        [t('Grundpreis pro Tag'), '–', amount(tariff.daily, 4, '€'), price(tariff.daily, t('Tag'))],
        [t('Nettokosten'), '–', approx(last(euros), 2, '€'), t('Bezug + Grundpreis − Vergütung')],
        [t('PV · entgangene Einspeisevergütung'), amount(pvUsed, 3, 'kWh'), amount(pvUsed * tariff.feedIn, 2, '€'), t('Separater Vergleichswert')]
      ], 'charges-table');
      var previousCharges = this.querySelector('.charges');
      var chargesOpen = previousCharges && previousCharges.open;
      var title = typeof this.config.title === 'string' ? this.config.title.trim() : '';
      this.innerHTML = '<style>configurable-energy-dashboard-card{display:block}configurable-energy-dashboard-card ha-card{padding:10px}' +
        'configurable-energy-dashboard-card h2{margin:0 0 8px;font-size:1.04rem}configurable-energy-dashboard-card .tiles,configurable-energy-dashboard-card .summary-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}' +
        'configurable-energy-dashboard-card article,configurable-energy-dashboard-card section{border:1px solid var(--divider-color);border-radius:8px;padding:8px;min-width:0}' +
        'configurable-energy-dashboard-card article strong{display:block;font-size:1.6rem;line-height:1.25}configurable-energy-dashboard-card small{font-size:.75rem}' +
        'configurable-energy-dashboard-card svg{display:block;width:100%;overflow:hidden}configurable-energy-dashboard-card article svg{height:44px}' +
        'configurable-energy-dashboard-card section{margin-top:8px}configurable-energy-dashboard-card .plot{position:relative;margin:12px 20px 24px 48px}' +
        'configurable-energy-dashboard-card .plot svg{height:210px;height:clamp(170px,24vh,320px)}' +
        'configurable-energy-dashboard-card .guide{stroke:var(--divider-color);stroke-opacity:.75}configurable-energy-dashboard-card .zero{stroke:var(--secondary-text-color);stroke-opacity:.7}' +
        'configurable-energy-dashboard-card .y-axis span,configurable-energy-dashboard-card .x-axis span{position:absolute;font-size:.73rem;color:var(--secondary-text-color);white-space:nowrap}' +
        'configurable-energy-dashboard-card .y-axis span{right:calc(100% + 5px);transform:translateY(-50%)}configurable-energy-dashboard-card .x-axis span{top:100%;margin-top:4px;transform:translateX(-50%)}' +
        'configurable-energy-dashboard-card .x-axis .odd{display:none}@media(min-width:1200px){configurable-energy-dashboard-card .x-axis .odd{display:block}}' +
        'configurable-energy-dashboard-card .legend{display:flex;flex-wrap:wrap;gap:6px 12px;font-size:.8rem}configurable-energy-dashboard-card .legend span{display:inline-flex;align-items:center;gap:4px}' +
        'configurable-energy-dashboard-card .plot-area{position:relative}configurable-energy-dashboard-card .crosshair{position:absolute;top:0;bottom:0;left:0;border-left:1px dashed var(--secondary-text-color);pointer-events:none}' +
        'configurable-energy-dashboard-card .power-tooltip{position:absolute;top:6px;max-width:100%;width:180px;padding:7px 9px;box-sizing:border-box;background:var(--card-background-color);color:var(--primary-text-color);border:1px solid var(--divider-color);border-radius:6px;box-shadow:0 2px 8px #0003;pointer-events:none;z-index:2;font-size:.78rem}' +
        'configurable-energy-dashboard-card .power-tooltip>div{display:grid;grid-template-columns:13px 1fr auto;align-items:center;gap:4px}configurable-energy-dashboard-card .power-tooltip b,configurable-energy-dashboard-card .legend b{font-variant-numeric:tabular-nums;white-space:nowrap}configurable-energy-dashboard-card .legend b{margin-left:2px}' +
        'configurable-energy-dashboard-card .swatch{display:inline-block;width:13px;height:3px;border-radius:2px}configurable-energy-dashboard-card .forecast{height:9px;opacity:.5}' +
        'configurable-energy-dashboard-card table{width:100%;border-collapse:collapse;font-size:.85rem}configurable-energy-dashboard-card th,configurable-energy-dashboard-card td{text-align:left;padding:5px 4px;border-bottom:1px solid var(--divider-color)}' +
        'configurable-energy-dashboard-card tbody th{font-weight:normal}configurable-energy-dashboard-card td{white-space:nowrap}configurable-energy-dashboard-card .summary-grid{gap:6px 24px}' +
        'configurable-energy-dashboard-card .summary-table td,configurable-energy-dashboard-card .charges-table th:nth-child(2),configurable-energy-dashboard-card .charges-table td:nth-child(2),configurable-energy-dashboard-card .charges-table th:nth-child(3),configurable-energy-dashboard-card .charges-table td:nth-child(3){text-align:right;font-variant-numeric:tabular-nums}' +
        'configurable-energy-dashboard-card .summary-table tr:last-child>*,configurable-energy-dashboard-card .charges-table tr:last-child>*{border-bottom:0}' +
        'configurable-energy-dashboard-card .charges-table{table-layout:fixed}configurable-energy-dashboard-card .charges-table col:nth-child(1){width:34%}configurable-energy-dashboard-card .charges-table col:nth-child(2){width:17%}configurable-energy-dashboard-card .charges-table col:nth-child(3){width:15%}' +
        'configurable-energy-dashboard-card .charges-table th:nth-child(4),configurable-energy-dashboard-card .charges-table td:nth-child(4){padding-left:14px;white-space:normal}configurable-energy-dashboard-card .charges-table tbody tr:nth-child(6)>*{font-weight:600;background:var(--secondary-background-color)}' +
        '@media(max-width:520px){configurable-energy-dashboard-card .x-axis .even:nth-child(4n+3){display:none}configurable-energy-dashboard-card .summary-grid{gap:4px 10px}configurable-energy-dashboard-card .charges-table th,configurable-energy-dashboard-card .charges-table td{padding:4px 2px}configurable-energy-dashboard-card .charges-table th:nth-child(4),configurable-energy-dashboard-card .charges-table td:nth-child(4){padding-left:6px}configurable-energy-dashboard-card table{font-size:.75rem}}' +
        'configurable-energy-dashboard-card .charges summary{cursor:pointer;font-size:1.04rem;font-weight:600}configurable-energy-dashboard-card .charges[open] summary{margin-bottom:8px}' +
        'configurable-energy-dashboard-card .card-title{margin:0 0 10px;font-size:1.25rem;overflow-wrap:anywhere}' +
        '</style><ha-card><h2 class="card-title"></h2><div class="tiles">' +
        tile(t('PV-Ertrag heute'),format(now[0],2),'kWh',current[0],Math.max(20,now[0]||0),colors[0]) +
        tile(t('Netzbezug heute'),format(now[1],2),'kWh',current[1],Math.max(20,now[1]||0),colors[2]) +
        tile(t('Batterieladezustand'),format(soc,0),'%',rows[5],100,colors[3]) +
        tile(t('Stromkosten heute'),Number.isFinite(last(euros)) ? '≈ '+format(last(euros),2) : '–','€',euros,Math.max(20,last(euros)||0),'#ff9830') +
        '</div><section><h2>' + t('Leistung heute') + '</h2>'+powerChart+'</section>' +
        '<section><h2>' + t('Tagesbilanz · ≈ Näherungswert') + '</h2>'+balance+'</section>' +
        '<section><details class="charges"' + (chargesOpen ? ' open' : '') + '><summary>' + t('Stromkosten heute · Aufschlüsselung') + '</summary>' + charges + '</details></section></ha-card>';
      this.querySelector('.card-title').textContent = title || defaultTitle;
      var area = this.querySelector('.plot-area');
      var crosshair = this.querySelector('.crosshair');
      var tooltip = this.querySelector('.power-tooltip');
      var selection = null;
      var times = new Intl.DateTimeFormat(locale, {hour:'2-digit', minute:'2-digit'});
      function show(fraction) {
        selection = Math.max(0, Math.min(1, fraction));
        var time = start + selection * (end - start);
        crosshair.hidden = false;
        crosshair.style.left = selection * 100 + '%';
        tooltip.hidden = false;
        tooltip.innerHTML = '<strong>' + (selection === 1 ? '24:00' : times.format(time)) + '</strong>' +
          labels.map(function (label, i) {
            if (!hasTrace[i]) return '';
            return '<div>' + swatch(i) + '<span>' + label + '</span><b>' +
              kw(atTime(i === 5 ? forecastToday : traces[i], time, i === 5)) + '</b></div>';
          }).join('');
        var width = area.clientWidth;
        var marker = selection * width;
        var box = tooltip.offsetWidth;
        var left = marker + 12 + box <= width ? marker + 12 : marker - box - 12;
        tooltip.style.left = Math.max(0, left) + 'px';
      }
      function point(event) {
        var rect = area.getBoundingClientRect();
        if (rect.width) show((event.clientX - rect.left) / rect.width);
      }
      function hide() {
        crosshair.hidden = true;
        tooltip.hidden = true;
        selection = null;
      }
      area.addEventListener('mousemove', point);
      area.addEventListener('mouseleave', hide);
      area.addEventListener('click', point);
      area.addEventListener('blur', hide);
      area.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') hide();
        if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
        event.preventDefault();
        var position = selection === null ? (nowTime - start) / (end - start) : selection;
        show(position + (event.key === 'ArrowRight' ? 1 : -1) / 144);
      });
    }
  }
  class EnergyDashboardEditor extends HTMLElement {
    setConfig(config) {
      this.config = Object.assign({}, config);
      if (!this.isConnected) return;
      this.build();
      this.sync();
    }
    connectedCallback() {
      this.build();
      this.sync();
      this.loadOptions();
    }
    set hass(hass) {
      var changed = cardLanguage(this._hass) !== cardLanguage(hass);
      this._hass = hass;
      if (!this.isConnected) return;
      if (changed) {
        this.controls = null;
        this.build();
        this.sync();
      } else this.syncEntities();
      this.loadOptions();
    }
    build() {
      if (this.controls) return;
      this.controls = {};
      var self = this;
      var t = translator(cardLanguage(this._hass));
      var root = this.shadowRoot || this.attachShadow({mode:'open'});
      root.innerHTML = '<style>:host{display:block;color:var(--primary-text-color)}fieldset{min-width:0;margin:0 0 16px;padding:12px;border:1px solid var(--divider-color);border-radius:8px;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,210px),1fr));gap:12px}legend{font-weight:600}label{min-width:0;display:grid;gap:4px}select,input{font:inherit;color:inherit;background:var(--card-background-color);border:1px solid var(--divider-color);border-radius:6px;min-height:40px;padding:6px;box-sizing:border-box;width:100%}p{grid-column:1/-1;margin:0;color:var(--secondary-text-color);font-size:.875rem}.direction{color:var(--primary-text-color);border-inline-start:3px solid var(--primary-color);padding-inline-start:8px}</style>';
      var appearance = document.createElement('fieldset');
      root.appendChild(appearance);
      control(appearance, 'title', t('Kartentitel (optional)'), 'text');
      this.controls.title.placeholder = defaultTitle;
      var groups = {
        energy: group(t('Energiezähler'), t('Kumulative Zähler in Wh, kWh oder MWh. Verwende getrennte, aufwärts zählende Werte für Netzbezug, Einspeisung, Batterieladung und Batterieentladung. Daraus entstehen Tagesbilanz und Stromkosten.')),
        percent: group(t('Batterieladezustand'), t('Der aktuelle Füllstand in Prozent und sein Tagesverlauf.')),
        power: group(t('Momentanleistung'), t('Aktuelle Leistung in W, kW oder MW, möglichst mit Recorder-Verlauf. Bei gerichteten Leistungen muss das Vorzeichen stimmen.'))
      };
      fields.forEach(function (field) { control(groups[field[2]], field[0], t(field[1]), 'entity', field[2]); });
      var direction = document.createElement('p');
      direction.className = 'direction';
      direction.innerHTML = t('<strong>Netz:</strong> Bezug positiv (+), Einspeisung negativ (−). ') +
        t('<strong>Batterie:</strong> Entladung ins Haus positiv (+), Ladung negativ (−). ') +
        t('<strong>PV, Haus und Ladepunkt:</strong> Erzeugung bzw. Verbrauch positiv (+).');
      groups.power.insertBefore(direction, groups.power.children[2] || null);
      var forecast = group(t('Solarprognose'), t('Optional. Zeigt die erwartete PV-Leistung für den Tag als Fläche.'));
      control(forecast,'forecast_entry',t('Forecast.Solar-Installation (optional)'),'select');
      var tariffs = group(t('Stromtarif'), t('Preise und Tarifzeiten für die tägliche Kostenschätzung. Für einen Einheitstarif wähle dieselbe Start- und Endzeit. Setze nicht benötigte Preise auf 0.'));
      tariffFields.forEach(function (field) { control(tariffs,field[0],t(field[1]),field[2]); });
      function group(title, description) {
        var fieldset = document.createElement('fieldset');
        var legend = document.createElement('legend');
        legend.textContent = title;
        fieldset.appendChild(legend);
        var note = document.createElement('p');
        note.textContent = description;
        fieldset.appendChild(note);
        root.appendChild(fieldset);
        return fieldset;
      }
      function control(parent, key, title, type, kind) {
        var label = document.createElement('label');
        var input = document.createElement(type === 'entity' ? 'ha-entity-picker' : type === 'select' ? 'select' : 'input');
        if (type === 'entity') {
          input.label = title;
          input.includeDomains = ['sensor', 'input_number'];
          input.includeUnitOfMeasurement = Object.keys(units[kind]);
          input.allowCustomEntity = false;
          // Reapply properties after a lazily loaded frontend element upgrades.
          customElements.whenDefined('ha-entity-picker').then(function () {
            input.label = title;
            input.includeDomains = ['sensor', 'input_number'];
            input.includeUnitOfMeasurement = Object.keys(units[kind]);
            input.allowCustomEntity = false;
            self.syncEntities();
          });
        } else {
          label.textContent = title;
          if (type !== 'select') input.type = type;
          if (type === 'number') input.step = 'any';
        }
        input.addEventListener(type === 'entity' ? 'value-changed' : type === 'text' ? 'input' : 'change', function (event) {
          var value = type === 'entity' ? event.detail.value : input.value;
          var config = Object.assign({}, self.config);
          if (!value) delete config[key];
          else config[key] = type === 'number' ? input.valueAsNumber : value;
          if (config[key] === (self.config || {})[key]) return;
          self.config = config;
          self.dispatchEvent(new CustomEvent('config-changed', {
            detail:{config:config}, bubbles:true, composed:true
          }));
        });
        self.controls[key] = input;
        label.appendChild(input);
        parent.appendChild(label);
      }
    }
    sync() {
      if (!this.controls) return;
      var self = this, config = this.config || {};
      this.syncEntities();
      var title = typeof config.title === 'string' ? config.title : '';
      if (this.controls.title.value !== title) this.controls.title.value = title;
      var t = translator(cardLanguage(this._hass));
      this.setOptions('forecast_entry', this.forecastOptions || [], t(this.forecastError ? 'Forecast.Solar-Auswahl nicht verfügbar' : 'Keine Prognose'));
      tariffFields.forEach(function (field) {
        var value = config[field[0]];
        self.controls[field[0]].value = value == null ? '' : value;
      });
    }
    syncEntities() {
      if (!this.controls) return;
      var self = this, config = this.config || {};
      fields.forEach(function (field) {
        var picker = self.controls[field[0]];
        if (self._hass) picker.hass = self._hass;
        if (picker.value !== config[field[0]]) picker.value = config[field[0]];
      });
    }
    setOptions(key, options, placeholder) {
      var input = this.controls[key];
      var selected = (this.config || {})[key] || '';
      input.options.length = 0;
      input.add(new Option(placeholder, ''));
      options.forEach(function (item) { input.add(new Option(item[1],item[0])); });
      if (selected && !options.some(function (item) { return item[0] === selected; })) {
        input.add(new Option(selected, selected));
      }
      input.value = selected;
    }
    loadOptions() {
      if (!this.controls || !this._hass || this.loaded) return;
      this.loaded = true;
      var self = this, hass = this._hass;
      if (!customElements.get('ha-entity-picker') && window.loadCardHelpers) {
        window.loadCardHelpers().then(function (helpers) {
          helpers.createCardElement({type:'entities',entities:[]});
          return customElements.whenDefined('hui-entities-card');
        }).then(function () {
          return customElements.get('hui-entities-card').getConfigElement();
        }).catch(function () {});
      }
      hass.callWS({type:'config_entries/get',domain:'forecast_solar'}).then(function (entries) {
        self.forecastOptions = entries.filter(function (entry) { return !entry.disabled_by; }).map(function (entry) {
          return [entry.entry_id,entry.title];
        });
        self.sync();
      }).catch(function () {
        self.forecastError = true;
        self.sync();
      });
    }
  }
  if (!customElements.get('configurable-energy-dashboard-editor')) {
    customElements.define('configurable-energy-dashboard-editor', EnergyDashboardEditor);
  }
  if (!customElements.get('configurable-energy-dashboard-card')) {
    customElements.define('configurable-energy-dashboard-card', EnergyDashboardCard);
    window.customCards = window.customCards || [];
    window.customCards.push({
      type:'configurable-energy-dashboard-card',
      name:defaultTitle,
      description:'Configurable solar, energy and electricity cost dashboard · Konfigurierbares Energiedashboard',
      preview:true
    });
  }
}());
