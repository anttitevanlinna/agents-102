'use strict';
(() => {
  const header = document.querySelector('.field-header');
  const menu = header.querySelector('.field-menu');
  const place = header.querySelector('.field-place');
  const links = [...menu.querySelectorAll('[data-step], [data-target]')];
  const markers = links.map(link => ({
    link,
    title: link.lastChild.textContent.trim(),
    section: document.getElementById(link.hash.slice(1))
  }));
  const phases = [...document.querySelectorAll('main .phase[id]')];
  const margin = document.querySelector('.chapter-outline');
  const menuOutline = menu.querySelector('.map-local');
  let currentChapter;
  let currentPhase;
  function updateOutline(chapter, phase) {
    if (chapter !== currentChapter) {
      currentChapter = chapter;
      currentPhase = undefined;
      margin.replaceChildren();
      menuOutline.replaceChildren();
      margin.hidden = menuOutline.hidden = !chapter;
      if (chapter) {
        const label = document.createElement('p');
        const number = chapter.querySelector('.module-hero-num')?.textContent;
        label.textContent = number ? 'In Module ' + Number(number) : 'In this module';
        const list = document.createElement('ol');
        for (const section of chapter.querySelectorAll(':scope > .phase[id]')) {
          const heading = section.querySelector('h1');
          if (!heading) continue;
          const entry = document.createElement('li');
          const link = document.createElement('a');
          link.href = '#' + section.id;
          link.textContent = heading.textContent.trim().replace(/^(Exercise|Lecture):\s*/i, '');
          entry.append(link);
          list.append(entry);
        }
        margin.append(label,list);
        menuOutline.append(label.cloneNode(true),list.cloneNode(true));
      }
    }
    if (phase !== currentPhase) {
      currentPhase = phase;
      for (const container of [margin, menuOutline]) {
        for (const link of container.querySelectorAll('a')) {
          if (phase && link.hash.slice(1) === phase.id) link.setAttribute('aria-current','location');
          else link.removeAttribute('aria-current');
        }
      }
    }
  }
  let frame = 0;

  function locate() {
    frame = 0;
    if (document.body.classList.contains('slides-active')) return;
    const top = header.offsetHeight + 40;
    const active = markers.filter(item => item.section.getBoundingClientRect().top <= top).at(-1) || markers[0];
    for (const { link } of markers) {
      if (link === active.link) link.setAttribute('aria-current', link.hasAttribute('data-step') ? 'step' : 'location');
      else link.removeAttribute('aria-current');
    }
    const phase = active.link.hasAttribute('data-target') && phases.find(el => {
      const rect = el.getBoundingClientRect();
      return rect.top <= top && rect.bottom > top;
    });
    const title = phase && phase.querySelector('h1')?.textContent.trim().replace(/^Exercise:\s*/i, '');
    const chapter = active.link.hasAttribute('data-target') && active.section.getBoundingClientRect().bottom > top ? active.section : null;
    updateOutline(chapter, phase);
    place.textContent = title || (chapter || !active.link.hasAttribute('data-target') ? active.title : 'Reference');
  }
  function schedule() {
    if (!frame) frame = (window.requestAnimationFrame || (fn => setTimeout(fn, 16)))(locate);
  }
  menu.addEventListener('click', event => {
    const target = event.target.closest('a, [data-mode]');
    if (target) menu.open = false;
  });
  document.addEventListener('click', event => {
    if (!menu.contains(event.target)) menu.open = false;
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.open) {
      menu.open = false;
      menu.querySelector('summary').focus();
    }
  });
  window.addEventListener('scroll', schedule, {passive:true});
  window.addEventListener('resize', schedule);
  window.addEventListener('hashchange', schedule);
  locate();
})();

(() => {
  const reader = document.querySelector('.figure-reader');
  const canvas = reader.querySelector('.figure-canvas');
  const fit = reader.querySelector('.figure-fit');
  let opener;
  document.addEventListener('click', event => {
    const button = event.target.closest('.inspect-figure');
    if (!button) return;
    const original = button.closest('figure').querySelector(':scope > svg');
    const drawing = original.cloneNode(true);
    drawing.style.width = Math.max(original.viewBox.baseVal.width, 900) + 'px';
    drawing.style.height = 'auto';
    drawing.removeAttribute('height');
    // Markers and gradients should resolve inside this copy of the drawing.
    for (const node of drawing.querySelectorAll('[id]')) {
      const old = node.id;
      node.id = 'inspection-' + old;
      for (const use of drawing.querySelectorAll('[marker-end],[marker-start],[marker-mid],[fill],[stroke],[clip-path],[mask],[filter],[href]')) {
        for (const attr of [...use.attributes]) {
          if (attr.value.includes('url(#' + old + ')')) use.setAttribute(attr.name, attr.value.replaceAll('url(#' + old + ')','url(#' + node.id + ')'));
          else if (attr.name === 'href' && attr.value === '#' + old) use.setAttribute('href','#' + node.id);
        }
      }
    }
    canvas.replaceChildren(drawing);
    opener = button;
    reader.classList.remove('fit');
    fit.setAttribute('aria-pressed','false');
    reader.showModal();
    canvas.scrollTo(0,0);
    canvas.focus();
  });
  fit.addEventListener('click', () => {
    fit.setAttribute('aria-pressed', String(reader.classList.toggle('fit')));
  });
  reader.querySelector('.figure-close').addEventListener('click', () => reader.close());
  reader.addEventListener('close', () => {
    canvas.replaceChildren();
    opener?.focus({preventScroll:true});
  });
})();
