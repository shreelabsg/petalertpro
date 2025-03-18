// Detect if the website is running on staging or production
const isStaging = window.location.hostname.includes("staging");
const paddleMode = "S"

// Define Cloudflare API base URLs
const API_BASE_URL = isStaging
  ? "https://staging-petalertpro.contact-shreelabs.workers.dev"
  : "https://petalertpro.contact-shreelabs.workers.dev";

// Paddle Configuration (No direct Paddle reference here)
const PADDLE_SANDBOX_PRICE_ID = "pro_01jpm9qccy1m6r8wtf2m4e1vgf"; // ✅ Sandbox Price ID
const PADDLE_LIVE_PRICE_ID = "pro_01jpa33a3x17h693xhmv71g3c9"; // ✅ Live Price ID

// Choose the correct Paddle Price ID
const PADDLE_PRICE_ID = isStaging || paddleMode === "S" ? PADDLE_SANDBOX_PRICE_ID : PADDLE_LIVE_PRICE_ID;

// Helper function to make API calls
function apiRequest(endpoint, options = {}) {
  return fetch(`${API_BASE_URL}${endpoint}`, options)
    .then(response => response)
    .catch(error => console.error("API Error:", error));
}


