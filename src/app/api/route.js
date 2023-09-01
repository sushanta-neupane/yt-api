import { NextResponse } from "next/server";
import axios from 'axios'
import  ytdl from 'ytdl-core'
// GET => get all products
export const GET =  async(req) => {
    try {
        let linkdata = {}
        const apiKey = process.env.API_KEY
        const res = req.url.split("?");
        const q = res[res.length - 1]
        const params = new URLSearchParams(q)
        const obj = Object.fromEntries(params);
        const ytapi = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=${obj['max']}&q=${obj['q']}&key=${apiKey}`
        const data = await axios.get(ytapi)
        const id = data['data']['items'][0]['id']['videoId']
        const info = await ytdl.getInfo(id)
   
        let formatV = ytdl.chooseFormat(info.formats, {quality: 'highestvideo'}); 
        let formatA = ytdl.chooseFormat(info.formats, {quality: 'highestaudio'}); 
        let videoLink = formatV.url;
        let audioLink = formatA.url;
        

        linkdata = JSON.stringify({
            "audio" : audioLink,
            "video" : videoLink
        })
        console.log(linkdata)
 

        
        return new NextResponse(JSON.stringify(data['data']))
        
    } catch (error) {
        console.log("ERROR fetching  \n" + error)
    }
}

export const dynamic = 'force-dynamic'

