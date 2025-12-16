const navToggle = document.querySelector('.nav-toggle')
const nav = document.querySelector('.site-nav')
if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true'
    navToggle.setAttribute('aria-expanded', expanded ? 'false' : 'true')
    nav.classList.toggle('show')
  })
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('show')) {
      nav.classList.remove('show')
      navToggle.setAttribute('aria-expanded', 'false')
      navToggle.focus()
    }
  })
}
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1)
    const el = document.getElementById(id)
    if (el) {
      e.preventDefault()
      const y = el.getBoundingClientRect().top + window.scrollY - 64
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      window.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' })
      if (nav.classList.contains('show')) {
        nav.classList.remove('show')
        navToggle.setAttribute('aria-expanded', 'false')
      }
    }
  })
})
const sections = Array.from(document.querySelectorAll('section[id]'))
const navLinks = Array.from(document.querySelectorAll('.site-nav a[href^="#"]'))
const active = link => {
  navLinks.forEach(l => l.classList.remove('active'))
  navLinks.forEach(l => l.removeAttribute('aria-current'))
  if (link) {
    link.classList.add('active')
    link.setAttribute('aria-current', 'page')
  }
}
const map = new Map(navLinks.map(l => [l.getAttribute('href').slice(1), l]))
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const link = map.get(entry.target.id)
      active(link)
    }
  })
}, { rootMargin: '-40% 0px -50% 0px', threshold: 0.2 })
sections.forEach(s => observer.observe(s))
const video = document.querySelector('video[preload="none"] source')
if (video && !video.src) {
  const v = document.querySelector('video')
  const onReveal = () => {
    video.src = ''
    v.load()
  }
  const vo = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        onReveal()
        vo.disconnect()
      }
    })
  })
  vo.observe(v)
}

const i18n = {
  en: {
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.pilates': 'Pilates',
    'nav.physio': 'Physiotherapy',
    'nav.facilities': 'Facilities',
    'nav.team': 'Team',
    'nav.book': 'Book',
    'hero.title': 'We Care You',
    'hero.subtitle': 'Personalized wellness built on clinical Pilates and elite physiotherapy in Abu Dhabi and across the UAE.',
    'hero.ctaPilates': 'Explore Pilates',
    'hero.ctaPhysio': 'Explore Physiotherapy',
    'hero.ctaWhatsApp': 'WhatsApp Booking',
    'about.heading': 'About Us',
    'about.disclaimer': 'Medical information is general in nature and does not constitute individualized advice. Treatment plans are personalized; outcomes and recovery timelines vary by patient and condition.',
    'services.heading': 'Our Services',
    'cta.contact': 'Contact Us',
    'cta.bookConsult': 'Book Consultation',
    'cta.bookNow': 'Book Now',
    'section.pilates': 'Pilates',
    'section.physio': 'Physiotherapy',
    'section.facilities': 'Facilities',
    'section.team': 'Team',
    'section.contact': 'Contact & Booking',
    'services.clinicalPilates': 'Clinical Pilates',
    'services.clinicalPilates.desc': 'Therapeutic Pilates guided by certified instructors to build core stability, restore mobility, and enhance postural control. Programs integrate Mat, Reformer, Cadillac, and Chair to support rehabilitation and conditioning.',
    'services.elitePhysio': 'Elite Physiotherapy',
    'services.elitePhysio.desc': 'Advanced treatment protocols for post‑surgical rehabilitation, sports return‑to‑play, spine care, manual therapy, acupuncture, and modalities. Plans are individualized and updated using evidence‑based progressions.',
    'services.vipCare': 'VIP Private Care',
    'services.vipCare.desc': 'Premium private service with full discretion: home or palace visits, personalized scheduling, multilingual team, and best‑in‑class equipment for a seamless experience.',
    'link.learnMore': 'Learn More',
    'pilates.headingDesc': 'Modern studio, certified instructors, personalized sessions, and equipment of the highest standard.',
    'pilates.viewSite': 'View Pilates Site',
    'pilates.bookWhatsApp': 'Book Pilates on WhatsApp',
    'physio.viewSite': 'View Physiotherapy Site',
    'physio.bookWhatsApp': 'Book Physio on WhatsApp',
    'facilities.headingDesc': 'Modern equipment, clean and inspiring environment, and a supportive community for your journey.'
  },
  ar: {
    'nav.about': 'نبذة عنا',
    'nav.services': 'الخدمات',
    'nav.pilates': 'بيلاتس',
    'nav.physio': 'العلاج الطبيعي',
    'nav.facilities': 'المرافق',
    'nav.team': 'الفريق',
    'nav.book': 'احجز',
    'hero.title': 'نحن نهتم بك',
    'hero.subtitle': 'رفاهية شخصية مبنية على بيلاتس العلاجي والعلاج الطبيعي المتقدم في أبوظبي وجميع أنحاء الإمارات.',
    'hero.ctaPilates': 'اكتشف البيلاتس',
    'hero.ctaPhysio': 'اكتشف العلاج الطبيعي',
    'hero.ctaWhatsApp': 'الحجز عبر واتساب',
    'about.heading': 'من نحن',
    'about.disclaimer': 'المعلومات الطبية عامة ولا تُعد نصيحة فردية. خطط العلاج شخصية؛ تختلف النتائج والجداول الزمنية للتعافي حسب الحالة.',
    'services.heading': 'خدماتنا',
    'cta.contact': 'اتصل بنا',
    'cta.bookConsult': 'احجز استشارة',
    'cta.bookNow': 'احجز الآن',
    'section.pilates': 'بيلاتس',
    'section.physio': 'العلاج الطبيعي',
    'section.facilities': 'المرافق',
    'section.team': 'الفريق',
    'section.contact': 'الاتصال والحجز',
    'services.clinicalPilates': 'بيلاتس علاجي',
    'services.clinicalPilates.desc': 'بيلاتس علاجي بإشراف مدربين معتمدين لبناء ثبات الجذع واستعادة الحركة وتحسين التحكم في الوضعية. يتم دمج تمارين المات والريفرمر والكاديلاك والكر لدعم إعادة التأهيل والتقوية.',
    'services.elitePhysio': 'العلاج الطبيعي المتقدم',
    'services.elitePhysio.desc': 'بروتوكولات علاج متقدمة لإعادة التأهيل بعد الجراحة والعودة للرياضة وعلاج العمود الفقري والعلاج اليدوي والوخز بالإبر والوسائل العلاجية. الخطط فردية ويتم تحديثها وفق تقدميات مبنية على الأدلة.',
    'services.vipCare': 'رعاية VIP خاصة',
    'services.vipCare.desc': 'خدمة خاصة فاخرة مع كامل الخصوصية: زيارات منزلية أو في القصور، جداول شخصية، فريق متعدد اللغات، ومعدات من أعلى المستويات لتجربة سلسة.',
    'link.learnMore': 'اعرف المزيد',
    'pilates.headingDesc': 'استوديو حديث، مدربون معتمدون، جلسات شخصية، ومعدات بمعايير عالية.',
    'pilates.viewSite': 'عرض موقع البيلاتس',
    'pilates.bookWhatsApp': 'حجز البيلاتس عبر واتساب',
    'physio.viewSite': 'عرض موقع العلاج الطبيعي',
    'physio.bookWhatsApp': 'حجز العلاج الطبيعي عبر واتساب',
    'facilities.headingDesc': 'معدات حديثة وبيئة نظيفة وملهمة ومجتمع داعم لرحلتك.'
  },
  pt: {
    'nav.about': 'Sobre',
    'nav.services': 'Serviços',
    'nav.pilates': 'Pilates',
    'nav.physio': 'Fisioterapia',
    'nav.facilities': 'Instalações',
    'nav.team': 'Equipe',
    'nav.book': 'Agendar',
    'hero.title': 'Cuidamos de você',
    'hero.subtitle': 'Bem‑estar personalizado com Pilates clínico e fisioterapia de alto nível em Abu Dhabi e em todo os Emirados.',
    'hero.ctaPilates': 'Explorar Pilates',
    'hero.ctaPhysio': 'Explorar Fisioterapia',
    'hero.ctaWhatsApp': 'Agendar pelo WhatsApp',
    'about.heading': 'Sobre nós',
    'about.disclaimer': 'As informações médicas são gerais e não constituem aconselhamento individual. Os planos de tratamento são personalizados; resultados e prazos de recuperação variam por paciente e condição.',
    'services.heading': 'Nossos serviços',
    'cta.contact': 'Contato',
    'cta.bookConsult': 'Agendar consulta',
    'cta.bookNow': 'Agendar agora',
    'section.pilates': 'Pilates',
    'section.physio': 'Fisioterapia',
    'section.facilities': 'Instalações',
    'section.team': 'Equipe',
    'section.contact': 'Contato e Agendamento',
    'services.clinicalPilates': 'Pilates Clínico',
    'services.clinicalPilates.desc': 'Pilates terapêutico conduzido por instrutores certificados para desenvolver estabilidade do core, restaurar mobilidade e aprimorar o controle postural. Os programas integram Mat, Reformer, Cadillac e Chair para apoiar a reabilitação e o condicionamento.',
    'services.elitePhysio': 'Fisioterapia de Elite',
    'services.elitePhysio.desc': 'Protocolos avançados para reabilitação pós‑cirúrgica, retorno esportivo, cuidados da coluna, terapia manual, acupuntura e modalidades. Os planos são individualizados e atualizados com progressões baseadas em evidências.',
    'services.vipCare': 'Atendimento VIP Privado',
    'services.vipCare.desc': 'Serviço particular premium com total discrição: visitas domiciliarias ou em palácios, agendamento personalizado, equipe multilíngue e equipamentos de ponta para uma experiência impecável.',
    'link.learnMore': 'Saiba mais',
    'pilates.headingDesc': 'Estúdio moderno, instrutores certificados, sessões personalizadas e equipamentos de alto padrão.',
    'pilates.viewSite': 'Ver site de Pilates',
    'pilates.bookWhatsApp': 'Agendar Pilates no WhatsApp',
    'physio.viewSite': 'Ver site de Fisioterapia',
    'physio.bookWhatsApp': 'Agendar Fisioterapia no WhatsApp',
    'facilities.headingDesc': 'Equipamentos modernos, ambiente limpo e inspirador e uma comunidade de apoio para sua jornada.'
  }
}

const serviceImgs = document.querySelectorAll('.services .card img[data-remote]')
serviceImgs.forEach(img => {
  const url = img.getAttribute('data-remote')
  if (!url) return
  const preload = new Image()
  preload.onload = () => {
    img.src = url
  }
  preload.onerror = () => {}
  preload.referrerPolicy = 'no-referrer'
  preload.decoding = 'async'
  preload.loading = 'eager'
  preload.src = url
})
const applyTranslations = locale => {
  const dict = i18n[locale] || i18n.en
  document.documentElement.lang = locale
  document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr'
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n')
    const t = dict[key]
    if (t) el.textContent = t
  })
}
const langSelect = document.getElementById('lang')
if (langSelect) {
  langSelect.addEventListener('change', () => applyTranslations(langSelect.value))
  applyTranslations(langSelect.value || 'en')
}

const modal = document.getElementById('profile-modal')
const backdrop = modal ? modal.querySelector('.modal-backdrop') : null
const closeBtn = modal ? modal.querySelector('.modal-close') : null
const modalTitle = modal ? modal.querySelector('#modal-title') : null
const modalSubtitle = modal ? modal.querySelector('#modal-subtitle') : null
const modalDesc = modal ? modal.querySelector('#modal-desc') : null
const profiles = {
  emelym: {
    title: 'Dr. Emelym Vitor',
    subtitle: 'Senior Physiotherapist • DOH & DHA Licensed',
    desc: 'BPT, PGDip Acupuncture, PGDip Sports Science; specialized in musculoskeletal rehabilitation, sports injuries, acupuncture for pain and functional restoration, post‑surgical recovery, and performance optimization.'
  },
  pilates: {
    title: 'Pilates Team',
    subtitle: 'Certified Instructors • International Experience',
    desc: 'Clinical Pilates specialists delivering personalized sessions using Mat, Reformer, Cadillac, and Chair. Philosophy emphasizes precision, control, breath, and progressive loading tailored to goals.'
  },
  physio: {
    title: 'Physiotherapy Team',
    subtitle: 'Multilingual • Modern Techniques',
    desc: 'Experienced physiotherapists in sports physiotherapy, spine care, manual therapy, acupuncture, and post‑surgical rehabilitation. Care is individualized, education‑forward, and evidence‑based.'
  }
}
let lastFocus = null
const openModal = id => {
  if (!modal) return
  const p = profiles[id]
  if (!p) return
  if (modalTitle) modalTitle.textContent = p.title
  if (modalSubtitle) modalSubtitle.textContent = p.subtitle
  if (modalDesc) modalDesc.textContent = p.desc
  modal.classList.add('show')
  modal.setAttribute('aria-hidden', 'false')
  lastFocus = document.activeElement
  if (closeBtn) closeBtn.focus()
  document.body.style.overflow = 'hidden'
}
const closeModal = () => {
  if (!modal) return
  modal.classList.remove('show')
  modal.setAttribute('aria-hidden', 'true')
  document.body.style.overflow = ''
  if (lastFocus) lastFocus.focus()
}
document.querySelectorAll('.team-profile').forEach(btn => {
  btn.addEventListener('click', () => openModal(btn.getAttribute('data-profile')))
})
if (backdrop) {
  backdrop.addEventListener('click', closeModal)
}
if (closeBtn) {
  closeBtn.addEventListener('click', closeModal)
}
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && modal && modal.classList.contains('show')) {
    closeModal()
  }
})
if (modal) {
  const focusable = () => Array.from(modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')).filter(el => !el.hasAttribute('disabled'))
  modal.addEventListener('keydown', e => {
    if (e.key === 'Tab' && modal.classList.contains('show')) {
      const els = focusable()
      const first = els[0]
      const last = els[els.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
  })
}
