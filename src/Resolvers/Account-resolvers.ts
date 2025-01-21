import { Arg, Authorized, ID, Int, Mutation, Query, Resolver } from "type-graphql";
import Account from "../Entities/user";
import { AppDataSource } from "../datasource";

@Resolver(Account)
export default class AccountResolvers {

    @Authorized(2, 3)
    @Query(() => [Account])
    async accounts(): Promise<Account[]>{
        const accountRepository = AppDataSource.getRepository(Account);
        return accountRepository.find();
    };

    @Query(() => Account)
    async account(@Arg('id', () => ID) id: string): Promise<Account | null>{
        const accountRepository = AppDataSource.getRepository(Account);
        const parsedID = parseInt(id)
        return accountRepository.findOne({ where: { id: parsedID } })
    }

    @Mutation(() => Account)
    async createAccount(
        @Arg('name', () => String) name: string,
        @Arg('email', () => String) email: string,
        @Arg('password', () => String) password: string,
        @Arg('role', () => Int) role: number
    ) :Promise<Account>{
        const accountRepository = AppDataSource.getRepository(Account);
        const account = accountRepository.create({name, email, password, role});
        return accountRepository.save(account);
    }
}