import React, { useEffect, useState } from 'react';
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
   },
   messageHistory:{
       padding:theme.spacing(3),
       backgroundColor:"rgba(81, 0, 45,0.1)",
        overflowX: "hidden",
        overflowY: "scroll",
        scrollSnapAlign: "end",
        overscrollBehaviorY: "contain",
        scrollSnapType: "y proximity",
   },
   messageInput:{
       padding:theme.spacing(3),
       //borderTop:"1px solid rgba(0,0,0,0.5)"
   },
   button:{
        backgroundColor:"#540032",
        color:"white",
        transition:"250ms",
        '&:hover':{
            backgroundColor:"black"
        }
   },
}));



export const Conversation = styled.div`
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  font-size: 16px;
  font-weight: normal;
  margin: 10px 10px;
  padding: 30px 30px;
  display: flex;
  height:50vh;
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
    const [messageHistoryStore,setMessageHistoryStore] = useState([])
    const [inputMessage, setInputMessage] = useState("")

    useEffect(()=>{
        setMessageHistoryStore(
            [
                {
                    "content":"Hello, Sam!",
                    "timestamp": 0,
                    "from":"you"
                },
                {
                    "content":"How's the hackathon?",
                    "timestamp":1,
                    "from":"me"
        
                },
                {
                    "content":"um, it's going...",
                    "timestamp":2,
                    "from":"you"
                }
            ]

        )
    },[])

    const handleSubmit = (e) =>{
        if(inputMessage.trim() !== ""){
            const timestamp = messageHistoryStore.length
            setMessageHistoryStore([...messageHistoryStore,{
                content:inputMessage,
                timestamp:timestamp,
                from:"me"
            }])
            setInputMessage("")
            var elem = document.getElementById('messageHistory');
            console.log(elem.scrollTop, elem.scrollHeight)
            elem.scrollTop = elem.scrollHeight;
            
        }
    }


    return (
        <div className={classes.container}>
        <Grid className={classes.root} component={Paper} elevation={3} container direction="column" alignItems="stretch" justify="center" >
            <Grid className={classes.header} item xs={12}>
               <Typography variant='h5'> Chat Title Here</Typography>
            </Grid>
            <Grid className={classes.messageHistory} id="messageHistory" item xs={12}>
                <Conversation>
                    {
                        messageHistoryStore.map((message)=>{
                            if(message.from === "me"){
                                return <FromMe key={message.timestamp}>{message.content}</FromMe>
                            }else{
                                return <FromYou key={message.timestamp}>{message.content}</FromYou>
                            }
                        })
                    }
                </Conversation>
            </Grid>
            <Grid className={classes.messageInput} item xs={12}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={7} md={11}>
                        <TextField fullWidth id="outlined-basic" id="inputfield" value={inputMessage} onChange={(e)=>setInputMessage(e.target.value)} label="Enter a message" variant="outlined" />
                    </Grid>
                    <Grid item xs={5} md={1}>
                        <Button variant='contained' onClick={handleSubmit} className={classes.button}>SEND&nbsp;<SendIcon /></Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </div>
    )
}

export default Chat;