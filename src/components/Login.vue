<template>
  <div class="bg-lightgrey height-100 width-100">
    <vs-row
      vs-justify="center"
      vs-align="center"
      class="height-100"
    >
      <vs-col
        vs-w="12"
        class="fixed-width-300 background-white p-20 border-radius-8"
      >
        <vs-row class="pb-10">
          <vs-input
            v-model="employeeID"
            label="Enter Employee ID"
            class="width-100"
          />
          <span
            v-if="errorMessage"
            class="text-danger font-small"
          >
            {{ errorMessage }}
          </span>
        </vs-row>
        <vs-row vs-justify="center">
          <vs-button
            class="width-100 pv-7"
            :disabled="! isValid"
            @click="login"
          >
            Login
          </vs-button>
        </vs-row>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
  import employeeMixin from '../mixins/employeeMixin';

  export default {
    name: 'Login',
    mixins: [employeeMixin],
    data: function () {
      return {
        employeeID: null,
        errorMessage: '',
        existingEmployees: [],
      };
    },
    computed: {
      isValid: function () {
        let pattern = /^[1-9]\d{5}$/;
        return pattern.test(this.employeeID);
      }
    },
    beforeMount () {
      this.existingEmployees = this.deepCopy(this.existingEmployees);
    },
    methods: {
      login: function () {
        if(this.employeeID in this.existingEmployees) {
          this.routeTo('LandingPage');
        } else {
          this.errorMessage = 'Please register yourself';
        }
      },
    }
  };
</script>
