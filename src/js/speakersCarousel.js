document.addEventListener('DOMContentLoaded', function () {
  const triggers = document.querySelectorAll('.popup--trigger');
  const popups = document.querySelectorAll('.popup');

  // Open popup
  triggers.forEach((trigger) => {
    trigger.addEventListener('click', function () {
      const popupId = this.getAttribute('data-popup');
      const popup = document.getElementById(popupId);
      if (popup) popup.classList.add('popup--active');
    });
  });

  // Function to close popups
  function closePopup(popup) {
    if (popup) popup.classList.remove('popup--active');
  }

  // Close popup on click outside or close button
  popups.forEach((popup) => {
    const closeBtn = popup.querySelector('.popup__close');
    closeBtn.addEventListener('click', () => closePopup(popup));

    popup.addEventListener('click', (event) => {
      if (event.target === popup) {
        closePopup(popup);
      }
    });
  });

  // Close popup when pressing ESC key
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      popups.forEach((popup) => closePopup(popup));
    }
  });
});
