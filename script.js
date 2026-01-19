// ===== Simple config =====
// Change this to whatever secret you want (tell only Siris!)
const SECRET_PASSWORD = "siri";

// ===== Password gate =====
const lockScreen = document.getElementById("lock-screen");
const passwordInput = document.getElementById("password-input");
const unlockBtn = document.getElementById("unlock-btn");
const passwordError = document.getElementById("password-error");
const page = document.getElementById("page");

function unlockSite() {
  const value = (passwordInput.value || "").trim();
  if (!value) {
    passwordError.textContent = "Type something first, drama queen 😌";
    return;
  }

  if (value.toLowerCase() === SECRET_PASSWORD.toLowerCase()) {
    passwordError.textContent = "";
    lockScreen.style.transition = "opacity 0.5s ease";
    lockScreen.style.opacity = "0";
    lockScreen.style.pointerEvents = "none";
    setTimeout(() => {
      lockScreen.style.display = "none";
    }, 520);
    page.classList.add("visible");
  } else {
    passwordError.textContent = "Nope, that’s not the one. Try again, genius.";
    passwordInput.classList.add("shake");
    setTimeout(() => passwordInput.classList.remove("shake"), 420);
  }
}

unlockBtn.addEventListener("click", unlockSite);
passwordInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    unlockSite();
  }
});

// If you want to preview without password, set to true
const SKIP_PASSWORD_FOR_DEV = false;
if (SKIP_PASSWORD_FOR_DEV) {
  lockScreen.style.display = "none";
  page.classList.add("visible");
}

// ===== Smooth scroll buttons =====
document.querySelectorAll("[data-scroll-to]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = document.querySelector(btn.dataset.scrollTo);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// ===== Floating emojis (hearts / sparkles) =====
const floatingLayer = document.getElementById("floating-layer");
const EMOJIS = ["💖", "✨", "🌸", "💜", "⭐", "🎈"];

function createFloatThing() {
  if (!floatingLayer) return;
  const span = document.createElement("span");
  span.className = "float-thing";
  span.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];

  const duration = 8 + Math.random() * 7;
  const delay = Math.random() * 2;
  const left = Math.random() * 100;
  const xOffset = (Math.random() - 0.5) * 40;

  span.style.left = `${left}vw`;
  span.style.setProperty("--x-offset", `${xOffset}vw`);
  span.style.animationDuration = `${duration}s`;
  span.style.animationDelay = `${delay}s`;

  floatingLayer.appendChild(span);

  setTimeout(() => {
    if (span.parentNode === floatingLayer) {
      floatingLayer.removeChild(span);
    }
  }, (duration + delay) * 1000 + 200);
}

for (let i = 0; i < 28; i++) {
  setTimeout(createFloatThing, i * 350);
}
setInterval(createFloatThing, 900);

// ===== Reveal sections on scroll =====
const sections = document.querySelectorAll(".section");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.18,
  }
);

sections.forEach((sec) => observer.observe(sec));

// ===== Flip wish cards =====
document.querySelectorAll(".wish-card").forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.toggle("flipped");
  });
});

// ===== Tiny Siri AI – playful rule-based replies =====
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const chatMessages = document.getElementById("chat-messages");

function addMessage(text, from = "siri") {
  const wrapper = document.createElement("div");
  wrapper.className = `message ${from}`;
  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.textContent = text;
  wrapper.appendChild(bubble);
  chatMessages.appendChild(wrapper);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getSiriReply(message) {
  const m = message.toLowerCase();

  if (m.includes("hello") || m.includes("hi") || m.includes("hey")) {
    return "Hey Siri! 🎉 Happy Birthday! I'm here to remind you that you're absolutely amazing and can achieve anything you want. What would you like to talk about?";
  }

  if (m.includes("why") && m.includes("special")) {
    return "You're special because you have dreams, you have passion, and you have the strength to make them happen. You're unique, powerful, and destined for greatness. Never forget that! ✨";
  }

  if (m.includes("pep talk") || m.includes("motivate") || m.includes("motivation") || m.includes("encourage")) {
    return "Listen up, Siri! You are CAPABLE. You are STRONG. You are BRILLIANT. Every single dream you have is achievable. Don't let doubt stop you. You've got the power to make it happen. Go chase those dreams! 🚀";
  }

  if (m.includes("dream") || m.includes("dreams") || m.includes("achieve") || m.includes("goal")) {
    return "Your dreams are not just dreams—they're your future reality waiting to happen. You have everything inside you to achieve them. Take one step at a time, stay focused, and never give up. You're going to make it! 💪";
  }

  if (m.includes("sad") || m.includes("anxious") || m.includes("anxiety") || m.includes("worried")) {
    return "It's okay to feel that way sometimes. But remember: you're stronger than your fears. Take a deep breath. You've overcome challenges before, and you'll overcome this too. You've got this! 💜";
  }

  if (m.includes("happy") || m.includes("birthday")) {
    return "🎉🎂 HAPPY BIRTHDAY SIRI! 🎂🎉 Today is YOUR day! Celebrate yourself, your dreams, and all the amazing things you're going to achieve this year. You deserve all the happiness in the world!";
  }

  if (m.includes("future") || m.includes("scared") || m.includes("fear") || m.includes("afraid")) {
    return "The future might seem scary, but it's also full of possibilities. You have the power to shape it. Trust yourself, trust your journey, and take it one step at a time. Your future is bright because YOU are bright! 🌟";
  }

  if (m.includes("compliment") || m.includes("say something nice") || m.includes("nice")) {
    return "You are incredible, Siri! You're smart, strong, beautiful inside and out, and you have the power to achieve anything. Your dreams are valid, your goals are reachable, and you're going to make amazing things happen! 💖";
  }

  if (m.includes("love") || m.includes("loved")) {
    return "You are SO loved, Siri! Not just today, but every single day. You have people who believe in you, support you, and know you can achieve anything. You're never alone in this journey! ❤️";
  }

  if (m.includes("strong") || m.includes("power") || m.includes("can i")) {
    return "YES, you CAN! You are strong enough, smart enough, and capable enough to do anything you set your mind to. Don't doubt yourself. You've got this! 💪✨";
  }

  if (m.includes("thank")) {
    return "You're so welcome! I'm here to remind you how amazing you are. Now go out there and chase those dreams! You've got this! 🎉";
  }

  // default - more motivating
  const genericReplies = [
    "You're doing amazing, Siri! Keep believing in yourself and your dreams. You can achieve anything! 💫",
    "Remember: every expert was once a beginner. You're on your way to greatness. Keep going! 🚀",
    "You have so much potential, Siri. Your dreams are valid and achievable. Don't give up! ✨",
    "I believe in you, Siri! You're stronger than you think and capable of achieving everything you want! 💪",
  ];
  return genericReplies[Math.floor(Math.random() * genericReplies.length)];
}

if (chatForm && chatInput && chatMessages) {
  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = chatInput.value.trim();
    if (!text) return;

    addMessage(text, "user");
    chatInput.value = "";

    setTimeout(() => {
      const reply = getSiriReply(text);
      addMessage(reply, "siri");
    }, 450);
  });
}

// ===== Simple text‑to‑speech helper (for voice “Happy Birthday”) =====
function speak(text) {
  if (!("speechSynthesis" in window)) {
    return; // Browser doesn't support voice, just skip
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1;
  utterance.pitch = 1.05;
  utterance.volume = 1;

  // try to pick a softer English voice if available
  const voices = window.speechSynthesis.getVoices();
  const niceVoice =
    voices.find((v) => /female/i.test(v.name)) ||
    voices.find((v) => /Google UK English Female/i.test(v.name)) ||
    voices.find((v) => /en/i.test(v.lang)) ||
    null;
  if (niceVoice) {
    utterance.voice = niceVoice;
  }

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

// ===== Happy Birthday Button =====
const birthdayBtn = document.getElementById("birthday-btn");
if (birthdayBtn) {
  birthdayBtn.addEventListener("click", () => {
    if (!chatMessages) return;

    // Add celebration effect
    birthdayBtn.style.transform = "scale(0.95)";
    setTimeout(() => {
      birthdayBtn.style.transform = "scale(1)";
    }, 150);

    // Speak out loud
    speak("Happy birthday, Siri!");

    // Add the birthday messages into chat
    const birthdayMessages = [
      "🎉🎂🎉 HAPPY BIRTHDAY SIRI! 🎉🎂🎉",
      "Today is YOUR special day!",
      "You are amazing, beautiful, strong, and capable of achieving ANYTHING you want!",
      "Your dreams are valid, your goals are reachable, and your future is BRIGHT!",
      "Keep chasing those dreams, keep believing in yourself, and never give up!",
      "You've got this, Siri! The world is waiting for you to shine! ✨",
      "Happy Birthday, beautiful! Here's to another year of greatness! 🎈💖",
    ];

    birthdayMessages.forEach((msg, index) => {
      setTimeout(() => {
        addMessage(msg, "siri");
      }, index * 800);
    });
  });
}


