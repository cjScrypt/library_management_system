const { UserService } = require("./services");


const main = async () => {
    const userService = new UserService();

    const username = "admin1";
    const password = "admin12345";

    await userService.createSuperUser({ username, password });

    console.log("====Admin user successfully created====");
    console.log(`username: ${username}\npassword: ${password}`);
}

main();