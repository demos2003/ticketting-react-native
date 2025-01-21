export const formatArrayDateTime = (dateArr?: number[], timeArr?: number[]) => {
    try {
      if (!dateArr || !timeArr || dateArr.length !== 3 || timeArr.length !== 2) {
        return { month: 'TBA', date: '--', time: 'TBA' };
      }
  
      const [year, month, day] = dateArr;
      const [hour, minute] = timeArr;
  
      // Create a date object
      const eventDate = new Date(year, month - 1, day, hour, minute);
  
      // Format month
      const monthStr = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(eventDate);
      
      // Format time
      const timeStr = eventDate.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
  
      return {
        month: monthStr,
        date: day.toString(),
        time: timeStr,
        fullDate: eventDate
      };
    } catch (error) {
      console.log('Date formatting error:', error);
      return { month: 'TBA', date: '--', time: 'TBA', fullDate: null };
    }
  };