import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import {AxiosDigest} from "axios-digest"
import axios from "axios"
const getResponse = (props) => {
    var data = JSON.stringify({"name":"chatroom-"+uuidv4(),"orgId":props.organizationId});

    var config = {
        method: 'POST',
        url: 'https://cloud.mongodb.com/api/atlas/v1.0/groups',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data,
        auth: {
            username: props.public,
            password: props.private
        },
    };

    axios(config).then(function (response) {
        console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log("")
        console.log(error);
    });
}

const Chat = (props) =>{
    const response = getResponse(props)
    return (
        <div>
            Response: {response}
        </div>
    )
}

export default Chat;
