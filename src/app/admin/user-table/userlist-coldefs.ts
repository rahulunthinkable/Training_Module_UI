export class UserlistColdefs {
  private Columndefs;
  private filterOptions;
  constructor() {
    this.Columndefs = [
      { tablekey: "userName", label: "Name" },
      { tablekey: "userEmail", label: "Email" },
      { tablekey: "userType", label: "User Type" },
      { tablekey: "createdAt", label: "Date Of Joining" },
      { tablekey: "isActive", label: "isActive" },
    ];
    this.filterOptions=[
      {
        label: "User Type",
        type: "dropdown",
        options: [
          {
            _id:'trainer',
            viewValue:'Trainer'
          },
          {
            _id:'trainee',
            viewValue:'Trainee'
          },
          {
            _id:'Admin',
            viewValue:'Admin'
          }
        ],
        key: "userType",
      },
      {
        label: "Date Of Joining",
        type: "date",
        key: "date",
      },
      {
        label:'Search',
        type:'text',
        key:'searchFilter'
      }
    ]
  }

  get columns() {
    return this.Columndefs;
  }

  get filters(){
    return this.filterOptions
  }
  
}
