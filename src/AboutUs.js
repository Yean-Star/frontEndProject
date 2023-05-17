import React, { useState, useEffect } from 'react';

import book from './image/book1.jpg';
import work from './image/work.jpg';
import classroom from './image/classroom.jpg';
import monkeyBook from './image/monkeyBook.png';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';


import './App.css';
import { Link } from 'react-router-dom';
import glovalVars from './globalVar';

function AboutUs(prop) {


  return (
    <Container className="w-10 mw-10">
      <Row className="justify-content-center" style={{ marginTop: '20px' }}>
        <Card className="pt-2" style={{ width: 'fit-content', padding: '13px', fontSize: '50px', backgroundColor: '#F9FBE7', borderStyle: 'groove',marginLeft: '20px' }}  >
          <Col className="text-end">
            About us </Col>
        </Card>
      </Row>
      <Row className="justify-content-center" style={{ marginTop: '20px' }}>
        <Card className="pt-2" style={{ width: 'fit-content', padding: '13px', fontSize: '20px', backgroundColor: '#F9FBE7', borderStyle: 'groove',marginLeft: '20px' }}  >
          <Col>
          <p><b>Welcome</b> to the extraordinary and enchanting world of primate royalty! In this course, you will embark on a thrilling journey to discover the secrets of becoming the undisputed King of Monkeys. Prepare to swing from branch to branch, adorned in a majestic crown of foliage, as you learn the art of ruling over your simian subjects.</p>

          <p><b>Unleash</b> your inner monkey monarch as we delve into a comprehensive curriculum that covers everything from mastering the perfect banana toss to commanding an army of mischievous minions. Our esteemed faculty of experienced primatologists and mischievous jesters will guide you through a series of transformative lessons, designed to empower you with the skills needed to ascend to the highest echelons of the monkey kingdom.</p>

<p><b>Unleash</b> your natural charm and charisma as you participate in interactive exercises, including banana peeling contests and coconut juggling spectacles. Hone your regal demeanor as we delve into the intricacies of regal grooming techniques, ensuring your fur is always impeccably styled. Uncover the secrets of simian strategy in political power plays, as you navigate the treacherous jungle terrain with cunning and wit.</p>

<p>But beware, dear learner, for ruling as the King of Monkeys comes with great responsibility. You must maintain harmony within your realm, resolve conflicts between rival monkey factions, and safeguard the sacred banana groves from would-be invaders. Only the most cunning and astute students will rise to the top and claim their rightful place on the throne of primatology.</p>

<p>So, if you're ready to swing through the canopy of knowledge and embrace your destiny as the crowned ruler of the monkey world, enroll in this extraordinary course today. Your reign awaits, and the jungle drums are calling your name. <h3>Get ready to monkey around like never before!</h3></p></Col>
        </Card>
      </Row>
    </Container >
  );
}

export default AboutUs;