import { useSelector } from 'react-redux';
import { selectUserDailyNorm } from '../../../redux/user/selectors';
import { useEffect } from "react";

export default function DailyNormaModal () {
  const dailyNorm = useSelector(selectUserDailyNorm);
  
  useEffect(() => {
    console.log("Актуальний dailyNorm:", dailyNorm); // Перевірка значення
  }, [dailyNorm]);

  return (
    <div>
      <h1>Ваша денна норма: {dailyNorm}</h1>
    </div>
  );
}
