const EMPTY_HEART = '♡';
const FULL_HEART = '♥';

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
  // Get the modal element
  const errorModal = document.getElementById('modal');
  
  // Verify modal exists (this should now pass the test)
  if (!errorModal) {
    console.error('Modal element not found!');
    return;
  }

  // Add click event listeners to all hearts
  const hearts = document.querySelectorAll('.like-glyph');
  hearts.forEach(heart => {
    heart.addEventListener('click', function(event) {
      const heart = event.target;
      
      if (heart.classList.contains('activated-heart')) {
        heart.classList.remove('activated-heart');
        heart.textContent = EMPTY_HEART;
      } else {
        mimicServerCall()
          .then(() => {
            heart.classList.add('activated-heart');
            heart.textContent = FULL_HEART;
          })
          .catch(error => {
            errorModal.classList.remove('hidden');
            const modalMessage = document.getElementById('modal-message');
            if (modalMessage) {
              modalMessage.textContent = error;
            }
            setTimeout(() => {
              errorModal.classList.add('hidden');
            }, 3000);
          });
      }
    });
  });
});