import Item from '@mui/material/Grid';
import { Card, CardMedia } from "@mui/material"
import WelcomeImage from '../assets/images/welcomeImage.jpeg'
import { Grid, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles(theme=>({
    welcomePage:{
      marginTop:'20px'
    },
    welcomePageTitle:{
        marginTop:'20px',
        paddingTop:'20px',
        paddingBottom:'20px',
        backgroundColor:'#a2c3c8',
        bottom:'0',
        position:'fixed',
        left:'0',
        right:'0'
    },
    
}))

const Home = () => {

    const classes = useStyles()

    return(
        <Grid container justifyContent={'center'} className={classes.welcomePage}>
            <Grid item xs={12} md={6} lg={6} xl={6}>
                <Item>
                    <CardMedia 
                        component={'img'}
                        src={WelcomeImage} 
                    />
                </Item>
            </Grid>

            <Grid item xs={12} md={12} lg={12} xl={12} className={classes.welcomePageTitle}>
                <Item>
                    <Typography variant='h2'>
                        Live more. Stress less. Live better
                    </Typography>
                </Item>
            </Grid>
        </Grid>
    )
}

export default Home