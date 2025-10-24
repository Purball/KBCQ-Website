/* =========================================================
   Kim's Blue Crab Quest (KBCQ v3.9)
   Main Site Logic — Firebase Email Auth, Multiple Photos,
   Restaurant Tags, and JSX/TS-safe syntax
   ========================================================= */

let auth, db, storage;

document.addEventListener('DOMContentLoaded', async () => {
  try {
    if (!firebase.apps.length) {
      console.log("Initializing Firebase...");
      const firebaseConfig = {
        apiKey: "AIzaSyBfsNVnz82BM1KvQuksXywK8nLqgcdC4-o",
        authDomain: "kbcq-e3a4f.firebaseapp.com",
        projectId: "kbcq-e3a4f",
        storageBucket: "kbcq-e3a4f.firebasestorage.app",
        messagingSenderId: "763431750367",
        appId: "1:763431750367:web:f0df6a15426298b8fbf76a",
        measurementId: "G-83GG3HYTXP"
      };
      firebase.initializeApp(firebaseConfig);
    }

    auth = firebase.auth();
    db = firebase.firestore();
    storage = firebase.storage();

    detectAdminLogin();
    loadReviews();
    setupSuggestions();

  } catch (err) {
    console.error("Firebase initialization failed:", err);
  }
});

/* =========================================================
   Detect Admin Login
   ========================================================= */
function detectAdminLogin() {
  const headerAdmin = document.getElementById('admin-link');
  const footerAdmin = document.getElementById('footer-admin-link');

  auth.onAuthStateChanged(user => {
    const show = !!user;
    if (headerAdmin) headerAdmin.style.display = show ? 'block' : 'none';
    if (footerAdmin) footerAdmin.style.display = show ? 'block' : 'none';
  });
}

/* =========================================================
   Load Reviews from Firestore (with multiple photos & tags)
   ========================================================= */
function loadReviews() {
  const container = document.getElementById('reviews-container');
  if (!container) return;

  db.collection('reviews')
    .orderBy('rating', 'desc')
    .onSnapshot(snapshot => {
      container.innerHTML = '';
      const radius = 140;
      const centerX = 200;
      const centerY = 150;
      const reviews = snapshot.docs.map(doc => doc.data());

      if (reviews.length === 0) {
        const msg = document.createElement('p');
        msg.textContent = "No reviews yet — check back soon!";
        msg.style.color = "#fff";
        msg.style.fontStyle = "italic";
        container.appendChild(msg);
        return;
      }

      let yOffset = 20;
      let lastRating = 5;
      let xSpread = 100;

      reviews.forEach((data, i) => {
        if (data.rating !== lastRating) {
          yOffset += 60;
          lastRating = data.rating;
          xSpread += 30;
        }

        const angle = Math.random() * Math.PI * 2;
        const x = centerX + Math.cos(angle) * xSpread;
        const y = centerY + Math.sin(angle) * (radius / 2) + yOffset;

        const card = document.createElement('div');
        card.className = 'review-card';
        const photosHTML = (data.photoURLs && data.photoURLs.length)
          ? data.photoURLs.map(url => `<img src="${url}" alt="Review photo" class="review-photo" />`).join('')
          : '';

        card.innerHTML = `
          <strong>${data.title || 'Untitled'}</strong><br />
          <em>${data.location || ''}</em><br />
          ${'⭐'.repeat(data.rating)}<br />
          ${data.text}<br />
          ${data.restaurantTag ? `<small>${data.restaurantTag}</small><br />` : ''}
          ${photosHTML}
        `;

        container.appendChild(card);
      });
    });
}

/* =========================================================
   Suggestions (Anonymous Submissions)
   ========================================================= */
function setupSuggestions() {
  const form = document.getElementById('suggestion-form');
  const status = document.getElementById('suggestion-status');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const text = document.getElementById('suggestion-text').value.trim();
    if (!text) {
      status.textContent = "Please enter a suggestion before submitting.";
      status.style.color = "red";
      return;
    }

    try {
      await db.collection('suggestions').add({
        text,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
      document.getElementById('suggestion-text').value = '';
      status.textContent = "Thank you! Your suggestion has been added anonymously.";
      status.style.color = "green";
    } catch (err) {
      console.error("Error adding suggestion:", err);
      status.textContent = "Error saving suggestion.";
      status.style.color = "red";
    }
  });
}

/* =========================================================
   Animation: Gentle floating crab
   ========================================================= */
document.addEventListener('mousemove', e => {
  const crab = document.querySelector('.hero-crab');
  if (crab) crab.style.transform = `translateX(${e.clientX * 0.05}px)`;
});
