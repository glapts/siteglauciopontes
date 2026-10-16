// Runtime Controller for VP Loterias / Glaset Web Presentation
(function () {
  'use strict';

  let currentSlideIndex = 0;
  const totalSlides = SLIDES_DATA.length;

  // DOM Elements
  const slidesContainer = document.getElementById('slides-container');
  const currentNumEl = document.getElementById('current-slide-num');
  const totalNumEl = document.getElementById('total-slides-num');
  const progressBar = document.getElementById('progress-bar');
  const quickDotsContainer = document.getElementById('quick-dots');
  
  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');
  const btnDrawer = document.getElementById('btn-drawer');
  const btnCloseDrawer = document.getElementById('btn-close-drawer');
  const indexDrawer = document.getElementById('index-drawer');
  const drawerBackdrop = document.getElementById('drawer-backdrop');
  const drawerList = document.getElementById('drawer-list');

  const btnFullscreen = document.getElementById('btn-fullscreen');
  const fsEnterIcon = document.getElementById('fs-enter-icon');
  const fsExitIcon = document.getElementById('fs-exit-icon');

  const zoomModal = document.getElementById('zoom-modal');
  const zoomImg = document.getElementById('zoom-img');
  const zoomCaption = document.getElementById('zoom-caption');
  const zoomCloseBtn = document.getElementById('zoom-close-btn');

  // Icons Helper
  const icons = {
    whatsapp: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>`,
    app: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>`,
    linkedin: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>`,
    globe: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`,
    zoom: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>`,
    shield: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`
  };

  // Build Slide HTML
  function renderSlide(data, idx) {
    const isVideo = data.type === 'video';
    const badgeClass = isVideo ? 'slide-badge video' : 'slide-badge';

    if (data.type === 'hero') {
      return `
        <div class="slide" id="slide-${idx}">
          <div class="slide-card">
            <div class="slide-hero">
              <div class="hero-logo-box">
                <img src="${data.logo}" alt="Logo" class="hero-logo-img" />
              </div>
              <div class="slide-badge">${data.badge}</div>
              <h1 class="hero-title">${data.title}</h1>
              <div class="hero-tagline">Controle Financeiro • Auditoria • Gestão Segura</div>
              <p class="hero-desc">${data.subtitle}</p>
              
              <div class="hero-meta">
                <span>Responsável Técnico: <strong class="hero-author">${data.author}</strong></span>
                <span>•</span>
                <span>VP - Lot - 2026</span>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    if (data.type === 'contact') {
      const contactsHtml = data.contacts.map(c => `
        <a href="${c.link}" target="_blank" rel="noopener noreferrer" class="contact-item">
          <div class="contact-icon">${icons[c.icon] || icons.globe}</div>
          <div>
            <div class="contact-label">${c.label}</div>
            <div class="contact-val">${c.val}</div>
          </div>
        </a>
      `).join('');

      return `
        <div class="slide" id="slide-${idx}">
          <div class="slide-card">
            <div class="${badgeClass}">${data.badge}</div>
            <h2 class="slide-title">${data.title}</h2>
            <p class="slide-subtitle">${data.subtitle}</p>
            
            <div class="slide-split">
              <div class="split-left">
                <div class="contact-grid">
                  ${contactsHtml}
                </div>
                <div class="executive-summary-box" style="margin-top: 2rem;">
                  ${icons.shield}
                  <div class="executive-summary-text">
                    Inicie com uma <strong>operação piloto</strong>. Medição direta de conciliação financeira, tempo de resposta e integridade da banca.
                  </div>
                </div>
              </div>
              <div class="split-right">
                <div class="media-container" style="max-height: 420px; background: transparent; border: none; box-shadow: none;">
                  <img src="${data.image}" alt="${data.author}" class="zoomable" data-caption="${data.author} — Apresentação Técnica" />
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    if (data.type === 'grid') {
      const cardsHtml = data.cards.map(c => `
        <div class="concept-card">
          <div class="card-header-line">
            <span class="card-num">${c.num}</span>
            <span class="card-title">${c.title}</span>
          </div>
          <div class="card-desc">${c.desc}</div>
        </div>
      `).join('');

      return `
        <div class="slide" id="slide-${idx}">
          <div class="slide-card">
            <div class="${badgeClass}">${data.badge}</div>
            <h2 class="slide-title">${data.title}</h2>
            <p class="slide-subtitle">${data.subtitle}</p>
            
            <div class="grid-cards">
              ${cardsHtml}
            </div>

            ${data.summary ? `
              <div class="executive-summary-box">
                ${icons.shield}
                <div class="executive-summary-text">${data.summary}</div>
              </div>
            ` : ''}
          </div>
        </div>
      `;
    }

    if (data.type === 'video') {
      const cardsHtml = data.cards.map(c => `
        <div class="concept-card">
          <div class="card-header-line">
            <span class="card-num">${c.num}</span>
            <span class="card-title">${c.title}</span>
          </div>
          <div class="card-desc">${c.desc}</div>
        </div>
      `).join('');

      return `
        <div class="slide" id="slide-${idx}">
          <div class="slide-card">
            <div class="${badgeClass}">🎥 ${data.badge} &bull; ${data.duration}</div>
            <h2 class="slide-title">${data.title}</h2>
            <p class="slide-subtitle">${data.subtitle}</p>
            
            <div class="slide-split">
              <div class="split-left">
                <div class="concept-cards-list">
                  ${cardsHtml}
                </div>
              </div>
              <div class="split-right">
                <div class="media-container">
                  <video controls playsinline preload="metadata" poster="${data.poster}" class="slide-video">
                    <source src="${data.video}" type="video/mp4" />
                    Seu navegador não suporta a reprodução deste vídeo.
                  </video>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    if (data.type === 'image') {
      const cardsHtml = data.cards.map(c => `
        <div class="concept-card">
          <div class="card-header-line">
            <span class="card-num">${c.num}</span>
            <span class="card-title">${c.title}</span>
          </div>
          <div class="card-desc">${c.desc}</div>
        </div>
      `).join('');

      return `
        <div class="slide" id="slide-${idx}">
          <div class="slide-card">
            <div class="${badgeClass}">${data.badge}</div>
            <h2 class="slide-title">${data.title}</h2>
            <p class="slide-subtitle">${data.subtitle}</p>
            
            <div class="slide-split">
              <div class="split-left">
                <div class="concept-cards-list">
                  ${cardsHtml}
                </div>
              </div>
              <div class="split-right">
                <div class="media-container">
                  <img src="${data.image}" alt="${data.title}" class="zoomable" data-caption="${data.caption || data.title}" />
                  <div class="zoom-hint">${icons.zoom} Clique para ampliar</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    if (data.type === 'multi_images') {
      const cardsHtml = data.cards.map(c => `
        <div class="concept-card">
          <div class="card-header-line">
            <span class="card-num">${c.num}</span>
            <span class="card-title">${c.title}</span>
          </div>
          <div class="card-desc">${c.desc}</div>
        </div>
      `).join('');

      const imagesHtml = data.images.map(img => `
        <div class="media-container" style="max-height: 155px; margin-bottom: 0.5rem;">
          <img src="${img.src}" alt="${img.title}" class="zoomable" data-caption="${img.title}" />
        </div>
      `).join('');

      return `
        <div class="slide" id="slide-${idx}">
          <div class="slide-card">
            <div class="${badgeClass}">${data.badge}</div>
            <h2 class="slide-title">${data.title}</h2>
            <p class="slide-subtitle">${data.subtitle}</p>
            
            <div class="slide-split">
              <div class="split-left">
                <div class="concept-cards-list">
                  ${cardsHtml}
                </div>
                ${data.summary ? `
                  <div class="executive-summary-box" style="margin-top: 1rem;">
                    ${icons.shield}
                    <div class="executive-summary-text">${data.summary}</div>
                  </div>
                ` : ''}
              </div>
              <div class="split-right" style="flex-direction: column; justify-content: center; gap: 0.5rem;">
                ${imagesHtml}
              </div>
            </div>
          </div>
        </div>
      `;
    }

    return '';
  }

  // Initialize UI
  function init() {
    totalNumEl.textContent = String(totalSlides).padStart(2, '0');

    // Render all slides
    let slidesHtml = '';
    SLIDES_DATA.forEach((s, idx) => {
      slidesHtml += renderSlide(s, idx);
    });
    slidesContainer.innerHTML = slidesHtml;

    // Render Quick Dots
    let dotsHtml = '';
    for (let i = 0; i < totalSlides; i++) {
      dotsHtml += `<div class="quick-dot ${i === 0 ? 'active' : ''}" data-idx="${i}" title="Ir para Slide ${i + 1}"></div>`;
    }
    quickDotsContainer.innerHTML = dotsHtml;

    // Render Drawer List
    let drawerHtml = '';
    SLIDES_DATA.forEach((s, idx) => {
      const isVid = s.type === 'video';
      const tagHtml = isVid ? `<span class="drawer-item-tag video">🎥 ${s.duration}</span>` : `<span class="drawer-item-tag">${s.tag || ''}</span>`;
      drawerHtml += `
        <button class="drawer-item ${idx === 0 ? 'active' : ''}" data-idx="${idx}">
          <div class="drawer-item-left">
            <span class="drawer-item-num">${String(idx + 1).padStart(2, '0')}</span>
            <span class="drawer-item-title">${s.title}</span>
          </div>
          ${tagHtml}
        </button>
      `;
    });
    drawerList.innerHTML = drawerHtml;

    // Bind Click Events on Quick Dots
    quickDotsContainer.querySelectorAll('.quick-dot').forEach(dot => {
      dot.addEventListener('click', () => {
        goToSlide(parseInt(dot.getAttribute('data-idx'), 10));
      });
    });

    // Bind Click Events on Drawer Items
    drawerList.querySelectorAll('.drawer-item').forEach(item => {
      item.addEventListener('click', () => {
        goToSlide(parseInt(item.getAttribute('data-idx'), 10));
        closeDrawer();
      });
    });

    // Bind Lightbox Zoom
    document.querySelectorAll('.zoomable').forEach(img => {
      img.addEventListener('click', () => {
        openZoom(img.src, img.getAttribute('data-caption') || img.alt);
      });
    });

    // Read initial hash from URL
    const hash = window.location.hash;
    if (hash) {
      const match = hash.match(/#(\d+)/);
      if (match) {
        const target = parseInt(match[1], 10) - 1;
        if (target >= 0 && target < totalSlides) {
          goToSlide(target, false);
          return;
        }
      }
    }

    goToSlide(0, false);
  }

  // Go to specific slide
  function goToSlide(targetIdx, updateHash = true) {
    if (targetIdx < 0 || targetIdx >= totalSlides) return;

    // Pause all currently playing videos
    document.querySelectorAll('.slide-video').forEach(vid => {
      if (!vid.paused) {
        vid.pause();
      }
    });

    const prevIdx = currentSlideIndex;
    currentSlideIndex = targetIdx;

    // Update active class on slides
    const slideEls = slidesContainer.querySelectorAll('.slide');
    slideEls.forEach((el, idx) => {
      el.classList.remove('active', 'prev');
      if (idx === currentSlideIndex) {
        el.classList.add('active');
      } else if (idx < currentSlideIndex) {
        el.classList.add('prev');
      }
    });

    // Update Header Counter
    currentNumEl.textContent = String(currentSlideIndex + 1).padStart(2, '0');

    // Update Progress Bar
    const percent = ((currentSlideIndex + 1) / totalSlides) * 100;
    progressBar.style.width = percent + '%';

    // Update Quick Dots
    quickDotsContainer.querySelectorAll('.quick-dot').forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentSlideIndex);
    });

    // Update Drawer Active Item
    drawerList.querySelectorAll('.drawer-item').forEach((item, idx) => {
      item.classList.toggle('active', idx === currentSlideIndex);
      if (idx === currentSlideIndex && indexDrawer.classList.contains('open')) {
        item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });

    // Update URL hash
    if (updateHash) {
      window.location.hash = `#${currentSlideIndex + 1}`;
    }

    // Update Prev / Next Buttons states
    btnPrev.disabled = currentSlideIndex === 0;
    btnPrev.style.opacity = currentSlideIndex === 0 ? '0.4' : '1';
    btnNext.disabled = currentSlideIndex === totalSlides - 1;
    btnNext.style.opacity = currentSlideIndex === totalSlides - 1 ? '0.4' : '1';
  }

  function nextSlide() {
    if (currentSlideIndex < totalSlides - 1) {
      goToSlide(currentSlideIndex + 1);
    }
  }

  function prevSlide() {
    if (currentSlideIndex > 0) {
      goToSlide(currentSlideIndex - 1);
    }
  }

  // Drawer Handlers
  function openDrawer() {
    indexDrawer.classList.add('open');
    drawerBackdrop.classList.add('open');
    const activeItem = drawerList.querySelector(`.drawer-item[data-idx="${currentSlideIndex}"]`);
    if (activeItem) {
      activeItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  function closeDrawer() {
    indexDrawer.classList.remove('open');
    drawerBackdrop.classList.remove('open');
  }

  // Fullscreen Handlers
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        fsEnterIcon.classList.add('hidden');
        fsExitIcon.classList.remove('hidden');
      }).catch(err => console.warn('Erro ao entrar em fullscreen:', err));
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          fsEnterIcon.classList.remove('hidden');
          fsExitIcon.classList.add('hidden');
        });
      }
    }
  }

  // Zoom Lightbox Handlers
  function openZoom(src, caption) {
    zoomImg.src = src;
    zoomCaption.textContent = caption || '';
    zoomModal.classList.add('open');
  }

  function closeZoom() {
    zoomModal.classList.remove('open');
  }

  // Event Listeners
  btnPrev.addEventListener('click', prevSlide);
  btnNext.addEventListener('click', nextSlide);
  btnDrawer.addEventListener('click', openDrawer);
  btnCloseDrawer.addEventListener('click', closeDrawer);
  drawerBackdrop.addEventListener('click', closeDrawer);
  btnFullscreen.addEventListener('click', toggleFullscreen);

  zoomCloseBtn.addEventListener('click', closeZoom);
  zoomModal.addEventListener('click', (e) => {
    if (e.target === zoomModal || e.target.classList.contains('zoom-body')) {
      closeZoom();
    }
  });

  // Keyboard Navigation
  window.addEventListener('keydown', (e) => {
    if (zoomModal.classList.contains('open')) {
      if (e.key === 'Escape') closeZoom();
      return;
    }

    if (indexDrawer.classList.contains('open')) {
      if (e.key === 'Escape') closeDrawer();
      return;
    }

    switch (e.key) {
      case 'ArrowRight':
      case 'PageDown':
      case ' ':
        e.preventDefault();
        nextSlide();
        break;
      case 'ArrowLeft':
      case 'PageUp':
      case 'Backspace':
        e.preventDefault();
        prevSlide();
        break;
      case 'Home':
        e.preventDefault();
        goToSlide(0);
        break;
      case 'End':
        e.preventDefault();
        goToSlide(totalSlides - 1);
        break;
      case 'm':
      case 'M':
      case 'i':
      case 'I':
        e.preventDefault();
        indexDrawer.classList.contains('open') ? closeDrawer() : openDrawer();
        break;
      case 'f':
      case 'F':
        e.preventDefault();
        toggleFullscreen();
        break;
    }
  });

  // Touch Swipe for Mobile / Tablets
  let touchStartX = 0;
  let touchEndX = 0;

  document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 50) {
      if (diff < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  }

  // Fullscreen change detection
  document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
      fsEnterIcon.classList.remove('hidden');
      fsExitIcon.classList.add('hidden');
    }
  });

  // Handle browser back/forward history hash
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash;
    if (hash) {
      const match = hash.match(/#(\d+)/);
      if (match) {
        const target = parseInt(match[1], 10) - 1;
        if (target >= 0 && target < totalSlides && target !== currentSlideIndex) {
          goToSlide(target, false);
        }
      }
    }
  });

  // Kickoff
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

