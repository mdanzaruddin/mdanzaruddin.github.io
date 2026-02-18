document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');    
    navLinks.forEach(link => {
      link.addEventListener('click', function(event) {
        event.preventDefault(); 
        const targetId = this.getAttribute('href').substring(1); 
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          const navbarHeight = navbar.offsetHeight;

          window.scrollTo({
            top: targetElement.offsetTop - navbarHeight, 
            behavior: 'smooth' 
          });
        }
      });
    });
  });

  // UX Enhancements: reveal-on-scroll, back-to-top, navbar shadow, pause slider
  document.addEventListener('DOMContentLoaded', function() {
    // Reveal on scroll using IntersectionObserver
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.fst-normal, .large, .list-new, #hall-of-fame, .slider').forEach(el => {
      el.classList.add('reveal-hidden');
      revealObserver.observe(el);
    });

    // Back to top button
    const backBtn = document.createElement('button');
    backBtn.id = 'back-to-top';
    backBtn.title = 'Back to top';
    backBtn.innerHTML = '↑';
    document.body.appendChild(backBtn);

    const toggleBackBtn = () => {
      if (window.scrollY > 400) backBtn.classList.add('visible'); else backBtn.classList.remove('visible');
    };
    toggleBackBtn();
    window.addEventListener('scroll', toggleBackBtn);
    backBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // Navbar shadow on scroll
    const nav = document.querySelector('.navbar');
    const onScroll = () => {
      if (window.scrollY > 10) nav.classList.add('nav-shadow'); else nav.classList.remove('nav-shadow');
    };
    onScroll();
    window.addEventListener('scroll', onScroll);

    // Pause slider animation on hover (adds pause for touch devices via toggle)
    const slider = document.querySelector('.slider');
    const slideTrack = document.querySelector('.slide-track');
    if (slider && slideTrack) {
      slider.addEventListener('mouseenter', () => slideTrack.style.animationPlayState = 'paused');
      slider.addEventListener('mouseleave', () => slideTrack.style.animationPlayState = 'running');
      // Enable tap-to-pause on touch
      slider.addEventListener('touchstart', () => {
        const paused = slideTrack.style.animationPlayState === 'paused';
        slideTrack.style.animationPlayState = paused ? 'running' : 'paused';
      });
    }
  });