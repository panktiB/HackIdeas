let employeeMixin = {
  data: function () {
    return {
      employees: [],
    };
  },
  methods: {
    getEmployees: function () {
      let employees = localStorage.getItem('employees');
      if(employees && employees.length) {
        return JSON.parse(employees);
      } else {
        return [];
      }
    },
    setEmployees: function (employees) {
      localStorage.setItem('employees', employees.length ? JSON.stringify(employees) : '');
    },
    setEmployee: function (employee) {
      let employees = this.getEmployees();
      employees.push(employee);
      this.setEmployees(employees);
    },
    deleteEmployees: function () {
      localStorage.removeItem('employees');
      this.employees = [];
      return this.employees;
    },
    setCurrentUser: function (employee) {
      localStorage.setItem('hack-ideas-current-user', employee);
    },
    removeCurrentUser: function () {
      localStorage.removeItem('hack-ideas-current-user');
    },
    getCurrentUser: function () {
      return localStorage.getItem('hack-ideas-current-user');
    }
  }
};

export default employeeMixin;
