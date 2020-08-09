import React, {useEffect, useState} from 'react';
import {Button, Grid, Paper, TextField, Typography} from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send';
import * as axios from 'axios'
import {Conversation, FromMe, FromYou, useStyles} from './styles'


const Chat = (props) => {
  const classes = useStyles()
  const [messageHistoryStore, setMessageHistoryStore] = useState([])
  const [inputMessage, setInputMessage] = useState("")
  const [covidData, setCovidData] = useState([]);
  const [countryIndexes, setCountryIndexes] = useState({});

  function countriesFrom(data) {
    let countriesKeys = []
    for (let country of data['Countries']) {
        countriesKeys.push([country['Country'], country['Slug'], country['CountryCode']])
    }
    return countriesKeys
  }

  useEffect(() => {
    const fetchData = async () => {
      axios(
        "https://api.covid19api.com/summary"
      ).then((response)=>{
          setCovidData(response.data)
          setCountryIndexes(countriesFrom(response.data))
      });
      

    };
    fetchData();
  }, []);

  useEffect(() => {
    setMessageHistoryStore(
      [
        {
          "content": "Ask me about a country and I'll tell you a Covid-19 statistic",
          "timestamp": 0,
          "from": "you"
        }
      ]
    )
  }, [])


  function getCovidInfoByCountry(countryIndexNumber) {
    const countryData = covidData['Countries'][countryIndexNumber]
    const newConfirmed = countryData['NewConfirmed']
    return `According to John Hopkins, as of ${covidData['Date']} there are ${newConfirmed} cases of COVID-19 in ${countryData['Country']}`
  }

  function parseMessage(inputMessage){
    let countryIndex = "undefined"
    let closest = 0
    countryIndexes.map((countryAliases,index) => {
        const hasCountry = inputMessage.toLowerCase().includes(countryAliases[0].toLowerCase())? true : false
        const hasSlug = inputMessage.toLowerCase().includes(countryAliases[1].toLowerCase().replace(/-/g, " "))? true : false
        if(hasCountry || hasSlug){
            countryIndex = index
        }
    })[0];
    return countryIndex
  }

  function getBotResponse(inputMessage, timestamp) {

    const requestedCountry = parseMessage(inputMessage);

    if (requestedCountry !== "undefined") {
      return {
        content: getCovidInfoByCountry(requestedCountry),
        timestamp: timestamp + 1,
        from: "you"
      }
    } else {
      return {
        content: `Sorry, I don't understand. Ask me about any country and I'll tell you a Covid-19 statistic. Ex: 'Tell me about the United States of America'`,
        timestamp: timestamp + 1,
        from: "you"
      }
    }
  }

  function addMessage(inputMessage) {
    const timestamp = messageHistoryStore.length
    setInputMessage("")
    const response = getBotResponse(inputMessage, timestamp)
    setMessageHistoryStore([...messageHistoryStore, {
        content: inputMessage,
        timestamp: timestamp,
        from: "me"
      },
        response
      ]
    )
        setTimeout(function(){ 
            var elem = document.getElementById('messageHistory');
            elem.scrollTop = elem.scrollHeight;
        }, 250);

        
  }


  const handleSubmit = (e) => {
    if (inputMessage.trim() !== "") {
      addMessage(inputMessage)
    }
  }


  return (
    <div className={classes.container}>
      <Grid className={classes.root}  component={Paper} elevation={3} container direction="column" alignItems="stretch"
            justify="center">
        <Grid className={classes.header} item xs={12}>
          <Typography variant='h5'> Covid-19 ChatBot</Typography>
        </Grid>
        <Grid className={classes.messageHistory} id="messageHistory" item xs={12}>
          <Conversation  className={classes.scrollable}>
            {
              messageHistoryStore.map((message) => {
                if (message.from === "me") {
                  return <FromMe id={`message_${message.timestamp}`} key={message.timestamp}>{message.content}</FromMe>
                } else {
                  return <FromYou id={`message_${message.timestamp}`} key={message.timestamp}>{message.content}</FromYou>
                }
              })
            }
          </Conversation>
        </Grid>
        <Grid className={classes.messageInput} item xs={12}>
          <Grid container spacing={2} alignItems="center" justify="space-evenly">
            <Grid item xs={9} md={10}>
              <TextField fullWidth id="outlined-basic" id="inputfield" value={inputMessage}
                         onChange={(e) => setInputMessage(e.target.value)} label="Enter a message" variant="outlined"/>
            </Grid>
            <Grid item xs={3} md={2}>
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
