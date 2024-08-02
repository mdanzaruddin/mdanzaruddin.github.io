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