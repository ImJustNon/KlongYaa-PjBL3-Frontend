export function convertToTimestamp(dateString){
    const dateObject = new Date(dateString);
    const timestamp = dateObject.getTime();
    const date = new Date(timestamp);

// Extract day, month, year, hour, and minute
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = date.getMinutes();

// Determine AM/PM
    const ampm = hour >= 12 ? 'PM' : 'AM';
// Adjust hour for 12-hour format
    const adjustedHour = hour % 12 || 12;

    return {
        day: day,
        month: month,
        year: year,
        hour: adjustedHour,
        minute: minute,
        ampm: ampm
    };
}