
import { CardMedia, Grid, Typography} from "@mui/material"
import Item from '@mui/material/Grid'
import { makeStyles } from "@material-ui/core"
import Feature1 from '../assets/images/feature1.jpeg'
import Feature2 from '../assets/images/feature2.jpeg'

const useStyles = makeStyles(theme=>({
    container:{
      paddingRight:'10px',
      paddingLeft:'10px',
      paddingTop:'10px'
    },
    feature1:{
        paddingTop:'50px',
        textAlign:'justifY',
        paddingLeft:'10px'
    },
    feature2:{
        paddingTop:'50px',
        textAlign:'justifY',
       
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
    image1:{
        marginTop:'50px',
        marginRight:'20px',
        [theme.breakpoints.down('xs')]:{
            marginLeft:'2px',
            marginTop:'10px',
            marginBottom:'0'
        },
        [theme.breakpoints.up('lg')]:{
            marginLeft:'2px',
            marginTop:'50px',
            marginBottom:'0',
            maxWidth:'200px'
        },
    },
    image2:{
        marginTop:'60px',
        marginLeft:'20px',
        marginRight:'10px',
        [theme.breakpoints.down('xs')]:{
            marginLeft:'2px',
            marginTop:'10px',
            marginBottom:'0',

        },
        [theme.breakpoints.up('lg')]:{
            marginRight:'2px',
            marginTop:'50px',
            marginBottom:'0',
            maxWidth:'200px'
        },
    },
     
}))

const HowItWorks = () => {

    const classes = useStyles()

    return(
        <Grid container className={classes.container} justifyContent='center' >

            <Grid item xs={12} md={2} lg={2} xl={2}>
                <Item >
                    <CardMedia 
                    className={classes.image1}
                    component={'img'}
                    src={Feature1}>
                    </CardMedia>
                </Item>
            </Grid>

            <Grid item xs={12} md={9} lg={8} xl={6} className={classes.feature1}>
                <Item>
                    <Typography component={'p'}>
                    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
                   
                    </Typography>
                </Item>
            </Grid>

            <Grid item xl={12}>

            </Grid>
            
            <Grid item xs={12} md={9} lg={8} xl={6} className={classes.feature2}>
                <Item>
                    <Typography component={'p'}>
                    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
            
                    </Typography>
                </Item>
            </Grid>

            <Grid item xs={12} md={2} lg={2} xl={2}>
                <Item>
                    <CardMedia 
                    className={classes.image2}
                        component={'img'}
                        src={Feature1}>
                    </CardMedia>
                </Item>
            </Grid>

        </Grid>
    )
}

export default HowItWorks