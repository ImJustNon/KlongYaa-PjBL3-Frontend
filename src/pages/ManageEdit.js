import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";



function ManageBox(props){
    const navigate = useNavigate();
    const { boxId } = useParams();
    // const defaultTheme = createTheme();
    
    if(!boxId) return navigate("/manage");

    return(
        <>
            {boxId}
        </>
    );
}


export default ManageBox;