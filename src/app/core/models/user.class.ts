export class User {
    name: string;
    mail: string;
    password: string;
    // id: string;

    constructor(obj?: any) {
        this.name = obj ? obj.firstName : '';
        this.mail = obj ? obj.mail : '';
        this.password = obj ? obj.password : '';
        // this.id = obj ? obj.id : '';
    }

    public toJSON() {
        return {
            firstName: this.name,
            mail: this.mail,
            password: this.password,
            // id: this.id
        };
    }
}