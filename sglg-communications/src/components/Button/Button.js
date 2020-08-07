import React from 'react';
import styled from 'styled-components';

const getPaddingBySize = (props) => {
    const sizes ={
        small: "5",
        medium: "10px",
        large: "15px"
    }
    return sizes[props.size];
}

const Button = styled.button`
    width: 100px;
    padding: ${props => getPaddingBySize(props)};
    background: #fff;
    border: 1px solid #000
    border-radius: 5px;
    margin: 5px;
`

export default Button;
