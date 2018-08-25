import React from 'react'
import DOMPurify from 'dompurify'

export default ({desc}) => (
    <div style={{marginLeft:70}}>
        <p
            dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(desc)}} 
            style={{fontFamily:'serif',fontWeight:300, fontSize:15, lineHeight:'20px'}}>
        </p>
    </div>
)