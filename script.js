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

          // Close mobile menu if open
          const navbarCollapse = document.querySelector('.navbar-collapse');
          if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: true });
          }

          window.scrollTo({
            top: targetElement.offsetTop - navbarHeight, 
            behavior: 'smooth' 
          });
          
          // Add focus for accessibility
          targetElement.focus();
        }
      });
      
      // Add keyboard support
      link.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
          event.preventDefault();
          this.click();
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

    document.querySelectorAll('.fst-normal, .large, .list-new, #hall-of-fame, .slider, section').forEach(el => {
      el.classList.add('reveal-hidden');
      revealObserver.observe(el);
    });

    // Back to top button with enhanced functionality
    const backBtn = document.createElement('button');
    backBtn.id = 'back-to-top';
    backBtn.setAttribute('aria-label', 'Scroll to top of page');
    backBtn.setAttribute('title', 'Back to top');
    backBtn.innerHTML = '↑';
    document.body.appendChild(backBtn);

    const toggleBackBtn = () => {
      if (window.scrollY > 400) backBtn.classList.add('visible'); 
      else backBtn.classList.remove('visible');
    };
    
    toggleBackBtn();
    window.addEventListener('scroll', toggleBackBtn);
    backBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // Set focus to main heading after scroll
      document.querySelector('h2')?.focus();
    });
    
    // Keyboard shortcut: Home key to go to top
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Home') {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });

    // Navbar shadow on scroll with smooth transition
    const nav = document.querySelector('.navbar');
    const onScroll = () => {
      if (window.scrollY > 10) nav.classList.add('nav-shadow'); 
      else nav.classList.remove('nav-shadow');
    };
    
    onScroll();
    window.addEventListener('scroll', onScroll);

    // Pause slider animation on hover and touch
    const slider = document.querySelector('.slider');
    const slideTrack = document.querySelector('.slide-track');
    
    if (slider && slideTrack) {
      // Mouse events
      slider.addEventListener('mouseenter', () => {
        slideTrack.style.animationPlayState = 'paused';
      });
      
      slider.addEventListener('mouseleave', () => {
        slideTrack.style.animationPlayState = 'running';
      });
      
      // Touch events - tap to toggle pause
      let lastTouchTime = 0;
      slider.addEventListener('touchstart', () => {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTouchTime;
        
        if (tapLength < 300) {
          // Double tap to toggle
          const paused = slideTrack.style.animationPlayState === 'paused';
          slideTrack.style.animationPlayState = paused ? 'running' : 'paused';
        }
        lastTouchTime = currentTime;
      });
    }
    
    // Add smooth scroll behavior feedback
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      document.body.style.scrollBehavior = 'smooth';
      
      scrollTimeout = setTimeout(() => {
        document.body.style.scrollBehavior = 'auto';
      }, 1000);
    });
  });
