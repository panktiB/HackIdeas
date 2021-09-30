let employeeMixin = {
  data: function () {
    return {
      employees: [],
    };
  },
  methods: {
    getEmployees: function () {
      return this.employees;
      // return localStorage.getItem('employees');
    },
    setEmployees: function (employees) {
      this.employees = employees;
      return this.employees;
      // localStorage.setItem('employees', employees);
    },
    setEmployee: function (employee) {
      this.employees.push(employee);
      return this.employees;
      // localStorage.setItem('employees');
    },
    deleteEmployees: function () {
      // localStorage.removeItem('employees');
      this.employees = [];
      return this.employees;
    }
  }
};

export default employeeMixin;
