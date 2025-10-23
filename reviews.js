// reviews.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, serverTimestamp, query, orderBy } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// ✅ Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfsNVnz82BM1KvQuksXywK8nLqgcdC4-o",
  authDomain: "kbcq-e3a4f.firebaseapp.com",
  projectId: "kbcq-e3a4f",
  storageBucket: "kbcq-e3a4f.firebasestorage.app",
  messagingSenderId: "763431750367",
  appId: "1:763431750367:web:f0df6a15426298b8fbf76a",
  measurementId: "G-83GG3HYTXP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ---------- LOAD REVIEWS ----------
async function loadReviews() {
  const reviewList = document.getElementById("review-list");
  reviewList.innerHTML = ""; // clear old data

  const q = query(collection(db, "reviews"), orderBy("rating", "desc"));
  const snapshot = await getDocs(q);

  snapshot.forEach((doc) => {
    const review = doc.data();
    const div = document.createElement("div");
    div.classList.add("review-card");
    div.innerHTML = `
      <h3>${review.name}</h3>
      <p><strong>Location:</strong> ${review.location}</p>
      <p><strong>Rating:</strong> ${"⭐".repeat(review.rating)}</p>
      <p>${review.description}</p>
      ${review.website ? `<a href="${review.website}" target="_blank">Visit Website</a>` : ""}
      ${review.photo ? `<img src="${review.photo}" alt="${review.name}" class="review-photo">` : ""}
    `;
    reviewList.appendChild(div);
  });
}

// ---------- LOAD COMMENTS ----------
async function loadComments() {
  const commentList = document.getElementById("comments-list");
  commentList.innerHTML = "";

  const q = query(collection(db, "comments"), orderBy("timestamp", "desc"));
  const snapshot = await getDocs(q);

  snapshot.forEach((doc) => {
    const comment = doc.data();
    const div = document.createElement("div");
    div.classList.add("comment-card");
    div.innerHTML = `<p><strong>${comment.name}:</strong> ${comment.message}</p>`;
    commentList.appendChild(div);
  });
}

// ---------- SUBMIT COMMENT ----------
const commentForm = document.getElementById("comment-form");
if (commentForm) {
  commentForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("comment-name").value.trim();
    const message = document.getElementById("comment-message").value.trim();
    if (!name || !message) return alert("Please fill out all fields.");

    try {
      await addDoc(collection(db, "comments"), {
        name,
        message,
        timestamp: serverTimestamp(),
      });
      alert("Thanks for your comment, Kim will see it soon!");
      commentForm.reset();
      loadComments(); // reload comments
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  });
}

// ---------- INITIAL LOAD ----------
window.addEventListener("load", () => {
  loadReviews();
  loadComments();
});
