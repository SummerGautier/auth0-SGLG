import styled from "styled-components"
import {makeStyles} from '@material-ui/core'

const sunsetPurple = "#22223b"
const sunsetPurpleRgbaTranslucent = "#9a8c98"
const sunsetOrange = "#4a4e69"
const sunsetOrangeBright = "#f2e9e4"

export const useStyles = makeStyles((theme) => ({
  root:{
    maxWidth:800,
    margin:"auto"
  },
  header: {
    backgroundColor: sunsetPurple,
    padding: theme.spacing(3),
    fontWeight: "bold",
    textAlign: "center",
    color: "#c9ada7",
    borderRadius: 3,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0
  },
  messageHistory: {
    padding: theme.spacing(3),
    backgroundColor: sunsetPurpleRgbaTranslucent,
    overflowX: "hidden",
    overflowY: "scroll",
    scrollSnapAlign: "end",
    overscrollBehaviorY: "contain",
    scrollSnapType: "y proximity",
    paddingBottom: theme.spacing(6),
    boxShadow:"inset -2px 2px 10px 5px rgba(0,0,0,0.2)"
  },
  messageInput: {
    padding: theme.spacing(3),
    backgroundColor:"rgba(0,0,0,0.1)"
  },
  button: {
    backgroundColor: sunsetPurple,
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
  box-shadow:2px 2px 10px 2px rgba(0,0,0,0.3);
  font-weight:600;
  padding:20px 30px;
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
 background: ${sunsetOrange};
 align-self: flex-end;
 &:last-child{
     marginBottom:100px;
 }
 &:before {
  right: -7px;
  border-right: 20px solid ${sunsetOrange};
  border-bottom-left-radius: 16px 14px;
  transform: translate(0, -2px);
 }
 &:after {
  right: -56px;
  width: 26px;
  background: ${sunsetPurpleRgbaTranslucent};
  border-bottom-left-radius: 10px;
  transform:translate(-30px, -2px);
 }
`
export const FromYou = styled(ConversationBubble)`
 background: ${sunsetOrangeBright};
 color:${sunsetPurpleRgbaTranslucent};
 &:before {
  left:-7px;
  border-left:20px solid ${sunsetOrangeBright};
  border-bottom-right-radius: 16px 14px;
  transform:translate(0, -2px);
 }
 &:after {
  left: 4px;
  width: 26px;
  background: ${sunsetPurpleRgbaTranslucent};
  border-bottom-right-radius: 10px;
  transform: translate(-30px, -2px);
 }
`

