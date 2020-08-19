import { CompletePhoneVerificationMutationArgs, CompletePhoneVerificationResponse} from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';
import Verification from "../../../entities/Verification";
import User from "../../../entities/User";
import createJWT from '../../../utils/createJWT';

const resolvers: Resolvers = {
    Mutation:{
        CompletePhoneVerification: async (
            _,
            args: CompletePhoneVerificationMutationArgs
        ):Promise<CompletePhoneVerificationResponse> =>{
            const {phoneNumber,key} = args;
            try{
                const verification = await Verification.findOne({
                    payload: phoneNumber,
                    key
                });
                if(!verification){
                    return{
                        ok: false,
                        error: "Verification token not valid",
                        token: null
                    };
                }else{
                    verification.verified = true;
                    verification.save();
                }
            }catch(error){
                return {
                    ok: false,
                    error: error.message,
                    token: null
                };
            }
            try{
            }catch(error){
                return{
                    ok: false,
                    error: error.message,
                    token: null
                };
            }
            try{
                const user = await User.findOne({phoneNumber});
                if(user){
                    user.verifiedPhoneNumber = true;
                    user.save();
                    const token = createJWT(user.id);
                    return{
                        ok: true,
                        error: null,
                        token
                    };
                }else{ //폰 번호는 verified 되었지만 존재하지 않는다
                    return{
                        ok: true,
                        error: null,
                        token: null
                    };
                }
            } catch(error){
                return{
                    ok: false,
                    error: error.message,
                    token: null
                }
            }
        }
    }
}

export default resolvers;