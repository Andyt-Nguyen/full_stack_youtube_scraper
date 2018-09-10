import React from 'react'

export default ({img, title, views, date, description, channelName}) => (
    <div>
        <div className="search_thumbnail_desc_container">
            <div>
                <div 
                    className="search_thumbnail" 
                    style={{backgroundImage:`url(${img})`}} />
            </div>

            <div className="search_text_container">
                <div className="search_title">
                    <p>{title}</p>
                    <div className="flex_title_and_date">
                        <p>{channelName}</p>
                        <p>{views} <span style={{fontSize:15}}>&middot;</span>  {date}</p>
                        <p>{description}</p>
                    </div>
                </div>
            </div>
        </div>
        <div style={{marginTop: 10, marginBottom: 10}}/>
    </div>
)