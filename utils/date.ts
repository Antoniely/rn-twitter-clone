export const getTimeShort = ({ date }: { date: string }) => {
  const dateFormat = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC",
  };
  return dateFormat.toLocaleTimeString("en-US", options).toLowerCase()
};


export const getDateShort = ({ date }: { date: string }) => {
    const dateFormat = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
      timeZone: "UTC",
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
    };
    return dateFormat.toLocaleDateString("en-US", options)
  };