// Detect if the website is running on staging or production
const isStaging = false;
const PADDLE_MODE = isStaging ? "sandbox" : "production"; //production or sandbox

const SUPPORT_EMAIL = "support@petalertpro.com";
// Define Cloudflare API base URLs
const API_BASE_URL = isStaging
  ? ""
  : "https://petalertpro.contact-shreelabs.workers.dev";

// Paddle Configuration (No direct Paddle reference here)
const PADDLE_SANDBOX_PRICE_ID =  "";  // ✅ Sandbox Price ID
const PADDLE_LIVE_PRICE_ID = "pri_01jpm9ze2ry6f9rfk7gs7grcaq"; // ✅ Live Price ID

const PADDLE_SANDBOX_CLIENT_TOKEN =  ""; // 
const PADDLE_LIVE_CLIENT_TOKEN = "live_85cadfbd55315b2bf3f4bc58653"; // 

const CLIENT_TOKEN = isStaging || PADDLE_MODE === "sandbox" ? PADDLE_SANDBOX_CLIENT_TOKEN : PADDLE_LIVE_CLIENT_TOKEN;

// Choose the correct Paddle Price ID
const PADDLE_PRICE_ID = isStaging || PADDLE_MODE === "sandbox" ? PADDLE_SANDBOX_PRICE_ID : PADDLE_LIVE_PRICE_ID;

// Helper function to make API calls
async function apiRequest(endpoint, options = {}) {
  const token = await generateJWT();

  const headers = {
    ...(options.headers || {}),
    "Authorization": `Bearer ${token}`
  };

  return fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers
  }).then(response => response)
    .catch(error => console.error("API Error:", error));
}


  function adjustBodyPadding() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      document.body.style.paddingTop = navbar.offsetHeight + 'px';
    }
  }

  // Run once on page load
  window.addEventListener('load', adjustBodyPadding);

  // Run again if window is resized (e.g., screen rotates or browser resized)
  window.addEventListener('resize', adjustBodyPadding);

function toggleMenu() {
const navLinks = document.getElementById("navLinks");
navLinks.classList.toggle("active");

}


function generateJWT() {
  const secret = "petalert-shared-secret"; // 🔐 Must match the Worker!
  const header = {
    alg: "HS256",
    typ: "JWT"
  };

  const payload = {
    sub: "petalert-ui",
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 300 // ⏳ expires in 5 minutes
  };

  const base64url = str =>
    btoa(JSON.stringify(str))
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");

  const unsignedToken = `${base64url(header)}.${base64url(payload)}`;

  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);

  return crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  ).then(key => crypto.subtle.sign("HMAC", key, encoder.encode(unsignedToken)))
    .then(sig => {
      const signature = btoa(String.fromCharCode(...new Uint8Array(sig)))
        .replace(/=/g, "")
        .replace(/\+/g, "-")
        .replace(/\//g, "_");
      return `${unsignedToken}.${signature}`;
    });
}

