export function convertToTimestamp(dateString){
    const dateObject = new Date(dateString);
    const timestamp = dateObject.getTime();
    return timestamp;
}