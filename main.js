import { auth, db } from './firebase-config.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js';
import { collection, addDoc } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js';

// Sign Up
const signupForm = document.getElementById('signup-form');
if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const name = document.getElementById('name').value;

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await addDoc(collection(db, 'students'), {
                uid: userCredential.user.uid,
                name: name,
                email: email
            });
            alert('Sign Up Successful!');
        } catch (error) {
            alert(error.message);
        }
    });
}

// Login
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert('Login Successful!');
            window.location.href = 'career-selection.html'; // Redirect to career selection page after login
        } catch (error) {
            alert(error.message);
        }
    });
}
