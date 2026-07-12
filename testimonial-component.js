const testimonialCards = [
  {
    title: "Fantastic coffee",
    text: "I've been using Pack Coffee for about six months now, and it has completely changed my mornings.",
    author: "Daniel Brooks, 1 day ago",
    verified: false,
  },
  {
    title: "Great way of exploring the different roasts",
    text: "Have coffee sent to me every month. I love how it's different every time and still balanced.",
    author: "Faye R, 2 days ago",
    verified: true,
  },
  {
    title: "This is such a fantastic company!",
    text: "This is such a fantastic company. The coffee is always incredible and the flexibility is lovely.",
    author: "Maisie Redfern, 2 days ago",
    verified: false,
  },
  {
    title: "Fantastic Coffee!",
    text: "I bought this for my other half who is trying to cut down on caffeine but loves the ritual.",
    author: "DAVIES, 3 days ago",
    verified: true,
  },
];

function renderTestimonials(mount, variant = "home") {
  if (!mount) return;

  const label = variant === "a2" ? "Testimonials" : "Testimonials";
  mount.innerHTML = `
    <section class="testimonial-strip light-theme" aria-labelledby="${variant}-testimonials-title">
      <div class="testimonial-brand">
        <div class="testimonial-summary">
          <h2 id="${variant}-testimonials-title">Excellent</h2>
          <div class="trust-stars" aria-label="5 star rating">
            <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span><span class="muted">★</span>
          </div>
          <p>Based on 2,910 reviews</p>
          <div class="trustpilot-mark">
            <span>★</span>
            <strong>Trustpilot</strong>
          </div>
        </div>
        <button class="carousel-arrow" type="button" aria-label="Previous reviews">‹</button>
      </div>

      <div class="testimonial-cards" role="list" aria-label="${label}">
        ${testimonialCards
          .map(
            (card) => `
              <article class="testimonial-card" role="listitem">
                <div class="card-rating" aria-label="5 stars">
                  <span>★★★★★</span>
                  ${card.verified ? '<span class="verified">● Verified</span>' : ""}
                </div>
                <h3>${card.title}</h3>
                <p>${card.text}</p>
                <strong>${card.author}</strong>
              </article>
            `
          )
          .join("")}
      </div>

      <button class="carousel-arrow right" type="button" aria-label="Next reviews">›</button>
      <p class="testimonial-note">Showing our 4 &amp; 5 star reviews</p>
    </section>
  `;
}

document.querySelectorAll("[data-testimonial-mount]").forEach((mount) => {
  renderTestimonials(mount, mount.dataset.variant || "home");
});
