import React, {useEffect, useState} from 'react';
import styled from "styled-components"
import {Button, Grid, makeStyles, Paper, TextField, Typography} from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send';
import * as axios from 'axios'

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: "#540032",
    padding: theme.spacing(3),
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    borderRadius: 3,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0
  },
  messageHistory: {
    padding: theme.spacing(3),
    backgroundColor: "rgba(81, 0, 45,0.1)",
    overflowX: "hidden",
    overflowY: "scroll",
    scrollSnapAlign: "end",
    overscrollBehaviorY: "contain",
    scrollSnapType: "y proximity",
    paddingBottom: theme.spacing(6)
  },
  messageInput: {
    padding: theme.spacing(3)
    //borderTop:"1px solid rgba(0,0,0,0.5)"
  },
  button: {
    backgroundColor: "#540032",
    color: "white",
    transition: "250ms",
    '&:hover': {
      backgroundColor: "black"
    }
  }
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
 &:last-child{
     marginBottom:100px;
 }
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


const Chat = (props) => {
  const classes = useStyles()
  const [messageHistoryStore, setMessageHistoryStore] = useState([])
  const [inputMessage, setInputMessage] = useState("")
  const [covid19Facts, setCovid19Facts] = useState([]);
  const [covid19CountryIndexes, setCovid19CountryIndexes] = useState({});

  function countriesFrom(data) {
    let countriesKeys = {}
    let idx = 0
    for (let country of data['Countries']) {
      countriesKeys[country['Country']] = idx
      idx += 1
    }
    return countriesKeys
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        "https://api.covid19api.com/summary"
      );
      setCovid19Facts(result.data)
      setCovid19CountryIndexes(countriesFrom(result.data))
    };

    fetchData();
  }, []);

  useEffect(() => {
    setMessageHistoryStore(
      [
        {
          "content": "Hello, Sam!",
          "timestamp": 0,
          "from": "you"
        },
        {
          "content": "How's the hackathon?",
          "timestamp": 1,
          "from": "me"

        },
        {
          "content": "um, it's going...",
          "timestamp": 2,
          "from": "you"
        }
      ]
    )
  }, [])

  /**
   * https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
   * Returns a random integer between min (inclusive) and max (inclusive).
   * The value is no lower than min (or the next integer greater than min
   * if min isn't an integer) and no greater than max (or the next integer
   * lower than max if max isn't an integer).
   * Using Math.round() will give you a non-uniform distribution!
   */
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  function covid19Message(countryName) {
    const countryData = covid19Facts['Countries'][covid19CountryIndexes[countryName]]
    const newConfirmed = countryData['NewConfirmed']
    return `Did you know... on ${covid19Facts['Date']} there are ${newConfirmed} cases in ${countryName}`
  }

  function covidMessage(inputMessage, timestamp) {
    const requestedCountries = Object.keys(covid19CountryIndexes).filter(countryName => inputMessage.includes(countryName))
    if (requestedCountries.length > 0) {
      return {
        content: covid19Message(requestedCountries[0]),
        timestamp: timestamp + 1,
        from: "you"
      }
    } else {
      return {
        content: `Ask me about a country and I'll tell you a Covid-19 statistic`,
        timestamp: timestamp + 1,
        from: "you"
      }
    }
  }

  function addMessage(inputMessage) {
    const timestamp = messageHistoryStore.length
    setInputMessage("")
    const covidFact = covidMessage(inputMessage, timestamp)
    setMessageHistoryStore([...messageHistoryStore, {
        content: inputMessage,
        timestamp: timestamp,
        from: "me"
      },
        covidFact
      ]
    )
  }


  const handleSubmit = (e) => {
    if (inputMessage.trim() !== "") {
      addMessage(inputMessage)
      var elem = document.getElementById('messageHistory');
      elem.scrollTop = elem.scrollHeight;
    }
  }


  return (
    <div className={classes.container}>
      <Grid className={classes.root} component={Paper} elevation={3} container direction="column" alignItems="stretch"
            justify="center">
        <Grid className={classes.header} item xs={12}>
          <Typography variant='h5'> Chat Title Here</Typography>
        </Grid>
        <Grid className={classes.messageHistory} id="messageHistory" item xs={12}>
          <Conversation>
            {
              messageHistoryStore.map((message) => {
                if (message.from === "me") {
                  return <FromMe key={message.timestamp}>{message.content}</FromMe>
                } else {
                  return <FromYou key={message.timestamp}>{message.content}</FromYou>
                }
              })
            }
          </Conversation>
        </Grid>
        <Grid className={classes.messageInput} item xs={12}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={7} md={11}>
              <TextField fullWidth id="outlined-basic" id="inputfield" value={inputMessage}
                         onChange={(e) => setInputMessage(e.target.value)} label="Enter a message" variant="outlined"/>
            </Grid>
            <Grid item xs={5} md={1}>
              <Button variant='contained' onClick={handleSubmit} className={classes.button}>SEND&nbsp;
                <SendIcon/></Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default Chat;
