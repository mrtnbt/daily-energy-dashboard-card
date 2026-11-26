const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { test } = require('node:test');

class Element {
  constructor() {
    this.children = [];
    this.style = {};
    this.isConnected = false;
  }
  set innerHTML(value) { this.html = value; this.children = []; }
  get innerHTML() { return this.html; }
  appendChild(child) { this.children.push(child); }
  insertBefore(child, reference) { this.children.splice(this.children.indexOf(reference), 0, child); }
  attachShadow() { return this.shadowRoot = new Element(); }
  querySelector(selector) {
    this.nodes ||= new Map();
    if (!this.nodes.has(selector)) this.nodes.set(selector, { addEventListener() {} });
    return this.nodes.get(selector);
  }
  addEventListener() {}
  getRootNode() { return { host: this.host }; }
}

function load() {
  const elements = new Map();
  const window = {};
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../dist/daily-energy-dashboard-card.js'), 'utf8'), {
    window,
    HTMLElement: Element,
    document: { createElement: () => new Element() },
    customElements: {
      get: key => elements.get(key),
      define: (key, value) => elements.set(key, value),
      whenDefined: () => Promise.resolve(),
    },
  });
  return { elements, window };
}

test('German, English and unsupported languages format live data and costs', () => {
  const { elements } = load();
  const Card = elements.get('configurable-energy-dashboard-card');
  const start = +new Date(2026, 0, 1);
  const end = +new Date(2026, 0, 2);
  const rows = Array.from({ length: 11 }, () => [
    [start, 0], [start + 4 * 3600000, 4], [start + 6 * 3600000, 6],
  ]);
  for (const [language, heading, cost, number] of [
    ['de-AT', 'Leistung heute', 'Nettokosten', '1,80'],
    ['en-GB', 'Power today', 'Net cost', '1.80'],
    ['fr', 'Power today', 'Net cost', '1.80'],
  ]) {
    const card = new Card();
    card.hass = { language, states: {} };
    card.setConfig({
      off_peak_start: '22:00', off_peak_end: '05:00',
      off_peak_price: 10, standard_price: 30, feed_in_price: 0, daily_fee: 100,
    });
    card.render(rows, [], start, end);
    assert.ok(card.innerHTML.includes(heading));
    assert.ok(card.innerHTML.includes(cost));
    assert.ok(card.innerHTML.includes('≈ ' + number + ' €'));
  }
});

test('picker sample images and editor fields follow the profile language', () => {
  const { elements, window } = load();
  const Card = elements.get('configurable-energy-dashboard-card');
  const Editor = elements.get('configurable-energy-dashboard-editor');
  assert.equal(window.customCards[0].preview, true);
  for (const [language, title, field] of [
    ['de', 'Energiedashboard mit Beispieldaten', 'PV-Ertrag gesamt'],
    ['en', 'Energy dashboard with sample data', 'Total solar production'],
  ]) {
    const card = new Card();
    card.host = { localName: 'hui-card-picker' };
    card.hass = { language };
    card.setConfig(Card.getStubConfig());
    card.connectedCallback();
    assert.equal(card.children[0].alt, title);
    assert.ok(decodeURIComponent(card.children[0].src).includes(title));

    const editor = new Editor();
    editor.hass = { language };
    editor.build();
    assert.equal(editor.controls.pv_energy.label, field);
  }
});

test('card title defaults when blank and renders custom text literally', () => {
  const Card = load().elements.get('configurable-energy-dashboard-card');
  const card = new Card();
  card.hass = { language: 'de', states: {} };
  const rows = Array.from({ length: 11 }, () => []);
  const start = +new Date(2026, 0, 1);
  const end = +new Date(2026, 0, 2);
  for (const [title, expected] of [
    [undefined, 'Daily Energy Dashboard'],
    ['  ', 'Daily Energy Dashboard'],
    ['  My <energy>  ', 'My <energy>'],
  ]) {
    card.setConfig({ title });
    card.render(rows, [], start, end);
    assert.equal(card.querySelector('.card-title').textContent, expected);
    if (title?.includes('<')) assert.ok(!card.innerHTML.includes('<energy>'));
  }
});
