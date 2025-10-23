Hey Kim! 🦀💖
Welcome to your *Playful Adventure Edition* of Kim’s Blue Crab Quest!

This folder is your entire working website — animations, Firebase integration, Canva images, everything.  
Here’s how to run, edit, and publish it easily.

----------------------------------------------------------
1️⃣  LAUNCH THE WEBSITE LOCALLY
----------------------------------------------------------
• Open this folder in Visual Studio Code (VS Code).
• Right-click index.html → “Open with Live Server”.
  👉 If you don’t have Live Server, install it from the VS Code Extensions panel (by Ritwick Dey).

Your browser should open to:
http://127.0.0.1:5500/index.html

Watch for:
✅ Title fades in.
✅ Cartoon blue crab scuttles across after ~0.8s.
✅ You’ll hear the bloop-bloop-scuttle sound (muted by default).
✅ Click once anywhere to unmute.

----------------------------------------------------------
2️⃣  CONNECT FIREBASE
----------------------------------------------------------
You’re already connected to:
Project: kbcq-e3a4f  
Auth Email: KimsBlueCrabQuest@gmail.com

In Firebase Console → Firestore Database:
Collections → reviews / comments

Security Rules (already in effect):
• Anyone can read
• Only logged-in admin can write or delete

To reset or test Firebase Auth:
→ Firebase Console → Authentication → Users

----------------------------------------------------------
3️⃣  MANAGE REVIEWS & COMMENTS
----------------------------------------------------------
🦀 PUBLIC SITE (`index.html`)
Displays:
• Canva hero, Meet Kim, Tale of Two Coasts, and Crabpile Dashboard.
• Firestore reviews automatically appear.
• Visitors can read reviews and post comments.

🦀 ADMIN DASHBOARD (`admin.html`)
Allows you to:
• Log in securely with your admin email/password.
• Add, edit, and delete reviews.
• Reviews update live on the public site.

⚙️ Default Sample Data (visible immediately)
Review: Crabby’s Seafood Shack (Annapolis, MD)
Comment: SandyTraveler22 (“Loved Kim’s review!”)

----------------------------------------------------------
4️⃣  EDIT CANVA IMAGES
----------------------------------------------------------
All visuals are inside the /assets/ folder.
Just replace:
1.png – Hero banner  
2.png – Meet Kim section  
3.png – Tale of Two Coasts  
4.png – Crabpile dashboard  
crab.mp3 – “bloop-bloop-scuttle!” sound  

Keep the same filenames to make swapping seamless.

----------------------------------------------------------
5️⃣  PUBLISH ONLINE
----------------------------------------------------------
OPTION 1 — Netlify (easiest)
• Go to https://www.netlify.com
• Drag-and-drop your KBCQ-Website folder.
• Click “Deploy Site”.

OPTION 2 — Firebase Hosting
• Install Firebase CLI (if not already)
• In VS Code terminal:
   firebase login
   firebase init hosting
   firebase deploy

Your live URL will appear like:
https://kbcq-e3a4f.web.app

----------------------------------------------------------
6️⃣  TROUBLESHOOTING
----------------------------------------------------------
❌ If you see “CORS” or blocked scripts:
   → Always use Live Server, not direct file:// URL.

❌ If no reviews appear:
   → Check Firebase project → Firestore data exists.

❌ If login fails:
   → Confirm email & password in Firebase Auth tab.

----------------------------------------------------------
You’re done, Captain CrabQuest! 🦞🌊
Go chase those crabs, collect those reviews, and keep America’s coastal cuisine shining bright.

— Code GPT
