<template>
  <div class="calendar">
    <div class="calendar-header">
      <div class="month-picker" @click="toggleMonthList">{{ monthNames[currentMonth] }}</div>
      <div class="year-picker">
        <span id="prev-year" @click="changeYear(-1)">❮</span>
        <span id="year">{{ currentYear }}</span>
        <span id="next-year" @click="changeYear(1)">❯</span>
      </div>
    </div>

    <div class="calendar-body">
      <div class="calendar-week-day">
        <div v-for="day in weekDays" :key="day">{{ day }}</div>
      </div>
      <div class="calendar-days">
        <div
            v-for="day in days"
            :key="day.date || 'empty'"
            :class="{ 'calendar-day-hover': true, 'selected-date': isSelectedDate(day) }"
            v-html="day.content"
            @click="selectDate(day)"
        ></div>
      </div>
    </div>

    <div class="month-list" :class="{ show: showMonthList }">
      <div v-for="(month, index) in monthNames" :key="month">
        <div @click="selectMonth(index)">{{ month }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    const currDate = new Date();
    return {
      currentMonth: currDate.getMonth(),
      currentYear: currDate.getFullYear(),
      selectedDate: {
        year: currDate.getFullYear(),
        month: currDate.getMonth(),
        date: currDate.getDate(),
      },
      showMonthList: false,
      monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      weekDays: ['日', '一', '二', '三', '四', '五', '六'],
    };
  },
  computed: {
    days() {
      const days = [];
      const daysOfMonth = [31, this.getFebDays(this.currentYear), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1).getDay();
      const totalDays = daysOfMonth[this.currentMonth] + firstDayOfMonth;

      for (let i = 0; i < totalDays; i++) {
        if (i >= firstDayOfMonth) {
          const date = i - firstDayOfMonth + 1;
          days.push({
            year: this.currentYear,
            month: this.currentMonth,
            date,
            content: `<div>${date}<span></span><span></span><span></span><span></span></div>`,
          });
        } else {
          days.push({ date: null, content: '' });
        }
      }
      return days;
    },
  },
  methods: {
    toggleMonthList() {
      this.showMonthList = !this.showMonthList;
    },
    selectMonth(month) {
      this.currentMonth = month;
      this.showMonthList = false;
    },
    changeYear(offset) {
      this.currentYear += offset;
    },
    selectDate(day) {
      if (day.date) {
        this.selectedDate = {
          year: day.year,
          month: day.month,
          date: day.date,
        };
      }
    },
    isSelectedDate(day) {
      return (
          day.year === this.selectedDate.year &&
          day.month === this.selectedDate.month &&
          day.date === this.selectedDate.date
      );
    },
    isLeapYear(year) {
      return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    },
    getFebDays(year) {
      return this.isLeapYear(year) ? 29 : 28;
    },
  },
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.calendar {
  height: max-content;
  width: max-content;
  background-color: #fdfdfd;
  border-radius: 30px;
  padding: 10px;
  position: relative;
  overflow: hidden;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  color: #151426;
  padding: 10px;
}

.calendar-body {
  padding: 5px;
}

.calendar-week-day {
  height: 30px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.calendar-week-day div {
  display: grid;
  place-items: center;
  color: #c3c2c8;
}

.calendar-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
  color: #151426;
}

.calendar-days div {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  position: relative;
  cursor: pointer;
}

.calendar-days div span {
  position: absolute;
}

.calendar-days div:hover span {
  transition: width 0.2s ease-in-out, height 0.2s ease-in-out;
}

.calendar-days div span:nth-child(1),
.calendar-days div span:nth-child(3) {
  width: 2px;
  height: 0;
  background-color: #151426;
}

.calendar-days div:hover span:nth-child(1),
.calendar-days div:hover span:nth-child(3) {
  height: 100%;
}

.calendar-days div span:nth-child(1) {
  bottom: 0;
  left: 0;
}

.calendar-days div span:nth-child(3) {
  top: 0;
  right: 0;
}

.calendar-days div span:nth-child(2),
.calendar-days div span:nth-child(4) {
  width: 0;
  height: 2px;
  background-color: #151426;
}

.calendar-days div:hover span:nth-child(2),
.calendar-days div:hover span:nth-child(4) {
  width: 100%;
}

.calendar-days div span:nth-child(2) {
  top: 0;
  left: 0;
}

.calendar-days div span:nth-child(4) {
  bottom: 0;
  right: 0;
}

.calendar-days div.curr-date {
  background-color: #536555;
  color: #fff;
  border-radius: 50%;
}

.calendar-days div.curr-date span {
  display: none;
}

.month-picker {
  padding: 5px 10px;
  border-radius: 10px;
  cursor: pointer;
}

.month-picker:hover {
  background-color: #edf0f5;
}

.year-change {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  margin: 0 10px;
  cursor: pointer;
}

.year-change:hover {
  background-color: #edf0f5;
}

.month-list {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #fdfdfd;
  padding: 20px;
  grid-template-columns: repeat(3, auto);
  gap: 5px;
  display: grid;
  transform: scale(1.5);
  visibility: hidden;
  pointer-events: none;
}

.month-list.show {
  transform: scale(1);
  visibility: visible;
  pointer-events: visible;
  transition: all 0.2s ease-in-out;
}

.month-list > div {
  display: grid;
  place-items: center;
}

.month-list > div > div {
  width: 100%;
  padding: 5px 20px;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
  color: #151426;
}

.month-list > div > div:hover {
  background-color: #edf0f5;
}

.calendar-days div.selected-date {
  background-color: #536555;
  color: #fff;
  border-radius: 50%;
}
</style>
