import { useAppContext } from "@/context/app-context";
import MirageLoader from "./mirage-loader";



const UserCheck = ({children}) => {

    const {user} = useAppContext();

    return (
        <div className=""
        >
            {
                user?
                children:
                <MirageLoader />
            }
        </div>
    );
}
 
export default UserCheck;