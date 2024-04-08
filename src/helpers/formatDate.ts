export function formatDate(dateString: string): string {
  const currentDate = new Date();
  const date = new Date(dateString);

  const timeDifference = currentDate.getTime() - date.getTime();
  const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

  if (daysDifference === 0) {
    return "today";
  } else if (daysDifference === 1) {
    return "1 day ago";
  } else {
    return `${daysDifference} days ago`;
  }
}
