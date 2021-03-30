import { Container } from '../../../styles/components/Pages/Dashboard/Calendar'
import DayPicker, { DayModifiers } from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import { useCallback, useState } from 'react'

export function Calendar() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month)
  }, [])

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available && !modifiers.disabled) {
      setSelectedDate(day)
    }
  }, [])

  return (
    <Container>
      <DayPicker
        weekdaysShort={['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']}
        fromMonth={new Date()}
        selectedDays={selectedDate}
        onMonthChange={handleMonthChange}
        showOutsideDays
        // modifiers={{
        //   available: { daysOfWeek: [1, 2, 3, 4, 5] }
        // }}
        onDayClick={handleDateChange}
        months={[
          'Janeiro',
          'Fevereiro',
          'Março',
          'Abril',
          'Maio',
          'Junho',
          'Julho',
          'Agosto',
          'Setembro',
          'Outubro',
          'Novembro',
          'Dezembro'
        ]}
      />
    </Container>
  )
}
