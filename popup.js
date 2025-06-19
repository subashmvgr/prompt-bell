document.getElementById("setReminder").addEventListener("click", () => {
  const message = document.getElementById("message").value;
  const minutes = parseFloat(document.getElementById("minutes").value);

  if (!message || isNaN(minutes) || minutes <= 0) {
    alert("Enter a valid message and time.");
    return;
  }

  const id = Date.now().toString();
  chrome.alarms.create(id, { delayInMinutes: minutes });
  chrome.storage.local.set({ [id]: message });

  const status = document.getElementById("status");
  status.textContent = `Reminder set for ${minutes} minute(s).`;

  // Optional: clear after a few seconds
  setTimeout(() => { status.textContent = ""; }, 4000);

  document.getElementById("message").value = "";
  document.getElementById("minutes").value = "";
});
