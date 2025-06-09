document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('timestamp').value = new Date().toLocaleString();
    document.querySelectorAll('.membership-card button').forEach(btn => {
      btn.addEventListener('click', function() {
        const modalId = this.dataset.modal;
        document.getElementById(modalId).style.display = 'block';
        document.getElementById(modalId).setAttribute('aria-modal', 'true');
        document.getElementById(modalId).setAttribute('tabindex', '-1');
      });
    });
  
    
    document.querySelectorAll('.modal .close').forEach(span => {
      span.addEventListener('click', function() {
        const modalId = this.dataset.close;
        document.getElementById(modalId).style.display = 'none';
      });
    });
  
 
    document.querySelectorAll('.membership-card').forEach((card, i) => {
      card.style.opacity = 0;
      card.style.transform = 'translateY(30px)';
      setTimeout(() => {
        card.style.transition = 'opacity 0.7s, transform 0.7s';
        card.style.opacity = 1;
        card.style.transform = 'translateY(0)';
      }, 200 + 150 * i);
    });
  });
  