import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } 
from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

// 🔥 paste your config here
const firebaseConfig = {
  apiKey: "AIzaSyBKIbsAlxFvUXhAi0W60hb6Tn2L4hi7ITU",
  authDomain: "ccmini-d9d73.firebaseapp.com",
  projectId: "ccmini-d9d73",
  storageBucket: "ccmini-d9d73.firebasestorage.app",
  messagingSenderId: "467598673017",
  appId: "1:467598673017:web:4041a3c58044eccef740a8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ➕ Add Note
window.addNote = async function() {
  const title = document.getElementById("title").value;
  const link = document.getElementById("link").value;

  if (!title || !link) {
    alert("Enter all fields");
    return;
  }

  await addDoc(collection(db, "notes"), {
    title: title,
    link: link
  });

  loadNotes();
};

// 📥 Load Notes
async function loadNotes() {
  const querySnapshot = await getDocs(collection(db, "notes"));
  const list = document.getElementById("notesList");
  list.innerHTML = "";

  querySnapshot.forEach((doc) => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="${doc.data().link}" target="_blank">${doc.data().title}</a>`;
    list.appendChild(li);
  });
}

loadNotes();