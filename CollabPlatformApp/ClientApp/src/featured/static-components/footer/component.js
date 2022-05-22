import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const FooterComponent = () => {
    return (
        <Container>
            <div class="footer">
                <Link 
                    className={'pageName'}
                    to="/"
                    style={{textDecoration:"none"}}>
                        <h4 style={{
                            marginTop: "20px", 
                            textAlign:"center", 
                            fontSize: "23px", 
                            textDecoration:"none", 
                            fontWeight: "300",
                            color:"black"}}>
                            CollabPlatform
                        </h4>
                </Link>
            </div>
        </Container>
        
    )
}

export default FooterComponent;