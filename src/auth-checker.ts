import { AuthChecker } from "type-graphql";

const customAuthChecker: AuthChecker = ({ root, args, context, info}, roles) => {
    const a = 3;
    const role = parseInt(roles[1]);
    return  a === role;
};

export default customAuthChecker;