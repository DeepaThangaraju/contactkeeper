import React from 'react'


export default function Home() {
  return (
    <>
    <div className="grid-2" style={{margin:"1rem",alignItem:"center"}}>
        <div>
         <img src="https://acegif.com/wp-content/gifs/book-72.gif" alt="Contact Directory"/>
        </div>
        <div style={{margin:"auto",width:"80%",marginTop:"4rem"}}>
          <h3>About Phone Directory</h3>
          <p >
                 Our app help you to create an online contact book With you.<span className='dark'>Get contact where and when you want</span>.
                 Manage the contact very efficiently. so it will become undestroyable.
          </p>
        </div>
        </div>
        <div className='container home'>
          <p>Lets start experience the Phone Directory by registering</p>
        </div>
    </>
  )
}
