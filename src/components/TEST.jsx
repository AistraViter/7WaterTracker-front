
const handleSave = async (waterVolume, time) => {
    const formattedDate = formatTimeToDate(time);
    
    console.log("Water volume to be sent:", waterVolume);
    console.log("Formatted date:", formattedDate);
    
    try {
      const response = await dispatch(
        updateWaterNote({ _id: waterId, waterVolume, date: formattedDate })
      ).unwrap();
  
      console.log("WaterNote successfully saved:", response);
      setWaterData({
        waterVolume: response.waterVolume,
        time: response.time || waterData.time,
      });
      onClose(); // Закриваємо модалку після успішного збереження
    } catch (error) {
      console.error("Error on saving data:", error);
    }
  };
    