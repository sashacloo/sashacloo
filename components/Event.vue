<template>
  <div :class="['event--inner', {past: isPast}]">
    <div
      v-cloak
      v-if="eventItem.mainImage"
      class="event-image"
    >
      <img :src="eventItem.mainImage + '?w=800'" class="cover" />
    </div>
    <div class="day">{{ day(eventItem.dateTime) }} {{ date(eventItem.dateTime) }}</div>
    <div class="time">
      {{ timeAMPM(eventItem.dateTime) }}
    </div>
    <div class="title">{{ eventItem.title }}</div>
    <div v-if="!isPast" class="body">
      <SanityContent
        :blocks="eventItem.body"
      />
    </div>
  </div>
</template>

<script>
<<<<<<< HEAD
export default {
  name: 'EventComponent',
=======

>>>>>>> 3acb38d (deploy to  sashacloo)
  props: {
    eventItem: {
      type: Object,
      default: () => {},
    },
    isPast: {
      type: Boolean,
      default: false,
    },  
  },
  methods: {
    isToday(dateTime) {
      const now = new Date()
      const date = new Date(dateTime)
      const day = date.getDate()
      const today = now.getDate()
      return day === today
    },
<<<<<<< HEAD
    date(dateTime) {
      const date = new Date(dateTime)
      const year = date.getFullYear()
      let month = date.getMonth() + 1
      month = month < 10 ? '0' + month : month
      let day = date.getDate()
      day = day < 10 ? '0' + day : day
      const strDate = year + '-' + month + '-' + day
      return strDate
    },
    day(dateTime) {
      const date = new Date(dateTime)
      const weekday = new Array(7)
      weekday[0] = 'Sun'
      weekday[1] = 'Mon'
      weekday[2] = 'Tue'
      weekday[3] = 'Wed'
      weekday[4] = 'Thu'
      weekday[5] = 'Fri'
      weekday[6] = 'Sat'
      return weekday[date.getDay()]
    },
    time(dateTime) {
      this.dateTime = dateTime
      return dateTime.split('T')[1].replace('Z', '').replace(':00', '')
    },
    timeAMPM(dateTime) {
      const date = new Date(dateTime)
      let hours = date.getHours()
      let minutes = date.getMinutes()
      const ampm = hours >= 12 ? 'pm' : 'am'
      hours = hours % 12
      hours = hours || 12 // the hour '0' should be '12'
      // hours = hours < 10 ? '0' + hours : hours
      minutes = minutes < 1 ? '' : minutes < 10 ? ':0' + minutes : ':' + minutes
      const strTime = hours + minutes + ampm
      return strTime
    }
=======
>>>>>>> 3acb38d (deploy to  sashacloo)
  },
}
</script>

<<<<<<< HEAD
<style lang="scss" scoped>
=======
<style scoped>
>>>>>>> 3acb38d (deploy to  sashacloo)
.event--inner {
  font-family: var(--tertiary-font);
  line-height: 1.2;
  margin-bottom: 2em;
  position: relative;

  .upcoming & {
    display: block;
  }
  .day, .time {
    white-space: nowrap;
    display: inline;
  }
  .upcoming & {
    .body a {
      display: block;
      text-decoration-color: currentColor;
    }
  }

  .title {
    grid-area: title;
    margin-bottom: 0.5em;
  }
  .body {
    grid-area: body;
    margin-bottom: 1em;
  }

  .link {
    grid-area: link;
  }

  .event-image {
    grid-area: image;
    margin-bottom: 5px;
  }
  &.past {
    .event-image {
      display: none;
      position: fixed;
      right: 0;
      bottom: 0;
      width: 300px;
      z-index: 999;
    }
  }
  @media (hover: hover) {
    &:hover {
      .event-image {
        display: block;
      }
    }
  }
}
</style>
