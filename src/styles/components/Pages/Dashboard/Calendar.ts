import styled from 'styled-components'

export const Container = styled.div`
  display: grid;
  grid-area: C;

  max-height: 320px;

  border-radius: 0.4rem;

  .DayPicker {
    background: var(--background);
    border-radius: 0.4rem;
  }

  .DayPicker-wrapper {
    padding-bottom: 0;
  }

  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }

  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 3px 15px;
    margin: 16px;

    @media (max-width: 1440px) {
      border-spacing: 3px;
    }
  }

  .DayPicker-Day {
    width: 35px;
    height: 35px;

    border-radius: 0.4rem;
    font-size: 0.9rem;
  }

  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: var(--darkgray);
    border-radius: 0;
    color: var(--white);
  }

  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: var(--gray) !important;
  }

  .DayPicker-Day--today {
    font-weight: normal;
  }

  .DayPicker-Day--disabled {
    color: var(--white) !important;
    background: transparent !important;
  }

  .DayPicker-Day--selected {
    background: var(--orange) !important;
    border-radius: 0.4rem;
    color: var(--white) !important;
  }

  .DayPicker-Day--outside {
    color: #aaa !important;
  }
`
