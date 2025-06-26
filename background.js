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
  chrome.notifications.create({
    type: "basic",
    iconUrl: "icon.png",
    title: "Welcome!",
    message: "PromptBell is active. Add your own reminders anytime!",
    priority: 2
  });
  setupBreakInterval();
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.notifications.create({
    type: "basic",
    iconUrl: "icon.png",
    title: "PromptBell Installed 🎉",
    message: "We'll remind you to take breaks. You can also add custom alerts.",
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
