const currentDate = new Date()
const currentDateString = currentDate.toLocaleDateString('sv-SE');
const rsvStartDate = new Date();

const availRsvDateElement = document.getElementById('avail-rsv-date');
const prefRsvDateElement = document.getElementById('pref-rsv-date');
const rsvStartDateElement = document.getElementById('rsv-start-date');
const googleCalendarLink = document.getElementById('google-calendar-link');

availRsvDateElement.value = currentDateString;
availRsvDateElement.min = currentDateString;

prefRsvDateElement.value = currentDateString;
prefRsvDateElement.min = currentDateString;

availRsvDateElement.addEventListener('input', (event) => {
    calculateRsvStartDate();
});
prefRsvDateElement.addEventListener('input', (event) => {
    calculateRsvStartDate();
});

calculateRsvStartDate();
function calculateRsvStartDate() {
    const diff = prefRsvDateElement.valueAsNumber - availRsvDateElement.valueAsNumber;
    console.log(diff);
    rsvStartDate.setTime(currentDate.getTime() + diff);
    // const rsvStartDateString = rsvStartDate.toLocaleDateString();
    rsvStartDateElement.value = rsvStartDate.toLocaleDateString('sv-SE');
    updateGoogleCalendarLink();
}

function updateGoogleCalendarLink() {
    const rsvStartDateString = rsvStartDate.toLocaleDateString('sv-SE').replace(/-/g, '');
    const calendarUrl = `https://calendar.google.com/calendar/r/eventedit?dates=${rsvStartDateString}/${rsvStartDateString}&text=reservation&details=hogehoge`;
    console.log(calendarUrl);
    googleCalendarLink.href = calendarUrl;
}
