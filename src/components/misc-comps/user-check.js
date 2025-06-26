import { useAppContext } from "@/context/app-context";
import MirageLoader from "./mirage-loader";



const UserCheck = ({children}) => {

    const {user,userData} = useAppContext();

    return (
        <div className=""
        >
            {
                (user&&userData)?
                children:
                <MirageLoader />
            }
        </div>
    );
}
 
export default UserCheck;