// admin.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBfsNVnz82BM1KvQuksXywK8nLqgcdC4-o",
  authDomain: "kbcq-e3a4f.firebaseapp.com",
  projectId: "kbcq-e3a4f",
  storageBucket: "kbcq-e3a4f.firebasestorage.app",
  messagingSenderId: "763431750367",
  appId: "1:763431750367:web:f0df6a15426298b8fbf76a",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Login
const loginBtn = document.getElementById("login-btn");
const logoutBtn = document.getElementById("logout-btn");
const loginContainer = document.getElementById("login-container");
const dashboard = document.getElementById("dashboard");
const message = document.getElementById("login-message");

loginBtn.addEventListener("click", async () => {
  const email = document.getElementById("admin-email").value;
  const password = document.getElementById("admin-password").value;
  try {
    await signInWithEmailAndPassword(auth, email, password);
    loginContainer.classList.add("hidden");
    dashboard.classList.remove("hidden");
    loadReviews();
  } catch (err) {
    message.textContent = "Login failed. Check credentials.";
  }
});

logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
  dashboard.classList.add("hidden");
  loginContainer.classList.remove("hidden");
});

// Add Review
const addForm = document.getElementById("add-review-form");
addForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const location = document.getElementById("location").value;
  const website = document.getElementById("website").value;
  const description = document.getElementById("description").value;
  const rating = parseInt(document.getElementById("rating").value);
  const photo = document.getElementById("photo").value;

  try {
    await addDoc(collection(db, "reviews"), { name, location, website, description, rating, photo });
    alert("Review added!");
    addForm.reset();
    loadReviews();
  } catch (err) {
    alert("Error adding review");
  }
});

// Load and Delete Reviews
async function loadReviews() {
  const list = document.getElementById("admin-review-list");
  list.innerHTML = "";

  const snapshot = await getDocs(collection(db, "reviews"));
  snapshot.forEach((docSnap) => {
    const r = docSnap.data();
    const div = document.createElement("div");
    div.classList.add("review-card");
    div.innerHTML = `
      <h3>${r.name}</h3>
      <p>${r.location} — ⭐${r.rating}</p>
      <button class="delete-btn" data-id="${docSnap.id}">Delete</button>
    `;
    list.appendChild(div);
  });

  // Delete listener
  document.querySelectorAll(".delete-btn").forEach((btn) =>
    btn.addEventListener("click", async (e) => {
      const id = e.target.getAttribute("data-id");
      await deleteDoc(doc(db, "reviews", id));
      loadReviews();
    })
  );
}
