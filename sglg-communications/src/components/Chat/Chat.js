import React from 'react';
import DigestFetch from "digest-fetch"
import { v4 as uuidv4 } from 'uuid';

const getResponse = (props) => {
    const client = new DigestFetch(props.public, props.private)
    client.fetch("https://cloud.mongodb.com/api/atlas/v1.0/groups", 
        {
            method:'POST',
            body: JSON.stringify(
                {
                    "name":"chatroom-"+uuidv4(),
                    "orgId":props.organizationId
                }
            )
        }
    )
    .then(resp=>resp.json())
    .then(data=>data)
    .catch(e=>e)
}

const Chat = (props) =>{
    const response = getResponse(props)
    return (
        <div>
            Respone: {response}
        </div>
    )
}

export default Chat;
