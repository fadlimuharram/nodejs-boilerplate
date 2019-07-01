import database from "../src/models";

class UserService {
  static async findOneUserbyEmail(email) {
    try {
      return await database.User.findOne({
        where: { email }
      });
    } catch (err) {
      throw err;
    }
  }

  static async addUser(newUser) {
    try {
      return await database.User.create(newUser);
    } catch (err) {
      throw err;
    }
  }

  // static async updateUser(email, updateUser){
  //   try{
  //     const userToUpdate = await database.User.
  //   }
  // }
}

export default UserService;
