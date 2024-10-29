export default function filterTodayEntries(data) {
    const today = new Date();
    return data.filter(item => {
      const entryDate = new Date(item.date);
      return (
        entryDate.getFullYear() === today.getFullYear() &&
        entryDate.getMonth() === today.getMonth() &&
        entryDate.getDate() === today.getDate()
      );
    });
  }
  