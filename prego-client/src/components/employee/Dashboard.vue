<template>
<div>
  <div class="flex justify-between">
    <div class="m-12 ml-48 w-1/3">
      <h2>{{ $t('dashboardEmployee.title') }}, {{employee.first_name}} {{employee.last_name}}! </h2>
      <div class="below-title links">
        <span>{{ $t('dashboardEmployee.subtitle') }} </span>
      </div>
    </div>
  </div>
  <div class="container ml-56 bg-gray-100 p-8 shadow-2xl">
    <FullCalendar id="calendar"  :options="calendarOptions"
    >
      <template #eventContent="{ timeText, event }">
        <b>{{ timeText }}</b>
        <i>{{ event.title }}</i>
      </template>
    </FullCalendar>
  </div>

  <!--        Modal       -->
  <div v-if="toggleModal"
       class="fixed overflow-x-hidden overflow-y-auto inset-0 flex justify-center items-center z-50">
    <div class="relative mx-auto w-1/3">
      <div class="bg-white w-full rounded shadow-2xl flex flex-col p-5">
        <div class="text-2xl font-bold text-center verdana">Appointment details</div>
        <table class="text-lg p-5">
          <tbody >
          <tr>
            <td>Start: </td>
            <td>{{ selectedAppointment.extendedProps.startDate }}</td>
          </tr>
          <tr>
            <td>End: </td>
            <td>{{ selectedAppointment.extendedProps.endDate }}</td>
          </tr>
          <tr>
            <td>Visitor name: </td>
            <td>{{ selectedAppointment.title }}</td>
          </tr>
          <tr>
            <td>Email: </td>
            <td>{{ selectedAppointment.extendedProps.email }}</td>
          </tr>
          </tbody>
        </table>

          <br>

          <div>
            <button
                class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4  rounded focus:outline-none focus:shadow-outline left"
                @click="toggleModal = false" type="button">
              Close
            </button>
            <a  :href="'mailto:' + selectedAppointment.extendedProps.email + '?subject=Appointment on ' + selectedAppointment.extendedProps.startDate"
                class=" mailtoui bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 float-right mr-2  rounded focus:outline-none focus:shadow-outline right"
                >
              Send email
            </a>
            <button
                class="bg-red-400 hover:bg-red-700 text-white font-bold py-2 px-4 float-right rounded focus:outline-none focus:shadow-outline right"
                @click="deleteAppointment(selectedAppointment.id)" type="button">
              Cancel visit
            </button>
          </div>

      </div>
    </div>
  </div>
  <!--     End modal      -->
</div>
</template>

<script>
require('@fullcalendar/daygrid/main.min.css')
require('@fullcalendar/timegrid/main.min.css')

import FullCalendar from '@fullcalendar/vue'
import DayGridPlugin from '@fullcalendar/daygrid'
import TimeGridPlugin from '@fullcalendar/timegrid'
import InteractionPlugin from '@fullcalendar/interaction'
import ListPlugin from '@fullcalendar/list'
import axios from 'axios'



export default {

  name: 'EmployeeDashboard',
  components: {
    FullCalendar,
  },
  data() {
    return {
      employee: '',
      appointments: [],
      renderedAppointments: [],
      selectedAppointment: '',
      toggleModal: false,
      calendarOptions: {
        plugins: [
          DayGridPlugin,
          TimeGridPlugin,
          InteractionPlugin,
          ListPlugin
        ],
        initialView: 'dayGridMonth',
        headerToolbar: {
        start: 'title',
        center: 'dayGridMonth, timeGridWeek, timeGridDay, list',
        end: 'prev today next'
        },
        selectable: 'true',
        editable: true,
        selectMirror: true,
        dayMaxEvents: true,
        events: '',
        select: this.handleDateSelect,
        // dateClick: this.handleDateClick,
        eventClick: this.handleEventClick,
        /* you can update a remote database when these fire:
        eventAdd:
        eventChange:
        eventRemove:
        */
      }
    }
  },
  methods: {

    handleDateClick: function(arg) {
      alert('date click! ' + arg.dateStr)
    },
    handleDateSelect(selectInfo) {
      let title = prompt('Please enter a new title for your event')
      let calendarApi = selectInfo.view.calendar

      calendarApi.unselect() // clear date selection

      if (title) {
        calendarApi.addEvent({
          id: 111,
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay
        })
      }
    },
    handleEventClick(clickInfo) {
      this.toggleModal = !this.toggleModal;
      this.selectedAppointment = clickInfo.event;
    },
    deleteAppointment(id){
        if (confirm(`Are you sure you want to cancel the appointment? You would not be able to retrieve it later.`)) {
          axios.delete('/api/appointments/' + id)
              .then(response => {
                console.log(response.data)
                // this.getAppointments(id)
              })
              .catch(error => {
                console.log(error.message)
              })
          console.log(id)
        }
    },
    renderAppointments(){
      let rendAppointments = []
      this.appointments.forEach(appointment => {
         let content = JSON.parse(appointment.form_answers);
         let startDate
          let endDate
        startDate = appointment.date_start.split('T').toString()
        startDate = startDate.slice(0,16);
        endDate = appointment.date_end.split('T').toString()
        endDate = endDate.slice(0,16);
        let obj = {
          title: " " + content.firstname +' ' + content.lastname,
          start: appointment.date_start,
          end: appointment.date_end,
          visitor: appointment.first_name +' ' + appointment.last_name,
          phone: appointment.phone_number,
          email: appointment.email,
          id: appointment.id,
          startDate: startDate,
          endDate: endDate
        }
        rendAppointments.push(obj)
      })
      this.renderedAppointments = rendAppointments
      return this.renderedAppointments;
    },
    getAppointments(id){
      axios.get('/api/employees/' + id + '/appointments')
          .then(response => {
            this.appointments = response.data
            this.calendarOptions.events = this.renderAppointments()
          }).catch(error => {
        console.log(error.message)
      })
    }
  },
  created() {
    let id = ''
    axios.get('/api/employee/' + localStorage.getItem('user_id'))
        .then(res => {
          this.employee = res.data[0]
          id = this.employee.id
          this.getAppointments(id)
    })
  }
}
</script>

<style scoped>

.links {
  text-transform: uppercase;
  letter-spacing: 2px;
}

.below-title {
  border-top: dotted 1px #999;
  border-bottom: dotted 1px #999;
  padding-top: 10px;
  padding-bottom: 10px;
  color: darkgray;
  font-size: smaller;
}


h2 {
  font-size: 35px;
  line-height: 1.4em;
}

tr{
line-height: 300%;
  font-size: large;
  font-family: Verdana;
}
.verdana{
  font-family: Verdana;
  padding: 15px;
}
</style>
