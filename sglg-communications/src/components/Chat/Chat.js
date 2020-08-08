import React from 'react';
import styled from "styled-components"
import {Grid, makeStyles, Paper,Typography,TextField, Button} from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles((theme)=>({
   header:{
       backgroundColor:"#540032",
       padding:theme.spacing(3),
       fontWeight:"bold",
       textAlign:"center",
       color:"white",
       borderRadius:3,
       borderBottomRightRadius:0,
       borderBottomLeftRadius:0,
   },
   root:{
       //border:"1px solid rgba(0,0,0,0.5)"
   },
   messageHistory:{
       padding:theme.spacing(3),
       backgroundColor:"rgba(81, 0, 45,0.1)"
   },
   messageInput:{
       padding:theme.spacing(3),
       //borderTop:"1px solid rgba(0,0,0,0.5)"
   },
   button:{
        backgroundColor:"#540032",
        color:"white"
   }
}));


export const Conversation = styled.div`
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  font-size: 16px;
  font-weight: normal;
  margin: 10px 10px;
  padding: 30px 30px;
  display: flex;
  flex-direction: column;
  padding: 10px;
`
export const ConversationBubble = styled.p`
  max-width: 255px;
  word-wrap: break-word;
  margin-bottom: 12px;
  line-height: 24px;
  position:relative;
  padding:10px 20px;
  border-radius:25px;
  &:before, &:after {
    content: "";
   position: absolute;
    bottom: -2px;
    height: 20px;
}
`
export const FromMe = styled(ConversationBubble)`
 color: white;
 background: #F1424F;
 align-self: flex-end;
 &:before {
  right: -7px;
  border-right: 20px solid #F1424F;
  border-bottom-left-radius: 16px 14px;
  transform: translate(0, -2px);
 }
 &:after {
  right: -56px;
  width: 26px;
  background: #EDE5EA;
  border-bottom-left-radius: 10px;
  transform:translate(-30px, -2px);
 }
`
export const FromYou = styled(ConversationBubble)`
 background: #ff8e58;
 color:black;
 &:before {
  left:-7px;
  border-left:20px solid #ff8e58;
  border-bottom-right-radius: 16px 14px;
  transform:translate(0, -2px);
 }
 &:after {
  left: 4px;
  width: 26px;
  background: #EDE5EA;
  border-bottom-right-radius: 10px;
  transform: translate(-30px, -2px);
 }
`

const Chat = (props) =>{
    const classes = useStyles()
    return (
        <Grid className={classes.root} component={Paper} elevation={3} container direction="column" alignItems="stretch" justify="center" >
            <Grid className={classes.header} item xs={12}>
               <Typography variant='h5'> Chat Title Here</Typography>
            </Grid>
            <Grid className={classes.messageHistory} item xs={12}>
                <Conversation>
                    <FromMe> HELLOkdfjlakdsjf;lakje</FromMe>
                    <FromYou> Como estas? </FromYou>
                </Conversation>
            </Grid>
            <Grid className={classes.messageInput} item xs={12}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={7} md={11}>
                        <TextField fullWidth id="outlined-basic" label="Outlined" variant="outlined" />
                    </Grid>
                    <Grid item xs={5} md={1}>
                        <Button variant='contained' className={classes.button}>SEND&nbsp;<SendIcon /></Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Chat;