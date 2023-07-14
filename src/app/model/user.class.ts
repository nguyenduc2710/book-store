export class User{
  public username: string;
  public password: string;
  public fullName: string;
  public address: string;
  public gender: string;
  public age: number;
  public phoneNumber: string;
  public imagePath: string | undefined;
  public email: string;

  constructor(username: string,
    password: string,
    fullName: string,
    address: string,
    gender: string,
    age: number,
    phoneNumber: string,
    imagePath: string,
    email: string){
      this.username = username;
      this.password = password;
      this.fullName = fullName;
      this.address = address;
      this.gender = gender;
      this.age = age;
      this.phoneNumber = phoneNumber;
      this.imagePath = imagePath;
      this.email = email;
  }
}
