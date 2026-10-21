import { useState, useEffect, useRef } from 'react'

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
  const [interviewQ,setInterviewQ]=useState(0)
  const [interviewTimer,setInterviewTimer]=useState(10)
  const [interviewScore,setInterviewScore]=useState(0)
  const [raceMode,setRaceMode]=useState(null)
  const [inDolls,setInDolls]=useState(false)
  const [cars,setCars]=useState(['Brabus G-Wagon'])
  const [houses,setHouses]=useState(['Mushin House'])
  const [badges,setBadges]=useState([])
  const [bankBalance,setBankBalance]=useState(5000)
  const [radio,setRadio]=useState("RADIO LAGOS 99.3 - GTA HUD + BED + EMBASSY VISA 60/40 + DOLLS 70M + BANK + CLUB + RACES")

  const qs=[
    {q:"Why you wan go USA?",a:["Tourist Olumo","Japa forever","School"],c:0},
    {q:"You go come back?",a:["Yes ties house job","No japa forever","Maybe"],c:0},
    {q:"Who sponsor?",a:["My job bank 150","Nobody","Yahoo"],c:0},
  ]

  useEffect(()=>{const id=setInterval(()=>setNepa(p=>!p),15000);return()=>clearInterval(id)},[])
  useEffect(()=>{let id;if(embassyStage==='queue'){id=setInterval(()=>setQueueNum(n=>{if(n>=15){setEmbassyStage('form');return 0}return n+1}),800)}return()=>clearInterval(id)},[embassyStage])
  useEffect(()=>{let id;if(embassyStage==='interview'){id=setInterval(()=>setInterviewTimer(t=>{if(t<=1){setInterviewQ(q=>q+1);setInterviewTimer(10);if(interviewQ>=2)finish();return 10}return t-1}),1000)}return()=>clearInterval(id)},[embassyStage,interviewQ])

  function finish(){
    const ok=cash>=150 && houses.length>0 && Math.random()<0.6 && interviewScore>=1
    if(ok)setVisaStatus("APPROVED - Visa stamp book flight ✈️"); else setVisaStatus("REJECTED - Insufficient ties Wait 3 days reapply 20 coins")
    setEmbassyStage('result')
  }
  function getTier(w){if(w>=10000)return 4;if(w>=5000)return 3;if(w>=3000)return 2;return 1}
  function buy(item,price,type,loc){
    if(cash<price&&type!=='bank'){setWanted(w=>Math.min(w+1,5));alert("EFCC! No cash Wanted +1");return}
    if(type!=='bank')setCash(cash-price);const nw=worth+price;setWorth(nw);setTier(getTier(nw))
    if(type==='car')setCars([...cars,item]);if(type==='house')setHouses([...houses,item])
    if(type==='dolls'){if(cash>=7000||price===10000){setInDolls(true);setBadges([...badges,"Dolls VIP 💎"]);alert("Dolls 70M Allen Avenue bouncer check OK! Lounge music lights dance spray 1M big boys!")}else alert("Need 70M! Bouncer: Oga go hustle more you no reach here!");return}
    if(type==='bank'){if(item.includes('Withdraw')){setBankBalance(bankBalance-100);setCash(cash+100)}else if(item.includes('Deposit')){setBankBalance(bankBalance+100);setCash(cash-100)}return}
    alert("PAYSTACK CONFIRMED "+item+" to "+loc)
  }

  if(!user)return<div style={{height:'100vh',background:'black',color:'lime',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',fontFamily:'monospace',padding:20,textAlign:'center'}}><h1>GRAND THEFT LAGOS</h1><p>V25 GTA COMPLETE - FIXED BUILD</p><input value={name} onChange={e=>setName(e.target.value)} placeholder="Alhaji Tunde" style={{padding:12,width:'80%',background:'black',color:'lime',border:'2px solid lime',textAlign:'center',marginTop:20}}/><button onClick={()=>setUser({name:name||"Boss"})} style={{marginTop:20,padding:'15px 40px',background:'lime',color:'black',fontWeight:'bold'}}>START GAME - WAKE UP BED</button></div>

  if(stage==='bed')return<div style={{height:'100vh',background:nepa?'#8aa8a0':'#111',color:'white',fontFamily:'monospace',padding:20}}><div style={{background:'black',padding:10,textAlign:'center',border:'2px solid gold'}}>WAKE UP MUSHIN BED - Mosquito Net GEN 5.5KVA - Visa {visaStatus||"No visa"} - NEPA {nepa?"ON":"OFF"} - {radio}</div><div style={{marginTop:20,background:'#5a4a3a',height:100,border:'4px solid #333',display:'flex',justifyContent:'center',alignItems:'center'}}>BED + Danfo Brabus Banana Towers</div><button onClick={()=>setStage('street')} style={{marginTop:20,padding:20,width:'100%',background:'lime',color:'black',fontWeight:'bold'}}>GET UP → STREET GTA HUD MINIMAP ⭐</button></div>

  if(embassyStage)return<div style={{height:'100vh',background:'#0a2a5a',color:'white',fontFamily:'monospace',padding:20}}>{embassyStage==='queue'&&<div><h1>US Embassy VI Lagos Queue {queueNum}/15 - Long queue sit down wait number dey call!</h1><div style={{width:'100%',height:20,background:'#222'}}><div style={{width:queueNum/15*100+'%',height:'100%',background:'gold'}}/></div></div>}{embassyStage==='form'&&<div><h1>Visa Form Bank {cash} {cash>=150?"✅":"❌ <150 auto reject"} Houses {houses.length}</h1><button onClick={()=>{setEmbassyStage('interview');setInterviewQ(0);setInterviewScore(0);setInterviewTimer(10)}} style={btn}>Submit → Interview Timer</button></div>}{embassyStage==='interview'&&interviewQ<3&&<div><h1>Interview Q{interviewQ+1}: {qs[interviewQ].q} Timer {interviewTimer}s - Stammer REJECTED!</h1>{qs[interviewQ].a.map((a,i)=><button key={i} onClick={()=>{if(i===qs[interviewQ].c)setInterviewScore(s=>s+1);setInterviewQ(q=>q+1);setInterviewTimer(10);if(interviewQ>=2)finish()}} style={{...btn,display:'block',width:'100%',marginTop:5}}>{a}</button>)}</div>}{embassyStage==='result'&&<div><h1 style={{color:visaStatus.includes('APPROVED')?'lime':'red'}}>{visaStatus}</h1><p>{visaStatus.includes('APPROVED')?"Passport visa stamp book flight MMA → Atlanta USA hub multicultural oyinbo!":"Paper Insufficient ties Wait 3 days reapply 20 coins Real pain 60% approve 40% reject!"}</p><button onClick={()=>setEmbassyStage(null)} style={btn}>Back to Street</button></div>}</div>

  return(
    <div style={{height:'100vh',background:'#2a2a2a',position:'relative',fontFamily:'monospace',color:'white',overflow:'hidden'}}>
      <div style={{position:'absolute',top:0,left:0,right:0,bottom:0,background:'repeating-linear-gradient(0deg,#333 0px,#333 1px,#3a3a3a 1px,#3a3a3a 40px),repeating-linear-gradient(90deg,#333 0px,#333 1px,#3a3a3a 1px,#3a3a3a 40px)'}}/>
      <div style={{position:'absolute',top:0,left:0,right:0,display:'flex',justifyContent:'space-between',padding:10,zIndex:20,background:'rgba(0,0,0,0.8)'}}>
        <div><div style={{background:'black',padding:'5px 10px',border:'2px solid white'}}>❤️ 78 🛡️ {tier>=3?100:40} {Array(wanted).fill(0).map((_,i)=><span key={i}>⭐</span>)}</div><div style={{fontSize:10}}>T{tier} {badges.join(' ')} {user.name} {visaStatus} {inDolls?"DOLLS 70M 💎":""}</div></div>
        <div style={{textAlign:'right'}}><div style={{color:'#0f0',fontSize:22}}>${cash} Worth {worth}</div><div style={{fontSize:9}}>Bank ${bankBalance} NEPA {nepa?"ON":"OFF"} {radio.slice(0,50)}</div></div>
      </div>
      <div style={{position:'absolute',bottom:20,left:20,width:110,height:110,background:'black',border:'3px solid white',borderRadius:'50%',zIndex:20,overflow:'hidden'}}><div style={{width:'100%',height:'100%',background:'#0a4a0a',position:'relative'}}><div style={{position:'absolute',top:'50%',left:'50%',width:8,height:8,background:'lime',borderRadius:'50%'}}/></div><div style={{textAlign:'center',fontSize:8,background:'black'}}>LAGOS MAP</div></div>
      <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',textAlign:'center',zIndex:10,width:'90%',maxWidth:450,background:'rgba(0,0,0,0.9)',padding:10,border:'2px solid white',maxHeight:'65vh',overflowY:'auto'}}>
        <div style={{fontSize:30}}>🚗 {cars[cars.length-1]}</div>
        <div style={{display:'flex',gap:5,flexWrap:'wrap',justifyContent:'center',marginTop:10}}>
          <button onClick={()=>{setEmbassyStage('queue');setQueueNum(0)}} style={{...btn,background:'blue'}}>🇳🇬 Embassy VI Queue Form Interview 60/40 Approve/Reject Real Pain!</button>
          <button onClick={()=>buy('Brabus 10k',10000,'car','Banana')} style={{...btn,background:'gold',color:'black'}}>Brabus 10k T4 Big Boy</button>
          <button onClick={()=>buy('Jet 50k',50000,'car','MMA Flight USA Olumo Zuma')} style={btnA}>Jet 50k Fly USA Atlanta Oyinbo Walmart NBA</button>
          <button onClick={()=>buy('Dolls 70M',10000,'dolls','Allen neon bouncer 70M gold name spray')} style={{...btn,background:'gold',color:'black'}}>💎 Strip/Dolls 70M Gate Allen Avenue bouncer check 70M push comot Oga go hustle lounge music spray 1M</button>
          <button onClick={()=>buy('ATM Withdraw 100',0,'bank','First Bank ATM')} style={btn}>🏦 Bank ATM Withdraw Balance {bankBalance} Queue loan Rob alarm police chase</button>
          <button onClick={()=>buy('Regular Club',0,'dolls','Regular club')} style={btn}>🎵 Regular Club Free Amapiano dance drink 5 coins</button>
          <button onClick={()=>{setStage('bed')}} style={btn}>💤 Bed Save Wake up routine</button>
        </div>
        <div style={{marginTop:10,fontSize:8,textAlign:'left',background:'black',padding:5}}>FINAL: Bed wake up mosquito net GEN + DUAL WORLD Ikoyi MMA Embassy VI queue number call Form Tourist Japa School Business Bank 150 Ties house job family Ghana history Interview mini-game Why you wan go USA You go come back Who sponsor timer stammer Japa forever REJECTED Approval 60% approve 40% reject APPROVED passport visa stamp book flight REJECTED Insufficient ties Wait 3 days reapply 20 coins + USA hub multicultural American oyinbo Atlanta never see Naija Olumo Rock Mexican British Ghanaian Walmart NBA No be only Naija face tour guide coins Overstay 7-day tourist finish police find you no rent Airbnb hide + Street drive Ikoyi→VI→MMA→Olumo Rock road traffic light fuel first/third-person + Knock door Kpai-kpai interior bedroom kitchen toilet owner notification No teleport + Bank First Bank GTB cashier security queue ATM loan Rob alarm police chase + Club free + Strip Allen Avenue bouncer 70M gate lounge music lights dance spray 1M big boys + NEPA Gen Inverter + Masjid Jumah + Church + Dolls 70M + Paid Call + Races + Hajj + GTA HUD minimap health wanted money top right</div>
      </div>
      <div style={{position:'absolute',top:80,right:10,width:100,background:'rgba(0,0,0,0.8)',border:'1px solid white',padding:5,zIndex:20,fontSize:8}}><b>GARAGE</b><br/>{cars.join(',')}<br/><b>HOUSES</b><br/>{houses.join(',')}<br/><b>WANTED</b><br/>{wanted===0?'CLEAN':'POLICE/EFCC'}<br/>NEPA {nepa?"ON":"OFF"}<br/>Bank ${bankBalance}<br/>Visa {visaStatus||"None"}</div>
    </div>
  )
}
const btn={padding:'6px 8px',background:'black',color:'white',border:'1px solid white',fontSize:9,fontFamily:'monospace',cursor:'pointer',margin:2}
const btnA={...btn,borderColor:'cyan',color:'cyan'}
