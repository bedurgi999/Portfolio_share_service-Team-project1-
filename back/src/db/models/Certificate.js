import { CertificateModel } from "../schemas/certificate";
import { UserModel } from "../schemas/user";

class Certificate {
  static async findUserById({ user_id }) {
    const user = await UserModel.findOne({ id: user_id });
    return user;
  }

  static async create({ newCertificate }) {
    const createdNewCertificate = await CertificateModel.create(newCertificate);
    return createdNewCertificate;
  }
}

export { Certificate };
