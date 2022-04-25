import Item from '@mui/material/Grid';
import { Card, CardMedia } from "@mui/material"
import WelcomeImage from '../assets/images/welcomeImage.jpeg'
import { Grid, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles(theme=>({
    welcomePage:{
      maxWidth:'100%',
    },
    welcomePageTitle:{
        paddingTop:'20px',
        paddingBottom:'20px',
    },
    welcomePageText:{
        textAlign:'center'
    }
    
}))

const Home = () => {

    const classes = useStyles()
  
    
    return(
        <Grid container justifyContent={'center'} className={classes.welcomePage}>
            <Grid item xs={12} md={6} lg={6} xl={6} className={classes.welcomePageTitle}>
                <Item>
                    <CardMedia 
                        component={'img'}
                        src={WelcomeImage} 
                    />
                </Item>
            </Grid>

            <Grid item xs={12} md={12} lg={12} xl={12} >
                <Item>
                    <Typography variant='h2' className={classes.welcomePageText}>
                        Live more. Stress less. Live better
                    </Typography>
                </Item>
            </Grid>
        </Grid>
    )
}

export default Home