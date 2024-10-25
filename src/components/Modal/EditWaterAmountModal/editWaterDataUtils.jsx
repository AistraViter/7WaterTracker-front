  import axios from "axios";

    export const fetchWaterData = async (waterId) => {
      try {
        const response = await axios.get('/water/note', { params: { id: waterId } });
        return response.data
      } catch (error) {
        console.error('Error fetching water data: ', error);
        throw error;
      }
    }

////////////////////////////// Time handle utils //////////////////////////////

    export const timeOptions = Array.from({ length: 288 }, (_, i) => {
      const totalMinutes = i * 5;
      const hour = String(Math.floor(totalMinutes / 60)).padStart(2, '0');
      const minute = String(totalMinutes % 60).padStart(2, '0');
      return `${hour}:${minute}`;
    })
  
    export const formatTimeToAMPM = (time) => {
      const ampmRegex = /^[0-9]{1,2}:[0-9]{2} (AM|PM)$/; // if time in AM/PM format

      if (ampmRegex.test(time)) { // time already is in AM/PM format
        return time;
      } 
      
      let [hours, minutes] = time.split(':'); // formatting to AM/PM format
      hours = parseInt(hours, 10);

      const ampm = hours >= 12 ? 'PM' : 'AM'; 
      hours = hours % 12 || 12;

      return `${hours}:${minutes} ${ampm}`;
    }
  
    export const getCurrentTime = () => {
      const date = new Date();
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      // console.log(`function getCurrentTime: ${hours}:${minutes}`);
      return `${hours}:${minutes}`; 
    };
    
    export const convertTimeToMinutes = (time) => {
      const [hours, minutes] = time.split(':').map(Number);
      return hours * 60 + minutes; 
    };
    
    export const findClosestTimeOption = (fieldTime) => {
      console.log("fieldTime: ", fieldTime)

      const fieldTimeInMinutes = convertTimeToMinutes(fieldTime);
      
      const closest = timeOptions.reduce((prev, curr) => {
          const prevInMinutes = convertTimeToMinutes(prev);
          const currInMinutes = convertTimeToMinutes(curr);

          const prevDiff = Math.abs(prevInMinutes - fieldTimeInMinutes);
          const currDiff = Math.abs(currInMinutes - fieldTimeInMinutes);

          // console.log("prev: ", prev, "curr: ", curr, "prevDiff: ", prevDiff, "currDiff: ", currDiff);
          return currDiff < prevDiff ? curr : prev;
      })
          
      return closest;  
    }
    
    export const handleTimeFocus = (setIsDropdownOpen, values) => {
      setIsDropdownOpen(true);

      const closestTime = findClosestTimeOption(values.time);
      console.log("closestTime: ", closestTime);
      
      setTimeout(() => {
        const elementToScrollTo = document.querySelector(`[data-time = "${closestTime}"]`);
        console.log("Element to scroll to: ", elementToScrollTo);

        if (elementToScrollTo) {
          elementToScrollTo.scrollIntoView({behavior: 'smooth', block: 'nearest'})
        }
      }, 0)
    }