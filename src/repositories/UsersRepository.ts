import { Repository, EntityRepository } from 'typeorm';
import Users from '../models/Users';
import { CreateUserDTO, ResultUserDTO } from '../dtos/users';

@EntityRepository(Users)
export default class UsersRepository extends Repository<Users> {
    async createUser(user: CreateUserDTO): Promise<ResultUserDTO | false> {
        try {
            const result = this.create(user);

            await this.save(result);

            return result;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}
