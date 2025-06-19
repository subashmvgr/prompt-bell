chrome.alarms.onAlarm.addListener((alarm) => {
  const id = alarm.name;
  chrome.storage.local.get(id, (data) => {
    const message = data[id] || "Reminder!";
    chrome.notifications.create({
      type: "basic",
      iconUrl: "icon.png",
      title: "🔔 PromptBell Reminder",
      message: message,
      priority: 2
    });
    // Play notification sound
    // const audio = new Audio(chrome.runtime.getURL("ding.mp3"));
    // audio.play();
    chrome.storage.local.remove(id); // Clean up
  });
});
