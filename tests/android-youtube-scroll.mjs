// Load android/youtube-filter.txt in Brave Android, open m.youtube.com, then run:
// adb forward tcp:9222 localabstract:chrome_devtools_remote
// CDP_PORT=9222 node tests/android-youtube-scroll.mjs
// Requires Node.js 22+; uses the installed filter engine without injecting CSS.
import assert from 'node:assert/strict';

const endpoint = `http://127.0.0.1:${process.env.CDP_PORT || 9222}`;
const tabs = await (await fetch(`${endpoint}/json/list`)).json();
const tab = tabs.find(t => t.type === 'page' && t.url === 'https://m.youtube.com/');
assert.ok(tab, 'Open YouTube Home in Brave Android first');
const socket = new WebSocket(tab.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  socket.onopen = resolve;
  socket.onerror = reject;
});
let sequence = 0;
const pending = new Map();
socket.onmessage = event => {
  const message = JSON.parse(event.data);
  pending.get(message.id)?.(message);
};
async function evaluate(expression) {
  const id = ++sequence;
  let timer;
  try {
    const response = await new Promise((resolve, reject) => {
      pending.set(id, resolve);
      timer = setTimeout(() => reject(new Error('Android browser timed out')), 10000);
      socket.send(JSON.stringify({ id, method: 'Runtime.evaluate', params: {
        expression, returnByValue: true, awaitPromise: true,
      } }));
    });
    assert.ok(!response.error && !response.result.exceptionDetails, JSON.stringify(response));
    return response.result.result.value;
  } finally {
    clearTimeout(timer);
    pending.delete(id);
  }
}

try {
  const results = await evaluate(`(async () => {
    const root = document.createElement('ytm-browse');
    root.id = 'duration-filter-regression';
    const add = (parent, tag, className = '') => {
      const node = document.createElement(tag);
      node.className = className;
      parent.append(node);
      return node;
    };
    const tab = add(root, 'div', 'tab-content');
    tab.setAttribute('tab-identifier', 'FEwhat_to_watch');
    const card = add(tab, 'yt-lockup-view-model');
    const thumbnail = add(add(card, 'a', 'ytLockupViewModelContentImage'), 'yt-thumbnail-view-model');
    add(thumbnail, 'img', 'ytCoreImageHost').style.visibility = 'visible';
    add(thumbnail, 'badge-shape');
    add(add(card, 'div', 'ytSpecAvatarShapeAvatarSizeMedium'), 'img', 'ytSpecAvatarShapeImage').style.visibility = 'visible';
    const metadata = add(card, 'div', 'ytLockupMetadataViewModelTextContainer');
    add(add(metadata, 'a', 'ytLockupMetadataViewModelTitle'), 'span').textContent = 'Regression fixture';
    add(metadata, 'div', 'ytLockupMetadataViewModelMetadata').textContent = 'Channel';
    const content = [...card.childNodes].map(node => node.cloneNode(true));
    document.body.append(root);
    const cases = [
      ['14:59', '14 minutes, 59 seconds', true],
      ['15:00', '15 minutes', false],
      ['0:59', '59 seconds', true],
      ['1:00:01', '1 hour, 1 second', false],
      ['1:00', '1 minute', true],
      ['115:00', '115 minutes', false],
      ['14:59', '14 Minuten, 59 Sekunden', true],
      ['15:01', '15 Minuten, 1 Sekunde', false],
      ['0:30', '30 secondi', true],
      ['1:01:00', '1 ora, 1 minuto', false],
      ['14:59', '14 minutos y 59 segundos', true],
      ['0:30', '30 sekuntia', true],
      ['0:30', '30 secunde', true],
      ['', null, false],
      ['LIVE', 'Live', false],
      ['14:59', '14 minutes, 59 seconds', true],
      ['25:00', '25 minutes', false],
    ];
    const results = [];
    try {
      for (const replace of [false, true]) {
        for (const [text, label, blocked] of cases) {
          if (replace) card.replaceChildren(...content.map(node => node.cloneNode(true)));
          const badge = card.querySelector('badge-shape');
          badge.textContent = text;
          if (label === null) badge.removeAttribute('aria-label');
          else badge.setAttribute('aria-label', label);
          await new Promise(resolve => setTimeout(resolve, results.length ? 100 : 1000));
          const style = node => getComputedStyle(node);
          const title = card.querySelector('.ytLockupMetadataViewModelTitle');
          results.push({ text, label, blocked, replace,
            pointer: style(card).pointerEvents,
            cover: style(card.querySelector('img.ytCoreImageHost')).visibility,
            avatar: style(card.querySelector('.ytSpecAvatarShapeImage')).visibility,
            title: style(title.querySelector('span')).display,
            after: getComputedStyle(title, '::after').content,
            metadata: style(card.querySelector('.ytLockupMetadataViewModelMetadata')).display,
          });
        }
      }
      card.querySelector('badge-shape').setAttribute('aria-label', '14 minutes');
      root.querySelector('.tab-content').setAttribute('tab-identifier', 'FEsubscriptions');
      results.push({ outsideHome: getComputedStyle(card).pointerEvents });
      return results;
    } finally { root.remove(); }
  })()`);
  for (const result of results) {
    if ('outsideHome' in result) {
      assert.equal(result.outsideHome, 'auto');
      continue;
    }
    const context = JSON.stringify(result);
    assert.equal(result.pointer, result.blocked ? 'none' : 'auto', context);
    assert.equal(result.cover, result.blocked ? 'hidden' : 'visible', context);
    assert.equal(result.avatar, result.blocked ? 'hidden' : 'visible', context);
    assert.equal(result.title, result.blocked ? 'none' : 'inline', context);
    assert.equal(result.after, result.blocked ? '"REDACTED"' : 'none', context);
    assert.equal(result.metadata, result.blocked ? 'none' : 'block', context);
  }
  console.log(`PASS: ${results.length} Android duration and Home-scope checks`);
} finally {
  await evaluate("document.getElementById('duration-filter-regression')?.remove()");
  socket.close();
}
