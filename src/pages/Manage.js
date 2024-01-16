import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';


function ManageList(){
    return(
        <>
            Manage
        </>
    )
}


function ManageBox(props){
    const navigate = useNavigate();
    const { boxId } = useParams();
    
    if(!boxId) return navigate("/manage");

    return(
        <>
            Manage : {boxId}
        </>
    );
}



export {
    ManageList,
    ManageBox
}