import React from 'react'
import { Container, Header, Image, Segment } from 'semantic-ui-react'
import Profile from '../assets/profile.jpg'
const About: React.FC = () => {
    return (
            <Container className="about-page" textAlign="center">
                <Image centered circular size="medium" src={Profile} />
                <Segment>
                    <Header>Hi! my name is Nadav Samuel and i'm a <strong>Full-Stack</strong> developer!
</Header>
                    <Container textAlign="left" as="p" >I'm 22 years old, born in Givaataim, Israel. Motivational fullstack web developer. People person and a team player.</Container>
                    <Container textAlign="left" as="p" >I took this project as an opportunity to study some new technologies: MobX for state management and Typescript.
                    </Container>
                    <Container textAlign="left">
                        <a href="https://nadav-samuel-portfolio.herokuapp.com/#/">Check out my portfolio!</a>
                        <br />
                        <br />
                        <a href="https://www.linkedin.com/in/nadav-samuel-0b51291b9/">Check out my Linkedin!</a>
                    </Container>
                    <Header as="h2" textAlign="left">samuelna9@gmail.com</Header>
                </Segment>

            </Container>


    );
}
export default About