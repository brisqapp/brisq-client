import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { FormControl, Select, InputLabel, MenuItem , Paper} from "@mui/material";
import AgendaReadOnly from "../../component/agendaReadOnly";

const Reservation = () => {
    const { id } = useParams();
    const info = {
        name: "Test Salon un peu long et chiant comme nom de merde",
        employes: [
            {id: 1, name: "Olivier Tissot"},
            {id: 2, name: "Peer Vincent"}
        ]
    }
    const formsValue = {
        employe: 2
    }
    return (
    <div>
        <Paper elevation={3} style={{margin: "30px", padding: "30px"}}>
            <Typography variant="h3"> Réservation </Typography>
            <Typography variant="h5"> {info.name} </Typography><br />
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Employé</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={formsValue.employe}
                    label="Employé"
                >
                    {info.employes.map(e => {
                        return(<MenuItem value={e.id}>{e.name}</MenuItem>)
                    })}
                </Select>
            </FormControl>
            <AgendaReadOnly />
        </Paper>
    </div>
    );
};
  
export default Reservation;