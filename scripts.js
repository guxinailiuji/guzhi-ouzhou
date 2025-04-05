// 防止页面缩放
window.addEventListener("wheel", (e)=> {
  const isPinching = e.ctrlKey
  if(isPinching) e.preventDefault()
}, { passive: false })

// 当页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
  // 导航链接点击事件
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // 滚动动画效果
  const sections = document.querySelectorAll('.country-section');
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    observer.observe(section);
  });
  
  // 初始可见的部分
  setTimeout(() => {
    const visibleSections = Array.from(sections).filter(section => {
      const rect = section.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    });
    
    visibleSections.forEach(section => {
      section.classList.add('visible');
    });
  }, 100);
});
