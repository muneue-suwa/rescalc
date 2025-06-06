const currentDate = new Date();
const currentDateString = currentDate.toLocaleDateString('sv-SE');
const rsvStartDate = new Date();

const availRsvDateElement = document.getElementById('avail-rsv-date');
const prefRsvDateElement = document.getElementById('pref-rsv-date');
const rsvStartDateElement = document.getElementById('rsv-start-date');
const googleCalendarLink = document.getElementById('google-calendar-link');

const updateGoogleCalendarLink = () => {
  const rsvStartDateString = rsvStartDate.toLocaleDateString('sv-SE').replace(/-/g, '');
  const calendarUrl = `https://calendar.google.com/calendar/r/eventedit?dates=${rsvStartDateString}/${rsvStartDateString}&text=reservation`;
  console.log(calendarUrl);
  googleCalendarLink.href = calendarUrl;
};

const saveSettings = () => {
  chrome.storage.session.set({
    availRsvDate: availRsvDateElement.value,
    prefRsvDate: prefRsvDateElement.value,
  });
};

const calculateRsvStartDate = () => {
  const diff = prefRsvDateElement.valueAsNumber - availRsvDateElement.valueAsNumber;
  console.log(diff);
  rsvStartDate.setTime(currentDate.getTime() + diff);
  // Const rsvStartDateString = rsvStartDate.toLocaleDateString();
  rsvStartDateElement.value = rsvStartDate.toLocaleDateString('sv-SE');
  updateGoogleCalendarLink();
  saveSettings();
};

// Initialize the date inputs with the current date
availRsvDateElement.value = currentDateString;
prefRsvDateElement.value = currentDateString;

// Load settings from Chrome storage
chrome.storage.session.get(['availRsvDate', 'prefRsvDate']).then(result => {
  if (result.availRsvDate) {
    availRsvDateElement.value = result.availRsvDate;
  }

  if (result.prefRsvDate) {
    prefRsvDateElement.value = result.prefRsvDate;
  }
});

availRsvDateElement.min = currentDateString;
prefRsvDateElement.min = currentDateString;

availRsvDateElement.addEventListener('input', () => {
  calculateRsvStartDate();
});
prefRsvDateElement.addEventListener('input', () => {
  calculateRsvStartDate();
});

calculateRsvStartDate();
