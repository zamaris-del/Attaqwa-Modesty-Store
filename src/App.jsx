import { useState, useEffect, useRef } from 'react'

export default function App(){
  const canvasRef=useRef(null)
  const [user,setUser]=useState(null)
  const [name,setName]=useState('')
  const [cash,setCash]=useState(12450)
  const [pos,setPos]=useState({x:200,y:200})
  const [carPos,setCarPos]=useState({x:350,y:200})
  const [inCar,setInCar]=useState(false)
  const [wanted,setWanted]=useState(0)
  const [tier,setTier]=useState(3)
  const [keys,setKeys]=useState({})
  const [cars,setCars]=useState(['Brabus G-Wagon'])
  
  // GTA controls
  useEffect(()=>{
    const down=e=>setKeys(k=>({...k,[e.key]:true}))
    const up=e=>setKeys(k=>({...k,[e.key]:false}))
    window.addEventListener('keydown',down)
    window.addEventListener('keyup',up)
    return()=>{window.removeEventListener('keydown',down);window.removeEventListener('keyup',up)}
  },[])

  // Game loop - avatar waka
  useEffect(()=>{
    if(!user) return
    const id=setInterval(()=>{
      if(inCar){
        let nx=carPos.x, ny=carPos.y
        if(keys['ArrowUp']||keys['w']) ny-=6
        if(keys['ArrowDown']||keys['s']) ny+=6
        if(keys['ArrowLeft']||keys['a']) nx-=6
        if(keys['ArrowRight']||keys['d']) nx+=6
        setCarPos({x:Math.max(0,Math.min(700,nx)), y:Math.max(0,Math.min(400,ny))})
        setPos({x:nx,y:ny})
      } else {
        let nx=pos.x, ny=pos.y
        if(keys['ArrowUp']||keys['w']) ny-=4
        if(keys['ArrowDown']||keys['s']) ny+=4
        if(keys['ArrowLeft']||keys['a']) nx-=4
        if(keys['ArrowRight']||keys['d']) nx+=4
        setPos({x:Math.max(0,Math.min(700,nx)), y:Math.max(0,Math.min(400,ny))})
      }
    },16)
    return()=>clearInterval(id)
  },[keys,pos,carPos,inCar,user])

  // Draw GTA map
  useEffect(()=>{
    if(!canvasRef.current) return
    const ctx=canvasRef.current.getContext('2d')
    ctx.clearRect(0,0,800,450)
    // Road - Allen Avenue
    ctx.fillStyle='#444'
    ctx.fillRect(0,180,800,90)
    ctx.fillRect(180,0,90,450)
    ctx.strokeStyle='#ffff00'
    ctx.setLineDash([20,20])
    ctx.beginPath(); ctx.moveTo(0,225); ctx.lineTo(800,225); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(225,0); ctx.lineTo(225,450); ctx.stroke()
    ctx.setLineDash([])
    // Buildings
    ctx.fillStyle='#8a7a5a'
    ctx.fillRect(0,0,170,170); ctx.fillRect(280,0,520,170); ctx.fillRect(0,280,170,170); ctx.fillRect(280,280,520,170)
    // Shop signs
    ctx.fillStyle='#0066cc'; ctx.fillRect(10,10,100,30); ctx.fillStyle='white'; ctx.font='12px monospace'; ctx.fillText('MTN 5G',20,30)
    ctx.fillStyle='#ff0000'; ctx.fillRect(300,10,120,30); ctx.fillStyle='white'; ctx.fillText('Chicken Republic',310,30)
    ctx.fillStyle='#ffd700'; ctx.fillRect(600,290,140,30); ctx.fillStyle='black'; ctx.fillText('DIAMOND DOLLS 70M',610,310)
    ctx.fillStyle='#00aa00'; ctx.fillRect(10,290,100,30); ctx.fillStyle='white'; ctx.fillText('First Bank',20,310)
    // Danfo yellow bus
    ctx.fillStyle='#ffcc00'; ctx.fillRect(500,190,60,40); ctx.fillStyle='black'; ctx.fillText('DANFO',510,215)
    // Police car if wanted
    if(wanted>0){ctx.fillStyle='#0000ff'; ctx.fillRect(100,190,50,30); ctx.fillStyle='white'; ctx.fillText('POLICE',105,210)}
    // Avatar or Car
    if(inCar){
      ctx.fillStyle='#111'; ctx.fillRect(carPos.x-25,carPos.y-15,50,30)
      ctx.fillStyle='#ffd700'; ctx.font='20px monospace'; ctx.fillText('B',carPos.x-8,carPos.y+5)
      ctx.fillStyle='gold'; ctx.fillRect(carPos.x-5,carPos.y-20,10,10)
    } else {
      const isNearCar=Math.hypot(pos.x-carPos.x,pos.y-carPos.y)<40
      ctx.fillStyle=tier===4?'gold':tier===3?'#ff69b4':'#333'
      ctx.beginPath(); ctx.arc(pos.x,pos.y,14,0,Math.PI*2); ctx.fill()
      ctx.fillStyle='black'; ctx.font='18px monospace'; ctx.fillText(tier===4?'👳':'🧑',pos.x-9,pos.y+6)
      if(isNearCar){ctx.fillStyle='lime'; ctx.fillRect(pos.x-30,pos.y-40,60,15); ctx.fillStyle='black'; ctx.font='10px monospace'; ctx.fillText('Press E Enter',pos.x-25,pos.y-30)}
    }
  },[pos,carPos,inCar,wanted,tier])

  function tryEnter(){
    if(inCar){setInCar(false);return}
    if(Math.hypot(pos.x-carPos.x,pos.y-carPos.y)<40){setInCar(true);setCars([...cars,'Brabus Entered'])}
    else alert("Waka near Brabus G-Wagon first! Like GTA - near motor press E enter!")
  }

  if(!user) return <div style={{height:'100vh',background:'url(https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9)',backgroundSize:'cover',color:'white',fontFamily:'monospace',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',padding:20,textAlign:'center'}}>
    <div style={{background:'rgba(0,0,0,0.85)',padding:20,border:'3px solid gold'}}>
      <h1 style={{fontSize:28,letterSpacing:4}}>GRAND THEFT AUTO V</h1>
      <h2 style={{color:'gold'}}>LAGOS - ALLEN AVENUE EDITION</h2>
      <p style={{fontSize:10}}>REAL GTA STYLE - Avatar waka for street, enter Brabus, Danfo, Police chase, Diamond Dolls 70M, Bank, Embassy Visa</p>
      <div style={{fontSize:40,margin:10}}>👳‍♂️ 🚙 👩‍🦱</div>
      <p>Alhaji Gold Agbada + Baddie + Brabus G-Wagon - MTN 5G - Chicken Republic - Danfo Yellow Bus</p>
      <input value={name} onChange={e=>setName(e.target.value)} placeholder="Enter Street Name" style={{padding:12,width:'80%',background:'black',color:'lime',border:'2px solid lime',textAlign:'center',marginTop:10}}/>
      <button onClick={()=>setUser({name:name||"Boss"})} style={{marginTop:10,padding:'15px 40px',background:'gold',color:'black',fontWeight:'bold',border:'none'}}>START GTA LAGOS</button>
    </div>
  </div>

  return(
    <div style={{height:'100vh',background:'black',color:'white',fontFamily:'monospace',overflow:'hidden',position:'relative'}}>
      {/* GTA HUD */}
      <div style={{position:'absolute',top:0,left:0,right:0,zIndex:10,display:'flex',justifyContent:'space-between',padding:8,background:'rgba(0,0,0,0.8)'}}>
        <div><span style={{background:'black',padding:'4px 8px',border:'2px solid white',fontSize:12}}>❤️ 78 🛡️ {tier>=3?100:40} {Array(wanted).fill(0).map((_,i)=><span key={i}>⭐</span>)}</span><div style={{fontSize:10,marginTop:4}}>{name} - T{tier} {inCar?"IN BRABUS G-WAGON 🚗":"ON FOOT 🚶"} - {inCar?"Drive W A S D like GTA":"Waka W A S D"}</div></div>
        <div style={{textAlign:'right'}}><div style={{color:'#0f0',fontSize:20}}>${cash}</div><div style={{fontSize:10}}>Worth {cash} - Bank $5000 - Allen Ave</div></div>
      </div>

      {/* REAL GTA MAP CANVAS */}
      <canvas ref={canvasRef} width={800} height={450} style={{width:'100%',height:'70vh',background:'#2a2a2a',marginTop:60,borderTop:'2px solid gold',borderBottom:'2px solid gold'}}/>

      {/* GTA CONTROLS */}
      <div style={{position:'absolute',bottom:0,left:0,right:0,background:'rgba(0,0,0,0.95)',padding:10,zIndex:10}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div style={{display:'grid',gridTemplateColumns:'40px 40px 40px',gridTemplateRows:'40px 40px',gap:2}}>
            <div></div><button onTouchStart={()=>setKeys(k=>({...k,w:true}))} onTouchEnd={()=>setKeys(k=>({...k,w:false}))} onMouseDown={()=>setKeys(k=>({...k,w:true}))} onMouseUp={()=>setKeys(k=>({...k,w:false}))} style={gtaBtn}>↑ W</button><div></div>
            <button onTouchStart={()=>setKeys(k=>({...k,a:true}))} onTouchEnd={()=>setKeys(k=>({...k,a:false}))} style={gtaBtn}>← A</button><button onTouchStart={()=>setKeys(k=>({...k,s:true}))} onTouchEnd={()=>setKeys(k=>({...k,s:false}))} style={gtaBtn}>↓ S</button><button onTouchStart={()=>setKeys(k=>({...k,d:true}))} onTouchEnd={()=>setKeys(k=>({...k,d:false}))} style={gtaBtn}>D →</button>
          </div>
          <div style={{textAlign:'center'}}>
            <button onClick={tryEnter} style={{...gtaBtn,background:'gold',color:'black',padding:'10px 20px',fontSize:12}}>{inCar?"🚪 COMOT FOR CAR (E)":"🚗 ENTER BRABUS (E) - Waka near"}</button>
            <div style={{fontSize:8,marginTop:5,color:'lime'}}>GTA STYLE: W A S D waka, near motor press E enter, drive W A S D, press E comot. Danfo for road, Police if Wanted, Diamond Dolls 70M, Bank, Embassy!</div>
            <div style={{display:'flex',gap:5,marginTop:5,justifyContent:'center'}}>
              <button onClick={()=>{setWanted(0);alert("Wanted clear! Police comot!")}} style={btn}>Clear Wanted</button>
              <button onClick={()=>{setTier(4);alert("You don turn Alhaji Gold T4 Banana VIP! Avatar gold agbada shine Allen Avenue!")}} style={{...btn,background:'gold',color:'black'}}>Become Alhaji T4 Gold</button>
              <button onClick={()=>{window.location.href="https://zamari-house-link-up.vercel.app/"}} style={btn}>Full Map Version (Old)</button>
            </div>
          </div>
          <div style={{width:90,height:90,background:'black',border:'2px solid white',borderRadius:'50%',position:'relative'}}>
            <div style={{position:'absolute',top:'50%',left:'50%',width:8,height:8,background:inCar?'gold':'lime',borderRadius:'50%',transform:`translate(-50%,-50%) translate(${(pos.x-400)/20}px,${(pos.y-225)/15}px)`}}/>
            <div style={{position:'absolute',top:5,left:10,fontSize:6,color:'yellow'}}>MTN 5G</div>
            <div style={{position:'absolute',bottom:5,right:5,fontSize:6,color:'gold'}}>DOLLS 70M</div>
            <div style={{textAlign:'center',fontSize:7,marginTop:95}}>ALLEN AVE MAP</div>
          </div>
        </div>
      </div>
    </div>
  )
}
const btn={padding:'5px 8px',background:'black',color:'white',border:'1px solid white',fontSize:8,fontFamily:'monospace'}
const gtaBtn={...btn,padding:'8px',background:'#222',fontSize:10}
