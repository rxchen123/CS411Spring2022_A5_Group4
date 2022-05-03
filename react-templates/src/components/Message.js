import React from "react";

function getMessage(props) {
    axios({
        method: "GET",
        //how to get a message from the backend?
        //grabbing from whatever we need
        url: "/" + props.url,
    })
    .then((response) => {
        const res = response.data
        setMessage(({
            //profile_name: res.name,
            //about_me: res.about
            message: res.message;
        }))
    }).catch((error) => {
        if (error.response) {
            console.log(error.response)
            console.log(error.response.status)
            console.log(error.response.headers)
        }
    })
}

class Message extends React.Component {
    render() {
        return (
            <div>
                <h4></h4>
            </div>
        );
    }
}

export default Message;
