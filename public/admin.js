import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

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
const reviewsCol = collection(db, "reviews");

// --- DOM Elements ---
const form = document.getElementById("review-form");
const reviewList = document.getElementById("review-list");

// --- Load Existing Reviews ---
async function loadReviews() {
  reviewList.innerHTML = "<p>Loading reviews...</p>";
  const snapshot = await getDocs(reviewsCol);
  const reviews = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  reviewList.innerHTML = "";

  if (reviews.length === 0) {
    reviewList.innerHTML = "<p>No reviews yet.</p>";
    return;
  }

  reviews.forEach(r => {
    const div = document.createElement("div");
    div.classList.add("review-item");
    div.innerHTML = `
      <h3>${r.restaurant} (${r.rating}⭐)</h3>
      <p>${r.comment}</p>
      <p><strong>Address:</strong> ${r.address}</p>
      <p><strong>Images:</strong> ${(r.images || []).join(", ")}</p>
      <button data-id="${r.id}" class="delete-btn">Delete</button>
    `;
    reviewList.appendChild(div);
  });

  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", async (e) => {
      const id = e.target.dataset.id;
      await deleteDoc(doc(db, "reviews", id));
      loadReviews();
    });
  });
}

// --- Add or Update Review ---
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const restaurant = form.restaurant.value.trim();
  const rating = parseInt(form.rating.value);
  const comment = form.comment.value.trim();
  const address = form.address.value.trim();
  const images = form.images.value.split(",").map(s => s.trim()).filter(Boolean);

  await addDoc(reviewsCol, { restaurant, rating, comment, address, images });
  form.reset();
  loadReviews();
});

// --- Initialize ---
loadReviews();
