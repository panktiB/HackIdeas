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
            @click="registerEmployee"
          >
            <span class="test-registration">
              Registration
            </span>
          </vs-button>
        </vs-row>
        <vs-row>
          <div class="font-medium pt-10">
            Already have an account?
            <span
              class="text-underline pointer-cursor ph-3 hover:text-primary test-goto-login"
              @click="goToLogin"
            >
              Login
            </span>
          </div>
        </vs-row>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
  import employeeMixin from '../mixins/employeeMixin';
  import { EventBus } from '../eventBus';

  export default {
    name: 'AppRegister',
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
    mounted () {
      this.existingEmployees = this.deepCopy(this.getEmployees());
    },
    methods: {
      registerEmployee: function () {
        if(this.existingEmployees.indexOf(this.employeeID) > -1) {
          this.errorMessage = 'Employee already registered. Please login instead.';
        } else {
          this.setEmployee(this.employeeID);
          EventBus.$emit('set-logged-in', this.employeeID);
          this.routeTo('LandingPage');
        }
      },
      goToLogin: function () {
        this.routeTo('Login');
      }
    }
  };
</script>
