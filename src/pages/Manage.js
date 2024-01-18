import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { BoxCard, CreateNewBoxCard } from "../components/BoxCard";
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

function ManageList(){
    const defaultTheme = createTheme();
    const cards = [1];
    return(
        <>
            <ThemeProvider theme={defaultTheme}>
                <CssBaseline />
                <main>
                    <Container sx={{ py: 8 }} maxWidth="lg">
                        <Grid container spacing={5}>
                            {cards.map((i) => (
                                <BoxCard key={i} />
                            ))}
                            
                            <CreateNewBoxCard onClick={() => console.log("asdasd")} />
                        </Grid>
                    </Container>
                </main>
            </ThemeProvider>
        </>
    )
}


function ManageBox(props){
    const navigate = useNavigate();
    const { boxId } = useParams();
    const defaultTheme = createTheme();
    
    if(!boxId) return navigate("/manage");

    return(
        <>
            
        </>
    );
}



export {
    ManageList,
    ManageBox
}