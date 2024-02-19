<template>
  <div class="events-container">
    <div class="events--trigger">
      <h4>dates</h4>
    </div>
    <div data-show-more="off" class="events">
      <div v-if="events && events.length > 0" class="upcoming">
        <h2 class="events--title">~~~upcoming~~~</h2>
        <div v-for="(event, index) in events" :key="index" :class="['events--event']">
          <nuxt-link v-if="event.link" to="event.link.slug">
            <Event :event-item="event" />
          </nuxt-link>
          <div v-else>
            <Event :event-item="event" />
          </div>
        </div>
      </div>

      <h2 v-if="eventsPast" class="events--title">~~~~~past~~~~~</h2>

      <div
        v-for="(event, index) in eventsPast"
        :key="event._id"
        :class="['events--event', 'past', {hidden: index > 6}]"
      >
        <nuxt-link v-if="event.link" :to="event.link">
          <Event :event-item="event" is-past />
        </nuxt-link>
        <div v-else>
          <Event :event-item="event" is-past />
        </div>

      </div>
      <!-- <button class="showMoreTrigger" @click="showMore">More</button> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'EventsComponent',
  props: {
    events: {
      type: Array,
      default: () => {},
    },
    eventsPast: {
      type: Array,
      default: () => {},
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
    showMore(event) {
      if (event.target.parentNode.dataset.showMore==="off") {
        event.target.parentNode.setAttribute('data-show-more', "on")
        event.target.textContent = ('less')
      } else {
        event.target.parentNode.setAttribute('data-show-more', "off")
        event.target.textContent = ('more')
      }
    }
  },
}
</script>

<<<<<<< HEAD
<style lang="scss" scoped>
=======
<style scoped>
>>>>>>> 3acb38d (deploy to  sashacloo)
.events-container {
  text-align: right;
  position: fixed;
  width: 300px;
  top: 14vh;
  right: 2vw;
  mix-blend-mode: overlay;
  bottom: 0;
  z-index: 1111;
  overflow-y: scroll;
}
.events { 
<<<<<<< HEAD
  // background-color: white;
  // color: greenyellow;
  // bottom: 0;
  // display: none;
  font-size: 12px;
  // right: 0;
  padding: 4em 1em;
  // position: absolute;
  // top: 50px;
  // width: 300px;
=======
  /* background-color: white;
  color: greenyellow;
  bottom: 0;
  display: none;
  font-size: 12px;
  right: 0;
  padding: 4em 1em;
  position: absolute;
  top: 50px;
  width: 300px; */
>>>>>>> 3acb38d (deploy to  sashacloo)
  z-index: 5;

  &:hover {
    display: block;
  }

<<<<<<< HEAD
  @media (min-width: 1024px) {
    // right: 0;
    // width: 300px;
    // left: 66vw;
    // position: sticky;
    // bottom: 1em;
    // margin-left: 20px;
  }
  
  // .upcoming {
  //   border: 1px solid; 
  //   margin-bottom: 1em;
  //   padding: 0 10px;
  // }
=======
  /* @media (min-width: 1024px) {
    right: 0;
    width: 300px;
    left: 66vw;
    position: sticky;
    bottom: 1em;
    margin-left: 20px;
  } */
  
  /* .upcoming {
    border: 1px solid; 
    margin-bottom: 1em;
    padding: 0 10px;
  } */
>>>>>>> 3acb38d (deploy to  sashacloo)
  
  &--title {
    margin-bottom: 0.5em;
    
    @media (min-width: 1024px) {
      &:first-child {
        margin: -10px 0 1em;
      }
    }
  }

  &--event {
    margin-bottom: .4em;
    position: relative;
    
    &.isToday {
      border: 1px solid red;
      border-radius: 30px;
      padding: 4px 1em 0;
      margin: 5px -1em;
    }

    & > div {
      cursor: default;
    }

    & > a {
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  &[data-show-more="on"] .hidden {
    display: block;
  }
}
.events--trigger {
  background-color: white;
  border-radius: 3em;
  align-items: center;
  position: fixed;
  top: 10vw;
  right: 2vw;
  display: flex;
<<<<<<< HEAD
  // height: 100%;
  padding: 0 2.6em;
  user-select: none;
  z-index: 2;
  // filter: blur(0.9px);
=======
  height: 100%;
  padding: 0 2.6em;
  user-select: none;
  z-index: 2;
  filter: blur(0.9px);
>>>>>>> 3acb38d (deploy to  sashacloo)
  
  &:hover {
    filter: blur(0);

    + .events {
      display: block;
    }
  }
  h4 {
    font-size: 12px;
  }
}
</style>
