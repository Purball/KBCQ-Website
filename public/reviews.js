// ===============================
// Kim's Blue Crab Quest Reviews
// ===============================

// --- Firebase Imports ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getFirestore, collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

// --- Firebase Config ---
const firebaseConfig = {
  apiKey: "AIzaSyBfsNVnz82BM1KvQuksXywK8nLqgcdC4-o",
  authDomain: "kbcq-e3a4f.firebaseapp.com",
  projectId: "kbcq-e3a4f",
  storageBucket: "kbcq-e3a4f.firebasestorage.app",
  messagingSenderId: "763431750367",
  appId: "1:763431750367:web:f0df6a15426298b8fbf76a",
  measurementId: "G-83GG3HYTXP"
};

// --- Initialize Firebase ---
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// --- Select Container ---
const reviewsContainer = document.getElementById("reviews-container");

// --- Sample Reviews (Fallback if Firestore empty) ---
const sampleReviews = [
  {
    restaurant: "The Lazy Crab",
    rating: 5,
    comment: "Perfectly seasoned, buttery Maryland-style crab cakes — tastes like home!",
    address: "101 Bayfront Dr, Cape Coral, FL",
    images: ["https://i.imgur.com/nSfvdhA.jpg", "https://i.imgur.com/sXCPxZL.jpg"]
  },
  {
    restaurant: "Crabby’s Dockside",
    rating: 4,
    comment: "Friendly spot! The crab soup had a solid Old Bay kick.",
    address: "1500 SE 47th Terrace, Cape Coral, FL",
    images: ["https://i.imgur.com/X24JhNw.jpg"]
  },
  {
    restaurant: "The Blue Lagoon",
    rating: 3,
    comment: "Good effort, but too much filler in the crab cake.",
    address: "2501 Del Prado Blvd S, Cape Coral, FL",
    images: ["https://i.imgur.com/jnQ1d4D.jpg", "https://i.imgur.com/KV72jxN.jpg"]
  },
  {
    restaurant: "Shell Shack",
    rating: 4,
    comment: "Crab dip was creamy and rich — close to Maryland flavor!",
    address: "1229 Cape Coral Pkwy E, Cape Coral, FL",
    images: ["https://i.imgur.com/8thz8gy.jpg"]
  },
  {
    restaurant: "High Tide Social House",
    rating: 5,
    comment: "Incredible jumbo lump crab — authentic, fresh, and flavorful!",
    address: "1502 Miramar St, Cape Coral, FL",
    images: ["https://i.imgur.com/JlyJ8eU.jpg", "https://i.imgur.com/yHBCvUq.jpg"]
  }
];

// --- Render Reviews ---
function renderReviews(reviews) {
  reviewsContainer.innerHTML = ""; // clear
  if (!reviews || reviews.length === 0) {
    reviewsContainer.innerHTML = `<p>No reviews yet — Kim’s still on the hunt for the best crab! 🦀</p>`;
    return;
  }

  reviews.forEach(r => {
    const card = document.createElement("div");
    card.classList.add("review-card");

    // Star string
    const stars = "⭐".repeat(r.rating || 0);

    // Build image gallery
    let imageHTML = "";
    if (Array.isArray(r.images)) {
      imageHTML = `<div class="review-images">` +
        r.images.map(img => `<img src="${img}" alt="Crab dish">`).join("") +
        `</div>`;
    }

    card.innerHTML = `
      <div class="review-header">
        <h3>${r.restaurant}</h3>
        <div class="stars">${stars}</div>
      </div>
      <p class="address"><strong>Address:</strong> ${r.address || "Unknown"}</p>
      <p class="review-text">${r.comment || ""}</p>
      ${imageHTML}
    `;
    reviewsContainer.appendChild(card);
  });
}

// --- Fetch from Firestore ---
async function loadReviews() {
  try {
    const q = query(collection(db, "reviews"), orderBy("rating", "desc"));
    const snapshot = await getDocs(q);
    const reviews = snapshot.docs.map(doc => doc.data());

    if (reviews.length > 0) {
      renderReviews(reviews.slice(0, 30)); // limit to 30
    } else {
      console.log("⚠️ Firestore empty, loading samples.");
      renderReviews(sampleReviews);
    }
  } catch (err) {
    console.error("❌ Error loading reviews:", err);
    renderReviews(sampleReviews);
  }
}

// --- Initialize on Load ---
window.addEventListener("DOMContentLoaded", loadReviews);
