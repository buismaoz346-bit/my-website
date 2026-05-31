import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc, increment, collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCPiGbMS4iyhT42p1ONhygfm7JfcFZQsF8",
  authDomain: "portfolio-db-4a51c.firebaseapp.com",
  projectId: "portfolio-db-4a51c",
  storageBucket: "portfolio-db-4a51c.firebasestorage.app",
  messagingSenderId: "797186178154",
  appId: "1:797186178154:web:a8dddbdea60d1ea91d5e13",
  measurementId: "G-H13D74S54H"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let currentUnsubscribe = null;

// Initialize project document if it doesn't exist
async function initProjectDoc(projectId) {
    const docRef = doc(db, "projects", projectId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
        await setDoc(docRef, { likes: 0 });
    }
}

window.handleLike = async function(projectId) {
    const docRef = doc(db, "projects", projectId);
    const btn = document.querySelector(`#project-modal-${projectId} .like-btn`);
    
    // Prevent spamming
    if(btn && btn.classList.contains('liked')) return;
    if(btn) {
        btn.classList.add('liked');
        btn.innerHTML = `❤️ Liked`;
    }

    try {
        await updateDoc(docRef, {
            likes: increment(1)
        });
    } catch (e) {
        console.error("Error updating likes: ", e);
        // If it failed, maybe the doc doesn't exist yet, try to init and increment
        await initProjectDoc(projectId);
        await updateDoc(docRef, { likes: increment(1) });
    }
};

window.submitComment = async function(projectId) {
    const input = document.querySelector(`#project-modal-${projectId} .comment-input`);
    const nameInput = document.querySelector(`#project-modal-${projectId} .comment-name`);
    
    const text = input.value.trim();
    const author = nameInput.value.trim() || "Anonymous";

    if (!text) return;

    input.value = ""; // clear input
    
    try {
        const commentsRef = collection(db, "projects", projectId, "comments");
        await addDoc(commentsRef, {
            author: author,
            text: text,
            timestamp: serverTimestamp()
        });
    } catch (e) {
        console.error("Error adding comment: ", e);
    }
};

window.renderSocialUI = function(projectId) {
    const modalBody = document.querySelector(`#project-modal-${projectId} .modal-body`);
    if (!modalBody) return;

    // Check if social container already exists, if not, create it
    let socialContainer = modalBody.querySelector('.social-container');
    
    if (!socialContainer) {
        socialContainer = document.createElement('div');
        socialContainer.className = 'social-container glass-panel';
        socialContainer.innerHTML = `
            <div class="social-header">
                <button class="like-btn" onclick="handleLike('${projectId}')">
                    🤍 Like <span class="like-count">0</span>
                </button>
            </div>
            <div class="comments-section">
                <h4>Comments (<span class="comment-count">0</span>)</h4>
                <div class="comments-list" id="comments-list-${projectId}">
                    <!-- Comments injected here -->
                </div>
                <div class="comment-form">
                    <input type="text" class="comment-name" placeholder="Name (optional)" maxlength="30">
                    <div class="comment-input-wrapper">
                        <input type="text" class="comment-input" placeholder="Add a comment..." onkeypress="if(event.key === 'Enter') submitComment('${projectId}')">
                        <button class="comment-submit" onclick="submitComment('${projectId}')">Post</button>
                    </div>
                </div>
            </div>
        `;
        modalBody.appendChild(socialContainer);
    }

    // Cleanup previous listeners if opening a new modal
    if (currentUnsubscribe) {
        currentUnsubscribe();
    }

    // Listen to Likes
    const docRef = doc(db, "projects", projectId);
    initProjectDoc(projectId); // Ensure it exists
    
    const unsubscribeDoc = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
            const data = docSnap.data();
            const likeCountEl = socialContainer.querySelector('.like-count');
            if (likeCountEl) {
                likeCountEl.innerText = data.likes || 0;
            }
        }
    });

    // Listen to Comments
    const commentsRef = collection(db, "projects", projectId, "comments");
    const q = query(commentsRef, orderBy("timestamp", "asc"));
    
    const unsubscribeCol = onSnapshot(q, (snapshot) => {
        const commentsList = socialContainer.querySelector(`#comments-list-${projectId}`);
        const commentCountEl = socialContainer.querySelector('.comment-count');
        if (!commentsList) return;

        commentsList.innerHTML = "";
        let count = 0;

        snapshot.forEach((doc) => {
            count++;
            const data = doc.data();
            const dateStr = data.timestamp ? new Date(data.timestamp.toDate()).toLocaleDateString() : 'Just now';
            
            const commentEl = document.createElement('div');
            commentEl.className = 'comment-item';
            commentEl.innerHTML = `
                <div class="comment-author">${escapeHTML(data.author)} <span class="comment-date">${dateStr}</span></div>
                <div class="comment-text">${escapeHTML(data.text)}</div>
            `;
            commentsList.appendChild(commentEl);
        });
        
        if (commentCountEl) {
            commentCountEl.innerText = count;
        }

        // Auto scroll to bottom
        commentsList.scrollTop = commentsList.scrollHeight;
    });

    currentUnsubscribe = () => {
        unsubscribeDoc();
        unsubscribeCol();
    };
};

function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}
