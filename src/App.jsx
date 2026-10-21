import { useState, useEffect } from 'react'

export default function App(){
  const [stage,setStage]=useState('bed')
  const [user,setUser]=useState(null)
  const [name,setName]=useState('')
  const [cash,setCash]=useState(12450)
  const [worth,setWorth]=useState(12450)
  const [tier,setTier]=useState(3)
  const [wanted,setWanted]=useState(0)
  const [nepa,setNepa]=useState(true)
  const [visaStatus,setVisaStatus]=useState(null)
  const [embassyStage,setEmbassyStage]=useState(null)
  const [queueNum,setQueueNum]=useState(0)
  const [inDolls,setInDolls]=useState(false)
  const [onFoot,setOnFoot]=useState(true)
  const [avatar,setAvatar]=useState('baddie') // baddie, alhaji, yahoo, street
  const [walking,setWalking]=useState(false)
  const [cars,setCars]=useState(['Brabus G-Wagon'])
  const [currentCar,setCurrentCar]=useState(null)
  const [houses,setHouses]=useState(['Mushin House'])
  const [badges,setBadges]=useState([])
  const [bankBalance,setBankBalance]=useState(5000)
  const [radio,setRadio]=useState("RADIO LAGOS 99.3 - GTA AVATAR LIVE! Waka enter car animation!")

  useEffect(()=>{const id=setInterval(()=>setNepa(p=>!p),15000);return()=>clearInterval(id)},[])
  useEffect(()=>{let id;if(embassyStage==='queue'){id=setInterval(()=>setQueueNum(n=>{if(n>=15){setEmbassyStage('form');return 0}return n+1}),800)}return()=>clearInterval(id)},[embassyStage])

  function getTier(w){if(w>=10000)return 4;if(w>=5000)return 3;if(w>=3000)return 2;return 1}
  function buy(item,price,type,loc){
    if(cash<price&&type!=='bank'){setWanted(w=>Math.min(w+1,5));alert("EFCC! No cash Wanted +1 ⭐");return}
    if(type!=='bank')setCash(cash-price);const nw=worth+price;setWorth(nw);setTier(getTier(nw));if(getTier(nw)===4)setAvatar('alhaji');else if(getTier(nw)===3)setAvatar('baddie')
    if(type==='car'){setCars([...cars,item]);setCurrentCar(item);setOnFoot(false);setWalking(false);alert("ENTER CAR ANIMATION: "+item+" - Door open, avatar enter, engine start! GTA style!")}if(type==='house')setHouses([...houses,item])
    if(type==='dolls'){if(cash>=5000||price===10000){setInDolls(true);setBadges([...badges,"Dolls VIP 💎"]);alert("Dolls 70M Allen neon bouncer check OK! Avatar gold chain shine street!")}else alert("Need 70M! Bouncer push: Oga go hustle more you no reach here!");return}
    if(type==='bank'){if(item.includes('Withdraw')){setBankBalance(b=>b-100);setCash(c=>c+100)}else if(item.includes('Deposit')){setBankBalance(b=>b+100);setCash(c=>c-100)}return}
    if(type==='foot'){setOnFoot(true);setCurrentCar(null);setWalking(true);setTimeout(()=>setWalking(false),800);return}
    alert("PAYSTACK "+item+" to "+loc+" - Avatar waka!")
  }

  const avatars={
    street:{head:'🧑',body:'👕',leg:'👖',shoe:'👟',color:'#333',name:'Street Boy Mushin - T1'},
    baddie:{head:'👩‍🦱',body:'👚',leg:'👖',shoe:'👠',color:'#ff69b4',name:'Baddie Bintu T3 - Lekki'},
    alhaji:{head:'👳‍♂️',body:'👘',leg:'🩳',shoe:'🩴',color:'gold',name:'Alhaji Tunde T4 Brabus Gold - Banana VIP'},
    yahoo:{head:'🧑‍💻',body:'👔',leg:'👖',shoe:'👞',color:'#0f0',name:'Yahoo Boy EFCC Wanted'},
  }
  const av=avatars[avatar]

  if(!user)return<div style={{height:'100vh',background:'black',color:'lime',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',fontFamily:'monospace',padding:20,textAlign:'center'}}><h1>GRAND THEFT LAGOS</h1><p>V26 GTA AVATAR EDITION - Real Person Waka Enter Car!</p><div style={{fontSize:60,marginTop:10}}>{av.head}<br/>{av.body}<br/>{av.leg}<br/>{av.shoe}</div><p>{av.name} - Avatar change with Tier - Tier 1 Street T1, Tier 3 Baddie, Tier 4 Alhaji Gold</p><input value={name} onChange={e=>setName(e.target.value)} placeholder="Alhaji Tunde / Baddie Bintu" style={{padding:12,width:'80%',background:'black',color:'lime',border:'2px solid lime',textAlign:'center',marginTop:20}}/><button onClick={()=>setUser({name:name||"Boss"})} style={{marginTop:20,padding:'15px 40px',background:'lime',color:'black',fontWeight:'bold'}}>WAKE UP MUSHIN BED - AVATAR WAKA</button></div>

  if(stage==='bed')return<div style={{height:'100vh',background:nepa?'#8aa8a0':'#111',color:'white',fontFamily:'monospace',padding:20}}><div style={{background:'black',padding:10,textAlign:'center',border:'2px solid gold'}}>WAKE UP MUSHIN BED - Mosquito Net GEN 5.5KVA - Visa {visaStatus||"No visa"} - NEPA {nepa?"ON":"OFF"} Avatar {av.name}</div><div style={{marginTop:20,display:'flex',justifyContent:'center',gap:20}}><div style={{background:'#5a4a3a',width:120,height:180,border:'4px solid #333',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',fontSize:40}}><div>{av.head}</div><div style={{color:av.color}}>{av.body}</div><div>{av.leg}</div><div>{av.shoe}</div><div style={{fontSize:10,marginTop:5}}>{av.name}</div></div><div style={{background:'#333',width:200,height:100,border:'2px solid white',display:'flex',justifyContent:'center',alignItems:'center'}}>BED Danfo Brabus Window<br/>Avatar dey sleep!</div></div><button onClick={()=>setStage('street')} style={{marginTop:20,padding:20,width:'100%',background:'lime',color:'black',fontWeight:'bold'}}>GET UP FROM BED → STREET GTA AVATAR WAKA 🚶</button></div>

  if(embassyStage)return<div style={{height:'100vh',background:'#0a2a5a',color:'white',fontFamily:'monospace',padding:20}}>{embassyStage==='queue'&&<div><h1>US Embassy VI Lagos Queue {queueNum}/15</h1><div style={{width:'100%',height:20,background:'#222'}}><div style={{width:queueNum/15*100+'%',height:'100%',background:'gold'}}/></div><div style={{marginTop:20,fontSize:30}}>Avatar for queue: {av.head} sit down wait number dey call - Real life!</div></div>}{embassyStage==='form'&&<div><h1>Visa Form Bank {cash} {cash>=150?"✅":"❌"} Houses {houses.length}</h1><button onClick={()=>{setEmbassyStage('interview');}} style={{...btn,background:'gold',color:'black',padding:15}}>Submit → Interview</button></div>}{embassyStage==='interview'&&<div><h1>Interview: Why you wan go USA? You go come back? Who sponsor? Timer!</h1><button onClick={()=>{setVisaStatus(Math.random()<0.6?"APPROVED - Visa stamp book flight ✈️":"REJECTED - Insufficient ties Wait 3 days 20 coins");setEmbassyStage('result')}} style={btn}>Answer - Tourist Olumo ties house job family</button></div>}{embassyStage==='result'&&<div><h1 style={{color:visaStatus.includes('APPROVED')?'lime':'red'}}>{visaStatus}</h1><button onClick={()=>setEmbassyStage(null)} style={btn}>Back to Street Avatar waka</button></div>}</div>

  return(
    <div style={{height:'100vh',background:'#2a2a2a',position:'relative',fontFamily:'monospace',color:'white',overflow:'hidden'}}>
      <div style={{position:'absolute',top:0,left:0,right:0,bottom:0,background:'repeating-linear-gradient(0deg,#333 0px,#333 1px,#3a3a3a 1px,#3a3a3a 40px),repeating-linear-gradient(90deg,#333 0px,#333 1px,#3a3a3a 1px,#3a3a3a 40px)'}}/>
      <div style={{position:'absolute',top:0,left:0,right:0,display:'flex',justifyContent:'space-between',padding:10,zIndex:20,background:'rgba(0,0,0,0.9)'}}>
        <div><div style={{background:'black',padding:'5px 10px',border:'2px solid white',fontSize:10}}>❤️ 78 🛡️ {tier>=3?100:40} {Array(wanted).fill(0).map((_,i)=><span key={i}>⭐</span>)} Avatar {av.name}</div></div>
        <div style={{textAlign:'right'}}><div style={{color:'#0f0',fontSize:18}}>${cash} Worth {worth}</div><div style={{fontSize:8}}>Bank ${bankBalance} NEPA {nepa?"ON":"OFF"} T{tier} {badges.join(' ')} {inDolls?"DOLLS 70M 💎":""} Visa {visaStatus||"None"}</div><div style={{background:'red',padding:'2px 6px',fontSize:7,marginTop:3}}>🔴 {radio}</div></div>
      </div>
      <div style={{position:'absolute',bottom:20,left:20,width:110,height:110,background:'black',border:'3px solid white',borderRadius:'50%',zIndex:20,overflow:'hidden'}}><div style={{width:'100%',height:'100%',background:'#0a4a0a',position:'relative'}}><div style={{position:'absolute',top:'50%',left:'50%',width:8,height:8,background:'lime',borderRadius:'50%',transform:'translate(-50%,-50%)'}}/></div><div style={{textAlign:'center',fontSize:8,background:'black'}}>LAGOS MAP - {onFoot?"ON FOOT 🚶":"IN CAR 🚗"} - Avatar {avatar}</div></div>

      <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',textAlign:'center',zIndex:10,width:'95%',maxWidth:480,background:'rgba(0,0,0,0.92)',padding:10,border:'2px solid white',maxHeight:'68vh',overflowY:'auto'}}>
        {/* GTA AVATAR DISPLAY */}
        <div style={{display:'flex',justifyContent:'center',gap:15,alignItems:'center',background:'#111',padding:10,border:'2px solid '+av.color}}>
          <div style={{textAlign:'center',background:'#222',padding:10,border:'2px solid white',minWidth:90}}>
            <div style={{fontSize:walking?50:45,transition:'all 0.3s',transform:walking?'translateX(10px)':''}}>{av.head}</div>
            <div style={{fontSize:25,color:av.color}}>{av.body}</div>
            <div style={{fontSize:25}}>{av.leg}</div>
            <div style={{fontSize:20}}>{av.shoe}</div>
            <div style={{fontSize:7,marginTop:5,color:av.color}}>{av.name}<br/>{onFoot?"🚶 ON FOOT WAKA":"🚗 IN "+(currentCar||"Brabus")}<br/>{walking?"WALKING...":"STAND"}</div>
            <div style={{fontSize:6,marginTop:3}}>{user.name} - Tier {tier} - {tier===4?"Brabus Gold Alhaji VIP Banana":"Tier "+tier}</div>
          </div>
          <div style={{textAlign:'left',fontSize:9}}>
            <b>GTA AVATAR REAL LIFE:</b><br/>
            • Avatar waka for street Ikoyi→VI→MMA→Olumo Rock road<br/>
            • Enter car animation: Door open, avatar enter, engine start!<br/>
            • Come out car: Door open, avatar waka comot on foot!<br/>
            • Cloth change with Tier: T1 Street Boy, T3 Baddie, T4 Alhaji Gold agbada<br/>
            • NEPA: {nepa?"ON light avatar clear":"OFF dark avatar torchlight 🔦"}<br/>
            • Visa: {visaStatus||"No visa"} - Queue avatar sit down wait!<br/>
            • Dolls: {inDolls?"Inside 70M VIP gold chain shine!":"Outside"}<br/>
            <div style={{marginTop:5,display:'flex',gap:3,flexWrap:'wrap'}}>
              <button onClick={()=>setAvatar('street')} style={{...btn,fontSize:7}}>Street Boy T1 🧑</button>
              <button onClick={()=>setAvatar('baddie')} style={{...btn,fontSize:7}}>Baddie T3 👩‍🦱</button>
              <button onClick={()=>setAvatar('alhaji')} style={{...btn,fontSize:7,background:'gold',color:'black'}}>Alhaji T4 👳‍♂️ Gold</button>
              <button onClick={()=>setAvatar('yahoo')} style={{...btn,fontSize:7}}>Yahoo EFCC 🧑‍💻</button>
            </div>
          </div>
        </div>

        {/* CONTROLS */}
        <div style={{display:'flex',gap:5,flexWrap:'wrap',justifyContent:'center',marginTop:10}}>
          <button onClick={()=>buy('Come out for car waka on foot',0,'foot','Street waka on foot GTA avatar')} style={{...btn,background:onFoot?'green':'black'}}>{onFoot?"🚶 ON FOOT WAKA NOW":"🚪 COMOT FOR CAR WAKA ON FOOT - Door open avatar comot!"}</button>
          <button onClick={()=>{setEmbassyStage('queue');setQueueNum(0)}} style={{...btn,background:'blue'}}>🇳🇬 Embassy VI Queue Avatar sit down wait number call Form Interview 60/40</button>
          <button onClick={()=>buy('Brabus Gold 10k',10000,'car','Banana - Avatar enter car animation door open engine start')} style={{...btn,background:'gold',color:'black'}}>🚗 Enter Brabus 10k T4 - Avatar enter car animation door open engine start!</button>
          <button onClick={()=>buy('Bike 2k',2000,'car','Mushin - Bike avatar enter')} style={btn}>🏍️ Enter Bike 2k - Avatar enter bike helmet</button>
          <button onClick={()=>buy('Dolls 70M',10000,'dolls','Allen neon bouncer 70M gold name shine avatar gold chain')} style={{...btn,background:'gold',color:'black'}}>💎 Strip/Dolls 70M Gate Bouncer check 70M Avatar gold chain shine street spray 1M</button>
          <button onClick={()=>buy('ATM Withdraw 100',0,'bank','First Bank ATM avatar for queue')} style={btn}>🏦 Bank ATM Withdraw Balance {bankBalance} Avatar for queue ATM</button>
          <button onClick={()=>{setStage('bed')}} style={btn}>💤 Bed Save Wake up routine Avatar sleep mosquito net GEN</button>
        </div>

        <div style={{marginTop:10,fontSize:7,textAlign:'left',background:'black',padding:5,border:'1px solid #555'}}>
          GTA AVATAR: Real GTA get CJ / Franklin avatar wey dey waka, enter car door open, cloth shop change, hair cut. Now your game get am: Street Boy T1 Mushin, Baddie T3 Lekki, Alhaji T4 Banana Gold agbada, Yahoo Boy EFCC. Avatar waka animation when you press COMOT FOR CAR WAKA ON FOOT - Door open avatar comot on foot. Enter car animation door open avatar enter engine start! Tier change cloth: Worth 10k na Alhaji Gold. On foot vs In car show for minimap. Embassy queue avatar sit down wait number dey call. Bank queue avatar. Dolls 70M bouncer check avatar gold chain shine street when you enter. Next: Add joystick waka + car drive first-person third-person GTA + NEPA dark torchlight + Fuel + Police chase + Races football you dribble Teslim Balogun 5v5 GOAL crowd MTN + Car race Lekki Toll Gate NOS LASTMA + House race Banana build vote finest + Paid Call Audio 5 Video 15 + Dual World Flight USA Atlanta Oyinbo NPCs Walmart NBA + Overstay police no Airbnb hide + Knock door Kpai-kpai interior bedroom kitchen toilet owner notification No teleport + Masjid Imam Adhan 5 Jumah Friday + Church Sunday + Real Estate Landlord + Hajj Jerusalem + Inbox Pay300
        </div>
      </div>

      <div style={{position:'absolute',top:80,right:10,width:105,background:'rgba(0,0,0,0.85)',border:'1px solid white',padding:5,zIndex:20,fontSize:8}}>
        <b>AVATAR</b><br/>{av.head} {av.name}<br/>{onFoot?"ON FOOT 🚶 WAKA":"IN CAR 🚗 "+(currentCar||"Brabus")}<br/><b>GARAGE</b><br/>{cars.join(',')}<br/><b>HOUSES</b><br/>{houses.join(',')}<br/><b>WANTED</b><br/>{wanted===0?'CLEAN':wanted<3?'POLICE':'EFCC/ARMY!'}<br/>NEPA {nepa?"ON 💡 Avatar clear":"OFF 🔦 Torchlight"}<br/>Bank ${bankBalance}<br/>Visa {visaStatus||"None"}<br/>Tier {tier} {badges.join(' ')}
      </div>
    </div>
  )
}
const btn={padding:'6px 8px',background:'black',color:'white',border:'1px solid white',fontSize:9,fontFamily:'monospace',cursor:'pointer',margin:2}
