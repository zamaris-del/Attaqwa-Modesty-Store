import { useState, useEffect, useRef } from 'react'

export default function App(){
  const [stage,setStage]=useState('bed')
  const [world,setWorld]=useState('nigeria')
  const [user,setUser]=useState(null)
  const [name,setName]=useState('')
  const [cash,setCash]=useState(12450)
  const [airtime,setAirtime]=useState(20)
  const [worth,setWorth]=useState(12450)
  const [tier,setTier]=useState(3)
  const [wanted,setWanted]=useState(0)
  const [health,setHealth]=useState(78)
  const [nepa,setNepa]=useState(true)
  const [fuel,setFuel]=useState(100)
  const [visaStatus,setVisaStatus]=useState(null)
  const [visaDays,setVisaDays]=useState(0)
  const [overstay,setOverstay]=useState(false)
  const [embassyStage,setEmbassyStage]=useState(null)
  const [queueNum,setQueueNum]=useState(0)
  const [form,setForm]=useState({purpose:'Tourist',job:false,history:false})
  const [interviewQ,setInterviewQ]=useState(0)
  const [interviewTimer,setInterviewTimer]=useState(10)
  const [interviewScore,setInterviewScore]=useState(0)
  const [micOn,setMicOn]=useState(false)
  const [callMode,setCallMode]=useState(null)
  const [callTarget,setCallTarget]=useState(null)
  const [callTime,setCallTime]=useState(0)
  const [inCall,setInCall]=useState(false)
  const [raceMode,setRaceMode]=useState(null)
  const [inDolls,setInDolls]=useState(false)
  const [inClub,setInClub]=useState(null)
  const [insideHouse,setInsideHouse]=useState(null)
  const [cars,setCars]=useState(['Brabus G-Wagon'])
  const [jets,setJets]=useState([])
  const [boats,setBoats]=useState([])
  const [houses,setHouses]=useState(['Mushin House'])
  const [badges,setBadges]=useState([])
  const [bankBalance,setBankBalance]=useState(5000)
  const videoRef=useRef(null)
  const [radio,setRadio]=useState("RADIO LAGOS 99.3 - EFCC RAID LEKKI! - NEPA + EMBASSY VISA 60/40 REJECT + DOLLS 70M + RACES + BANK + CLUB + PAID CALL 5/15 + GTA HUD MINIMAP HEALTH WANTED")

  const interviewQuestions=[
    {q:"Why you wan go USA?",a:["Tourist Olumo Atlanta","Japa forever no return","School Business"],correct:0},
    {q:"You go come back?",a:["Yes ties house job family","No japa forever","Maybe"],correct:0},
    {q:"Who sponsor?",a:["My job Shoprite bank 150","Nobody broke","Yahoo"],correct:0},
    {q:"Ghana before history?",a:["Yes Ghana before","First time","Overstay before"],correct:0},
  ]

  useEffect(()=>{const id=setInterval(()=>{if(Math.random()<0.6) setNepa(false); else setNepa(true)},15000); return()=>clearInterval(id)},[])
  useEffect(()=>{let id; if(embassyStage==='queue'){id=setInterval(()=>{setQueueNum(n=>{if(n>=15){setEmbassyStage('form'); return 0} return n+1})},800)} return()=>clearInterval(id)},[embassyStage])
  useEffect(()=>{let id; if(embassyStage==='interview'){id=setInterval(()=>{setInterviewTimer(t=>{if(t<=1){setInterviewQ(q=>q+1); setInterviewTimer(10); if(interviewQ>=3){finishInterview()} return 10} return t-1})},1000)} return()=>clearInterval(id)},[embassyStage,interviewQ])
  useEffect(()=>{let id; if(inCall){id=setInterval(()=>{setCallTime(t=>t+1); const cost=(callMode==='video'?15:5)/3600; if(airtime<=0){setInCall(false); return} setAirtime(a=>a-cost); setCash(c=>c-cost)},1000)} return()=>clearInterval(id)},[inCall,callMode,airtime])

  function finishInterview(){
    const bankOk=cash>=150; const tiesOk=houses.length>0 || form.job; const historyOk=!overstay; const randomOk=Math.random()<0.6; const interviewOk=interviewScore>=2
    const approved=bankOk && tiesOk && historyOk && randomOk && interviewOk
    if(approved){ setVisaStatus("APPROVED - Visa stamp book flight"); setVisaDays(7); setOverstay(false) } else { const reason=!bankOk?"Insufficient bank <150":!tiesOk?"Insufficient ties no house job":!historyOk?"Overstay before":!interviewOk?"Stammer Japa forever":"Random 60/40 even if get all - Insufficient ties"; setVisaStatus("REJECTED - "+reason+" - Wait 3 days reapply 20 coins") }
    setEmbassyStage('result')
  }

  function getTier(w){ if(w>=10000) return 4; if(w>=5000) return 3; if(w>=3000) return 2; return 1 }
  function buy(item,price,type,loc){
    if(type!=='airtime' && type!=='fuel' && cash<price){ setWanted(w=>Math.min(w+1,5)); alert("EFCC! Not enough cash Wanted +1 ⭐"); return }
    if(type!=='airtime' && type!=='fuel') setCash(cash-price); const nw=worth+price; setWorth(nw); setTier(getTier(nw))
    if(type==='car') setCars([...cars,item]); if(type==='jet') setJets([...jets,item]); if(type==='boat') setBoats([...boats,item]); if(type==='house') setHouses([...houses,item]); if(type==='airtime'){ setAirtime(airtime+price); return} if(type==='fuel'){ setFuel(100); return}
    if(type==='dolls' || type==='strip'){ if(cash>=70000000 || price===10000){ setInDolls(true); setInClub(type==='strip'?'strip':'dolls'); setBadges([...badges,"Dolls VIP 💎"]); if(type==='strip'){ setCash(cash-1000); alert("Strip Club Allen Avenue bouncer check 70M OK! Open rope lounge music lights dance stage spray money spend at least 1M big boys!")} else alert("Dolls 70M Allen neon bouncer check gold name shine!")} else alert("Need 70M! Bouncer: Oga go hustle more you no reach here!"); return}
    if(type==='club'){ setInClub('regular'); alert("Regular Club free Amapiano dance drink 5 coins meet friends!"); return}
    if(type==='houseEnter'){ setInsideHouse(item); return}
    if(type==='bank'){ if(item.includes('Withdraw')){ setBankBalance(bankBalance-100); setCash(cash+100)} else if(item.includes('Deposit')){ setBankBalance(bankBalance+100); setCash(cash-100)} else if(item.includes('Loan')){ if(houses.length>0){ setCash(cash+50); setBankBalance(bankBalance-50)} else alert("Need house collateral") } return}
    alert("PAYSTACK CONFIRMED "+item+" to "+loc+" Drive now!")
  }

  if(!user) return <div style={{height:'100vh',background:'linear-gradient(#000,#222)',color:'lime',fontFamily:'monospace',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',padding:20,textAlign:'center'}}><h1 style={{fontSize:32,letterSpacing:5}}>GRAND THEFT</h1><h1 style={{fontSize:42,color:'white',marginTop:-20}}>LAGOS</h1><p style={{color:'white'}}>Zamari House Link Up V25 GTA COMPLETE EDITION</p><p style={{fontSize:8,color:'white'}}>GTA HUD minimap health armor wanted stars money top right + Bed wake up + DUAL WORLD Ikoyi MMA Embassy Visa Approve/Reject Flight USA Atlanta Oyinbo NPCs Olumo Kainji Zuma Yankari + Street drive Ikoyi→VI→MMA Olumo Rock road traffic light fuel first-person third-person + Knock door Kpai-kpai interior bedroom kitchen toilet owner notification No teleport + Bank First Bank GTB cashier security queue ATM loan Rob alarm police chase + Club regular free Amapiano + Strip Club Allen Avenue bouncer 70M gate push comot Oga go hustle lounge music lights dance spray 1M big boys + NEPA Gen Inverter + Fake Life Borrow + Masjid Imam Adhan 5 Jumah Friday khutbah + Church Sunday + Diamond Dolls 70M + Paid Call Audio 5 Video 15 Airtime + Races Football dribble Car drive House build + Hajj Jerusalem + Inbox Pay300</p><input value={name} onChange={e=>setName(e.target.value)} placeholder="ENTER STREET NAME Alhaji Tunde" style={{padding:15,width:'80%',background:'black',color:'lime',border:'2px solid lime',textAlign:'center',marginTop:20}}/><button onClick={()=>setUser({name:name||"Street Boss"})} style={{marginTop:20,padding:'15px 40px',background:'lime',color:'black',fontWeight:'bold',border:'none',fontSize:18}}>START GAME - WAKE UP MUSHIN BED</button></div>

  if(stage==='bed') return <div style={{height:'100vh',background:nepa?'#8aa8a0':'#111',position:'relative',fontFamily:'monospace',color:'white',padding:20}}><div style={{position:'absolute',top:10,left:'50%',transform:'translateX(-50%)',background:'black',padding:'5px 20px',border:'2px solid gold',textAlign:'center'}}>WAKE UP MUSHIN LAGOS 07:42 DAY 12 - BED Mosquito Net GEN 5.5KVA - {world} Visa {visaStatus||"No visa"} - NEPA {nepa?"ON 💡":"OFF DARK TV fridge AC off sweat UP NEPA shout voice chat"}</div><div style={{position:'absolute',top:10,right:10,textAlign:'right',fontSize:10}}>❤️{health} 🛡️{tier>=3?100:40} {Array(wanted).fill(0).map((_,i)=><span key={i}>⭐</span>)}<br/>${cash} Worth {worth} Fuel {fuel}%</div><div style={{paddingTop:70}}><div style={{background:'#5a4a3a',height:130,border:'4px solid #333',display:'flex',justifyContent:'center',alignItems:'center',textAlign:'center'}}>BED + Window Danfo Oshodi Brabus Suya Spot MTN Airtel GLO BET9JA Banana Towers far - {radio}</div><button onClick={()=>setStage('street')} style={{marginTop:20,padding:20,width:'100%',background:'lime',color:'black',fontWeight:'bold',fontSize:18}}>GET UP FROM BED → ENTER LAGOS STREET 🚪 GTA HUD MINIMAP</button></div><div style={{position:'absolute',bottom:15,left:15,width:110,height:110,background:'#0a4a0a',border:'3px solid white',borderRadius:'50%',display:'flex',justifyContent:'center',alignItems:'center',fontSize:8,textAlign:'center'}}>MUSHIN<br/>LAGOS<br/>MAP<br/>🏠🚔📻</div></div>

  if(insideHouse) return <div style={{height:'100vh',background:'#5a4a3a',color:'white',fontFamily:'monospace',padding:20}}><h2>Inside {insideHouse} - Bedroom Kitchen Toilet Interior - Real door No teleport! GTA HUD still dey!</h2><div style={{background:'#333',padding:20,border:'3px solid gold'}}><p>🛏️ Bedroom bed mosquito net save game</p><p>🍳 Kitchen gas cooker fridge {nepa?"ON":"OFF Gen noise"} Sunday rice Church</p><p>🚿 Toilet shower</p><p>📺 Living TV {nepa?"ON":"OFF"} AC {nepa?"ON":"OFF sweat"} Inverter rich 24/7</p></div><button onClick={()=>setInsideHouse(null)} style={{...btn,background:'lime',color:'black',marginTop:10}}>Comot House Real door close Go street drive Ikoyi→VI→MMA road traffic light fuel first-person third-person</button></div>

  if(inClub) return <div style={{height:'100vh',background:inClub==='strip'?'#1a0a1a':'#0a1a2a',color:'white',fontFamily:'monospace',padding:20,textAlign:'center'}}><h1>{inClub==='strip'?"💎 STRIP CLUB Allen Avenue 70M GATE - Bouncer big body check 70M coins! Lounge music lights dance stage spray money spend at least 1M big boys only!":"🎵 REGULAR CLUB Free Amapiano DJ joystick dance drink 5 coins meet friends Love marry Detty December owambe!"}</h1><button onClick={()=>{setInClub(null); setInDolls(false)}} style={{...btn,background:'gold',color:'black',padding:15,marginTop:20}}>Comot Club Go street Ikoyi road traffic light</button></div>

  if(embassyStage) return <div style={{height:'100vh',background:'#0a2a5a',color:'white',fontFamily:'monospace',padding:20}}>{embassyStage==='queue' && <div><h1>🇳🇬 US Embassy VI Lagos Queue {queueNum}/15 - Long queue sit down wait number dey call!</h1><div style={{width:'100%',height:20,background:'#222'}}><div style={{width:queueNum/15*100+'%',height:'100%',background:'gold'}}/></div><p>🇺🇸 Atlanta/DC Nigeria Embassy oyinbo wan come Naija Olumo Rock!</p></div>}{embassyStage==='form' && <div><h1>Visa Form Purpose Tourist Japa School Business Bank 150 coins Ties house job family Ghana history</h1><p>Bank you get {cash} {cash>=150?"✅":"❌ Broke auto rejection"} Houses {houses.join(',')} Job <input type="checkbox" checked={form.job} onChange={e=>setForm({...form,job:e.target.checked})}/></p><button onClick={()=>{setEmbassyStage('interview'); setInterviewQ(0); setInterviewScore(0); setInterviewTimer(10)}} style={{...btn,background:'gold',color:'black',padding:15}}>Submit → Interview Game Consular officer timer</button></div>}{embassyStage==='interview' && interviewQ<4 && <div><h1>Interview Q{interviewQ+1}: {interviewQuestions[interviewQ].q} Timer {interviewTimer}s - Stammer REJECTED Japa forever REJECTED!</h1>{interviewQuestions[interviewQ].a.map((a,i)=><button key={i} onClick={()=>{if(i===interviewQuestions[interviewQ].correct) setInterviewScore(s=>s+1); setInterviewQ(q=>q+1); setInterviewTimer(10); if(interviewQ>=3) finishInterview()}} style={{...btn,background:'black',padding:15,display:'block',width:'100%',marginTop:5}}>{a}</button>)}</div>}{embassyStage==='result' && <div><h1 style={{color:visaStatus.includes('APPROVED')?'lime':'red'}}>{visaStatus}</h1>{visaStatus.includes('APPROVED')?<button onClick={()=>{setWorld('flight'); setEmbassyStage(null)}} style={{...btn,background:'lime',color:'black',padding:15}}>Book Flight MMA → Atlanta Oyinbo NPCs Walmart NBA Tour Guide Overstay Police!</button>:<button onClick={()=>{if(cash>=20){setCash(cash-20); setEmbassyStage('queue'); setQueueNum(0)} else alert("Need 20 coins")}} style={{...btn,background:'red',padding:15}}>Reapply Pay 20 coins Wait 3 days Paper Insufficient ties Real pain!</button>}<button onClick={()=>setEmbassyStage(null)} style={btn}>Back Street</button></div>}</div>

  if(raceMode) return <div style={{height:'100vh',background:'#333',color:'white',fontFamily:'monospace',padding:10}}><h2>Race {raceMode} YOU {raceMode==='football'?"DRIBBLE Teslim Balogun 5v5 GOAL crowd MTN Owner 10% Entry 1k Win 10k Ballon d'Or":raceMode==='car'?"DRIVE Lekki Toll Gate Banana Drift Lagos-Ibadan joystick NOS LASTMA mechanic 500 Entry 2k Win 20k Fastest Driver fuel Owner 10%":"BUILD Banana 10mins NEPA off stone trolling vote finest Entry 3k Win house 10k Architect rent"}</h2><button onClick={()=>{setCash(cash+(raceMode==='football'?10000:20000)); setRaceMode(null)}} style={btn}>Win Race</button><button onClick={()=>setRaceMode(null)} style={btn}>Exit</button></div>
  if(inCall) return <div style={{height:'100vh',background:'black',color:'white',fontFamily:'monospace',display:'flex',justifyContent:'center',alignItems:'center',padding:20}}><div style={{border:'3px solid lime',padding:20,width:'90%',maxWidth:400,textAlign:'center'}}><h2>{callMode} Call {callTarget} Timer {callTime}s Air {airtime.toFixed(1)}m 5/min audio 15/min video Airtime finish *556# borrow Report nude EFCC block masjid church mute</h2>{callMode==='video' && <video ref={videoRef} autoPlay playsInline style={{width:'100%',height:200,background:'#222'}}/>}<button onClick={()=>setInCall(false)} style={{...btn,background:'red'}}>END CALL</button></div></div>
  if(world==='flight') return <div style={{height:'100vh',background:'skyblue',color:'black',fontFamily:'monospace',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',padding:20,textAlign:'center'}}><h1>✈️ FLIGHT MMA → Atlanta - Olumo Rock Kainji Zuma Yankari below! Visa {visaStatus} Days {visaDays} {overstay?"OVERSTAY POLICE NO AIRBNB HIDE":""}</h1><p>USA hub multicultural American oyinbo Atlanta never see Naija Olumo Rock Mexican British Ghanaian Walmart NBA No be only Naija face Oyinbo fly Naija need guide tour guide coins</p><button onClick={()=>{setWorld('usa'); setVisaDays(d=>d-1); if(visaDays<=1) setOverstay(true)}} style={{padding:20,background:'blue',color:'white'}}>Land Atlanta USA Hub Oyinbo NPCs</button><button onClick={()=>{setWorld('nigeria'); setVisaDays(7); setOverstay(false)}} style={{padding:20,background:'green',color:'white',marginTop:10}}>Return Lagos street drive</button></div>

  return(
    <div style={{height:'100vh',background:world==='usa'?'#0a2a5a':'#2a2a2a',position:'relative',fontFamily:'monospace',color:'white',overflow:'hidden'}}>
      {/* GTA MAP BG */}
      <div style={{position:'absolute',top:0,left:0,right:0,bottom:0,background:'repeating-linear-gradient(0deg, #333 0px, #333 1px, #3a3a3a 1px, #3a3a3a 40px), repeating-linear-gradient(90deg, #333 0px, #333 1px, #3a3a3a 1px, #3a3a3a 40px)'}}/>
      {/* GTA TOP HUD */}
      <div style={{position:'absolute',top:0,left:0,right:0,display:'flex',justifyContent:'space-between',padding:10,zIndex:20,background:'rgba(0,0,0,0.8)'}}>
        <div><div style={{background:'black',padding:'5px 10px',border:'2px solid white',display:'inline-block'}}>❤️ {health} 🛡️ {tier>=3?100:0} {Array(wanted).fill(0).map((_,i)=><span key={i}>⭐</span>)} {Array(5-wanted).fill(0).map((_,i)=><span key={i} style={{color:'#555'}}>⭐</span>)}</div><div style={{fontSize:10,marginTop:5}}>T{tier} {badges.join(' ')} {user.name} {world} {visaStatus} {inDolls?"DOLLS 70M 💎":""} {insideHouse?"Inside "+insideHouse:""}</div></div>
        <div style={{textAlign:'right'}}><div style={{color:'#0f0',fontSize:22,textShadow:'2px 2px 0 black'}}>${cash.toFixed(0)} Air {airtime.toFixed(1)}m</div><div style={{fontSize:10}}>WORTH ₦{worth.toLocaleString()} Bank ${bankBalance} Fuel {fuel}% NEPA {nepa?"ON":"OFF"} Days {visaDays} {overstay?"OVERSTAY POLICE":""}</div><div style={{background:'red',padding:'2px 6px',marginTop:5,fontSize:8}}>🔴 {radio}</div></div>
      </div>
      {/* MINIMAP BOTTOM LEFT GTA */}
      <div style={{position:'absolute',bottom:20,left:20,width:120,height:120,background:'black',border:'3px solid white',borderRadius:'50%',zIndex:20,overflow:'hidden'}}><div style={{width:'100%',height:'100%',background:'#0a4a0a',position:'relative'}}><div style={{position:'absolute',top:'50%',left:'50%',width:8,height:8,background:'lime',transform:'translate(-50%,-50%)',borderRadius:'50%'}}/><div style={{position:'absolute',top:10,left:10,width:6,height:6,background:'yellow'}}/><div style={{position:'absolute',bottom:20,right:20,width:6,height:6,background:'blue',borderRadius:'50%'}}/></div><div style={{position:'absolute',bottom:-2,left:0,right:0,textAlign:'center',fontSize:9,background:'black'}}>LAGOS MAP</div></div>
      {/* CENTER - CAR / STREET + CONTROLS */}
      <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',textAlign:'center',zIndex:10,width:'90%',maxWidth:500,background:'rgba(0,0,0,0.85)',padding:10,border:'2px solid white',maxHeight:'70vh',overflowY:'auto'}}>
        <div style={{fontSize:40}}>{cars[cars.length-1].includes('Bike')?'🏍️':cars[cars.length-1].includes('Jet')?'✈️':'🚗'}</div>
        <div style={{background:'black',padding:'5px 15px',marginTop:5,border:'2px solid lime'}}>{user.name} IN {cars[cars.length-1].toUpperCase()} - {world} {visaStatus||"No visa"} - {radio.slice(0,60)}</div>
        <div style={{display:'flex',gap:5,flexWrap:'wrap',justifyContent:'center',marginTop:10}}>
          <button onClick={()=>{setEmbassyStage('queue'); setQueueNum(0)}} style={btn}>🇳🇬 Embassy VI Queue Number Call Form Interview 60/40 Approve/Reject</button>
          <button onClick={()=>buy('Bike 2k',2000,'car','Mushin Danfo Okada LASTMA')} style={btn}>Bike 2k T1 Danfo Okada LASTMA seize Fuel queue</button>
          <button onClick={()=>buy('Brabus 10k',10000,'car','Banana')} style={{...btn,background:'gold',color:'black'}}>Brabus 10k T4 Big Boy Landlord</button>
          <button onClick={()=>buy('Jet 50k',50000,'jet','MMA Flight USA Olumo Zuma')} style={btnA}>Jet 50k Fly USA Atlanta Oyinbo NPCs Olumo Zuma</button>
          <button onClick={()=>buy('Yacht 150k',150000,'boat','Apapa')} style={btnS}>Yacht 150k</button>
          <button onClick={()=>buy('Your Mushin House',0,'houseEnter','Mushin Your Airbnb bedroom kitchen toilet interior real door No teleport')} style={{...btn,background:'green'}}>Knock Your House Kpai-kpai bedroom kitchen toilet interior</button>
          <button onClick={()=>buy('Banana House',0,'houseEnter','Banana Landlord house Owner notification open/ignore')} style={btn}>Knock Banana House Owner notification</button>
          <button onClick={()=>buy('ATM Withdraw 100',0,'bank','First Bank ATM')} style={btn}>🏦 Bank ATM Withdraw Balance {bankBalance} Queue loan 50 Rob alarm police chase</button>
          <button onClick={()=>buy('Regular Club',0,'club','Regular free Amapiano')} style={btn}>🎵 Regular Club Free Amapiano dance drink 5 coins</button>
          <button onClick={()=>buy('Strip Club 70M',10000,'strip','Allen Avenue bouncer 70M gate push comot Oga go hustle lounge music lights dance spray 1M big boys')} style={{...btn,background:'gold',color:'black'}}>💎 Strip Club 70M Gate Allen Avenue bouncer check 70M push comot Oga go hustle lounge music lights dance spray 1M</button>
          <button onClick={()=>buy('Dolls 70M',10000,'dolls','Allen neon')} style={{...btn,background:'gold',color:'black'}}>💎 Dolls 70M Allen neon bouncer 70M gold name shine spray influencer</button>
          <button onClick={()=>{if(cash<1000)return; setCash(cash-1000); setRaceMode('football')}} style={{...btn,background:'green'}}>⚽ Football 1k YOU DRIBBLE Teslim Balogun 5v5 GOAL MTN Owner 10%</button>
          <button onClick={()=>{if(cash<2000)return; setCash(cash-2000); setRaceMode('car')}} style={{...btn,background:'red'}}>🏎️ Car Race 2k YOU DRIVE Lekki Toll Gate NOS LASTMA Owner 10%</button>
          <button onClick={()=>{if(cash<3000)return; setCash(cash-3000); setRaceMode('house')}} style={{...btn,background:'gold',color:'black'}}>🏠 House Race 3k YOU BUILD Banana 10mins NEPA off vote finest</button>
          <button onClick={()=>{setCallMode('audio'); setCallTarget("Mushin Boy 🇳🇬"); setInCall(true); setCallTime(0)}} style={btn}>📞 Paid Audio 5/min Private Far USA vs Naija timer airtime finish borrow *556#</button>
          <button onClick={()=>{setCallTarget("Babe USA 🇺🇸"); setCallMode('video'); setInCall(true); setCallTime(0)}} style={{...btn,background:'gold',color:'black'}}>📹 Video 15/min Show Face Agree Yes/No Report nude EFCC block masjid church mute</button>
          <button onClick={()=>buy('Airtime 20m',100,'airtime','MTN Glo Airtel shop road')} style={btn}>MTN Airtime Shop 100 coins 20m audio 7m video Broke borrow debt</button>
          <button onClick={()=>{setNepa(!nepa); setRadio(nepa?"NEPA TAKE LIGHT Estate dark TV fridge AC off sweat Gen I Better Pass My Neighbour fuel 10 coins 5mins neighbour knock Oga off gen! Inverter rich 24/7":"UP NEPA All neighbours hear voice chat TV fridge AC on") }} style={{...btn,background:'yellow',color:'black'}}>💡 NEPA {nepa?"ON UP NEPA Shout voice chat neighbours hear":"OFF DARK Gen ON"} Gen fuel 10 coins 5mins neighbour knock Oga off gen Inverter rich 24/7 why hustle 70M</button>
          <button onClick={()=>{setStage('bed')}} style={btn}>💤 Bed Save Wake up routine every gamer wake up bed Mushin mosquito net GEN</button>
        </div>
      </div>
      {/* RIGHT GARAGE GTA */}
      <div style={{position:'absolute',top:80,right:10,width:110,background:'rgba(0,0,0,0.8)',border:'1px solid white',padding:5,zIndex:20,fontSize:9}}><b>GARAGE</b><br/>{cars.map((c,i)=><div key={i}>• {c}</div>)}<br/><b>HANGAR</b><br/>{jets.length?jets.join(','):'Empty'}<br/><b>PORT</b><br/>{boats.length?boats.join(','):'Empty'}<br/><b>HOUSES</b><br/>{houses.join(',')}<br/><b>WANTED</b><br/>{wanted===0?'CLEAN':wanted<3?'POLICE':wanted<5?'EFCC':'ARMY!'}<br/><br/>NEPA: {nepa?"ON":"OFF 3X DAILY"}<br/>CHECKPOINT: PAY $500<br/>Bank ${bankBalance}<br/>Fuel {fuel}%<br/>View first/third GTA<br/>Knock person road fine 15 coins</div>
    </div>
  )
}
const btn={padding:'6px 8px',background:'black',color:'white',border:'1px solid white',fontSize:9,fontFamily:'monospace',cursor:'pointer',margin:2}
const btnA={...btn,borderColor:'cyan',color:'cyan'}
const btnS={...btn,borderColor:'#0af',color:'#0af'}import { useState } from 'react'

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
