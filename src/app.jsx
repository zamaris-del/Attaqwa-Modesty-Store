import { useState, useEffect } from 'react'

const PRODUCTS = [
{id:1,name:"Inner Sleeves Black",cat:"Modesty",price:2500,emoji:"🧤"},
{id:2,name:"Fingerless Gloves",cat:"Modesty",price:1800,emoji:"🧤"},
{id:3,name:"Thick Muslimah Socks",cat:"Modesty",price:2000,emoji:"🧦"},
{id:4,name:"Cotton Underwear 3pcs",cat:"Undies",price:4500,emoji:"🩲"},
{id:5,name:"Lace Panties Brown",cat:"Undies",price:2200,emoji:"🩲"},
{id:6,name:"Men Cotton Boxers",cat:"Undies",price:2500,emoji:"🩳"},
{id:7,name:"Soft Bralette",cat:"Undies",price:3500,emoji:"👙"},
{id:8,name:"Modest Nightwear Set",cat:"Undies",price:7000,emoji:"👚"},
{id:9,name:"Hijab Socks Pack 3",cat:"Modesty",price:5000,emoji:"🧦"},
{id:10,name:"Nude Inner Sleeves",cat:"Modesty",price:2500,emoji:"🧤"},
{id:11,name:"White Cherry Panties",cat:"Undies",price:2000,emoji:"🩲"},
{id:12,name:"Women Boxer Shorts",cat:"Undies",price:2000,emoji:"🩳"},
]

export default function App(){
const [cart,setCart]=useState(()=>JSON.parse(localStorage.getItem('cart')||'[]'))
const [showCart,setShowCart]=useState(false)
const [filter,setFilter]=useState('All')
const [checkout,setCheckout]=useState(false)
const [form,setForm]=useState({name:'',phone:'',address:'',state:'Lagos'})
const [payMethod,setPayMethod]=useState('paystack')

useEffect(()=>localStorage.setItem('cart',JSON.stringify(cart)),[cart])

const addToCart=(p)=>{const f=cart.find(c=>c.id===p.id); if(f)setCart(cart.map(c=>c.id===p.id?{...c,qty:c.qty+1}:c)); else setCart([...cart,{...p,qty:1}]); setShowCart(true)}
const total=cart.reduce((s,c)=>s+c.price*c.qty,0)
const delivery=form.state==='Lagos'?1500:3000
const grand=total+delivery

// BELOW GRAND - WhatsApp + Gmail Order System
const sendOrderToWhatsAppAndGmail = () => {
  if(!form.name || !form.phone || !form.address){ alert('Please fill name, phone, address'); return; }
  const orderId = 'ATQ' + Date.now()
  const itemsList = cart.map(c=> `${c.name} x${c.qty} = ₦${c.price*c.qty}`).join('%0A')
  const fullMessage = `*NEW ORDER - ATTAQWA COMFORT*%0A%0AOrder ID: ${orderId}%0AName: ${form.name}%0APhone: ${form.phone}%0AAddress: ${form.address}, ${form.state}%0A%0A*ITEMS:*%0A${itemsList}%0A%0ASubtotal: ₦${total}%0ADelivery: ₦${delivery}%0A*GRAND TOTAL: ₦${grand}*%0A%0APayment: ${payMethod}%0A%0APlease confirm my order - Attaqwa`

  // 1. Send to YOUR WhatsApp 08066239383
  const whatsAppURL = `https://wa.me/2348066239383?text=${fullMessage}`
  window.open(whatsAppURL, '_blank')

  // 2. Send to YOUR Gmail attaqwacomfort@gmail.com
  const gmailSubject = `New Order ${orderId} - ${form.name} - ₦${grand}`
  const gmailBody = fullMessage.replaceAll('%0A','%0D%0A').replaceAll('*','')
  setTimeout(()=>{
    window.open(`mailto:attaqwacomfort@gmail.com?subject=${encodeURIComponent(gmailSubject)}&body=${encodeURIComponent(gmailBody)}`, '_blank')
  }, 1000)

  alert(`Order ${orderId} Sent! Check WhatsApp & Gmail`)
  setCart([])
  setCheckout(false)
}

const payWithPaystack=()=>{
  if(!form.name || !form.phone){ alert('Fill name and phone first'); return; }
  const handler=window.PaystackPop.setup({
    key: import.meta.env.VITE_PAYSTACK_KEY || 'pk_test_123',
    email: `${form.phone}@attaqwa.com`,
    amount: grand*100,
    currency: 'NGN',
    ref: 'ATQ'+Date.now(),
    callback: ()=>{ sendOrderToWhatsAppAndGmail() },
    onClose: ()=>alert('Payment window closed')
  }); handler.openIframe()
}

const filtered=filter==='All'?PRODUCTS:PRODUCTS.filter(p=>p.cat===filter)

return(
<div className="min-h-screen bg-[#e8f6f3]">
<header className="sticky top-0 z-50 bg-[#0a2e26] text-white p-4 flex justify-between items-center">
<div className="font-black text-lg">ATTAQWA COMFORT</div>
<div className="flex gap-2">
<button onClick={()=>setFilter('All')} className="text-xs border px-2 py-1 rounded-full">All</button>
<button onClick={()=>setFilter('Modesty')} className="text-xs border px-2 py-1 rounded-full">Modesty</button>
<button onClick={()=>setFilter('Undies')} className="text-xs border px-2 py-1 rounded-full">Undies</button>
<button onClick={()=>setShowCart(true)} className="bg-[#2ecc71] px-3 py-1 rounded-full text-sm">Cart({cart.reduce((a,b)=>a+b.qty,0)})</button>
</div>
</header>

{!checkout ? <>
<div className="p-6 md:p-12">
<div className="bg-white rounded-[30px] p-6 md:p-10 flex flex-col md:flex-row gap-6">
<div className="flex-1">
<div className="text-xs bg-[#e8f6f3] inline-block px-3 py-1 rounded-full">Modest. Modern. You</div>
<h1 className="text-5xl font-black leading-none mt-3"><span className="bg-gradient-to-r from-[#2ecc71] to-[#0a5a33] bg-clip-text text-transparent">UNDIES & MODESTY</span><br/><span className="border-2 border-[#0a2e26] rounded-full px-4 text-3xl">Wears Store</span></h1>
<div className="mt-6 bg-[#e8f6f3] rounded-2xl p-4 grid grid-cols-2 gap-4 text-xs">
<div><b>Modesty Wears</b><br/>Sleeves • Gloves • Socks</div>
<div><b>Undies</b><br/>Underwear • Nightwear • Bralette • Panties • Boxers</div>
</div>
<div className="mt-4 flex gap-2">
<button onClick={()=>window.scrollTo(0,600)} className="bg-[#0a2e26] text-white px-6 py-3 rounded-full">Shop Now</button>
<a href="https://wa.me/2348066239383" className="border-2 border-[#0a2e26] px-6 py-3 rounded-full">WhatsApp</a>
</div>
</div>
<div className="flex-1 flex flex-col gap-3"><div className="h-32 bg-[#ddd] rounded-[20px] flex items-center justify-center text-4xl">🧦</div><div className="h-32 bg-[#ccc] rounded-[20px] flex items-center justify-center text-4xl">🩲</div><div className="h-32 bg-[#bbb] rounded-[20px] flex items-center justify-center text-4xl">🧤</div></div>
</div>
</div>

<div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
{filtered.map(p=>(
<div key={p.id} className="bg-white rounded-2xl p-3">
<div className="h-28 bg-[#e8f6f3] rounded-xl flex items-center justify-center text-4xl">{p.emoji}</div>
<div className="mt-2 text-sm font-semibold">{p.name}</div>
<div className="text-xs text-gray-500">{p.cat}</div>
<div className="flex justify-between items-center mt-2"><b>₦{p.price}</b><button onClick={()=>addToCart(p)} className="bg-[#0a2e26] text-white text-xs px-3 py-1 rounded-full">Add</button></div>
</div>
))}
</div>
</>:(
<div className="p-6 max-w-lg mx-auto bg-white m-4 rounded-3xl">
<h2 className="text-xl font-bold">Checkout - ₦{grand}</h2>
<input placeholder="Full Name" className="w-full border p-3 rounded-xl mt-3" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
<input placeholder="Phone" className="w-full border p-3 rounded-xl mt-2" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/>
<input placeholder="Address" className="w-full border p-3 rounded-xl mt-2" value={form.address} onChange={e=>setForm({...form,address:e.target.value})}/>
<select className="w-full border p-3 rounded-xl mt-2" value={form.state} onChange={e=>setForm({...form,state:e.target.value})}><option>Lagos</option><option>Abuja</option><option>Kano</option><option>Oyo</option><option>Rivers</option><option>Other</option></select>

<div className="mt-4 space-y-2 text-sm">
<label className="flex gap-2 border p-2 rounded-lg"><input type="radio" checked={payMethod==='paystack'} onChange={()=>setPayMethod('paystack')}/> Pay with Paystack (Card, Opay, PalmPay, Bank)</label>
<label className="flex gap-2 border p-2 rounded-lg"><input type="radio" checked={payMethod==='opay'} onChange={()=>setPayMethod('opay')}/> Opay Direct - 08066239383 Attaqwa Comfort</label>
<label className="flex gap-2 border p-2 rounded-lg"><input type="radio" checked={payMethod==='palmpay'} onChange={()=>setPayMethod('palmpay')}/> PalmPay Direct - 08066239383</label>
<label className="flex gap-2 border p-2 rounded-lg"><input type="radio" checked={payMethod==='transfer'} onChange={()=>setPayMethod('transfer')}/> Bank Transfer + Proof Upload</label>
<label className="flex gap-2 border p-2 rounded-lg"><input type="radio" checked={payMethod==='pod'} onChange={()=>setPayMethod('pod')}/> Pay on Delivery (Lagos)</label>
</div>

{payMethod==='paystack' && <button onClick={payWithPaystack} className="w-full bg-[#2ecc71] text-white p-3 rounded-xl mt-4 font-bold">Pay ₦{grand} with Paystack</button>}
{payMethod!=='paystack' && <button onClick={sendOrderToWhatsAppAndGmail} className="w-full bg-[#0a2e26] text-white p-3 rounded-xl mt-4 font-bold">Confirm Order - Send to WhatsApp & Gmail</button>}
<button onClick={()=>setCheckout(false)} className="w-full mt-3 text-sm border p-2 rounded-xl">← Back to Shop</button>
</div>
)}

{showCart && (
<div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
<div className="bg-white w-80 p-4 overflow-auto">
<div className="flex justify-between"><b>Cart</b><button onClick={()=>setShowCart(false)}>X</button></div>
{cart.map(c=><div key={c.id} className="flex justify-between py-2 border-b text-sm"><span>{c.name} x{c.qty}</span><span>₦{c.price*c.qty}</span></div>)}
<div className="mt-4"><div>Subtotal: ₦{total}</div><div>Delivery: ₦{delivery}</div><b>Total: ₦{grand}</b></div>
<button onClick={()=>{setShowCart(false); setCheckout(true)}} className="w-full bg-[#0a2e26] text-white p-3 rounded-xl mt-4">Checkout</button>
</div>
</div>
)}

<footer className="bg-[#0a2e26] text-white p-6 mt-10 text-xs text-center">
<p className="font-bold text-sm">ATTAQWA COMFORT - where breathable essentials meet timeless modest style</p>
<div className="mt-3 flex flex-col gap-1">
<div>📞 08066239383</div>
<div className="flex flex-wrap gap-2 justify-center">
<a href="https://facebook.com/salmah.opeyemi.saheed" target="_blank" className="hover:text-[#2ecc71] underline">Facebook: Salmah Opeyemi Saheed</a>
<span>|</span>
<a href="https://instagram.com/attaqwa_comfort" target="_blank" className="hover:text-[#2ecc71] underline">Instagram: attaqwa_comfort</a>
<span>|</span>
<a href="mailto:attaqwacomfort@gmail.com" className="hover:text-[#2ecc71] underline">Gmail: attaqwacomfort@gmail.com</a>
</div>
</div>
<p className="mt-3 opacity-60">Orders automatically sent to WhatsApp & Gmail</p>
</footer>

<a href="https://wa.me/2348066239383" className="fixed bottom-4 right-4 bg-green-500 text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-lg">💬</a>
</div>
)
}
