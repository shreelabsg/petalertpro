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
function apiRequest(endpoint, options = {}) {
  return fetch(`${API_BASE_URL}${endpoint}`, options)
    .then(response => response)
    .catch(error => console.error("API Error:", error));
}


