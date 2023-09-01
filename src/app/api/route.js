import { NextResponse } from "next/server";
import axios from 'axios'
import  ytdl from 'ytdl-core'
// GET => get all products
export const GET =  async(req) => {
    try {
  
        const apiKey = process.env.API_KEY
        const res = req.url.split("?");
        const q = res[res.length - 1]
        const params = new URLSearchParams(q)
        const obj = Object.fromEntries(params);
        const type = "video"
        const ytapi = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=${obj['max']}&q=${obj['q']}&key=${apiKey}&type=${type}`
        const data = await axios.get(ytapi)
        
        return new NextResponse(JSON.stringify(data['data']))
        
    } catch (error) {
        console.log("ERROR fetching  \n" + error)
    }
}

export const dynamic = 'force-dynamic'

