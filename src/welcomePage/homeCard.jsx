import { Grid } from '@mui/material'
import React from 'react'
import Card from './card';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import EventNoteIcon from '@mui/icons-material/EventNote';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import { useEffect, useState } from "react";

export default function HomeCard() {

const [Empcount, setCount] = useState(0);

useEffect(() => {
const fetchEmployeeCount = async () => {
try {
const snapshot = await getDocs(collection(db, "Employees "));
console.log("Total Employees:", snapshot.size); // snapshot.size is the count
setCount(snapshot.size);
} catch (error) {
console.error("Error getting employee count:", error);
}
};

fetchEmployeeCount();
}, []);



const [Procount, setProCount] = useState(0);

useEffect(() => {
const fetProCount = async () => {
try {
const snapshot = await getDocs(collection(db, "Projects"));
console.log("Total Projects:", snapshot.size); // snapshot.size is the count
setProCount(snapshot.size);
} catch (error) {
console.error("Error getting Projects count:", error);
}
};

fetProCount();
}, []);




const [Taskcount, settaskCount] = useState(0);

useEffect(() => {
const fetchEmployeeCount = async () => {

const snapshot = await getDocs(collection(db, "Task"));
let count = 0;

snapshot.forEach((doc) => {
const data = doc.data();

if (
data.Status === "complete"
) {
count++;
}

});
settaskCount(count);
};

fetchEmployeeCount();
}, []);


const [pendingCount, setPendingCount] = useState(0);

useEffect(() => {
const fetchTasks = async () => {
const querySnapshot = await getDocs(collection(db, "Task"));

let count = 0;

querySnapshot.forEach((doc) => {
const data = doc.data();

if (
data.Status === "progress" ||
data.Status === "on hold"
) {
count++;
}
});

setPendingCount(count);
};

fetchTasks();
}, []);


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
no={Empcount}
total='Total Employees'
/>
</Grid>
<Grid item md={3} xs={6}>
<Card 
Icon={EventNoteIcon}
iconColor='#051353'
title='Active Project'
no={Procount}
total='Active Projects'
/>
</Grid>
<Grid item md={3} xs={6}>
<Card 
Icon={CheckBoxIcon}
iconColor='#38ce24'
title='Task Completed'
no={Taskcount}
total='Task Completed'
/>
</Grid>
<Grid item md={3} xs={6}>
<Card 
Icon={LocalPoliceIcon}
iconColor='#fa593d'
title='Pending Task'
no={pendingCount}
total='Pending Task'
/>
</Grid>
</Grid>
)
}
