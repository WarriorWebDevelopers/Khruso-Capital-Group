(function () {
  "use strict";
   
  /**
   * <!--Start of Tawk.to Script-->
   */
   var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
   (function(){
   var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
   s1.async=true;
   s1.src='https://embed.tawk.to/653b03dff2439e1631e8dbfa/1hdn8e8p2';
   s1.charset='UTF-8';
   s1.setAttribute('crossorigin','*');
   s0.parentNode.insertBefore(s1,s0);
   })();


   /**
   * Popup Box
   */
   // Display the entire page after a delay with a fade-in effect
   setTimeout(function() {
      document.body.style.opacity = '1';

      // Display the popup after a delay when the page loads
      setTimeout(function() {
      openPopup();

      // Close the popup after 5000 milliseconds (5 seconds)
      setTimeout(function() {
         closePopup();
      }, 6000);
      }, 1000); // 1000 milliseconds (1 second) delay after the page fade-in
   }, 5000); // 1000 milliseconds (1 second) delay for page load

   function openPopup() {
      document.getElementById('popupOverlay').style.display = 'flex';
      document.getElementById('popupOverlay').style.opacity = '1';
      document.getElementById('popupBox').style.opacity = '1';
   }

   function closePopup() {
      document.getElementById('popupOverlay').style.opacity = '0';
      document.getElementById('popupBox').style.opacity = '0';
      setTimeout(function() {
      document.getElementById('popupOverlay').style.display = 'none';
      }, 1000); // 1000 milliseconds (1 second) delay for the fade-out transition
   }


  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
     el = el.trim()
     if (all) {
        return [...document.querySelectorAll(el)]
     } else {
        return document.querySelector(el)
     }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
     let selectEl = select(el, all)
     if (selectEl) {
        if (all) {
           selectEl.forEach(e => e.addEventListener(type, listener))
        } else {
           selectEl.addEventListener(type, listener)
        }
     }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
     el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
     let position = window.scrollY + 200
     navbarlinks.forEach(navbarlink => {
        if (!navbarlink.hash) return
        let section = select(navbarlink.hash)
        if (!section) return
        if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
           navbarlink.classList.add('active')
        } else {
           navbarlink.classList.remove('active')
        }
     })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
     let header = select('#header')
     let offset = header.offsetHeight

     if (!header.classList.contains('header-scrolled')) {
        offset -= 16
     }

     let elementPos = select(el).offsetTop
     window.scrollTo({
        top: elementPos - offset,
        behavior: 'smooth'
     })
  }

  /**
   * Header fixed top on scroll
   */
  let selectHeader = select('#header')
  if (selectHeader) {
     let headerOffset = selectHeader.offsetTop
     let nextElement = selectHeader.nextElementSibling
     const headerFixed = () => {
        if ((headerOffset - window.scrollY) <= 0) {
           selectHeader.classList.add('fixed-top')
           nextElement.classList.add('scrolled-offset')
        } else {
           selectHeader.classList.remove('fixed-top')
           nextElement.classList.remove('scrolled-offset')
        }
     }
     window.addEventListener('load', headerFixed)
     onscroll(document, headerFixed)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
     const toggleBacktotop = () => {
        if (window.scrollY > 100) {
           backtotop.classList.add('active')
        } else {
           backtotop.classList.remove('active')
        }
     }
     window.addEventListener('load', toggleBacktotop)
     onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function (e) {
     select('#navbar').classList.toggle('navbar-mobile')
     this.classList.toggle('bi-list')
     this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function (e) {
     if (select('#navbar').classList.contains('navbar-mobile')) {
        e.preventDefault()
        this.nextElementSibling.classList.toggle('dropdown-active')
     }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function (e) {
     if (select(this.hash)) {
        e.preventDefault()

        let navbar = select('#navbar')
        if (navbar.classList.contains('navbar-mobile')) {
           navbar.classList.remove('navbar-mobile')
           let navbarToggle = select('.mobile-nav-toggle')
           navbarToggle.classList.toggle('bi-list')
           navbarToggle.classList.toggle('bi-x')
        }
        scrollto(this.hash)
     }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
     if (window.location.hash) {
        if (select(window.location.hash)) {
           scrollto(window.location.hash)
        }
     }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
     window.addEventListener('load', () => {
        preloader.remove()
     });
  }

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
     selector: '.glightbox'
  });

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
     new Waypoint({
        element: skilsContent,
        offset: '80%',
        handler: function (direction) {
           let progress = select('.progress .progress-bar', true);
           progress.forEach((el) => {
              el.style.width = el.getAttribute('aria-valuenow') + '%'
           });
        }
     })
  }

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
     speed: 600,
     loop: true,
     autoplay: {
        delay: 5000,
        disableOnInteraction: false
     },
     slidesPerView: 'auto',
     pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
     }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
     let portfolioContainer = select('.portfolio-container');
     if (portfolioContainer) {
        let portfolioIsotope = new Isotope(portfolioContainer, {
           itemSelector: '.portfolio-item'
        });

        let portfolioFilters = select('#portfolio-flters li', true);

        on('click', '#portfolio-flters li', function (e) {
           e.preventDefault();
           portfolioFilters.forEach(function (el) {
              el.classList.remove('filter-active');
           });
           this.classList.add('filter-active');

           portfolioIsotope.arrange({
              filter: this.getAttribute('data-filter')
           });
           portfolioIsotope.on('arrangeComplete', function () {
              AOS.refresh()
           });
        }, true);
     }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
     selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
     speed: 400,
     loop: true,
     autoplay: {
        delay: 5000,
        disableOnInteraction: false
     },
     pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
     }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
     AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
     })
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

  /** Slider Section */
  document.addEventListener('DOMContentLoaded', function () {
     const tabs = document.querySelectorAll('.tab');
     const items = document.querySelectorAll('.slider-item');
     const container = document.querySelector('.slider-wrapper'); // Update with the correct class or ID

     tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
           tabs.forEach(t => t.classList.remove('active'));
           tab.classList.add('active');

           // Calculate the scroll position based on the item's position
           const scrollPosition = items[index].offsetLeft - container.offsetLeft;

           // Scroll the container to the desired position
           container.scroll({
              left: scrollPosition,
              behavior: 'smooth'
           });
        });
     });
  });

  $(document).ready(function () {
   $('.owl-carousel').owlCarousel({
       items: 1,
       loop: true,
       margin: 10,
       autoplay: true,
       autoplayTimeout: 3000,
       autoplayHoverPause: true,
       nav: true,
       dots: true
   });

   $('.item').each(function () {
       var videoSrc = $(this).data('src');
       var videoId = videoSrc.match(/\/embed\/([a-zA-Z0-9_-]*)/)[1];
       var thumbnailUrl = 'https://img.youtube.com/vi/' + videoId + '/maxresdefault.jpg';
       $(this).append('<img src="' + thumbnailUrl + '" alt="Video Thumbnail">');
   });

   $('.item').on('click', function () {
       var videoSrc = $(this).data('src');
       $('<div class="video-popup"><iframe width="560" height="315" src="' + videoSrc + '" frameborder="0" allowfullscreen></iframe></div>').appendTo('body');
   });

   $(document).on('click', '.video-popup', function () {
       $(this).remove();
   });
});
})()