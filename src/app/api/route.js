import { NextResponse } from "next/server";
import axios from 'axios'
// GET => get all products
export const GET =  async(req) => {
    try {
        const apiKey = process.env.API_KEY
        const res = req.url.split("?");
        const q = res[res.length - 1]
        const params = new URLSearchParams(q)
        const obj = Object.fromEntries(params);
        const ytapi = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=${obj['max']}&q=${obj['q']}&key=${apiKey}`
        const data = await axios.get(ytapi)
        console.log(data['data'])
        return new NextResponse(JSON.stringify(data['data']))
        
    } catch (error) {
        console.log("ERROR fetching products \n" + error)
    }
}

export const dynamic = 'force-dynamic'

