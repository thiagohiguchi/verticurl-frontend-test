// Create the IntersectionObserver instance
const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('steps__item--inview');
        observer.unobserve(entry.target); // Optional: stop observing after it comes into view
      }
    });
  },
  {
    threshold: 0.5, // Trigger when 50% of the element is in view
  }
);

// Target all elements with the class .scroll-item
document.querySelectorAll('.steps__item').forEach((item) => {
  observer.observe(item);
});
