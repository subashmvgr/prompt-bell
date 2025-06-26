// === List of default break reminder messages ===
const breakMessages = [
  "Time to stretch your legs!",
  "Grab a glass of water 🥤",
  "Rest your eyes – look away from the screen 👀",
  "Do a quick neck roll or shoulder shrug 💪",
  "Take a deep breath. Reset your posture 🧘",
  "Walk around for a minute 🚶",
  "Blink! Hydrate your eyes.",
  "Time for a 2-min body shake!",
  "Smile and relax your jaw 😊",
  "Stand up and touch your toes 🦶",
  "Shake out your hands and wrists 👐",
  "Check your posture – no slouching! 🪑",
  "Take 3 deep belly breaths 👃",
  "Look at something 20 feet away for 20 seconds 👁️",
  "Stand up and do 10 jumping jacks 🏃",
  "Time for a power stretch! Arms up overhead ✨",
  "Close your eyes and listen to ambient sounds 🎧",
  "Rub your palms together and feel the heat 🔥",
  "Do a quick stretch: neck side to side 🙆",
  "Tense and relax your shoulders 👊 ➡ 😌",
  "Drink some water even if you're not thirsty 💧",
  "Open a window – get some fresh air 🌬️",
  "Check in: How’s your mood right now? 😌",
  "Unclench your jaw and soften your brow 🧠",
  "Rest your wrists – give them a break 🖐️",
  "Stretch your spine – reach up tall 🧍‍♂️",
  "Roll your ankles in circles 👣",
  "Try a one-minute mindfulness break 🕊️",
  "Massage your temples gently 👐",
  "Look outside – find one thing you hadn't noticed 🌳",
  "Change your sitting position 🪑➡🪟",
  "Walk to the door and back 🚪",
  "Lightly bounce on your feet for 30 seconds 🏋️‍♂️",
  "Stretch your arms behind your back 🤸‍♀️",
  "Feel your breath – slow and steady 🌫️",
  "Take a mini dance break 💃🕺",
  "Wave at your reflection – why not? 😄"
];

const welcomeMessages = [
  "PromptBell is active – and so are your dreams. Let’s make today productive and kind to yourself.",
  "Welcome back! You’ve got this — one mindful break at a time.",
  "Just a reminder: You’re doing better than you think. Keep going.",
  "PromptBell is here to support your focus and your well-being.",
  "A quick pause can lead to powerful clarity. PromptBell’s got you.",
  "Be kind to your mind. PromptBell will help you remember to rest.",
  "You’re capable, strong, and deserving of balance. Let’s start the day right.",
  "PromptBell is on – your little helper for a calmer, more focused you.",
  "Every break is a step toward better energy. Let’s take it together.",
  "You’re not just working hard — you’re growing. Take care of yourself.",
  "Let’s get things done — and not forget to breathe. PromptBell is with you.",
  "You’re important. So is your peace. PromptBell will remind you both matter.",
  "Today’s a fresh start. Stay focused, stay kind to yourself.",
  "PromptBell is active — because balance is productive.",
  "Your mind deserves rest, not just results. Let PromptBell guide you gently.",
  "A break now is fuel for later. You’re doing great.",
  "Welcome! Here’s to small wins and deep breaths.",
  "PromptBell is your friendly nudge toward self-care and clarity.",
  "You’re showing up — that’s enough. Let’s add mindful pauses too.",
  "Progress isn’t just tasks done. It’s taking care of you too.",
  "PromptBell is live! Let’s aim for progress with peace of mind.",
  "Remember, rest is productive. PromptBell is your permission slip.",
  "You’re more than your to-do list. PromptBell will help you breathe.",
  "Ready to focus? PromptBell will help you pause, too.",
  "Celebrate the small wins — including your next well-earned break.",
  "PromptBell is your positivity partner. Let’s make today brighter.",
  "Here’s to good work, good breaks, and a good mood.",
  "You’re allowed to rest. You’re allowed to thrive.",
  "PromptBell is active — your wellness is just as important as your workflow.",
  "Let’s take on the day with focus, grace, and just enough pause to stay balanced."
];

// === Function to show a random break notification ===
function showBreakNotification() {
  const message = breakMessages[Math.floor(Math.random() * breakMessages.length)];
  chrome.notifications.create({
    type: "basic",
    iconUrl: "icon.png",
    title: "Break Reminder",
    message: message,
    priority: 2
  });
}

// === On extension startup or install ===
function setupBreakInterval() {
  // Set a repeating alarm every 25 minutes for break reminders
  chrome.alarms.create("breakReminder", { periodInMinutes: 25 });
}

// === Welcome message and setup ===
chrome.runtime.onStartup.addListener(() => {
  const message = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
  chrome.notifications.create({
    type: "basic",
    iconUrl: "icon.png",
    title: "Welcome!",
    message: message,
    priority: 2
  });
  setupBreakInterval();
});

chrome.runtime.onInstalled.addListener(() => {
  const message = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
  chrome.notifications.create({
    type: "basic",
    iconUrl: "icon.png",
    title: "PromptBell Installed 🎉",
    message: message,
    priority: 2
  });
  setupBreakInterval();
});

// === Respond to ANY alarm — user-defined or break reminder ===
chrome.alarms.onAlarm.addListener((alarm) => {
  const id = alarm.name;

  if (id === "breakReminder") {
    showBreakNotification();
    return;
  }

  // Handle user-defined alarm
  chrome.storage.local.get(id, (data) => {
    const message = data[id] || "Reminder!";
    chrome.notifications.create({
      type: "basic",
      iconUrl: "icon.png",
      title: "🔔 PromptBell Reminder",
      message: message,
      priority: 2
    });

    // Optional: Play sound
    // const audio = new Audio(chrome.runtime.getURL("ding.mp3"));
    // audio.play();

    chrome.storage.local.remove(id); // Clean up after showing
  });
});
