import React, {useEffect, useState} from 'react';
import {Button, Grid, Paper, TextField, Typography} from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send';
import * as axios from 'axios'
import {Conversation, FromMe, FromYou, useStyles} from './styles'


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
