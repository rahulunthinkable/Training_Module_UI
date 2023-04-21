export class UserlistColdefs {
  private Columndefs;
  constructor() {
    this.Columndefs = [
      { tablekey: "userName", label: "Name" },
      { tablekey: "userEmail", label: "Email" },
      { tablekey: "userType", label: "User Type" },
      { tablekey: "createdAt", label: "Created At" },
      { tablekey: "isActive", label: "isActive" },
    ];
  }

  get columns() {
    return this.Columndefs;
  }
}
