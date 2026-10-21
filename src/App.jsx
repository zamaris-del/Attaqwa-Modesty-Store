import { useState } from 'react'

export default function App(){
  const [user,setUser]=useState(null)
  const [name,setName]=useState('')
  const [worth,setWorth]=useState(0)
  const [cars,setCars]=useState([])
  const [jets,setJets]=useState([])
  const [badges,setBadges]=useState([])
  const [inbox,setInbox]=useState([{from:"Mushin Boy (Bike 2k)",msg:"Boss abeg make I join Banana Island group?",paid:false}])
  const [hajjStep,setHajjStep]=useState(0)
  const [jerStep,setJerStep]=useState(0)

  const hajjSteps=["1. Ihram - Labbayk Allahumma","2. Tawaf - 7x round Kaaba","3. Sa'i - Safa to Marwah 7x","4. Mina - Stay in Tent","5. Arafat - Dua 15mins (Day of Forgiveness)","6. Muzdalifah - Pick Stones","7. Jamarat - Stone Shaytan","8. Sacrifice - You are now ALHAJI 🕋"]
  const jerSteps=["1. Mount of Olives","2. Via Dolorosa - 14 Stations","3. Holy Sepulchre - Jesus Tomb","4. Jordan River - Baptism","5. Bethlehem - Nativity","6. Sea of Galilee - Boat Ride","7. Wailing Wall - You are now JP ✝️"]

  const buy=(item,price,type)=>{
    setWorth(w=>w+price)
    if(type==='car') setCars([...cars,item])
    if(type==='jet') setJets([...jets,item])
    if(type==='hajj'){ setBadges([...badges,"Alhaji 🕋"]); alert("Hajj Mabroor! + Alhaji Title")}
    if(type==='jer'){ setBadges([...badges,"JP ✝️"]); alert("Jerusalem Pilgrim! + JP Title")}
    alert(item+" delivered to garage!")
  }

  if(!user){
    return(
      <div style={{padding:30,textAlign:'center'}}>
        <h1>🏠 Zamari House Link Up V17</h1>
        <p>Lagos Real Life Sim - Hajj, Jerusalem, Jets, Banana Island</p>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your street name" style={{padding:12,width:'80%',marginTop:20}}/>
        <br/><br/>
        <button onClick={()=>setUser({name})} style={{padding:"14px 30px",background:"black",color:"white"}}>ENTER LAGOS</button>
        <p style={{marginTop:20,fontSize:12}}>NEPA takes light 3x daily • MOPOL 4 if Worth 10k+</p>
      </div>
    )
  }

  return(
    <div style={{padding:15,fontFamily:'sans-serif',maxWidth:600,margin:'0 auto'}}>
      <div style={{background:'red',color:'white',padding:6,fontSize:12}}>🔴 Radio Lagos 99.3 LIVE: EFCC raid Lekki! Dollar na ₦1800! NEPA don take light for Mushin!</div>
      
      <h2>Welcome {user.name} 👑 Worth: ₦{worth.toLocaleString()} </h2>
      <p>Badges: {badges.join(' ')} | Security: {worth>=10000?"🚔 4 MOPOL + Convoy 🚨":"No security - waka with care"} | Garage: {cars.length} cars, {jets.length} jets</p>

      <div style={{background:'#eee',padding:10,margin:'10px 0'}}>
        <b>WhatsApp Hierarchy:</b><br/>
        Bike 2k ❌ cannot chat Brabus 10k - Need ₦300 Paid Message → Goes to Message Request<br/>
        Groups: Banana Island Landlords (Brabus Gold only), Mushin Ghetto Boys (All)
      </div>

      <h3>INBOX (Message Request)</h3>
      <div style={{border:'1px solid #ccc',padding:8}}>
        {inbox.map((m,i)=><div key={i} style={{borderBottom:'1px solid #ddd',padding:5}}><b>{m.from}:</b> {m.msg} {m.paid?<span style={{color:'green'}}>[PAID ₦300]</span>:<button onClick={()=>{setWorth(w=>w+300); alert("You paid ₦300 to chat Brabus boss")}}>Pay ₦300 to reply</button>}</div>)}
      </div>

      <h3>BUY - Auto Delivery Garage</h3>
      <div style={{display:'flex',flexWrap:'wrap',gap:6}}>
        <button onClick={()=>buy('Bike 2k',2000,'car')}>Bike ₦2k</button>
        <button onClick={()=>buy('Corolla 3k',3000,'car')}>Corolla ₦3k</button>
        <button onClick={()=>buy('G-Wagon 5k',5000,'car')}>G-Wagon ₦5k</button>
        <button onClick={()=>buy('Brabus Gold 10k',10000,'car')}>Brabus Gold ₦10k</button>
        <button onClick={()=>buy('Small Jet 50k',50000,'jet')}>Small Jet ₦50k - Fly Mecca/Jeru/USA</button>
        <button onClick={()=>buy('Big Jet 250k',250000,'jet')}>Big Jet ₦250k</button>
        <button onClick={()=>buy('Hajj 15k',15000,'hajj')}>Hajj ₦15k 🕋</button>
        <button onClick={()=>buy('Jerusalem 15k',15000,'jer')}>Jerusalem ₦15k ✝️</button>
      </div>

      <div style={{display:'flex',gap:10,marginTop:15}}>
        <div style={{border:'2px solid green',padding:10,width:'50%'}}>
          <h4>Hajj 🕋 {hajjStep+1}/8</h4>
          <p>{hajjSteps[hajjStep]}</p>
          <button onClick={()=>setHajjStep(s=>Math.min(s+1,7))}>Next Step</button>
          {hajjStep===7 && <p style={{color:'green'}}>Alhaji {user.name}! 🕋</p>}
        </div>
        <div style={{border:'2px solid gold',padding:10,width:'50%'}}>
          <h4>Jerusalem ✝️ {jerStep+1}/7</h4>
          <p>{jerSteps[jerStep]}</p>
          <button onClick={()=>setJerStep(s=>Math.min(s+1,6))}>Next Step</button>
          {jerStep===6 && <p style={{color:'goldenrod'}}>JP {user.name}! ✝️</p>}
        </div>
      </div>

      <p style={{marginTop:15}}>🚔 Police Checkpoint: Pay ₦500 or go Alagbon! | 🛡️ EFCC fit raid if you brag too much</p>
      <p><b>Your Garage:</b> {cars.join(', ')||'Empty'} | <b>Jets:</b> {jets.join(', ')||'Empty'}</p>
    </div>
  )
        }
