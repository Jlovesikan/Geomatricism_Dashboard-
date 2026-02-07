import { Grid } from '@mui/material'
import React from 'react'
import Card from './card';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import EventNoteIcon from '@mui/icons-material/EventNote';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';

export default function HomeCard() {
  return (
   <Grid container sx={{
   
    justifyContent: "center",
    alignItems: "center",
  
   }}>
    <Grid item md={3} xs={6}>
      <Card 
      Icon={PeopleAltRoundedIcon}
      iconColor='#1a89d3'
      title='Total Employee'
      no='420'
      total='Total Employees'
      />
    </Grid>
    <Grid item md={3} xs={6}>
        <Card 
      Icon={EventNoteIcon}
      iconColor='#051353'
      title='Active Project'
      no='68'
      total='Active Projects'
      />
    </Grid>
    <Grid item md={3} xs={6}>
        <Card 
      Icon={CheckBoxIcon}
      iconColor='#38ce24'
      title='Task Completed'
      no='1950'
      total='Task Completed'
      />
    </Grid>
    <Grid item md={3} xs={6}>
        <Card 
      Icon={LocalPoliceIcon}
      iconColor='#fa593d'
      title='Pending Task'
      no='86'
      total='Pending Task'
      />
    </Grid>
   </Grid>
  )
}
