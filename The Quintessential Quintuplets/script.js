const revealItems = document.querySelectorAll('[data-animate]');
const extraAnimatedElements = document.querySelectorAll('.profile, .story, .card, .hero-card, .section');

extraAnimatedElements.forEach((element) => {
  if (!element.hasAttribute('data-animate')) {
    element.setAttribute('data-animate', 'true');
  }
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

const allRevealItems = document.querySelectorAll('[data-animate]');
allRevealItems.forEach((item) => revealObserver.observe(item));

const heroCard = document.querySelector('.hero-card');
if (heroCard) {
  heroCard.addEventListener('pointermove', (event) => {
    const rect = heroCard.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    heroCard.style.setProperty('--mx', `${x}%`);
    heroCard.style.setProperty('--my', `${y}%`);
    heroCard.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.55), rgba(255,255,255,0.12) 28%, rgba(255,255,255,0.04) 65%)`;
  });

  heroCard.addEventListener('pointerleave', () => {
    heroCard.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.18), rgba(255,255,255,0.08))';
  });
}

const brandButton = document.querySelector('.brand');
if (brandButton) {
  const modal = document.createElement('div');
  modal.className = 'brand-modal';

  const image = document.createElement('img');
  image.src = 'The Quintessential Quintuplets.png';
  image.alt = 'The Quintessential Quintuplets';
  modal.appendChild(image);
  document.body.appendChild(modal);

  const openLogoModal = () => {
    modal.classList.add('is-open');
    document.body.classList.add('logo-overlay-open');
  };

  const closeLogoModal = () => {
    modal.classList.remove('is-open');
    document.body.classList.remove('logo-overlay-open');
  };

  brandButton.addEventListener('click', openLogoModal);
  modal.addEventListener('click', closeLogoModal);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('is-open')) {
      closeLogoModal();
    }
  });
}

const navLinks = document.querySelectorAll('nav a');
const sections = [...document.querySelectorAll('main section[id]')];

const triggerSecretGlow = (x, y) => {
  const glow = document.querySelector('.secret-glow') || Object.assign(document.createElement('div'), { className: 'secret-glow' });
  if (!glow.parentNode) document.body.appendChild(glow);
  glow.style.setProperty('--mx', `${x}px`);
  glow.style.setProperty('--my', `${y}px`);
  glow.classList.add('is-on');
  setTimeout(() => glow.classList.remove('is-on'), 240);
};

const cycleTheme = () => {
  const themes = ['theme-noir', 'theme-luxe', 'theme-rose'];
  const current = document.body.classList.contains('theme-luxe') ? 'theme-luxe' : document.body.classList.contains('theme-rose') ? 'theme-rose' : 'theme-noir';
  const next = themes[(themes.indexOf(current) + 1) % themes.length];
  applyTheme(next);
};

const setActiveLink = () => {
  let currentId = 'home';
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 180 && rect.bottom >= 180) {
      currentId = section.id;
    }
  });

  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    const match = href && href.replace('#', '');
    link.classList.toggle('active', match === currentId);
  });
};

window.addEventListener('scroll', setActiveLink, { passive: true });
setActiveLink();

const bgMusic = document.getElementById('bg-music');
const audioToggle = document.getElementById('audio-toggle');

const themeButtons = document.querySelectorAll('.theme-button');
const applyTheme = (theme) => {
  document.body.classList.remove('theme-luxe', 'theme-noir', 'theme-rose');
  document.body.classList.add(theme);

  themeButtons.forEach((button) => {
    button.classList.toggle('is-active', button.dataset.theme === theme);
  });

  localStorage.setItem('quintuplets-theme', theme);
};

const savedTheme = localStorage.getItem('quintuplets-theme') || 'theme-noir';
applyTheme(savedTheme);

themeButtons.forEach((button) => {
  button.addEventListener('click', () => applyTheme(button.dataset.theme));
});

if (bgMusic && audioToggle) {
  bgMusic.volume = 0.35;
  const updateToggle = () => {
    const playing = !bgMusic.paused;
    audioToggle.classList.toggle('is-on', playing);
    audioToggle.textContent = playing ? '❚❚' : '♫';
    audioToggle.setAttribute('aria-label', playing ? 'Metti in pausa la musica' : 'Avvia la musica');
  };

  audioToggle.addEventListener('click', async () => {
    try {
      if (bgMusic.paused) {
        await bgMusic.play();
      } else {
        bgMusic.pause();
      }
      updateToggle();
    } catch (error) {
      console.warn('Audio non avviato:', error);
    }
  });

  bgMusic.addEventListener('play', updateToggle);
  bgMusic.addEventListener('pause', updateToggle);

  bgMusic.play().catch(() => {
    updateToggle();
  });
}

const introScene = document.getElementById('intro-scene');
const introVideo = document.getElementById('intro-video');

if (introScene && introVideo) {
  const hideIntro = () => {
    introScene.classList.add('is-hidden');
    window.setTimeout(() => introScene.remove(), 800);
  };

  introVideo.addEventListener('ended', hideIntro, { once: true });
  introVideo.addEventListener('error', hideIntro, { once: true });

  introVideo.play().catch(() => {
    hideIntro();
  });

  window.setTimeout(() => {
    if (!introVideo.ended) {
      hideIntro();
    }
  }, 12000);
}

const secretParticles = document.createElement('div');
secretParticles.className = 'secret-particles';
document.body.appendChild(secretParticles);

const characterCards = document.querySelectorAll('.character-card');
characterCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.zIndex = '10';
  });
  card.addEventListener('mouseleave', () => {
    card.style.zIndex = 'auto';
  });
});

const hiddenBox = document.querySelector('.hidden-feature-box');
if (hiddenBox) {
  hiddenBox.style.display = 'none';
  let clickCount = 0;
  document.addEventListener('click', (e) => {
    if (e.target.closest('.theme-button') || e.target.closest('.character-card') || e.target.closest('#audio-toggle')) {
      clickCount++;
      if (clickCount >= 5) {
        hiddenBox.style.display = 'block';
        hiddenBox.style.animation = 'slideIn 0.6s ease';
        triggerSecretGlow(window.innerWidth / 2, window.innerHeight / 2);
      }
    }
  });
}

const createSpark = () => {
  const spark = document.createElement('span');
  spark.className = 'spark';
  const x = Math.random() * window.innerWidth;
  const y = Math.random() * window.innerHeight;
  const dx = (Math.random() * 120 - 60).toFixed(2);
  const dy = (Math.random() * -150 - 30).toFixed(2);
  spark.style.left = `${x}px`;
  spark.style.top = `${y}px`;
  spark.style.setProperty('--dx', `${dx}px`);
  spark.style.setProperty('--dy', `${dy}px`);
  secretParticles.appendChild(spark);
  setTimeout(() => spark.remove(), 2500);
};

const toggleSecretMode = () => {
  document.body.classList.toggle('secret-mode');
  triggerSecretGlow(window.innerWidth / 2, window.innerHeight / 2);

  if (document.body.classList.contains('secret-mode')) {
    for (let i = 0; i < 12; i += 1) createSpark();
  }
};

const spawnHeartBurst = (x, y) => {
  const heart = document.createElement('div');
  heart.className = 'heart-burst';
  heart.textContent = '♥';
  heart.style.left = `${x}px`;
  heart.style.top = `${y}px`;
  heart.style.setProperty('--hx', `${(Math.random() * 60 - 30).toFixed(2)}px`);
  heart.style.setProperty('--hy', `${(-80 - Math.random() * 40).toFixed(2)}px`);
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 1800);
};

const cursorRing = document.createElement('div');
cursorRing.className = 'cursor-ring';
document.body.appendChild(cursorRing);

document.addEventListener('pointermove', (event) => {
  if (Math.random() > 0.992) {
    triggerSecretGlow(event.clientX, event.clientY);
  }

  cursorRing.style.left = `${event.clientX}px`;
  cursorRing.style.top = `${event.clientY}px`;
  cursorRing.classList.add('is-visible');
});

document.addEventListener('pointerleave', () => {
  cursorRing.classList.remove('is-visible');
});

window.addEventListener('dblclick', (event) => {
  triggerSecretGlow(event.clientX, event.clientY);
  spawnHeartBurst(event.clientX, event.clientY);
});

setInterval(() => {
  if (document.body.classList.contains('secret-mode')) {
    for (let i = 0; i < 3; i += 1) createSpark();
  }
}, 250);

const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (event) => {
  const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
  const expected = konamiCode[konamiIndex];

  if (key === expected) {
    konamiIndex += 1;
    if (konamiIndex === konamiCode.length) {
      toggleSecretMode();
      konamiIndex = 0;
    }
  } else {
    konamiIndex = 0;
  }

  if (key === 'm' && bgMusic) {
    if (bgMusic.paused) {
      bgMusic.play().catch(() => {});
    } else {
      bgMusic.pause();
    }
  }

  if (key === 't') {
    cycleTheme();
  }

  if (key === 'h') {
    toggleSecretMode();
  }

  if (key === 's') {
    document.body.classList.toggle('sparkle-mode');
    if (document.body.classList.contains('sparkle-mode')) {
      for (let i = 0; i < 18; i += 1) createSpark();
    }
  }

  if (key === 'c') {
    document.body.classList.toggle('cinema-mode');
    triggerSecretGlow(window.innerWidth / 2, window.innerHeight / 2);
  }
});

