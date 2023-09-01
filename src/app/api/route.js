import { NextResponse } from "next/server";
import axios from 'axios'
import Cors from 'cors'

const cors = Cors({
    methods: ['GET'],
    origin: '*', 
    optionsSuccessStatus: 200
  })
  
  function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
      fn(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result)
        }
  
        return resolve(result)
      })
    })
  }

export const GET =  async(req) => {
    try {
        await runMiddleware(req,res,cors)
  
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
        return new NextResponse(JSON.stringify({error : error,"message":"enter valid id"}));
    }
}

export const dynamic = 'force-dynamic'

