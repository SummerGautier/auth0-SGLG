import React from 'react';
import Chat from './Chat';

export default { title: 'Chatroom' };

export const chat = () => <Chat 
        organizationId={process.env.ORGANIZATION_ID}
        public={process.env.PUBLIC_KEY}
        private={process.env.PRIVATE_KEY}
     />;