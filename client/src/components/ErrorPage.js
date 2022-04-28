import { useNavigate } from "react-router-dom"
import { Dialog,DialogContent,DialogContentText,DialogActions } from "@mui/material";
import { useState } from "react";
import { Button } from "@material-ui/core";

const ErrorPage = () => {

    const navigate = useNavigate()
    const [error, setError] = useState(true)

    const redirectToHome = () => {
        setError(false)
        navigate('/')
    }

    return(
        <Dialog open={error} maxWidth='md'>
            <DialogContent>
                <DialogContentText>
                   You probably forgot to enter your CLIENT ID and CLIENT SECRET to enable Facebook login.
                   Click bellow to return to home page
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                    <Button color="primary" onClick={redirectToHome}>Return to home page</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ErrorPage