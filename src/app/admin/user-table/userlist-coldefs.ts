export class UserlistColdefs {
  private Columndefs;
  private filterOptions;
  constructor() {
    this.Columndefs = [
      { tablekey: "userName", label: "Name" },
      { tablekey: "userEmail", label: "Email" },
      { tablekey: "userType", label: "User Type" },
      { tablekey: "createdAt", label: "Created At" },
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
            viewValue:'Traiee'
          },
          {
            _id:'none',
            viewValue:'None'
          }
        ],
        key: "userType",
      },
      {
        label: "Created Date",
        type: "date",
        key: "date",
      },
      {
        label:'Enter text',
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
